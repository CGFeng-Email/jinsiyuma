<template>
	<view class="container">
		<view class="bg">
			<image class="cover" :src="bg" mode="scaleToFill"></image>
		</view>
		<FIXED_NAVBAR :navbar_title="navbar_title" :placeholder="false" :transparent="true" :iconColor="true"></FIXED_NAVBAR>
		<view class="title">您好，</view>
		<view class="title2">欢迎回到章氏企业商学院！</view>
		<view class="title3">内部平台，仅供合作客户使用</view>
		<view class="form_content">
			<!-- 验证码登录 -->
			<view class="code_content">
				<u--form class="form" labelPosition="left" :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<view class="item_input">
						<view class="label">
							<i class="iconfont icon-ID"></i>
							<text class="text">账号</text>
							<text class="star">*</text>
						</view>
						<u-form-item class="input_box" prop="phone">
							<u--input
								type="number"
								fontSize="14"
								maxlength="11"
								class="input"
								v-model="model.phone"
								placeholder="请输入您的电话"
								border="surround"
								shape="circle"
								clearable
							></u--input>
						</u-form-item>
					</view>
					<view class="item_input">
						<view class="label">
							<i class="iconfont icon-shouji"></i>
							<text class="text">验证码</text>
							<text class="star">*</text>
						</view>
						<u-form-item prop="code">
							<u--input
								type="number"
								fontSize="14"
								maxlength="6"
								v-model="model.code"
								placeholder="请输入验证码"
								border="surround"
								shape="circle"
								clearable
							></u--input>
						</u-form-item>
						<view class="code">
							<u-toast ref="uToast"></u-toast>
							<u-code :keepRunning="true" :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
							<text @tap="getCode" class="get_code">{{ tips }}</text>
						</view>
					</view>
					<view class="item_input">
						<view class="label">
							<i class="iconfont icon-mima"></i>
							<text class="text">密码</text>
							<text class="star">*</text>
						</view>
						<u-form-item class="input_box" prop="password">
							<u--input class="input" fontSize="14" v-model="model.password" placeholder="请输入密码" border="surround" clearable password shape="circle"></u--input>
						</u-form-item>
					</view>
					<view class="item_input">
						<view class="label">
							<i class="iconfont icon-mima"></i>
							<text class="text">确认密码</text>
							<text class="star">*</text>
						</view>
						<u-form-item class="input_box" prop="copy_password">
							<u--input
								class="input"
								fontSize="14"
								v-model="model.copy_password"
								placeholder="请输入密码"
								border="surround"
								clearable
								password
								shape="circle"
							></u--input>
						</u-form-item>
					</view>
					<view class="btn">
						<u-button class="submit" shape="circle" :throttleTime="200" form-type="submit" @click="submit">登&emsp;录</u-button>
					</view>
				</u--form>
			</view>
		</view>
	</view>
</template>

<script>
import FIXED_NAVBAR from '@/components/fixed_navbar.vue';
import { checkPhone } from '../../utils/regular.js';

export default {
	components: {
		FIXED_NAVBAR
	},
	data() {
		return {
			navbar_title: '注册',
			selectValue: false,
			bg: 'https://jsym.kinsyomacz.com/resource/img/register.jpg',
			array: ['86', '001', '400', '800'],
			index: 0,
			seconds: 60,
			tips: '',
			errorType: 'toast',
			model: {
				phone: '',
				code: '',
				password: '',
				copy_password: ''
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
					len: 4,
					message: '请输入验证码',
					trigger: ['change', 'blur']
				},
				password: {
					type: 'string',
					required: true,
					message: '请输入密码',
					trigger: ['blur', 'change']
				},
				copy_password: {
					type: 'string',
					required: true,
					message: '请输入确认密码',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	onReady() {
		//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		end() {
			// uni.$u.toast('倒计时结束');
		},
		start() {
			// uni.$u.toast('倒计时开始');
		},
		async getCode() {
			const reg = await checkPhone(this.model.phone);
			if (!reg) {
				uni.$u.toast('请输入正确的电话号码');
			} else {
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					});
					const code = await this.$request.post2('/api/index/sendSms', {
						scene: 105,
						mobile: this.model.phone
					});
					console.log('code', code);
					if (code.code == 200) {
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					} else {
						uni.$u.toast('服务器发生错误，短信发送失败！');
					}
					uni.hideLoading();
				} else {
					uni.$u.toast('请在倒计时结束后再发送');
				}
			}
		},
		submit() {
			uni.showLoading({
				title: '注册中...',
				mask: true
			});
			this.$refs.uForm
				.validate()
				.then((res) => {
					const model = this.model;
					console.log('model', model);
					if (model.password == model.copy_password) {
						model.mobile = model.phone;
						this.$request.post2('/api/login/mobileRegister', model).then((data) => {
							console.log('submit', data);
						});
					} else {
						uni.$u.toast('密码填写不一致');
					}
					uni.hideLoading();
				})
				.catch((errors) => {
					console.log('errors', errors);
					uni.hideLoading();
				});
		}
	}
};
</script>

<style>
.u-input__content input {
	height: 30px !important;
	line-height: 30px !important;
	padding: 0 10px;
}
</style>
<style lang="less" scoped>
.container {
	padding: 300rpx 60rpx 84rpx;
	.bg {
		position: fixed;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
		.cover {
			width: 100%;
			height: 100%;
		}
	}
	.title {
		font-size: 46rpx;
		font-family: Inter-Medium, Inter;
		font-weight: 600;
		color: #313131;
		line-height: 80rpx;
	}

	.title2 {
		font-size: 46rpx;
		font-weight: 600;
		color: #102a4b;
	}

	.title3 {
		font-size: 38rpx;
		font-weight: 500;
		color: #102a4b;
		margin: 18rpx 0;
	}

	.form_content {
		margin-top: 50rpx;
		box-shadow: 0px 0 20px rgba(16, 42, 75, 0.6);
		border-radius: 40rpx;
		background: #fff;
		overflow: hidden;
		padding: 30rpx 20rpx;

		/deep/ .u-form {
			padding: 30rpx 10rpx;
		}

		.item_input {
			padding: 5rpx 0;
			.label {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-weight: normal;
				color: #666666;
				.text {
					padding-left: 8rpx;
				}

				.star {
					color: #ff0000;
				}
			}
			.input_box {
				padding: 0;
				flex: 1;
				.input {
					padding: 0 20rpx;
				}
			}
			.code {
				text-align: right;
				font-size: 30rpx;
				font-weight: 500;
				color: #0a2b4e;
				flex: none;
				.get_code {
					font-size: 24rpx;
					font-weight: 500;
					color: #0a2b4e;
				}
			}

			/deep/ input {
				padding: 0 20rpx;
			}
		}

		.btn {
			padding-top: 30rpx;
			/deep/ button {
				width: 100%;
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
		display: flex;
		justify-content: center;
		align-items: center;
		.text {
			display: inline-block;
			color: #0a2b4e;
		}
		.checkbox_radios {
			box-sizing: border-box;
			width: 16px;
			height: 16px;
			margin-right: 4px;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon_check {
				width: 12px;
				height: 12px;
				border-radius: 50rpx;
				border: 1px solid #fff;
			}
		}
		.checkbox_img {
			width: 16px;
			height: 16px;
			border-radius: 50rpx;
			overflow: hidden;
			margin-right: 4px;
		}
	}

	.new {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		font-weight: normal;
		color: #666666;
		.text {
			padding: 8rpx 0;
		}
	}
}
</style>
