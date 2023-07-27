<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view class="me">
			<u-navbar title="个人中心" :titleStyle="navbarStyle" leftIcon=" " placeholder bgColor="transparent"></u-navbar>
			<view class="cover_box banner">
				<image class="cover" :src="banner" mode="widthFix"></image>
			</view>
			<view class="user_content">
				<view class="left">
					<view class="cover_box box-shadow" @click="open_head_portrait">
						<image class="cover" :src="head_portrait" mode="widthFix"></image>
					</view>
					<view class="user_info" @click="open_info">
						<view class="title">
							{{ title }}
						</view>
						<view class="hint">
							{{ hint }}
						</view>
					</view>
				</view>
				<view class="right" @click="open_info">
					<i class="iconfont icon-right-1-copy"></i>
				</view>
			</view>
			<view class="user_tabs">
				<view class="ut_content border-radius box-shadow">
					<view class="item" @click="open_tabs(0)">
						<i class="iconfont icon-shoucang-yishoucang"></i>
						<text class="text">产品收藏</text>
					</view>
					<view class="item" @click="open_tabs(1)">
						<i class="iconfont icon-xihuanT"></i>
						<text class="text">案例收藏</text>
					</view>
					<view class="item" @click="open_tabs(2)">
						<i class="iconfont icon-jurassic_wait"></i>
						<text class="text">浏览历史</text>
					</view>
				</view>
			</view>
			<view class="head_title">我的服务</view>
			<view class="service_list">
				<view class="item subscribe_item border-radius" @click="open_subscribe_list">
					<view class="text">我的预约</view>
					<image class="cover" :src="subscribe_icon" mode="widthFix"></image>
				</view>

				<view class="item service_item border-radius">
					<view class="text">联系客服</view>
					<image class="cover" :src="service_icon" mode="widthFix"></image>
					<button class="item_btn" open-type="contact" send-message-title="金丝玉玛" show-message-card></button>
				</view>
			</view>
			<view class="head_title">关于我们</view>
			<view class="about_us_list">
				<view class="li border-radius box-shadow" @click="open_about_us">
					<view class="left">
						<i class="iconfont icon-guanyuwomen"></i>
						<text class="text">关于我们</text>
					</view>
				</view>
				<view class="li border-radius box-shadow" @click="open_accounts">
					<view class="left">
						<image class="cover" :src="me_logo" mode="widthFix"></image>
						<text class="text">金丝玉玛公众号</text>
					</view>
					<view class="right">
						<text class="desc">即刻关注</text>
					</view>
				</view>
			</view>
			<!-- 头像上传弹窗 -->
			<HEADPORTRAIT :show_head_portrait="show_head_portrait" @close_head_portrait="close_head_portrait"></HEADPORTRAIT>
			<!-- 底部栏 -->
			<TABBAR :tabbar_bg="true" :tabs_index="4"></TABBAR>
		</view>
	</view>
</template>
<script>
import HEADPORTRAIT from '@/components/head_portrait_popup.vue';
export default {
	components: { HEADPORTRAIT },
	data() {
		return {
			loading: true,
			navbarStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/me_banner.png',
			head_portrait: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/head_portrait.png',
			subscribe_icon: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/subscribe_icon.png',
			service_icon: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/service_icon.png',
			me_logo: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/me_logo.png',
			title: '一只小蘑菇',
			hint: '尊敬的用户，下午好！',
			show_head_portrait: false
		};
	},
	async onLoad() {
		setTimeout(() => {
			this.loading = false
		}, 500)
	},
	methods: {
		open_tabs(i) {
			if (i == 0) {
				uni.navigateTo({
					url: '/pages/me/collect_list?tabs_index=0'
				});
			} else if (i == 1) {
				uni.navigateTo({
					url: '/pages/me/collect_list?tabs_index=1'
				});
			} else {
				uni.navigateTo({
					url: '/pages/me/history'
				});
			}
		},
		open_head_portrait() {
			this.show_head_portrait = true;
		},
		close_head_portrait() {
			this.show_head_portrait = false;
		},
		open_info() {
			uni.navigateTo({
				url: '/pages/me/info'
			});
		},
		open_about_us() {
			uni.navigateTo({
				url: '/pages/me/about_us'
			});
		},
		// 我的预约
		open_subscribe_list() {
			uni.navigateTo({
				url: '/pages/product/my_subscribe'
			});
		},
		open_accounts() {
			uni.navigateTo({
				url: '/pages/me/accounts'
			})
		}
	}
};
</script>

<style scoped lang="less">
.me {
	.banner {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: -1;
	}
	.user_content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 30rpx;
		.left {
			display: flex;
			align-items: center;
			.cover_box {
				background: none;
				border-radius: 50rpx;
				overflow: hidden;
				.cover {
					width: 122rpx;
					height: 122rpx;
				}
			}
			.user_info {
				padding: 0 20rpx;
				.title {
					font-size: 36rpx;
					line-height: 46rpx;
					color: #313131;
					font-weight: 600;
				}
				.hint {
					font-size: 26rpx;
					line-height: 36rpx;
					font-weight: 500;
					color: #464646;
					padding-top: 10rpx;
				}
			}
		}
		.right {
			padding: 38rpx 0 38rpx 150rpx;
			.iconfont {
				font-size: 34rpx;
				color: #9e9fa1;
			}
		}
	}
	.user_tabs {
		margin-top: 40rpx;
		padding: 10rpx 30rpx;
		.ut_content {
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 176rpx;
			.item {
				width: 33.33%;
				text-align: center;
				.iconfont {
					font-size: 60rpx;
					color: #0a2b4e;
				}
				.text {
					font-size: 22rpx;
					font-weight: 400;
					color: #464646;
				}
			}
		}
	}
	.head_title {
		padding: 32rpx 30rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #313131;
	}
	.service_list {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		.item {
			width: 336rpx;
			height: 132rpx;
			position: relative;
			padding: 24rpx 16rpx;
			text-align: left;
			.text {
				font-size: 28rpx;
				line-height: 38rpx;
				font-weight: 400;
				color: #464646;
			}
			.cover {
				position: absolute;
				top: 0;
				right: 0;
				width: 208rpx;
				height: 136rpx;
			}
			.item_btn {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
			button {
				margin: 0;
				background-color: transparent;
				&:after {
					display: none;
				}
			}
		}
		.subscribe_item {
			background: linear-gradient(54deg, #e6edff 0%, #d4e1ff 100%);
			.cover {
				top: -3px;
			}
		}
		.service_item {
			background: linear-gradient(62deg, #fff5e2 0%, #ffedc0 100%);
			.cover {
				top: -7px;
			}
		}
	}

	.about_us_list {
		padding: 0 30rpx;
		.li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 26rpx 38rpx;
			margin-bottom: 22rpx;
			.left {
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 68rpx;
					color: #4887fa;
				}
				.text {
					font-size: 28rpx;
					font-weight: 400;
					color: #464646;
					padding-left: 26rpx;
				}
				.cover {
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					overflow: hidden;
				}
			}
			.right {
				font-size: 24rpx;
				font-weight: 500;
				color: #464646;
			}
			&:hover {
				background: #f8f8f8;
			}
		}
	}
}
</style>