<template>
	<u-navbar
		:class="[scroll_number <= 44 ? 'product_navbar' : '']"
		:title="scroll_number <= 44 ? '' : navbar_title"
		:bgColor="scroll_number <= 44 ? 'transparent' : 'rgba(255, 255, 255, .9)'"
		:titleStyle="navbarStyle"
	>
		<view class="u-nav-slot" slot="left">
			<i class="iconfont icon-left" :class="[scroll_number <= 44 ? 'active' : '']" @click="left_return"></i>
			<i class="iconfont icon-zhuye-mian" :class="[scroll_number <= 44 ? 'active' : '']" @click="open_index"></i>
		</view>
	</u-navbar>
</template>

<script>
export default {
	props: {
		scroll_number: {
			type: Number,
			default: 0
		},
		navbar_title: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			navbarStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
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
		font-weight: 600;
		padding-right: 42rpx;
	}
	.icon-zhuye-mian {
		font-weight: 500;
	}

	.active {
		color: #fff;
	}
}
</style>
