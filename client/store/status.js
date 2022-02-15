export const state = () => ({
	isEditable: null,
})

export const getters = {
	getIsEditable (state) {
		return state.isEditable
	},
}

export const mutations = {
	setIsEditable (state, isEditable) {
		state.isEditable = isEditable
	},
}

export const actions = {
	checkIsEditable (context) {
		this.$http.get("/api/health_check")
			.then(() => {
				context.commit("setIsEditable", true)
			})
			.catch(() => {
				context.commit("setIsEditable", false)
			})
	},
}
