<template>
	<view class="container">
		<!-- 首页加载 -->
		<!-- <INDEX_LOADING v-if="loading_time > 0" :loading_time="loading_time" @clearLoading="clearLoading"></INDEX_LOADING> -->
		<!-- <u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page> -->
		<view class="index_content">
			<u-transition :show="true">
				<u-navbar
					:title="scroll_number <= 44 ? ' ' : navbar_title"
					:bgColor="scroll_number <= 44 ? navbar_bg : 'rgba(255, 255, 255, .9)'"
					:titleStyle="navbarStyle"
				></u-navbar>
				<view class="swiper" id="banner_swiper">
					<u-swiper
						height="100vh"
						:indicator="true"
						:circular="true"
						:easingFunction="easeInCubic"
						indicatorActiveColor="#fff"
						indicatorInactiveColor="#DDDDDC"
						:list="banner_list"
						keyName="thumb"
						@change="(e) => (current = e.current)"
					>
						<view slot="indicator" class="indicator">
							<view class="indicator__dot" v-for="(item, index) in banner_list" :key="index" :class="[index === current && 'indicator__dot--active']"></view>
						</view>
					</u-swiper>
					<view class="more">
						<image class="btn" src="/static/img/more.png" mode="aspectFit" @click="up_scroll"></image>
						<image class="btn_icon animation_up" src="/static/img/more_icon.png" mode="aspectFit"></image>
					</view>
				</view>
				<div class="banner_content index_banner_logo_wrap">
					<image class="border-radius box-shadow index_banner_logo" :src="home_logo" mode="widthFix"></image>
				</div>
				<view class="video_content banner_content">
					<video
						class="video border-radius box-shadow"
						:src="video_src"
						:muted="video_muted"
						:controls="true"
						:custom-cache="false"
						autoplay
						loop
						object-fit="cover"
						show-mute-btn
						enable-play-gesture
						play-btn-position="center"
					></video>
				</view>
				<view class="head_content" v-if="recommend_list.length >= 2">
					<view class="head_title">新品推荐</view>
					<view class="head_text" @click="open_hot_list">
						更多
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<!-- 新品推荐 -->
				<view class="recommend_swiper" v-if="recommend_list.length >= 2">
					<swiper
						class="swiper_conent"
						circular
						:display-multiple-items="recommend_item_number"
						:indicator-dots="true"
						indicator-color="#E4E4E4"
						indicator-active-color="#C6C6C6"
						:autoplay="true"
						previous-margin="16px"
						next-margin="12px"
						current="recommend_current"
						:interva="3000"
						easing-function="linear"
					>
						<swiper-item v-for="(item, index) in recommend_list" :key="index">
							<view class="swiper-item" @click="open_product_details(item.id)">
								<image class="cover" :src="item.image" mode="aspectFill"></image>
								<view class="item_content">
									<view class="item_title over1">{{ item.title }}</view>
									<view class="item_desc">{{ item.color_name }}</view>
									<view class="statuc">
										<view class="box">
											<i class="iconfont icon-kanguos"></i>
											<text class="text">{{ item.view_actual }}</text>
										</view>
										<!-- @click.stop="is_collect_recomment(index, item.is_collect, item.id)" -->
										<view class="box">
											<i v-if="item.is_collect == 0" class="iconfont icon-shoucang2"></i>
											<i v-else class="iconfont icon-shoucang3 active"></i>
											<text class="text" v-if="item.collect_num > 0" :class="item.collect_num <= 0 ? 'white' : ''">{{ item.collect_num }}</text>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="head_content head_content_bg">
					<view class="head_title">品牌动态</view>
					<view class="head_text" @click="open_brand_list">
						更多
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<!-- 品牌动态 -->
				<view class="dynamic_list">
					<u-transition :show="true" mode="fade-up">
						<view class="list_item" v-for="(item, index) in list" :key="index" @click="open_brand_details(item.id)">
							<view class="list_item_contenr">
								<view class="top">
									<view class="item_title over3">{{ item.title }}</view>
								</view>
								<view class="bottom">
									<view class="b_box">{{ item.publish_date }}</view>
									<view class="b_box"></view>
								</view>
							</view>
							<u--image class="cover" :showLoading="true" radius="4" :src="item.image" width="132px" height="93px" :fade="true" duration="200"></u--image>
						</view>
					</u-transition>
				</view>
				<!-- 加载提示 -->
				<view class="loadmore_box" v-if="list.length < list_count">
					<u-loadmore :status="list_loading" loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
				</view>
				<!-- 联系我们 -->
				<CONTACTUS :topShow="topShow"></CONTACTUS>
				<!-- 返回顶部 -->
				<TOPICON :topShow="topShow"></TOPICON>
				<!-- 底部栏 -->
				<TABBAR :tabbar_bg="tabbar_bg"></TABBAR>
				<!-- 登录模态框 -->
				<LOGINMODAL :show="login_modal" @loginModalCancel="loginModalCancel"></LOGINMODAL>
			</u-transition>
		</view>
	</view>
