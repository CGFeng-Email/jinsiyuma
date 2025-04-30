<!-- 预约成功 -->
<template>
	<view class="container">
		<view class="success">
			<FIXEDNAVBAR :navbar_title="navbar_title"></FIXEDNAVBAR>
			<view class="success_content">
				<image class="cover" src="/static/img/success_icon.png" mode="widthFix"></image>
				<view class="title">
					{{ navbar_title }}
				</view>
				<view class="desc">恭喜您，预约成功，稍后专属顾问与您联系，以便给您提供优质的服务。</view>
			</view>
			<view class="btn_box">
				<u-button class="btn" @click="return_btn" shape="circle" :throttleTime="200" plain><text>返回</text></u-button>
			</view>
		</view>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
export default {
	components: { FIXEDNAVBAR },
	data() {
		return {
			navbar_title: '预约成功'
		};
	},
	methods: {
		return_btn() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="less" scoped>
.success {
	padding-top: 104rpx;
	.success_content {
		padding: 0 66rpx;
		text-align: center;
		.cover {
			width: 256rpx;
		}
		.title {
			padding: 22rpx 0;
			font-size: 40rpx;
			font-weight: 500;
			color: #000000;
		}

		.desc {
			margin-top: 10rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
			line-height: 38rpx;
			text-align: left;
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