<template>
	<view class="map_content">
		<scroll-view scroll-y="true" class="scroll" :scroll-into-view="itemId" @scroll="left_scroll">
			<view class="item" v-for="(item, index) in list" :kay="index" :id="'item' + index">
				<view class="title">
					{{ item.letter }}
				</view>
				<view class="map_list">
					<view class="li" v-for="(item2, index2) in item.data" :key="index2" @click="item(item, index)">
						<view class="icon">
							<i class="iconfont icon-dingweiweizhi"></i>
						</view>
						<view class="content">
							<view class="name">
								{{ item2.name }}
							</view>
							<view class="address">
								{{ item2.address }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="list_number">
			<view class="lis" :class="item_index == index ? 'active' : ''" v-for="(item, index) in list" :key="index" @click="fixed_item(index)">
				{{item.letter}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
import mapList from '@/utils/select_map.js';
export default {
	data() {
		return {
			list: mapList.list,
			itemId: 'item0',
			item_index: 0
		};
	},
	methods: {
		item(item, index) {
			console.log(item);
			this.item_index = index;
			
			uni.switchTab({
				url: '/pages/map/map'
			});
		},
		fixed_item(index) {
			this.itemId = 'item' + index;
			this.item_index = index;
		},
		left_scroll(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="less" scoped>
.scroll {
	height: 100vh;
	.item {
		.title {
			font-size: 28rpx;
			font-weight: 600;
			color: #313131;
			padding: 20rpx;
			background: #f8f8f8;
		}
		.map_list {
			.li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				.icon {
					padding: 0 12rpx;
				}
				.iconfont {
					font-size: 28rpx;
					color: #E6E6E8;
				}
				.content {
					padding: 20rpx 20rpx 20rpx 0;
					flex: 1;
					padding-left: 20rpx;
					border-bottom: 1px solid #E6E6E8;
					.name {
						font-size: 28rpx;
						font-weight: 400;
						color: #313131;
						line-height: 28rpx;
					}
					.address {
						font-size: 24rpx;
						font-weight: 400;
						color: #888888;
						line-height: 38rpx;
						margin-top: 14rpx;
					}
				}
				&:last-child {
					.content {
						border-bottom: 0;
					}
				}
			}
		}
	}
}

.list_number {
	position: fixed;
	top: 50%;
	right: 4px;
	z-index: 3;
	transform: translateY(-50%);
	text-align: center;
	width: 50rpx;
	height: 75%;
	.lis {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: #464646;
		text-align: center;
		border-radius: 50%;
	}
	.active {
		background: #0A2B4E;
		color: #fff;
	}
}
</style>