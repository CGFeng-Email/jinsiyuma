<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view class="map" v-if="!loading">
			<u-navbar title="门店地址" bgColor="rgba(255,255,255,.8)" :titleStyle="titleStyle">
				<view class="u-nav-slot" slot="left">
					<i class="iconfont icon-left" @click="returnTo"></i>
					<i class="iconfont icon-icon-searth" @click="open_map_select"></i>
				</view>
			</u-navbar>
			<map class="map_content" :scale="scale" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
			<view class="top_content box-shadow border-radius" @click="open_map">
				<view class="left_content">
					<image class="icon" src="/static/img/map_left.png" mode="widthFix"></image>
					<view class="center">
						<view class="title">{{ title }}</view>
						<view class="address">{{ address }}</view>
					</view>
				</view>
				<view class="right_text">离你最近</view>
			</view>
			<view class="bottom_content">
				<view class="bc_content box-shadow">
					<view class="head box-shadow">
						<view class="box">时间：{{ date_time }}分钟</view>
						<i class="iconfont icon-shuxian1"></i>
						<view class="box">路程：{{ distance }}公里</view>
					</view>
					<view class="time_content">
						<view class="time_title">预约时间</view>
						<scroll-view :scroll-x="true" class="scroll_y">
							<view
								class="item"
								:class="[index == date_index ? 'active' : '']"
								:id="'item' + index"
								v-for="(item, index) in date_list"
								:key="index"
								@click="date_item(index)"
							>
								{{ item.label }}
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="to_content">
					<image class="to" src="/static/img/map_to.png" mode="widthFix" @click="to_map"></image>
				</view>
			</view>
			<u-modal
				class="popup"
				:show="popup_show"
				title="预约到店"
				confirmText="确定"
				confirmColor="#0A2B4E"
				cancelColor="#363636"
				showCancelButton
				:closeOnClickOverlay="true"
				:asyncClose="true"
				width="578rpx"
				@confirm="popup_confirm"
				@cancel="popup_cancel"
			>
				<view class="popup_content">
					<view class="content">请选择需要预约的类型</view>
					<u-radio-group v-model="radiovalue1" placement="row">
						<u-radio
							activeColor="#0A2B4E"
							labelColor="#8c8c8c"
							labelSize="15"
							v-for="(item, index) in radiolist1"
							:key="index"
							:label="item.name"
							:name="item.name"
							@change="radioChange"
						></u-radio>
					</u-radio-group>
				</view>
			</u-modal>
			<!-- 登录模态框 -->
			<LOGINMODAL :show="login_modal" @loginModalCancel="loginModalCancel"></LOGINMODAL>
			<!-- 联系我们 -->
			<CONTACTUS :topShow="true" :mapShow="true"></CONTACTUS>
			<!-- 底部栏 -->
			<!-- <TABBAR :tabbar_bg="true" ></TABBAR> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			login_modal: false,
			loading: true,
			titleStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			id: '', // 门店id
			that_latitude: null, // 本地纬度
			that_longitude: null, // 本地经度
			scale: 16, // 缩放
			latitude: null, // 中心纬度
			longitude: null, // 中心经度
			title: '', // 门店名称
			address: '', // 地址
			// 标记点
			markers: [
				{
					id: 1,
					latitude: null, // 数组类型
					longitude: null, // 数字类型
					iconPath: '/static/img/map_icon.png',
					width: 32,
					height: 32,
					label: {
						content: '', // 门店名称
						bgColor: '#fff',
						textAlign: 'center',
						padding: 6,
						borderRadius: 4,
						anchorY: 4
					}
				}
			],
			date_index: 0, // 日期下标
			date_list: [], // 预约日期
			date_time: '', // 路程时间
			distance: '', // 路程距离
			popup_show: false,
			show_fn: false,
			radiolist1: [
				{
					name: '预约量房',
					disabled: false
				},
				{
					name: '预约设计',
					disabled: false
				}
			],
			radiovalue1: '预约量房'
		};
	},
	onLoad() {},
	async onShow() {
		uni.$on('select_map', (res) => {
			this.id = res.id;
			this.show_fn = true;
			this.get_map_detail();
			uni.$off('select_map');
		});
		if (this.show_fn) return;
		await this.get_userMap();
		await this.get_data();
	},
	methods: {
		// 日期item
		date_item(index) {
			this.date_index = index;
		},
		// 获取用户所在经纬度坐标
		async get_userMap() {
			return new Promise((resolve, reject) => {
				uni.getSetting({
					success: (setting) => {
						console.log('权限列表', setting);
						// 如果没有授权
						if (!setting.authSetting['scope.userLocation']) {
							// 则拉起授权窗口
							uni.authorize({
								scope: 'scope.userLocation',
								success: (authorize) => {
									//点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
									uni.getLocation({
										type: 'gcj02',
										success: (res) => {
											this.that_latitude = res.latitude; // 本地纬度
											this.that_longitude = res.longitude; // 本地经度
										},
										fail: (error) => {
											console.log('失败', error);
										}
									});
								},
								fail(error) {
									//点击了拒绝授权后--就一直会进入失败回调函数--此时就可以在这里重新拉起授权窗口
									uni.showModal({
										title: '提示',
										content: '若点击不授权，将无法使用位置功能',
										cancelText: '不授权',
										confirmText: '授权',
										cancelColor: '#313131',
										confirmColor: '#0A2B4E',
										success: (res) => {
											console.log(res);
											if (res.confirm) {
												// 选择弹框内授权
												uni.openSetting({
													success(res) {
														console.log(res.authSetting);
													}
												});
											} else if (res.cancel) {
												// 用户点击不授权，跳转首页
												uni.switchTab({
													url: '/pages/index/index'
												});
											}
										}
									});
								}
							});
						} else {
							// 有权限则直接获取
							return uni.getLocation({
								type: 'gcj02',
								success: (res) => {
									console.log('有权限则直接获取', res);
									this.that_latitude = res.latitude; // 本地纬度
									this.that_longitude = res.longitude; // 本地经度
									resolve();
								},
								fail: (error) => {
									uni.showToast({
										title: '地址位置发生错误，请稍后重试！',
										icon: 'none',
										complete: () => {
											setTimeout(() => {
												uni.switchTab({
													url: '/pages/index/index'
												});
											}, 1500);
										}
									});
								}
							});
						}
					}
				});
			});
		},
		// 获取最近门店
		async get_data() {
			const res = await this.$request.post('/store/getNearbyStore', {
				longitude: this.that_longitude,
				latitude: this.that_latitude
			});
			console.log('门店位置', res);
			this.id = res[0].id;
			await this.get_map_detail();
		},
		// 获取详情数据
		async get_map_detail() {
			const res = await this.$request.post('/store/detail', {
				id: this.id,
				longitude: this.that_longitude,
				latitude: this.that_latitude
			});
			console.log('详情', res);
			this.date_list = res.date_list;
			this.date_time = res.distance_time;
			this.distance = Math.floor(res.distance);
			this.latitude = Number(res.latitude);
			this.longitude = Number(res.longitude);
			this.markers[0].latitude = res.latitude;
			this.markers[0].longitude = res.longitude;
			this.markers[0].label.content = res.title;
			this.title = res.title;
			this.address = res.address;
			this.loading = false;
		},
		// 点击预约
		to_map() {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);

			this.popup_show = true;
		},
		// 关闭登录模态框
		loginModalCancel() {
			console.log('取消');
			this.login_modal = false;
		},
		// 确定预约
		async popup_confirm() {
			const radiovalue1 = this.radiovalue1;
			const params = {
				date: this.date_list[this.date_index].value,
				title: this.title,
				id: this.id
			};
			if (radiovalue1 == '预约量房') {
				uni.navigateTo({
					url: `/pages/product/room?date=${params.date}`
				});
			} else {
				uni.navigateTo({
					url: `/pages/product/design?id=${params.id}&date=${params.date}&title=${params.title}`
				});
			}
			this.popup_cancel();
		},
		// 关闭预约模态框
		async popup_cancel() {
			this.popup_show = false;
		},
		// 选择其他门店
		open_map_select() {
			uni.navigateTo({
				url: `/pages/map/select_map?id=${this.id}`
			});
		},
		// 查看地址
		open_map() {
			uni.openLocation({
				scale: 16,
				latitude: this.latitude,
				longitude: this.longitude,
				name: this.title,
				address: this.address,
				success: (res) => {
					console.log('res', res);
				},
				fail: (err) => {
					console.log('err', err);
				}
			});
		},
		// 单选回调
		radioChange(n) {
			this.radiovalue1 = n;
		},
		returnTo() {
			uni.navigateBack()
		}
	}
};
</script>

