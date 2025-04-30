<!-- 品牌详情 -->
<template>
	<view class="container">
		<FIXEDNAVBAR :navbar_title="navbar_title"></FIXEDNAVBAR>
		<EMPTY v-if="empty"></EMPTY>
		<view v-else class="brand_details">
			<view class="brand_details_title">{{ detail.title }}</view>
			<view class="time_box">
				<view class="left">{{ detail.author }}</view>
				<view class="time">发布时间：{{ detail.publish_date }}</view>
			</view>

			<!-- 视频 -->
			<view class="video_content border-radius box-shadow">
				<video class="video border-radius box-shadow" :src="detail.video" show-mute-btn title="金丝玉玛发布视频" play-btn-position="center" object-fit="cover"></video>
			</view>

			<!-- 文案内容 -->
			<view class="content_wrap">
				<u-parse :content="detail.content" :tagStyle="style" :selectable="true"></u-parse>
			</view>

			<!-- 详情图片 -->
			<view class="common_cover" @click="details_image(index)" v-for="(item, index) in detail.content_images" :key="index">
				<image class="cover border-radius box-shadow" :src="item" mode="widthFix"></image>
			</view>

			<!-- 底部资料 -->
			<view class="up_content border-radius box-shadow">
				<view class="head">
					<text class="text title">收录于合集</text>
					<text class="text link">#新闻中心</text>
					<!-- <text class="text see">76</text> -->
				</view>
				<view class="b_content">
					<view class="b_box" @click="prev(detail.pre_row.id)">
						<view class="up">
							<i class="iconfont icon-left"></i>
							<text class="up_title">上一篇</text>
						</view>
						<view class="up_text over2">{{ detail.pre_row.title }}</view>
					</view>
					<view class="line"></view>
					<view class="b_box" @click="next(detail.next_row.id)">
						<view class="up text_right">
							<text class="up_title">下一篇</text>
							<i class="iconfont icon-right-1-copy"></i>
						</view>
						<view class="up_text over2">{{ detail.next_row.title }}</view>
					</view>
				</view>
			</view>
			<view class="read_text">
				<text class="text">阅读</text>
				<text class="num">{{ detail.click }}</text>
			</view>
			<view class="thumbs_up">
				<view class="icon" @click="isCollect">
					<i v-if="detail.is_collect == 0" class="iconfont icon-shoucang2"></i>
					<i v-else class="iconfont icon-shoucang3 active"></i>
					<text class="text" :class="detail.is_collect == 1 ? 'active' : ''">收藏</text>
				</view>
			</view>
			<view class="pay_close">
				<view class="left">
					<image class="logo" :src="my_logo" mode="widthFix"></image>
					<view class="content">
						<view class="c_title">{{ detail.author }}</view>
						<view class="desc">原创内容</view>
					</view>
				</view>
				<!-- <view class="pay_close_btn box-shadow">关注</view> -->
			</view>
			<view class="bottom_textarea">
				<text class="text" @click="textarea_show = true">写留言</text>
			</view>
			<u-popup :show="textarea_show" @close="textarea_popup_close" mode="center" closeable round="8">
				<view class="textarea_content">
					<view class="textarea_title">留言反馈</view>
					<view class="teatarea_box border-radius">
						<u--textarea v-model="teatarear" placeholder="请输入内容" count @input="textarea_input" @confirm="textarea_btn"></u--textarea>
					</view>
					<view class="textarea_btn" @click="textarea_btn">确认</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
import FIXEDNAVBAR from '../../components/fixed_navbar.vue';
export default {
	components: { FIXEDNAVBAR },
	data() {
		return {
			my_logo: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/me_logo.png',
			navbar_title: '品牌详情',
			teatarear: '', // 留言
			textarea_show: false,
			detail: {},
			style: {
				p: 'font-size: 24rpx !important;color: #181818 !important;line-height: 42rpx !important;background-color: none !important;',
				span: 'font-size: 24rpx !important;color: #181818 !important;line-height: 42rpx !important;background-color: none !important;',
				img: 'margin: 10rpx 0; display: block; width: 100%;border-radius: 16rpx;',
				image: 'margin: 10rpx 0; display: block; width: 100%;border-radius: 16rpx;'
			},
			empty: false
		};
	},
	onLoad(e) {
		this.get_data(e.id);
	},
	methods: {
		textarea_input(e) {
			this.teatarear = e;
		},
		textarea_popup_close() {
			this.teatarear = '';
			this.textarea_show = false;
		},
		async textarea_btn() {
			const teatarear = this.teatarear;
			if (!teatarear) {
				uni.showToast({
					title: '请输入内容',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.showLoading({
				title: '正在留言'
			});
			const res = await this.$request.post('/article/submitComment', {
				article_id: this.detail.id,
				content: this.teatarear
			});
			this.teatarear = '';
			this.textarea_show = false;
			uni.hideLoading();
		},
		// 大图预览
		details_image(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.detail.content_images
			});
		},
		async get_data(id) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			const res = await this.$request.post('/article/detail', { id });
			console.log('详情', res);
			this.detail = res;
			if (res.length <= 0) {
				this.empty = true;
			}
			uni.hideLoading();
		},
		prev(id) {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 10
			});
			this.get_data(id);
		},
		next(id) {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 10
			});
			this.get_data(id);
		},
		// 收藏
		async isCollect() {
			let collect = this.detail.is_collect == 0 ? 1 : 0;
			const res = await this.$request.post('/article/setCollect', {
				id: this.detail.id,
				type: collect
			});
			this.detail.is_collect = collect;
		}
	}
};
</script>

