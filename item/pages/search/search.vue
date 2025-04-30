<template>
	<view class="container">
		<u-navbar title=" " :autoBack="true" bgColor="#fff" :placeholder="true">
			<view class="u-nav-slot" slot="center">
				<u-search
					v-model="keyword"
					:clearabled="true"
					:showAction="false"
					height="30"
					bgColor="#F4F4F4"
					margin="8rpx"
					@clear="clearSearch"
					@change="changeSearch"
					@search="search_enter"
				></u-search>
			</view>
		</u-navbar>
		<u-transition :show="true">
			<view class="search_content">
				<view class="top_content animate_fade" v-if="list.length == 0 && not_search == false">
					<view class="commont_content" v-if="search_history.length > 0">
						<view class="head">
							<view class="h_title">历史搜索</view>
							<i class="iconfont icon-shanchu" @click="popup_show = true"></i>
						</view>
						<view class="list">
							<block v-for="(item, index) in search_history" :key="index">
								<view class="item animate_fade box-shadow" @click="click_history_search(item.keyword)">{{ item.keyword }}</view>
							</block>
						</view>
					</view>
					<view class="commont_content" v-if="hot_search.length > 0">
						<view class="head">
							<view class="h_title">热门标签</view>
						</view>
						<view class="list">
							<block v-for="(item, index) in hot_search" :key="index">
								<view class="item animate_fade box-shadow" @click="click_hot_search(item.name)">{{ item.name }}</view>
							</block>
						</view>
					</view>
				</view>
				<!-- 搜索预览列表 -->
				<view class="search_preview" v-else>
					<u-transition :show="true">
						<view class="item box-shadow animate_fade" v-for="(item, index) in list" :key="index" @click="open_details(item)">
							<view class="cover_box">
								<image class="cover" :src="item.image" mode="scaleToFill" :lazy-load="true"></image>
							</view>
							<view class="content">
								<view class="title over2">{{ item.title }}</view>
								<view class="desc">
									<text class="text over1">{{ item.series || item.time }}</text>
									<text class="statuc">{{ item.text }}</text>
								</view>
							</view>
						</view>
					</u-transition>
				</view>
				<!-- 没有查询到 -->
				<view class="service" v-if="not_search && keyword != ''">
					<SERVICE_EMPTY :keyword="keyword"></SERVICE_EMPTY>
				</view>
				<!-- 加载提示 -->
				<view class="loadmore_box">
					<u-loadmore :status="loading" loadingText="正在加载..." loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
				</view>
			</view>
		</u-transition>

		<u-modal
			class="popup"
			:show="popup_show"
			title="预约到店"
			confirmText="确定"
			confirmColor="#0A2B4E"
			cancelColor="#363636"
			showCancelButton
			:closeOnClickOverlay="true"
			:asyncClose="true"
			width="578rpx"
			@confirm="popup_confirm"
			@cancel="popup_cancel"
		>
			<view class="popup_content">
				<view class="content">是否确定清除历史记录？</view>
			</view>
		</u-modal>
		<!-- 登录模态框 -->
		<LOGINMODAL :show="login_modal" @loginModalCancel="loginModalCancel"></LOGINMODAL>
	</view>
</template>

