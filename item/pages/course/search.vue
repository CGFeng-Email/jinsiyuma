<!-- 云课堂搜索 -->
<template>
	<view class="search">
		<u-sticky class="sticky" bgColor="#fff" offsetTop="0">
			<!-- 搜索 -->
			<view class="search_box">
				<u-search
					placeholder="请输入您需要的课程，如：品牌介绍"
					v-model="keyword"
					:focus="true"
					clearabled
					height="44"
					bgColor="#F5F5F5"
					placeholderColor="#AFAFAF"
					shape="square"
					:actionStyle="actionStyle"
					actionText="找课"
					@change="search_change"
					@search="search_enter"
					@custom="search_btn"
					@clear="search_clear"
				></u-search>
			</view>
		</u-sticky>
		<u-transition :show="true" mode="slide-up" duration="600">
			<!-- 搜索列表 -->
			<view class="list">
				<view class="head" v-if="list.length > 0">{{ list.length }}个结果</view>
				<view class="item" v-for="(item, index) in list" :key="index" @click="open_details(item)">
					<view class="name">
						{{ item.name }}
					</view>
					<view class="type">
						<text class="text" v-if="item.type == 1">课程</text>
						<text class="text" v-else-if="item.type == 2">图文</text>
						<text class="text" v-else>活动</text>
						<i class="iconfont icon-right-1-copy"></i>
					</view>
				</view>
			</view>
			<!-- 还没搜索 -->
			<view class="empty" v-if="!keyword && list.length == 0">
				<u-empty :text="empty_text" marginTop="50" textSize="12" textColor="#9f9f9f" :icon="empty"></u-empty>
			</view>
			<!-- 没有查询到 -->
			<view class="not_find" v-if="not_search && keyword != ''">
				<view class="name">未搜索到有关{{ '"' + keyword + '"' }}的内容</view>
				<view class="desc">请尝试搜索其他关键词</view>
				<view class="bottom">
					<button class="btn" open-type="contact" send-message-title="金丝玉玛" show-message-card>
						<i class="iconfont icon-zaixiankefucustomerservice"></i>
						<text class="text">在线客服</text>
					</button>
					<view class="btn" @click="click_dial">
						<i class="iconfont icon-24gl-phoneLoudspeaker"></i>
						<text class="text">电话客服</text>
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
			empty: '/static/img/empty/search.png',
			empty_text: '请输入搜索关键词',
			not_search: false, // 没有搜索到内容
			keyword: '',
			list: [],
			// 搜索右侧样式
			actionStyle: {
				background: '#0a2b4e',
				color: '#fff',
				fontSize: '14px',
				height: '44px',
				paddingLeft: '26rpx',
				paddingRight: '26rpx',
				borderRadius: '4px',
				lineHeight: '44px'
			},
			phone_list: []
		};
	},
	onLoad() {
		this.get_service_mobile();
	},
	methods: {
		// 获取客服手机号
		get_service_mobile() {
			const { service_mobile } = getApp().globalData;
			this.phone_list[0] = service_mobile;
		},
		// 搜索内容发生变化触发
		search_change(e) {
			this.keyword = e;
		},
		// 搜索键盘按回车
		search_enter() {
			this.get_list();
		},
		// 搜索右侧控件
		search_btn() {
			this.get_list();
		},
		// 清空
		search_clear() {
			this.not_search = false;
		},
		// 跳转详情
		open_details(item) {
			if (item.type == 1) {
				uni.navigateTo({
					url: `/pages/course/knowledge/video_details?id=${item.id}`
				});
			} else if (item.type == 2) {
				uni.navigateTo({
					url: `/pages/course/activity/details?id=${item.id}`
				});
			} else {
				uni.navigateTo({
					url: `/pages/course/activity/details?id=${item.id}`
				});
			}
		},
		// 获取搜索列表
		async get_list() {
			const keyword = this.keyword;
			if (!keyword) {
				uni.showToast({
					title: '搜索内容不能为空',
					icon: 'none',
					duration: 2000
				});
			}
			uni.showLoading({
				title: '搜索中',
				mask: true
			});

			const res = await this.$request.get2('/api/courseInfo/search', {
				keyword
			});
			console.log('搜索', res);
			if (res.data.length == 0) {
				this.not_search = true;
				this.list = [];
			} else {
				this.list = res.data;
			}
			uni.hideLoading();
		},
		// 拨打电话
		click_dial() {
			uni.showActionSheet({
				itemList: this.phone_list,
				success: (res) => {
					console.log('success', res);
					if (!res.cancel && res.tapIndex !== undefined) {
						uni.makePhoneCall({
							phoneNumber: this.phone_list[res.tapIndex],
							success: function () {
								console.log('拨打电话成功');
							},
							fail: function () {
								uni.showToast({
									title: '拨打电话失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				},
				fail: (err) => {
					console.log('err', err);
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.search {
	padding: 0 30rpx;
}
.search_box {
	padding: 30rpx 0;
	background: #fff;
}

.list {
	padding-bottom: 40rpx;
	.head {
		text-align: right;
		padding-bottom: 20rpx;
		font-size: 26rpx;
		color: #333;
		border-bottom: 1px solid #f8f8f8;
		letter-spacing: 1px;
	}
	.item {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		.name {
			flex: 1;
			font-size: 24rpx;
			line-height: 34rpx;
			color: #000;
			padding-right: 30rpx;
		}
		.type {
			flex: none;
			display: flex;
			.text {
				font-size: 24rpx;
				padding-right: 6rpx;
				color: #9f9f9f;
			}
			.iconfont {
				font-size: 24rpx;
				color: #9f9f9f;
			}
		}
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
