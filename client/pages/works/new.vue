<template>
	<div id="works-detail">
		<Work v-model="work" v-bind:is-editable="true" />
		<div v-if="isEditable === null" class="loading">
			<vue-loading type="spiningDubbles" v-bind:size="{ width: '30vw', height: '30vw' }" color="#ad5a88" />
		</div>
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
.loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background-color: rgba(#000, 0.9);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
