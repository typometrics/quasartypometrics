// scheme.js file in the store folder
const state = {
	scheme: ''
}

const mutations = {
	setScheme(state, scheme) {
		state.scheme = scheme
	}
}

const getters = {
	getScheme: (state) => state.scheme
}

export default {
	state,
	mutations,
	getters
}