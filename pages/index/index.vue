<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view v-if="!loading" class="index_content">
			<u-navbar :title="scroll_number <= 44 ? ' ' : navbar_title" :bgColor="scroll_number <= 44 ? navbar_bg : 'rgba(255, 255, 255, .9)'" :titleStyle="navbarStyle"></u-navbar>
			<view class="swiper" id="banner_swiper">
				<u-swiper
					height="100vh"
					:indicator="true"
					:circular="true"
					:easingFunction="easeInCubic"
					indicatorActiveColor="#fff"
					indicatorInactiveColor="#DDDDDC"
					:list="banner_list"
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
				<image class="border-radius box-shadow index_banner_logo" src="/static/img/index_logo2.jpg" mode="widthFix"></image>
			</div>
			<view class="video_content banner_content">
				<video
					class="video border-radius box-shadow"
					:src="video_src"
					:muted="video_muted"
					:controls="true"
					autoplay
					loop
					object-fit="cover"
					show-mute-btn
					enable-play-gesture
					play-btn-position="center"
				></video>
			</view>
			<view class="head_content">
				<view class="head_title">新品推荐</view>
				<view class="head_text" @click="open_hot_list">
					更多
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="recommend_swiper">
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
						<view class="swiper-item" @click="open_product_details">
							<image class="cover" :src="item.cover" mode="widthFix"></image>

							<view class="item_content">
								<view class="item_title over1">{{ item.title }}</view>
								<view class="item_desc">{{ item.desc }}</view>
								<view class="statuc">
									<view class="box">
										<i class="iconfont icon-kanguos"></i>
										<text class="text">{{ item.see }}</text>
									</view>
									<view class="box">
										<i v-if="item.collect" class="iconfont icon-shoucang2"></i>
										<i v-else class="iconfont icon-shoucang3 active"></i>
										<text class="text">{{ item.collect_num }}</text>
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
			<view class="dynamic_list">
				<view class="list_item" v-for="(item, index) in list" :key="index" @click="open_brand_details">
					<view class="list_item_contenr">
						<view class="top">
							<view class="item_title">{{ item.title }}</view>
							<view class="item_desc">{{ item.desc }}</view>
						</view>
						<view class="bottom">
							<view class="b_box">{{ item.time }}</view>
							<view class="b_box box">
								<i class="iconfont icon-kanguos"></i>
								<text class="lis">{{ item.see }}</text>
								<i v-if="item.is_true" class="iconfont icon-dianzan6"></i>
								<i v-else class="iconfont icon-yizan active"></i>
								<text class="lis">{{ item.collect }}</text>
							</view>
						</view>
					</view>
					<u--image class="cover" :showLoading="true" radius="4" :src="item.image" width="132px" height="93px" :fade="true" duration="200"></u--image>
				</view>
			</view>
			<!-- 加载提示 -->
			<view class="loadmore_box">
				<u-loadmore :status="list_loading" loadingText=" " loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
			</view>
			<!-- 联系我们 -->
			<CONTACTUS :topShow="topShow"></CONTACTUS>
			<!-- 返回顶部 -->
			<TOPICON :topShow="topShow"></TOPICON>
			<!-- 底部栏 -->
			<TABBAR :tabbar_bg="tabbar_bg"></TABBAR>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true,
			tabbar_bg: false, // tabbar背景颜色
			topShow: false, // 控制联系我们按钮距离底部的距离
			video_muted: true, // 默认静音播放
			more_scroll: 0, // 下拉更多滚动距离
			navbar_bg: 'transparent',
			navbar_title: '金丝玉玛',
			navbarStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			scroll_number: 0,
			current: 0,
			banner_list: [
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner06.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner07.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner08.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner09.png'
			],
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/banner.png',
			video_src: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/MP4/video.mp4',
			recommend_list: [
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					see: 867,
					collect_num: 10,
					collect: true
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '贝拉柔光750*1500',
					desc: '现代简约风',
					see: 1267,
					collect_num: 44,
					collect: false
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					see: 8267,
					collect_num: 27,
					collect: true
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					see: 867,
					collect_num: 10,
					collect: false
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					see: 867,
					collect_num: 10,
					collect: true
				}
			],
			recommend_item_number: 2,
			recommend_current: 0,
			list: [], // 列表数据
			list_loading: 'loadmore' // 加载前值为loadmore，加载中为loading，没有数据为nomore
		};
	},
	async onLoad() {
		uni.hideTabBar(); 
		await this.get_list();
		this.loading = false;
		this.contact_us_height = getApp().globalData.windowHeight;
	},
	onReady() {},
	onReachBottom() {
		this.get_list();
	},
	methods: {
		onPageScroll(e) {
			this.scroll_number = Number(Math.floor(e.scrollTop));
			// console.log('this.scroll_number', this.scroll_number);
			
			if (this.scroll_number > 270) {
				this.tabbar_bg = true;
				this.video_muted = false;
			} else {
				this.tabbar_bg = false;
			}

			if (this.scroll_number > 450 && this.topShow == false) {
				this.topShow = true;
			} else if (this.scroll_number < 450 && this.topShow == true) {
				this.topShow = false;
			}
		},
		up_scroll() {
			const query = wx.createSelectorQuery();
			query.select('#banner_swiper').boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(function (res) {
				console.log('res',res);
				uni.pageScrollTo({
					scrollTop: res[0].height - 88,
					duration: 300
				});
			});
		},
		// 跳转产品详情
		open_product_details() {
			uni.navigateTo({
				url: '/pages/product/product_details'
			});
		},
		// 跳转新品推荐
		open_hot_list() {
			uni.navigateTo({
				url: '/pages/product/product_list'
			});
		},
		// 跳转品牌列表
		open_brand_list() {
			uni.navigateTo({
				url: '/pages/brand/brand_list'
			});
		},
		// 跳转品牌动态详情
		open_brand_details() {
			uni.navigateTo({
				url: '/pages/brand/brand_details'
			});
		},
		async get_list() {
			this.list_loading = 'loading';
			if (this.list.length >= 100) return (this.list_loading = 'nomore');
			const { data } = await this.list_data();
			this.list = [...this.list, ...data];
			console.log('list', this.list);
			this.list_loading = 'loadmore';
		},
		// 列表
		list_data() {
			return new Promise((resolve) => {
				// 图片
				const imgs = [
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover2.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover4.png'
				];

				// 标题
				const title_list = ['金丝玉玛是专业从事瓷砖及其相关配套产品', '轻奢｜既厚重华丽又具', '奶油风｜清浅氛国书写', '佗寂风｜自然 本真 极简'];

				// 查看
				const see = [1523, 876, 986, 27];

				// 收藏
				const collect = [56, 88, 89, 124];

				// 是否收藏
				const is_true = [true, false, false, true];

				const doFn = (i) => {
					const randomIndex = Math.floor(Math.random() * 4);
					return {
						image: imgs[randomIndex],
						title: title_list[randomIndex],
						see: see[randomIndex],
						collect: collect[randomIndex],
						is_true: is_true[randomIndex],
						desc: '后现代风',
						time: '2023-07-16'
					};
				};

				// 模拟异步
				let list = [];
				// 20条数据
				setTimeout(() => {
					for (let i = 0; i < 20; i++) {
						list.push(doFn(i));
					}
					resolve({ data: list });
				}, 400);
			});
		}
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
							font-size: 22rpx;
							font-weight: 400;
							color: #cdcdcd;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.text {
								padding-left: 6rpx;
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
					font-weight: bold;
					color: #313131;
					line-height: 33rpx;
				}
				.item_desc {
					font-size: 26rpx;
					font-weight: 400;
					color: #888888;
					line-height: 30rpx;
					margin: 20rpx 0;
				}
				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.b_box {
						font-size: 22rpx;
						font-weight: 400;
						color: #cdcdcd;
						line-height: 26rpx;
						.iconfont {
							font-size: 24rpx;
							color: #cdcdcd;
							padding-left: 16rpx;
						}
						.lis {
							padding: 0 12rpx 0 6rpx;
						}
						.active {
							color: #fcc863;
						}
					}
					.box {
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
