<template>
	<div>
		<WorksOrderList v-model="works" />
		<div v-if="isEditable === null" class="loading">
			<vue-loading type="spiningDubbles" v-bind:size="{ width: '30vw', height: '30vw' }" color="#ad5a88" />
		</div>
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
	head () {
		return {
			title: "Workを並び替え",
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
				return this.$nuxt.error({ statusCode: 403, message: "403 Forbidden." })
			}
		},
	},
	mounted () {
		if (this.isEditable === false) {
			return this.$nuxt.error({ statusCode: 403, message: "403 Forbidden." })
		}
	},
}
</script>

<style lang="scss" scoped>
.loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background-color: $board-color;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
