<!-- 足迹 -->
<template>
	<view class="history_list">
		<u-transition :show="true">
			<u-sticky class="sticky" bgColor="#fff" offsetTop="0">
				<!-- 导航栏 -->
				<view class="tabs_head">
					<u-tabs
						class="tabs"
						:list="tabs"
						:current="tabs_index"
						@click="click_tans"
						lineColor="#0A2B4E"
						:activeStyle="activeStyle"
						:inactiveStyle="inactiveStyle"
						itemStyle="padding: 0 15px; height: 40px;background: #fff;"
					></u-tabs>
				</view>
			</u-sticky>
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index" @click="open_video_details(item)">
					<view class="cover_box">
						<image class="cover" :src="item.cover" mode="scaleToFill"></image>
					</view>
					<view class="content">
						<view class="title over1">{{ item.name }}</view>
						<view class="lead over2">{{ item.remark }}</view>
						<view class="time">
							<i class="iconfont icon-shijian"></i>
							<text class="text">{{ item.updateTime | secondsFormat }}</text>
						</view>
						<view class="statuc">
							<view class="box">
								<i class="iconfont icon-kanguos"></i>
								<text class="text">{{ item.watchCount }}</text>
							</view>
							<view class="box">
								<i class="iconfont icon-dianzan6"></i>
								<text class="text">{{ item.likeCount }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
import { secondsFormat } from '@/utils/regular.js';
export default {
	data() {
		return {
			tabs: [
				{
					name: '活动',
					type: 3
				},
				{
					name: '图文',
					type: 2
				}
			],
			tabs_index: 0,
			// 选中的样式
			activeStyle: {
				color: '#0A2B4E',
				fontSize: '24rpx',
				fontWeight: 600
			},
			// 未选中的样式
			inactiveStyle: {
				color: '#000',
				fontSize: '24rpx'
			},
			list: []
		};
	},
	onLoad() {
		this.get_list();
	},
	filters: { secondsFormat },
	methods: {
		// 导航栏切换
		click_tans(item) {
			this.tabs_index = item.index;
			this.get_list();
		},
		// 获取列表
		async get_list() {
			const res = await this.$request.get2('/api/footprint/list', {
				type: this.tabs[this.tabs_index].type
			});
			console.log('列表', res);
			this.list = res.data;
		},
		// 跳转详情
		open_video_details(item) {
			uni.navigateTo({
				url: `/pages/course/activity/details?id=${item.id}&type=${item.type}`
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
				height: 100%;
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
