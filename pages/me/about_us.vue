<!-- 关于我们 -->
<template>
	<view class="container">
		<u-loading-page :loading="loading" loading-text="快速加载中..." bg-color="#f8f8f8" fontSize="14" iconSize="36" color="#999" loadingColor="#999"></u-loading-page>
		<view class="about_us">
			<view class="video_content border-radius box-shadow">
				<video class="video border-radius box-shadow" :src="video" show-mute-btn title="数字发布视频" play-btn-position="center" object-fit="cover"></video>
			</view>
			<view class="company_content">
				<view class="head">
					<text class="title">公司简介</text>
					<text class="icon">/</text>
					<text class="sub">Company Profile</text>
				</view>
				<!-- 富文本数据 -->
				<view class="details_content" v-if="about_content">
					<u-parse :content="about_content" :tagStyle="contentStyle" :selectable="true"></u-parse>
				</view>
				<!-- <view class="head">
					<text class="title">主营产品</text>
					<text class="icon">/</text>
					<text class="sub">Main products</text>
				</view> -->
				<!-- 主营产品图片列表 -->
				<!-- <view class="cover_box list_cover" v-for="(item, index) in about_product_list" :key="index" @click="prev_image(index)">
					<image class="cover border-radius box-shadow" :src="item" mode="widthFix"></image>
				</view> -->
				<view class="course_content">
					<view class="head">
						<text class="title">发展历程</text>
						<text class="icon">/</text>
						<text class="sub">Development History</text>
					</view>
					<view class="date_content">
						<scroll-view scroll-x="true" class="scroll_date" :scroll-into-view="scroll_into_view">
							<view
								class="scroll_item"
								:class="index == course_swiper_index ? 'active' : ''"
								v-for="(item, index) in about_history_list"
								:key="index"
								:id="'item' + index"
								@click="sourse_swiper_item(index)"
							>
								<view class="icon">
									<view class="bg"></view>
								</view>
								<view class="date">{{ item.year }}年</view>
							</view>
						</scroll-view>
						<!-- <swiper class="swiper scroll_date" autoplay circular display-multiple-items="4" :interval="5000" :current="course_swiper_index" @change="news_swiper_change">
							<swiper-item class="scroll_item" :class="index == course_swiper_index ? 'active' : ''" v-for="(item, index) in about_history_list" :key="index">
								<view class="icon">
									<view class="bg"></view>
								</view>
								<view class="date">{{ item.year }}年</view>
							</swiper-item>
						</swiper> -->
						<swiper class="swiper news_content" autoplay :interval="5000" :current="course_swiper_index" @change="news_swiper_change">
							<swiper-item class="news_item" v-for="(item, index) in about_history_list" :key="index">
								<image class="cover border-radius box-shadow" :src="item.image"></image>
								<view class="news_right">
									{{ item.remark }}
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true,
			course_swiper_index: 0, // 历史进程下标
			scroll_into_view: '', // 发展历程滚动标识符
			about_history_list: [], // 发展历程列表
			video: '', // 视频
			about_content: '', // 富文本数据
			// 富文本样式
			contentStyle: {
				p: 'font-size: 24rpx !important; color: #181818;line-height: 42rpx; background-color: none;',
				span: 'font-size: 24rpx !important; color: #181818;line-height: 42rpx; background-color: none;',
				img: 'margin: 10rpx 0; display: block; width: 100%;border-radius: 12rpx;',
				image: 'margin: 10rpx 0; display: block; width: 100%;border-radius: 12rpx;'
			},
			about_product_list: [] // 主营产品
		};
	},
	async onLoad() {
		const initial_data = await this.initial();
		this.video = initial_data.about_video;
		this.about_content = initial_data.about_content;
		this.about_product_list = initial_data.about_product_list;
		this.about_history_list = initial_data.about_history_list;
		this.loading = false;
	},
	methods: {
		// 获取关于我们数据
		async initial() {
			return new Promise((resolve, reject) => {
				try {
					const app = getApp();
					resolve(app.globalData);
				} catch (e) {
					reject('获取数据失败，服务器发生错误');
				}
			});
		},
		// 日期历程回调
		sourse_swiper_item(e) {
			this.course_swiper_index = e;
			this.scroll_into_view = 'item' + e;
		},
		// 发展历程回调
		news_swiper_change(e) {
			this.course_swiper_index = e.detail.current;
			this.scroll_into_view = 'item' + e.detail.current;
		},
		// 预览图片
		prev_image(i) {
			uni.previewImage({
				current: i,
				urls: this.about_product_list,
				loop: true
			});
		}
	}
};
</script>

<style lang="less" scoped>
.about_us {
	padding: 20rpx;
	.video_content {
		.video {
			width: 100%;
			height: 396rpx;
		}
	}

	.head {
		padding: 22rpx 0;
		font-size: 30rpx;
		color: #313131;
		.title {
			font-weight: 600;
		}
		.icon {
			padding: 0 12rpx;
		}
	}

	.company_content {
		.common_text {
			font-size: 24rpx;
			font-weight: 400;
			color: #a0a0a0;
			line-height: 38rpx;
			text-indent: 2em;
			padding: 20rpx 0;
		}
		.list_cover {
			margin-bottom: 20rpx;
		}
		.date_content {
			position: relative;
			.scroll_date {
				// height: 80rpx;
				display: flex;
				white-space: nowrap;
				&:after {
					content: '';
					position: absolute;
					top: 15rpx;
					left: 0;
					width: 100%;
					height: 1px;
					background: #cccccc;
					z-index: -1;
				}
				.scroll_item {
					display: inline-block;
					width: 25%;
					padding: 0 0 20rpx 0;
					.icon {
						width: 30rpx;
						height: 30rpx;
						margin: auto;
						margin-bottom: 10rpx;
						background: transparent;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 50%;
						.bg {
							background: #d9d9d9;
							border-radius: 50%;
							width: 18rpx;
							height: 18rpx;
						}
					}
					.date {
						text-align: center;
						font-size: 24rpx;
						font-weight: 400;
						color: #7c7c7c;
					}
				}

				.active {
					.icon {
						background: rgba(10, 43, 78, 0.2);
						transform: translateY(2px);
						.bg {
							background: #0a2b4e;
						}
					}
					.date {
						font-size: 28rpx;
						font-weight: 600;
						color: #0a2b4e;
					}
				}
			}

			.news_content {
				padding: 20rpx 0;
				.news_item {
					display: flex;
					justify-content: space-between;
					.cover {
						width: 306rpx;
						height: 216rpx;
					}
					.news_right {
						flex: 1;
						padding-left: 20rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #464646;
						line-height: 34rpx;
					}
				}
			}
		}
	}
}
</style>
