<template>
	<div id="work-detail">
		<Work v-model="work" />
	</div>
</template>

<script>
export default {
	name: "WorkDetail",
	scrollToTop: false,
	async asyncData ({ $content, params }) {
		const work = await $content("works", params.slug).fetch()
		return { work }
	},
	head () {
		return {
			title: this.work.title,
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
