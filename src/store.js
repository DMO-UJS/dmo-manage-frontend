import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: null,
		libraryName: '',
		selectedOntologyLibrary: {},
		selectedClassName: ''
  },
	mutations: {
		setLibraryName(state, message) {
			// console.log(message)
			this.state.libraryName = message
		},
		setOntologyLibrary(state, ontoLibrary) {
			// console.log(ontoLibrary)
			this.state.selectedOntologyLibrary = ontoLibrary
		},
		setClassName(state, className) {
			// console.log(className)
			this.state.selectedClassName = className
		},
		setUserInfo(state, userInfo) {
			this.state.userInfo = userInfo
		}
	}
})