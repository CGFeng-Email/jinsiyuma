<template>
	<view class="container">
		<view class="product_content">
			<u-navbar
				:class="[scroll_number <= 44 ? 'product_navbar' : '']"
				:title="scroll_number <= 44 ? '' : '产品馆'"
				:bgColor="scroll_number <= 44 ? 'transparent' : 'rgba(255, 255, 255, .7)'"
				:titleStyle="navbarStyle"
				leftIcon="search"
				leftIconSize="32px"
				leftIconColor="#757575"
			></u-navbar>
			<view class="banner_bg">
				<u--image class="bg" :src="product_bg" width="100%" height="100vh"></u--image>
			</view>
			<view class="product_banner_content">
				<view class="banner_content">
					<view class="top_content">
						<view class="banner_title">金丝玉玛力荐TOP5</view>
					</view>
					<uni-swiper-dot
						class="uni-swiper-dot-box"
						:dots-styles="dotsStyles"
						:info="swiper_list"
						:current="swiper_current"
						mode="round"
						field="content"
					></uni-swiper-dot>
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
						<swiper-item v-for="(item, index) in swiper_list" :key="index">
							<view class="swiper_item" :class="[swiper_current == index ? 'swiper_item_active' : '']">
								<image class="cover" :src="item.image_cover"></image>
								<view class="bottom_content">
									<view class="btn_box">
										<u--image class="btn" :src="item.image_icon1" width="132rpx" height="132rpx" radius="4"></u--image>
									</view>
									<view class="btn_box">
										<u--image class="btn" :src="item.image_icon2" width="132rpx" height="132rpx" radius="4"></u--image>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="up_content">
						<image class="btn_icon animation_up" src="/static/img/more_icon.png" mode="aspectFit"></image>
						<image class="btn" :src="product_btn" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="params_list">
				<view class="size_content params_item">
					<view class="params_head">
						<i class="iconfont icon-beijingyanse"></i>
						<text class="title">规格</text>
						<text class="prop">SIZES</text>
					</view>
					<view class="item_content">
						<view class="size_select">
							<view class="s_item">
								<text class="text">大规格</text>
								<i v-if="true" class="iconfont icon-xiala2"></i>
								<i v-else class="iconfont icon-xiangshang1"></i>
							</view>
							<view class="s_item">
								<text class="text">中规格</text>
								<i v-if="true" class="iconfont icon-xiala2"></i>
								<i v-else class="iconfont icon-xiangshang1"></i>
							</view>
							<view class="s_item">
								<text class="text">小规格</text>
								<i v-if="true" class="iconfont icon-xiala2"></i>
								<i v-else class="iconfont icon-xiangshang1"></i>
							</view>
						</view>
						<view class="up_item">
							<view class="u_text">120*1200</view>
							<view class="u_text">900*2700</view>
							<view class="u_text">1600*3200</view>
							<view class="u_text">1200*2780</view>
						</view>
					</view>
				</view>
				<view class="seriec_content params_item">
					<view class="params_head">
						<i class="iconfont icon-xilie"></i>
						<text class="title">系列</text>
						<text class="prop">SERIES</text>
					</view>
					<view class="seriec_select">
						<view class="s_item">
							<text class="text">K金星空岩板</text>
						</view>
						<view class="s_item">
							<text class="text">K金4.0</text>
						</view>
						<view class="s_item">
							<text class="text">贝拉时光</text>
						</view>
						<view class="s_item">
							<text class="text">MK</text>
						</view>
						<view class="s_item">
							<text class="text">金丝玉玛岩板</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scroll_number: 0,
			navbarStyle: {
				fontSize: '38rpx',
				color: '#313131',
				fontWeight: 500
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
			product_bg: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_bg.png',
			product_btn: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_btn.png',
			swiper_list: [
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_1.png',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon2.png'
				},
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_1.png',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon2.png'
				},
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_1.png',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon2.png'
				},
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_1.png',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_icon2.png'
				}
			]
		};
	},
	methods: {
		onPageScroll(e) {
			this.scroll_number = Number(Math.floor(e.scrollTop));
		},
		change_swiper(e) {
			this.swiper_current = e.detail.current;
		}
	}
};
</script>

<style lang="less" scoped>
.product_content {
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
				padding: 20rpx 0;
				text-align: center;
				.banner_title {
					font-size: 48rpx;
					font-weight: bold;
					color: #ffffff;
					line-height: 56rpx;
					letter-spacing: 1px;
				}
			}
			.uni-swiper-dot-box {
				/deep/ .uni-swiper__warp {
					height: 50rpx;
				}
			}
			.swiper_content {
				flex: 1;
				// height: 100%;
				padding: 88rpx 0 20rpx;

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
							border: 1px dashed #fff;
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
				text-align: center;
				padding-bottom: 26rpx;
				.btn_icon {
					width: 66rpx;
					height: 66rpx;
					display: block;
					margin: 10rpx auto;
				}
				.btn {
					width: 228rpx;
					height: 64rpx;
				}
			}
		}
	}

	.params_list {
		padding: 20rpx;
		.params_item {
			margin-bottom: 14rpx;
			background: #fff;
			padding: 24rpx;
			border-radius: 16rpx;
			.params_head {
				display: flex;
				align-items: center;
				padding-bottom: 20rpx;
				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: #313131;
					line-height: 38rpx;
					padding: 0 8rpx;
				}
				.prop {
					font-size: 22rpx;
					font-weight: 400;
					color: #a1a1a1;
					line-height: 26rpx;
					text-transform: uppercase;
				}
			}

			.item_content {
				padding: 0 20rpx;
				.size_select {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.s_item {
						padding: 20rpx 0;
						width: 33.33%;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
						.text {
							font-size: 26rpx;
							font-weight: 400;
							color: #828282;
							padding-right: 10rpx;
						}
						.iconfont {
							font-size: 40rpx;
							color: #828282;
						}
					}
				}

				.up_item {
					padding: 20rpx;
					background: #f5f5f5;
					border-radius: 8rpx;
					display: flex;
					flex-wrap: wrap;
					.u_text {
						width: 33.33%;
						text-align: center;
						font-size: 26rpx;
						font-weight: 400;
						color: #828282;
						padding: 16rpx 10rpx;
					}
				}
			}

			.seriec_select {
				display: flex;
				flex-wrap: wrap;
				.s_item {
					width: 33.33%;
					text-align: center;
					font-size: 26rpx;
					font-weight: 400;
					color: #828282;
					padding: 16rpx 10rpx;
				}
			}
		}
	}
}
</style>