<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<u-navbar title="个人中心" :titleStyle="navbarStyle" leftIcon=" " placeholder bgColor="transparent"></u-navbar>
		<view class="me">
			<view class="cover_box banner">
				<image class="cover" :src="banner" mode="widthFix"></image>
			</view>
			<view class="user_content">
				<view class="left">
					<button class="cover_box box-shadow head_portrait" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="cover" :src="head_portrait != '' ? head_portrait : '/static/img/head_portrait.png'"></image>
					</button>
					<view class="user_info">
						<input type="nickname" class="title weui-input" :value="user_name ? user_name : '金丝玉玛用户'" @blur="user_name_blur" />
						<view class="hint">
							{{ hint }}
						</view>
					</view>
					<!-- 未登录时起到一个遮罩的左右 -->
					<view class="hide_shadow" v-if="hide_shadow" @click="login_modal = true"></view>
				</view>
				<view class="right" @click="open_info">
					<i class="iconfont icon-right-1-copy"></i>
				</view>
			</view>
			<view class="user_tabs">
				<view class="ut_content border-radius box-shadow">
					<view class="item" @click="open_tabs(0)">
						<i class="iconfont icon-shoucang-yishoucang"></i>
						<text class="text">产品收藏</text>
					</view>
					<view class="item" @click="open_tabs(1)">
						<i class="iconfont icon-xihuanT"></i>
						<text class="text">案例收藏</text>
					</view>
					<view class="item" @click="open_tabs(2)">
						<i class="iconfont icon-jurassic_wait"></i>
						<text class="text">浏览历史</text>
					</view>
				</view>
			</view>
			<view class="head_title">我的服务</view>
			<view class="service_list">
				<view class="item subscribe_item border-radius" @click="open_subscribe_list">
					<view class="text">我的预约</view>
					<image class="cover" :src="subscribe_banner" mode="widthFix"></image>
				</view>

				<view class="item service_item border-radius">
					<view class="text">联系客服</view>
					<image class="cover" src="/static/img/service_icon.png" mode="widthFix"></image>
					<button class="item_btn" open-type="contact" send-message-title="金丝玉玛" show-message-card></button>
				</view>
			</view>
			<view class="head_title">关于我们</view>
			<view class="about_us_list">
				<view class="li border-radius box-shadow" @click="open_about_us">
					<view class="left">
						<i class="iconfont icon-guanyuwomen"></i>
						<text class="text">关于我们</text>
					</view>
				</view>
				<view class="li border-radius box-shadow" @click="open_map">
					<view class="left">
						<i class="iconfont icon-location-filled"></i>
						<text class="text">门店地址</text>
					</view>
				</view>
				<view class="li border-radius box-shadow" @click="open_accounts">
					<view class="left">
						<image class="cover" :src="official_accounts_logo" mode="widthFix"></image>
						<text class="text">{{ official_accounts_text }}</text>
					</view>
					<view class="right">
						<text class="desc">即刻关注</text>
					</view>
				</view>
			</view>
			<!-- 底部栏 -->
			<TABBAR :tabbar_bg="true" :tabs_index="4"></TABBAR>
			<!-- 登录模态框 -->
			<LOGINMODAL :show="login_modal" @loginModalCancel="loginModalCancel"></LOGINMODAL>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			banner: 'https://jsym.kinsyomacz.com/resource/img/me_banner.png',
			subscribe_banner: 'https://jsym.kinsyomacz.com/resource/img/subscribe_icon.png',
			loading: true,
			navbarStyle: {
				fontSize: '14px',
				color: '#313131',
				fontWeight: 600
			},
			head_portrait: '', // 头像
			user_name: '', // 昵称
			official_accounts_logo: '', // 公众号logo
			official_accounts_text: '', // 公众号名称
			hint: '尊敬的用户，下午好！',
			login_modal: false, // 登录模态框
			hide_shadow: false // 未登录时起到一个遮罩的左右
		};
	},
	async onLoad() {
		uni.hideTabBar(); // 隐藏原生tabbar
		this.initial();
	},
	async onShow() {
		await this.get_userData();
		this.loading = false;
	},
	methods: {
		initial() {
			const app = getApp();
			this.official_accounts_logo = app.globalData.official_accounts_logo;
			this.official_accounts_text = app.globalData.official_accounts_text;
		},
		open_tabs(i) {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			if (i == 0) {
				uni.navigateTo({
					url: '/pages/me/collect_list?tabs_index=0'
				});
			} else if (i == 1) {
				uni.navigateTo({
					url: '/pages/me/collect_list?tabs_index=1'
				});
			} else {
				uni.navigateTo({
					url: '/pages/me/history'
				});
			}
		},
		// 跳转个人信息页面
		open_info() {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			uni.navigateTo({
				url: '/pages/me/info'
			});
		},
		open_about_us() {
			uni.navigateTo({
				url: '/pages/me/about_us'
			});
		},
		// 我的预约
		open_subscribe_list() {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) return (this.login_modal = true);
			uni.navigateTo({
				url: '/pages/product/my_subscribe'
			});
		},
		// 跳转公众号
		open_accounts() {
			uni.navigateTo({
				url: '/pages/me/accounts'
			});
		},
		// 上传用户头像
		async onChooseAvatar(e) {
			uni.showLoading({
				title: '加载中'
			});
			console.log('上传头像回调', e);
			// 处理成base64
			const base_url = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(e.detail.avatarUrl, 'base64');
			// 上传头像
			const res = await this.$request.post('/upload/image', {
				file: base_url
			});
			console.log('上传头像', res);
			// 保存头像
			const res2 = await this.$request.post2('/user/saveUserInfo', {
				avatar: res.url
			});
			console.log('保存头像', res2);
			if (res2.code == 1 || res2.msg == '保存成功') {
				this.head_portrait = e.detail.avatarUrl;
				return uni.hideLoading();
			} else {
				uni.hideLoading();
				uni.showToast({
					title: '服务器发生错误，请联系管理员',
					duration: 2000
				});
			}
		},
		// 用户昵称 离开回调
		user_name_blur(e) {
			this.$request.post('/user/saveUserInfo', {
				real_name: e.detail.value
			});
		},
		// 获取用户信息
		async get_userData() {
			const user_id = uni.getStorageSync('user_id');
			if (!user_id) {
				this.head_portrait = '';
				this.user_name = '';
				this.hide_shadow = true;
				return;
			}
			this.hide_shadow = false;
			const res = await this.$request.post('/user/getUserInfo');
			console.log('获取头像', res);
			this.head_portrait = res.avatar;
			this.user_name = res.real_name;
		},
		// 关闭登录模态框
		loginModalCancel() {
			this.login_modal = false;
		},
		open_map() {
			uni.navigateTo({
				url: '/pages/map/map'
			});
		}
	}
};
</script>

