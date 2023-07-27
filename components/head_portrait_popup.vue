<!-- 头像弹窗 -->
<template>
	<u-popup :round="8" :show="show_head_portrait" @close="close" :safeAreaInsetBottom="false">
		<view class="list">
			<li class="li" @click="item_head">
				<view class="text">用微信头像</view>
				<image class="cover" :src="logo" mode="widthFix"></image>
			</li>
			<view class="li" @click="li_item(1)">从相册选择</view>
			<view class="li" @click="li_item(2)">拍照</view>
			<u-gap height="3" bgColor="#F3F3F3"></u-gap>
			<view class="li cancel" @click="close">取消</view>
		</view>
	</u-popup>
</template>

<script>
export default {
	props: {
		show_head_portrait: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			logo: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/me_info_logo.png'
		}
	},
	methods: {
		close() {
			this.$emit('close_head_portrait');
		},
		li_item(i) {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: [i == 1 ? 'album' : 'camera'],
				success: function (res) {
					console.log('res', res.tempFilePaths[0]);
				}
			});
			this.close()
		},
		item_head() {
			this.close()
		}
	}
};
</script>

<style lang="less" scoped>
.list {
	.li {
		font-size: 24rpx;
		color: #313131;
		padding: 30rpx 0;
		text-align: center;
		border-bottom: 1px solid #f3f3f3;
		.text {
			font-size: 24rpx;
			color: #313131;
		}
		.cover {
			width: 46rpx;
			height: 46rpx;
			border-radius: 8rpx;
			margin-top: 10rpx;
		}
	}
	.cancel {
	}
}
</style>
