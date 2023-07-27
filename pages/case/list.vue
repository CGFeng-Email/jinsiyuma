<template>
	<view class="waterfall">
		<uv-waterfall ref="waterfall" v-model="list" :addTime="0" left-gap="10" right-gap="10" column-gap="8" @changeList="changeList">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list1" :key="item.id" class="waterfall-item" @click="open_details">
						<view class="waterfall-item__image">
							<image :src="item.image" mode="widthFix" :style="{ width: item.width + 'px' }"></image>
						</view>
						<view class="waterfall-item__ft">
							<view class="waterfall-item__ft__title">
								<text class="value over1">{{ item.title }}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">{{ item.desc }}</text>
							</view>
							<view class="bottom_comment">
								<view class="left_see common">
									<i class="iconfont icon-kanguos"></i>
									<text class="text">{{ item.see }}</text>
								</view>
								<view class="right_collect common">
									<i class="iconfont icon-shoucang collect_active" v-if="item.is_true"></i>
									<i class="iconfont icon-shoucang1" v-else></i>
									<text class="text">{{ item.collect }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<!-- 第二列数据 -->
			<template v-slot:list2>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list2" :key="item.id" class="waterfall-item" @click="open_details">
						<view class="waterfall-item__image">
							<image :src="item.image" mode="widthFix" :style="{ width: item.width + 'px' }"></image>
						</view>
						<view class="waterfall-item__ft">
							<view class="waterfall-item__ft__title">
								<text class="value over1">{{ item.title }}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">{{ item.desc }}</text>
							</view>
							<view class="bottom_comment">
								<view class="left_see common">
									<i class="iconfont icon-kanguos"></i>
									<text class="text">{{ item.see }}</text>
								</view>
								<view class="right_collect common">
									<i class="iconfont icon-shoucang collect_active" v-if="item.is_true"></i>
									<i class="iconfont icon-shoucang1" v-else></i>
									<text class="text">{{ item.collect }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
		</uv-waterfall>
	</view>
</template>
<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			list1: [],
			list2: []
		};
	},
	methods: {
		// 处理数据时触发 自动分配列表1，列表2
		changeList(e) {
			this[e.name].push(e.value);
		},
		open_details() {
			uni.navigateTo({
				url: '/pages/case/details'
			});
		}
	},
	onHide() {
		this.$refs.waterfall.clear();
	}
};
</script>
<style>
page {
	background: #f1f1f1;
}
</style>
<style scoped lang="scss">
$show-lines: 1;
@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
.waterfall-item {
	overflow: hidden;
	margin-top: 10px;
	border-radius: 6px;
}
.waterfall-item__ft {
	padding: 20rpx;
	background: #fff;
	&__title {
		.value {
			font-size: 28rpx;
			font-family: Inter-Regular, Inter;
			font-weight: 400;
			color: #313131;
		}
	}
	&__desc .value {
		font-size: 24rpx;
		font-family: Inter-Regular, Inter;
		font-weight: 400;
		color: #888888;
	}
	.bottom_comment {
		padding-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.common {
			font-size: 22rpx;
			font-family: Inter-Regular, Inter;
			font-weight: 400;
			color: #cdcdcd;
			display: flex;
			justify-content: center;
			align-items: center;
			.iconfont {
				font-size: 24rpx;
				color: #cdcdcd;
				display: inline-block;
			}
			.text {
				padding-left: 2px;
			}
			.collect_active {
				color: #f4442e;
			}
		}
	}
}
</style>
