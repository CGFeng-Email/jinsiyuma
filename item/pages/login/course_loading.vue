<!-- 课程加载广告屏 -->
<template>
	<view class="index_loading">
		<u-transition :show="true" mode="fade">
			<!-- 海报 -->
			<image class="banner" :src="banner || cover" mode="scaleToFill"></image>

			<view class="btn_box">
				<u-button shape="circle" text="云课堂" @click="open_knowledge" throttleTime="1000"></u-button>
				<u-button shape="circle" text="活动馆" @click="open_activity" throttleTime="1000"></u-button>
			</view>

			<!-- 底部栏 -->
			<TABBAR :tabbar_bg="false" :tabs_index="3"></TABBAR>
			<!-- 登录模态框 -->
			<COURSE_LOGIN_MODEL :show="login_modal" @loginModalCancel="loginModalCancel"></COURSE_LOGIN_MODEL>
		</u-transition>
	</view>
</template>

<script>
export default {
	data() {
		return {
			login_modal: false,
			jinsiyuma_token: '',
			jinsiyuma_user_id: '',
			banner: '',
			cover: 'https://jsym.kinsyomacz.com/resource/img/course/course_banner.png'
		};
	},
	onShow() {
		uni.hideTabBar(); // 隐藏原生tabbar
		this.get_banner();
		this.jinsiyuma_token = uni.getStorageSync('jinsiyuma_token');
		this.jinsiyuma_user_id = uni.getStorageSync('jinsiyuma_user_id');
	},
	methods: {
		// 获取banner
		get_banner() {
			const { course_banner } = getApp().globalData;
			console.log('course_banner', course_banner);
			this.banner = course_banner;
		},
		// 登录模态框
		loginModalCancel() {
			this.login_modal = false;
		},
		open_knowledge() {
			if (this.jinsiyuma_token || this.jinsiyuma_user_id) {
				uni.navigateTo({
					url: '/pages/course/knowledge/index'
				});
			} else {
				this.login_modal = true;
			}
		},
		open_activity() {
			if (this.jinsiyuma_token || this.jinsiyuma_user_id) {
				uni.navigateTo({
					url: '/pages/course/activity/index'
				});
			} else {
				this.login_modal = true;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.index_loading {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 21;

	.banner {
		width: 100%;
		height: 100vh;
	}

	.btn_box {
		position: fixed;
		bottom: 13%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 22;
		/deep/ button {
			width: 341rpx;
			height: 97rpx;
			background: url('https://jsym.kinsyomacz.com/resource/img/course/course_btn.png') no-repeat;
			background-size: 341rpx 97rpx;
			border: none;

			.u-button__text {
				font-size: 42rpx !important;
				letter-spacing: 1px;
				color: #0b50c7;
			}

			&:nth-child(1) {
				margin-bottom: 48rpx;
			}
		}
	}
}
</style>
