export const state = () => ({
	works: [],
	skills: [],
})

export const getters = {
	getWorks (state) {
		return state.works
	},
	getSkills (state) {
		return state.skills
	},
}

export const mutations = {
	setWorks (state, works) {
		state.works = works
	},
	setSkills (state, skills) {
		state.skills = skills
	},
}

export const actions = {
	async nuxtServerInit (context) {
		context.commit("setWorks", await this.$content("works").sortBy("order").fetch())
		context.commit("setSkills", await this.$content("skills").sortBy("order").fetch())
	},
}
