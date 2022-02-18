<template>
	<article class="skill">
		<nuxt-link v-bind:to="`/skills/${skill.slug}`">
			<p class="icon">
				<img v-bind:src="skill.icon">
			</p>
			<div class="detail">
				<h3>{{ skill.title }}</h3>
				<p class="star-wrap">
					<span v-for="n of 3" v-bind:key="n" class="star">
						<img v-if="n <= skill.level" src="@/assets/img/star-full.svg" alt="★">
						<img v-else src="@/assets/img/star-blank.svg" alt="☆">
					</span>
				</p>
			</div>
		</nuxt-link>
	</article>
</template>

<script>
export default {
	name: "MoreSkillsListSkill",
	props: {
		value: {
			type: Object,
			default () {
				return {}
			},
		},
		index: {
			type: Number,
			default () { return 0 },
		},
	},
	data () {
		return {
			skill: {},
		}
	},
	watch: {
		skill: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
		index (newValue) {
			this.skill.order = newValue + 1
		},
	},
	created () {
		this.skill = { ...this.value }
		this.skill.order = this.index + 1
	},
}
</script>

<style lang="scss" scoped>
.skill {
	a {
		display: flex;
		align-items: center;
		width: 100%;
		text-decoration: none;

		.icon {
			width: 3rem;
			height: 3rem;
			display: flex;
			align-items: center;

			img {
				width: 100%;
				max-height: 100%;
			}
		}

		.detail {
			margin-left: 0.7rem;

			.star-wrap {
				display: flex;
				margin: 0.05rem 0;

				.star {
					width: 0.8rem;
					margin: 0 0.3rem;

					&:first-child {
						margin-left: 0;
					}

					img {
						display: block;
						width: 100%;
					}
				}
			}
		}
	}
}
</style>
