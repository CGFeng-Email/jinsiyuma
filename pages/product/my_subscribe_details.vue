<!-- 预约详情 -->
<template>
	<view class="container">
		<FIXEDNAVBAR :navbar_title="navbar_title" :iconColor="true"></FIXEDNAVBAR>
		<view class="my_subscribe_details">
			<u-transition :show="true">
				<view class="cover_box">
					<image class="cover" :src="details_banner" mode="widthFix"></image>
				</view>
				<block v-if="tabs_index == 0">
					<!-- 预约量房 -->
					<view class="my_subscribe_content border-radius box-shadow">
						<view class="head">
							<view class="title" v-cloak>{{ details.real_name }}</view>
							<!-- 状态 -->
							<view class="statuc">
								<text class="text" v-if="details.status == 0">待确认</text>
								<text class="text active" v-else-if="details.status == 1">预约成功</text>
								<text class="text" v-else-if="details.status == -1">预约失败</text>
								<text class="text active" v-else>已完成</text>
							</view>
						</view>
						<view class="sub_head">
							<view class="time" v-cloak v-if="details.subscribe_date">预约时间：{{ details.subscribe_date }}</view>
							<view class="phone tabs_phone">
								<i class="iconfont icon-dianhua"></i>
								<text class="text" v-cloak v-if="details.mobile">联系：{{ details.mobile }}</text>
							</view>
						</view>
						<view class="cover_box">
							<image class="cover" :src="details_cover" mode="widthFix"></image>
						</view>
						<view class="map_content">
							<view class="left">
								<view class="text" v-cloak v-if="details.province && details.city && details.area">
									所在地区：{{ details.province }}{{ details.city }}{{ details.area }}
								</view>
								<view class="text" v-cloak v-if="details.address">详细地址：{{ details.address }}</view>
							</view>
							<i class="iconfont icon-daohang tabs_icon"></i>
						</view>
					</view>
				</block>

				<block v-else>
					<!-- 预约设计 -->
					<view class="my_subscribe_content border-radius box-shadow">
						<view class="head">
							<view class="title" v-cloak v-if="details.title">{{ details.title }}</view>
							<view class="statuc">
								<text class="text" v-if="status == 0">待确认</text>
								<text class="text active" v-else-if="status == 1">预约成功</text>
								<text class="text" v-else-if="status == -1">预约失败</text>
								<text class="text active" v-else>已完成</text>
							</view>
						</view>
						<view class="sub_head">
							<view class="time" v-cloak v-if="date">预约时间：{{ date }}</view>
						</view>
						<view class="sub_head tabs_sub_head">
							<view class="time" v-cloak v-if="details.contact">联系人：{{ details.contact }}</view>
							<view class="phone tabs_phone">
								<i class="iconfont icon-dianhua"></i>
								<text class="text" v-cloak v-if="details.phone">手机：{{ details.phone }}</text>
							</view>
						</view>
						<view class="cover_box" @click="open_location">
							<image class="cover content_cover" :src="details_cover"></image>
						</view>
						<view class="map_content tabs_map_content" @click="open_location">
							<view class="left">
								<text class="text" v-cloak v-if="details.distance">距您{{ details.distance }}km</text>
								<i class="iconfont icon-shuxian1"></i>
								<text class="text" v-cloak v-if="details.address">{{ details.address }}</text>
							</view>
							<i class="iconfont icon-daohang"></i>
						</view>
					</view>
				</block>

				<!-- 取消预约按钮 -->
				<view class="btn_box" v-if="tabs_index == 0 ? details.status == 0 : status == 0">
					<u-button class="btn box-shadow" @click="change_btn" shape="circle" :throttleTime="200" plain>
						<text>取消预约</text>
					</u-button>
				</view>
			</u-transition>
		</view>

		<u-modal
			class="popup_content"
			:show="popup"
			:title="popup_title"
			:asyncClose="true"
			:closeOnClickOverlay="true"
			width="578rpx"
			confirmText="确定取消"
			cancelText="暂不取消"
			showCancelButton
			confirmColor="#0A2B4E"
			cancelColor="#363636"
			@close="close_popup"
			@confirm="confirm"
			@cancel="close_popup"
		>
			<view class="slot-content">
				<view class="text">您已成功预约，需要确认取消？</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
