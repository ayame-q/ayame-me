<template>
	<main>
		<article>
			<div class="meta">
				<div>
					<div class="title-wrap">
						<h2>
							{{ title }}
						</h2>
						<p v-if="value.subTitle" class="subtitle">
							{{ value.subTitle }}
						</p>
					</div>
					<p class="create-period">
						制作期間: {{ value.createPeriod }}
					</p>
				</div>
				<ul class="skills">
					<li v-for="(skill, index) of value.skills" v-bind:key="index">
						<img v-bind:src="skill.img" v-bind:alt="skill.name" v-bind:title="skill.name">
					</li>
				</ul>
			</div>
			<div class="content-wrap">
				<div class="resources">
					<div v-for="(resource, index) of value.resources" v-bind:key="index">
						<p v-if="resource.type === 'image'">
							<img v-bind:src="resource.url" alt="">
						</p>
						<div v-if="resource.type === 'youtube'" class="youtube">
							<iframe
								v-bind:src="`https://www.youtube.com/embed/${resource.videoId}`"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							/>
						</div>
					</div>
				</div>
				<div class="text" v-html="text" />
			</div>
		</article>
	</main>
</template>

<script>
import marked from "marked"
export default {
	name: "Work",
	props: {
		value: {
			type: Object,
			default () {
				return {
					slug: null,
					title: null,
					subTitle: null,
					createPeriod: null,
					thumbnail: null,
					skills: [],
					resources: [],
					text: null,
				}
			},
		},
	},
	data () {
		return {
			localWork: {},
		}
	},
	computed: {
		title () {
			return this.value.title.replace("<br>", "")
		},
		text () {
			marked.setOptions({
				breaks: true,
			})
			return marked(this.value.text)
		},
	},
	watch: {
		work: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		this.localWork = { ...this.value }
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

<style lang="scss" scoped>

h2 {
	color: $text-color;
	font-family: "A1ゴシック M", A1 Gothic M, sans-serif;
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

					> div,
					> p {
						margin: 1rem 0;
					}

					img {
						width: 100%;
					}

					.youtube {
						position: relative;
						width: 100%;
						height: 0;
						padding-top: 56.25%;

						iframe {
							position: absolute;
							width: 100%;
							height: 100%;
							top: 0;
							left: 0;
						}
					}
				}

				.text {
					width: 55%;

					&::v-deep p {
						margin: 1rem 0;
					}
				}
			}
		}
	}
}
</style>
