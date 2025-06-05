<template>
	<view style="width: 100%; margin-top: 60px">
		<web-view :src="official_accounts_link"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			official_accounts_link: ''
		};
	},
	onLoad() {
		this.initial()
	},
	methods: {
		initial() {
			const app = getApp();
			this.official_accounts_link = app.globalData.official_accounts_link;
			console.log(this.official_accounts_link);
		}
	}
};
</script>

<style></style>
