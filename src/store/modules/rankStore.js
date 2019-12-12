import { rankApi } from 'api'
import * as TYPE from '../actionType/rankType'
import _ from 'lodash'

const state = {
	ranklist1: [],
	ranklist3: [],
	ranklist7: []
}

const getters = {
	ranklist1: state => state.ranklist1,
	ranklist3: state => state.ranklist3,
	ranklist7: state => state.ranklist7

}

const actions = {
	ranklist({commit, state, rootState}) {
		rootState.requesting = true
		commit(TYPE.RANK_LIST_REQUEST)
		rankApi.ranking({ top: '6', time: '1' }).then((response) => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_1_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_FAILURE)
		})
		rankApi.ranking({ top: '6', time: '3' }).then((response) => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_3_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_FAILURE)
		})
		rankApi.ranking({ top: '6', time: '7' }).then((response) => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_7_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_FAILURE)
		})
	}
}

const mutations = {
	[TYPE.RANK_LIST_REQUEST] (state) {

	},
	[TYPE.RANK_LIST_1_SUCCESS] (state, response) {
		state.ranklist1 = _.values(response)
	},
	[TYPE.RANK_LIST_3_SUCCESS] (state, response) {
		state.ranklist3 = _.values(response)
	},
	[TYPE.RANK_LIST_7_SUCCESS] (state, response) {
		state.ranklist7 = _.values(response)
	},
	[TYPE.RANK_LIST_FAILURE] (state) {

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}