<template>
	<div class="skills-list">
		<MoreSkillsList v-model="skills" />
	</div>
</template>

<script>
export default {
	name: "Index",
	scrollToTop: false,
	async asyncData ({ $content }) {
		const skills = await $content("skills").sortBy("order").fetch()
		console.log(skills)
		return { skills }
	},
}
</script>

<style lang="scss" scoped>

</style>
