<!-- 预约详情 -->
<template>
	<view class="container">
		<view class="my_subscribe_details">
			<FIXEDNAVBAR :navbar_title="navbar_title"></FIXEDNAVBAR>
			<view class="cover_box">
				<image class="cover" :src="banner" mode="widthFix"></image>
			</view>
			<view class="my_subscribe_content border-radius box-shadow">
				<view class="head">
					<view class="title">广州金丝玉玛瓷砖</view>
					<view class="statuc">
						<text class="text" v-if="true">预约成功</text>
						<text class="text cancel" v-else>已取消</text>
					</view>
				</view>
				<view class="sub_head">
					<view class="time">预约时间：2023-05-25</view>
					<view class="phone">
						<i class="iconfont icon-dianhua"></i>
						<text class="text">联系</text>
					</view>
				</view>
				<view class="cover_box">
					<image class="cover" src="https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe_cover.png" mode="widthFix"></image>
				</view>
				<view class="map_content">
					<view class="left">
						<text class="text">距您3.1km</text>
						<i class="iconfont icon-shuxian1"></i>
						<text class="text">广东广州市海珠区仲恺路628号</text>
					</view>
					<i class="iconfont icon-daohang"></i>
				</view>
			</view>
			<view class="btn_box">
				<u-button class="btn box-shadow" @click="change_btn" shape="circle" :throttleTime="200" plain>
					<text v-if="true">取消预约</text>
					<text v-else>再次预约</text>
				</u-button>
			</view>
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
			navbar_title: '预约成功',
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe_banner.png',
			popup: false,
			popup_title: '取消预约' // 再次预约
		};
	},
	methods: {
		change_btn() {
			this.popup = true;
		},
		close_popup() {
			this.popup = false;
		},
		confirm() {
			setTimeout(() => {
				this.popup = false;
			}, 400);
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
		}
		.map_content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #7c7c7c;
			padding-top: 20rpx;
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
