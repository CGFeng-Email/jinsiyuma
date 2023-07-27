<!-- 预约量房 -->
<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view class="room" v-if="!loading">
			<FIXEDNAVBAR :navbar_title="navbar_title"></FIXEDNAVBAR>
			<view class="cover_box">
				<image class="cover" :src="banner" mode="widthFix"></image>
			</view>
			<view class="form_content">
				<u--form labelPosition="left" :model="model" :rules="rules" ref="uForm" labelWidth="80" :borderBottom="false" :errorType="errorType" :labelStyle="labelStyle">
					<u-form-item label="您的称呼" prop="name">
						<u--input color="#313131" placeholderClass="placeholderClass" v-model="model.name" border="none" placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="手机号*" prop="phone">
						<u--input color="#313131" placeholderClass="placeholderClass" type="number" v-model="model.phone" border="none" placeholder="请输入手机号"></u--input>
					</u-form-item>
					<u-form-item label="预约时间" prop="date" @click="date_show = true">
						<u--input color="#313131" placeholderClass="placeholderClass" v-model="model.date" border="none" placeholder="请选择" disabled></u--input>
						<u-icon slot="right" name="arrow-right" color="#CECECE"></u-icon>
					</u-form-item>
					<u-form-item label="所在地区" prop="map">
						<picker mode="region" @change="bindRegionChange" :custom-item="customItem">
							<u--input color="#313131" placeholderClass="placeholderClass" v-model="model.map" border="none" placeholder="请选择"></u--input>
						</picker>
						<u-icon slot="right" name="arrow-right" color="#CECECE"></u-icon>
					</u-form-item>
					<u-form-item label="详细地址" prop="address">
						<u--input color="#313131" placeholderClass="placeholderClass" v-model="model.address" border="none" placeholder="街道、楼牌号等"></u--input>
					</u-form-item>
					<view class="get_mapinfo" @click="getAddress">
						<view class="g_content">
							<i class="iconfont icon-weixin"></i>
							<text class="text">使用微信地址</text>
						</view>
					</view>
				</u--form>
			</view>
			<view class="btn_content">
				<view class="btn">
					<u-button shape="circle" :throttleTime="200" color="#0A2B4E" @click="open_success">立即预约</u-button>
				</view>
				<view class="btn">
					<u-button shape="circle" :throttleTime="200" plain @click="open_subscribe">我的预约</u-button>
				</view>
			</view>
		</view>
		<u-calendar :show="date_show" @confirm="dateconfirm" color="#0A2B4E" showLunar title="预约时间" closeOnClickOverlay round="12" @close="date_show = false"></u-calendar>
	</view>
</template>

<script>
import FIXEDNAVBAR from '@/components/fixed_navbar.vue';
export default {
	components: { FIXEDNAVBAR },
	data() {
		return {
			loading: true,
			navbar_title: '预约量房',
			banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_room_banner.png',
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
				address: ''
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
				address: {
					type: 'string',
					required: true,
					message: '请输入详细地址',
					trigger: ['blur', 'change']
				},
				time: {
					type: 'string',
					required: true,
					message: '请选择日期',
					trigger: ['blur', 'change']
				}
			},
			customItem: '全部'
		};
	},
	onLoad() {
		setTimeout(() => {
			this.loading = false
		}, 800);
	},
	methods: {
		dateconfirm(e) {
			console.log(e);
			this.model.date = e[0];
			this.date_show = false;
		},
		bindRegionChange: function (e) {
			console.log(e);
			this.model.map = e.detail.value;
		},
		getAddress() {
			console.log('123');
			uni.chooseAddress({
				success: (res) => {
					console.log('res', res);
					this.model.name = res.userName;
					const arr = ['', '', ''];
					arr[0] = res.provinceName;
					arr[1] = res.cityName;
					arr[2] = res.countyName;
					this.model.map = arr;
					this.model.phone = res.telNumber;
					this.model.address = res.detailInfo;
				}
			});
		},
		open_success() {
			uni.navigateTo({
				url: '/pages/product/success'
			})
		},
		open_subscribe() {
			uni.navigateTo({
				url: '/pages/product/my_subscribe'
			})
		},
		submit() {
			this.$refs.uForm
				.validate()
				.then((res) => {
					// uni.$u.toast('校验通过');
				})
				.catch((errors) => {
					// uni.$u.toast('校验失败');
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
		.get_mapinfo {
			padding-left: 150rpx;
			.g_content {
				display: inline-block;
				display: flex;
				align-items: center;
				padding: 10rpx;
				.iconfont {
					font-size: 32rpx;
					color: #28c445;
				}
				.text {
					font-size: 30rpx;
					font-weight: 500;
					color: #c0c4cc;
					padding-left: 14rpx;
				}
			}
		}

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