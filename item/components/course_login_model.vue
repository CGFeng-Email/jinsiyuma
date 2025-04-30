<!-- 登录button -->
<template>
	<!-- <button class="btn" open-type="getPhoneNumber" @getphonenumber.stop="getPhoneNumber">
		<slot></slot>
	</button> -->
	<u-modal
		width="500rpx"
		class="popup"
		:show="show"
		:title="title"
		confirmColor="#0A2B4E"
		cancelColor="#363636"
		showCancelButton
		:asyncClose="true"
		:closeOnClickOverlay="true"
		@cancel="cancel"
		@confirm="confirm"
		@close="cancel"
	>
		<view class="content">请登录员工账号</view>
	</u-modal>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '提示'
		}
	},
	methods: {
		cancel() {
			this.$emit('loginModalCancel');
		},
		confirm() {
			this.cancel();
			uni.navigateTo({
				url: `/pages/login/register`
			});
		}
	}
};
</script>

<style lang="less" scoped>
.btn {
	background: none;
	outline: none;
	padding: 0;
	margin: 0;
	line-height: 26rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	&::after {
		display: none;
	}
}

.content {
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
</style>
