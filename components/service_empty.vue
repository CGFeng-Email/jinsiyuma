<!-- 数据为空，联系客服 -->
<template>
	<!-- 没有查询到 -->
	<view class="not_find">
		<block v-if="keyword">
			<view class="name">未搜索到有关{{ '"' + keyword + '"' }}的内容</view>
			<view class="desc">请尝试搜索其他关键词</view>
		</block>
		<block v-else>
			<view class="name">内容为空</view>
			<view class="desc">请尝试搜索其他关键词</view>
		</block>
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
</template>

<script>
export default {
	props: {
		keyword: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			phone_list: []
		};
	},
	created() {
		this.get_service_mobile();
	},
	methods: {
		// 获取客服手机号
		get_service_mobile() {
			const { service_mobile } = getApp().globalData;
			this.phone_list[0] = `${JSON.stringify(service_mobile)}`
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
.not_find {
	padding: 60rpx 30rpx 0;
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
