<template>
	<div id="skills-detail">
		<Skill v-model="skill" />
		<div v-if="isEditable === null" class="loading">
			<vue-loading type="spiningDubbles" v-bind:size="{ width: '30vw', height: '30vw' }" color="#ad5a88" />
		</div>
	</div>
</template>

<script>
export default {
	name: "New",
	scrollToTop: false,
	data () {
		return {
			skill: {
				slug: "",
				title: "",
				experiencePeriod: "",
				icon: "",
				text: "",
			},
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
	watch: {
		isEditable () {
			if (this.isEditable === false) {
				return this.$nuxt.error({ statusCode: 404 })
			}
		},
	},
	mounted () {
		if (this.isEditable === false) {
			return this.$nuxt.error({ statusCode: 404 })
		}
	},
}
</script>

<style lang="scss" scoped>

</style>
