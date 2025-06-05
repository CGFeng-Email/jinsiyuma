<!-- 无网络 -->
<template>
	<view class="container">
		<u-empty marginTop="30" mode="wifi" :icon="icon"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				icon: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/empty/%E6%B2%A1%E6%9C%89wifi.png'
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>
