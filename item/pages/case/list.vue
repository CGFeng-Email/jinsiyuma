<template>
	<view class="waterfall">
		<uv-waterfall ref="waterfall" v-model="list" :addTime="20" left-gap="10" right-gap="10" column-gap="8" @changeList="changeList" @clear="clear">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<u-transition :show="true">
						<view v-for="(item, index) in list1" :key="item.id" class="waterfall-item box-shadow" @click="open_details(item.id)">
							<view class="waterfall-item__image">
								<image class="cover" :src="item.image" mode="widthFix" :fade="true" :style="{ width: item.width + 'px;' }"></image>
							</view>
							<view class="waterfall-item__ft">
								<view class="waterfall-item__ft__title">
									<text class="value over1">{{ item.title }}</text>
								</view>
								<view class="waterfall-item__ft__desc uv-line-2">
									<text class="value over2">{{ item.remark }}</text>
								</view>
								<view class="bottom_comment">
									<view class="left_see common">
										<i class="iconfont icon-kanguos"></i>
										<text class="text">{{ item.view_actual }}</text>
									</view>
									<view class="right_collect common" @click.stop="click_isCollect('list1', index, item.id, item.is_like)">
										<i v-if="item.is_like == 0" class="iconfont icon-dianzan6"></i>
										<i v-else class="iconfont icon-yizan active"></i>
										<text class="text" v-if="item.like_actual > 0">{{ item.like_actual }}</text>
									</view>
								</view>
							</view>
						</view>
					</u-transition>
				</view>
			</template>
			<!-- 第二列数据 -->
			<template v-slot:list2>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<u-transition :show="true">
						<view v-for="(item, index) in list2" :key="item.id" class="waterfall-item box-shadow" @click="open_details(item.id)">
							<view class="waterfall-item__image">
								<image class="cover" :src="item.image" mode="widthFix" :fade="true" :style="{ width: item.width + 'px' }"></image>
							</view>
							<view class="waterfall-item__ft">
								<view class="waterfall-item__ft__title">
									<text class="value over1">{{ item.title }}</text>
								</view>
								<view class="waterfall-item__ft__desc uv-line-2">
									<text class="value over2">{{ item.remark }}</text>
								</view>
								<view class="bottom_comment">
									<view class="left_see common">
										<i class="iconfont icon-kanguos"></i>
										<text class="text">{{ item.view_actual }}</text>
									</view>
									<view class="right_collect common" @click.stop="click_isCollect('list2', index, item.id, item.is_like)">
										<i v-if="item.is_like == 0" class="iconfont icon-dianzan6"></i>
										<i v-else class="iconfont icon-yizan active"></i>
										<text class="text" v-if="item.like_actual > 0">{{ item.like_actual }}</text>
									</view>
								</view>
							</view>
						</view>
					</u-transition>
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
		},
		hide_case_collect: {
			type: Boolean,
			default: false
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
		// 是否收藏
		async click_isCollect(type, index, id, is_like) {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return this.$emit('showLoginModal');
			let collect = is_like == 0 ? 1 : 0;
			const res = await this.$request.post('/example/setLike', {
				id,
				type: collect
			});
			if (type == 'list1') {
				this.list1[index].is_like = collect;
				is_like == 0 ? (this.list1[index].like_actual += 1) : (this.list1[index].like_actual -= 1);
			} else {
				this.list2[index].is_like = collect;
				is_like == 0 ? (this.list2[index].like_actual += 1) : (this.list2[index].like_actual -= 1);
			}
		},
		// 清空数组列表
		clear() {
			return new Promise((resolve, reject) => {
				this.list1 = [];
				this.list2 = [];
				resolve(true);
			});
		},
		// 跳转详情
		open_details(id) {
			uni.navigateTo({
				url: `/pages/case/details?id=${id}`
			});
		}
	}
};
</script>
<style>
page {
	background: #f1f1f1;
}
</style>
<style scoped lang="scss">
@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
.cover {
	height: auto;
}
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
			font-weight: 500;
			color: #313131;
		}
	}
	&__desc .value {
		margin-top: 10rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #888888;
	}
	.bottom_comment {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.common {
			font-size: 22rpx;
			font-weight: 400;
			color: #cdcdcd;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 14rpx;
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
			.active {
				color: #fcc863;
			}
		}
		.right_collect {
			padding-left: 20rpx;
		}
	}
}
</style>
