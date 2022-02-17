<template>
	<div>
		<WorksOrderList v-model="works" />
	</div>
</template>

<script>
import WorksOrderList from "~/components/edit/WorksOrderList"
export default {
	name: "Order",
	components: { WorksOrderList },
	scrollToTop: false,
	async asyncData ({ $content }) {
		const works = await $content("works").sortBy("order").fetch()
		return { works }
	},
}
</script>

<style lang="scss" scoped>

</style>