</template>

<script>
// import INDEX_LOADING from '../../components/index_loading.vue';
export default {
	// components: { INDEX_LOADING },
	data() {
		return {
			loading_time: 5, // 加载秒数
			loading: true, // 页面加载
			tabbar_bg: false, // tabbar背景颜色
			topShow: false, // 控制联系我们按钮距离底部的距离
			video_muted: true, // 默认静音播放
			more_scroll: 0, // 下拉更多滚动距离
			login_modal: false, // 登录模态框
			navbar_bg: 'transparent',
			navbar_title: '金丝玉玛',
			navbarStyle: {
				// 导航栏样式
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			scroll_number: 0, // 页面滚动距离
			current: 0, // banner下标
			banner_list: [], // banner列表
			home_logo: '', // 页面logo
			video_src: '', // 宣传视频
			recommend_list: [], // 新品推荐
			recommend_item_number: 2, // 新品推荐同时显示的数量
			recommend_current: 0, // 新品推荐下标
			list: [], // 品牌动态列表
			list_count: 0, // 品牌动态总条数
			page: 1, // 列表页
			size: 10, // 每页数量
			list_loading: 'loadmore' // 加载前值为loadmore，加载中为loading，没有数据为nomore
		};
	},
	async onLoad() {
		uni.hideTabBar(); // 隐藏原生tabbar
		// let timeIndex = setInterval(() => {
		// 	if (this.loading_time > 1) {
		// 		this.loading_time = this.loading_time -= 1;
		// 	} else {
		// 		this.loading_time = 0;
		// 		clearInterval(timeIndex);
		// 	}
		// }, 1000);
		await this.$onLaunched; // 解决$onLaunched比index的生命周期更快执行
		await this.initial();
		await this.getBanner();
		await this.get_new_product();
		await this.getDynamicList();
		// this.loading = false;
	},
	onReachBottom() {
		this.getDynamicList(true);
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		// console.log('this.scroll_number', this.scroll_number);

		if (this.scroll_number > 270) {
			this.tabbar_bg = true;
			this.video_muted = false;
		} else {
			this.tabbar_bg = false;
			this.video_muted = true;
		}

		if (this.scroll_number > 450 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 450 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		// 跳过加载
		clearLoading() {
			this.loading_time = 0;
		},
		// 获取页面数据
		async initial() {
			return new Promise((resolve, reject) => {
				try {
					const app = getApp();
					this.home_logo = app.globalData.home_logo;
					this.video_src = app.globalData.home_video;
					resolve();
				} catch (err) {
					reject('获取数据失败，服务器发生错误');
				}
			});
		},
		// 轮播图
		async getBanner() {
			const res = await this.$request.post('/ad/getList');
			this.banner_list = res.lists;
		},
		// 新品推荐
		async get_new_product() {
			const res = await this.$request.post('/new_product/getList');
			this.recommend_list = res.lists;
			console.log('新品推荐', res);
		},
		// 品牌动态列表
		async getDynamicList(loadmore = false) {
			this.list_loading = 'loading';
			const params = {};
			if (loadmore) {
				this.page += 1;
				params.page = this.page;
				if (this.list.length >= this.list_count) return (this.list_loading = 'nomore');
			}
			const res = await this.$request.post('/article/getList', params);
			this.list_count = res.count;
			this.list = [...this.list, ...res.lists];
			this.list_loading = 'loadmore';
		},
		// 登录模态框关闭
		loginModalCancel() {
			this.login_modal = false;
		},
		// 滑动到指定位置
		up_scroll() {
			const query = wx.createSelectorQuery();
			query.select('#banner_swiper').boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(function (res) {
				// console.log('res', res);
				uni.pageScrollTo({
					scrollTop: res[0].height - 88,
					duration: 300
				});
			});
		},
		// 跳转新品推荐详情
		open_product_details(id) {
			uni.navigateTo({
				url: `/pages/product/product_details?id=${id}&recomment=${true}`
			});
		},
		// 跳转新品推荐列表
		open_hot_list() {
			const params = {
				recomment: true
			};
			uni.navigateTo({
				url: `/pages/product/product_list?params=${JSON.stringify(params)}`
			});
		},
		// 跳转品牌列表
		open_brand_list() {
			uni.navigateTo({
				url: '/pages/brand/brand_list'
			});
		},
		// 跳转品牌动态详情
		open_brand_details(id) {
			uni.navigateTo({
				url: `/pages/brand/details?id=${id}`
			});
		}
		// 新品推荐 收藏
		// async is_collect_recomment(index, is_collect, id) {
		// 	const user_id = uni.getStorageSync('user_id');
		// 	if (!user_id) return (this.login_modal = true);
		// 	let collect = 0;
		// 	collect = is_collect == 0 ? (collect = 1) : (collect = 0);
		// 	const res = await this.$request.post('/new_product/setCollect', {
		// 		id,
		// 		type: collect
		// 	});
		// 	this.recommend_list[index].is_collect = collect;
		// 	is_collect == 0 ? (this.recommend_list[index].collect_num += 1) : (this.recommend_list[index].collect_num -= 1);
		// }
	}
};
</script>

<style>
page {
	background: #f8f8f8;
}

.swiper image {
	object-fit: cover;
}

.u-swiper__indicator {
	bottom: 370rpx !important;
}
</style>
<style lang="less" scoped>
.container {
	padding-bottom: 68px;

	/deep/ .u-navbar__content__left {
		display: none;
	}

	.swiper {
		// height: calc(100vh - 166rpx);
		position: relative;

		/deep/ .u-swiper {
			border-radius: 0 !important;
		}

		/deep/ image {
			border-radius: 0 !important;
		}

		.more {
			position: absolute;
			bottom: 190rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 10;
			text-align: center;

			.btn {
				width: 228rpx;
				height: 64rpx;
				display: block;
			}

			.btn_icon {
				width: 66rpx;
				height: 66rpx;
			}
		}
	}

	.banner_content {
		padding: 14rpx 20rpx;
	}

	.index_banner_logo {
		width: 100%;
		height: 70rpx;
	}

	.video_content {
		padding: 0 20rpx;

		.video {
			width: 100%;
			height: 374rpx;
		}
	}

	.recommend_swiper {
		padding-top: 20rpx;
		background: #f8f8f8;

		.swiper_conent {
			height: 570rpx;

			.swiper-item {
				padding-right: 20rpx;
				overflow: hidden;

				.cover {
					border-radius: 16rpx 16rpx 0 0;
					width: 100%;
					height: 352rpx;
				}

				.item_content {
					width: 100%;
					height: 150rpx;
					background: #fff;
					box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
					padding: 20rpx;
					border-radius: 0 0 16rpx 16rpx;

					.item_title {
						font-size: 28rpx;
						font-weight: 400;
						color: #313131;
						line-height: 33rpx;
					}

					.item_desc {
						font-size: 24rpx;
						font-weight: 400;
						color: #888888;
						line-height: 28rpx;
						margin: 12rpx 0;
					}

					.statuc {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.box {
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.text {
								padding-left: 6rpx;
								font-size: 22rpx;
								font-weight: 400;
								color: #cdcdcd;
							}

							.iconfont {
								font-size: 24rpx;
								color: #cdcdcd;
							}

							.active {
								color: #fcc863;
							}

							.white {
								color: #fff;
							}
						}
					}
				}
			}
		}

		/deep/ .wx-swiper-dot {
			width: 12rpx;
			height: 12rpx;
			transition: all 0.3s;
		}

		/deep/ .wx-swiper-dot-active {
			width: 36rpx;
			height: 12rpx;
			border-radius: 6rpx;
			background: #c6c6c6;
		}
	}

	.dynamic_list {
		padding: 0 20rpx;
		background: #f8f8f8;

		.list_item {
			background: #fff;
			border-radius: 16rpx;
			margin-bottom: 16rpx;
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			margin-bottom: 16rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.list_item_contenr {
				flex: 1;
				padding-right: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.item_title {
					font-size: 28rpx;
					font-weight: 500;
					color: #313131;
					line-height: 38rpx;
				}

				.item_desc {
					font-size: 26rpx;
					font-weight: 400;
					color: #888888;
					line-height: 36rpx;
					margin: 20rpx 0;
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.b_box {
						display: flex;
						align-items: center;
						font-size: 22rpx;
						font-weight: 400;
						color: #cdcdcd;

						.iconfont {
							font-size: 24rpx;
							color: #cdcdcd;
							padding-left: 16rpx;
						}

						.text {
							font-size: 22rpx;
							font-weight: 400;
							color: #cdcdcd;
							line-height: 26rpx;
							padding: 0 12rpx 0 6rpx;
						}

						.active {
							color: #fcc863;
						}

						.white {
							color: #fff;
						}
					}

					.box {
						padding-top: 10rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.icon {
							margin: 0 6rpx 0 12rpx;
						}
					}
				}
			}
		}
	}
}

.laodmore_content {
	padding-top: 20rpx;
}

.indicator {
	display: flex;
	justify-content: center;

	&__dot {
		width: 36rpx;
		height: 12rpx;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 6rpx 6rpx 6rpx 6rpx;
		opacity: 1;
		margin: 0 5px;
		transition: background-color 0.3s;

		&--active {
			background-color: #ffffff;
		}
	}
}
</style>