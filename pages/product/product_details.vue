<template>
	<view class="container">
		<SCROLLNAVBAR :scroll_number="scroll_number" :navbar_title="navbar_title" :empty="empty"></SCROLLNAVBAR>
		<view class="product_details">
			<u-transition :show="true">
				<u-swiper :list="details.images" :loading="banner_loading" @change="bannerChange" @click="bannerSwiper" :circular="true" radius="0" height="375" bgColor="#f8f8f8">
					<view slot="indicator" class="indicator-num">
						<text class="indicator-num__text" v-if="details.images.length" v-cloak>{{ banner_index + 1 }}/{{ details.images.length }}</text>
					</view>
				</u-swiper>
				<view class="desc_content">
					<view class="content">
						<view class="d_head">
							<!-- 标题 -->
							<view class="title">{{ details.title }}</view>
							<!-- 系列，风格 -->
							<view class="right" v-if="details.sn">
								<text class="text">编码</text>
								<text class="lin"></text>
								<text class="text">{{ details.sn }}</text>
							</view>
						</view>
						<view class="desc">{{ details.type_desc }}</view>
					</view>
				</view>
				<view class="scene">
					<!-- 规格参数 -->
					<block v-if="details.is_spec == 1">
						<view class="s_head">
							<text class="title" v-cloak>{{ product_spec_title }}</text>
						</view>
						<view class="spec">
							<view class="li">
								<text class="text" v-cloak>系列：{{ details.serie_name }}</text>
								<text class="text" v-cloak>尺寸：{{ details.size_name }}</text>
							</view>
							<view class="li">
								<text class="text">空间：{{ details.room_name }}</text>
							</view>
							<view class="li">
								<text class="text" v-cloak>型号：{{ recomment ? details.type_desc : details.model_sn }}</text>
							</view>
						</view>
					</block>
					<!-- 应用场景 -->
					<view class="s_head">
						<text class="title">{{ product_scene_title }}</text>
					</view>
					<!-- VR -->
					<view class="application_swiper" v-if="details.vr">
						<u-swiper
							:list="details.scene_images"
							:loading="banner_loading"
							@change="detailsBannerChange"
							@click="product_banner_swiper"
							:circular="true"
							radius="0"
							height="250"
							bgColor="#f8f8f8"
						>
							<view slot="indicator" class="indicator-num">
								<text class="indicator-num__text">{{ details_index + 1 }}/{{ details.scene_images.length }}</text>
							</view>
						</u-swiper>
						<div class="vr_icon" @click="open_vr" v-if="details.vr">
							<image class="icon" src="../../static/img/vr.png" mode="widthFix"></image>
							<text class="text">360度全景</text>
						</div>
					</view>
				</view>
				<!-- 产品详情文案 -->
				<view class="details_content" v-if="details.content">
					<u-parse :content="details.content" :tagStyle="contentStyle" :selectable="true"></u-parse>
				</view>
				<!-- 详情图片列表 -->
				<view class="list">
					<block v-for="(item, index) in details.content_images" :key="index">
						<view class="image_over">
							<image class="cover border-radius box-shadow" :src="item" mode="widthFix" @click="details_item(index)"></image>
						</view>
					</block>
				</view>
			</u-transition>
		</view>
		<!-- 底部栏 -->
		<FIXEDBOTTOM @click_collect="click_collect" :is_collect="details.is_collect" @verifylogin="verifylogin"></FIXEDBOTTOM>
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
			empty: false,
			navbar_title: '产品详情',
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			login_modal: false, // 登录模态框
			banner_loading: true,
			banner_index: 0,
			details_index: 0,
			contentStyle: {
				p: 'font-size: 24rpx !important; color: #181818;line-height: 42rpx; background-color: none;',
				span: 'font-size: 24rpx !important; color: #181818;line-height: 42rpx; background-color: none;',
				img: 'margin: 10rpx 0; display: block; width: 100%; border-radius: 12rpx;',
				image: 'margin: 10rpx 0; display: block; width: 100%; border-radius: 12rpx;'
			},
			details: {},
			recomment: false, // 新品推荐详情
			product_scene_title: '', // 应用场景标题
			product_spec_title: '' // 规格参数标题
		};
	},
	async onLoad(e) {
		if (e.recomment) {
			this.recomment = true;
		}
		await this.inital();
		await this.get_data(e.id);
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 600 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 600 && this.topShow == true) {
			this.topShow = false;
		}
	},
	// 重写分享数据
	onShareAppMessage() {
		return {
			title: this.details.title,
			imageUrl: this.details.image,
			desc: this.details.type_desc,
			path: `/pages/product/product_details?id=${this.details.id}&recomment=${this.details.recomment}`
		};
	},
	methods: {
		async inital() {
			return new Promise((resolve, reject) => {
				try {
					const app = getApp();
					this.product_scene_title = app.globalData.product_scene_title;
					this.product_spec_title = app.globalData.product_spec_title;
					resolve();
				} catch (e) {
					reject('获取数据失败，服务器发生错误');
				}
			});
		},
		async get_data(id) {
			let URL = '/product/detail';
			if (this.recomment) {
				URL = '/new_product/detail';
			}
			const res = await this.$request.post(URL, {
				id
			});
			console.log('产品详情', res);
			this.details = res;
			this.banner_loading = false;
			if (res.length <= 0) {
				this.empty = true;
			}
		},

		// 点击图图片放大预览
		details_item(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.details.content_images
			});
		},
		// banner
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
		// 场景banner
		product_banner_swiper(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.details.scene_images
			});
		},
		// 场景banner回调
		detailsBannerChange(e) {
			this.details_index = e.current;
		},
		// 登录模态框关闭
		loginModalCancel() {
			this.login_modal = false;
		},
		// 是否收藏
		async click_collect() {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			let collect = this.details.is_collect == 0 ? 1 : 0;
			let url = '/product/setCollect';
			if (this.recomment) {
				url = '/new_product/setCollect';
			}
			const res = await this.$request.post(url, {
				id: this.details.id,
				type: collect
			});
			this.details.is_collect = collect;
		},
		// 验证预约量房，预约设计有没有先登录
		verifylogin() {
			this.login_modal = true;
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
			padding: 32rpx 0;
			border-bottom: 1px solid #eaeaea;
			.d_head {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.title {
					font-size: 46rpx;
					font-weight: 600;
					color: #313131;
					margin-bottom: 10rpx;
				}

				.right {
					padding-top: 10rpx;
					flex: none;
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
				margin-top: 20rpx;
				font-size: 32rpx;
				color: #464646;
				line-height: 45rpx;
			}
		}
	}
	.application_swiper {
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		position: relative;
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
		.s_head {
			padding: 20rpx 0;
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
		.image_over {
			overflow: hidden;
		}
		.cover {
			width: 100%;
			margin-bottom: 20rpx;
		}
	}

	.details_content {
		padding: 0 20rpx 10rpx;
	}
}
</style>
