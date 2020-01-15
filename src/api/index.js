import * as url from './urlConfig'
import axios from 'axios'
// import { response } from 'express'

export const commonApi = {
	getPartition() {
		return axios.get(url.getPartition).then((response) => {
			return response.data
		})
	},
	sendMessage(param) {
		return axios.get(url.sendMessage+'?phone='+param.phone).then((response) => {
			return response.data
		})
	},
	userNameIsExist(username) {
		return axios.get(url.userNameIsExist+'?userName='+username).then((response) => {
			return response.data
		})
	},
	nickNameIsExist(nickname) {
		return axios.get(url.nickNameIsExist+'?nickName='+nickname).then((response) => {
			return response.data
		})
	},
	comparePassword(param) {
		return axios.post(url.comparePassword, param).then((response) => {
			return response.data
		})
	},
	attention(param) {
		return axios.post(url.attention, param).then((response) => {
			return response.data
		})
	},
	cancelAttention(param) {
		return axios.post(url.cancelAttention, param).then((response) => {
			return response.data
		})
	},
	attentionState(param) {
		return axios.post(url.attentionState, param).then((response) => {
			return response.data
		})
	},
	watch(videoId) {
		return axios.get(url.watch+'?videoId='+videoId).then((response) => {
			return response.data
		})
	}
}

export const homeApi = {
	search(param) {
		return axios.post(url.search, param).then((response) => {
			return response.data
		})
	},
	searchUser(param) {
		return axios.post(url.searchUser, param).then((response) => {
			return response.data
		})
	},
	searchVideo(param) {
		return axios.post(url.searchVideo, param).then((response) => {
			return response.data
		})
	}
}

export const loginApi = {
	login(param) {
		return axios.post(url.login, param).then((response) => {
			return response
		})
	},
	logout() {
		return axios.get(url.logout).then((response) => {
			return response.status
		})
	}
}

export const registerApi = {
	register(param) {
		return axios.post(url.register, param).then((response) => {
			return response.data
		}).catch((error) => {
			console.log('register error',error)
		})
	}
}

