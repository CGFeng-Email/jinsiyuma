<template>
	<view class="tabbar_container">
		<u-tabbar :value="value" :safeAreaInsetBottom="true" @change="change" :fixed="true" :placeholder="true">
			<u-tabbar-item text="首页">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/img/index.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="/static/img/index-cover.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="产品馆">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/img/product.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="/static/img/product-cover.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="案例馆">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/img/case.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="/static/img/case-cover.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="门店地址">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/img/map.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="/static/img/map-cover.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/img/me.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="/static/img/me-cover.png"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: 0
		};
	},
	methods: {
		change(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="less" scoped>

</style>
