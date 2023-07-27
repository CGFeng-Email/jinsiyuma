<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<!-- 底部栏 -->
		<TABBAR :tabbar_bg="tabbar_bg" :tabs_index="1"></TABBAR>
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
					</view>
				</view>
			</u-navbar>
			<!-- 背景 -->
			<view class="banner_bg">
				<u--image class="bg" :src="product_bg" width="100%" height="100vh"></u--image>
			</view>
			<!-- 轮播 -->
			<view class="product_banner_content">
				<view class="banner_content">
					<view class="top_content">
						<view class="banner_title">金丝玉玛力荐TOP5</view>
						<!-- <image class="btn" :src="search_btn" @click="open_search"></image> -->
					</view>
					<view class="custom_dot">
						<uni-swiper-dot
							class="uni-swiper-dot-box"
							:dots-styles="dotsStyles"
							:info="swiper_list"
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
						<swiper-item v-for="(item, index) in swiper_list" :key="index">
							<view class="swiper_item" :class="[swiper_current == index ? 'swiper_item_active' : '']">
								<image class="cover border-radius" :src="item.image_cover"></image>
								<view class="bottom_content">
									<view class="btn_box" @click="open_product_details">
										<u--image class="btn" :src="item.image_icon1" width="132rpx" height="132rpx" radius="4"></u--image>
									</view>
									<view class="btn_box" @click="open_product_details">
										<u--image class="btn" :src="item.image_icon2" width="132rpx" height="132rpx" radius="4"></u--image>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="up_content">
						<image class="btn_icon animation_up" src="/static/img/more_icon.png" mode="aspectFit"></image>
						<image class="btn" :src="product_btn" mode="aspectFit" @click="up_scroll"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 规格列表 -->
		<SORTSELECT></SORTSELECT>
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
			product_bg: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_bg.png',
			product_btn: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_btn.png',
			search_btn: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/search_btn.png',
			swiper_list: [
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner1.jpg',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png'
				},
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner2.jpg',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png'
				},
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner3.jpg',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png'
				},
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner4.jpg',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png'
				},
				{
					image_cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product/product_banner5.jpg',
					image_icon1: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					image_icon2: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/recommend.png'
				}
			]
		};
	},
	onLoad() {
		uni.hideTabBar();
		setTimeout(() => {
			this.loading = false;
		}, 500);
	},
	methods: {
		onPageScroll(e) {
			this.scroll_number = Number(Math.floor(e.scrollTop));
			// console.log('scroll_number', this.scroll_number);
			if (this.scroll_number > 200) {
				this.tabbar_bg = true;
			} else {
				this.tabbar_bg = false;
			}
		},
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
		change_swiper(e) {
			this.swiper_current = e.detail.current;
		},
		open_search() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		open_product_details() {
			uni.navigateTo({
				url: '/pages/product/product_details'
			});
		}
	}
};
</script>
<style>
page {
	overflow-x: hidden;
}
</style>
<style lang="less" scoped>
.container {
	padding-bottom: 68px;
}
.nav_left_icon {
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	width: 58rpx;
	height: 58rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.iconfont {
		font-size: 36rpx;
		color: #fff;
	}
}

.scroll_nav_search {
	border: 1px solid rgba(0, 0, 0, 0.5);
	.iconfont {
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
