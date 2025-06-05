<template>
	<u-navbar :placeholder="placeholder" :title="navbar_title" :titleStyle="iconColor ? blockNavbarStyle : navbarStyle" :bgColor="transparent ? 'transparent' : '#fff'">
		<view class="u-nav-slot" slot="left">
			<i class="iconfont icon-left" :class="[iconColor ? 'block' : 'white']" @click="left_return"></i>
			<i class="iconfont icon-zhuye-mian" :class="[iconColor ? 'block' : 'white']" @click="open_index"></i>
		</view>
	</u-navbar>
</template>

<script>
export default {
	props: {
		navbar_title: {
			type: String,
			default: ''
		},
		placeholder: {
			type: Boolean,
			default: true
		},
		transparent: {
			type: Boolean,
			default: false
		},
		iconColor: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			navbarStyle: {
				fontSize: '14px',
				color: '#fff',
				fontWeight: 600
			},
			blockNavbarStyle: {
				fontSize: '14px',
				color: '#000',
				fontWeight: 600
			}
		};
	},
	methods: {
		left_return() {
			uni.navigateBack();
		},
		open_index() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.u-nav-slot {
	display: flex;
	.icon {
		padding-right: 12rpx;
	}
	.iconfont {
		font-size: 42rpx;
		color: #000;
		font-weight: 500;
		padding-right: 32rpx;
	}
	.icon-zhuye-mian {
		font-weight: 500;
	}

	.white {
		color: #fff;
	}

	.block {
		color: #000;
	}
}
</style>
