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
					<u-swipe-action>
						<block v-if="tabs_index == 0">
							<u-swipe-action-item class="u_swiper_content" v-for="(item, index) in list" :key="index" :options="options3" @click="item_del(index)">
								<view class="item border-radius">
									<view class="time">06-19</view>
									<view class="item_content">
										<view class="circle">
											<i class="iconfont icon-left"></i>
										</view>
										<view class="right_content new_product border-radius box-shadow" @click="item_click">
											<view class="item_title">
												<view class="left">
													<image class="icon" src="/static/img/product_list_icon.png" mode="widthFix"></image>
													<view class="text">{{ item.title }}</view>
												</view>
												<view class="desc">D654P</view>
											</view>
											<view class="bottom_content">
												<view class="bc_left">
													<view class="icon_box">
														<i class="iconfont icon-shoucang2" v-if="item.is_true"></i>
														<i class="iconfont icon-shoucang3 active" v-else></i>
														<text class="text">{{ item.collect }}</text>
													</view>
													<view class="icon_box">
														<i class="iconfont icon-kanguos"></i>
														<text class="text">{{ item.see }}</text>
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
						<block v-else-if="tabs_index == 1">
							<u-swipe-action-item v-for="(item, index) in list" :key="index" :options="options3" @click="change_item(index)">
								<view class="item border-radius">
									<view class="time">06-19</view>
									<view class="item_content">
										<view class="circle">
											<i class="iconfont icon-left"></i>
										</view>
										<view class="right_content brand_content border-radius box-shadow" @click="item_click">
											<view class="brand_left">
												<view class="brand_title over2">
													{{ item.title }}
												</view>
												<view class="brand_bottom">
													<view class="brand_desc">#装修宝典</view>
													<view class="brand_static">
														<view class="brnad_icon_box">
															<i class="iconfont icon-kanguos"></i>
															<text class="brand_text">{{ item.see }}</text>
														</view>
														<view class="brnad_icon_box">
															<i class="iconfont icon-dianzan6" v-if="item.is_true"></i>
															<i class="iconfont icon-yizan" v-else></i>
															<text class="brand_text">{{ item.see }}</text>
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
						<block v-else-if="tabs_index == 2">
							<u-swipe-action-item v-for="(item, index) in list" :key="index" :options="options3" @click="change_item(index)">
								<view class="item border-radius">
									<view class="time">06-19</view>
									<view class="item_content">
										<view class="circle">
											<i class="iconfont icon-left"></i>
										</view>
										<view class="right_content new_product border-radius box-shadow" @click="item_click">
											<view class="item_title">
												<view class="left">
													<image class="icon" src="/static/img/product_list_icon.png" mode="widthFix"></image>
													<text class="text">{{ item.title }}</text>
												</view>
												<view class="desc">D654P</view>
											</view>
											<view class="bottom_content">
												<view class="bc_left">
													<view class="icon_box">
														<i class="iconfont icon-shoucang2" v-if="item.is_true"></i>
														<i class="iconfont icon-shoucang3 active" v-else></i>
														<text class="text">{{ item.collect }}</text>
													</view>
													<view class="icon_box">
														<i class="iconfont icon-kanguos"></i>
														<text class="text">{{ item.see }}</text>
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
						<block v-else>
							<u-swipe-action-item v-for="(item, index) in list" :key="index" :options="options3" @click="change_item(index)">
								<view class="item border-radius">
									<view class="time">06-19</view>
									<view class="item_content">
										<view class="circle">
											<i class="iconfont icon-left"></i>
										</view>
										<view class="right_content brand_content border-radius box-shadow" @click="item_click">
											<view class="brand_left">
												<view class="brand_title over2">
													{{ item.title }}
												</view>
												<view class="brand_bottom">
													<view class="brand_desc">#装修宝典</view>
													<view class="brand_static">
														<view class="brnad_icon_box">
															<i class="iconfont icon-kanguos"></i>
															<text class="brand_text">{{ item.see }}</text>
														</view>
														<view class="brnad_icon_box">
															<i class="iconfont icon-dianzan6" v-if="item.is_true"></i>
															<i class="iconfont icon-yizan" v-else></i>
															<text class="brand_text">{{ item.see }}</text>
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
				</view>
				<!-- 加载提示 -->
				<view class="loadmore_box">
					<u-loadmore :status="list_loading" loadingText=" " loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
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
			// banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/history_banner.png',
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/history/history_top_banner.jpg',
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			navbar_style: {
				color: '#fff'
			},
			tabs_index: 0, // 导航栏索引
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			list: [],
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
	onLoad() {
		this.get_list();
	},
	onReachBottom() {
		this.get_list();
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
		tabs_item(i) {
			this.tabs_index = i;
			this.list = [];
			this.get_list();
		},
		async get_list() {
			if (this.list.length >= 100) return (this.list_loading = 'nomore');
			this.list_loading = 'loading';
			const { data } = await this.data_list();
			this.list = [...this.list, ...data];
			console.log('list', this.list);
			this.list_loading = 'loadmore';
		},
		data_list() {
			return new Promise((resolve) => {
				const cover_list = [
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_list_cover.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover2.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover3.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover4.png'
				];

				// 标题
				const title_list = ['户主故事｜她把法式轻奢装进家， 时尚博主骨子里的浪漫,', '丝帛羽白', '轻奢｜既厚重华丽又具', '奶油风｜清浅氛国书写', '佗寂风｜自然 本真 极简'];

				// 查看
				const see = [1523, 876, 986, 27, 36];

				// 收藏
				const collect = [56, 88, 89, 124, 76];

				// 是否收藏
				const is_true = [true, false, false, true, false];

				const get_data = (i) => {
					const randomIndex = Math.floor(Math.random() * 5);
					return {
						image: cover_list[randomIndex],
						title: title_list[randomIndex],
						see: see[randomIndex],
						collect: collect[randomIndex],
						is_true: is_true[randomIndex],
						desc: '星寂之夜900*1800'
					};
				};

				const list = [];

				setTimeout(() => {
					for (let i = 0; i < 20; i++) {
						list.push(get_data(i));
					}
					resolve({ data: list });
				}, 1300);
			});
		},
		// 删除索引
		item_del(e) {
			console.log(e);
		},
		// 跳转详情
		item_click() {
			console.log('details', this.tabs_index);
			const index = this.tabs_index;
			if (index == 0) {
				uni.navigateTo({
					url: '/pages/product/product_details'
				});
			} else if (index == 1) {
				uni.navigateTo({
					url: '/pages/brand/brand_details'
				});
			} else if (index == 2) {
				uni.navigateTo({
					url: '/pages/product/product_details'
				});
			} else {
				uni.navigateTo({
					url: '/pages/case/details'
				});
			}
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
