<template>
	<div id="skill-detail">
		<Skill v-model="skill" />
	</div>
</template>

<script>
export default {
	name: "SkillDetail",
	scrollToTop: false,
	async asyncData (context) {
		const skill = await context.$content("skills", context.params.slug).fetch()
		return { skill }
	},
	head () {
		return {
			title: this.skill.title,
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
