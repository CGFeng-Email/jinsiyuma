<template>
	<view class="container">
		<view class="product_content">
			<!-- 导航栏 -->
			<u-navbar
				:class="[scroll_number <= 44 ? 'product_navbar' : '']"
				:title="scroll_number <= 44 ? '' : '产品馆'"
				:bgColor="scroll_number <= 44 ? 'transparent' : 'rgba(255, 255, 255, .9)'"
				:titleStyle="navbarStyle"
				@leftClick="open_search"
			>
				<view class="u-nav-slot" slot="left">
					<view class="nav_left_icon" :class="scroll_number >= 44 ? 'scroll_nav_search' : ''">
						<i class="iconfont icon-sousuo"></i>
						<text class="text">搜索</text>
					</view>
				</view>
			</u-navbar>
			<u-transition :show="true">
				<!-- 背景 -->
				<view class="banner_bg">
					<u--image class="bg" :src="product_bg" width="100%" height="100vh"></u--image>
				</view>
			</u-transition>
			<!-- 轮播 -->
			<view class="product_banner_content">
				<u-transition :show="true">
					<view class="banner_content">
						<view class="top_content">
							<view class="banner_title">
								<text class="text" v-if="title">{{ title }}</text>
								<text class="text" v-if="list.length > 0">{{ list.length }}</text>
							</view>
						</view>
						<view class="custom_dot">
							<uni-swiper-dot
								class="uni-swiper-dot-box"
								:dots-styles="dotsStyles"
								:info="list"
								:current="swiper_current"
								mode="round"
								field="content"
							></uni-swiper-dot>
						</view>
						<swiper
							class="swiper_content"
							circular
							:autoplay="true"
							previous-margin="30px"
							next-margin="30px"
							:interva="3000"
							easing-function="linear"
							:current="swiper_current"
							@change="change_swiper"
						>
							<swiper-item v-for="(item, index) in list" :key="index">
								<view class="swiper_item" :class="[swiper_current == index ? 'swiper_item_active' : '']">
									<image class="cover border-radius" :src="item.image" @click="open_product_details(item.product_id)"></image>
									<view class="bottom_content">
										<view class="btn_box" @click="open_product_details(item.product_id)">
											<u--image class="btn" :src="item.sub_image1" width="132rpx" height="132rpx" radius="4"></u--image>
										</view>
										<view class="btn_box" @click="open_product_details(item.product_id)">
											<u--image class="btn" :src="item.sub_image2" width="132rpx" height="132rpx" radius="4"></u--image>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<view class="up_content">
							<image class="btn_icon animation_up" src="/static/img/more_icon.png" mode="aspectFit"></image>
							<image class="btn" src="/static/img/product_btn.png" mode="aspectFit" @click="up_scroll"></image>
						</view>
					</view>
				</u-transition>
			</view>
		</view>
		<!-- 规格列表 -->
		<SORTSELECT :sort_data="sort_data" :size_tabs_index="size_tabs_index" @selectItem="selectItem" @sizeTabsIndex="sizeTabsIndex"></SORTSELECT>
		<!-- 底部栏 -->
		<TABBAR :tabbar_bg="tabbar_bg" :tabs_index="1"></TABBAR>
	</view>
</template>