export default {
	components: { FIXEDNAVBAR },
	data() {
		return {
			navbar_title: '预约详情',
			popup: false,
			popup_title: '取消预约', // 再次预约
			id: '',
			tabs_index: 0, // 0:预约量房, 1:预约设计
			date: '', // 预约设计预约日期
			status: 0, // 预约设计预约状态 -1:预约失败, 0:待确认, 1:预约成功, 2:已成功
			details: {}, // 数据信息
			details_banner: '', // 预约详情banner
			details_cover: '' // 预约详情门店logo
		};
	},
	async onLoad(e) {
		console.log('e', e);
		await this.inital_data(e);
		await this.get_data();
	},
	methods: {
		async inital_data(e) {
			new Promise((resolve, recject) => {
				this.id = e.id;
				this.tabs_index = e.tabs_index;
				const app = getApp();
				this.details_banner = app.globalData.subscribe_detail_banner;
				this.details_cover = app.globalData.subscribe_store_banner;
				resolve();
			});
		},
		// 获取详情数据
		async get_data() {
			const tabs_index = this.tabs_index;
			let url = '';
			if (tabs_index == 0) {
				url = '/subscribe/getMeasureDetail';
			} else {
				url = '/subscribe/getDesignDetail';
			}
			const res = await this.$request.post(url, {
				id: this.id
			});
			console.log('详情', res);
			if (tabs_index == 1) {
				this.date = res.subscribe_date;
				this.status = res.status;
				await this.get_map_details(res.store.id);
			} else {
				this.details = res;
			}
		},
		// 获取地址详情
		get_map_details(id) {
			uni.getLocation({
				type: 'gcj02',
				success: async (res) => {
					console.log('get_map_data', res);
					const map_data = await this.$request.post('/store/detail', {
						id,
						longitude: res.longitude,
						latitude: res.latitude
					});
					const data = {
						contact: map_data.contact,
						distance: Math.floor(map_data.distance),
						title: map_data.title,
						address: map_data.address,
						phone: map_data.phone,
						latitude: Number(map_data.latitude),
						longitude: Number(map_data.longitude)
					};
					this.details = data;
					console.log('获取地址详情', map_data);
				}
			});
		},
		// 选择地址
		open_location() {
			if (this.tabs_index == 0) return;
			uni.openLocation({
				scale: 16,
				latitude: this.details.latitude,
				longitude: this.details.longitude,
				name: this.details.title,
				address: this.details.address,
				success: (res) => {
					console.log('res', res);
				},
				fail: (err) => {
					console.log('err', err);
				}
			});
		},
		// 取消预约
		change_btn() {
			this.popup = true;
		},
		// 关闭预约弹窗
		close_popup() {
			this.popup = false;
		},
		// 确定取消预约
		async confirm() {
			uni.showLoading({
				title: '加载中'
			});
			const id = this.id;
			const res = await this.$request.post2('/subscribe/cancelDesign', {
				id
			});
			console.log('确定取消预约', res);
			if (res.code == 1) {
				uni.hideLoading();
				uni.showToast({
					title: '取消成功',
					icon: 'none',
					duration: 1200
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1200);
			} else {
				uni.showToast({
					title: '取消失败，服务器发生错误',
					icon: 'none',
					duration: 2000
				});
			}
			uni.hideLoading();
			this.popup = false;
		}
	}
};
</script>

<style>
page {
	background: #f8f8f8;
}

.u-modal__title {
	font-size: 32rpx !important;
	font-weight: 600;
	color: #000000 !important;
}

.u-popup .text {
	padding-top: 30rpx;
	font-size: 30rpx;
	font-weight: 500;
	color: #8c8c8c;
	line-height: 35rpx;
}

[v-cloak] {
	display: none !important;
}
</style>
<style lang="less" scoped>
.my_subscribe_details {
	.my_subscribe_content {
		margin: auto;
		width: 710rpx;
		background: #fff;
		padding: 34rpx;
		transform: translateY(-88rpx);
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				font-size: 40rpx;
				font-weight: bold;
				color: #464646;
			}
			.statuc {
				.text {
					font-size: 28rpx;
					font-weight: 400;
					color: #4887fa;
				}
				.cancel {
					color: #a7a7a7;
				}
			}
		}
		.sub_head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 28rpx 0;
			.time {
				height: 28rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #313131;
			}
			.phone {
				padding-left: 20rpx;
				.iconfont {
					font-size: 28rpx;
					color: #0a2b4e;
					display: inline-block;
				}
				.text {
					font-size: 24rpx;
					color: #313131;
					padding-left: 6rpx;
				}
			}
			.tabs_phone {
				padding-left: 0;
			}
		}
		.tabs_sub_head {
			padding: 0 0 28rpx;
		}
		.content_cover {
			height: 314rpx;
		}
		.map_content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #7c7c7c;
			padding-top: 20rpx;
			.text {
				font-size: 28rpx;
				font-weight: 400;
				color: #7c7c7c;
				padding: 6rpx 0;
			}
			.iconfont {
				display: inline-block;
				font-size: 32rpx;
			}
			.icon-shuxian1 {
				margin: 0 4rpx;
			}
			.icon-daohang {
				color: #0a2b4e;
			}
			.tabs_icon {
				font-size: 48rpx;
			}
		}
		.tabs_map_content {
			align-items: initial;
			.iconfont {
				transform: translateY(6rpx);
			}
		}
	}
	.btn_box {
		position: fixed;
		bottom: 80rpx;
		left: 0;
		width: 100%;
		padding: 0 20rpx;

		/deep/ button {
			height: 100rpx;
			border: 2rpx solid #0a2b4e;
			font-size: 34rpx;
			font-weight: 500;
			color: #0a2b4e;
			&::after {
				display: none;
			}
			&::before {
				display: none;
			}
		}
	}
}
</style>