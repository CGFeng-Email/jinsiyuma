<template>
	<view class="container">
		<view class="product_details">
			<u-navbar
				:class="[scroll_number <= 44 ? 'product_navbar' : '']"
				:title="scroll_number <= 44 ? '' : '产品详情'"
				:bgColor="scroll_number <= 44 ? 'transparent' : 'rgba(255, 255, 255, .8)'"
				:titleStyle="navbarStyle"
			>
				<view class="u-nav-slot" slot="left">
					<u-icon class="icon" name="arrow-left" size="28" :color="scroll_number <= 44 ? '#fff' : '#000'" @click="left_return"></u-icon>
					<u-icon class="icon" name="home" size="28" :color="scroll_number <= 44 ? '#fff' : '#000'" @click="open_index"></u-icon>
				</view>
			</u-navbar>
			<u-swiper :list="banner_list" :loading="banner_loading" @change="e => current = e.current" :circular="true" height="750" bgColor="#f8f8f8">
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ current + 1 }}/{{ banner_list.length }}</text>
				</view>
			</u-swiper>
			<view class="" style="height: 800rpx;">
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scroll_number: 0,
			navbarStyle: {
				fontSize: '28rpx',
				color: '#000',
				fontWeight: 500
			},
			banner_loading: true,
			current: 0,
			banner_list: [
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_details_banner.png'
			]
		};
	},
	created() {
		setTimeout(() => {
			this.banner_loading = false
		}, 600)
	},
	methods: {
		onPageScroll(e) {
			this.scroll_number = Number(Math.floor(e.scrollTop));
		},
		left_return() {
			uni.navigateBack();
		},
		open_index() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
	}
};
</script>

<style lang="less" scoped>
.product_details {
	.u-nav-slot {
		display: flex;
		.icon {
			padding-right: 12rpx;
		}
	}

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 35px;
		display: flex;
		justify-content: center;

		&__text {
			color: #ffffff;
			font-size: 12px;
		}
	}
}
</style>
