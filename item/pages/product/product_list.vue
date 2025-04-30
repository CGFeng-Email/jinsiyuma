<template>
	<view class="container">
		<view class="product_list">
			<u-transition :show="true">
				<!-- banner -->
				<view class="banner cover_box">
					<image class="cover" :src="product_list_banner" mode="widthFix"></image>
				</view>
				<!-- 数据为空 -->
				<SERVICE_EMPTY v-if="empty && list.length == 0"></SERVICE_EMPTY>
				<!-- 列表 -->
				<view class="list" v-else>
					<view class="item" v-for="(item, index) in list" :key="index" @click="open_product_details(item.id)">
						<u-transition :show="true" mode="fade-up">
							<view class="head">
								<view class="left">
									<image class="icon" src="/static/img/product_list_icon.png" mode="widthFix"></image>
									<text class="title over2">{{ item.title }}</text>
									<image class="hot" src="/static/img/hot.png" mode="widthFix" v-if="item.is_hot"></image>
								</view>
							</view>
							<view class="desc">
								<!-- 颜色 -->
								<text class="text">{{ item.color_name }}</text>
								<text class="code" v-if="item.sn">编码：{{ item.sn }}</text>
							</view>
							<view class="item_content">
								<view class="item__content_left">
									<!-- 收藏 -->
									<view class="left_box" @click.stop="click_isCollect(index, item.id, item.is_collect)">
										<view class="icon">
											<i v-if="item.is_collect == 0" class="iconfont icon-shoucang2"></i>
											<i v-else class="iconfont icon-shoucang-yishoucang"></i>
										</view>
										<view class="text code">
											{{ item.collect_num }}
										</view>
									</view>
									<!-- 浏览量 -->
									<view class="left_box">
										<view class="icon">
											<i class="iconfont icon-kanguos"></i>
										</view>
										<view class="text">
											<u-count-to :endVal="item.view_actual" color="#CDCDCD" fontSize="12"></u-count-to>
										</view>
									</view>
								</view>
								<view class="cover_box border-radius">
									<image class="cover" :src="item.image" :lazy-load="true"></image>
								</view>
							</view>
						</u-transition>
					</view>
					<!-- 加载提示 -->
					<view class="loadmore_box">
						<u-loadmore :status="list_loading" loadingText="正在加载..." loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="12" />
					</view>
				</view>
				<!-- 联系我们 -->
				<CONTACTUS :topShow="topShow"></CONTACTUS>
				<!-- 返回顶部 -->
				<TOPICON :topShow="topShow"></TOPICON>
				<!-- 登录模态框 -->
				<LOGINMODAL :show="login_modal" @loginModalCancel="loginModalCancel"></LOGINMODAL>
			</u-transition>
		</view>
	</view>
</template>

<script>
import SERVICE_EMPTY from '@/components/service_empty.vue';
export default {
	components: { SERVICE_EMPTY },
	data() {
		return {
			product_list_banner: '', // banner
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			list: [],
			list_count: 0, // 总条数
			total_page_num: 0, // 总页数
			scroll_number: 0, // 页面滚动距离
			topShow: false, // 返回顶部
			login_modal: false, // 登录模态框
			params: {}, // 参数
			keyword: '', // 搜索关键词
			empty: false // 内容为空
		};
	},
	async onLoad(e) {
		console.log('e', e);
		this.params = JSON.parse(e.params);
		this.params.page = 1;
		await this.get_banner();
		await this.get_list();
	},
	onReachBottom() {
		this.get_list(true);
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
		async get_banner() {
			return new Promise((resolve, reject) => {
				try {
					const app = getApp();
					this.product_list_banner = app.globalData.product_list_banner;
					resolve();
				} catch (err) {
					reject('服务器发生错误');
				}
			});
		},
		async get_list(loadmore = false) {
			this.list_loading = 'loading';
			const params = this.params;
			const list_count = this.list_count;
			const total_page_num = this.total_page_num;
			if (loadmore) {
				params.page += 1;
				if(this.list.length >= list_count || params.page > list_count) return (this.list_loading = 'nomore');
				this.params.page = params.page;
			}
			let url = '/product/getList';
			if (params.recomment) {
				url = '/new_product/getList';
			}
			const res = await this.$request.post(url, params);
			console.log('产品列表', res);
			if (res.lists.length <= 0) {
				this.empty = true;
			}
			// 总条数, 向上取整
			this.list_count = Math.ceil(res.count);
			// 总页数, 向上取整
			this.total_page_num = Math.ceil(res.page_no);
			this.list = [...this.list, ...res.lists];
			if(this.list.length >= list_count || params.page > list_count) return (this.list_loading = 'nomore');
			this.list_loading = 'loadmore';
		},
		// 详情
		open_product_details(id) {
			uni.navigateTo({
				url: `/pages/product/product_details?id=${id}`
			});
		},
		// 是否收藏
		async click_isCollect(index, id, is_collect) {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			let collect = is_collect == 0 ? 1 : 0;
			const res = await this.$request.post('/product/setCollect', {
				id,
				type: collect
			});
			this.list[index].is_collect = collect;
			is_collect == 0 ? (this.list[index].collect_num += 1) : (this.list[index].collect_num -= 1);
		},
		// 登录模态框关闭
		loginModalCancel() {
			this.login_modal = false;
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
				.left {
					flex: 1;
					display: flex;
					.icon {
						margin-top: 8rpx;
						width: 12rpx;
						height: 26rpx;
						flex: none;
					}
					.hot {
						margin-top: 8rpx;
						margin-left: 6rpx;
						width: 32rpx;
						height: 32rpx;
						flex: none;
					}
					.title {
						font-size: 30rpx;
						font-weight: 600;
						color: #313131;
						padding-left: 10rpx;
					}
				}
			}
			.desc {
				font-size: 26rpx;
				line-height: 36rpx;
				font-weight: 400;
				color: #979797;
				padding: 10rpx 20rpx 30rpx 52rpx;
				display: flex;
				justify-content: space-between;
				.text {
					flex: 1;
				}
				.code {
					padding-left: 20rpx;
					flex: none;
				}
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
						.text {
							font-size: 24rpx;
							color: #cdcdcd;
						}
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
					overflow: hidden;
					background: #f8f8f8;
					.cover {
						height: 350rpx;
					}
				}
			}
		}
	}
}
</style>
