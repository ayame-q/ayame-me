<template>
	<div id="works-detail">
		<Work v-model="work" />
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
	head () {
		return {
			title: "Workを新規作成",
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
	background-color: rgba(#000, 0.9);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
