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
					</div>
					<p class="experience-period">
						経験: <ContentEditable v-model="skill.experiencePeriod" v-bind:contenteditable="isEditable" tag="span" v-bind:no-n-l="true" placeholder="nヶ月 (yyyy/mm 〜 yyyy/mm)" />
					</p>
				</div>
			</div>
			<Description v-model="skill.description" v-bind:is-editable="isEditable" />
			<SubmitButton v-model="skill" api-type="skills" root-path="/skills/" />
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
	article {
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
			}

			.experience-period {
				margin-top: 0.5rem;
			}
		}

		.text-wrap {
			width: 100%;
			height: fit-content;
		}
	}
}
</style>
