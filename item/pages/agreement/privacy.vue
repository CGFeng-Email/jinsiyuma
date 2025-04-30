<template>
	<view class="content">
		<u-parse :content="content" :tagStyle="contentStyle" :selectable="true"></u-parse>
	</view>
</template>

<script>
export default {
	data() {
		return {
			contentStyle: {
				p: 'font-size: 24rpx;color: #181818;line-height: 42rpx;background-color: none;',
				span: 'font-size: 24rpx;color: #181818;line-height: 42rpx;background-color: none;'
			},
			content: {}
		};
	},
	onLoad() {
		this.get_data();
	},
	methods: {
		async get_data() {
			const res = await this.$request.post('/user/getAgreement');
			console.log('res', res);
			this.content = res.privacy_content
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	padding: 0 20rpx;
	padding-bottom: 40rpx;
	font-size: 26rpx;
	color: '#31313';
	line-height: 38rpx;
}
.title {
	padding: 20rpx 0;
	font-weight: 600;
}

.text {
	line-height: 44rpx;
	text-indent: 2em;
}
</style>
