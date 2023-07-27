<template>
	<view class="container">
		<view class="product_details">
			<SCROLLNAVBAR :scroll_number="scroll_number" :navbar_title="navbar_title"></SCROLLNAVBAR>
			<view class="banner cover_box">
				<image class="cover" :src="banner" mode="widthFix"></image>
			</view>
			<view class="desc_content">
				<view class="content">
					<view class="d_head">
						<view class="title">福州豪宅｜-3-JKY826099奶油 风卧室</view>
					</view>
					<view class="desc">工程地点：福州</view>
				</view>
			</view>
			<view class="scene">
				<view class="s_head">
					<text class="title">规格参数</text>
					<text class="icon">/</text>
					<text class="text">Specification parameters</text>
				</view>
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
			<view class="list">
				<block v-for="(item, index) in banner_list2" :key="index">
					<image class="cover border-radius" :src="item" mode="widthFix" @click="image_prev(index)"></image>
				</block>
			</view>
			<view class="scene more_box">
				<view class="s_head">
					<text class="title">更多案例</text>
					<text class="icon">/</text>
					<text class="text">More Cases</text>
				</view>
				<view class="recommend_swiper">
					<swiper
						class="swiper_conent"
						circular
						:display-multiple-items="recommend_item_number"
						indicator-color="#E4E4E4"
						indicator-active-color="#C6C6C6"
						:autoplay="true"
						previous-margin="16px"
						next-margin="12px"
						current="recommend_current"
						:interva="3000"
						easing-function="linear"
					>
						<swiper-item v-for="(item, index) in recommend_list" :key="index" @click="open_details">
							<view class="swiper-item box-shadow border-radius">
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
											<i v-if="item.collect" class="iconfont icon-shoucang1"></i>
											<i v-else class="iconfont icon-shoucang active"></i>
											<text class="text">{{ item.collect_num }}</text>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
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
			navbar_title: '案例详情',
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			banner_loading: true,
			current: 0,
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png',
			banner_list2: [
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_c.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_c.png'
			],
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
			recommend_current: 0
		};
	},
	created() {
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
		open_details() {
			uni.navigateTo({
				url: '/pages/case/details'
			});
		},
		image_prev(i) {
			uni.previewImage({
				current: i,
				urls: this.banner_list2
			});
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
				font-size: 28rpx;
				color: #a7a7a7;
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

		.recommend_swiper {
			.swiper_conent {
				height: 510rpx;
				.swiper-item {
					margin-right: 20rpx;
					overflow: hidden;
					.cover {
						width: 100%;
					}
					.item_content {
						width: 100%;
						height: 150rpx;
						background: #fff;
						padding: 20rpx 20rpx 0;
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
									color: #f4442e;
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
	}

	.more_box {
		padding: 0 20rpx;
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
