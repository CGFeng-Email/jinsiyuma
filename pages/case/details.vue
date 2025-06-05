<template>
	<view class="container">
		<SCROLLNAVBAR :scroll_number="scroll_number" :navbar_title="navbar_title"></SCROLLNAVBAR>
		<u-transition :show="true">
			<view class="product_details">
				<u-swiper :list="details.images" :loading="banner_loading" @change="bannerChange" @click="bannerSwiper" :circular="true" radius="0" height="375" bgColor="#f8f8f8">
					<view slot="indicator" class="indicator-num">
						<text class="indicator-num__text" v-if="details.images.length" v-cloak>{{ banner_index + 1 }}/{{ details.images.length }}</text>
					</view>
				</u-swiper>
				<view class="desc_content">
					<view class="content">
						<view class="d_head">
							<view class="title" v-cloak>{{ details.title }}</view>
						</view>
						<view class="desc" v-cloak>{{ details.remark }}</view>
						<view class="map">
							<text v-if="details.place" v-cloak>工程地点：{{ details.place }}</text>
							<text v-if="details.sn" v-cloak>编码：{{ details.sn }}</text>
						</view>
					</view>
				</view>
				<block v-if="details.is_spec == 1">
					<view class="s_head">
						<text class="title">{{ example_spec_title }}</text>
					</view>
					<view class="scene">
						<view class="spec">
							<view class="li">
								<text class="text" v-cloak>系列：{{ details.serie_name }}</text>
								<text class="text" v-cloak>空间：{{ details.room_name }}</text>
							</view>
							<view class="li">
								<text class="text" v-cloak>型号：{{ details.model_sn }}</text>
								<text class="text" v-cloak>规格：{{ details.size_name }}</text>
							</view>
						</view>
					</view>
				</block>
				<view class="s_head">
					<text class="title" v-cloak>{{ example_scene_title }}</text>
				</view>
				<!-- 应用场景列表 -->
				<!-- <view class="list">
					<block v-for="(item, index) in details.scene_images" :key="index">
						<image class="cover border-radius" :src="item" mode="widthFix" @click="application_image_prev(index)"></image>
					</block>
				</view> -->
				<!-- VR -->
				<view class="vr_swiper" v-if="details.vr">
					<u-swiper
						:list="details.scene_images"
						:loading="banner_loading"
						@change="vr_swiper_change"
						@click="vr_list_prev"
						:circular="true"
						radius="0"
						height="250"
						bgColor="#f8f8f8"
					>
						<view slot="indicator" class="indicator-num">
							<text class="indicator-num__text">{{ vr_index + 1 }}/{{ details.scene_images.length }}</text>
						</view>
					</u-swiper>
					<div class="vr_icon" @click="open_vr" v-if="details.vr">
						<image class="icon" src="../../static/img/vr.png" mode="widthFix"></image>
						<text class="text">360度全景</text>
					</div>
				</view>
				<!-- 详情文案 -->
				<view class="details_content" v-if="details.content">
					<u-parse :content="details.content" :tagStyle="contentStyle" :selectable="true"></u-parse>
				</view>
				<!-- 内容图片列表 -->
				<view class="list">
					<block v-for="(item, index) in details.content_images" :key="index">
						<image class="cover border-radius" :src="item" mode="widthFix" @click="content_image_prev(index)"></image>
					</block>
				</view>
				<!-- 更多案例 -->
				<view class="scene more_box" v-if="details.more_list.length >= 2">
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
							<swiper-item v-for="(item, index) in details.more_list" :key="index" @click="open_details(item.id)">
								<u-transition :show="true">
									<view class="swiper-item box-shadow border-radius">
										<image class="cover" :src="item.image" :lazy-load="true"></image>
										<view class="item_content box-shadow">
											<view class="item_title over1">{{ item.title }}</view>
											<view class="item_desc over2">{{ item.remark }}</view>
											<view class="statuc">
												<view class="box b_left">
													<i class="iconfont icon-kanguos"></i>
													<text class="text">{{ item.view_actual }}</text>
												</view>
												<!-- @click.stop="more_is_collect(item, index)" -->
												<view class="box b_right">
													<i v-if="item.is_collect == 0" class="iconfont icon-shoucang1"></i>
													<i v-else class="iconfont icon-shoucang active"></i>
													<text class="text">{{ item.collect_num }}</text>
												</view>
											</view>
										</view>
									</view>
								</u-transition>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</u-transition>
		<!-- 底部栏 -->
		<FIXEDBOTTOM @click_collect="click_collect" :is_collect="details.is_collect" @verifylogin="verifylogin"></FIXEDBOTTOM>
		<!-- 联系我们 -->
		<CONTACTUS :topShow="topShow" :details="true"></CONTACTUS>
		<!-- 返回顶部 -->
		<TOPICON :topShow="topShow" :details="true"></TOPICON>
		<!-- 登录模态框 -->
		<LOGINMODAL :show="login_modal" @loginModalCancel="loginModalCancel"></LOGINMODAL>
	</view>
</template>

<script>
import SCROLLNAVBAR from '../../components/scroll_navbar.vue';
import FIXEDBOTTOM from '../../components/bottom.vue';

