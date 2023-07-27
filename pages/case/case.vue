<!-- 案例馆 -->
<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<!-- 导航栏 -->
		<view class="navbar_content">
			<u-navbar title="案例馆" bgColor="#fff" placeholder :titleStyle="navbarStyle" @leftClick="open_search">
				<view class="u-nav-slot" slot="left">
					<i class="iconfont icon-icon-searth"></i>
				</view>
			</u-navbar>
		</view>
		<!-- 二级导航栏 -->
		<view
			:style="osName == 'android' ? 'top:' + (statusBarHeight + Number(44)) + 'px;' : ''"
			:class="['nav_tabs_content', osName == 'windows' ? 'pc_top' : '', osName == 'windows' ? 'window_nav_rabs_content' : '', osName == 'macos' ? 'macos_top' : '']"
		>
			<view class="left_nav">
				<view class="item" :class="[nav_up_index == 0 ? 'active' : '']" @click="clickItem(0)">
					<text class="text">空间</text>
					<i class="iconfont icon-xiala3"></i>
				</view>
				<view class="item" :class="[nav_up_index == 1 ? 'active' : '']" @click="clickItem(1)">
					<text class="text">风格</text>
					<i class="iconfont icon-xiala3"></i>
				</view>
				<view class="item" :class="[nav_up_index == 2 ? 'active' : '']" @click="clickItem(2)">
					<text class="text">色彩</text>
					<i class="iconfont icon-xiala3"></i>
				</view>
			</view>
			<view class="sort" :class="{ active: sort_show }" @click="open_sort">
				<text class="text">排序</text>
				<i class="iconfont icon-paixu"></i>
			</view>
		</view>
		<!-- 规格列表 -->
		<view
			:class="['nav_up_popup', 'animate_fade', osName == 'windows' ? 'pc_sort_top' : '', osName == 'macos' ? 'macos_nav_up_popup' : '']"
			:style="osName == 'android' ? 'top:' + (statusBarHeight + Number(88)) + 'px;' : ''"
			v-if="nav_up"
		>
			<view class="nav_up_content">
				<view class="list">
					<view class="item_content" v-if="nav_up_index == 0">
						<view class="item" :class="index == nav_up_item_index ? 'active' : ''" v-for="(item, index) in space" :key="index" @click="up_item(index)">
							{{ item.text }}
						</view>
					</view>
					<view class="item_content" v-if="nav_up_index == 1">
						<view class="item" :class="index == nav_up_item_index ? 'active' : ''" v-for="(item, index) in style" :key="index" @click="up_item(index)">
							{{ item.text }} {{ index }}
						</view>
					</view>
					<view class="item_content" v-if="nav_up_index == 2">
						<view class="item" :class="index == nav_up_item_index ? 'active' : ''" v-for="(item, index) in color" :key="index" @click="up_item(index)">
							{{ item.text }}
						</view>
					</view>
				</view>
				<view class="btn_content box-shadow">
					<view class="btn reset" @click="up_reset">重置</view>
					<view class="btn confirm active" @click="up_confirm">确定</view>
				</view>
			</view>
			<view class="bg" @click="up_bg"></view>
		</view>
		<!-- 排序弹窗 -->
		<view
			:class="['sort_fixed', osName == 'windows' ? 'pc_sort_top' : '', osName == 'macos' ? 'macos_nav_up_popup' : '']"
			:style="osName == 'android' ? 'top:' + (statusBarHeight + Number(88)) + 'px;' : ''"
			v-if="sort_show"
		>
			<view class="sort_bg" @click="sort_close"></view>
			<view class="sort_content">
				<view class="sort_list animate_fade box-shadow border-radius">
					<view class="item" :class="[sort_index == 0 ? 'active' : '']" @click="sort_item(0)">浏览量</view>
					<view class="item" :class="[sort_index == 1 ? 'active' : '']" @click="sort_item(1)">按喜欢数</view>
				</view>
			</view>
		</view>
		<!-- 瀑布流列表 -->
		<LIST class="list" :list="list"></LIST>
		<!-- 加载提示 -->
		<view class="loadmore_box">
			<u-loadmore :status="list_loading" loadingText=" " loadmoreText=" " color="#b7b7b7" fontSize="12" iconSize="16" />
		</view>
		<!-- 返回顶部 -->
		<TOPICON :topShow="topShow" :right_num="true"></TOPICON>
		<!-- 底部栏 -->
		<TABBAR :tabbar_bg="true" :tabs_index="2"></TABBAR>
	</view>
