<!-- 品牌列表 -->
<template>
	<view class="container">
		<view class="brand_list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="top_content" @click="open_brand_details">
					<view class="left_content">
						<view class="title over2">{{ item.title }}</view>
						<view class="desc over1">{{ item.desc }}</view>
						<view class="static">
							<view class="time">2019-08-12</view>
							<view class="right_static">
								<view class="rs_box">
									<i class="iconfont icon-kanguos"></i>
									<text class="text">{{ item.see }}</text>
								</view>
								<view class="rs_box">
									<i class="iconfont icon-yizan active" v-if="item.is_true"></i>
									<i class="iconfont icon-dianzan6" v-else></i>
									<text class="text">{{ item.collect }}</text>
								</view>
							</view>
						</view>
					</view>

					<image class="cover box-shadow" :src="item.image"></image>
				</view>
				<view class="bottom_content">
					<view class="b_left">#装修宝典</view>
					<view class="icon">
						<button class="share_btn" open-type="share" @click="open_share(item)">
							<i class="iconfont icon-zhuanfa"></i>
						</button>
					</view>
				</view>
			</view>
			<!-- 加载提示 -->
			<view class="loadmore_box">
				<u-loadmore :status="list_loading" loadingText=" " loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
			</view>
			<!-- 返回顶部 -->
			<TOPICON :topShow="topShow" :details="true" :right_num="true"></TOPICON>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			list: [], // 列表数据
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			share: {
				title: '',
				image: '',
				desc: ''
			}
		};
	},
	onLoad() {
		this.get_list();
	},
	onPullDownRefresh() {
		this.get_list();
	},
	onReachBottom() {
		this.get_list();
	},
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			desc: this.share.desc,
			imageUrl: this.share.image,
			path: '/pages/index/index?id=123'
		};
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 600 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 600 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		open_share(e) {
			console.log(e);
			this.share = e;
		},
		async get_list() {
			this.list_loading = 'loading';
			if (this.list.length >= 100) return (this.list_loading = 'nomore');
			const { data } = await this.list_data();
			this.list = [...this.list, ...data];
			console.log('list', this.list);
			this.list_loading = 'loadmore';
		},
		// 列表
		list_data() {
			return new Promise((resolve) => {
				// 图片
				const imgs = [
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover1.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover2.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover3.png',
					'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/case_cover4.png'
				];

				// 标题
				const title_list = [
					'户主故事｜她把法式轻奢装进家， 时尚博主骨子里的浪漫,',
					'轻奢｜既厚重华丽又具',
					'太太太难了!“羊了个羊” 在逃装 修人!',
					'@全体时髦人士，这场珠宝与家居 的艺术之旅，请即刻启程!'
				];

				// 查看
				const see = [1523, 876, 986, 27];

				// 收藏
				const collect = [56, 88, 89, 124];

				// 是否收藏
				const is_true = [true, false, false, true];

				const doFn = (i) => {
					const randomIndex = Math.floor(Math.random() * 4);
					return {
						allowEdit: i == 0,
						image: imgs[randomIndex],
						title: title_list[randomIndex],
						see: see[randomIndex],
						collect: collect[randomIndex],
						is_true: is_true[randomIndex],
						desc: '星寂之夜900*1800'
					};
				};

				// 模拟异步
				let list = [];
				// 20条数据
				setTimeout(() => {
					for (let i = 0; i < 20; i++) {
						list.push(doFn(i));
					}
					resolve({ data: list });
				}, 400);
			});
		},
		open_brand_details() {
			uni.navigateTo({
				url: '/pages/brand/brand_details'
			});
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
								padding: 0 12rpx;
							}
							.active {
								color: #fcc863;
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