export default {
	components: { SCROLLNAVBAR, FIXEDBOTTOM },
	data() {
		return {
			// loading: true, // 页面加载
			navbar_title: '案例详情',
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			current: 0, // banner下标
			login_modal: false, // 登录模态框
			contentStyle: {
				p: 'font-size: 24rpx !important; color: #181818;line-height: 42rpx; background-color: none;',
				span: 'font-size: 24rpx !important; color: #181818;line-height: 42rpx; background-color: none;',
				img: 'margin: 10rpx 0; display: block; width: 100%; border-radius: 12rpx;',
				image: 'margin: 10rpx 0; display: block; width: 100%; border-radius: 12rpx;'
			},
			recommend_item_number: 2, // 更多案例同时显示的数量
			recommend_current: 0, // 更多案例下标
			details: {}, // 详情数据
			banner_index: 0, // banner下标
			banner_loading: true, // banner加载
			example_scene_title: '', // 应用场景标题
			example_spec_title: '', // 规格参数标题
			vr_index: 0
		};
	},
	async onLoad(e) {
		await this.inital();
		await this.get_data(e.id);
	},
	// 重写分享数据
	onShareAppMessage() {
		return {
			title: this.details.title,
			imageUrl: this.details.image,
			desc: this.details.remark,
			path: `/pages/case/details?id=${this.details.id}`
		};
	},
	// 页面滚动距离
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 600 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 600 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		async inital() {
			return new Promise((resolve, reject) => {
				try {
					const app = getApp();
					this.example_scene_title = app.globalData.example_scene_title;
					this.example_spec_title = app.globalData.example_spec_title;
					resolve();
				} catch (e) {
					reject('获取数据失败，服务器发生错误');
				}
			});
		},
		// 获取详情数据
		async get_data(id) {
			const res = await this.$request.post('/example/detail', {
				id
			});
			this.details = res;
			this.banner_loading = false;
			// this.loading = false;
		},
		// banner预览
		bannerSwiper(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.details.images
			});
		},
		// banner切换回调
		bannerChange(e) {
			this.banner_index = e.current;
		},
		// vr预览
		vr_list_prev(i) {
			uni.previewImage({
				current: i,
				urls: this.details.scene_images
			});
		},
		// vr切换回调
		vr_swiper_change(e) {
			this.vr_index = e.current;
		},
		// 内容图片预览大图
		content_image_prev(i) {
			uni.previewImage({
				current: i,
				urls: this.details.content_images
			});
		},
		// 是否收藏
		async click_collect() {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			const id = this.details.id;
			let collect = this.details.is_collect == 0 ? 1 : 0;
			const res = await this.$request.post('/example/setCollect', {
				id,
				type: collect
			});
			this.details.is_collect = collect;
		},
		// 更多案例收藏
		async more_is_collect(item, index) {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			if (item.is_collect == 0) {
				item.is_collect = 1;
				item.collect_num += 1;
			} else {
				item.is_collect = 0;
				item.collect_num -= 1;
			}
			const res = await this.$request.post2('/example/setCollect', {
				id: item.id,
				type: item.is_collect
			});
			console.log('更多案例收藏', res);
			if (res.code == 1) {
				this.$set(this.details.more_list, index, item);
			} else {
				uni.showToast({
					title: '收藏失败，服务器发生错误！',
					duration: 2000,
					icon: 'none',
					mask: true
				});
			}
		},
		// 验证预约量房，预约设计有没有先登录
		verifylogin() {
			this.login_modal = true;
		},
		// 登录模态框关闭
		loginModalCancel() {
			this.login_modal = false;
		},
		// 跳转详情
		open_details(id) {
			uni.navigateTo({
				url: `/pages/case/details?id=${id}`
			});
		},
		// 跳转vr详情
		open_vr() {
			const vr = this.details.vr;
			if (vr) {
				uni.navigateTo({
					url: `/pages/brand/details?vr_link=${vr}`
				});
			} else {
				wx.showToast({
					title: 'VR链接发生错误了，请稍后重试',
					icon: 'error'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
[v-cloak] {
	diaplay: none;
}
.product_details {
	padding-bottom: 100rpx;

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
			padding: 30rpx 0;
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

			.map {
				margin-top: 20rpx;
				font-size: 28rpx;
				color: #a7a7a7;
				line-height: 45rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}

	.s_head {
		padding: 20rpx 20rpx;
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
	.vr_swiper {
		width: 710rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
		position: relative;
		border-radius: 12rpx;
		overflow: hidden;
		.vr_icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: rgba(0, 0, 0, 0.6);
			border-radius: 45rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 12rpx 30rpx;
			.iconfont {
				color: #fff;
				font-size: 38rpx;
			}
			.icon {
				width: 40rpx;
			}
			.text {
				color: #fff;
				font-size: 28rpx;
				padding-left: 14rpx;
			}
		}
	}
	.scene {
		padding: 0 20rpx;
		.spec {
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
				height: 550rpx;
				.swiper-item {
					margin-right: 20rpx;
					overflow: hidden;
					.cover {
						width: 100%;
						height: 330rpx;
						object-fit: cover;
					}
					.item_content {
						width: 100%;
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
							line-height: 34rpx;
							margin-top: 12rpx;
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
								padding-top: 10rpx;
								padding-bottom: 12rpx;
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
							.b_left {
								padding-right: 20rpx;
							}
							.b_right {
								padding-left: 20rpx;
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
		.cover:last-child {
			margin-bottom: 0;
		}
	}

	.details_content {
		padding: 0 20rpx 20rpx;
	}
}
</style>
