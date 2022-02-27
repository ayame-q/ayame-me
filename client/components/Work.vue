<template>
	<main>
		<article>
			<div class="meta">
				<div>
					<div class="title-wrap">
						<h2>
							<ContentEditable v-model="work.title" v-bind:contenteditable="isEditable" tag="span" placeholder="タイトル" />
						</h2>
						<p v-if="value.subTitle || isEditable" class="subtitle">
							<ContentEditable v-model="work.subTitle" v-bind:contenteditable="isEditable" tag="span" placeholder="サブタイトル" />
						</p>
					</div>
					<p class="create-period">
						制作期間: <ContentEditable v-model="work.createPeriod" v-bind:contenteditable="isEditable" tag="span" v-bind:no-n-l="true" placeholder="nヶ月 (yyyy/mm 〜 yyyy/mm)" />
					</p>
				</div>
				<div v-if="!isEditable" class="skills">
					<WorkSkill v-for="skill of work.skills" v-bind:key="skill" class="skill" v-bind:value="skill" />
				</div>
				<VueDraggable
					v-if="isEditable"
					v-model="work.skills"
					class="skills"
					v-bind:class="{dragging: isSkillsDragging}"
					v-on:clone="isSkillsDragging = true"
					v-on:end="isSkillsDragging = false"
				>
					<WorkSkill
						v-for="(skill, index) of work.skills"
						v-bind:key="skill"
						class="skill editable"
						v-bind:value="skill"
						v-bind:class="{dragging: isSkillsDragging}"
						v-on:click="deleteSkill(index)"
					/>
				</VueDraggable>
				<div v-if="isEditable" class="add-skill" v-on:click="isAddSkillModalOpen = true">
					＋
				</div>
				<AddSkillModal v-if="isAddSkillModalOpen" v-model="work.skills" v-on:close="isAddSkillModalOpen = false" />
			</div>
			<div class="content-wrap">
				<div class="resources-wrap">
					<div v-if="!isEditable">
						<div v-for="(resource, index) of work.resources" v-bind:key="index">
							<WorkResource v-bind:resource="resource" class="resource" v-on:click="$refs.fullscreen.open(index)" />
						</div>
					</div>
					<VueDraggable
						v-if="isEditable"
						v-model="work.resources"
						v-on:clone="isResourcesDragging = true"
						v-on:end="isResourcesDragging = false"
					>
						<div v-for="(resource, index) of work.resources" v-bind:key="index">
							<WorkResource
								v-bind:resource="resource"
								v-bind:is-thumbnail="isResourcesDragging"
								class="resource"
								v-bind:class="{editable: isEditable}"
							>
								<p class="options">
									<button v-if="resource.type === 'youtube'" v-on:click="isResourcesDragging = !isResourcesDragging">
										並び替え
									</button>
									<button v-on:click="deleteResource(index)">
										削除
									</button>
								</p>
								<p class="fullscreen">
									<button v-on:click="$refs.fullscreen.open(index)" />
								</p>
							</WorkResource>
						</div>
					</VueDraggable>
					<UploadResource v-if="isEditable" v-model="work.resources" />
				</div>
				<Description v-model="work.description" class="description-wrap" v-bind:is-editable="isEditable" />
			</div>
			<WorkResourceFullScreen ref="fullscreen" v-bind:resources="work.resources" />
			<SubmitButton v-if="isEditable" v-model="work" api-type="works" root-path="/works/" v-bind:has-thumbnail="true" />
		</article>
	</main>
</template>

<script>
import VueDraggable from "vuedraggable"
import ContentEditable from "~/components/edit/ContentEditable"
import UploadResource from "~/components/edit/UploadResource"
import SubmitButton from "~/components/edit/SubmitButton"
import AddSkillModal from "~/components/edit/AddSkillModal"
export default {
	name: "Work",
	components: { AddSkillModal, SubmitButton, UploadResource, ContentEditable, VueDraggable },
	props: {
		value: {
			type: Object,
			default () {
				return {
					slug: "",
					title: "",
					subTitle: "",
					createPeriod: "",
					thumbnail: "",
					skills: [],
					resources: [],
					text: "",
				}
			},
		},
	},
	data () {
		return {
			isAddSkillModalOpen: false,
			work: {},
			isSkillsDragging: false,
			isResourcesDragging: false,
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
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
		this.work = { ...this.value }
	},
	mounted () {
		this.loadWebFont()
	},
	methods: {
		deleteResource (index) {
			this.work.resources.splice(index, 1)
		},
		deleteSkill (index) {
			this.work.skills.splice(index, 1)
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
			position: relative;

			.title-wrap {
				display: flex;
				align-items: baseline;
				flex-shrink: 0;

				h2,
				p.subtitle {
					::v-deep br {
						content: "";
					}

					.contenteditable-wrap:focus {
						&::v-deep br {
							content: none;
						}
					}
				}

				p.subtitle {
					margin: 0;
					margin-left: 0.5em;

					span {
						margin: 0 0.2em;
					}

					&::before,
					&::after {
						content: "〜";
					}
				}
			}

			.skills {
				display: flex;
				justify-content: flex-end;
				flex-shrink: 1;
				flex-grow: 1;

				.skill {
					margin: 0.5em;
					width: 1.6em;
					height: 1.6em;
					position: relative;

					&.editable {
						&:hover {
							&.dragging {
								&::before {
									content: none;
								}
							}

							&::before {
								content: "削除";
								cursor: pointer;
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translateX(-50%) translateY(-50%);
								font-size: 0.5rem;
								width: fit-content;
								background-color: rgba($text-color, 0.7);
								padding: 10%;
								color: #fff;
							}
						}
					}
				}
			}

			.add-skill {
				color: $main-color;
				cursor: pointer;
				width: fit-content;
				position: absolute;
				left: 100%;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.content-wrap {
			display: flex;
			justify-content: space-between;

			.resources-wrap {
				width: 40%;

				.resource {
					position: relative;
					margin: 1rem 0;

					&:not(.editable) {
						cursor: pointer;
					}

					.options,
					.fullscreen {
						display: none;
						position: absolute;
						right: 3%;
						margin: 0;
						z-index: 1101;

						&.options {
							top: 5%;
						}

						&.fullscreen {
							bottom: 5%;
						}

						button {
							display: inline-block;
							background: none;
							border: none;
							width: fit-content;
							white-space: nowrap;
							font-size: 1.2vw;
							background-color: rgba($text-color, 0.7);
							padding: 0.3rem;
							color: #fff;
							cursor: pointer;
							margin-left: 0.3rem;

							img {
								width: 1rem;
							}
						}
					}

					&:hover {
						.options {
							display: flex;
						}

						.fullscreen {
							display: block;
						}

						&:not(.editable)::before,
						.fullscreen button {
							content: "";
							display: flex;
							width: 1.3rem;
							height: 1.3rem;
							border-radius: 0.2rem;
							background: $text-color;
							opacity: 0.7;
							position: absolute;
							bottom: 5%;
							right: 3%;
							background-image: url("~/assets/img/fullscreen.svg");
							background-repeat: no-repeat;
							background-size: contain;
							background-position: center;
						}
					}
				}
			}

			.description-wrap {
				width: 55%;
				height: fit-content;
			}
		}
	}
}
</style>
