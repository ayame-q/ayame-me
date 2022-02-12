<template>
	<div id="works-detail">
		<Work v-model="work" />
	</div>
</template>

<script>
export default {
	name: "WorkDetail",
	scrollToTop: false,
	head () {
		return {
			title: this.title,
		}
	},
	computed: {
		work () {
			return this.$store.getters["works/getAll"].find((item) => {
				return item.slug === this.$route.params.slug
			})
		},
		title () {
			return this.work.title.replace("<br>", "")
		},
	},
}
</script>

<style lang="scss" scoped>
</style>
