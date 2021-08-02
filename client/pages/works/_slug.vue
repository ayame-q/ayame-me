<template>
	<div id="works-detail">
		<header>
			<nav>
				<p>
					<nuxt-link to="/">
						×
					</nuxt-link>
				</p>
			</nav>
		</header>
		<main>
			<article>
				<div class="meta">
					<div>
						<div class="title-wrap">
							<h1>{{ title }}</h1>
							<p class="subtitle">
								{{ work.subTitle }}
							</p>
						</div>
						<p class="create-period">
							制作期間: {{ work.createPeriod }}
						</p>
					</div>
					<ul class="skills">
						<li v-for="(skill, index) of work.skills" v-bind:key="index">
							<img v-bind:src="skill.img" v-bind:alt="skill.name" v-bind:title="skill.name">
						</li>
					</ul>
				</div>
				<div class="content-wrap">
					<div class="resources">
						<p v-for="(resource, index) of work.resources" v-bind:key="index">
							<img v-bind:src="resource.url" alt="">
						</p>
					</div>
					<div class="text" v-html="text" />
				</div>
			</article>
		</main>
	</div>
</template>

<script>
import marked from "marked"
export default {
	name: "WorkDetail",
	computed: {
		work () {
			return this.$store.getters["works/getAll"].find((item) => {
				return item.slug === this.$route.params.slug
			})
		},
		title () {
			return this.work.title.replace("<br>", "")
		},
		text () {
			marked.setOptions({
				breaks: true,
			})
			return marked(this.work.text)
		},
	},
}
</script>

<style lang="scss">
p {
	margin: 1rem 0;
}
</style>

<style lang="scss" scoped>
h1 {
	color: $text-color;
}

p {
	margin: 1rem 0;
}

#works-detail {
	header {
		position: fixed;
		top: 2vh;
		right: 9vw;
		z-index: 99;

		a {
			text-decoration: none;
		}
	}

	main {
		position: fixed;
		width: 95vw;
		height: 90vh;
		left: 2.5vw;
		bottom: 0;
		margin-bottom: 8vh;
		background-color: $board-color;
		padding: 2.5vw calc(2.5vw + 4vw);

		article {
			height: 100%;
			overflow-y: scroll;

			&::before,
			&::after {
				content: "";
				width: 4vw;
				height: 98vh;
				position: fixed;
				bottom: 0;
				background-color: $main-color;
			}

			&::before {
				left: 2.5vw;
			}

			&::after {
				right: 2.5vw;
			}

			.meta {
				display: flex;
				align-items: center;

				.title-wrap {
					display: flex;
					align-items: baseline;
					flex-shrink: 0;

					p.subtitle {
						margin: 0;
						margin-left: 0.5em;

						&::before,
						&::after {
							content: "〜";
						}
					}
				}

				ul.skills {
					list-style: none;
					padding: 0;
					display: flex;
					justify-content: flex-end;
					flex-shrink: 1;
					flex-grow: 1;

					li {
						margin: 0.5em;

						img {
							height: 1.6em;
						}
					}
				}
			}

			.content-wrap {
				display: flex;
				justify-content: space-between;

				.resources {
					width: 40%;

					img {
						width: 100%;
					}
				}

				.text {
					width: 55%;
				}
			}
		}
	}
}
</style>
