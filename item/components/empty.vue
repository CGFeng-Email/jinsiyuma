<template>
	<view class="empty" :style="top > 120 ? 'padding-top:' + top + 'px;' : ''">
		<u-empty :text="text" :icon="icon" :iconSize="iconSize" ></u-empty>
	</view>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: '/static/img/empty/data.png'
		},
		text: {
			type: String,
			default: '暂无数据'
		},
		top: {
			type: Number,
			default: 120
		},
		iconSize: {
			type: Number,
			default: 70
		}
	}
};
</script>

<style scoped lang="less">
.empty {
	padding-top: 200px;
}
</style>
