<template>
	<main>
		<article>
			<div class="meta">
				<div>
					<div class="title-wrap">
						<div class="icon-wrap" v-bind:class="{editable: isEditable, empty: isEditable && !skill.icon}" v-on:click="onClickIcon">
							<p v-if="!isEditable || skill.icon">
								<img v-bind:src="skill.icon" alt="">
							</p>
							<UploadIcon v-if="isEditable && !skill.icon" v-model="skill.icon" class="upload" />
						</div>
						<h2>
							<ContentEditable v-model="skill.title" v-bind:contenteditable="isEditable" tag="span" placeholder="タイトル" />
						</h2>
						<p class="star-wrap">
							<span v-for="n of 3" v-bind:key="n" class="star" v-bind:class="{editable: isEditable}" v-on:click="setLevel(n)">
								<img v-if="n <= skill.level" src="@/assets/img/star-full.svg" alt="★">
								<img v-else src="@/assets/img/star-blank.svg" alt="☆">
							</span>
						</p>
					</div>
					<p class="experience-period">
						経験: <ContentEditable v-model="skill.experiencePeriod" v-bind:contenteditable="isEditable" tag="span" v-bind:no-n-l="true" placeholder="nヶ月 (yyyy/mm 〜 yyyy/mm)" />
					</p>
				</div>
			</div>
			<Description v-model="skill.description" v-bind:is-editable="isEditable" />
			<div v-if="skill.works" class="works-wrap">
				<h3>Works</h3>
				<div class="works">
					<nuxt-link v-for="work of skill.works" v-bind:key="work.uuid" v-bind:to="`/works/${work.slug}`">
						<article>
							<p><img v-bind:src="work.thumbnail" alt=""></p>
						</article>
					</nuxt-link>
				</div>
			</div>
			<SubmitButton v-if="isEditable" v-model="skill" api-type="skills" root-path="/skills/" />
		</article>
	</main>
</template>

<script>
import ContentEditable from "~/components/edit/ContentEditable"
import UploadIcon from "~/components/edit/UploadIcon"
import SubmitButton from "~/components/edit/SubmitButton"
export default {
	name: "Skill",
	components: { SubmitButton, UploadIcon, ContentEditable },
	props: {
		value: {
			type: Object,
			default () {
				return {
					slug: "",
					title: "",
					level: 0,
					experiencePeriod: "",
					icon: "",
					text: "",
				}
			},
		},
	},
	data () {
		return {
			skill: {},
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
	watch: {
		skill: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		this.skill = { ...this.value }
	},
	mounted () {
		this.loadWebFont()
	},
	methods: {
		setLevel (level) {
			if (this.isEditable) {
				this.skill.level = level
			}
		},
		onClickIcon () {
			if (this.isEditable && this.skill.icon) {
				this.skill.icon = ""
			}
		},
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

main {
	> article {
		height: 100%;

		.meta {
			display: flex;
			align-items: center;

			.title-wrap {
				display: flex;
				align-items: center;
				flex-shrink: 0;

				.icon-wrap {
					width: 2.5em;
					height: 2.5em;
					margin-right: 0.5em;
					position: relative;

					&.editable:not(.empty) {
						&:hover {
							&::before {
								content: "削除";
								cursor: pointer;
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translateX(-50%) translateY(-50%);
								font-size: 1.2vw;
								width: fit-content;
								background-color: rgba($text-color, 0.7);
								padding: 10%;
								color: #fff;
							}
						}
					}

					&.empty {
						width: 15vw;
						height: 9vw;
					}

					p {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					img {
						width: 100%;
						height: fit-content;
					}

					.upload {
						width: 100%;
						height: 100%;
					}
				}

				.star-wrap {
					display: flex;
					margin-left: 0.8rem;

					.star {
						width: 1rem;
						margin: 0 0.5rem;

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

			.experience-period {
				margin-top: 0.5rem;
			}
		}

		.text-wrap {
			width: 100%;
			height: fit-content;
		}

		.works-wrap {
			h3 {
				margin: 1rem 0;
				font-size: 1.35em;
			}

			.works {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 20px;
				width: 100%;

				a {
					display: flex;
					justify-content: center;
					align-items: center;

					article {
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
</style>
