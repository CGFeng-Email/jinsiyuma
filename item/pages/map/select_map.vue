<template>
	<view class="map_content">
		<scroll-view scroll-y="true" class="scroll" :scroll-into-view="itemId">
			<view class="item" v-for="(item, index) in list" :kay="index" :id="'item' + index">
				<view class="title">
					{{ item.key }}
				</view>
				<view class="map_list">
					<view class="li" :class="item2.id == id ? 'active' : ''" v-for="(item2, index2) in item.list" :key="index2" @click="item_click(item2)">
						<view class="icon">
							<i class="iconfont icon-dingweiweizhi"></i>
						</view>
						<view class="content">
							<view class="name">
								{{ item2.address }}
							</view>
							<view class="address">
								{{ item2.full_address }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="list_number">
			<view class="lis" :class="item_index == index ? 'active' : ''" v-for="(item, index) in list" :key="index" @click="fixed_item(index)">
				{{ item.key }}
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: {},
			itemId: 'item0',
			item_index: 0,
			id: ''
		};
	},
	onLoad(e) {
		console.log('e', e);
		this.id = e.id;
		this.get_list();
	},
	methods: {
		item_click(item) {
			console.log(item);
			uni.$emit('select_map', {
				id: item.id
			});
			uni.navigateBack();
		},
		fixed_item(index) {
			this.itemId = 'item' + index;
			this.item_index = index;
		},
		async get_list() {
			const res = await this.$request.post('/store/getLetterList');
			console.log('门店列表', res);
			const list = [];
			for (let key in res) {
				const obj = {
					key,
					list: res[key]
				};
				list.push(obj);
			}
			this.list = list;
			list.map((item, index) => {
				item.list.forEach((item2) => {
					if (item2.id == this.id) {
						this.item_index = index;
						return (this.itemId = 'item' + index);
					}
				});
			});
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
					color: #e6e6e8;
				}
				.content {
					padding: 30rpx 40rpx 20rpx 0;
					flex: 1;
					padding-left: 20rpx;
					border-bottom: 1px solid #e6e6e8;
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
			.active {
				.iconfont {
					color: #0a2b4e;
					font-weight: 600;
				}
				.content {
					.name {
						color: #0a2b4e;
						font-weight: 600;
					}
					.address {
						color: #0a2b4e;
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
		background: #0a2b4e;
		color: #fff;
	}
}
</style>
