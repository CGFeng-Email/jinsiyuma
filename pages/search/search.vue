<template>
	<view class="container">
		<u-navbar title=" " :autoBack="true" bgColor="#fff" :placeholder="true">
			<view class="u-nav-slot" slot="center">
				<u-search
					v-model="keyword"
					:clearabled="true"
					:showAction="false"
					height="30"
					bgColor="#F4F4F4"
					margin="8rpx"
					@search="searchCenter"
					@clear="clearSearch"
					@change="changeSearch"
				></u-search>
			</view>
		</u-navbar>
		<view class="search_content">
			<view class="commont_content">
				<view class="head">
					<view class="h_title">历史搜索</view>
					<i class="iconfont icon-shanchu"></i>
				</view>
				<view class="list">
					<view class="item" @click="open_product_list">轻奢风瓷砖</view>
					<view class="item" @click="open_product_list">新中式</view>
					<view class="item" @click="open_product_list">800*800</view>
				</view>
			</view>
			<view class="commont_content">
				<view class="head">
					<view class="h_title">热门标签</view>
				</view>
				<view class="list">
					<view class="item" @click="open_product_list">米色瓷砖</view>
					<view class="item" @click="open_product_list">轻奢风瓷砖</view>
					<view class="item" @click="open_product_list">新中式</view>
					<view class="item" @click="open_product_list">静夜星辰</view>
					<view class="item" @click="open_product_list">米色瓷砖</view>
					<view class="item" @click="open_product_list">新中式</view>
					<view class="item" @click="open_product_list">K金星空岩板</view>
					<view class="item" @click="open_product_list">通体大理石</view>
					<view class="item" @click="open_product_list">集采</view>
					<view class="item" @click="open_product_list">米色瓷砖</view>
					<view class="item">轻奢风瓷砖</view>
					<view class="item">K金4.0瓷砖</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			keyword: ''
		};
	},
	methods: {
		changeSearch(e) {
			console.log(e);
		},
		searchCenter() {
			console.log('searchCenter');
		},
		clearSearch() {
			console.log('clearSearch');
		},
		open_product_list() {
			uni.navigateTo({
				url: '/pages/product/product_list'
			})
		}
	}
};
</script>
<style>
page {
	background: #f8f8f8;
}
</style>

<style lang="less" scoped>
.u-nav-slot {
	width: 460rpx;
	margin-right: 120rpx;
}

.search_content {
	padding: 30rpx;
	.commont_content {
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.h_title {
				font-size: 28rpx;
				font-weight: 500;
				color: #313131;
				line-height: 44rpx;
			}
			.iconfont {
				font-size: 30rpx;
				padding-left: 30rpx;
			}
		}
		
		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;
			.item {
				font-size: 24rpx;
				font-weight: 500;
				color: #888888;
				line-height: 44rpx;
				padding: 10rpx 30rpx;
				background: #fff;
				border-radius: 32rpx;
				margin-right: 12rpx;
				margin-bottom: 12rpx;
			}
		}
	}
}
</style>