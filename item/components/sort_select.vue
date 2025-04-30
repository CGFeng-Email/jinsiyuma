<template>
	<!-- 规格列表 -->
	<view class="params_list">
		<u-transition :show="true">
			<!-- 系列 -->
			<view class="seriec_content params_item box-shadow">
				<view class="params_head">
					<image class="icon" src="/static/img/product/seriec.png" mode="widthFix"></image>
					<text class="title">系列</text>
					<text class="prop">SERIES</text>
				</view>
				<view class="seriec_select_content">
					<view
						:class="['item', 'animate_fade', select_index == index ? 'active' : '']"
						v-for="(item, index) in sort_data.serie_select"
						:key="index"
						@click="click_selectItem(index, item.value)"
					>
						<text class="text">{{ item.name }}</text>
					</view>
				</view>
			</view>
			<!-- 尺寸 -->
			<view class="size_content params_item box-shadow">
				<view class="params_head">
					<image class="icon" src="/static/img/product/size.png" mode="widthFix"></image>
					<text class="title">规格</text>
					<text class="prop">SIZES</text>
				</view>
				<view class="item_content">
					<view class="size_select">
						<view
							:class="['s_item', size_tabs_index == index ? 'active' : '']"
							v-for="(item, index) in sort_data.size_type"
							:key="index"
							@click="click_sizeTabs(index)"
						>
							<text class="text">{{ item.name }}</text>
							<i class="iconfont icon-xiala2"></i>
						</view>
					</view>
					<view class="up_item">
						<block v-if="size_tabs_index == 0">
							<view
								:class="['u_text', 'animate_fade', size_item_index == index ? 'active' : '', item.isClick ? '' : 'noClick', select_index == -1 ? 'isClick' : '']"
								v-for="(item, index) in sort_data.size_type[0].child"
								:key="index"
								@click="click_sizeItem(index, item.value, item.isClick)"
							>
								{{ item.label }}
							</view>
						</block>
						<block v-if="size_tabs_index == 1">
							<view
								:class="['u_text', 'animate_fade', size_item_index == index ? 'active' : '', item.isClick ? '' : 'noClick', select_index == -1 ? 'isClick' : '']"
								v-for="(item, index) in sort_data.size_type[1].child"
								:key="index"
								@click="click_sizeItem(index, item.value, item.isClick)"
							>
								{{ item.label }}
							</view>
						</block>
						<block v-if="size_tabs_index == 2">
							<view
								:class="['u_text', 'animate_fade', size_item_index == index ? 'active' : '', item.isClick ? '' : 'noClick', select_index == -1 ? 'isClick' : '']"
								v-for="(item, index) in sort_data.size_type[2].child"
								:key="index"
								@click="click_sizeItem(index, item.value, item.isClick)"
							>
								{{ item.label }}
							</view>
						</block>
					</view>
				</view>
			</view>
			<!-- 工艺 -->
			<!-- <view class="seriec_content params_item box-shadow">
				<view class="params_head">
					<image class="icon" src="/static/img/product/gy.png" mode="widthFix"></image>
					<text class="title">工艺</text>
					<text class="prop">CRAFT</text>
				</view>
				<view class="gy_content">
					<view
						:class="['item', 'animate_fade', gy_index == index ? 'active' : '']"
						v-for="(item, index) in sort_data.tech_select"
						:key="index"
						@click="click_gyItem(index, item.value)"
					>
						<text class="text">{{ item.name }}</text>
					</view>
				</view>
			</view> -->
			<!-- 颜色 -->
			<!-- <view class="color_content params_item box-shadow">
				<view class="params_head">
					<image class="icon" src="/static/img/product/color.png" mode="widthFix"></image>
					<text class="title">颜色</text>
					<text class="prop">COLOR</text>
				</view>
				<view class="color_select">
					<view
						:class="['item', 'animate_fade', color_index == index ? 'active' : '']"
						v-for="(item, index) in sort_data.color_select"
						:key="index"
						@click="click_colorItem(index, item.value)"
						v-if="index < sort_data.color_select.length - 1"
					>
						<view :class="['color_box', 'c' + (index + 1)]"></view>
						<text class="text">{{ item.name }}</text>
					</view>
					<view
						class="item animate_fade"
						:class="color_index == sort_data.color_select.length ? 'active' : ''"
						@click="click_colorItem(sort_data.color_select.length, sort_data.color_select[sort_data.color_select.length - 1].value)"
					>
						<view class="more_content">
							<view class="color_box m_box c8"></view>
							<view class="color_box m_box c9"></view>
							<view class="color_box m_box c10"></view>
						</view>
						<text class="text">其他</text>
					</view>
				</view>
			</view> -->
			<!-- 空间 -->
			<!-- <view class="params_item box-shadow">
				<view class="params_head">
					<image class="icon" src="/static/img/product/room.png" mode="widthFix"></image>
					<text class="title">空间</text>
					<text class="prop">ROOM</text>
				</view>
				<view class="seriec_select_content">
					<view
						:class="['item', 'animate_fade', room_index == index ? 'active' : '']"
						v-for="(item, index) in sort_data.room_select"
						:key="index"
						@click="click_roomItem(index, item.value)"
					>
						<text class="text">{{ item.name }}</text>
					</view>
				</view>
			</view> -->
			<view class="search_btn_content">
				<u-button throttleTime="300" @click="open_search">去搜索</u-button>
			</view>
		</u-transition>
	</view>
