<!-- 浏览历史 -->
<template>
	<view class="container">
		<view class="history">
			<u-navbar :titleStyle="navbar_style" title="浏览历史" :autoBack="true" bgColor="transparent" placeholder leftIconColor="#fff"></u-navbar>
			<view class="banner_content">
				<image class="cover box-shadow" :src="banner" mode="widthFix"></image>
				<view class="list">
					<view class="li" :class="{ active: tabs_index == 0 }" @click="tabs_item(0)">
						<text class="text box-shadow">新品</text>
					</view>
					<view class="li" :class="{ active: tabs_index == 1 }" @click="tabs_item(1)">
						<text class="text box-shadow">品牌</text>
					</view>
					<view class="li" :class="{ active: tabs_index == 2 }" @click="tabs_item(2)">
						<text class="text box-shadow">产品馆</text>
					</view>
					<view class="li" :class="{ active: tabs_index == 3 }" @click="tabs_item(3)">
						<text class="text box-shadow">案例馆</text>
					</view>
				</view>
			</view>
			<view class="list_content">
				<view class="list">
					<u-transition :show="true">
						<u-swipe-action>
							<block v-if="tabs_index == 0 || tabs_index == 2">
								<u-swipe-action-item class="u_swiper_content" v-for="(item, index) in list" :key="index" :options="options3" @click="item_del(index, item.id)">
									<view class="item border-radius">
										<view class="time">{{ item.add_at }}</view>
										<view class="item_content">
											<view class="circle">
												<i class="iconfont icon-left"></i>
											</view>
											<view class="right_content new_product border-radius box-shadow" @click="open_details(item.id)">
												<view class="item_title">
													<view class="left">
														<image class="icon" src="/static/img/product_list_icon.png" mode="widthFix"></image>
														<view class="text">{{ item.title }}</view>
													</view>
													<view class="desc">{{ item.sn }}</view>
												</view>
												<view class="bottom_content">
													<view class="bc_left">
														<!-- 收藏 -->
														<view class="icon_box" @click.stop="click_isCollect(index, item.id, item.is_collect)">
															<i class="iconfont icon-shoucang3 active" v-if="item.is_collect"></i>
															<i class="iconfont icon-shoucang2" v-else></i>
															<text class="text">{{ item.collect_num }}</text>
														</view>
														<!-- 浏览 -->
														<view class="icon_box">
															<i class="iconfont icon-kanguos"></i>
															<text class="text">{{ item.view_actual }}</text>
														</view>
													</view>
													<view class="cover_box">
														<image class="cover" :src="item.image"></image>
													</view>
												</view>
											</view>
										</view>
									</view>
								</u-swipe-action-item>
							</block>
							<block v-else-if="tabs_index == 1 || tabs_index == 3">
								<u-swipe-action-item v-for="(item, index) in list" :key="index" :options="options3" @click="item_del(index, item.id)">
									<view class="item border-radius">
										<view class="time">{{ item.add_at }}</view>
										<view class="item_content">
											<view class="circle">
												<i class="iconfont icon-left"></i>
											</view>
											<view class="right_content brand_content border-radius box-shadow" @click="open_details(item.id)">
												<view class="brand_left">
													<view class="brand_title over2">
														{{ item.title }}
													</view>
													<view class="brand_bottom">
														<view class="brand_desc" v-if="tabs_index == 1">#{{ item.cate_name }}</view>
														<view class="brand_desc" v-if="tabs_index == 3">{{ item.serie_name }}</view>
														<view class="brand_static">
															<!-- 浏览 -->
															<view class="brnad_icon_box">
																<i class="iconfont icon-kanguos"></i>
																<text class="brand_text" v-if="tabs_index == 1">{{ item.click }}</text>
																<text class="brand_text" v-if="tabs_index == 3">{{ item.view_actual }}</text>
															</view>
															<!-- 点赞 -->
															<view class="brnad_icon_box" v-if="tabs_index == 1" @click.stop="is_praise(item.id, item.is_like, index)">
																<i class="iconfont icon-yizan active" v-if="item.is_like"></i>
																<i class="iconfont icon-dianzan6" v-else></i>
																<text class="brand_text">{{ item.like }}</text>
															</view>
															<view class="brnad_icon_box" v-if="tabs_index == 3" @click.stop="is_praise(item.id, item.is_like, index)">
																<i class="iconfont icon-yizan active" v-if="item.is_like"></i>
																<i class="iconfont icon-dianzan6" v-else></i>
																<text class="brand_text">{{ item.like_actual }}</text>
															</view>
														</view>
													</view>
												</view>
												<view class="brand_right cover_box">
													<image class="cover border-radius" :src="item.image"></image>
												</view>
											</view>
										</view>
									</view>
								</u-swipe-action-item>
							</block>
						</u-swipe-action>
					</u-transition>
				</view>
				<!-- 加载提示 -->
				<view class="loadmore_box">
					<u-loadmore :status="list_loading" loadingText="正在加载..." loadmoreText=" " color="#606266" iconColor="#606266" fontSize="12" iconSize="14" />
				</view>
				<!-- 返回顶部 -->
				<TOPICON :topShow="topShow" :details="true" :right_num="true"></TOPICON>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			banner: '', // banner
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			navbar_style: {
				color: '#313131',
				fontSize: '14px',
				fontWeight: 600
			},
			tabs_index: 0, // 导航栏索引
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			list: [],
			page: 1,
			size: 10,
			// 删除按钮样式
			options3: [
				{
					icon: 'trash-fill',
					iconSize: '24',
					style: {
						color: '#E20C14'
					}
				}
			]
		};
	},
	async onLoad() {
		await this.initial();
		await this.get_list();
	},
	onReachBottom() {
		this.get_list(true);
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 600 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 600 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		async initial() {
			return new Promise((resolve, reject) => {
				try {
					const app = getApp();
					this.banner = app.globalData.history_banner;
					resolve();
				} catch (e) {
					//TODO handle the exception
				}
			});
		},
		// tabs
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
				url = '/new_product/getHistory';
			} else if (tabs_index == 1) {
				url = '/article/getHistory';
			} else if (tabs_index == 2) {
				url = '/product/getHistory';
			} else {
				url = '/example/getHistory';
			}
			const res = await this.$request.post(url, {
				page,
				size
			});
			console.log('浏览历史', res);
			this.list_count = res.count;
			this.list = [...this.list, ...res.lists];
			if (this.list.length >= this.list_count) return (this.list_loading = 'nomore');
			this.list_loading = 'loadmore';
		},
		// 是否收藏
		async click_isCollect(index, id, is_collect) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			const tabs_index = this.tabs_index;
			let collect = is_collect ? 0 : 1;
			let url = '';
			if (tabs_index == 0) {
				url = '/new_product/setCollect';
			} else if (tabs_index == 1) {
				url = '/article/setLike';
			} else if (tabs_index == 2) {
				url = '/product/setCollect';
			} else {
				url = '/example/setCollect';
			}
			const res = await this.$request.post(url, {
				id,
				type: collect
			});
			if (is_collect) {
				this.list[index].is_collect = false;
				this.list[index].collect_num -= 1;
			} else {
				this.list[index].is_collect = true;
				this.list[index].collect_num += 1;
			}
			uni.hideLoading();
		},
		// 是否点赞
		async is_praise(id, is_like, index) {
			const tabs_index = this.tabs_index;
			let url = '';
			if (tabs_index == 0) {
				url = '/new_product/setLike';
			} else if (tabs_index == 1) {
				url = '/article/setLike';
			} else if (tabs_index == 2) {
				url = '/product/setLike';
			} else {
				url = '/example/setLike';
			}
			const res = await this.$request.post(url, {
				id,
				type: is_like ? 0 : 1
			});
			if (tabs_index == 1) {
				if (is_like) {
					this.list[index].like -= 1;
					this.list[index].is_like = false;
				} else {
					this.list[index].like += 1;
					this.list[index].is_like = true;
				}
			} else if (tabs_index == 3) {
				if (is_like) {
					this.list[index].like_actual -= 1;
					this.list[index].is_like = false;
				} else {
					this.list[index].like_actual += 1;
					this.list[index].is_like = true;
				}
			}
		},
		// 跳转详情
		open_details(id) {
			const tabs_index = this.tabs_index;
			let details_url = '';
			if (tabs_index == 0) {
				details_url = `/pages/product/product_details?id=${id}&recomment=${true}`;
			} else if (tabs_index == 1) {
				details_url = `/pages/brand/brand_details?id=${id}`;
			} else if (tabs_index == 2) {
				details_url = `/pages/product/product_details?id=${id}`;
			} else {
				details_url = `/pages/case/details?id=${id}`;
			}
			uni.navigateTo({
				url: details_url
			});
		},
		// 删除索引
		async item_del(i, id) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			const tabs_index = this.tabs_index;
			let url = '';
			const params = {};
			if (tabs_index == 0) {
				params.product_id = id;
				url = '/new_product/delHistory';
			} else if (tabs_index == 1) {
				url = '/article/delHistory';
				params.article_id = id;
			} else if (tabs_index == 2) {
				url = '/product/delHistory';
				params.product_id = id;
			} else {
				url = '/example/delHistory';
				params.product_id = id;
			}
			const res = await this.$request.post(url, params);
			this.list.splice(i, 1);
			uni.hideLoading();
		}
	}
};
</script>

