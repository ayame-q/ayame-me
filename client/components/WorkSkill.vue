<template>
	<div class="work-skill" v-on:click="$emit('click')">
		<img v-bind:src="skill.icon" v-bind:alt="skill.title" v-bind:title="skill.title">
	</div>
</template>

<script>
export default {
	name: "WorkSkill",
	props: {
		value: {
			type: String,
			default () { return "" },
		},
	},
	data () {
		return {
			skill: {
				icon: "",
				title: "",
			},
		}
	},
	async fetch () {
		this.skill = await this.$content("skills", this.value).fetch()
	},
}
</script>

<style lang="scss" scoped>
.work-skill {
	display: flex;
	align-items: center;

	img {
		width: 100%;
		max-height: 100%;
	}
}
</style>
