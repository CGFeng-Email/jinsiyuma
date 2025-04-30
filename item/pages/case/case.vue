<!-- 案例馆 -->
<template>
	<view class="container">
		<!-- 导航栏 -->
		<view class="navbar_content">
			<u-navbar title="案例馆" bgColor="#fff" placeholder :titleStyle="navbarStyle" @leftClick="open_search">
				<view class="u-nav-slot" slot="left">
					<i class="iconfont icon-sousuo"></i>
					<text class="text">搜索</text>
				</view>
			</u-navbar>
		</view>
		<view class="nav_tabs_content" :style="'top:' + topIconDistance + 'px;'">
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
		<view class="nav_up_popup animate_fade" v-if="nav_up" :style="'top:' + (topIconDistance + 44) + 'px;'">
			<view class="nav_up_content">
				<view class="list">
					<!-- 空间 -->
					<view class="item_content" v-if="nav_up_index == 0">
						<view class="item" :class="index == room_item_index ? 'active' : ''" v-for="(item, index) in room_select" :key="index" @click="room_item(index)">
							{{ item.name }}
						</view>
					</view>
					<!-- 风格 -->
					<view class="item_content" v-if="nav_up_index == 1">
						<view class="item" :class="index == style_item_index ? 'active' : ''" v-for="(item, index) in style_select" :key="index" @click="style_item(index)">
							{{ item.name }}
						</view>
					</view>
					<!-- 颜色 -->
					<view class="item_content" v-if="nav_up_index == 2">
						<view class="item" :class="index == color_item_index ? 'active' : ''" v-for="(item, index) in color_select" :key="index" @click="color_item(index)">
							{{ item.name }}
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
		<view class="sort_fixed" v-if="sort_show" :style="'top:' + (topIconDistance + 44) + 'px;'">
			<view class="sort_bg" @click="sort_close"></view>
			<view class="sort_content">
				<view class="sort_list animate_fade box-shadow border-radius">
					<view class="item" :class="[sort_index == 0 ? 'active' : '']" @click="sort_item(0)">浏览量</view>
					<view class="item" :class="[sort_index == 1 ? 'active' : '']" @click="sort_item(1)">按喜欢数</view>
				</view>
			</view>
		</view>
		<!-- 瀑布流列表 -->
		<LIST class="list" :list="list" @showLoginModal="showLoginModal" ref="listref"></LIST>
		<!-- 空数据 -->
		<SERVICE_EMPTY v-if="empty && list.length == 0"></SERVICE_EMPTY>
		<!-- 加载提示 -->
		<view class="loadmore_box">
			<u-loadmore :status="list_loading" loadmoreText=" " nomoreText=" " fontSize="12" iconSize="14" />
		</view>
		<!-- 登录模态框 -->
		<LOGINMODAL :show="login_modal" @loginModalCancel="loginModalCancel"></LOGINMODAL>
		<!-- 返回顶部 -->
		<TOPICON :topShow="topShow" :right_num="true"></TOPICON>
		<!-- 底部栏 -->
		<TABBAR :tabbar_bg="true" :tabs_index="2"></TABBAR>
	</view>
</template>

