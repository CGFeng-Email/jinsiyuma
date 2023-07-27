<!-- 个人信息 -->
<template>
	<view class="container">
		<view class="info">
			<view class="list">
				<view class="item">
					<view class="left">
						<text class="text">头像</text>
					</view>
					<view class="right" @click="open_head_portrait">
						<image class="cover" :src="logo" mode="widthFix"></image>
						<i class="iconfont icon-right-1-copy"></i>
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">昵称</text>
					</view>
					<view class="right">
						<input class="input" type="text" :value="nickname" @blur="blur_nickname" @confirm="confirm_nickname" />
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">姓名</text>
					</view>
					<view class="right">
						<input class="input" type="text" :value="username" @blur="blur_username" @confirm="confirm_username" />
					</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="text">性别</text>
					</view>
					<view class="right">
						<picker mode="selector" :range="sex_list" range-key="text" :value="sex_index" @change="sex_change">
							<text class="text">{{ sex_list[sex_index].text }}</text>
						</picker>
						<i class="iconfont icon-right-1-copy"></i>
					</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="text">生日</text>
					</view>
					<view class="right">
						<picker mode="date" @change="date_change">
							<text class="text input" :class="[fate_date ? '' : 'fete']">{{ fate_date || '请选择您的生日' }}</text>
						</picker>
						<i class="iconfont icon-right-1-copy"></i>
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">手机号</text>
					</view>
					<view class="right">
						<text class="text phone">135****5424</text>
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">所属俱乐部</text>
					</view>
					<view class="right">
						<text class="text">无</text>
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">会员等级</text>
					</view>
					<view class="right">
						<text class="text">无</text>
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">注册时间</text>
					</view>
					<view class="right">
						<text class="text">2023-04-15</text>
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">地区</text>
					</view>
					<view class="right">
						<picker mode="region" :value="map_data_code" @change="bindDateChange">
							<text class="text">{{ map_data_value }}</text>
						</picker>
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">详细地址</text>
					</view>
					<view class="right">
						<textarea
							class="text input textarea"
							placeholder-style="color:color: #888888; font-weight: 400;"
							auto-height
							placeholder="请输入您的地址"
							:value="textarea_value"
							@confirm="textarea_confirm"
							@blur="textarea_blur"
						/>
					</view>
				</view>
			</view>

			<!-- 版本 -->
			<view class="versions">
				<view class="number">版本1.2.2.5</view>
				<view class="btn_box">
					<u-button class="button" shape="circle" throttleTime="200" color="#0A2B4E" @click="quit">退出账号</u-button>
				</view>
			</view>
			
			<HEADPORTRAIT :show_head_portrait="show_head_portrait" @close_head_portrait="close_head_portrait"></HEADPORTRAIT>
		</view>
	</view>
</template>

<script>
import HEADPORTRAIT from '@/components/head_portrait_popup.vue';
export default {
	components: { HEADPORTRAIT },
	data() {
		return {
			logo: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/me_info_logo.png',
			map_data_value: ['广东省', '佛上市', '禅城区'],
			map_data_code: ['440000', '440600', '440604'], // 默认选中广东省 佛山市 禅城区
			nickname: '金丝玉玛用户',
			username: '郑先生',
			sex_list: [
				{
					text: '未知'
				},
				{
					text: '男'
				},
				{
					text: '女'
				}
			],
			sex_index: 0,
			fate_date: '',
			textarea_value: '',
			show_head_portrait: false,
		};
	},
	methods: {
		// 头像组件淡显
		open_head_portrait() {
			this.show_head_portrait = true
		},
		// 头像组件关闭
		close_head_portrait() {
			console.log('close_head_portrait');
			this.show_head_portrait = false
		},
		// 昵称失去焦点
		blur_nickname(e) {
			console.log('e', e);
			this.nickname = e.detail.value;
		},
		// 昵称确定
		confirm_nickname(e) {
			console.log('e', e);
			this.nickname = e.detail.value;
		},
		// 姓名失去焦点
		blur_username(e) {
			this.username = e.detail.value;
		},
		// 姓名确定
		confirm_username(e) {
			this.username = e.detail.value;
		},
		// 性别回调
		sex_change(e) {
			console.log(e);
			this.sex_index = e.detail.value;
		},
		// 生日回调
		date_change(e) {
			console.log(e);
			this.fate_date = e.detail.value;
		},
		// 详细失去焦点
		textarea_blur(e) {
			this.textarea_value = e.detail.value;
		},
		// 详细地址点击回车确定
		textarea_confirm(e) {
			this.textarea_value = e.detail.value;
		},
		quit() {
			uni.removeStorageSync('code');
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.info {
	padding-bottom: 200rpx;
	.list {
		border-top: 1px solid #f8f8f8;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 20rpx;
			border-bottom: 1px solid #f8f8f8;
			.left {
				flex: none;
				.text {
					font-size: 28rpx;
					font-weight: 500;
					color: #313131;
				}
			}
			.right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.cover {
					width: 92rpx;
					height: 92rpx;
				}

				.iconfont {
					font-size: 24rpx;
					color: #cecece;
					padding-left: 10rpx;
				}

				.text {
					font-size: 28rpx;
					font-weight: 500;
					color: #464646;
					flex: 1;
					text-align: right;
				}

				.input {
					text-align: right;
				}

				input {
					text-align: right;
					font-size: 28rpx;
					font-weight: 500;
					color: #464646;
				}

				.fete {
					color: #888888;
				}

				.textarea {
					width: 88%;
					padding-left: 20rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #464646;
				}
			}
		}
		.p_right {
			padding-right: 40rpx;
		}
	}

	.versions {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0 20rpx 50rpx;
		background: #fff;
		.number {
			text-align: center;
			font-size: 26rpx;
			font-weight: 500;
			color: #cdcdcd;
			padding: 22rpx 0;
		}
		.btn_box {
			/deep/ button {
				height: 100rpx;
			}
		}
	}
}
</style>
