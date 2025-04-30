<!-- 下载 -->
<template>
	<view class="history_list">
		<u-transition :show="true">
			<view class="list">
				<view class="item" v-for="(item, index) in 10" :key="index" @click="open_video_details">
					<view class="cover_box">
						<image
							class="cover"
							src="https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/%E4%BA%91%E8%AF%BE%E5%A0%82/public_list1.jpg"
							mode="widthFix"
						></image>
					</view>
					<view class="content">
						<view class="title over1">开营班会</view>
						<view class="lead over1">优雅与浪漫永不过时</view>
						<view class="time">
							<i class="iconfont icon-shijian"></i>
							<text class="text">2023-09-25 15:34</text>
						</view>
						<view class="statuc">
							<view class="box">
								<i class="iconfont icon-kanguos"></i>
								<text class="text">32</text>
							</view>
							<view class="box">
								<i class="iconfont icon-dianzan6"></i>
								<text class="text">24</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		open_video_details() {
			uni.navigateTo({
				url: '/pages/course/knowledge/video_details'
			});
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
.list {
	padding: 20rpx;
	.item {
		margin-bottom: 20rpx;
		background: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		.cover_box {
			width: 230rpx;
			border-radius: 12rpx;
			overflow: hidden;
			.cover {
				max-height: 180rpx;
				height: auto;
			}
		}

		.content {
			flex: 1;
			padding-left: 20rpx;
			.title {
				font-size: 28rpx;
				line-height: 38rpx;
				color: #000;
				font-weight: 600;
			}

			.lead {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #4d4d4d;
				margin: 12rpx 0;
			}

			.time {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #9f9f9f;
				.iconfont {
					font-size: 24rpx;
					color: #9f9f9f;
					padding-right: 6rpx;
				}
			}

			.statuc {
				display: flex;
				align-items: center;
				.box {
					padding-top: 12rpx;
					display: flex;
					align-items: center;
					padding-right: 20rpx;
					.iconfont {
						font-size: 24rpx;
						color: #9f9f9f;
					}
					.text {
						font-size: 24rpx;
						color: #9f9f9f;
						padding-left: 6rpx;
					}
				}
			}
		}
	}
}
</style>
