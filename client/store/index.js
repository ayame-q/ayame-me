export const state = () => ({
	works: [],
	skills: [],
	awards: [],
})

export const getters = {
	getWorks (state) {
		return state.works
	},
	getSkills (state) {
		return state.skills
	},
	getAwards (state) {
		return state.awards
	},
}

export const mutations = {
	setWorks (state, works) {
		state.works = works
	},
	setSkills (state, skills) {
		state.skills = skills
	},
	setAwards (state, awards) {
		state.awards = awards
	},
}

export const actions = {
	async nuxtServerInit (context) {
		context.commit("setWorks", await this.$content("works").sortBy("order").fetch())
		context.commit("setSkills", await this.$content("skills").sortBy("order").fetch())
		context.commit("setAwards", await this.$content("awards").sortBy("order", "desc").fetch())
	},
}
