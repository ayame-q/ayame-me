<template>
	<main>
		<article>
			<div class="meta">
				<div>
					<div class="title-wrap">
						<h2>
							More Skills List
						</h2>
					</div>
					<div v-if="isEditable" class="options">
						<p>
							<button class="save" v-on:click="onSave">
								<img src="@/assets/img/save.svg" alt="保存">
							</button>
							<nuxt-link to="/skills/new" class="add">
								<img src="@/assets/img/add-pink.svg" alt="+">
							</nuxt-link>
						</p>
					</div>
				</div>
			</div>
			<div v-if="!isEditable" class="content-wrap">
				<MoreSkillsListSkill v-for="(skill, index) of skills" v-bind:key="skill.uuid" v-model="skills[index]" v-bind:index="index" class="skill" />
			</div>
			<VueDraggable
				v-if="isEditable"
				v-model="skills"
				class="content-wrap"
			>
				<MoreSkillsListSkill v-for="(skill, index) of skills" v-bind:key="skill.uuid" v-model="skills[index]" v-bind:index="index" class="skill" />
			</VueDraggable>
		</article>
	</main>
</template>

<script>
import VueDraggable from "vuedraggable"
export default {
	name: "MoreSkillsList",
	components: { VueDraggable },
	props: {
		value: {
			type: Array,
			default () { return [] },
		},
	},
	data () {
		return {
			skills: [],
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
	watch: {
		skills: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		this.skills = [...this.value]
	},
	methods: {
		async onSave () {
			for (const skill of this.skills) {
				await this.$http.$patch(`/api/skills/${skill.slug}`, {
					order: skill.order,
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
h2 {
	color: $text-color;
	font-family: "A1ゴシック M", A1 Gothic M, sans-serif;
}

main {
	article {
		height: 100%;

		.meta {
			display: flex;
			align-items: center;
			position: relative;

			.title-wrap {
				display: flex;
				align-items: baseline;
				flex-shrink: 0;
				margin-bottom: 0.5rem;

				h2 {
					font-size: 2rem;
				}
			}

			.options {
				position: absolute;
				top: 50%;
				right: 20%;
				transform: translateY(-50%);

				p {
					display: flex;
					align-items: center;

					a,
					button {
						display: block;
						text-decoration: none;
						background: none;
						border: none;
						margin: 0 0.5rem;
						cursor: pointer;

						img {
							width: 1rem;
							height: 1rem;
						}
					}
				}
			}
		}

		.content-wrap {
			display: flex;
			flex-wrap: wrap;

			.skill {
				margin: 0.5rem 0;
				width: 45%;
			}
		}
	}
}
</style>
