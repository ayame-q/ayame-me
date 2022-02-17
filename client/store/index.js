export const state = () => ({
	works: [],
})

export const getters = {
	getWorks (state) {
		return state.works
	},
}

export const mutations = {
	setWorks (state, works) {
		state.works = works
	},
}

export const actions = {
	async nuxtServerInit (context) {
		context.commit("setWorks", await this.$content("works").sortBy("order").fetch())
	},
}
