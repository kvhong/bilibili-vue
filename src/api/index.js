import * as url from './urlConfig'
import axios from 'axios'

export const loginApi = {
	login(param) {
		return axios.post(url.login, param).then((response) => {
			return response.data
		})
	},
	code() {
		return axios.get(url.code).then((response) => {
			console.log('code',response)
			return response
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
	},
	userNameIsExist(username) {
		return axios.get(url.userNameIsExist+'?userName='+username).then((response) => {
			return response.data
		})
	},
	nickNameIsExist(nickname) {
		return axios.post(url.nickNameIsExist+'?nickName='+nickname).then((response) => {
			console.log('nickNameIsExist',response)
			return response.data
		})
	},
	sendMessage(param) {
		return axios.get(url.sendMessage+'?phone='+param.phone).then((response) => {
			return response.data
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

