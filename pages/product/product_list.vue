<template>
	<view class="container">
		<view class="product_list">
			<view class="banner">
				<u--image :src="banner" width="100%" height="316px" mode="widthFix"></u--image>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index" @click="open_product_details">
					<view class="head">
						<view class="left">
							<image class="icon" src="/static/img/product_list_icon.png" mode="widthFix"></image>
							<text class="title">{{ item.title }}</text>
							<image class="hot" src="/static/img/hot.png" mode="widthFix"></image>
						</view>
						<view class="right">D654P</view>
					</view>
					<view class="desc">拉什莫尔</view>
					<view class="item_content">
						<view class="item__content_left">
							<view class="left_box">
								<view class="icon">
									<i v-if="item.is_true" class="iconfont icon-shoucang2"></i>
									<i v-else class="iconfont icon-shoucang-yishoucang"></i>
								</view>
								<view class="text">
									<u-count-to :endVal="item.collect" color="#CDCDCD" fontSize="12"></u-count-to>
								</view>
							</view>
							<view class="left_box">
								<view class="icon">
									<i class="iconfont icon-kanguos"></i>
								</view>
								<view class="text">
									<u-count-to :endVal="item.see" color="#CDCDCD" fontSize="12"></u-count-to>
								</view>
							</view>
						</view>
						<view class="cover_box border-radius">
							<u--image width="100%" height="100%" :src="item.image" mode="widthFix"></u--image>
						</view>
					</view>
				</view>

				<!-- 加载提示 -->
				<view class="loadmore_box">
					<u-loadmore :status="list_loading" loadingText=" " loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
				</view>
			</view>
			<!-- 联系我们 -->
			<CONTACTUS :topShow="topShow"></CONTACTUS>
			<!-- 返回顶部 -->
			<TOPICON :topShow="topShow"></TOPICON>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_list_banner.png',
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			list: [],
			scroll_number: 0, // 页面滚动距离
			topShow: false, // 返回顶部
		};
	},
	onLoad() {
		this.get_list();
	},
	onReachBottom() {
		this.get_list();
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 1200 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 1200 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		open_product_details() {
			uni.navigateTo({
				url: '/pages/product/product_details'
			});
		},
		async get_list() {
			if (this.list.length >= 100) return (this.list_loading = 'nomore');
			this.list_loading = 'loading';
			const { data } = await this.data_list();
			this.list = [...this.list, ...data];
			console.log('list', this.list);
			this.list_loading = 'loadmore';
		},
		data_list() {
			return new Promise((resolve) => {
				const cover_list = [
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_list_cover.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover2.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover3.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover4.png'
				];

				// 标题
				const title_list = ['新中式｜传统与现代的', '轻奢｜既厚重华丽又具', '奶油风｜清浅氛国书写', '佗寂风｜自然 本真 极简'];

				// 查看
				const see = [1523, 876, 986, 27];

				// 收藏
				const collect = [56, 88, 89, 124];

				// 是否收藏
				const is_true = [true, false, false, true];

				const get_data = (i) => {
					const randomIndex = Math.floor(Math.random() * 5);
					return {
						image: cover_list[randomIndex],
						title: title_list[randomIndex],
						see: see[randomIndex],
						collect: collect[randomIndex],
						is_true: is_true[randomIndex]
					};
				};

				const list = [];

				setTimeout(() => {
					for (let i = 0; i < 20; i++) {
						list.push(get_data(i));
					}
					resolve({ data: list });
				}, 200);
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
.product_list {
	.banner {
		height: 316rpx;
	}
	.list {
		.item {
			background: #fff;
			margin-bottom: 10rpx;
			&:last-child {
				margin-bottom: 0;
			}
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
				padding-right: 20rpx;
				.item__content_left {
					width: 122rpx;
					display: flex;
					height: 100%;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-left: 52rpx;
					flex: none;
					.left_box {
						text-align: center;
						padding-right: 28rpx;
						padding-bottom: 20rpx;
					}
					.icon {
						.iconfont {
							font-size: 36rpx;
							color: #cdcdcd;
						}
						.icon-shoucang-yishoucang {
							color: #fcc863;
						}
					}
					.text {
						padding-bottom: 20rpx;
					}
				}
				.cover_box {
					flex: 1;
					height: 350rpx;
					overflow: hidden;
					background: #f8f8f8;
				}
			}
		}
	}
}
</style>
