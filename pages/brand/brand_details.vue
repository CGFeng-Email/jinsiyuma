<!-- 品牌详情 -->
<template>
	<view class="container">
		<view class="brand_details">
			<FIXEDNAVBAR :navbar_title="navbar_title"></FIXEDNAVBAR>
			<view class="brand_details_title">金丝玉玛携手中国航天逐梦九天，展现智造新力量！</view>
			<view class="time_box">
				<view class="left">金丝玉玛陶瓷</view>
				<view class="time">发布时间：2022-07-12</view>
			</view>
			<view class="video_content border-radius box-shadow">
				<video class="video border-radius box-shadow" :src="video_src" show-mute-btn title="数字发布视频" play-btn-position="center" object-fit="cover"></video>
			</view>
			
			<view class="common_text">
				2022年，对我国航空航天事业是一个特别的年份。至此，我国载人航天工程立项整整30年。习近平总书记不止一次谈到“航天梦”，多次对航天事业发展提出重要指示，每一个航天工程都承载着14亿中国人的梦想，每一个航天工程都是我们中国人的骄傲。
			</view>
			<view class="common_cover" @click="details_image(0)">
				<image class="cover border-radius box-shadow" :src="list_cover[0]" mode="widthFix"></image>
			</view>
			<view class="common_text">
				为了传承航天精神和传递航天情怀，传播航天文化和传授航天知识，2022中国航天科普巡展正式开启。在中国航天科普公益巡展组委会的严格把关下，金丝玉玛瓷砖凭借良好的企业信誉、卓越的技术智造、精益求精的工匠精神、创新的星空产品理念，成为入选2022年中国航天科普公益巡展联合宣传伙伴。这是一个企业品牌实力的彰显，更是一场关乎将浩瀚星辰带到千家万户的愿景落地。
			</view>
			<view class="common_cover" @click="details_image(1)">
				<image class="cover border-radius box-shadow" :src="list_cover[1]" mode="widthFix"></image>
			</view>
			<view class="common_cover" @click="details_image(2)">
				<image class="cover border-radius box-shadow" :src="list_cover[2]" mode="widthFix"></image>
			</view>
			
			<!-- 底部资料 -->
			<view class="up_content border-radius box-shadow">
				<view class="head">
					<text class="text title">收录于合集</text>
					<text class="text link">#新闻中心</text>
					<text class="text see">76</text>
				</view>
				<view class="b_content">
					<view class="b_box">
						<view class="up">
							<i class="iconfont icon-left"></i>
							<text class="up_title">上一篇</text>
						</view>
						<view class="up_text over2">第一手猛料！广州设计周金丝玉玛星空瓷砖</view>
					</view>
					<view class="line"></view>
					<view class="b_box">
						<view class="up text_right">
							<text class="up_title">下一篇</text>
							<i class="iconfont icon-right-1-copy"></i>
						</view>
						<view class="up_text over2">第一手猛料！广州设计周金丝玉玛星空瓷砖</view>
					</view>
				</view>
			</view>
			<view class="read_text">
				<text class="text">阅读</text>
				<text class="num">3827</text>
			</view>
			<view class="thumbs_up">
				<view class="icon">
					<i class="iconfont icon-dianzan6" v-if="true"></i>
					<i class="iconfont icon-yizan" v-else></i>
					<text class="num">256</text>
				</view>
			</view>
			<view class="pay_close">
				<view class="left">
					<image class="logo" :src="my_logo" mode="widthFix"></image>
					<view class="content">
						<view class="c_title">金丝玉玛陶瓷</view>
						<view class="desc">2篇原创内容</view>
					</view>
				</view>
				<view class="pay_close_btn box-shadow">关注</view>
			</view>
			<view class="bottom_textarea">
				<text class="text" @click="textarea_show = true">写留言</text>
			</view>
			<u-popup :show="textarea_show" @close="textarea_popup_close" mode="center" closeable round="8">
				<view class="textarea_content">
					<view class="textarea_title">留言反馈</view>
					<view class="teatarea_box border-radius">
						<u--textarea v-model="teatarear" placeholder="请输入内容" count @input="textarea_input" @confirm="textarea_confirm"></u--textarea>
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
			video_src: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/MP4/video.mp4',
			list_cover: [
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/history_banner.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe_banner.png',
				'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_room_banner.png'
			],
			teatarear: '', // 留言
			textarea_show: false
		};
	},
	methods: {
		textarea_input(e) {
			this.teatarear = e;
		},
		textarea_popup_close() {
			this.teatarear = '';
			this.textarea_show = false;
		},
		textarea_btn() {
			uni.showLoading({
				title: '正在留言'
			});
			setTimeout(() => {
				this.teatarear = '';
				this.textarea_show = false;
				uni.hideLoading();
			}, 800);
		},
		textarea_confirm() {
			uni.showLoading({
				title: '正在留言'
			});
			setTimeout(() => {
				this.teatarear = '';
				this.textarea_show = false;
				uni.hideLoading();
			}, 800);
		},
		details_image(i) {
			uni.previewImage({
				current: i,
				loop: true,
				urls: this.list_cover
			})
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
			text-align: center;
			.iconfont {
				font-size: 28rpx;
				color: #a7a7a7;
			}
			.num {
				font-size: 24rpx;
				color: #a7a7a7;
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
