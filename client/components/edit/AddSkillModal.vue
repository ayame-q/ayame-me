<template>
	<div class="add-skill-wrap">
		<div class="add-skill">
			<h3>スキルを追加</h3>
			<ul>
				<li
					v-for="skillObject of skillObjects"
					v-bind:key="skillObject.uuid"
					v-on:click="addSkill(skillObject)"
				>
					<img v-bind:src="skillObject.icon" alt="">{{ skillObject.title }}
				</li>
			</ul>
		</div>
		<div class="overlay" v-on:click="onClose" />
	</div>
</template>

<script>
export default {
	name: "AddSkillModal",
	props: {
		value: {
			type: Array,
			default () { return [] },
		},
	},
	data () {
		return {
			skillObjects: [],
			skills: [],
		}
	},
	async fetch () {
		this.skillObjects = await this.$content("skills").sortBy("order").fetch()
	},
	created () {
		this.skills = [...this.value]
	},
	methods: {
		onClose () {
			this.$emit("close")
		},
		addSkill (skillObject) {
			if (this.skills.includes(skillObject.slug)) {
				return
			}
			this.skills.push(skillObject.slug)
			this.$emit("input", this.skills)
			this.$emit("close")
		},
	},
}
</script>

<style lang="scss" scoped>
.add-skill-wrap {
	.add-skill {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 70%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 9999;
		background-color: $main-color;
		color: #fff;
		font-size: 2rem;
		padding: 1.5rem;

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			list-style: none;
			padding: 0;

			li {
				width: 48%;
				height: 2rem;
				margin: 0.5rem 0;
				display: flex;
				align-items: center;
				font-size: 0.8em;
				cursor: pointer;

				img {
					width: 2.5rem;
					height: 100%;
					margin-right: 0.3rem;
				}
			}
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(#000, 0.5);
		z-index: 9998;
	}
}
</style>
