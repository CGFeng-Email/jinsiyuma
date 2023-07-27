<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view class="map" v-if="!loading">
			<u-navbar title="门店地址" bgColor="rgba(255,255,255,.8)" :titleStyle="titleStyle" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<i class="iconfont icon-icon-searth"></i>
				</view>
			</u-navbar>
			<map class="map_content" :scale="scale" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
			<view class="top_content box-shadow border-radius">
				<view class="left_content">
					<image class="icon" src="/static/img/map_left.png" mode="widthFix"></image>
					<view class="center">
						<view class="title">佛山店-金丝玉玛瓷砖</view>
						<view class="address">佛山市金丝玉玛总部C4座</view>
					</view>
				</view>
				<view class="right_text">离你最近</view>
			</view>
			<view class="bottom_content">
				<view class="bc_content box-shadow">
					<view class="head box-shadow">
						<view class="box">时间：{{ date_index + 1 * 10 }}分钟</view>
						<i class="iconfont icon-shuxian1"></i>
						<view class="box">路程：{{ date_index + 1 * 5 }}公里</view>
					</view>
					<view class="time_content">
						<view class="time_title">预约时间</view>
						<scroll-view :scroll-x="true" class="scroll_y" :scroll-into-view="scroll_init_view">
							<view
								class="item"
								:class="[index == date_index ? 'active' : '']"
								:id="'item' + index"
								v-for="(item, index) in date"
								:key="index"
								@click="date_item(index)"
							>
								{{ item }}
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
				width="578rpx"
				@confirm="popup_confirm"
				@cancel="popup_cancel"
			>
				<view class="opoup_content">是否确定2023你那6月13日前往佛山市金丝玉玛总部C4座</view>
			</u-modal>
			<!-- 联系我们 -->
			<CONTACTUS :topShow="true"  :mapShow="true"></CONTACTUS>
			<!-- 底部栏 -->
			<TABBAR :tabbar_bg="true" :tabs_index="3"></TABBAR>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true,
			titleStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			scale: 16, // 缩放
			latitude: 23.003327, // 中心纬度
			longitude: 113.042523, // 中心经度
			// 标记点
			markers: [
				{
					id: 'id001',
					latitude: 23.003327,
					longitude: 113.042523,
					iconPath: '/static/img/map_icon.png',
					width: 32,
					height: 32,
					label: {
						content: '佛山市金丝玉玛总部C4座',
						bgColor: '#fff',
						textAlign: 'center',
						padding: 6,
						borderRadius: 4,
						anchorY: 4
					}
				}
			],
			date_index: 0,
			scroll_init_view: 'item0',
			date: ['6月5日', '6月6日', '6月7日', '6月8日', '6月9日', '6月10日', '6月11日', '6月12日', '6月13日', '6月14日', '6月15日', '6月16日', '6月17日'],
			popup_show: false
		};
	},
	onLoad() {
		setTimeout(() => {
			this.loading = false
		}, 300)
	},
	onShow() {
		this.get_userMap();
	},
	methods: {
		date_item(index) {
			this.date_index = index;
			this.scroll_init_view = 'item' + index;
		},
		// 获取用户所在经纬度坐标
		get_userMap() {
			console.log('getLocation');
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					console.log('success', res);
				},
				fail: function (err) {
					console.log('fail', err);
				},
				complete: function () {
					console.log('complete');
				}
			});
		},
		popup_confirm() {
			uni.openLocation({
				scale: 16,
				latitude: this.latitude,
				longitude: this.longitude,
				name: '佛山市金丝玉玛总部C4座',
				success: function (res) {
					console.log('success', res);
				}
			});
			this.popup_show = false
		},
		to_map() {
			this.popup_show = true;
		},
		popup_cancel() {
			this.popup_show = false;
		},
		leftClick() {
			uni.navigateTo({
				url: '/pages/map/select_map'
			})
		}
	}
};
</script>

<style lang="less" scoped>
.map {
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
		bottom: 0;
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

	.opoup_content {
		font-size: 30rpx;
		font-weight: 500;
		color: #8c8c8c;
		line-height: 43rpx;
	}

	.popup {
		/deep/ .u-modal__title {
			font-weight: 500;
			color: #000;
		}
	}
}
</style>
