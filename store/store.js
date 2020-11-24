import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		databseUrl: 'worddata', // 设置本地数据库
		wordsList: []
	},
	mutations: {
		VuexWordsList(state,data) {
			// console.log(data)
			state.wordsList = data // 赋值
		},
	},
	actions: {}
})

export default store
