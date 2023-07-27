<template>
	<view class="container">
		<view class="title">您好，</view>
		<view class="title">欢迎来到金丝玉玛！</view>
		<view class="form_content">
			<u--form labelPosition="left" :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="item_box">
					<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">
							+{{ array[index] }}
							<i class="iconfont icon-xiala2"></i>
						</view>
					</picker>
					<u-form-item class="input_box" prop="phone">
						<u--input type="number" maxlength="11" class="input" v-model="model.phone" border="none" placeholder="请输入您的电话"></u--input>
					</u-form-item>
				</view>
				<view class="item_box">
					<u-form-item prop="code">
						<u--input type="number" maxlength="6" v-model="model.code" border="none" placeholder="请输入验证码"></u--input>
					</u-form-item>
					<view class="code">
						<u-toast ref="uToast"></u-toast>
						<u-code :keepRunning="true" :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
						<text @tap="getCode">{{ tips }}</text>
					</view>
				</view>
				<view class="btn">
					<u-button class="submit" shape="circle" :throttleTime="200" form-type="submit" @click="submit">登&emsp;录</u-button>
				</view>
			</u--form>
		</view>
		<view class="agreement">
			登录代表同意
			<view class="text" @click="user_agreement">《用户协议》</view>
			和
			<view class="text" @click="privacy_agreement">《隐私协议》</view>
		</view>
		<view class="login_logo">
			<image class="cover" :src="login_logo" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
import { checkPhone } from '../../utils/regular.js';

export default {
	data() {
		return {
			login_logo: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/login_logo.png',
			array: ['86', '001', '400', '800'],
			index: 0,
			seconds: 60,
			tips: '',
			errorType: 'toast',
			model: {
				phone: '',
				code: ''
			},
			rules: {
				phone: [
					{
						type: 'number',
						required: true,
						len: 11,
						message: '请输入您的电话',
						trigger: ['change', 'blur']
					},
					{
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.mobile()就是返回true或者false的
							return uni.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						trigger: ['change', 'blur']
					}
				],
				code: {
					type: 'number',
					required: true,
					len: 6,
					message: '请填写验证码',
					trigger: ['change', 'blur']
				}
			}
		};
	},
	onReady() {
		//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		bindPickerChange(e) {
			this.index = e.detail.value;
		},
		end() {
			// uni.$u.toast('倒计时结束');
		},
		start() {
			// uni.$u.toast('倒计时开始');
		},
		codeChange(text) {
			this.tips = text;
		},
		async getCode() {
			const reg = await checkPhone(this.model.phone);
			if (!reg) {
				uni.$u.toast('请输入正确的电话号码');
			} else {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					});
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			}
		},
		submit() {
			uni.showLoading({
				title: '登录中...',
				mask: true
			});
			this.$refs.uForm
				.validate()
				.then((res) => {
					uni.hideLoading();
				})
				.catch((errors) => {
					uni.hideLoading();
				});
		},
		user_agreement() {
			uni.navigateTo({
				url: '/pages/agreement/user'
			});
		},
		privacy_agreement() {
			uni.navigateTo({
				url: '/pages/agreement/privacy'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.container {
	padding: 238rpx 74rpx 84rpx;
	.title {
		font-size: 50rpx;
		font-family: Inter-Medium, Inter;
		font-weight: 500;
		color: #313131;
		line-height: 80rpx;
	}
	.form_content {
		/deep/ .u-form {
			padding-top: 94rpx;
		}
		.item_box {
			display: flex;
			align-items: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
			padding: 20rpx 0;
			.picker {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10rpx 20rpx;
				.uni-input {
					font-size: 34rpx;
					color: #555;
					font-weight: 500;
				}
				.iconfont {
					display: inline-block;
					font-size: 34rpx;
					color: #555;
					font-weight: 500;
					padding-left: 6rpx;
				}
			}
			.input_box {
				padding: 0 20rpx;
				flex: 1;
				.input {
					padding: 0 20rpx;
				}
			}
			.code {
				text-align: center;
				font-size: 30rpx;
				font-weight: 500;
				color: #0a2b4e;
			}

			/deep/ input {
				padding: 0 20rpx;
			}
		}
		.btn {
			padding-top: 118rpx;

			/deep/ button {
				width: 600rpx;
				height: 100rpx;
				background: #0a2b4e;
				color: #fff;
				font-size: 34rpx;
				font-weight: 500;
				&::after {
					display: none;
				}
				&::before {
					display: none;
				}
			}
		}
	}
	.agreement {
		position: fixed;
		bottom: 84rpx;
		left: 0;
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		color: #888888;
		.text {
			display: inline-block;
			color: #0a2b4e;
		}
	}

	.login_logo {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: -1;
	}
}
</style>
