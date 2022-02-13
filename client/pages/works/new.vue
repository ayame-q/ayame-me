<template>
	<div id="works-detail">
		<Work v-model="work" v-bind:is-editable="true" />
	</div>
</template>

<script>
export default {
	name: "New",
	data () {
		return {
			work: {
				slug: "",
				title: "",
				subTitle: "",
				createPeriod: "",
				thumbnail: "",
				skills: [],
				resources: [],
				text: "",
			},
		}
	},
}
</script>

<style lang="scss" scoped>

</style>