<style lang="less" scoped>
.brand_details {
	padding: 20rpx;
	.brand_details_title {
		font-size: 40rpx;
		font-weight: 600;
		color: #313131;
		line-height: 56rpx;
	}
	.time_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		.left {
			font-size: 28rpx;
			font-weight: 400;
			color: #5b6b8c;
			line-height: 39rpx;
		}
		.time {
			font-size: 22rpx;
			font-weight: 400;
			color: #a7a7a7;
			line-height: 36rpx;
		}
	}
	.video_content {
		margin-top: 20rpx;
		.video {
			width: 100%;
			height: 396rpx;
		}
	}
	.common_text {
		font-size: 24rpx;
		font-weight: 400;
		color: #181818;
		line-height: 42rpx;
		padding: 20rpx 0;
	}
	.common_cover {
		margin-bottom: 20rpx;
		.cover {
			width: 100%;
		}
	}
	.up_content {
		margin-top: 40rpx;
		padding: 20rpx;
		background: #f8f8f8;
		.head {
			padding-bottom: 30rpx;
			.text {
				font-size: 24rpx;
				color: #a7a7a7;
			}
			.link {
				color: #5b6b8c;
				padding: 0 6rpx;
			}
		}
		.b_content {
			padding-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.iconfont {
				color: #a7a7a7;
			}
			.b_box {
				width: 48%;
				.up {
					font-size: 26rpx;
					font-weight: 600;
					padding-bottom: 20rpx;
					.text {
						padding: 0 10rpx;
						color: #313131;
					}
					.iconfont {
						display: inline-block;
						color: #313131;
					}
				}
				.up_text {
					height: 80rpx;
					color: #313131;
					font-size: 24rpx;
					font-weight: 600;
					color: #181818;
					line-height: 38rpx;
				}
			}
			.icon-shuxian1 {
				margin: 0 20rpx;
				line-height: 56rpx;
			}
			.line {
				width: 1px;
				height: 100rpx;
				background: #ccc;
				margin: 0 36rpx;
			}
		}
	}
	.read_text {
		padding: 20rpx 0;
		font-size: 24rpx;
		color: #a7a7a7;
		.text {
			padding-right: 8rpx;
		}
	}
	.thumbs_up {
		display: flex;
		justify-content: flex-end;
		.icon {
			padding: 0 0 10rpx 20rpx;
			text-align: center;
			.iconfont {
				font-size: 32rpx;
				color: #a7a7a7;
			}
			.num {
				font-size: 24rpx;
				color: #a7a7a7;
			}
			.white {
				color: #fff;
			}
			.text {
				font-size: 24rpx;
				color: #a7a7a7;
			}
			.active {
				color: #0a2b4e;
			}
		}
	}
	.pay_close {
		margin-top: 30rpx;
		border-top: 1px solid #f8f8f8;
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			display: flex;
			align-items: center;
			.logo {
				width: 80rpx;
				height: 80rpx;
			}
			.content {
				padding: 0 20rpx;
				.c_title {
					font-size: 28rpx;
					font-weight: 600;
					color: #181818;
				}
				.desc {
					font-size: 24rpx;
					color: #a7a7a7;
					padding-top: 6rpx;
				}
			}
		}
		.pay_close_btn {
			border-radius: 8rpx;
			padding: 12rpx 36rpx;
			color: #fff;
			font-size: 24rpx;
			background: #08bf5f;
		}
	}
	.bottom_textarea {
		padding: 50rpx 0;
		background: #ededed;
		text-align: center;
		.text {
			padding: 20rpx;
			display: inline-block;
			color: #5b6b8c;
			font-size: 26rpx;
		}
	}

	.textarea_content {
		padding: 20rpx;
		width: 550rpx;
		.textarea_title {
			text-align: center;
			padding: 20rpx 0;
			font-weight: 600;
			font-size: 28rpx;
			color: #181818;
		}
		/deep/ .u-textarea {
			background-color: none;
		}
		.teatarea_box {
			margin: 30rpx 0;
			padding: 3px;
		}
		.textarea_btn {
			height: 80rpx;
			background: #0a2b4e;
			color: #fff;
			font-size: 32rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 46rpx;
		}
	}
	/deep/ .u-safe-bottom {
		display: none;
	}
}
</style>
