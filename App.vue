<script>
export default {
	globalData: {
		osName: '', // 设备机型
		statusBarHeight: 0, // 状态栏高度
		windowHeight: 0, // 页面高度
	},
	onLaunch: async function () {
		await this.get_userAuthorize();
		await this.listenForUpdates();
		await this.get_phone();
		await this.login();
	},
	onShow() {
		uni.hideTabBar(); // 隐藏原生tabbar
	},
	methods: {
		// 开启授权
		get_userAuthorize() {
			// 开启地图授权
			// wx.authorize({ scope: 'scope.userLocation', scope: 'scope.address' });

			// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
			wx.getSetting({
				success(res) {
					if (!res.authSetting['scope.userLocation']) {
						wx.authorize({
							scope: 'scope.userLocation'
						})
					}
					if (!res.authSetting['scope.address']) {
						wx.authorize({
							scope: 'scope.address'
						});
					}
				}
			})
		},
		// 获取设备机型
		get_phone() {
			uni.getSystemInfo({
				success: (res) => {
					console.log('设备', res);
					this.globalData.osName = res.osName;
					this.globalData.statusBarHeight = res.statusBarHeight;
					this.globalData.windowHeight = res.windowHeight
				}
			});
		},
		//监听小程序是否有新版本需要更新
		listenForUpdates() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate == true) {
					updateManager.onUpdateReady(function (res) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onUpdateFailed(function (res) {
						// 新的版本下载失败
						uni.showModal({
							title: '更新失败',
							content: '很抱歉未能更新成功。您可以尝试重新进入，或者在微信界面下拉，在最近使用中找到此小程序，长按将其拖拽到底部删除按钮中，然后重新搜索小程序进入。给您带来的不便，深表歉意！',
							showCancel: false
						});
					});
				}
			});
		},
		login() {
			try {
				const code = uni.getStorageSync('code');
				if (code) {
					console.log(code);
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			} catch (e) {
				// error
			}
		}
	}
};
</script>

<style lang="scss">
@import '@/uni_modules/uview-ui/index.scss';
@import '/static/css/normal.css';
@import '/static/font/iconfont.css';
</style>
