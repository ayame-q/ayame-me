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
					<p v-if="isEditable" class="add">
						<nuxt-link to="/skills/new">
							<img src="@/assets/img/add-pink.svg" alt="+">
						</nuxt-link>
					</p>
				</div>
			</div>
			<div class="content-wrap">
				<div v-for="skill of skills" v-bind:key="skill.uuid" class="skill">
					<nuxt-link v-bind:to="`/skills/${skill.slug}`">
						<p class="icon">
							<img v-bind:src="skill.icon">
						</p>
						<div class="detail">
							<h3>{{ skill.title }}</h3>
							<p class="star-wrap">
								<span v-for="n of 3" v-bind:key="n" class="star" v-bind:class="{editable: isEditable}" v-on:click="setLevel(n)">
									<img v-if="n <= skill.level" src="@/assets/img/star-full.svg" alt="★">
									<img v-else src="@/assets/img/star-blank.svg" alt="☆">
								</span>
							</p>
						</div>
					</nuxt-link>
				</div>
			</div>
		</article>
	</main>
</template>

<script>
export default {
	name: "MoreSkillsList",
	computed: {
		skills () {
			return this.$store.getters.getSkills
		},
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
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

			.add {
				position: absolute;
				top: 50%;
				right: 20%;
				transform: translateY(-50%);

				a {
					display: block;
					text-decoration: none;

					img {
						width: 1rem;
						height: 1rem;
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

				a {
					display: flex;
					align-items: center;
					width: 100%;
					text-decoration: none;

					.icon {
						width: 3rem;
						height: 3rem;

						img {
							width: 100%;
							height: 100%;
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

								&.editable {
									cursor: pointer;
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
		}
	}
}
</style>