<style>
.u-swipe-action-item__right__button__wrapper {
	background: #fff !important;
	padding: 0 8px !important;
}

.u-swipe-action-item__right__button__wrapper .u-icon {
	background: #ffdbdb;
	width: 70rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	border-radius: 50%;
	justify-content: center;
}
.u-swipe-action-item {
	margin-bottom: 10rpx;
}
</style>
<style lang="less" scoped>
.history {
	padding-top: 360rpx;
	.banner_content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 520rpx;
		z-index: 10;
		background: #fff;
		.cover {
			width: 100%;
		}
		.list {
			position: absolute;
			bottom: 10rpx;
			right: 0;
			width: 300rpx;
			height: 258rpx;
			.li {
				text-align: right;
				.text {
					border-radius: 12rpx 0 0 12rpx;
					font-size: 26rpx;
					font-weight: 600;
					color: #919191;
					background: #fff;
					padding: 10rpx 30rpx;
					display: inline-block;
					margin-bottom: 10rpx;
				}
			}
			.active {
				.text {
					color: #fff;
					background: linear-gradient(50deg, #0a2b4e 0%, rgba(10, 43, 78, 0.2) 100%);
				}
			}
		}
	}

	.list_content {
		position: relative;
		z-index: 3;
		padding: 20rpx 0;
		.list {
			.item {
				padding-bottom: 40rpx;
				overflow: hidden;
				&:last-child {
					padding-bottom: 0;
				}
				.time {
					font-size: 24rpx;
					font-weight: 400;
					color: #888888;
					padding: 20rpx 0;
					text-align: center;
				}
				.item_content {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.circle {
					.iconfont {
						font-size: 42rpx;
						color: #888888;
					}
					margin: 0 30rpx;
				}
				.right_content {
					flex: 1;
					background: #fff;
					padding-bottom: 20rpx;
					transform: translateY(-2px);
				}
				// 新品，产品馆
				.new_product {
					.item_title {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 20rpx;
						.left {
							flex: 1;
							display: flex;
							align-items: center;
							padding-left: 10rpx;
							.icon {
								width: 12rpx;
								flex: none;
							}
							.text {
								width: 500rpx;
								font-size: 28rpx;
								font-weight: 600;
								color: #313131;
								padding: 0 10rpx 0 20rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
						.desc {
							text-align: left;
							width: 120rpx;
							font-size: 22rpx;
							font-weight: 400;
							color: #3e3e3e;
						}
					}

					.bottom_content {
						display: flex;
						.bc_left {
							width: 84rpx;
							padding: 30rpx 0;
							.icon_box {
								text-align: center;
								padding: 30rpx 0;
								.iconfont {
									color: #cdcdcd;
									font-size: 36rpx;
								}
								.text {
									font-size: 22rpx;
									font-family: Inter-Regular, Inter;
									font-weight: 400;
									color: #cdcdcd;
								}
								.active {
									color: #fcc863;
								}
							}
						}
						.cover_box {
							background: none;
							.cover {
								width: 602rpx;
								height: 350rpx;
								border-radius: 0 0 16rpx 16rpx;
								overflow: hidden;
							}
						}
					}
				}

				// 品牌, 案例馆
				.brand_content {
					display: flex;
					justify-content: space-between;
					padding: 20rpx 28rpx;
					.brand_left {
						flex: 1;
						padding-right: 28rpx;
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						.brand_title {
							font-size: 28rpx;
							font-weight: 600;
							color: #313131;
							line-height: 42rpx;
						}
						.brand_bottom {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.brand_desc {
								font-size: 26rpx;
								font-weight: 600;
								color: #717171;
							}
							.brand_static {
								display: flex;
								align-items: center;
								.brnad_icon_box {
									font-size: 24rpx;
									font-weight: 400;
									color: #cdcdcd;
									display: flex;
									align-items: center;
									padding-left: 6rpx;
									.brand_text {
										padding: 0 10rpx;
									}
									.iconfont {
										font-size: 24rpx;
										color: #cdcdcd;
									}
									.active {
										color: #fcc863;
									}
								}
							}
						}
					}

					.brand_right {
						flex: none;
						.cover {
							width: 206rpx;
							height: 144rpx;
							object-fit: cover;
						}
					}
				}
			}
		}
	}
}
</style>