<style>
.popup_content .content {
	font-size: 30rpx;
	font-weight: 500;
	color: #8c8c8c;
	line-height: 43rpx;
	text-align: center;
}
.u-radio-group {
	margin-top: 20rpx;
}
.u-radio-group .u-radio {
	padding-right: 30rpx;
}
</style>
<style lang="less" scoped>
.map {
	
	.u-nav-slot {
		display: flex;
		align-items: center;
		.iconfont {
			padding: 6rpx 20rpx 6rpx 0;
		}
	}
	.map_content {
		width: 100%;
		height: 100vh;
	}
	.top_content {
		position: fixed;
		z-index: 10;
		top: 216rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 690rpx;
		height: 168rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		.left_content {
			display: flex;
			align-items: center;
			.icon {
				width: 76rpx;
				height: 76rpx;
			}
			.center {
				padding: 0 20rpx;
				.title {
					font-size: 32rpx;
					font-weight: 500;
					color: #313131;
					line-height: 38rpx;
					margin-bottom: 14rpx;
				}
				.address {
					font-size: 24rpx;
					font-weight: 500;
					color: #888888;
					line-height: 28rpx;
				}
			}
		}
		.right_text {
			font-size: 24rpx;
			font-weight: 500;
			color: #34c042;
			line-height: 28rpx;
		}
	}

	.bottom_content {
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		width: 610rpx;
		.bc_content {
			border-radius: 46rpx;
			background: #fff;
			overflow: hidden;
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-align: center;
				height: 94rpx;
				line-height: 94rpx;
				border-radius: 46rpx;
				.box {
					font-size: 32rpx;
					font-weight: 400;
					color: #313131;
					line-height: 38rpx;
					text-align: center;
					flex: 1;
				}
				.iconfont {
					color: #dcdcdc;
				}
			}
			.time_content {
				margin-top: 10rpx;
				background: #fff;
				.time_title {
					text-align: center;
					font-size: 30rpx;
					font-weight: bold;
					color: #313131;
					line-height: 35rpx;
					padding-top: 10rpx;
				}
				.scroll_y {
					display: flex;
					white-space: nowrap;
					.item {
						width: 20%;
						display: inline-block;
						padding: 30rpx 0;
						text-align: center;
						font-size: 24rpx;
						font-weight: 400;
						color: #c8c8c8;
						line-height: 28rpx;
					}
					.active {
						color: #464646;
						font-weight: 600;
					}
				}
			}
		}

		.to_content {
			text-align: center;
			padding: 18rpx 0;
			.to {
				width: 204rpx;
				height: 124rpx;
			}
		}
	}

	.popup {
		/deep/ .u-modal__title {
			font-weight: 500;
			color: #000;
		}
	}
}
</style>
