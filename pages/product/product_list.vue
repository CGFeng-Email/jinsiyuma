<template>
	<view class="container">
		<view class="product_list">
			<view class="banner">
				<u--image :src="banner" width="100%" height="316px" mode="widthFix"></u--image>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in 10" :key="index">
					<view class="head">
						<view class="left">
							<image class="icon" src="../../static/img/product_list_icon.png" mode="widthFix"></image>
							<text class="title">丝帛羽白</text>
							<image class="hot" src="/static/img/hot.png" mode="widthFix"></image>
						</view>
						<view class="right">D654P</view>
					</view>
					<view class="desc">拉什莫尔</view>
					<view class="item_content">
						<view class="item__content_left">
							<view class="left_box">
								<view class="icon">
									<i v-if="true" class="iconfont icon-shoucang2"></i>
									<i v-else class="iconfont icon-shoucang-yishoucang"></i>
								</view>
								<view class="text">
									<u-count-to :endVal="500" color="#CDCDCD" fontSize="12"></u-count-to>
								</view>
							</view>
							<view class="left_box">
								<view class="icon">
									<i class="iconfont icon-kanguos"></i>
								</view>
								<view class="text">
									<u-count-to :endVal="500" color="#CDCDCD" fontSize="12"></u-count-to>
								</view>
							</view>
						</view>
						<view class="cover_box">
							<u--image width="100%" height="100%" src="https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_list_cover.png" mode="widthFix"></u--image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_list_banner.png'
		};
	}
};
</script>

<style>
page {
	background: #f8f8f8;
}
</style>
<style lang="less" scoped>
.product_list {
	.banner {
		height: 316rpx;
	}
	.list {
		.item {
			background: #fff;
			margin-bottom: 10rpx;
			.head {
				padding: 30rpx 30rpx 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					display: flex;
					align-items: center;
					.icon {
						width: 12rpx;
						height: 26rpx;
					}
					.hot {
						width: 32rpx;
						height: 32rpx;
					}
					.title {
						font-size: 30rpx;
						font-weight: 600;
						color: #313131;
						padding: 0 10rpx;
					}
				}
				.right {
					font-size: 22rpx;
					font-weight: 400;
					color: #3e3e3e;
				}
			}
			.desc {
				font-size: 22rpx;
				font-family: Inter-Regular, Inter;
				font-weight: 400;
				color: #979797;
				padding: 10rpx 0 30rpx 52rpx;
			}
			.item_content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 20rpx;
				.item__content_left {
					display: flex;
					height: 100%;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-left: 52rpx;
					flex: none;
					.left_box {
						padding-right: 28rpx;
						padding-bottom: 20rpx;
					}
					.icon {
						.iconfont {
							font-size: 36rpx;
							color: #CDCDCD;
						}
						.icon-shoucang-yishoucang {
							color: #FCC863;
						}
					}
					.text {
						padding-bottom: 20rpx;
					}
				}
				.cover_box {
					flex: 1;
					border-radius: 0 0 0 40rpx;
					height: 350rpx;
					overflow: hidden;
					background: #f8f8f8
				}
			}
		}
	}
}
</style>