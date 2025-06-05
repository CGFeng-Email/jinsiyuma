<!-- 个人信息 -->
<template>
	<view class="container">
		<view class="info">
			<view class="list">
				<view class="item">
					<view class="left">
						<text class="text">头像</text>
					</view>
					<button class="right cover_box box-shadow head_portrait" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="cover" :src="head_portrait ? head_portrait : '/static/img/head_portrait.png'"></image>
						<i class="iconfont icon-right-1-copy"></i>
					</button>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">昵称</text>
					</view>
					<view class="right">
						<input class="input" type="text" :value="nickname ? nickname : '一只小蘑菇'" @blur="blur_nickname" @confirm="blur_nickname" />
					</view>
				</view>
				<view class="item p_right">
					<view class="left">
						<text class="text">姓名</text>
					</view>
					<view class="right">
						<input class="input" type="nickname" :value="user_name ? user_name : '金丝玉玛用户'" @blur="blur_username" />
					</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="text">性别</text>
					</view>
					<view class="right">
						<picker mode="selector" :range="sex_list" range-key="text" :value="sex_index" @change="sex_change">
							<text class="text">{{ sex ? sex : sex_list[sex_index].text }}</text>
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
						<text class="text phone">{{phone}}</text>
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
						<picker mode="region" :value="map_data_code" @change="map_change">
							<text class="text">{{ map_data_value || '广东省,佛上市,禅城区' }}</text>
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
							@confirm="textarea_blur"
							@blur="textarea_blur"
						/>
					</view>
				</view>
			</view>

			<!-- 版本 -->
			<view class="versions">
				<view class="number">版本{{version}}</view>
				<view class="btn_box">
					<u-button class="button" shape="circle" throttleTime="200" color="#0A2B4E" @click="quit">退出账号</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
			sex_index: 0, // 性别下标
			head_portrait: '', // 头像
			nickname: '', // 昵称
			user_name: '', // 姓名
			sex: '', // 性别
			fate_date: '', // 生日
			phone: '', // 手机号
			map_data_code: ['440000', '440600', '440604'], // 默认选中广东省 佛山市 禅城区
			map_data_value: '', // 地区地址
			textarea_value: '', // 详细地址
			version: '', // 版本号
		};
	},
	onLoad() {
		// 获取版本号
		const accountInfo = uni.getAccountInfoSync();
		this.version = accountInfo.miniProgram.version;
		this.get_userData();
	},
	methods: {
		// 获取用户信息
		async get_userData() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			const res = await this.$request.post('/user/getUserInfo');
			this.head_portrait = res.avatar;
			this.user_name = res.real_name;
			this.nickname = res.nickname;
			this.sex = res.sex;
			this.fate_date = res.birthday;
			this.phone = res.mobile;
			this.map_data_value = res.district;
			this.textarea_value = res.address;
			uni.hideLoading();
		},
		// 上传用户头像
		async onChooseAvatar(e) {
			// 处理成base64
			const base_url = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(e.detail.avatarUrl, 'base64');
			this.head_portrait = e.detail.avatarUrl;
			// 上传头像
			const res = await this.$request.post('/upload/image', {
				file: base_url
			});
			// 保存用户头像
			await this.$request.post('/user/saveUserInfo', {
				avatar: res.url
			});
		},
		// 昵称失去焦点
		blur_nickname(e) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.nickname = e.detail.value;
			this.$request.post('/user/saveUserInfo', {
				nickname: e.detail.value
			});
			uni.hideLoading();
		},
		// 姓名失去焦点
		blur_username(e) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.$request.post('/user/saveUserInfo', {
				user_name: e.detail.value
			});
			uni.hideLoading();
		},
		// 性别回调
		async sex_change(e) {
			this.sex_index = e.detail.value;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			await this.$request.post('/user/saveUserInfo', {
				sex: e.detail.value
			});
			await this.get_userData();
			uni.hideLoading();
		},
		// 生日回调
		date_change(e) {
			console.log(e);
			this.fate_date = e.detail.value;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.$request.post('/user/saveUserInfo', {
				birthday: e.detail.value
			});
			uni.hideLoading();
		},
		// 地区
		map_change(e) {
			const value = e.detail.value.join(',');
			this.map_data_value = value;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.$request.post('/user/saveUserInfo', {
				district: value
			});
			uni.hideLoading();
		},
		// 详细失去焦点
		textarea_blur(e) {
			this.textarea_value = e.detail.value;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.$request.post('/user/saveUserInfo', {
				address: e.detail.value
			});
			uni.hideLoading();
		},
		// 退出账号
		quit() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			uni.removeStorageSync('user_id');
			uni.removeStorageSync('mobile');
			uni.switchTab({
				url: '/pages/index/index'
			});
			uni.hideLoading();
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
					border-radius: 50%;
					overflow: hidden;
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
			.cover_box {
				background: none;
				box-shadow: none;
				padding: 0 !important;
				&::after {
					display: none;
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
