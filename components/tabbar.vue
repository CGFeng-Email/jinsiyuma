<!-- 自定义tabbar -->
<template>
	<view class="custom_tabbar" :class="[tabbar_bg ? 'tabbar_bg' : '', pc_height ? 'pc_height' : '']" v-if="tabbar_show">
		<block v-for="(item, index) in list" :key="index">
			<view class="item" :class="tabs_index == index && tabbar_bg ? 'active' : ''" @click="itemChange(item.url)">
				<view class="icon" v-if="tabbar_bg">
					<image class="img" :src="item.icon2" mode="widthFix" v-if="tabs_index != index"></image>
					<image class="img" :src="item.icon2_hover" mode="widthFix" v-else></image>
				</view>
				<view class="icon" v-else>
					<image class="img" :src="item.icon" mode="widthFix" v-if="tabs_index != index"></image>
					<image class="img" :src="item.icon_hover" mode="widthFix" v-else></image>
				</view>
				<view class="text" :class="tabbar_bg ? 'bg_text' : ''">{{ item.text }}</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		tabbar_show: {
			type: Boolean,
			default: true
		},
		tabs_index: {
			type: Number,
			default: 0
		},
		tabbar_bg: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			pc_height: false, // pc端小程序高度
			list: [
				{
					icon: '/static/img/tabbar/index.png',
					icon_hover: '/static/img/tabbar/index_hover.png',
					icon2: '/static/img/tabbar/index-icon.png',
					icon2_hover: '/static/img/tabbar/index-hover.png',
					text: '首页',
					url: '/pages/index/index'
				},
				{
					icon: '/static/img/tabbar/product.png',
					icon_hover: '/static/img/tabbar/product_hover.png',
					icon2: '/static/img/tabbar/product-icon.png',
					icon2_hover: '/static/img/tabbar/product-hover.png',
					text: '产品馆',
					url: '/pages/product/product'
				},
				{
					icon: '/static/img/tabbar/case.png',
					icon_hover: '/static/img/tabbar/case_hover.png',
					icon2: '/static/img/tabbar/case-icon.png',
					icon2_hover: '/static/img/tabbar/case-hover.png',
					text: '案例馆',
					url: '/pages/case/case'
				},
				{
					icon: '/static/img/tabbar/course.png',
					icon_hover: '/static/img/tabbar/course_hover.png',
					icon2: '/static/img/tabbar/course-icon.png',
					icon2_hover: '/static/img/tabbar/course-hover.png',
					text: '商学院',
					url: '/pages/login/course_loading'
				},
				{
					icon: '/static/img/tabbar/me.png',
					icon_hover: '/static/img/tabbar/me_hover.png',
					icon2: '/static/img/tabbar/me-icon.png',
					icon2_hover: '/static/img/tabbar/me-hover.png',
					text: '我的',
					url: '/pages/me/me'
				}
			]
		};
	},
	created() {
		const osName = getApp().globalData.osName;
		if (osName == 'windows' || osName == 'macos' || osName == 'android') {
			this.pc_height = true;
		}
	},
	methods: {
		itemChange(url) {
			uni.switchTab({
				url
			});
		}
	}
};
</script>

<style lang="less" scoped>
.custom_tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 58px;
	z-index: 20;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	box-shadow: 0rpx 0rpx 2rpx 0rpx rgba(0, 0, 0, 0.25);
	padding-bottom: 20rpx;
	.item {
		width: 20%;
		text-align: center;
		.icon {
			.img {
				width: 44rpx;
				height: 44rpx;
			}
		}
		.text {
			font-size: 10px;
			font-weight: 400;
			color: #ffffff;
		}

		.bg_text {
			color: #cdcdcd;
		}
	}

	.active {
		.text {
			color: #0a2b4e;
		}
	}
}

.tabbar_bg {
	background: #fff;
}

.pc_height {
	height: 48px;
	padding-bottom: 1px;
	.item {
		transform: translateY(-1px);
		.icon {
			.img {
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
}
</style>
