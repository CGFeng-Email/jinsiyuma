<!-- 活动馆个人中心 -->
<template>
	<view class="container">
		<u-transition :show="true" mode="fade" duration="600">
			<!-- 吸顶 -->
			<u-sticky class="sticky" bgColor="#fff" offsetTop="0">
				<!-- 搜索 -->
				<view class="search_box" @click="open_search">
					<u-search
						placeholder="大家都在搜索国庆活动"
						:disabled="true"
						clearabled
						height="32"
						bgColor="#F5F5F5"
						placeholderColor="#AFAFAF"
						shape="round"
						searchIconColor="#002C50"
						:showAction="false"
						@custom="search_btn"
					></u-search>
				</view>
			</u-sticky>

			<view class="me_maim">
				<u-swiper :list="banner_list" keyName="src" indicator indicatorMode="line" circular @change="(e) => (banner_index = e.current)"></u-swiper>
				<!-- 个人中心 -->
				<view class="me_btn box-shadow" @click="open_me_center">
					<view class="head">
						<i class="iconfont icon-shuxian"></i>
						<text class="text">个人中心</text>
					</view>
					<view class="list">
						<view class="item">
							<view class="left">
								<view class="cover_box">
									<image class="cover" :src="head_portrait" mode="aspectFit"></image>
								</view>
								<view class="user_data">
									<view class="name">
										{{ user_name }}
									</view>
									<view class="desc">
										{{ user_desc }}
									</view>
								</view>
							</view>
							<view class="icon">
								<i class="iconfont icon-right-1-copy"></i>
							</view>
						</view>
					</view>
				</view>
				<view class="list_content box-shadow">
					<view class="head">
						<i class="iconfont icon-shuxian1"></i>
						<text class="text">活动动态</text>
					</view>
					<view class="list">
						<view class="item" v-for="(item, index) in list" :key="index" @click="open_list_item(item.src)">
							<view class="name">
								<i :class="['iconfont', item.icon]"></i>
								<text class="text">{{ item.text }}</text>
							</view>
							<view class="arrow">
								<i class="iconfont icon-right-1-copy"></i>
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
		return {
			banner_list: [],
			banner_index: 0,
			list: [
				{
					icon: 'icon-zuji',
					text: '我的足迹',
					src: '/pages/course/activity/history_list'
				},
				// {
				// 	icon: 'icon-yunxiazai',
				// 	text: '我的下载',
				// 	src: '/pages/course/activity/download_list'
				// },
				{
					icon: 'icon-shoucang4',
					text: '我的收藏',
					src: '/pages/course/activity/collect_list'
				}
			],
			head_portrait: '', // 头像
			user_name: '云课堂用户',
			user_desc: '尊敬的用户，你好！'
		};
	},
	onLoad() {
		this.get_swiper();
	},
	onShow() {
		this.get_me();
	},
	methods: {
		// 搜索右侧控件
		search_btn() {
			uni.navigateTo({
				url: '/pages/course/search'
			});
		},
		// 跳转搜索页
		open_search() {
			uni.navigateTo({
				url: '/pages/course/search'
			});
		},
		open_list_item(src) {
			uni.navigateTo({
				url: src
			});
		},
		open_me_center() {
			uni.navigateTo({
				url: '/pages/course/knowledge/me_center'
			});
		},
		// 获取个人中心数据
		async get_me() {
			const res = await this.$request.get2('/api/user/center');
			console.log('个人数据', res);
			if (res.code == 200) {
				this.head_portrait = res.data.avatar;
				this.user_name = res.data.nickname;
			}
		},
		// 获取swiper
		async get_swiper() {
			const res = await this.$request.get2('/api/banner/list', {
				name: '个人集'
			});
			console.log('轮播', res);
			if (res.code == 200) {
				this.banner_list = res.data.lists[0].images;
			}
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
.me_maim {
	padding: 20rpx 30rpx;
}

.me_btn {
	margin-top: 30rpx;
	background: #fff;
	padding: 20rpx 0 0;
	border-radius: 12rpx;
	.head {
		display: flex;
		align-items: center;
		.iconfont {
			font-weight: 700;
			color: #002c50;
		}
		.text {
			font-size: 32rpx;
			color: #002c50;
			font-weight: 500;
		}
	}
	.list {
		padding: 0 20rpx;
		.item {
			padding: 30rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				flex: 1;
				display: flex;
				align-items: center;
				.cover_box {
					width: 120rpx;
					height: 122rpx;
					border-radius: 50%;
					.cover {
						width: 120rpx;
						height: 122rpx;
						border-radius: 50%;
					}
				}

				.user_data {
					padding-left: 20rpx;
					.name {
						font-size: 28rpx;
						line-height: 38rpx;
						font-weight: 600;
						color: #313131;
					}

					.desc {
						font-size: 22rpx;
						line-height: 24rpx;
						color: #464646;
						padding-top: 10rpx;
					}
				}
			}
			.icon {
				flex: none;
			}
		}
	}
}

.search_box {
	padding: 30rpx;
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icon {
		padding-left: 30rpx;
		.iconfont {
			font-size: 72rpx;
			color: #0a2b4e;
		}
	}
}

.list_content {
	margin-top: 30rpx;
	background: #fff;
	border-radius: 12rpx;
	.head {
		padding-top: 30rpx;
		display: flex;
		align-items: center;
		.iconfont {
			font-weight: 700;
			color: #002c50;
		}
		.text {
			font-size: 32rpx;
			color: #002c50;
			font-weight: 500;
		}
	}
	.list {
		padding: 0 20rpx;
		.item {
			padding: 40rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ececec;
			.name {
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 38rpx;
					color: #0a2b4e;
				}
				.text {
					font-size: 24rpx;
					color: #333333;
					padding-left: 20rpx;
				}
			}
			.arrow {
				font-size: 24rpx;
				color: #000;
			}
		}
		.item:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
