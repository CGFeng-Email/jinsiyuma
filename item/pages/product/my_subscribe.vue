<!-- 我的预约 -->
<template>
	<view class="container">
		<FIXEDNAVBAR :navbar_title="navbar_title" :iconColor="true"></FIXEDNAVBAR>
		<u-transition :show="true">
			<view class="tabs_content" :style="'top:' + topIconDistance + 'px;'">
				<view class="tabs box_boaow">
					<view class="item" @click="tabs_item(0)">
						<text class="text" :class="tabs_index == 0 ? 'active' : ''">预约量房</text>
					</view>
					<view class="line"></view>
					<view class="item" @click="tabs_item(1)">
						<text class="text" :class="tabs_index == 1 ? 'active' : ''">预约设计</text>
					</view>
				</view>
			</view>
			<EMPTY v-if="empty" :top="130"></EMPTY>
			<view class="my_subscribe" v-else>
				<view class="list">
					<view class="item border-radius" v-for="(item, index) in list" :key="index" @click="open_details(item.id)">
						<view class="cover_box border-radius">
							<image class="cover" :src="my_subscribe"></image>
						</view>
						<view class="item_content">
							<view class="item_head">
								<view class="time">预约时间：{{ item.subscribe_date }}</view>
								<i class="iconfont icon-xiangyou1"></i>
							</view>
							<view class="content">
								<view class="desc" v-if="tabs_index == 0">
									所在地区：
									<block v-if="item.province">{{ item.province }}</block>
									<block v-if="item.city">{{ item.city }}</block>
									<block v-if="item.area">{{ item.area }}</block>
								</view>
								<view class="desc" v-if="tabs_index == 0">详细地址：{{ item.address }}</view>
								<view class="desc" v-if="tabs_index == 1">
									<view class="name">预约门店：</view>
									<view class="value">
										{{ item.store.title }}
									</view>
								</view>
							</view>
							<view class="btn">
								<text class="text" v-if="item.status == 0">待确认</text>
								<text class="text active" v-else-if="item.status == 1">预约成功</text>
								<text class="text" v-else-if="item.status == -1">预约失败</text>
								<text class="text active" v-else>已完成</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 加载提示 -->
				<view class="loadmore_box">
					<u-loadmore :status="list_loading" loadingText="正在加载..." loadmoreText=" " color="#606266" iconColor="#606266" fontSize="12" iconSize="14" />
				</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
export default {
	components: { FIXEDNAVBAR },
	data() {
		return {
			my_subscribe: 'https://jsym.kinsyomacz.com/resource/img/my_subscribe.png',
			navbar_title: '预约成功',
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			tabs_index: 0, // tabs栏下标
			topIconDistance: 0, // 顶部tabs距离顶部的高度
			list: [],
			page: 1, // 列表页
			size: 10, // 每页数量
			empty: false // 内容为空
		};
	},
	async onLoad(e) {
		if (e.index) {
			this.tabs_index = e.index;
		}
		await this.getTopIconDistance();
		await this.get_list();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.get_list();
	},
	// 触底
	onReachBottom() {
		this.get_list(true);
	},
	methods: {
		// 获取状态栏导航栏高度
		async getTopIconDistance() {
			return new Promise((resolve, reject) => {
				try {
					uni.getSystemInfo({
						success: (res) => {
							// 获取手机顶部状态栏的高度
							const statusBarHeight = res.statusBarHeight || 0;
							// 计算顶部图标距离
							const topIconDistance = statusBarHeight + 44;
							// 打印顶部图标距离
							console.log('顶部图标距离:', topIconDistance);
							this.topIconDistance = topIconDistance;
						},
						fail: (err) => {
							console.error('获取系统信息失败:', err);
						}
					});
					resolve();
				} catch (e) {
					//TODO handle the exception
				}
			});
		},
		// tabs栏切换
		async tabs_item(i) {
			await this.initial_list(i);
			await this.get_list();
		},
		// 初始列表数组数据
		initial_list(i) {
			this.page = 1;
			this.tabs_index = i;
			this.list = [];
		},
		// 获取列表
		async get_list(loadmore = false) {
			this.list_loading = 'loading';
			const params = {};
			if (loadmore) {
				this.page += 1;
				params.page = this.page;
				if (this.list.length >= this.list_count) return (this.list_loading = 'nomore');
			}
			let url = '';
			if (this.tabs_index == 0) {
				url = '/subscribe/getMeasureList';
			} else {
				url = '/subscribe/getDesignList';
			}
			const res = await this.$request.post(url, params);
			console.log('预约列表', res);
			this.list_count = res.count;
			if (res.lists.length <= 0) {
				this.empty = true;
			}
			this.list = [...this.list, ...res.lists];
			this.list_loading = 'loadmore';
		},
		// 预约详情
		open_details(id) {
			console.log('this.tabs_index', this.tabs_index);
			const tabs_index = this.tabs_index;
			uni.navigateTo({
				url: `/pages/product/my_subscribe_details?id=${id}&tabs_index=${tabs_index}`
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
.tabs_content {
	position: fixed;
	top: 88px;
	left: 0;
	width: 100%;
	height: 100rpx;
	z-index: 10;
	background: #fff;
	.tabs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		.item {
			height: 100rpx;
			line-height: 100rpx;
			flex: 1;
			.text {
				font-size: 26rpx;
				font-weight: 400;
				color: #7c7c7c;
				padding-bottom: 6rpx;

				position: relative;
				&::after {
					content: '';
					position: absolute;
					bottom: -6rpx;
					left: 0;
					transform: translateX(-50%);
					width: 0;
					height: 2px;
					border-radius: 10rpx;
					overflow: hidden;
					background: #fff;
					transition: all 0.5s ease;
				}
			}
			.active {
				font-weight: 600;
				color: #0a2b4e;
				// border-bottom: 1px solid #0a2b4e;
				&::after {
					width: 70%;
					left: 50%;
					transform: translateX(-50%);
					background: #0a2b4e;
				}
			}
		}
		.line {
			width: 1px;
			height: 20rpx;
			background: #7c7c7c;
			border-radius: 4rpx;
			opacity: 0.5;
		}
	}
	.box_boaow {
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
	}
}
.my_subscribe {
	padding-top: 100rpx;
	.list {
		padding: 20rpx 20rpx 0;
		.item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			background: #fff;
			padding: 28rpx;
			.cover_box {
				width: 168rpx;
				height: 168rpx;
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
				.content {
					margin: 20rpx 0;
				}
				.desc {
					display: flex;
					font-size: 28rpx;
					font-weight: 300;
					color: #464646;
					line-height: 42rpx;
					.name {
						flex: none;
						font-size: 28rpx;
						font-weight: 300;
						color: #464646;
						line-height: 28rpx;
					}
					.value {
						font-size: 28rpx;
						font-weight: 300;
						color: #464646;
						line-height: 42rpx;
					}
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
