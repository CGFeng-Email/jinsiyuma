<template>
	<view class="container">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src: ''
		};
	},
	onLoad(e) {
		if (e.vr_link) return (this.src = e.vr_link);
		this.get_data(e.id);
	},
	methods: {
		async get_data(id) {
			const res = await this.$request.post('/article/detail', { id });
			console.log('详情', res);
			this.src = res.url;
		}
	}
};
</script>

<style></style>