<script>
import SORTSELECT from '../../components/sort_select.vue';
export default {
	components: { SORTSELECT },
	data() {
		return {
			loading: true,
			tabbar_bg: false,
			scroll_number: 0,
			navbarStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			dotsStyles: {
				width: 8,
				height: 8,
				backgroundColor: 'rgba(255,255,255,0.5)',
				border: '0',
				color: '#fff',
				selectedBackgroundColor: '#fff',
				selectedBorder: '1px rgba(255, 255, 255) solid'
			},
			swiper_current: 0,
			title: '', // 标题
			product_bg: '', // 背景
			list: [], // 产品列表
			list_count: 0, // 总条数
			sort_data: {}, // 总规格数据
			size_tabs_index: 0 // 大，中，小规格下标
		};
	},
	async onLoad() {
		uni.hideTabBar(); // 隐藏原生tabbar
		await this.get_list();
		await this.get_sortList();
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		// console.log('scroll_number', this.scroll_number);
		if (this.scroll_number > 200) {
			this.tabbar_bg = true;
		} else {
			this.tabbar_bg = false;
		}
	},
	methods: {
		// 点击滑动指定位置
		up_scroll() {
			const query = wx.createSelectorQuery();
			query.select('.banner_bg').boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(function (res) {
				uni.pageScrollTo({
					scrollTop: res[0].height - 88,
					duration: 300
				});
			});
		},
		// 轮播切换
		change_swiper(e) {
			this.swiper_current = e.detail.current;
		},
		open_search() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		// 跳转产品列表
		open_product_details(id) {
			uni.navigateTo({
				url: `/pages/product/product_details?id=${id}?`
			});
		},
		// 品牌动态列表
		async get_list() {
			const res = await this.$request.post('/product/recommend');
			console.log('产品馆列表', res);
			this.product_bg = res.product_bg_image;
			this.title = res.product_title;
			this.list = res.recommend_list;
		},
		// 规格系列
		async get_sortList() {
			const res = await this.$request.post('/common/getOpts');
			console.log('规格', res);
			this.sort_data = res;
		},
		// 查询系列绑定的规格参数
		selectItem(id) {
			console.log(id);
			if (id != -1) {
				this.sortEditSize(id);
			} else if (id == -1) {
			}
		},
		// 大，中，小规格切换
		sizeTabsIndex(i, id) {
			// console.log('sizeTabsIndex', i);
			this.size_tabs_index = i;
			if (id) {
				// console.log('id', id);
				this.sortEditSize(id);
			}
		},
		// 排序 - 规格选中
		async sortEditSize(id) {
			const res = await this.$request.post('/product/getSizes', { serie_id: id });
			console.log('系列参数', res);
			const sort_data = this.sort_data;
			let list = sort_data.size_type[this.size_tabs_index].child.map((item) => {
				item.isClick = false;
				res.forEach((item2) => {
					if (item.value == item2) {
						item.isClick = true;
					}
				});
				return item;
			});
			// console.log('list', list);
			sort_data.size_type[this.size_tabs_index].child = list;

			this.sort_data = sort_data;
			// console.log('sort_data', this.sort_data);
		}
	}
};
</script>
<style>
page {
	overflow-x: hidden;
	background: rgba(10, 43, 78, 0.7);
}
</style>
<style lang="less" scoped>
.container {
	padding-bottom: 68px;
}
.nav_left_icon {
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 24rpx;
	height: 58rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20rpx;
	.iconfont {
		font-size: 36rpx;
		color: #fff;
		padding-right: 6rpx;
	}

	.text {
		font-size: 28rpx;
		color: #fff;
	}
}

.scroll_nav_search {
	border: 1px solid rgba(0, 0, 0, 0.5);
	.iconfont {
		color: #313131;
	}

	.text {
		color: #313131;
	}
}
.product_content {
	overflow-x: hidden;
	.product_navbar {
		/deep/ .u-navbar__content__left {
			display: none;
		}
	}
	.banner_bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.product_banner_content {
		height: 100vh;
		position: relative;
		.banner_content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			padding-top: 88px;
			display: flex;
			flex-direction: column;

			.top_content {
				padding: 20rpx 0 0 0;
				text-align: center;
				.banner_title {
					font-size: 48rpx;
					font-weight: bold;
					color: #ffffff;
					line-height: 56rpx;
					letter-spacing: 1px;
				}

				.btn {
					margin: 24rpx auto;
					margin-bottom: 10rpx;
					width: 246rpx;
					height: 52rpx;
				}
			}
			.custom_dot {
				padding: 10rpx 0;
			}
			.uni-swiper-dot-box {
				/deep/ .uni-swiper__warp {
					height: 50rpx;
				}
			}
			.swiper_content {
				flex: 1;
				height: auto;
				.swiper_item {
					position: relative;
					padding: 26rpx 20rpx;
					height: 100%;
					transition: all 0.2s;
					.cover {
						width: 100%;
						height: 100%;
					}
					.bottom_content {
						position: absolute;
						bottom: 46rpx;
						left: 50%;
						transform: translateX(-50%);
						display: flex;
						justify-content: center;
						align-items: center;
						.btn_box {
							margin: 0 10rpx;
							border: 1px solid #fff;
							border-radius: 8rpx;
							overflow: hidden;
						}
					}
				}
			}

			.swiper_item_active {
				padding: 0 !important;
			}

			.up_content {
				padding-top: 20rpx;
				text-align: center;
				padding-bottom: 200rpx;
				.btn_icon {
					width: 66rpx;
					height: 66rpx;
					display: block;
					margin: 10rpx auto;
					margin-bottom: 20rpx;
				}
				.btn {
					width: 228rpx;
					height: 64rpx;
				}
			}
		}
	}
}
</style>