<script>
import LIST from './list.vue';
import SERVICE_EMPTY from '@/components/service_empty.vue';
export default {
	components: { LIST, SERVICE_EMPTY },
	data() {
		return {
			// loading: true, // 页面加载
			topShow: false, // 返回顶部
			login_modal: false, // 登录模态框
			scroll_number: 0, // 页面滚动距离
			osName: '', //  设备型号
			statusBarHeight: 0, // 状态栏高度
			topIconDistance: 0, // 距离顶部距离
			scroll_number: 0, // 页面滚动距离
			navbarStyle: {
				// 导航栏样式
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			room_select: [], // 空间参数
			style_select: [], // 风格参数
			color_select: [], // 颜色参数
			nav_up: false, // 规格淡显
			nav_up_index: -1, // 规格切换下标
			room_item_index: -1, // 空间item下标
			style_item_index: -1, // 空间item下标
			color_item_index: -1, // 空间item下标
			sort_show: false, // 排序淡显
			sort_index: 0, // 排序下标
			params: {
				keyword: '', // 关键字
				room_id: '', // 空间id
				style_id: '', // 风格id
				color_id: '', // 颜色id
				order_by: {
					// like_actual: 'desc', // 点赞量 asc为正序 desc为倒序
					view_actual: 'desc' // 浏览量 asc为正序 desc为倒序
				},
				page: 1, // 页码
				size: 10 // 每页显示的数量
			},
			list: [], // 列表数据
			count: 0, // 总条数
			list_empty: false, // 数组为0时清空数组
			empty: false, // 空内容
			list_loading: 'loadmore' // 加载前值为loadmore，加载中为loading，没有数据为nomore
		};
	},
	async onLoad(e) {
		uni.hideTabBar(); // 隐藏原生tabbar
		await this.getTopIconDistance();
		await this.get_select_params();
		await this.get_list();
	},
	// 触底
	onReachBottom() {
		this.get_list(true);
	},
	// 滑动距离
	onPageScroll(e) {
		this.scroll_number = Number(Math.floor(e.scrollTop));
		if (this.scroll_number > 800 && this.topShow == false) {
			this.topShow = true;
		} else if (this.scroll_number < 800 && this.topShow == true) {
			this.topShow = false;
		}
	},
	methods: {
		open_search() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		// 获取状态栏导航栏高度
		getTopIconDistance() {
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
		},
		// 规格切换
		clickItem(i) {
			// 关闭排序弹窗
			this.sort_show = false;

			if (i == this.nav_up_index) {
				this.nav_up_index = -1;
				this.nav_up = false;
			} else {
				// 规格参数
				this.nav_up_index = i;
				this.nav_up = true;
			}
		},
		// 空间item
		room_item(index) {
			this.room_item_index = index;
		},
		// 风格item
		style_item(index) {
			this.style_item_index = index;
		},
		// 颜色item
		color_item(index) {
			this.color_item_index = index;
		},
		// 规格重置
		async up_reset() {
			let params = this.params;
			params.page = 1;
			params.room_id = '';
			params.style_id = '';
			params.color_id = '';
			this.room_item_index = -1; // 空间item下标
			this.style_item_index = -1; // 空间item下标
			this.color_item_index = -1; // 空间item下标
			this.params = params;
			await this.up_bg();
			await this.get_list();
		},
		// 规格背景
		up_bg() {
			this.nav_up = false;
			this.nav_up_index = -1;
		},
		// 规格确认
		up_confirm() {
			// tabs
			const nav_up_index = this.nav_up_index;
			// item_index
			const room_item_index = this.room_item_index;
			const style_item_index = this.style_item_index;
			const color_item_index = this.color_item_index;
			// params
			const params = this.params;
			params.page = 1;
			if (room_item_index != -1) {
				params.room_id = this.room_select[room_item_index].value;
			}
			if (style_item_index != -1) {
				params.style_id = this.style_select[style_item_index].value;
			}
			if (color_item_index != -1) {
				params.color_id = this.color_select[color_item_index].value;
			}
			console.log('params', params);
			this.params = params;
			this.get_list();
			this.nav_up_index = -1;
			this.nav_up = false;
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
		// 排序 切换
		async sort_item(i) {
			this.sort_index = i;
			const sort_data = this.params;
			if (this.sort_index == 0) {
				// sort_data.order_by.like_actual = '';
				sort_data.order_by.view_actual = 'desc';
				delete sort_data.order_by.like_actual;
			} else {
				sort_data.order_by.like_actual = 'desc';
				// sort_data.order_by.view_actual = '';
				delete sort_data.order_by.view_actual;
			}
			sort_data.page = 1;
			this.params = sort_data;
			this.sort_show = false;
			await this.get_list();
		},
		// 排序
		sort_close() {
			this.sort_show = false;
		},
		// 获取选项参数
		async get_select_params() {
			const res = await this.$request.post('/common/getOpts');
			console.log('获取选项参数', res);
			this.room_select = res.room_select;
			this.style_select = res.style_select;
			this.color_select = res.color_select;
		},
		// 列表
		async get_list(loadmore = false) {
			this.list_loading = 'loading';
			const params = this.params;
			if (loadmore) {
				params.page += 1;
				this.params = params;
				if (this.list.length == this.count) return (this.list_loading = 'nomore');
			}
			const res = await this.$request.post('/example/getList', params);
			console.log('案例馆', res);
			this.count = res.count;
			if (loadmore) {
				this.list = [...this.list, ...res.lists];
			} else {
				this.list = [];
				const del = await this.$refs.listref.clear();
				this.list = res.lists;
				if (res.lists.length == 0) {
					this.empty = true;
				}
			}
			this.list_loading = 'loadmore';
		},
		showLoginModal() {
			this.login_modal = true;
		},
		loginModalCancel() {
			this.login_modal = false;
		}
	}
};
</script>

<style>
page {
	background: #fff;
}
</style>
<style lang="less" scoped>
.container {
	padding: 44px 0 64px;
	.navbar_content {
		.u-nav-slot {
			border: 1px solid rgba(49, 49, 49, 0.3);
			border-radius: 24rpx;
			height: 58rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20rpx;
			.iconfont {
				font-size: 36rpx;
				color: #313131;
				padding-right: 6rpx;
			}

			.text {
				font-size: 28rpx;
				color: #313131;
			}
		}
	}
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
