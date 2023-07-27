<template>
	<!-- 规格列表 -->
	<view class="params_list">
		<!-- 尺寸 -->
		<view class="size_content params_item box-shadow">
			<view class="params_head">
				<image class="icon" src="/static/img/product/size.png" mode="widthFix"></image>
				<text class="title">规格</text>
				<text class="prop">SIZES</text>
			</view>
			<view class="item_content">
				<view class="size_select">
					<view :class="['s_item', size_tabs_index == index ? 'active' : '']" v-for="(item, index) in size_tabs" :key="index" @click="click_sizeTabs(index)">
						<text class="text">{{ item.name }}</text>
						<i class="iconfont icon-xiala2"></i>
					</view>
				</view>
				<view class="up_item">
					<block v-if="size_tabs_index == 0">
						<view
							:class="['u_text', 'animate_fade', size_item_index == index ? 'active' : '']"
							v-for="(item, index) in size_list1"
							:key="index"
							@click="click_sizeItem(index)"
						>
							{{ item }}
						</view>
					</block>
					<block v-if="size_tabs_index == 1">
						<view
							:class="['u_text', 'animate_fade', size_item_index == index ? 'active' : '']"
							v-for="(item, index) in size_list2"
							:key="index"
							@click="click_sizeItem(index)"
						>
							{{ item }}
						</view>
					</block>
					<block v-if="size_tabs_index == 2">
						<view
							:class="['u_text', 'animate_fade', size_item_index == index ? 'active' : '']"
							v-for="(item, index) in size_list3"
							:key="index"
							@click="click_sizeItem(index)"
						>
							{{ item }}
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- 系列 -->
		<view class="seriec_content params_item box-shadow">
			<view class="params_head">
				<image class="icon" src="/static/img/product/seriec.png" mode="widthFix"></image>
				<text class="title">系列</text>
				<text class="prop">SERIES</text>
			</view>
			<view class="seriec_select_content">
				<view :class="['item', 'animate_fade', select_index == index ? 'active' : '']" v-for="(item, index) in select_list" :key="index" @click="click_selectItem(index)">
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
		</view>
		<!-- 工艺 -->
		<view class="seriec_content params_item box-shadow">
			<view class="params_head">
				<image class="icon" src="/static/img/product/gy.png" mode="widthFix"></image>
				<text class="title">工艺</text>
				<text class="prop">CRAFT</text>
			</view>
			<view class="gy_content">
				<view :class="['item', 'animate_fade', gy_index == index ? 'active' : '']" v-for="(item, index) in gy_list" :key="index" @click="click_gyItem(index)">
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
		</view>
		<!-- 颜色 -->
		<view class="color_content params_item box-shadow">
			<view class="params_head">
				<image class="icon" src="/static/img/product/color.png" mode="widthFix"></image>
				<text class="title">颜色</text>
				<text class="prop">COLOR</text>
			</view>
			<view class="color_select">
				<view
					:class="['item', 'animate_fade', color_index == index ? 'active' : '']"
					v-for="(item, index) in color_list"
					:key="index"
					v-if="index < color_list.length - 1"
					@click="click_colorItem(index)"
				>
					<view :class="['color_box', 'c' + (index + 1)]"></view>
					<text class="text">{{ item.name }}</text>
				</view>
				<view class="item animate_fade" :class="color_index == color_list.length ? 'active' : ''" @click="click_colorItem(color_list.length)">
					<view class="more_content">
						<view class="color_box m_box c8"></view>
						<view class="color_box m_box c9"></view>
						<view class="color_box m_box c10"></view>
					</view>
					<text class="text">其他</text>
				</view>
			</view>
		</view>
		<!-- 空间 -->
		<view class="params_item box-shadow">
			<view class="params_head">
				<image class="icon" src="/static/img/product/room.png" mode="widthFix"></image>
				<text class="title">空间</text>
				<text class="prop">ROOM</text>
			</view>
			<view class="seriec_select_content">
				<view :class="['item', 'animate_fade', room_index == index ? 'active' : '']" v-for="(item, index) in room_list" :key="index" @click="click_roomItem(index)">
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
		</view>
		<view class="search_btn_content">
			<u-button throttleTime="300" @click="open_search">去搜索</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 尺寸tabs
			size_tabs: [{ name: '大规格' }, { name: '中规格' }, { name: '小规格' }],
			// 尺寸
			size_list1: [
				'120*1200',
				'900*2700',
				'1600*3200',
				'1200*2780',
				'1200*2650',
				'1200*2600',
				'900*2650',
				'1200*2400',
				'1000*3000',
				'900*1800',
				'750*1500',
				'300*1800',
				'1000*2000'
			],
			size_list2: [
				'120*1200',
				'1200*2650',
				'1200*2600',
				'900*2650',
				'1200*2400',
				'1000*3000',
				'900*1800',
				'900*2700',
				'1600*3200',
				'1200*2780',
				'750*1500',
				'300*1800',
				'1000*2000',
				'900*2700',
				'1600*3200',
				'1200*2780'
			],
			size_list3: [
				'1200*2600',
				'120*1200',
				'900*2650',
				'900*2700',
				'1600*3200',
				'1200*2400',
				'1000*3000',
				'900*1800',
				'750*1500',
				'300*1800',
				'1200*2650',
				'1200*2780',
				'1000*2000'
			],
			select_list: [
				{
					name: 'K金星空岩板'
				},
				{
					name: 'K金4.0'
				},
				{
					name: '贝拉时光'
				},
				{
					name: 'MK'
				},
				{
					name: '金丝玉玛岩板'
				},
				{
					name: '其他'
				}
			],
			gy_list: [
				{
					name: '星空发光干粒'
				},
				{
					name: '镀金'
				},
				{
					name: '闪光粉'
				},
				{
					name: '电光釉'
				},
				{
					name: '幻彩电光'
				},
				{
					name: '羊毛轮柔抛'
				},
				{
					name: '其他'
				}
			],
			color_list: [
				{
					name: '黑色'
				},
				{
					name: '白色'
				},
				{
					name: '灰色'
				},
				{
					name: '黄色'
				},
				{
					name: '米色'
				},
				{
					name: '褐色'
				},
				{
					name: '棕色'
				},
				{
					name: '其他'
				}
			],
			// 空间
			room_list: [
				{
					name: '客厅'
				},
				{
					name: '卧室'
				},
				{
					name: '卫生间'
				},
				{
					name: '厨房'
				},
				{
					name: '阳台'
				},
				{
					name: '商业空间'
				},
				{
					name: '棕色'
				},
				{
					name: '其他'
				}
			],
			size_tabs_index: 0,
			size_item_index: -1,
			select_index: -1,
			gy_index: -1,
			color_index: -1,
			room_index: -1
		};
	},
	methods: {
		// 返回页面
		return_page() {
			uni.navigateBack();
		},
		// 搜索
		open_search() {
			uni.navigateTo({
				url: '/pages/product/product_list'
			});
		},
		// 尺寸tabs切换
		click_sizeTabs(i) {
			this.size_tabs_index = i;
			this.size_item_index = -1;
		},
		click_sizeItem(i) {
			this.size_item_index = i;
		},
		click_selectItem(i) {
			this.select_index = i;
		},
		click_gyItem(i) {
			this.gy_index = i;
		},
		click_colorItem(i) {
			this.color_index = i;
		},
		click_roomItem(i) {
			this.room_index = i;
		}
	}
};
</script>

