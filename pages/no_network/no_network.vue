<template>
	<view class="container">
		<u-empty text="网络发生错误,请检查网络状况!" :icon="icon" marginTop="80"></u-empty>
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

<style scoped lang="less">
	
</style>
