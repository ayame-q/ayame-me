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
							<WorkResource v-bind:resource="resource" />
						</div>
					</div>
					<VueDraggable
						v-if="isEditable"
						v-model="work.resources"
						v-bind:class="{dragging: isResourcesDragging}"
						v-on:clone="isResourcesDragging = true"
						v-on:end="isResourcesDragging = false"
					>
						<div v-for="(resource, index) of work.resources" v-bind:key="index">
							<WorkResource v-bind:resource="resource" v-on:delete="deleteResource(index)" v-on:toggleOrderMode="isResourcesDragging = !isResourcesDragging" />
						</div>
					</VueDraggable>
					<UploadResource v-if="isEditable" v-model="work.resources" />
				</div>
				<Description v-model="work.description" class="description-wrap" v-bind:is-editable="isEditable" />
			</div>
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

				.dragging {
					::v-deep .youtube {
						&::before {
							content: "Youtube動画";
							position: absolute;
							width: 100%;
							height: 100%;
							top: 0;
							left: 0;
							background-color: $main-color;
							z-index: 1100;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 2rem;
							color: #fff;
						}

						iframe {
							display: none;
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
