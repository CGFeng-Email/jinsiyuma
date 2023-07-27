<!-- 关于我们 -->
<template>
	<view class="container">
		<view class="about_us">
			<view class="video_content border-radius box-shadow">
				<video class="video border-radius box-shadow" :src="video_src" show-mute-btn title="数字发布视频" play-btn-position="center" object-fit="cover"></video>
			</view>
			<view class="company_content">
				<view class="head">
					<text class="title">公司简介</text>
					<text class="icon">/</text>
					<text class="sub">Company Profile</text>
				</view>
				<view class="cover_box" @click="banner_image_prev">
					<image class="cover border-radius box-shadow" :src="about_us_banner" mode="widthFix"></image>
				</view>
				<view class="common_text">
					金丝玉玛瓷砖创立于2006年，是专业从事瓷砖及其相关配套产品的研发、生产、销售、服务于一体的大型现代化陶瓷品牌。聚焦K金瓷砖生产研发，为消费者提供“高端、时尚、奢雅”装修应用解决方案。
				</view>
				<view class="common_text">
					金丝玉玛发展至今已明确“全品类、大品牌”的品牌定位战略，以K金瓷砖作为品牌核心类产品，生产和销售K金星空岩板、K金岩板、K金瓷砖、背景墙、质感砖、肌肤砖、大理石瓷砖等产品。并先后荣获了“高新技术企业”、“中国建筑卫生陶瓷行业K金瓷砖技术研发中心”等荣誉称号。
				</view>
				<view class="head">
					<text class="title">主营产品</text>
					<text class="icon">/</text>
					<text class="sub">Main products</text>
				</view>
				<view class="cover_box list_cover" v-for="(item, index) in list_banner" :key="index" @click="prev_image(index)">
					<image class="cover border-radius box-shadow" :src="item.image" mode="widthFix"></image>
				</view>
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
								v-for="(item, index) in course_date"
								:key="index"
								:id="'item' + index"
								@click="sourse_swiper_item(index)"
							>
								<view class="icon">
									<view class="bg"></view>
								</view>
								<view class="date">{{ item.date }}</view>
							</view>
						</scroll-view>

						<swiper class="swiper news_content" autoplay :interval="3000" :current="course_swiper_index" @change="news_swiper_change">
							<swiper-item class="news_item" v-for="(item, index) in course_date" :key="index">
								<image class="cover border-radius box-shadow" :src="item.cover"></image>
								<view class="news_right">
									{{ item.content }}
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
			video_src: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/MP4/video.mp4',
			about_us_banner: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/history_banner.png', // 关于我们banner
			list_banner: [
				{
					image: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe_banner.png'
				},
				{
					image: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_room_banner.png'
				},
				{
					image: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/me_banner.png'
				}
			],
			// 历史进程下标
			course_swiper_index: 0,
			scroll_into_view: '',
			course_date: [
				{
					date: '1995年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '1996年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/my_subscribe_banner.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '1997年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/product_room_banner.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '1998年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '1999年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/me_banner.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2000年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2001年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2002年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2003年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2004年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2005年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2006年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				},
				{
					date: '2007年',
					cover: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/hostor_cover1.png',
					content:
						'2021年，驶入品牌高速发展快车道，先是金丝玉玛K金岩板奢雅馆盛大开业，继而开启线上直播招商季、首届品牌节告捷、推出K金5.0星空岩板，并参展上海建博会、佛山潭州展、广州设计周，在品宣与招商模式上再上新台阶。'
				}
			]
		};
	},
	methods: {
		// 日期历程回调
		sourse_swiper_item(e) {
			this.course_swiper_index = e;
			this.scroll_into_view = 'item' + e;
		},
		news_swiper_change(e) {
			this.course_swiper_index = e.detail.current;
			this.scroll_into_view = 'item' + e.detail.current;
		},
		banner_image_prev() {
			const list = []
			list.push(this.about_us_banner)
			uni.previewImage({
				urls: list,
				loop: true
			});
		},
		// 预览图片
		prev_image(i) {
			const list = this.list_banner.map(item => {
				return item.image
			})
			uni.previewImage({
				current: i,
				urls: list,
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
				display: flex;
				white-space: nowrap;
				&:after {
					content: '';
					position: absolute;
					top: 58rpx;
					left: 0;
					width: 100%;
					height: 1px;
					background: #cccccc;
					z-index: -1;
				}
				.scroll_item {
					display: inline-block;
					width: 25%;
					padding: 40rpx 0 20rpx 0;
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