</template>

<script>
export default {
	props: {
		sort_data: {
			type: Object,
			default: {}
		},
		size_tabs_index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			// size_tabs_index: 0,
			size_item_index: -1,
			select_index: -1,
			gy_index: -1,
			color_index: -1,
			room_index: -1,
			params: {
				size_id: '', // 尺寸id
				serie_id: '', // 系列id
				tech_id: '', // 工艺id
				color_id: '', // 颜色id
				room_id: '' // 空间id
			}
		};
	},
	methods: {
		// 返回页面
		return_page() {
			uni.navigateBack();
		},
		// 尺寸tabs切换
		click_sizeTabs(i) {
			this.$emit('sizeTabsIndex', i, this.params.serie_id);
			this.size_item_index = -1;
		},
		// 尺寸id
		click_sizeItem(i, value, isClick) {
			if (isClick == false) return;
			if (this.size_item_index == i) {
				this.size_item_index = -1;
				this.params.size_id = '';
				return;
			}
			this.size_item_index = i;
			this.params.size_id = value;
		},
		// 系列id
		click_selectItem(i, value) {
			this.size_item_index = -1;
			if (this.select_index == i) {
				this.select_index = -1;
				this.params.serie_id = '';
				this.$emit('selectItem', -1);
				return;
			}
			this.select_index = i;
			this.params.serie_id = value;
			this.$emit('selectItem', value);
		},
		// 工艺id
		click_gyItem(i, value) {
			if (this.gy_index == i) {
				this.gy_index = -1;
				this.params.tech_id = '';
				return;
			}
			this.gy_index = i;
			this.params.tech_id = value;
		},
		// 颜色id
		click_colorItem(i, value) {
			if (this.color_index == i) {
				this.color_index = -1;
				this.params.color_id = '';
				return;
			}
			this.color_index = i;
			this.params.color_id = value;
		},
		// 空间id
		click_roomItem(i, value) {
			if (this.room_index == i) {
				this.room_index = -1;
				this.params.room_id = '';
				return;
			}
			this.room_index = i;
			this.params.room_id = value;
		},
		// 搜索
		open_search() {
			// console.log('params', this.params);
			uni.navigateTo({
				url: `/pages/product/product_list?params=${JSON.stringify(this.params)}`
			});
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
					border: 1px solid rgba(0, 0, 0, 0.1);
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

			.noClick {
				background: #e0e0e0;
				color: #c3c3c3;
			}

			.isClick {
				background: #fff;
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
				border: 1rpx solid rgba(0, 0, 0, 0.1);
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
				border: 1rpx solid rgba(0, 0, 0, 0.1);
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
			background: #0a2b4e;
			font-size: 34rpx;
			font-weight: 500;
			color: #ffffff;
			border: 0;
			width: 710rpx;
			height: 100rpx;
		}
	}
}
</style>
