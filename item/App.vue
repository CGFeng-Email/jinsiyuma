<script>
export default {
	globalData: {
		osName: '', // 设备机型
		statusBarHeight: 0, // 状态栏高度
		windowHeight: 0, // 页面高度
		login_video_src: '', // 登录页视频
		home_logo: '', // 首页logo
		home_video: '', // 首页视频
		product_list_banner: '', // 产品列表banner
		history_banner: '', // 浏览历史banner
		room_banner: '', // 预约量房banner
		design_banner: '', // 预约设计banner
		subscribe_detail_banner: '', // 预约详情banner
		subscribe_store_banner: '', // 预约门店logo
		about_video: '', // 关于我们视频
		about_content: '', // 关于我们文案内容
		about_product_list: [], // 关于我们主营产品列表
		about_history_list: [], // 关乎我们历史进程
		product_scene_title: '', // 产品应用场景标题
		product_spec_title: '', // 产品规格参数标题
		example_scene_title: '', // 案例应用场景标题
		example_spec_title: '', // 案例规格参数标题
		share_banner: '', // 分享banner
		loading_banner: '', //  程序加载banner
		course_banner: '', // 课程banner
		knowledge_vieo: '', // 云课堂学院集视频
		knowledge_video_id: '', // 云课堂学院集视频id
		service_mobile: '', // 客服电话
		official_accounts_logo: '', // 公众号logo
		official_accounts_text: '', // 公众号名称
		official_accounts_link: '' // 公众号链接
	},
	onLaunch: async function () {
		if (wx.getUpdateManager) {
			const updateManager = wx.getUpdateManager();
			updateManager.onCheckForUpdate(function (res) {
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function () {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function (res) {
								if (res.confirm) {
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onUpdateFailed(function () {
						wx.showModal({
							title: '更新提示',
							content: '新版本下载失败，请删除当前小程序，重新搜索打开'
						});
					});
				}
			});
		}
		uni.hideTabBar(); // 隐藏原生tabbar
		await this.init_newwork(); // 网络状态
		await this.get_all_banner(); // 加载基本配置
		await this.get_userAuthorize(); // 授权
		await this.listenForUpdates(); // 监听版本更新
	},
	onShow() {
		uni.hideTabBar(); // 隐藏原生tabbar
	},
	onUnload() {
		this.quit_duration();
	},
	methods: {
		// 监听网络情况
		init_newwork() {
			uni.getNetworkType({
				success: (res) => {
					// console.log('网络状态', res);
					if (res.networkType == 'none') {
						wx.reLaunch({
							url: '/pages/no_network/no_network'
						});
						return;
					}
				}
			});
		},
		// 开启授权
		get_userAuthorize() {
			// 开启地图授权
			// wx.authorize({ scope: 'scope.userLocation', scope: 'scope.address' });

			// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
			wx.getSetting({
				success(res) {
					// 授权获取定位经纬度信息
					if (!res.authSetting['scope.userLocation']) {
						wx.authorize({
							scope: 'scope.userLocation'
						});
					}
					// 授权获取可以打开地图选择位置
					if (!res.authSetting['scope.address']) {
						wx.authorize({
							scope: 'scope.address'
						});
					}
				}
			});
		},
		//监听小程序是否有新版本需要更新
		listenForUpdates() {
			let updateManager = uni.getUpdateManager();
			if (!updateManager) {
				return;
			} else {
				//新版本更新
				if (uni.canIUse('getUpdateManager')) {
					//判断当前微信版本是否支持版本更新

					updateManager.onCheckForUpdate(function (res) {
						if (res.hasUpdate) {
							// 请求完新版本信息的回调
							updateManager.onUpdateReady(function () {
								uni.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function (res) {
										if (res.confirm) {
											// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											updateManager.applyUpdate();
										}
									}
								});
							});
							updateManager.onUpdateFailed(function () {
								uni.showModal({
									// 新的版本下载失败
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~'
								});
							});
						} else {
						}
					});
				} else {
					uni.showModal({
						// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
						title: '溫馨提示',
						content: '当前微信版本过低，部分功能无法使用，请升级到最新微信版本后重试。'
					});
				}
			}
		},
		// 获取各页面banner
		async get_all_banner() {
			const res = await this.$request.post('/common/getPageSet');
			this.globalData.login_video_src = res.login_video;
			this.globalData.home_logo = res.home_logo;
			this.globalData.home_video = res.home_video;
			this.globalData.product_list_banner = res.product_list_banner;
			this.globalData.history_banner = res.history_banner;
			this.globalData.room_banner = res.subscribe_image1;
			this.globalData.design_banner = res.subscribe_image2;
			this.globalData.subscribe_detail_banner = res.subscribe_detail_banner;
			this.globalData.subscribe_store_banner = res.subscribe_store_banner;
			this.globalData.about_video = res.about_video;
			this.globalData.about_content = res.about_content;
			this.globalData.about_product_list = res.about_main_products;
			this.globalData.about_history_list = res.about_history;
			this.globalData.product_scene_title = res.product_scene_title; // 产品应用场景标题
			this.globalData.product_spec_title = res.product_spec_title; // 产品规格参数标题
			this.globalData.example_scene_title = res.example_scene_title; // 案例应用场景标题
			this.globalData.example_spec_title = res.example_spec_title; // 案例规格参数标题
			this.globalData.share_banner = res.share_banner; // 分享
			this.globalData.loading_banner = res.load_page; // 程序加载banner
			this.globalData.course_banner = res.entry_image; // 课程banner
			this.globalData.knowledge_vieo = res.video_video; // 云课堂学院集视频
			this.globalData.knowledge_video_id = res.video_id; // 云课堂学院集视频id
			this.globalData.service_mobile = res.mobile_number; // 客服电话
			this.globalData.official_accounts_logo = res.mine_account_logo;
			this.globalData.official_accounts_text = res.mine_account_name;
			this.globalData.official_accounts_link = res.mine_account_url;
			console.log('App.vue', res);
			this.$isResolve();
		},
		// 退出小程序修改云课堂在线时长
		async quit_duration() {
			const jinsiyuma_token = uni.getStorageSync('jinsiyuma_token');
			const jinsiyuma_user_id = uni.getStorageSync('jinsiyuma_user_id');
			const start_duration_id = uni.getStorageSync('start_duration_id');
			const start_duration = uni.getStorageSync('start_duration');
			// 判断是否有token，是否注册成为云课堂用户
			if (jinsiyuma_token && jinsiyuma_user_id && start_duration_id && start_duration) {
				const date = new Date().getTime();
				const end_duration = (date - start_duration) / 1000;
				const res = await this.$request.post3('/api/time/edit', {
					id: start_duration_id,
					duration: end_duration
				});
				console.log('退出小程序修改云课堂在线时长', res);
				if (res.code == 200) {
					uni.removeStorageSync('start_duration_id');
					uni.removeStorageSync('start_duration');
				}
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
