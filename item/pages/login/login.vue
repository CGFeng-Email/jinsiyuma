<template>
	<view class="bg">
		<u-navbar :autoBack="true" bg-color="transparent" leftIconColor="#fff"></u-navbar>
		<video class="video" :src="login_video_src" :controls="false" :custom-cache="false" muted autoplay loop="true" object-fit="cover">
			<cover-view class="cover"></cover-view>
		</video>
		<cover-view class="content">
			<cover-view class="btn">
				<button @click="isLogin" v-if="!selectValue">手机号快捷登录</button>
				<button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机号快捷登录</button>
			<!-- 	<button class="interiro_btn" @click="register">内部快捷登录</button> -->
			</cover-view>
			<cover-view class="agreement" @click="ischeckbox">
				<cover-image class="checkbox_img" src="/static/img/checkbox.png" v-if="selectValue"></cover-image>
				<cover-view class="checkbox_radios" v-else>
					<cover-view class="icon_check"></cover-view>
				</cover-view>
				<cover-view>我已阅读并同意</cover-view>
				<cover-view class="text" @click.stop="user_agreement">《用户协议》</cover-view>
				<cover-view>和</cover-view>
				<cover-view class="text" @click.stop="privacy_agreement">《隐私协议》</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			navbar_show: false,
			login_video_src: '',
			page_length: 1, // 默认为1，如果是跳转过来的会大于2
			selectValue: false
		};
	},
	onLoad() {
		const { login_video_src } = getApp().globalData;
		this.login_video_src = login_video_src;
	},
	methods: {
		ischeckbox() {
			const selectValue = this.selectValue;
			if (selectValue) {
				this.selectValue = false;
			} else {
				this.selectValue = true;
			}
		},
		isLogin() {
			uni.showToast({
				title: '请先阅读并同意《用户协议》和《隐私协议》',
				icon: 'none',
				duration: 2000
			});
		},
		// 登录
		async getPhoneNumber(e) {
			console.log('e', e);
			uni.showLoading({
				title: '登录中...',
				mask: true
			});
			try {
				const res = await this.$request.post('/user/login', {
					code: e.detail.code
				});
				if (res.mobile) {
					uni.setStorageSync('user_id', res.id);
					uni.setStorageSync('mobile', res.mobile);
					uni.navigateBack();
				} else {
					uni.showToast({
						title: '登录失败',
						icon: 'error',
						duration: 1200
					});
				}
				setTimeout(() => {
					uni.hideLoading();
				}, 1200);
			} catch (err) {
				uni.hideLoading();
				uni.showToast({
					title: '登录失败',
					icon: 'error',
					duration: 2000
				});
			}
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
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		color: #fff;
		z-index: 11;
		padding-bottom: 40rpx;
		.btn {
			width: 600rpx;
			// height: 100rpx;
			// line-height: 100rpx;
			// background: #fff;
			margin: auto;
			button {
				border-radius: 45rpx;
				font-size: 34rpx;
				color: #0a2b4e;
			}
			button::after {
				content: '';
				display: none;
			}

			.interiro_btn {
				margin-top: 30rpx;
			}
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
			position: relative;
			z-index: 9999;
			.text {
				color: #0a2b4e;
			}
			.checkbox_radios {
				box-sizing: border-box;
				width: 16px;
				height: 16px;
				margin-right: 4px;
				display: flex;
				justify-content: center;
				align-items: center;
				.icon_check {
					width: 12px;
					height: 12px;
					border-radius: 50rpx;
					border: 1px solid #fff;
				}
			}
			.checkbox_img {
				width: 16px;
				height: 16px;
				border-radius: 50rpx;
				overflow: hidden;
				margin-right: 4px;
			}
		}
	}
}
</style>
