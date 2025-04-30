<!-- 品牌列表 -->
<template>
	<view class="container">
		<SERVICE_EMPTY v-if="list.length == 0 && empty"></SERVICE_EMPTY>
		<view v-else class="brand_list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="top_content" @click="open_brand_details(item.id)">
					<view class="left_content">
						<view class="title over2">{{ item.title }}</view>
						<view class="desc over1">{{ item.remark }}</view>
						<view class="static">
							<view class="time">{{ item.publish_date }}</view>
							<view class="right_static"></view>
						</view>
					</view>

					<image class="cover box-shadow" :src="item.image"></image>
				</view>
				<view class="bottom_content">
					<view class="b_left">#{{ item.cate_name }}</view>
					<view class="icon">
						<button class="share_btn" open-type="share" @click="open_share(item)">
							<i class="iconfont icon-zhuanfa"></i>
						</button>
					</view>
				</view>
			</view>
			<!-- 加载提示 -->
			<view class="loadmore_box" v-if="list.length < list_count">
				<u-loadmore :status="list_loading" loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
			</view>
			<!-- 返回顶部 -->
			<TOPICON :topShow="topShow" :details="true" :right_num="true"></TOPICON>
		</view>
	</view>
</template>

<script>
import SERVICE_EMPTY from '@/components/service_empty.vue';
export default {
	components: { SERVICE_EMPTY },
	data() {
		return {
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			list: [], // 列表数据
			list_count: 0, // 总条数
			page: 1, // 列表页
			size: 10, // 每页数量
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			share: {},
			empty: false
		};
	},
	onLoad() {
		this.get_list();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.get_list();
	},
	// 触底
	onReachBottom() {
		this.get_list(true);
	},
	// 分享
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			desc: this.share.desc,
			imageUrl: this.share.image,
			path: '/pages/index/index'
		};
	},
	// 滑动
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 600 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 600 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		// 更新分享数据
		open_share(e) {
			const { title, image, remark } = e;
			const obj = {
				title,
				image,
				desc: remark
			};
			this.share = obj;
		},
		// 跳转详情
		open_brand_details(id) {
			uni.navigateTo({
				url: `/pages/brand/details?id=${id}`
			});
		},
		// 获取列表
		async get_list(loadmore = false) {
			this.list_loading = 'loading';
			const params = {};
			if (loadmore) {
				this.page += 1;
				params.page = this.page;
				if (this.list.length >= this.list_count) return (this.list_loading = 'nomore');
			} else {
				this.list = [];
			}
			const res = await this.$request.post('/article/getList', params);
			console.log('品牌列表', res);
			this.list_count = res.count;
			if (res.lists.length <= 0) {
				this.empty = true;
			}
			this.list = [...this.list, ...res.lists];

			if (this.list.length >= this.list_count) return (this.list_loading = 'nomore');
			this.list_loading = 'loadmore';
			wx.stopPullDownRefresh();
		}
	}
};
</script>

<style lang="less" scoped>
.brand_list {
	padding: 20rpx;
	padding-bottom: 0;
	.item {
		padding: 20rpx 0;
		.top_content {
			display: flex;
			justify-content: space-between;
			.left_content {
				flex: 1;
				padding-right: 20rpx;
				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #313131;
					line-height: 42rpx;
				}
				.desc {
					font-size: 26rpx;
					font-weight: 400;
					color: #888888;
					line-height: 30rpx;
					padding: 10rpx 0;
				}
				.static {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;
					.time {
						font-size: 22rpx;
						font-family: Inter-Regular, Inter;
						font-weight: 400;
						color: #cdcdcd;
						line-height: 26rpx;
					}
					.right_static {
						display: flex;
						align-items: center;
						.rs_box {
							display: flex;
							align-items: center;
							padding-left: 20rpx;
							.iconfont {
								font-size: 22rpx;
							}
							.text {
								font-size: 22rpx;
								font-weight: 400;
								color: #cdcdcd;
								line-height: 26rpx;
								padding: 0 12rpx 0 4rpx;
							}
							.active {
								color: #fcc863;
							}
							.white {
								color: #fff;
							}
						}
					}
				}
			}

			.cover {
				width: 264rpx;
				height: 186rpx;
				border-radius: 8rpx;
			}
		}
		.bottom_content {
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.b_left {
				font-size: 26rpx;
				font-family: Inter-Semi Bold, Inter;
				font-weight: 600;
				color: #717171;
				line-height: 30rpx;
			}
			.icon {
				.iconfont {
					font-size: 40rpx;
					color: #cdcdcd;
				}
				/deep/ button {
					margin: 0;
					padding: 0;
					background-color: none;
					line-height: 38rpx;
					border: 0;
					outline: none;
					box-shadow: none;
					color: transparent;
					&:after {
						display: none;
					}
				}
			}
		}
	}
}
</style>
