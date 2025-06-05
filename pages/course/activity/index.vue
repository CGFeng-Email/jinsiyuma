<!-- 活动馆 -->
<template>
	<view class="activity">
		<u-transition :show="true" mode="fade" duration="1000">
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
					<view class="icon" @click="open_me">
						<i class="iconfont icon-yonghu"></i>
					</view>
				</view>
			</u-sticky>
			<view class="activity_main">
				<view class="swiper box-shadow">
					<u-swiper :list="banner_list" keyName="src" indicator indicatorMode="line" circular @change="(e) => (banner_index = e.current)"></u-swiper>
				</view>
				<!-- 线下培训 -->
				<view class="list_box">
					<view class="head">
						<u-divider text="推荐活动" textSize="18" textColor="#000" lineColor="#BBBBBB"></u-divider>
					</view>
					<view class="head_lead">下载文件过大请保存至百度网盘后使用网盘进行下载</view>
					<view class="list">
						<block v-for="(item, index) in list" :key="index">
							<view class="item box-shadow" @click="open_details(item)">
								<image class="cover" :src="item.cover" mode="widthFix"></image>
								<view class="video_bottom">
									<view class="box">
										<i class="iconfont icon-zhaobiaofangan"></i>
										<text class="text">课程视频</text>
									</view>
									<i class="iconfont icon-vertical_line"></i>
									<view class="box">
										<i class="iconfont icon-wuliaotoufang1"></i>
										<text class="text">培训课件</text>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class="empty" v-if="empty_show">
						<u-empty text="资源未上线" :icon="empty"></u-empty>
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
			empty: '/static/img/empty/data.png',
			empty_show: false,
			banner_list: [],
			banner_index: 0,
			list: []
		};
	},
	created() {
		this.get_list();
		this.get_swiper();
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
		// 跳转课程详情
		open_details(item) {
			uni.navigateTo({
				url: `/pages/course/activity/details?id=${item.id}&type=${item.type}`
			});
		},
		// 跳转活动馆个人中心
		open_me() {
			uni.navigateTo({
				url: '/pages/course/activity/me'
			});
		},
		// 获取列表
		async get_list() {
			const res = await this.$request.get2('/api/graphic/list', {
				pageSize: 60,
				classify: 17 // 加油站图文类:13, 活动馆活动:17
			});
			console.log('列表', res);
			if (res.code == 200) {
				this.list = res.data.lists;
				if (this.list.length == 0) {
					this.empty_show = true;
				}
			}
		},
		// 获取swiper
		async get_swiper() {
			const res = await this.$request.get2('/api/banner/list', {
				name: '活动馆'
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
.activity_main {
	padding: 20rpx 30rpx;
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

.list_box {
	padding: 70rpx 0 30rpx;
	.head {
		width: 70%;
		margin: auto;
		font-size: 36rpx;
		font-weight: 600;
		color: #000000;
		text-align: center;
		overflow: hidden;
	}

	.head_lead {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #ababab;
		text-align: center;
	}

	.list {
		padding-top: 40rpx;
		padding-bottom: 50rpx;
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 330rpx;
			// height: 320rpx;
			background: #fff;
			padding: 10rpx;
			margin-bottom: 30rpx;
			border-radius: 12rpx;
			overflow: hidden;
			.cover {
				width: 100%;
			}
			.video_bottom {
				padding-top: 14rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.box {
					display: flex;
					align-items: center;
					.iconfont {
						font-size: 28rpx;
						color: #0a2b4e;
					}
					.text {
						font-size: 24rpx;
						color: #000;
						padding-left: 6rpx;
					}
				}

				.icon-vertical_line {
					font-size: 24rpx;
					color: #b5b5b5;
				}
			}
		}

		.item:nth-child(odd) {
			margin-right: 30rpx;
		}
	}
}
</style>