</template>

<script>
import LIST from './list.vue';
export default {
	components: { LIST },
	data() {
		return {
			loading: true,
			topShow: false, // 返回顶部
			scroll_number: 0, // 页面滚动距离
			osName: '',
			statusBarHeight: 0,
			scroll_number: 0,
			navbarStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			color: [
				{
					text: '白色系'
				},
				{
					text: '灰色系'
				},
				{
					text: '黑色系'
				},
				{
					text: '米色系'
				},
				{
					text: '棕色系'
				},
				{
					text: '蓝色系'
				},
				{
					text: '绿色系'
				},
				{
					text: '红色系'
				},
				{
					text: '金色系'
				}
			],
			style: [
				{
					text: '风格'
				},
				{
					text: '风格'
				},
				{
					text: '风格'
				},
				{
					text: '风格'
				},
				{
					text: '风格'
				},
				{
					text: '风格'
				}
			],
			space: [
				{
					text: '玄关'
				},
				{
					text: '客厅'
				},
				{
					text: '餐厅'
				},
				{
					text: '厨房'
				},
				{
					text: '阳台'
				},
				{
					text: '走廊'
				},
				{
					text: '卧室'
				},
				{
					text: '儿童房'
				},
				{
					text: '浴室'
				},
				{
					text: '楼梯间'
				},
				{
					text: '背景墙'
				},
				{
					text: '前厅'
				},
				{
					text: '卫生间'
				},
				{
					text: '衣帽间'
				},
				{
					text: '其他'
				},
				{
					text: '样板间'
				},
				{
					text: '大堂'
				},
				{
					text: '厅'
				},
				{
					text: '客餐厅'
				},
				{
					text: '三楼卫'
				},
				{
					text: '一楼客厅'
				},
				{
					text: '二楼客厅'
				},
				{
					text: '二楼3个卫生间'
				}
			],
			nav_up: false, // 规格淡显
			nav_up_index: -1, // 规格切换下标
			nav_up_item_index: -1, // 规格item下标
			sort_show: false, // 排序淡显
			sort_index: -1, // 排序下标
			list: [], // 列表数据
			list_loading: 'loadmore' // 加载前值为loadmore，加载中为loading，没有数据为nomore
		};
	},
	async onLoad() {
		// 获取设备型号
		this.osName = getApp().globalData.osName;
		// 获取设备状态栏高度
		this.statusBarHeight = Number(getApp().globalData.statusBarHeight);
		await this.get_list();
		this.loading = false;
	},
	onReachBottom() {
		this.get_list();
	},
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 800 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 800 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		async get_list() {
			this.list_loading = 'loading';
			if (this.list.length >= 100) return (this.list_loading = 'nomore');
			const { data } = await this.list_data();
			this.list = [...this.list, ...data];
			console.log('list', this.list);
			this.list_loading = 'loadmore';
		},
		open_search() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		// 规格切换
		clickItem(i) {
			// 关闭排序弹窗
			this.sort_index = -1;
			this.sort_show = false;

			if (i == this.nav_up_index) {
				/* console.log('rep'); */
				this.nav_up = false;
				this.nav_up_index = -1;
			} else {
				// 规格参数
				this.nav_up_index = i;
				this.nav_up_item_index = -1;
				this.nav_up = true;
			}
		},
		// 规格item
		up_item(index) {
			this.nav_up_item_index = index;
		},
		// 规格重置
		up_reset() {
			this.nav_up_item_index = -1;
		},
		// 规格背景
		up_bg() {
			this.nav_up = false;
			this.nav_up_index = -1;
			this.nav_up_item_index = -1;
		},
		// 规格确认
		up_confirm() {
			this.nav_up = false;
			this.nav_up_index = -1;
			this.nav_up_item_index = -1;
		},
		// 排序淡显
		open_sort() {
			// 关闭规格弹窗
			this.nav_up = false;
			this.nav_up_index = -1;
			this.nav_up_item_index = -1;

			if (this.sort_show) {
				this.sort_show = false;
			} else {
				this.sort_show = true;
			}
		},
		sort_item(i) {
			this.sort_index = i;
		},
		// 排序
		sort_close() {
			this.sort_index = -1;
			this.sort_show = false;
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
				const title_list = ['新中式｜传统与现代的', '轻奢｜既厚重华丽又具', '奶油风｜清浅氛国书写', '佗寂风｜自然 本真 极简'];

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
.container {
	padding: 44px 0 64px;
	.nav_tabs_content {
		position: fixed;
		top: 88px;
		left: 0;
		width: 100%;
		height: 44px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
		z-index: 10;
		.left_nav {
			display: flex;
			.item {
				text-align: center;
				width: 168rpx;
				height: 48rpx;
				line-height: 48rpx;
				background: #f1f1f1;
				border-radius: 28rpx;
				margin-right: 26rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #7c7c7c;
				display: flex;
				justify-content: center;
				align-items: center;
				&:last-child {
					margin-right: 0;
				}
				.iconfont {
					display: inline-block;
				}
			}
			.active {
				background: #0a2b4e;
				color: #fff;
				.iconfont {
					transform: rotate(-180deg);
				}
			}
		}
		.sort {
			flex: none;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #7c7c7c;
			border-radius: 36rpx;
			width: 128rpx;
			height: 48rpx;
			margin-left: 26rpx;
		}
		.active {
			background: #0a2b4e;
			color: #fff;
		}
	}

	.window_nav_rabs_content {
		padding-top: 6rpx;
	}

	.nav_tabs_bg {
		background: rgba(255, 255, 255, 0.8);
	}
	.nav_up_popup {
		position: fixed;
		top: 132px;
		left: 0;
		width: 100%;
		height: calc(100vh - 132px);
		display: flex;
		flex-direction: column;
		
		.nav_up_content {
			background: #fff;
			height: 500rpx;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			overflow: hidden;
			.list {
				.item_content {
					height: 400rpx;
					overflow-y: scroll;
					padding: 20rpx;
					.item {
						display: inline-block;
						width: 31%;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						text-align: center;
						height: 56rpx;
						line-height: 56rpx;
						border-radius: 8rpx;
						background: #f1f1f1;
						color: #313131;
						font-size: 24rpx;
					}
					.item:nth-child(3n + 3) {
						margin-right: 0;
					}
					.active {
						background: #0a2b4e;
						color: #fff;
					}
				}
			}
			.btn_content {
				padding: 20rpx;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn {
					width: 47%;
					height: 68rpx;
					line-height: 68rpx;
					text-align: center;
					border: 1px solid #313131;
					border-radius: 46rpx;
					font-size: 26rpx;
				}
				.active {
					color: #fff;
					border: 1px solid #0a2b4e;
					background: #0a2b4e;
				}
			}
		}
		.bg {
			flex: 1;
			background: rgba(0, 0, 0, 0.3);
		}
	}

	.sort_fixed {
		position: fixed;
		top: 132px;
		left: 0;
		width: 100%;
		height: calc(100vh - 132px);
		.sort_content {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 204rpx;
			z-index: 2;
			.sort_list {
				background: #fff;
			}
			.item {
				font-size: 28rpx;
				font-weight: 400;
				color: #464646;
				padding: 20rpx;
				text-align: center;
			}
			.active {
				color: #fca163;
			}
		}
		.sort_bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
		}
	}

	.pc_top {
		top: 64px;
	}

	.pc_sort_top {
		top: 108px;
	}

	.macos_top {
		top: 64px;
	}
	.macos_nav_up_popup {
		top: 108px;
	}
}
</style>
