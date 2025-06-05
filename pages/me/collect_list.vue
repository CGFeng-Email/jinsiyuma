<!-- 收藏列表 -->
<template>
	<view class="container">
		<view class="collect_list">
			<FIXEDNAVBAR :navbar_title="navbar_title" :iconColor="true"></FIXEDNAVBAR>
			<view class="tabs_content" :style="'top:' + topIconDistance + 'px;'">
				<view class="tabs box_boaow">
					<view class="item" @click="tabs_item(0)">
						<text class="text" :class="tabs_index == 0 ? 'active' : ''">产品收藏</text>
					</view>
					<view class="line"></view>
					<view class="item" @click="tabs_item(1)">
						<text class="text" :class="tabs_index == 1 ? 'active' : ''">案例收藏</text>
					</view>
				</view>
			</view>
			<!-- 列表内容 -->
			<view class="list_content">
				<!-- 0:产品列表-->
				<view class="list" v-if="tabs_index == 0">
					<view class="item" v-for="(item, index) in list" :key="index" @click="open_details(item.id)">
						<view class="head">
							<view class="left">
								<image class="icon" src="/static/img/product_list_icon.png" mode="widthFix"></image>
								<text class="title">{{ item.title }}</text>
								<image class="hot" src="/static/img/hot.png" mode="widthFix" v-if="item.is_hot"></image>
							</view>
						</view>
						<view class="desc">
							<text class="text" v-if="item.color_name">{{ item.color_name }}</text>
							<text class="code" v-if="item.sn">编码：{{ item.sn }}</text>
						</view>
						<view class="item_content">
							<view class="item__content_left">
								<!-- 收藏 -->
								<view class="left_box" @click.stop="click_isCollect(index, item.id, item.is_collect)">
									<view class="icon">
										<i v-if="item.is_collect == 0" class="iconfont icon-shoucang2"></i>
										<i v-else class="iconfont icon-shoucang-yishoucang"></i>
									</view>
									<view class="text">
										{{ item.collect_num }}
									</view>
								</view>
								<!-- 浏览量 -->
								<view class="left_box">
									<view class="icon">
										<i class="iconfont icon-kanguos"></i>
									</view>
									<view class="text">
										<u-count-to :endVal="item.view_actual" color="#CDCDCD" fontSize="12"></u-count-to>
									</view>
								</view>
							</view>
							<view class="cover_box border-radius">
								<image class="cover" :src="item.image" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>

				<!-- 案例列表 -->
				<LIST class="list" :list="list" :hide_case_collect="true" v-else></LIST>

				<!-- 加载提示 -->
				<view class="loadmore_box">
					<u-loadmore :status="list_loading" loadingText="正在加载..." loadmoreText=" " iconColor="#606266" fontSize="12" iconSize="14" />
				</view>
			</view>
			<!-- 返回顶部 -->
			<TOPICON :topShow="topShow" :right_num="true"></TOPICON>
		</view>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