export const videoApi = {
	videoInfo(id) {
		return axios.get(url.videoInfo+id).then((response) => {
			return response.data
		})
	},
	getComment(param) {
		return axios.get(url.getComment+'?videoId='+param.videoId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	tag(videoId) {
		return axios.get(url.tag+'?videoId='+videoId).then((response) => {
			return response.data
		})
	},
	relevant(param) {
		return axios.post(url.relevant, param).then((response) => {
			return response.data
		})
	},
	videoPraise(param) {
		return axios.post(url.videoPraise, param).then((response) => {
			return response.data
		})
	},
	commentPraise(param) {
		return axios.post(url.commentPraise, param).then((response) => {
			return response.data
		})
	},
	videoCollect(param) {
		return axios.post(url.videoCollect, param).then((response) => {
			return response.data
		})
	},
	comment(param) {
		return axios.post(url.comment, param).then((response) => {
			return response.data
		})
	},
	likeState(param) {
		return axios.post(url.likeState, param).then((response) => {
			return response.data
		})
	}
}

export const centerApi = {
	updateInfo(param) {
		return axios.post(url.updateInfo, param).then((response) => {
			return response.data
		})
	},
	updatePassword(param) {
		return axios.post(url.updatePassword, param).then((response) => {
			return response.data
		})
	},
	updateIcon(param) {
		return axios.post(url.updateIcon, param).then((response) => {
			return response.data
		})
	},
	updateEmail(param) {
		return axios.post(url.updateEmail, param).then((response) => {
			return response.data
		})
	},
	updatePhone(param) {
		return axios.post(url.updatePhone, param).then((response) => {
			return response.data
		})
	}
}

export const spaceApi = {
	getInfo(userId) {
		return axios.get(url.getInfo+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	spaceVideo(param) {
		return axios.get(url.spaceVideo+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	mostPlay(param) {
		return axios.get(url.mostPlay+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	mostCollect(param) {
		return axios.get(url.mostCollect+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	videoNum(userId) {
		return axios.get(url.videoNum+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	underReview(param) {
		return axios.get(url.underReview+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	underReviewNum(userId) {
		return axios.get(url.underReviewNum+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	deletedVideo(param) {
		return axios.get(url.deletedVideo+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	deletedNum(userId) {
		return axios.get(url.deletedNum+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	spaceFav(param) {
		return axios.get(url.fav+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	favTotal(userId) {
		return axios.get(url.favTotal+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	favNum(userId) {
		return axios.get(url.favNum+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	cancelCollect(param) {
		return axios.post(url.cancelCollect, param).then((response) => {
			return response.data
		})
	},
	collectState(param) {
		return axios.post(url.collectState, param).then((response) => {
			return response.data
		})
	},
	favMostPlay(param) {
		return axios.get(url.favMostPlay+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	newUpload(param) {
		return axios.get(url.newUpload+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	userTags(userId) {
		return axios.get(url.userTags+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	updateUserTag(param) {
		return axios.post(url.updateUserTag, param).then((response) => {
			return response.data
		})
	},
	updateToutu(param) {
		return axios.post(url.updateToutu, param).then((response) => {
			return response.data
		})
	},
	updateState(param) {
		return axios.post(url.updateState, param).then((response) => {
			return response.data
		})
	},
	attentionList(param) {
		return axios.get(url.attentionList+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	fansList(param) {
		return axios.get(url.fansList+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	}
}

export const uploadApi = {
	uploadVideo(param) {
		return axios.post(url.uploadVideo, param).then((response) => {
			return response.data
		})
	},
	updateVideo(param) {
		return axios.post(url.updateVideo, param).then((response) => {
			return response.data
		})
	},
	videoComments(param) {
		return axios.get(url.videoComments+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	changeState(param) {
		return axios.get(url.changeState+'?commentId='+param.commentId+'&state='+param.state).then((response) => {
			return response.data
		})
	},
	searchComment(param) {
		return axios.post(url.searchComment, param).then((response) => {
			return response.data
		})
	},
	videoManage(param) {
		return axios.get(url.videoManage+'?userId='+param.userId+'&state='+param.state+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	deleteVideo(param) {
		return axios.post(url.deleteVideo, param).then((response) => {
			return response.data
		})
	},
	cancelUpload(param) {
		return axios.post(url.cancelUpload, param).then((response) => {
			return response.data
		})
	}
}

export const messageApi = {
	getLike(param) {
		return axios.get(url.getLike+'?beLikedUserId='+param.beLikedUserId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	getReply(param) {
		return axios.get(url.getReply+'?beReplyUserId='+param.beReplyUserId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	getAttention(param) {
		return axios.get(url.getAttention+'?userId='+param.userId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	getNotice(param) {
		return axios.get(url.getNotice+'?pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	}
}

//获取轮播图
export const bannerApi = {
	banner(top) {
		return axios.get(url.banner+'?top='+top).then((response) => {
			return response.data
		})
	},
	bannerList(param) {
		return axios.get(url.bannerList+'?pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	}
}

// 排行榜
export const rankApi = {
	ranking(param) {
		return axios.get(url.ranking+'?top='+param.top+'&time='+param.time).then((response) => {
			return response.data
		})
	}
}

// 更新排行榜
export const updateRankApi = {
	updateRank(time) {
		return axios.get(url.updateRank+'?time='+time).then(() => {
			return '排行榜更新成功'
		})
	}
}

// 推广
export const promoteApi = {
	promote() {
		return axios.get(url.promote).then((response) => {
			return response.data
		})
	}
}

// 直播
export const liveApi = {
	live() {
		return axios.get(url.live).then((response) => {
			return response.data
		})
	}
}

// 具体内容
export const contentApi = {
	content() {
		return axios.get(url.content+'?pageSize=8').then((response) => {
			return response.data
		})
	},
	videoByPar(param) {
		return axios.get(url.videoByPar+'?partitionId='+param.partitionId+'&pageNum='+param.pageNum+'&pageSize='+param.pageSize).then((response) => {
			return response.data
		})
	},
	rowsByPartition(param) {
		return axios.get(url.updateRows+'?partitionId='+param.partitionId+'&pageSize=8').then((response) => {
			return response.data
		})
	}
}

// 具体内容的三日排行榜信息
export const contentrankApi = {
	contentrank(param) {
		return axios.get(url.contentrank+'?top='+param.top+'&partitionId='+param.partitionId).then((response) => {
			return response.data
		})
	}
}

