export default {
	data() {
		return {
			share: {
				title: '金丝玉玛',
				imageUrl: 'https://quanyi-1317202885.cos.ap-guangzhou.myqcloud.com/jinsiyuma/index_banner/index_banner06.png',
			}
		}
	},
	onShareAppMessage(res) { //发送给朋友
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log('按钮', res.target)
		}
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
		}
	},
	onShareTimeline() { //分享到朋友圈
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
		}
	},
}