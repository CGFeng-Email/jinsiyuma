<!-- 活动馆详情 -->
<template>
	<view class="details">
		<u-transition :show="true" mode="fade">
			<view class="title">{{ details.name }}</view>
			<view class="function">
				<view class="left">
					<view class="see box">
						<i class="iconfont icon-kanguos"></i>
						<text class="text">{{ details.watchCount }}</text>
					</view>
					<view class="support box">
						<i class="iconfont icon-dianzan6"></i>
						<text class="text">{{ details.likeCount }}</text>
					</view>
					<view class="time box">
						<i class="iconfont icon-shijian"></i>
						<text class="text">{{ details.createTime | secondsFormat }}</text>
					</view>
				</view>
				<view class="collect">
					<!-- 收藏 -->
					<u-button icon="heart-fill" text="收藏" throttleTime="700" :color="is_collect ? '#0A2B4E' : '#B9B9B9'" :iconColor="is_collect ? '#ff0000' : '#fff'" @click="click_collect"></u-button>
				</view>
			</view>
			<view class="cover_box">
				<image class="cover" :src="details.cover" mode="widthFix"></image>
			</view>
			<view class="content">
				<u-parse :content="details.text" :selectable="true" :tagStyle="style" @linkTap="linkTap"></u-parse>
			</view>
			<!-- 点赞 -->
			<view class="support_content">
				<view class="box" :class="status == 1 ? 'active' : ''" @click="click_praise">
					<i class="iconfont icon-dianzan6" v-if="status == 0"></i>
					<i class="iconfont icon-yizan" v-else></i>
				</view>
				<view class="name" v-if="status == 1">感谢您的认可</view>
				<view class="name" v-else>点个赞吧~</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
import { secondsFormat } from '@/utils/regular.js';
export default {
	data() {
		return {
			id: '', // 详情id
			type: 2, // 2:图文, 3:活动
			status: 0, // 点赞状态
			style: {
				p: 'color: #000; font-size:24rpx; line-height: 38rpx;margin-bottom: 20rpx; background-color: none !important; word-wrap: break-word; word-break: break-all;',
				span: 'color: #000; font-size:24rpx; line-height: 38rpx;margin-bottom: 20rpx; background-color: none !important; break-word; word-break: break-all;',
				a: 'color: #608dbf; font-size:24rpx; line-height: 38rpx;margin-bottom: 20rpx; background-color: none !important; break-word; word-break: break-all;',
				img: 'margin: 10rpx 0; display: block; width: 100%;border-radius: 16rpx;',
				image: 'margin: 10rpx 0; display: block; width: 100%;border-radius: 16rpx;'
			},
			is_collect: 0, // 是否收藏课程
			details: {}
		};
	},
	filters: { secondsFormat },
	onLoad(e) {
		console.log('参数', e);
		this.type = e.type;
		this.id = e.id;
		this.get_details();
		this.get_status();
		this.get_collect();
	},
	methods: {
		// 获取详情数据
		async get_details() {
			const res = await this.$request.get2('/api/graphic/detail', {
				id: this.id
			});
			console.log('详情数据', res);
			if (res.code == 200) {
				this.details = res.data;
			}
		},
		// 获取收藏状态
		async get_collect() {
			const res = await this.$request.get2('/api/collect/check', {
				type: this.type,
				typeId: this.id
			});
			console.log('获取收藏状态', res);
			if (res.code == 200) {
				if (!res.data) {
					this.is_collect = 0;
				} else {
					this.is_collect = res.data.type;
				}
			}
		},
		// 切换收藏
		async click_collect() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			const is_collect = this.is_collect;
			if (is_collect) {
				const cancel = await this.$request.post3('/api/collect/del', {
					type: this.type,
					typeId: this.id
				});
				console.log('取消收藏', cancel);
				await this.get_collect();
			} else {
				const confirm = await this.$request.post3('/api/collect/add', {
					type: this.type,
					typeId: this.id
				});
				console.log('新增收藏', confirm);
				await this.get_collect();
			}
			uni.hideLoading();
		},

		// 跳转百度网盘
		linkTap(e) {
			if (e.href) {
				uni.navigateToMiniProgram({
					shortLink: e.href,
					success: (res) => {
						console.log('res', res);
					}
				});
			} else {
				uni.showToast({
					title: '跳转出错，网盘链接出错或为空',
					icon: 'none',
					duration: 2000
				});
			}
		},
		// 点赞切换
		async click_praise() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			const res = await this.$request.post3('/api/graphic/like', {
				type: this.type,
				typeId: this.id
			});
			console.log('点赞切换', res);
			if (res.code) {
				if (res.data) {
					this.status = 1;
				} else {
					this.status = 0;
				}
			}
			uni.hideLoading();
		},
		// 获取点赞状态
		async get_status() {
			const res = await this.$request.post3('/api/graphic/check', {
				type: this.type,
				typeId: this.id
			});
			console.log('点赞状态', res);
			if (res.code == 200) {
				if (res.data) {
					this.status = 1;
				} else {
					this.status = 0;
				}
			}
		}
	}
};
</script>

<style lang="less" scoped>
.details {
	padding: 30rpx;
	.title {
		font-size: 36rpx;
		line-height: 46rpx;
		color: #000;
		font-weight: 600;
	}

	.function {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0;
		.left {
			display: flex;
			align-items: center;
		}
		.box {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #828282;
			padding: 20rpx 20rpx 20rpx 0;
			.iconfont {
				font-size: 28rpx;
				color: #828282;
			}
			.text {
				padding-left: 6rpx;
			}
		}
		.collect {
			/deep/ .u-button {
				width: 120rpx !important;
				height: 54rpx !important;
				margin: 0 !important;
				padding: 0 !important;
				.u-icon__icon {
					font-size: 14px !important;
				}
				.u-button__text {
					font-size: 12px !important;
				}
			}
		}
	}

	.cover_box {
		margin-bottom: 20rpx;
		.cover {
			border-radius: 12rpx;
			overflow: hidden;
		}
	}

	.content {
		.lead {
			font-size: 24rpx;
			line-height: 36rpx;
			color: #000;
			margin-bottom: 20rpx;
		}
		.link_box {
			margin-bottom: 20rpx;
			.title {
				font-size: 24rpx;
				line-height: 36rpx;
				color: #000;
			}
			.link {
				font-size: 24rpx;
				line-height: 36rpx;
				color: #608dbf;
				.iconfont {
					display: inline-block;
				}
				.text {
					padding-left: 6rpx;
					white-space: break-spaces;
					word-wrap: break-word;
					word-break: break-all;
				}
			}
		}
	}

	.support_content {
		padding: 30rpx 0;
		text-align: center;
		.box {
			display: inline-block;
			width: 70rpx;
			height: 70rpx;
			border: 1px solid #e3e3e3;
			text-align: center;
			line-height: 70rpx;
			border-radius: 50%;

			.icon-yizan {
				color: #ffaa00;
			}
		}

		.active {
			border: 1px solid #ffaa00;
		}

		.name {
			padding: 14rpx 0;
			font-size: 24rpx;
			color: #000;
		}
	}
}
</style>
