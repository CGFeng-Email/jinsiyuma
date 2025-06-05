<!-- 预约设计 -->
<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view class="room" v-if="!loading">
			<FIXEDNAVBAR :navbar_title="navbar_title" :iconColor="true"></FIXEDNAVBAR>
			<view class="cover_box">
				<image class="cover" :src="banner" mode="widthFix"></image>
			</view>
			<view class="form_content">
				<u--form labelPosition="left" :model="model" :rules="rules" ref="uForm" labelWidth="80" :borderBottom="false" :errorType="errorType" :labelStyle="labelStyle">
					<u-form-item label="您的称呼" prop="name">
						<u--input color="#313131" placeholderClass="placeholderClass" v-model="model.name" border="none" placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="手机号" prop="phone">
						<u--input
							color="#313131"
							placeholderClass="placeholderClass"
							type="number"
							v-model="model.phone"
							maxlength="11"
							border="none"
							placeholder="请输入手机号"
						></u--input>
					</u-form-item>
					<u-form-item label="预约时间" prop="date">
						<picker mode="date" @change="date_change">
							<u--input color="#313131" placeholderClass="placeholderClass" v-model="model.date" border="none" placeholder="请选择" disabled></u--input>
						</picker>
						<u-icon slot="right" name="arrow-right" color="#CECECE"></u-icon>
					</u-form-item>
					<u-form-item label="预约门店" prop="map">
						<picker mode="selector" @change="bindPickShop" :range="shop_list" range-key="title" :value="shop_index">
							<u--input color="#313131" placeholderClass="placeholderClass" v-model="model.map" border="none" placeholder="请选择"></u--input>
						</picker>
						<i slot="right" name="arrow-right" class="iconfont icon-daohang"></i>
					</u-form-item>
				</u--form>
			</view>
			<view class="btn_content">
				<view class="btn">
					<u-button @click="submit" shape="circle" :throttleTime="200" color="#0A2B4E">立即预约</u-button>
				</view>
				<view class="btn">
					<u-button @click="open_subscribe" shape="circle" :throttleTime="200" plain>我的预约</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
export default {
	components: { FIXEDNAVBAR },
	data() {
		return {
			loading: true,
			navbar_title: '预约设计',
			banner: '',
			errorType: 'toast',
			date_show: false,
			labelStyle: {
				fontWeight: 600
			},
			model: {
				name: '',
				phone: null,
				map: '',
				date: '',
				store_id: '' //门店id
			},
			rules: {
				name: {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				},
				phone: {
					type: 'number',
					required: true,
					message: '手机号码不正确',
					len: 11,
					trigger: ['blur', 'change']
				},
				map: {
					type: 'string',
					required: true,
					message: '请选择地区',
					trigger: ['blur', 'change']
				},
				time: {
					type: 'string',
					required: true,
					message: '请选择日期',
					trigger: ['blur', 'change']
				}
			},
			shop_list: [], // 门店列表
			shop_index: 0 // 门店列表下标
		};
	},
	async onLoad(e) {
		await this.initial(e);
		await this.get_shop_list();
		this.loading = false;
	},
	methods: {
		// 初始化
		async initial(e) {
			console.log('參數', e);
			return new Promise((resolve, reject) => {
				try {
					const app = getApp();
					this.banner = app.globalData.design_banner;
					this.model.date = e.date;
					this.model.store_id = e.id;
					this.model.map = e.title;
					this.model.phone = uni.getStorageSync('mobile');
					resolve();
				} catch (e) {
					reject('服务器发生错误')
				}
			});
		},
		// 预约时间回调
		date_change(e) {
			this.model.date = e.detail.value;
		},
		// 获取门店列表
		async get_shop_list() {
			const res = await this.$request.post('/store/getLetterList');
			const list = [];
			const total_list = [];
			for (let key in res) {
				const obj = {
					key,
					list: res[key]
				};
				list.push(obj);
			}
			list.forEach((item) => {
				item.list.forEach((item2) => {
					total_list.push({
						id: item2.id,
						title: item2.title
					});
				});
			});
			this.shop_list = total_list;
		},
		// 门店选择回调
		bindPickShop: function (e) {
			this.shop_index = e.detail.value;
			this.model.map = this.shop_list[this.shop_index].title;
			this.model.store_id = this.shop_list[this.shop_index].id;
		},
		// 跳转我的预约
		open_subscribe() {
			uni.navigateTo({
				url: `/pages/product/my_subscribe?index=${1}`
			});
		},
		// 提交预约
		submit() {
			this.$refs.uForm.validate().then(async (res) => {
				uni.showLoading({
					title: '加载中'
				});
				const model = this.model;
				const params = {
					real_name: model.name,
					mobile: model.phone,
					subscribe_date: model.date,
					store_id: model.store_id
				};
				const data = await this.$request.post2('/subscribe/design', params);
				uni.hideLoading();
				if (data.code == 1) {
					uni.redirectTo({
						url: '/pages/product/success'
					});
				} else {
					uni.showToast({
						title: data.msg,
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.room {
	height: 100vh;
	padding-bottom: 310rpx;
	.form_content {
		padding: 30rpx 44rpx;
		background: #fff;
		transform: translateY(-24rpx);
		border-radius: 24rpx 24rpx 0 0;

		/deep/ .u-input {
			background: #fff;
		}

		/deep/ input {
			font-weight: 600;
			background: #fff;
		}

		/deep/ .placeholderClass {
			color: #a7a7a7;
			font-weight: normal;
		}
		.icon-daohang {
			color: #0a2b4e;
			font-size: 32rpx;
		}
	}
	.btn_content {
		position: fixed;
		bottom: 30rpx;
		left: 0;
		width: 100%;
		z-index: 8;
		padding: 0 20rpx;
		.btn {
			margin-bottom: 30rpx;
			/deep/ button {
				height: 100rpx;
				font-size: 28rpx;
				color: #464646;
				box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.1);
			}
		}
	}
}
</style>
