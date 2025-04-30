<!-- 公共悬浮-联系我们 -->
<template>
	<view class="contact_us_btn animate_fade" :class="[topShow ? 'scroll_top' : '', details ? 'details_top' : '', mapShow ? 'map_top' : '']" v-if="topShow">
		<button open-type="contact" class="contact_us" send-message-title="金丝玉玛客服" show-message-card>
			<image class="icon" src="/static/img/contact_icon.png" mode="widthFix"></image>
		</button>
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
			mapShow: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="less" scoped>
.contact_us_btn {
	position: fixed;
	right: 20rpx;
	bottom: 210rpx;
	z-index: 10;
	.contact_us {
		background-color: transparent;
		box-shadow: none;
		border: 0;
		outline: none;
		padding: 0;
		margin: 0;
		&::after {
			display: none;
		}
	}
	.icon {
		width: 172rpx;
		height: 144rpx;
	}
}

.scroll_top {
	bottom: 310rpx;
}

.details_top {
	bottom: 300rpx;
}

.map_top {
	bottom: 60%;
}
</style>