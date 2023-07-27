<template>
	<view class="bg">
		<video class="video" :src="video_src" :controls="false" muted autoplay loop object-fit="cover">
			<cover-view class="cover"></cover-view>
		</video>
		<cover-view class="content">
			<cover-view class="btn" @click="login">微信授权一键登录</cover-view>
			<cover-view class="open" @click="register">手机号登录注册</cover-view>
			<cover-view class="agreement">
				<cover-view>登录代表同意</cover-view>
				<cover-view @click="user_agreement">《用户协议》</cover-view>
				<cover-view>和</cover-view>
				<cover-view @click="privacy_agreement">《隐私协议》</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// video_src: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/MP4/Hologram_Planet_by_nuva_preview.mp4'
			video_src: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/7086014d470e71748f3dc69ebfda8883.mp4'
		};
	},
	methods: {
		login() {
			uni.showLoading({
				title: '登录中...',
				mask: true
			});

			uni.login({
				provider: 'weixin', //使用微信登录
				success: function (res) {
					if (res.errMsg == 'login:ok') {
						console.log(res.code);
						uni.setStorageSync('code', res.code);
						uni.hideLoading();

						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						uni.hideLoading();
						uni.showToast({
							title: '微信登录失败',
							icon: 'error',
							duration: 2000
						});
					}
				}
			});
		},
		user_agreement() {
			uni.navigateTo({
				url: '/pages/agreement/user'
			});
		},
		privacy_agreement() {
			uni.navigateTo({
				url: '/pages/agreement/privacy'
			});
		},
		register() {
			uni.navigateTo({
				url: '/pages/login/register'
			});
		}
	}
};
</script>

<style>
page {
	overflow: hidden;
}
</style>
<style lang="less" scoped>
.bg {
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	.video {
		width: 100%;
		height: 100%;
	}
	.cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.content {
		position: fixed;
		bottom: 40rpx;
		left: 0;
		width: 100%;
		text-align: center;
		color: #fff;
		z-index: 11;
		.btn {
			width: 600rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 34rpx;
			color: #0a2b4e;
			background: #fff;
			margin: auto;
			border-radius: 45rpx;
		}
		.open {
			font-size: 28rpx;
			padding: 32rpx 0;
		}
		.agreement {
			font-size: 24rpx;
			padding: 30rpx;
			margin-top: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
