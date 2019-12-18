import * as url from './urlConfig'
import axios from 'axios'
// import { response } from 'express'

export const commonApi = {
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
	}
}

export const loginApi = {
	login(param) {
		return axios.post(url.login, param).then((response) => {
			return response.data
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
	videoPraise() {
		return axios.post(url.videoPraise, param).then((response) => {
			return response.data
		})
	},
	commentPraise() {
		return axios.post(url.commentPraise, param).then((response) => {
			return response.data
		})
	},
	videoCollect() {
		return axios.post(url.videoCollect, param).then((response) => {
			return response.data
		})
	},
	attention() {
		return axios.post(url.attention, param).then((response) => {
			return response.data
		})
	},
	comment() {
		return axios.post(url.comment, param).then((response) => {
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
	favNum(userId) {
		return axios.get(url.favNum+'?userId='+userId).then((response) => {
			return response.data
		})
	},
	cancelCollect(param) {
		return axios.post(url.cancelCollect, param).then((response) => {
			return response.data
		})
	}
}

//获取轮播图
export const bannerApi = {
	list() {
		return axios.get(url.banner).then((response) => {
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
	},
	// contentrankweek(param) {
	// 	return axios.post(url.contentrankweek, param).then((response) => {
	// 		return response.data
	// 	})
	// }
}

