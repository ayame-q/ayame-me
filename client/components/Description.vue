<template>
	<div v-click-outside="onClickOutsideText" class="description-wrap" v-on:click="onClickText">
		<div v-if="!isEditable || (isEditable && !isEditing)" class="text" v-html="textHtml" />
		<vue-easymde
			v-if="isEditable && isEditing"
			v-model="text"
			v-bind:configs="easyMDEConfigs"
			class="editor"
			v-on:initialized="easyMDEInitialized"
		/>
	</div>
</template>

<script>
import marked from "marked"

export default {
	name: "Description",
	props: {
		value: {
			type: String,
			default () { return "" },
		},
		isEditable: {
			type: Boolean,
			default () { return false },
		},
	},
	data () {
		return {
			isEditing: false,
			easyMDE: null,
			easyMDEConfigs: {
				spellChecker: false,
				status: false,
				placeholder: "説明文",
				toolbar: false,
			},
		}
	},
	computed: {
		text: {
			get () {
				return this.value
			},
			set (input) {
				this.$emit("input", input)
			},
		},
		textHtml () {
			marked.setOptions({
				breaks: true,
			})
			return marked(this.text)
		},
	},
	created () {
		if (!this.text) {
			this.isEditing = true
		}
	},
	methods: {
		onClickText () {
			if (this.isEditable) {
				this.isEditing = true
			}
		},
		onClickOutsideText () {
			if (this.isEditing === true && this.text) {
				this.isEditing = false
			}
		},
		easyMDEInitialized (easyMDE) {
			this.easyMDE = easyMDE
		},
	},
}
</script>

<style lang="scss" scoped>
.description-wrap {
	&::v-deep p {
		margin: 1rem 0;
	}

	.editor {
		&::v-deep {
			.CodeMirror {
				height: fit-content;
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

				.CodeMirror-scroll {
					min-height: 4em !important;
					height: fit-content;
				}
			}

			.editor-preview {
				display: none;
			}
		}
	}
}
</style>
