<template>
	<view class="fixed_bottom">
		<view class="left">
			<view class="item" @click="click_collect">
				<view class="icon">
					<i v-if="is_collect ==  0" class="iconfont icon-shoucang2"></i>
					<i v-else class="iconfont icon-shoucang-yishoucang active"></i>
				</view>
				<view class="text">收藏</view>
			</view>
			<button class="item" open-type="share">
				<view class="icon">
					<i class="iconfont icon-fenxiang"></i>
				</view>
				<view class="text">分享</view>
			</button>
		</view>
		<view class="right">
			<u-button class="btn btn1" :throttleTime="200" shape="circle" text="预约量房" @click="open_room"></u-button>
			<u-button class="btn btn2" :throttleTime="200" shape="circle" color="#0A2B4E" iconColor="#" text="预约设计" @click="open_design"></u-button>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		is_collect: {
			type: Number,
			default: 0
		}
	},
	methods: {
		// 预约量房
		open_room() {
			const user_id = uni.getStorageSync('user_id');
			if (user_id) {
				uni.navigateTo({
					url: '/pages/product/room'
				});
			} else {
				this.$emit('verifylogin');
			}
		},
		// 预约设计
		open_design() {
			const user_id = uni.getStorageSync('user_id');
			if (user_id) {
				uni.navigateTo({
					url: '/pages/product/design'
				});
			} else {
				this.$emit('verifylogin');
			}
		},
		// 收藏
		click_collect() {
			this.$emit('click_collect');
		}
	}
};
</script>

<style lang="less" scoped>
.fixed_bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #fff;
	box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 20rpx 42rpx;
	.left {
		width: 30%;
		display: flex;
		justify-content: center;
		.item {
			padding: 0 30rpx;
			margin: 0;
			background: #fff;
			border: 0;
			outline: none;
			box-shadow: none;
			text-align: center;
			.icon {
				line-height: 42rpx;
			}
			.iconfont {
				font-size: 40rpx;
			}
			.text {
				font-size: 22rpx;
				line-height: 34rpx;
				font-weight: 400;
				color: #464646;
			}
			&::after {
				content: '';
				display: none;
			}
			.active {
				color: #0a2b4e;
			}
		}
	}
	.right {
		width: 70%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		/deep/ button {
			width: 228rpx;
			height: 80rpx;
			margin-left: 16rpx;
			border-color: #0a2b4e;
			&::after {
				display: none;
			}
			&::before {
				display: none;
			}
		}
		text {
			color: #0a2b4e;
		}
	}
}
</style>
