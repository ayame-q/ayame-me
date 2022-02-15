<template>
	<main>
		<article>
			<div class="meta">
				<div>
					<div class="title-wrap">
						<h2>
							<ContentEditable v-model="work.title" v-bind:contenteditable="isEditable" tag="span" placeholder="タイトル" />
						</h2>
						<p v-if="value.subTitle" class="subtitle">
							<ContentEditable v-model="work.subTitle" v-bind:contenteditable="isEditable" tag="span" placeholder="サブタイトル" />
						</p>
					</div>
					<p class="create-period">
						制作期間: <ContentEditable v-model="work.createPeriod" v-bind:contenteditable="isEditable" tag="span" v-bind:no-n-l="true" placeholder="nヶ月 (yyyy/mm 〜 yyyy/mm)" />
					</p>
				</div>
				<ul class="skills">
					<li v-for="(skill, index) of value.skills" v-bind:key="index">
						<img v-bind:src="skill.img" v-bind:alt="skill.name" v-bind:title="skill.name">
					</li>
				</ul>
			</div>
			<div class="content-wrap">
				<div class="resources-wrap">
					<div v-if="!isEditable">
						<div v-for="(resource, index) of work.resources" v-bind:key="index">
							<WorkResource v-bind:resource="resource" />
						</div>
					</div>
					<VueDraggable v-if="isEditable" v-model="work.resources">
						<div v-for="(resource, index) of work.resources" v-bind:key="index">
							<WorkResource v-bind:resource="resource" />
						</div>
					</VueDraggable>
					<UploadResource v-if="isEditable" v-model="work.resources" />
				</div>
				<div v-click-outside="onClickOutsideText" class="text-wrap" v-on:click="onClickText">
					<div v-if="!isEditable || (isEditable && !isEditing)" class="text" v-html="text" />
					<vue-easymde
						v-if="isEditable && isEditing"
						v-model="work.text"
						v-bind:configs="easyMDEConfigs"
						class="editor"
						v-on:initialized="easyMDEInitialized"
					/>
				</div>
			</div>
		</article>
	</main>
</template>

<script>
import marked from "marked"
import VueDraggable from "vuedraggable"
import ContentEditable from "~/components/edit/ContentEditable"
import UploadResource from "~/components/edit/UploadResource"
export default {
	name: "Work",
	components: { UploadResource, ContentEditable, VueDraggable },
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
		isEditable: {
			type: Boolean,
			default () {
				return false
			},
		},
	},
	data () {
		return {
			isEditing: false,
			easyMDE: null,
			work: {},
			easyMDEConfigs: {
				spellChecker: false,
				status: false,
				placeholder: "説明文",
				toolbar: false,
			},
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
		this.work = { ...this.value }
		if (!this.work.text) {
			this.isEditing = true
		}
	},
	mounted () {
		this.loadWebFont()
	},
	methods: {
		onClickText () {
			if (this.isEditable) {
				this.isEditing = true
			}
		},
		onClickOutsideText () {
			if (this.isEditing === true && this.work.text) {
				this.isEditing = false
			}
		},
		easyMDEInitialized (easyMDE) {
			this.easyMDE = easyMDE
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

#works-detail {
	main {
		article {
			height: 100%;

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

						span {
							margin: 0 0.2em;
						}

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

				.resources-wrap {
					width: 40%;
				}

				.text-wrap {
					width: 55%;
					height: fit-content;

					&::v-deep p {
						margin: 1rem 0;
					}

					.editor {
						&::v-deep {
							.CodeMirror {
								color: $text-color;
								background-color: transparent;
								border: none;
								padding: 0;

								.CodeMirror-placeholder {
									opacity: 0.3;
								}

								.CodeMirror-lines {
									margin: 1rem 0;
									padding: 0;
								}

								.CodeMirror-line {
									padding: 0;
								}
							}

							.editor-preview {
								display: none;
							}
						}
					}
				}
			}
		}
	}
}
</style>
