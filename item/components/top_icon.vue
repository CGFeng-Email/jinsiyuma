<!-- 返回顶部 -->
<template>
	<view class="top_icon animate_fade" :class="[right_num ? 'top_right' : '']" v-if="topShow">
		<image class="icon" src="/static/img/top_icon.png" mode="widthFix" @click="topItem"></image>
	</view>
</template>

<script>
export default {
	props: {
		topShow: {
			type: Boolean,
			default: false
		},
		details: {
			type: Boolean,
			default: false
		},
		right_num: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		topItem() {
			uni.pageScrollTo({
				scrollTop: 0,
			});
		}
	}
};
</script>

<style lang="less" scoped>
.top_icon {
	position: fixed;
	bottom: 170rpx;
	right: 44rpx;
	z-index: 10;
	text-align: center;
	.icon {
		width: 128rpx;
		height: 128rpx;
	}
}


.top_right {
	right: 3rpx;
}
</style>
