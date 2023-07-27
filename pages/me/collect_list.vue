<!-- 收藏列表 -->
<template>
	<view class="container">
		<view class="collect_list">
			<FIXEDNAVBAR :navbar_title="navbar_title"></FIXEDNAVBAR>
			<view :class="['tabs_content', osName == 'macos' ? 'tabs_content_macos' : '', osName == 'windows' ? 'tabs_content_windows' : '']" :style="osName == 'android' ?  'top:'+ (statusBarHeight + Number(44)) + 'px;': ''">
				<view class="tabs">
					<view class="item" @click="tabs_item(0)">
						<text class="text" :class="tabs_index == 0 ? 'active' : ''">产品收藏</text>
					</view>
					<i class="iconfont icon-shuxian1"></i>
					<view class="item" @click="tabs_item(1)">
						<text class="text" :class="tabs_index == 1 ? 'active' : ''">案例收藏</text>
					</view>
				</view>
			</view>
			<view class="list_content">
				<view class="list" v-if="tabs_index == 0">
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
				</view>

				<!-- 瀑布流列表 -->
				<LIST class="list" :list="list" v-else></LIST>

				<!-- 加载提示 -->
				<view class="loadmore_box">
					<u-loadmore :status="list_loading" loadingText=" " loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
				</view>
				
				<!-- 返回顶部 -->
				<TOPICON :topShow="topShow" :right_num="true"></TOPICON>
			</view>
		</view>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
import LIST from '@/pages/case/list.vue';
export default {
	components: { FIXEDNAVBAR, LIST },
	data() {
		return {
			osName: '', // 系统型号
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			statusBarHeight: 0, 
			navbar_title: '收藏',
			tabs_index: 0,
			list_loading: 'loadmore', // 加载前值为loadmore，加载中为loading，没有数据为nomore
			list: []
		};
	},
	onLoad(e) {
		// 获取设备型号
		this.osName = getApp().globalData.osName;
		// 获取设备状态栏高度
		this.statusBarHeight = Number(getApp().globalData.statusBarHeight);
		this.tabs_index = e.tabs_index;
		this.get_list();
	},
	onReachBottom() {
		this.get_list();
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 1000 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 1000 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		tabs_item(i) {
			this.tabs_index = i;
			this.list = [];
			this.get_list();
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
				const title_list = ['新中式｜传统与现代的', '丝帛羽白', '轻奢｜既厚重华丽又具', '奶油风｜清浅氛国书写', '佗寂风｜自然 本真 极简'];

				// 查看
				const see = [1523, 876, 986, 27, 36];

				// 收藏
				const collect = [56, 88, 89, 124, 76];

				// 是否收藏
				const is_true = [true, false, false, true, false];

				const get_data = (i) => {
					const randomIndex = Math.floor(Math.random() * 5);
					return {
						image: cover_list[randomIndex],
						title: title_list[randomIndex],
						see: see[randomIndex],
						collect: collect[randomIndex],
						is_true: is_true[randomIndex],
						desc: '星寂之夜900*1800'
					};
				};

				const list = [];

				setTimeout(() => {
					for (let i = 0; i < 20; i++) {
						list.push(get_data(i));
					}
					resolve({ data: list });
				}, 1300);
			});
		},
		open_product_details() {
			uni.navigateTo({
				url: '/pages/product/product_details'
			});
		}
	}
};
</script>

<style>
page {
	background: #fff !important; 
}
</style>
<style lang="less" scoped>
.collect_list {
	padding-top: 100rpx;
	.tabs_content {
		position: fixed;
		top: 88px;
		left: 0;
		width: 100%;
		height: 100rpx;
		z-index: 10;
		background: #fff;
		.tabs {
			border-radius: 16rpx;
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
				}
				.active {
					font-weight: 600;
					color: #0a2b4e;
					border-bottom: 1px solid #0a2b4e;
				}
			}
			.iconfont {
				color: #7c7c7c;
			}
		}
	}
	
	.tabs_content_macos {
		top: 64px;
	}
	
	.tabs_content_windows {
		top: 44px;
	}
	
	.list_content {
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
}
</style>