<script>
import SERVICE_EMPTY from '@/components/service_empty.vue';
export default {
	components: {
		SERVICE_EMPTY
	},
	data() {
		return {
			page: 1, // 页面
			size: 5, // 页面条数
			keyword: '', // 搜素关键字
			count: 0, // 总条数
			search_history: [], // 搜索历史
			hot_search: [], // 热门搜索
			popup_show: false, // 删除历史记录
			login_modal: false, // 登录模态框
			list: [], // 搜索列表
			phone_list: [], // 客服
			not_search: false, // 没有搜索到内容
			loading: 'loadmore' // 加载前值为loadmore，加载中为loading，没有数据为nomore
		};
	},
	onShow() {
		this.get_data();
	},
	// 触底
	onReachBottom() {
		this.search_all_list(true);
	},
	methods: {
		// 搜索输入框回调
		changeSearch(e) {
			this.keyword = e;
		},
		// 搜索输入框清空
		clearSearch() {
			this.keyword = '';
			this.not_search = false;
			this.list = [];
		},
		// 历史搜索
		click_history_search(key) {
			this.keyword = key;
			this.search_all_list();
		},
		// 热门
		click_hot_search(key) {
			this.keyword = key;
			this.search_all_list();
		},
		// 搜索回车
		search_enter() {
			this.search_all_list();
		},
		// 列表接口
		async search_all_list(loadmore = false) {
			const keyword = this.keyword;
			if (!keyword) {
				uni.showToast({
					title: '请输入搜索关键词',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.loading = 'loading';
			const page = this.page;
			const size = this.size;
			const params = {
				page,
				size,
				keyword,
			};
			const is_userid = false;
			if (loadmore) {
				params.page += 1;
				this.page = params.page;
			} else {
				this.list = [];
			}
			// 产品列表
			const product_list = await this.$request.post('/product/getList', params, is_userid);
			const list1 = product_list.lists.map((item) => {
				return {
					id: item.id,
					title: item.title,
					series: item.serie_name,
					text: '产品',
					image: item.image,
					statuc: 1
				};
			});
			// 案例馆列表
			const case_list = await this.$request.post('/example/getList', params, is_userid);
			const list2 = case_list.lists.map((item) => {
				return {
					id: item.id,
					title: item.title,
					series: item.serie_name,
					text: '案例',
					image: item.image,
					statuc: 2
				};
			});
			// 新品推荐列表
			const new_list = await this.$request.post('/new_product/getList', params, is_userid);
			const list3 = new_list.lists.map((item) => {
				return {
					id: item.id,
					title: item.title,
					series: item.serie_name,
					text: '新品',
					image: item.image,
					statuc: 3
				};
			});
			// 品牌动态列表
			const brand_list = await this.$request.post('/article/getList', params, is_userid);
			const list4 = brand_list.lists.map((item) => {
				return {
					id: item.id,
					title: item.title,
					time: item.publish_date,
					text: '品牌',
					image: item.image,
					statuc: 4
				};
			});
			const list = [...this.list, ...list1, ...list2, ...list3, ...list4];
			if (list.length == 0) {
				this.list = [];
				this.not_search = true;
			} else {
				this.count = product_list.count + case_list.count + new_list.count + brand_list.count;
				this.list = list;
			}
			this.loading = 'loadmore';
		},
		// 获取历史记录
		async get_data() {
			const res = await this.$request.post('/common/getOpts');
			this.search_history = res.search_history;
			this.hot_search = res.hot_search;
		},
		// 删除历史记录
		async delete_history() {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			const res = await this.$request.post2('/product/clearSearchHistory');
			if (res.code == 1) {
				await this.get_data();
			} else {
				uni.showToast({
					title: '删除失败，服务器发生错误！',
					duration: 2000,
					icon: 'none',
					mask: true
				});
			}
			this.popup_show = false;
		},
		// 删除历史记录 取消
		popup_cancel() {
			this.popup_show = false;
		},
		// 删除历史记录 确认
		popup_confirm() {
			this.delete_history();
		},
		// 关闭登录模态框
		loginModalCancel() {
			this.loginModalCancel = false;
		},
		// 跳转详情
		open_details(item) {
			if (item.statuc == 1) {
				uni.navigateTo({
					url: `/pages/product/product_details?id=${item.id}`
				});
			} else if (item.statuc == 2) {
				uni.navigateTo({
					url: `/pages/case/details?id=${item.id}`
				});
			} else if (item.statuc == 3) {
				uni.navigateTo({
					url: `/pages/product/product_details?id=${item.id}&recomment=${true}`
				});
			} else {
				uni.navigateTo({
					url: `/pages/brand/details?id=${item.id}`
				});
			}
		}
	}
};
</script>
<style>
page {
	/* background: #f8f8f8; */
}
.popup_content .content {
	font-size: 30rpx;
	font-weight: 500;
	color: #8c8c8c;
	line-height: 43rpx;
	text-align: center;
}
</style>

<style lang="less" scoped>
.service {
	padding-top: 100rpx;
}
.container {
	padding-bottom: 0;
}
.u-nav-slot {
	width: 460rpx;
	margin-right: 120rpx;
}

.search_content {
	padding: 20rpx;
	.commont_content {
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.h_title {
				font-size: 28rpx;
				font-weight: 600;
				color: #313131;
				line-height: 44rpx;
			}
			.iconfont {
				font-size: 30rpx;
				padding: 0 0 20rpx 30rpx;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;
			.item {
				font-size: 24rpx;
				font-weight: 500;
				color: #888888;
				line-height: 36rpx;
				padding: 8rpx 34rpx;
				background: #fff;
				border-radius: 22rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}
}
.search_preview {
	.item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		background: #fff;
		margin-bottom: 20rpx;
		border-radius: 8rpx;
		.cover_box {
			width: 140rpx;
			border-radius: 8rpx;
			overflow: hidden;
			.cover {
				height: 120rpx;
			}
		}
		.content {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 20rpx;
			.title {
				font-size: 28rpx;
				line-height: 42rpx;
				font-weight: 500;
				color: #313131;
			}
			.desc {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.text {
					font-size: 26rpx;
					font-weight: 400;
					color: #888888;
					line-height: 30rpx;
				}
				.statuc {
					font-weight: 500;
					flex: none;
					border-radius: 6rpx;
					padding: 6rpx 26rpx;
					background: #ffff;
					box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
					margin-left: 20rpx;
					font-size: 12px;
					color: #717171;
				}
			}
		}
	}
	.item:last-child {
		margin-bottom: 0;
	}
	.loadmore_box {
		padding: 10rpx 0 20rpx;
	}
}

.not_find {
	padding-top: 100rpx;
	text-align: center;
	.name {
		font-size: 26rpx;
		line-height: 36rpx;
		color: #333;
	}

	.desc {
		padding: 10rpx 0;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #9f9f9f;
	}

	.bottom {
		padding: 50rpx 0;
		display: flex;
		justify-content: space-between;
		.btn {
			width: 48%;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			border: 1px solid #ddd;
			color: #333;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: none;
			border-radius: 0;
			outline: none;
			&:after {
				display: none;
			}
			.iconfont {
				color: #333;
				margin-right: 10rpx;
			}
		}
	}
}
</style>