<style lang="less" scoped>
.params_list {
	overflow-x: hidden;
	padding: 0 20rpx 20rpx;
	.banner_bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.params_item {
		margin-bottom: 20rpx;
		background: #fff;
		padding: 32rpx 0;
		border-radius: 16rpx;

		.params_head {
			display: flex;
			align-items: flex-end;
			padding: 0 32rpx 20rpx;
			.icon {
				width: 40rpx;
				height: 40rpx;
			}
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #313131;
				line-height: 38rpx;
				padding: 0 8rpx;
			}
			.prop {
				font-size: 22rpx;
				font-weight: 400;
				color: #a1a1a1;
				line-height: 26rpx;
				text-transform: uppercase;
			}
		}

		.item_content {
			padding: 0 20rpx;
			.size_select {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.s_item {
					padding: 20rpx 0;
					width: 33.33%;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
					.text {
						font-size: 26rpx;
						font-weight: 400;
						color: #828282;
						padding-right: 6rpx;
					}
					.iconfont {
						font-size: 40rpx;
						color: #828282;
						transition: all 0.3s;
					}
				}

				.active {
					.text {
						color: #fca163;
					}
					.iconfont {
						color: #fca163;
						transform: rotate(-180deg);
					}
				}
			}

			.up_item {
				display: flex;
				flex-wrap: wrap;
				padding-left: 20rpx;
				.u_text {
					width: 192rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					font-size: 26rpx;
					font-weight: 400;
					color: #828282;
					border-radius: 8rpx;
					border: 1px solid rgba(0,0,0,.1);
					margin: 0 28rpx 20rpx 0;
					&:nth-child(3n + 3) {
						margin-right: 0;
					}
				}

				.active {
					color: #fca163;
					border: 1px solid #fca163;
					box-shadow: 0 0 1px rgba(252, 161, 99, 0.1);
				}
			}
		}

		// 系列
		.seriec_select_content {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 20rpx 0 40rpx;
			.item {
				width: 193rpx;
				height: 56rpx;
				line-height: 56rpx;
				border-radius: 8rpx 8rpx 8rpx 8rpx;
				border: 1rpx solid rgba(0,0,0,.1);
				text-align: center;
				font-size: 26rpx;
				font-weight: 400;
				color: #828282;
				margin: 0 28rpx 20rpx 0;
				&:nth-child(3n + 3) {
					margin-right: 0;
				}
			}
			.active {
				color: #fca163;
				border: 1px solid #fca163;
			}
		}

		// 工艺
		.gy_content {
			padding: 20rpx 20rpx 20rpx 40rpx;
			display: flex;
			flex-wrap: wrap;
			.item {
				width: 193rpx;
				height: 56rpx;
				line-height: 56rpx;
				border-radius: 8rpx 8rpx 8rpx 8rpx;
				border: 1rpx solid rgba(0,0,0,.1);
				text-align: center;
				font-size: 26rpx;
				font-weight: 400;
				color: #828282;
				margin: 0 28rpx 20rpx 0;
				&:nth-child(3n + 3) {
					margin-right: 0;
				}
			}
			.active {
				color: #fca163;
				border: 1px solid #fca163;
			}
		}

		// 颜色
		.color_select {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 20rpx 0;
			.item {
				width: 25%;
				text-align: center;
				padding-bottom: 30rpx;
				.color_box {
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
					margin: 10rpx auto;
					border: 2px solid #fff;
				}
				.c1 {
					background: #000;
				}
				.c2 {
					background: #fff;
				}
				.c3 {
					background: #999999;
				}
				.c4 {
					background: #f0b22a;
				}
				.c5 {
					background: #f1f0db;
				}
				.c6 {
					background: #705b40;
				}
				.c7 {
					background: #be985e;
				}
				.more_content {
					position: relative;
					width: 100%;
					height: 52rpx;
					left: 50%;
					.m_box {
						position: absolute;
						top: 0;
					}
				}
				.c8 {
					background: #a49578;
					transform: translateX(-30rpx);
					z-index: 1;
				}
				.c9 {
					background: #8d8835;
					transform: translateX(-15rpx);
					z-index: 2;
				}
				.c10 {
					background: #973838;
					transform: translateX(-0rpx);
					z-index: 3;
				}
				.text {
					padding-top: 10rpx;
					font-size: 26rpx;
					font-family: Inter-Regular, Inter;
					font-weight: 400;
					color: #828282;
					position: relative;
					&:after {
						content: '';
						position: absolute;
						bottom: -5px;
						left: 50%;
						transform: translateX(-50%);
						width: 34rpx;
						height: 2px;
						background: transparent;
						border-radius: 8px;
					}
				}
			}

			.active {
				.text {
					color: #fca163;
					font-weight: 600;
					&:after {
						background: #fca163;
					}
				}
			}
		}
	}

	.search_btn_content {
		/deep/ button {
			border-radius: 46rpx;
			background: #0A2B4E;
			font-size: 34rpx;
			font-weight: 500;
			color: #FFFFFF;
			border: 0;
			width: 710rpx;
			height: 100rpx;
		}
	}
}
</style>
