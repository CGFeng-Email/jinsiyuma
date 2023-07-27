<!-- 我的预约 -->
<template>
	<view class="container">
		<view class="my_subscribe">
			<FIXEDNAVBAR :navbar_title="navbar_title"></FIXEDNAVBAR>
			<view class="list">
				<view class="item border-radius" v-for="(item, index) in list" :key="index" @click="open_details">
					<view class="cover_box border-radius">
						<image class="cover" :src="item.cover" mode="widthFix"></image>
					</view>
					<view class="item_content">
						<view class="item_head">
							<view class="time">预约时间：{{ item.time }}</view>
							<i class="iconfont icon-xiangyou1"></i>
						</view>

						<view class="desc">预约门店：{{ item.title }}</view>
						<view class="btn">
							<text class="text active" v-if="item.isTrue">预约成功</text>
							<text class="text" v-else>已取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
export default {
	components: { FIXEDNAVBAR },
	data() {
		return {
			navbar_title: '预约成功',
			list: [
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe.png',
					title: '广州金丝玉玛瓷砖',
					time: '2023-05-25',
					isTrue: true
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe.png',
					title: '广州金丝玉玛瓷砖',
					time: '2023-05-25',
					isTrue: false
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe.png',
					title: '广州金丝玉玛瓷砖',
					time: '2023-05-25',
					isTrue: false
				},
				{
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe.png',
					title: '广州金丝玉玛瓷砖',
					time: '2023-05-25',
					isTrue: true
				}
			]
		};
	},
	methods: {
		open_details() {
			uni.navigateTo({
				url: '/pages/product/my_subscribe_details'
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
.my_subscribe {
	.list {
		padding: 20rpx;
		.item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			background: #fff;
			padding: 28rpx;
			.cover_box {
				.cover {
					width: 168rpx;
					height: 168rpx;
				}
			}
			.item_content {
				flex: 1;
				padding: 20rpx 0 20rpx 26rpx;
				.item_head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.time {
						font-size: 30rpx;
						font-weight: bold;
						color: #313131;
						line-height: 28rpx;
					}
					.iconfont {
						font-size: 26rpx;
						color: #cecece;
					}
				}
				.desc {
					font-size: 28rpx;
					font-weight: 300;
					color: #464646;
					line-height: 28rpx;
					margin: 20rpx 0;
				}
				.btn {
					.text {
						font-size: 22rpx;
						font-weight: 500;
						color: #a7a7a7;
						padding: 10rpx 22rpx;
						border-radius: 46rpx;
						background: #ededed;
					}
					.active {
						background: #4887fa;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
