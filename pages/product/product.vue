<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view v-if="!loading" class="product_content">
			<u-navbar
				:class="[scroll_number <= 44 ? 'product_navbar' : '']"
				:title="scroll_number <= 44 ? '' : '产品馆'"
				:bgColor="scroll_number <= 44 ? 'transparent' : 'rgba(255, 255, 255, .8)'"
				:titleStyle="navbarStyle"
				leftIcon="search"
				leftIconSize="32px"
				leftIconColor="#757575"
				@leftClick="open_search"
			></u-navbar>
			<view class="banner_bg">
				<u--image class="bg" :src="product_bg" width="100%" height="100vh"></u--image>
			</view>
			<view class="product_banner_content">
				<view class="banner_content">
					<view class="top_content">
						<view class="banner_title">金丝玉玛力荐TOP5</view>
						<image class="btn" :src="search_btn" @click="open_search"></image>
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
									<view class="btn_box" @click="open_product_list">
										<u--image class="btn" :src="item.image_icon1" width="132rpx" height="132rpx" radius="4"></u--image>
									</view>
									<view class="btn_box" @click="open_product_list">
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
							<view class="s_item active">
								<text class="text">大规格</text>
								<i class="iconfont icon-xiala2"></i>
							</view>
							<view class="s_item">
								<text class="text">中规格</text>
								<i class="iconfont icon-xiala2"></i>
							</view>
							<view class="s_item">
								<text class="text">小规格</text>
								<i class="iconfont icon-xiala2"></i>
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
						<view class="s_item active">
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
				<view class="seriec_content params_item">
					<view class="params_head">
						<i class="iconfont icon-gongyihangyejianduan"></i>
						<text class="title">工艺</text>
						<text class="prop">CRAFT</text>
					</view>
					<view class="seriec_select craft_content">
						<view class="s_item active">
							<text class="text">星空发光干粒</text>
						</view>
						<view class="s_item">
							<text class="text">镀金</text>
						</view>
						<view class="s_item">
							<text class="text">闪光粉</text>
						</view>
						<view class="s_item">
							<text class="text">幻彩电光</text>
						</view>
						<view class="s_item">
							<text class="text">羊毛轮柔抛</text>
						</view>
					</view>
				</view>
				<view class="color_content params_item">
					<view class="params_head">
						<i class="iconfont icon-beijingyanse"></i>
						<text class="title">颜色</text>
						<text class="prop">COLOR</text>
					</view>
					<view class="seriec_select color_select">
						<view class="s_item active">
							<view class="color_box c1"></view>
							<text class="text">黑色</text>
						</view>
						<view class="s_item">
							<view class="color_box c2"></view>
							<text class="text">白色</text>
						</view>
						<view class="s_item">
							<view class="color_box c3"></view>
							<text class="text">灰色</text>
						</view>
						<view class="s_item">
							<view class="color_box c4"></view>
							<text class="text">黄色</text>
						</view>
						<view class="s_item">
							<view class="color_box c5"></view>
							<text class="text">米色</text>
						</view>
						<view class="s_item">
							<view class="color_box c6"></view>
							<text class="text">褐色</text>
						</view>
						<view class="s_item">
							<view class="color_box c7"></view>
							<text class="text">棕色</text>
						</view>
						<view class="s_item">
							<view class="more_content">
								<view class="color_box m_box c8"></view>
								<view class="color_box m_box c9"></view>
								<view class="color_box m_box c10"></view>
							</view>
							<text class="text">其他</text>
						</view>
					</view>
				</view>
				<view class="color_content params_item">
					<view class="params_head">
						<i class="iconfont icon-kongjian1"></i>
						<text class="title">空间</text>
						<text class="prop">ROOM</text>
					</view>
					<view class="seriec_select color_select">
						<view class="s_item active">
							<text class="text">客厅</text>
						</view>
						<view class="s_item">
							<text class="text">卧室</text>
						</view>
						<view class="s_item">
							<text class="text">卫生间</text>
						</view>
						<view class="s_item">
							<text class="text">厨房</text>
						</view>
						<view class="s_item">
							<text class="text">阳台</text>
						</view>
						<view class="s_item">
							<text class="text">商业空间</text>
						</view>
						<view class="s_item">
							<text class="text">其他</text>
						</view>
					</view>
				</view>
				<view class="search_btn_content">
					<u-button class="search_btn" shape="circle" throttleTime="200" text="去搜索" color="#0A2B4E" @click="open_search"></u-button>
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
			search_btn: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/search_btn.png',
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
	created() {
		setTimeout(() => {
			this.loading = false
		}, 500)
	},
	methods: {
		onPageScroll(e) {
			this.scroll_number = Number(Math.floor(e.scrollTop));
		},
		change_swiper(e) {
			this.swiper_current = e.detail.current;
		},
		open_search() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		open_product_list() {
			uni.navigateTo({
				url: '/pages/product/product_list'
			})
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
			.uni-swiper-dot-box {
				/deep/ .uni-swiper__warp {
					height: 50rpx;
				}
			}
			.swiper_content {
				flex: 1;
				padding: 0 0 20rpx;

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
							padding-right: 6rpx;
						}
						.iconfont {
							font-size: 40rpx;
							color: #828282;
							transition: all 0.3s;
						}
					}

					.active {
						.text {
							color: #fca163;
						}
						.iconfont {
							color: #fca163;
							transform: rotate(-180deg);
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
					padding: 20rpx 10rpx;
				}
				.active {
					color: #fca163;
					.text {
						border-bottom: 2px solid #fca163;
					}
				}
			}
			.craft_content {
				.s_item {
					width: auto;
					padding: 20rpx 30rpx;
				}
			}

			.color_select {
				.s_item {
					width: 25%;
					.color_box {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						overflow: hidden;
						box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
						margin: 10rpx auto;
						border: 2px solid #fff;
					}
					.c1 {
						background: #000;
					}
					.c2 {
						background: #fff;
					}
					.c3 {
						background: #999999;
					}
					.c4 {
						background: #f0b22a;
					}
					.c5 {
						background: #f1f0db;
					}
					.c6 {
						background: #705b40;
					}
					.c7 {
						background: #be985e;
					}
					.more_content {
						position: relative;
						width: 100%;
						height: 52rpx;
						left: 50%;
						.m_box {
							position: absolute;
							top: 0;
						}
					}
					.c8 {
						background: #a49578;
						transform: translateX(-30rpx);
						z-index: 1;
					}
					.c9 {
						background: #8d8835;
						transform: translateX(-15rpx);
						z-index: 2;
					}
					.c10 {
						background: #973838;
						transform: translateX(-0rpx);
						z-index: 3;
					}
				}
			}
		}

		.search_btn_content {
			padding: 20rpx 0;
			.search_btn {
				font-size: 34rpx;
				font-weight: 500;
				color: #ffffff;
			}
		}
	}
}
</style>