<style scoped lang="less">
.me {
	.banner {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: -1;
	}
	.user_content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 30rpx;
		.left {
			display: flex;
			align-items: center;
			position: relative;
			.cover_box {
				background: none;
				border-radius: 50rpx;
				overflow: hidden;
				box-shadow: none;
				outline: none;
				&::after {
					display: none;
				}
				.cover {
					width: 122rpx;
					height: 122rpx;
					border-radius: 50%;
				}
			}
			.head_portrait {
				padding: 0 !important;
				margin: 0 !important;
				width: 122rpx;
				height: 122rpx;
				display: block;
				flex: none;
				&::after {
					display: none;
				}
				&::before {
					display: none;
				}
			}
			.user_info {
				padding: 0 20rpx;
				.title {
					font-size: 36rpx;
					line-height: 46rpx;
					color: #313131;
					font-weight: 600;
				}
				.hint {
					font-size: 26rpx;
					line-height: 36rpx;
					font-weight: 500;
					color: #464646;
					padding-top: 10rpx;
				}
			}
			.hide_shadow {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 99999;
			}
		}
		.right {
			padding: 38rpx 0 38rpx 150rpx;
			.iconfont {
				font-size: 34rpx;
				color: #9e9fa1;
			}
		}
	}
	.user_tabs {
		margin-top: 40rpx;
		padding: 10rpx 30rpx;
		.ut_content {
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 176rpx;
			.item {
				width: 33.33%;
				text-align: center;
				.iconfont {
					font-size: 60rpx;
					color: #0a2b4e;
				}
				.text {
					font-size: 22rpx;
					font-weight: 400;
					color: #464646;
				}
			}
		}
	}
	.head_title {
		padding: 32rpx 30rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #313131;
	}
	.service_list {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		.item {
			width: 336rpx;
			height: 132rpx;
			position: relative;
			padding: 24rpx 16rpx;
			text-align: left;
			.text {
				font-size: 28rpx;
				line-height: 38rpx;
				font-weight: 400;
				color: #464646;
			}
			.cover {
				position: absolute;
				top: 0;
				right: 0;
				width: 208rpx;
				height: 136rpx;
			}
			.item_btn {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
			button {
				margin: 0;
				background-color: transparent;
				&:after {
					display: none;
				}
			}
		}
		.subscribe_item {
			background: linear-gradient(54deg, #e6edff 0%, #d4e1ff 100%);
			.cover {
				top: -3px;
			}
		}
		.service_item {
			background: linear-gradient(62deg, #fff5e2 0%, #ffedc0 100%);
			.cover {
				top: -7px;
			}
		}
	}

	.about_us_list {
		padding: 0 30rpx;
		.li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 26rpx 38rpx;
			margin-bottom: 22rpx;
			.left {
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 68rpx;
					color: #4887fa;
				}
				.text {
					font-size: 28rpx;
					font-weight: 400;
					color: #464646;
					padding-left: 26rpx;
				}
				.cover {
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.icon-location-filled {
					color: #0a2b4e;
				}
			}
			.right {
				font-size: 24rpx;
				font-weight: 500;
				color: #464646;
			}
			&:hover {
				background: #f8f8f8;
			}
		}
	}
}
</style>
