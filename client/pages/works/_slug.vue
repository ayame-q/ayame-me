<template>
	<div id="works-detail">
		<main>
			<article>
				<div class="meta">
					<div>
						<div class="title-wrap">
							<h2>{{ title }}</h2>
							<p v-if="work.subTitle" class="subtitle">
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
	scrollToTop: false,
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
	mounted () {
		this.loadWebFont()
	},
	methods: {
		loadWebFont () {
			/* global Ts */
			Ts.loadFont()
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
h2 {
	color: $text-color;
	font-family: "A1ゴシック M", A1 Gothic M, sans-serif;
}

p {
	margin: 1rem 0;
}

#works-detail {
	main {
		article {
			height: 100%;
			overflow-y: scroll;

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
