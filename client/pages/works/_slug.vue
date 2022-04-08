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
		const description = this.work.description.length > 120 ? this.work.description.replaceAll("\n", "").substring(0, 120) + "…" : this.work.description.replaceAll("\n", "")
		return {
			title: this.work.title,
			meta: [
				{ hid: "description", name: "description", content: description },
				{ hid: "og:title", property: "og:title", content: `${this.work.title} - ayame.me` },
				{ hid: "og:description", property: "og:description", content: description },
				{ hid: "og:image", property: "og:image", content: `https://ayame.me${this.work.thumbnail}` },
			],
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
