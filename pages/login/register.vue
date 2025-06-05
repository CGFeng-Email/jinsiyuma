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
			<view class="form_tabs">
				<view class="tabs" :class="tabs_index == index ? 'active' : ''" v-for="(item, index) in tabs" :key="index" @click="tabs_index = index">
					{{ item.name }}
				</view>
			</view>
			<!-- 账号登录 -->
			<view class="account_content" v-if="tabs_index == 0">
				<u--form class="form" :model="account_model" :rules="account_rules" ref="account_form" :errorType="errorType">
					<!-- <view class="item_input">
						<view class="label">
							<i class="iconfont icon-ID"></i>
							<text class="text">企业ID</text>
						</view>
						<u-form-item class="input_box">
							<u--input class="input" fontSize="14" v-model="account_model.id" placeholder="请输入企业ID" clearable shape="circle"></u--input>
						</u-form-item>
					</view> -->
					<view class="item_input">
						<view class="label">
							<i class="iconfont icon-shouji"></i>
							<text class="text">账号</text>
							<text class="star">*</text>
						</view>
						<u-form-item class="input_box" prop="account">
							<u--input class="input" type="number" fontSize="14" v-model="account_model.account" placeholder="请输入账号" clearable shape="circle"></u--input>
						</u-form-item>
					</view>
					<view class="item_input">
						<view class="label">
							<i class="iconfont icon-mima"></i>
							<text class="text">密码</text>
							<text class="star">*</text>
						</view>
						<u-form-item class="input_box" prop="password">
							<u--input
								class="input"
								fontSize="14"
								v-model="account_model.password"
								placeholder="请输入密码"
								clearable
								password
								shape="circle"
								@confirm="account_submit"
							></u--input>
						</u-form-item>
					</view>
					<view class="new">
						<view> </view>
						<!-- <view class="text" @click="open_new_register">注册账号</view> -->
						<view class="text" @click="open_forget_password">忘记密码?</view>
					</view>
					<view class="btn">
						<u-button class="submit" shape="circle" :throttleTime="200" form-type="submit" @click="account_submit">登&emsp;录</u-button>
					</view>
				</u--form>
			</view>
			<!-- 验证码登录 -->
			<view class="code_content" v-else>
				<u--form class="form" labelPosition="left" :model="model" :rules="rules" ref="uForm" :errorType="errorType">
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
		</view>
		<!-- <view class="agreement" @click="ischeckbox">
			<image class="checkbox_img" src="/static/img/checkbox.png" v-if="selectValue"></image>
			<view class="checkbox_radios" v-else>
				<view class="icon_check"></view>
			</view>
			我已阅读并同意
			<view class="text" @click.stop="user_agreement">《用户协议》</view>
			和
			<view class="text" @click.stop="privacy_agreement">《隐私协议》</view>
		</view> -->
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
			navbar_title: '登录',
			selectValue: false,
			bg: 'https://jsym.kinsyomacz.com/resource/img/register.jpg',
			tabs: [
				{
					name: '账号登录'
				},
				{
					name: '验证码登录'
				}
			],
			tabs_index: 0,
			array: ['86', '001', '400', '800'],
			index: 0,
			seconds: 60,
			tips: '',
			errorType: 'toast',
			model: {
				phone: '',
				code: ''
			},
			account_model: {
				id: '',
				account: '',
				password: ''
			},
			account_rules: {
				account: {
					type: 'string',
					required: true,
					message: '请输入账号',
					trigger: ['blur', 'change']
				},
				password: {
					type: 'string',
					required: true,
					message: '请输入密码',
					trigger: ['blur', 'change']
				}
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
					message: '请填写验证码',
					trigger: ['change', 'blur']
				}
			}
		};
	},
	onLoad() {
		uni.hideTabBar(); // 隐藏原生tabbar
	},
	onReady() {
		//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		ischeckbox() {
			const selectValue = this.selectValue;
			if (selectValue) {
				this.selectValue = false;
			} else {
				this.selectValue = true;
			}
		},
		bindPickerChange(e) {
			this.index = e.detail.value;
		},
		// 获取设备信息
		get_system_info() {
			let data = '';
			uni.getSystemInfo({
				success: (res) => {
					data = res.platform + '-' + res.brand + '-' + res.model;
				}
			});
			return data;
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
				uni.$u.toast('请输入正确手机号码');
			} else {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					});
					const code = await this.$request.post2('/api/index/sendSms', {
						scene: 101,
						mobile: this.model.phone
					});
					console.log('code', code);

					uni.hideLoading();
					uni.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			}
		},
		// 账号密码登录
		account_submit() {
			uni.showLoading({
				title: '登录中...',
				mask: true
			});
			this.$refs.account_form
				.validate()
				.then((res) => {
					const account_model = this.account_model;
					// 获取code
					wx.login({
						success: async (getCode) => {
							console.log('getCode', getCode);
							const system = await this.get_system_info();
							console.log('设备信息system', system);
							this.$request
								.post3(
									'/api/login/accountLogin',
									{
										openid: getCode.code,
										username: account_model.account,
										password: account_model.password,
										systemInfo: system
									},
									'no'
								)
								.then((data) => {
									console.log('submit', data);
									if (data.code == 200) {
										uni.setStorageSync('jinsiyuma_token', data.data.token);
										uni.setStorageSync('jinsiyuma_user_id', data.data.id);
										uni.reLaunch({
											url: '/pages/login/course_loading'
										});
										uni.hideLoading();
									} else {
										uni.hideLoading();
										uni.$u.toast(data.msg);
									}
								});
						}
					});
				})
				.catch((errors) => {
					uni.hideLoading();
				});
		},
		// 验证码登录
		submit() {
			uni.showLoading({
				title: '登录中...',
				mask: true
			});
			this.$refs.uForm
				.validate()
				.then((res) => {
					// 获取code
					wx.login({
						success: async (getCode) => {
							console.log('getCode', getCode);
							const system = await this.get_system_info();
							console.log('设备信息system', system);
							this.$request
								.post3(
									'/api/login/mobileLogin',
									{
										openid: getCode.code,
										mobile: this.model.phone,
										code: this.model.code,
										systemInfo: system
									},
									'no'
								)
								.then((data) => {
									console.log('submit', data);
									if (data.code == 200) {
										uni.setStorageSync('jinsiyuma_token', data.data.token);
										uni.setStorageSync('jinsiyuma_user_id', data.data.id);
										uni.reLaunch({
											url: '/pages/login/course_loading'
										});
										uni.hideLoading();
									} else {
										uni.hideLoading();
										uni.$u.toast(data.msg);
									}
								});
						}
					});
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
		},
		// 跳转注册
		open_new_register() {
			uni.navigateTo({
				url: '/pages/login/new_register'
			});
		},
		// 跳转忘记密码
		open_forget_password() {
			uni.navigateTo({
				url: '/pages/login/forget_password'
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

		.form_tabs {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.tabs {
				text-align: center;
				flex: 1;
				font-size: 32rpx;
				color: #333;
				padding: 22rpx 0;
				border-radius: 50rpx;
			}

			.active {
				background: #0a2b4e;
				color: #fff;
			}
		}

		/deep/ .u-form {
			padding: 30rpx 10rpx;
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
				padding: 10rpx 0;
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
				padding: 0;
				flex: 1;
				.input {
					padding: 0 40rpx;
					/deep/ input {
						height: 44px;
					}
				}
			}
			.code {
				text-align: right;
				font-size: 30rpx;
				font-weight: 500;
				color: #0a2b4e;
				flex: none;
			}

			/deep/ input {
				padding: 0 20rpx;
			}
		}

		.item_input {
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
