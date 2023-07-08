<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view v-if="!loading" class="index_content">
			<u-navbar :title="scroll_number <= 44 ? ' ' : navbar_title" :bgColor="scroll_number <= 44 ? navbar_bg : 'rgba(255, 255, 255, .8)'"></u-navbar>
			<view class="swiper">
				<u-swiper
					height="100vh"
					:indicator="true"
					:circular="true"
					:easingFunction="easeInCubic"
					indicatorActiveColor="#fff"
					indicatorInactiveColor="#DDDDDC"
					:list="list"
					@change="(e) => (current = e.current)"
				>
					<view slot="indicator" class="indicator">
						<view class="indicator__dot" v-for="(item, index) in list" :key="index" :class="[index === current && 'indicator__dot--active']"></view>
					</view>
				</u-swiper>
				<view class="more">
					<image class="btn" src="../../static/img/more.png" mode="aspectFit"></image>
					<image class="btn_icon animation_up" src="../../static/img/more_icon.png" mode="aspectFit"></image>
				</view>
			</view>
			<div class="banner_content">
				<u--image :showLoading="true" :src="banner" width="100%" height="90rpx" :fade="true" duration="200"></u--image>
			</div>
			<view class="video_content .banner_content">
				<video class="video" :src="video_src" :controls="true" autoplay loop object-fit="cover" :muted="true"></video>
			</view>
			<view class="head_content">
				<view class="head_title">新品推荐</view>
				<view class="head_text">
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
						<view class="swiper-item">
							<u--image class="cover" :showLoading="true" :src="item.cover" width="166px" height="176px" :fade="true" duration="200"></u--image>
							<view class="item_content">
								<view class="item_title over1">{{ item.title }}</view>
								<view class="item_desc">{{ item.desc }}</view>
								<view class="statuc">
									<view class="box">
										<u--image :showLoading="true" src="/static/img/eye.png" width="12px" height="12px" :fade="true" duration="200"></u--image>
										<text class="text">{{ item.see }}</text>
									</view>
									<view class="box">
										<u--image
											v-if="item.collect"
											:showLoading="true"
											src="/static/img/star.png"
											width="12px"
											height="12px"
											:fade="true"
											duration="200"
										></u--image>
										<u--image v-else :showLoading="true" src="/static/img/star_cover.png" width="12px" height="12px" :fade="true" duration="200"></u--image>
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
				<view class="head_text">
					更多
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="dynamic_list">
				<view class="list_item" v-for="(item, index) in dynamic_list" :key="index">
					<view class="list_item_contenr">
						<view class="top">
							<view class="item_title">{{ item.title }}</view>
							<view class="item_desc">{{ item.desc }}</view>
						</view>
						<view class="bottom">
							<view class="b_box">{{ item.time }}</view>
							<view class="b_box box">
								<u--image class="icon" :showLoading="true" src="/static/img/eye.png" width="12px" height="12px" :fade="true" duration="200"></u--image>
								<text class="lis">{{ item.see }}</text>
								<u--image
									class="icon"
									v-if="item.collect"
									:showLoading="true"
									src="/static/img/support.png"
									width="12px"
									height="12px"
									:fade="true"
									duration="200"
								></u--image>
								<u--image
									class="icon"
									v-else
									:showLoading="true"
									src="/static/img/support_cover.png"
									width="12px"
									height="12px"
									:fade="true"
									duration="200"
								></u--image>
								<text class="lis">{{ item.support }}</text>
							</view>
						</view>
					</view>
					<u--image
						class="cover"
						:showLoading="true"
						radius="4"
						src="https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png"
						width="132px"
						height="93px"
						:fade="true"
						duration="200"
					></u--image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			loading: true,
			navbar_bg: 'transparent',
			navbar_title: '金丝玉玛',
			scroll_number: 0,
			current: 0,
			list: [
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index-bg.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index-bg.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index-bg.png'
			],
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/banner.png',
			video_src: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/MP4/41cabb1ac16237f9b6db1d289acdf889.mp4',
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
			dynamic_list: [
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					see: 867,
					support: 12,
					collect_num: 10,
					time: '2021-06-25',
					collect: true
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '贝拉柔光750*1500',
					desc: '现代简约风',
					see: 1267,
					support: 12,
					collect_num: 44,
					collect: false,
					time: '2021-06-25'
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					see: 8267,
					support: 12,
					time: '2021-06-25',
					collect_num: 27,
					collect: true
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					time: '2021-06-25',
					see: 867,

					support: 12,
					collect_num: 10,
					collect: false
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png',
					title: '金丝玉玛是专业从事瓷砖及其相关配套产品...',
					desc: '后现代风',
					see: 867,
					support: 12,
					collect_num: 10,
					time: '2021-06-25',
					collect: true
				}
			]
		};
	},
	created() {
		setTimeout(() => {
			this.loading = false
		}, 500)
	},
	methods: {
		onPageScroll(e) {
			this.scroll_number = Number(Math.floor(e.scrollTop));
		}
	}
};
</script>

<style lang="less" scoped>
.container {
	/deep/ .u-swiper__indicator {
		bottom: 340rpx;
	}

	/deep/ .u-navbar__content__left {
		display: none;
	}

	.swiper {
		position: relative;
		.more {
			position: absolute;
			bottom: 22rpx;
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
	.video_content {
		padding-bottom: 0;
		.video {
			width: 100%;
			height: 374rpx;
		}
	}

	.recommend_swiper {
		background: #f8f8f8;
		.swiper_conent {
			height: 560rpx;
			.swiper-item {
				.cover {
					border-radius: 16rpx 16rpx 0 0;
				}
				.item_content {
					width: 332rpx;
					height: 150rpx;
					background: #fff;
					box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
					padding: 20rpx;
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