import LIST from '@/pages/case/list.vue';
export default {
	components: { FIXEDNAVBAR, LIST },
	data() {
		return {
			osName: '', // 系统型号
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			statusBarHeight: 0,
			navbar_title: '收藏',
			tabs_index: 0,
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			list: [],
			list_count: 0,
			page: 1,
			size: 10,
			topIconDistance: 0,
			share: {} // 分享数据
		};
	},
	async onLoad(e) {
		this.tabs_index = e.tabs_index;
		await this.getTopIconDistance();
		await this.get_list();
	},
	async onReachBottom() {
		await this.get_list(true);
	},
	// 分享
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			desc: this.share.desc,
			imageUrl: this.share.image,
			path: '/pages/index/index'
		};
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 1000 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 1000 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		// 更新分享数据
		open_share(e) {
			const { title, image, remark } = e;
			const obj = {
				title,
				image,
				desc: remark
			};
			this.share = obj;
		},
		// 获取状态栏导航栏高度
		getTopIconDistance() {
			uni.getSystemInfo({
				success: (res) => {
					// 获取手机顶部状态栏的高度
					const statusBarHeight = res.statusBarHeight || 0;
					// 计算顶部图标距离
					const topIconDistance = statusBarHeight + 44;
					// 打印顶部图标距离
					console.log('顶部图标距离:', topIconDistance);
					this.topIconDistance = topIconDistance;
				},
				fail: (err) => {
					console.error('获取系统信息失败:', err);
				}
			});
		},
		// tabs栏切换
		async tabs_item(i) {
			await this.initial_list(i);
			await this.get_list();
		},
		// 初始列表数组数据
		initial_list(i) {
			this.page = 1;
			this.tabs_index = i;
			this.list = [];
		},
		async get_list(loadmore = false) {
			this.list_loading = 'loading';
			let page = this.page;
			const size = this.size;
			const tabs_index = this.tabs_index;
			if (loadmore) {
				page += 1;
				this.page = page;
				if (this.list.length >= this.list_count) return (this.list_loading = 'nomore');
			}
			let url = '';
			if (tabs_index == 0) {
				url = '/product/getCollect';
			} else if (tabs_index == 1) {
				url = '/example/getCollect';
			}
			const res = await this.$request.post(url, {
				page,
				size
			});
			console.log('收藏列表', res);
			this.list_count = res.count;
			this.list = [...this.list, ...res.lists];
			if (this.list.length >= this.list_count) return (this.list_loading = 'nomore');
			this.list_loading = 'loadmore';
		},
		// 是否收藏
		async click_isCollect(index, id, is_collect) {
			const tabs_index = this.tabs_index;
			let collect = is_collect == 0 ? 1 : 0;
			let url = '';
			if (tabs_index == 0) {
				url = '/product/setCollect';
			} else if (tabs_index == 1) {
				url = '/example/setCollect';
			} else if (tabs_index == 2) {
				url = '/new_product/setCollect';
			} else {
				url = '/article/setCollect';
			}
			const res = await this.$request.post(url, {
				id,
				type: collect
			});
			this.list.splice(index, 1);
		},
		// 品牌动态点赞
		async is_praise(index, item) {
			const res = await this.$request.post('/article/setLike', {
				id: item.id,
				type: item.is_like == 0 ? 1 : 0
			});

			if (item.is_like == 0) {
				item.is_like = 1;
				item.like += 1;
			} else {
				item.is_like = 0;
				item.like -= 1;
			}

			this.$set(this.list, index, item);
		},
		// 跳转详情
		open_details(id) {
			const tabs_index = this.tabs_index;
			let details_url = '';
			if (tabs_index == 0) {
				details_url = `/pages/product/product_details?id=${id}`;
			} else if (tabs_index == 2) {
				details_url = `/pages/product/product_details?id=${id}&recomment=${true}`;
			} else if (tabs_index == 3) {
				details_url = `/pages/brand/brand_details?id=${id}`;
			}
			uni.navigateTo({
				url: details_url
			});
		}
	}
};
</script>

