import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'

const state = {
	// 默认排序
	rows: [],
	ranks: [],
	rank: {}
}

const getters = {
	rows: state => state.rows,
	ranks: state => state.ranks,
	rank: state => state.rank
}

const actions = {
	getContentRows({commit, state, rootState}) {
		rootState.requesting = true
		commit(TYPE.CONTENT_REQUEST)
		contentApi.content().then((response) => {
			rootState.requesting = false
			commit(TYPE.CONTENT_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.CONTENT_FAILURE)
		})
	},
	getRowsByPartition({commit, state, rootState},param) {
		rootState.requesting = true
		commit(TYPE.CONTENT_REQUEST)
		contentApi.rowsByPartition(param).then((response) => {
			rootState.requesting = false
			commit(TYPE.UPDATE_ROWS_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.CONTENT_FAILURE)
		})
	},
	getContentRank({commit, state, rootState}, param) {
		rootState.requesting = true
		commit(TYPE.CONTENT_RANK_REQUEST)
		contentrankApi.contentrank(param).then((response) => {
			rootState.requesting = false
			commit(TYPE.CONTENT_RANK_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.CONTENT_RANK_FAILURE)
		})
	}
}

const mutations = {
	[TYPE.CONTENT_REQUEST] (state) {

	},
	[TYPE.CONTENT_SUCCESS] (state, response) {
		state.rows = response
	},
	[TYPE.UPDATE_ROWS_SUCCESS] (state, response) {
		for (let index = 0; index < state.rows.length; index++) {
			if (state.rows[index].id === response[0].partition_id) {
				state.rows[index].item = response
				return
			}
		}
	},
	[TYPE.CONTENT_FAILURE] (state) {

	},

	// 排行榜信息
	[TYPE.CONTENT_RANK_REQUEST] (state) {

	},
	[TYPE.CONTENT_RANK_SUCCESS] (state, response) {
		state.ranks.push(response)
		state.rank = response
	},
	[TYPE.CONTENT_RANK_FAILURE] (state) {

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}