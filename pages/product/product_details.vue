<template>
	<view class="container">
		<view class="product_details">
			<SCROLLNAVBAR :scroll_number="scroll_number" :navbar_title="navbar_title"></SCROLLNAVBAR>
			<u-swiper :list="list" :loading="banner_loading" @change="(e) => (banner_index = e.current)" @click="bannerSwiper" :circular="true" height="375" bgColor="#f8f8f8">
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ banner_index + 1 }}/{{ list.length }}</text>
				</view>
			</u-swiper>
			<view class="desc_content">
				<view class="content">
					<view class="d_head">
						<view class="title">丝帛羽白</view>
						<view class="right">
							<text class="text">轻奢风</text>
							<text class="lin"></text>
							<text class="text">K金岩板</text>
						</view>
					</view>
					<view class="desc">纯粹的底色，透着玉石般的质感，灰色流纹如同绵 延的山脊线，整体简约时尚又不失格调。</view>
				</view>
			</view>
			<view class="scene">
				<view class="s_head">
					<text class="title">场景应用</text>
					<text class="icon">/</text>
					<text class="text">Scenario application</text>
				</view>
				<u-swiper :list="list" :loading="banner_loading" @change="(e) => (details_index = e.current)" @click="product_banner_swiper" :circular="true" height="250" bgColor="#f8f8f8">
					<view slot="indicator" class="indicator-num">
						<text class="indicator-num__text">{{ details_index + 1 }}/{{ list.length }}</text>
					</view>
				</u-swiper>
				<view class="spec">
					<view class="li">
						<text class="text">系列：K金岩板</text>
						<text class="text">风格：轻奢</text>
					</view>
					<view class="li">
						<text class="text">型号：K金岩板-2-JKG826120</text>
						<text class="text">规格：800*2600</text>
					</view>
					<view class="li">
						<text class="text">空间：地面、墙面、客餐厅、卧室、厨卫、商用等</text>
					</view>
				</view>
			</view>
			<!-- 详情图片列表 -->
			<view class="list">
				<block v-for="(item, index) in list" :key="index">
					<image class="cover border-radius box-shadow" :src="item" mode="widthFix" @click="details_item(index)"></image>
				</block>
			</view>
		</view>
		<!-- 底部栏 -->
		<FIXEDBOTTOM></FIXEDBOTTOM>
		<!-- 联系我们 -->
		<CONTACTUS :topShow="topShow" :details="true"></CONTACTUS>
		<!-- 返回顶部 -->
		<TOPICON :topShow="topShow" :details="true"></TOPICON>
	</view>
</template>

<script>
import SCROLLNAVBAR from '../../components/scroll_navbar.vue';
import FIXEDBOTTOM from '../../components/bottom.vue';

export default {
	components: { SCROLLNAVBAR, FIXEDBOTTOM },
	data() {
		return {
			navbar_title: '产品详情',
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			banner_loading: true,
			banner_index: 0,
			details_index: 0,
			list: [
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png'
			]
		};
	},
	onLoad() {
		setTimeout(() => {
			this.banner_loading = false;
		}, 600);
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
		// 点击图图片放大预览
		details_item(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.list
			})
		},
		bannerSwiper(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.list
			})
		},
		product_banner_swiper(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.list
			})
		}
	}
};
</script>

<style lang="less" scoped>
.product_details {
	padding-bottom: 180rpx;

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 35px;
		display: flex;
		justify-content: center;

		&__text {
			color: #ffffff;
			font-size: 12px;
		}
	}

	.desc_content {
		padding: 0 20rpx;
		.content {
			padding: 42rpx 0;
			border-bottom: 1px solid #eaeaea;
			.d_head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				.title {
					font-size: 46rpx;
					font-weight: 600;
					color: #313131;
				}

				.right {
					font-size: 26rpx;
					color: #a7a7a7;
					.lin {
						display: inline-block;
						width: 1px;
						height: 24rpx;
						background: #a7a7a7;
						margin: 0 10rpx;
					}
				}
			}

			.desc {
				font-size: 32rpx;
				color: #464646;
				line-height: 45rpx;
			}
		}
	}

	.scene {
		padding: 30rpx 20rpx;
		.s_head {
			padding: 30rpx 0;
			font-size: 32rpx;
			font-weight: 600;
			color: #464646;
			.icon {
				padding: 0 10rpx;
			}
			.text {
				font-weight: 400;
			}
		}

		.spec {
			padding-top: 20rpx;
			.li {
				font-size: 24rpx;
				font-weight: 400;
				color: #7c7c7c;
				line-height: 50rpx;
				display: flex;
				justify-content: space-between;
				.text {
					flex: 2;
				}
				.text:nth-child(2) {
					flex: 1;
				}
			}
		}
	}

	.list {
		padding: 0 20rpx;
		.cover {
			width: 100%;
			margin-bottom: 20rpx;
		}
	}
}
</style>