<style>
page {
	background: #fff !important;
}
</style>
<style lang="less" scoped>
.collect_list {
	padding-top: 100rpx;
	.tabs_content {
		position: fixed;
		top: 88px;
		left: 0;
		width: 100%;
		height: 100rpx;
		z-index: 10;
		background: #fff;
		.tabs {
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: center;
			.item {
				height: 100rpx;
				line-height: 100rpx;
				flex: 1;
				.text {
					font-size: 26rpx;
					font-weight: 400;
					color: #7c7c7c;
					padding-bottom: 6rpx;

					position: relative;
					&::after {
						content: '';
						position: absolute;
						bottom: -6rpx;
						left: 0;
						transform: translateX(-50%);
						width: 0;
						height: 2px;
						border-radius: 10rpx;
						overflow: hidden;
						background: #fff;
						transition: all 0.5s ease;
					}
				}
				.active {
					font-weight: 600;
					color: #0a2b4e;
					// border-bottom: 1px solid #0a2b4e;
					&::after {
						width: 70%;
						left: 50%;
						transform: translateX(-50%);
						background: #0a2b4e;
					}
				}
			}
			.line {
				width: 1px;
				height: 20rpx;
				background: #7c7c7c;
				border-radius: 4rpx;
				opacity: 0.5;
			}
		}
		.box_boaow {
			box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
		}
	}

	.tabs_content_macos {
		top: 64px;
	}

	.tabs_content_windows {
		top: 44px;
	}

	.list_content {
		.list {
			.item {
				background: #fff;
				margin-bottom: 10rpx;
				&:last-child {
					margin-bottom: 0;
				}
				.head {
					padding: 30rpx 30rpx 0 30rpx;
					display: flex;
					justify-content: space-between;
					.left {
						flex: 1;
						display: flex;
						.icon {
							margin-top: 8rpx;
							width: 12rpx;
							height: 26rpx;
							flex: none;
						}
						.hot {
							margin-top: 8rpx;
							margin-left: 6rpx;
							width: 32rpx;
							height: 32rpx;
							flex: none;
						}
						.title {
							font-size: 30rpx;
							font-weight: 600;
							color: #313131;
							padding-left: 10rpx;
						}
					}
				}
				.desc {
					font-size: 26rpx;
					line-height: 36rpx;
					font-weight: 400;
					color: #979797;
					padding: 10rpx 20rpx 30rpx 52rpx;
					display: flex;
					justify-content: space-between;
					.text {
						flex: 1;
					}
					.code {
						padding-left: 20rpx;
						flex: none;
					}
				}
				.item_content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 20rpx;
					padding-right: 20rpx;
					.item__content_left {
						width: 122rpx;
						display: flex;
						height: 100%;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						padding-left: 52rpx;
						flex: none;
						.left_box {
							text-align: center;
							padding-right: 28rpx;
							padding-bottom: 20rpx;
						}
						.icon {
							.iconfont {
								font-size: 36rpx;
								color: #cdcdcd;
							}
							.icon-shoucang-yishoucang {
								color: #fcc863;
							}
						}
						.text {
							padding-bottom: 20rpx;
							font-size: 24rpx;
							color: #cdcdcd;
						}
					}
					.cover_box {
						flex: 1;
						height: 350rpx;
						overflow: hidden;
						background: #f8f8f8;
					}
				}
			}
		}
	}
}

.brand_list {
	padding: 20rpx;
	padding-bottom: 0;
	.item {
		padding: 20rpx 0 0;
		border-bottom: 1px solid #f8f8f8;
		.top_content {
			display: flex;
			justify-content: space-between;
			.left_content {
				flex: 1;
				padding-right: 20rpx;
				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #313131;
					line-height: 42rpx;
				}
				.desc {
					font-size: 26rpx;
					font-weight: 400;
					color: #888888;
					line-height: 30rpx;
					padding: 10rpx 0;
				}
				.static {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;
					.time {
						font-size: 22rpx;
						font-family: Inter-Regular, Inter;
						font-weight: 400;
						color: #cdcdcd;
						line-height: 26rpx;
					}
					.right_static {
						display: flex;
						align-items: center;
						.rs_box {
							display: flex;
							align-items: center;
							padding-left: 20rpx;
							.iconfont {
								font-size: 22rpx;
							}
							.text {
								font-size: 22rpx;
								font-weight: 400;
								color: #cdcdcd;
								line-height: 26rpx;
								padding: 0 12rpx 0 4rpx;
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

			.cover {
				width: 264rpx;
				height: 186rpx;
				border-radius: 8rpx;
			}
		}
		.bottom_content {
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.b_left {
				font-size: 26rpx;
				font-family: Inter-Semi Bold, Inter;
				font-weight: 600;
				color: #717171;
				line-height: 30rpx;
			}
			.icon {
				.iconfont {
					font-size: 40rpx;
					color: #cdcdcd;
				}
				/deep/ button {
					margin: 0;
					padding: 0;
					background-color: none;
					line-height: 38rpx;
					border: 0;
					outline: none;
					box-shadow: none;
					color: transparent;
					&:after {
						display: none;
					}
				}
			}
		}
	}
}
</style>
