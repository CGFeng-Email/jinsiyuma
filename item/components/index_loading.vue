<!-- 首页加载广告屏 -->
<template>
	<view class="index_loading">
		<view class="left_box">
			<div class="box" @click="clearLoading">
				<view class="time">{{ loading_time }}s</view>
				<i class="iconfont icon-shuxian1"></i>
				<view class="text">跳过</view>
			</div>
		</view>
		<!-- 海报 -->
		<div class="cover_box">
			<image class="cover" :src="banner" mode="widthFix"></image>
		</div>
		<!-- 立即 -->
		<!-- <view class="btn" @click="clearLoading">立即体验</view> -->
		<view class="btn_box">
			<u-button shape="circle" text="立即体验" @click="clearLoading" throttleTime="1000"></u-button>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		loading_time: {
			type: Number,
			default: 5
		}
	},
	data() {
		return {
			banner: 'https://jsym.kinsyomacz.com/resource/img/index_loading.png'
		};
	},
	methods: {
		clearLoading() {
			this.$emit('clearLoading');
		}
	}
};
</script>
<style>
.btn_box button .u-button__text {
	font-size: 42rpx !important;
	letter-spacing: 1px;
	color: #0b50c7;
}

.btn_box text {
	font-size: 42rpx !important;
	letter-spacing: 1px;
	color: #0b50c7;
}
</style>
<style lang="less" scoped>
.index_loading {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 21;
	.left_box {
		position: fixed;
		top: 44px;
		left: 0;
		width: 100%;
		height: 44px;
		z-index: 22;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-left: 12px;

		.box {
			width: 150rpx;
			background: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 12rpx 20rpx;
			color: #fff;
			font-size: 24rpx;
			border-radius: 45rpx;
			.iconfont {
				font-size: 24rpx;
			}
		}
	}

	// .btn {
	// 	position: absolute;
	// 	bottom: 15%;
	// 	left: 50%;
	// 	transform: translateX(-50%);
	// 	width: 340rpx;
	// 	height: 88rpx;
	// 	line-height: 88rpx;
	// 	background: #d1e5f9;
	// 	border-radius: 45rpx;
	// 	text-align: center;
	// 	font-size: 44rpx;
	// 	color: #1c65f4;
	// }
}
.btn_box {
	position: fixed;
	bottom: 15%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 22;
	/deep/ button,
	.u-button {
		width: 341rpx;
		height: 97rpx;
		background: url('https://jsym.kinsyomacz.com/resource/img/course/course_btn.png') no-repeat;
		background-size: 341rpx 97rpx;
		border: none;

		/deep/ .u-button__text {
			font-size: 42rpx !important;
			letter-spacing: 1px;
			color: #0b50c7;
		}
	}
}
</style>
