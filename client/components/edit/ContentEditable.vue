<template>
	<component
		v-bind:is="tag"
		ref="element"
		v-bind:contenteditable="contenteditable"
		v-bind:style="styleVariables"
		class="contenteditable-wrap"
		v-bind:class="{blank: !value}"
		v-on:input="update"
		v-on:blur="update"
		v-on:paste="onPaste"
		v-on:keypress="onKeypress"
		v-on:keydown="fwdEv"
		v-on:keyup="fwdEv"
		v-on:mouseenter="fwdEv"
		v-on:mouseover="fwdEv"
		v-on:mousemove="fwdEv"
		v-on:mousedown="fwdEv"
		v-on:mouseup="fwdEv"
		v-on:auxclick="fwdEv"
		v-on:click="fwdEv"
		v-on:dblclick="fwdEv"
		v-on:contextmenu="fwdEv"
		v-on:wheel="fwdEv"
		v-on:mouseleave="fwdEv"
		v-on:mouseout="fwdEv"
		v-on:select="fwdEv"
		v-on:pointerlockchange="fwdEv"
		v-on:pointerlockerror="fwdEv"
		v-on:dragstart="fwdEv"
		v-on:drag="fwdEv"
		v-on:dragend="fwdEv"
		v-on:dragenter="fwdEv"
		v-on:dragover="fwdEv"
		v-on:dragleave="fwdEv"
		v-on:drop="fwdEv"
		v-on:transitionstart="fwdEv"
		v-on:transitioncancel="fwdEv"
		v-on:transitionend="fwdEv"
		v-on:transitionrun="fwdEv"
		v-on:compositionstart="fwdEv"
		v-on:compositionupdate="fwdEv"
		v-on:compositionend="fwdEv"
		v-on:cut="fwdEv"
		v-on:copy="fwdEv"
	/>
</template>

<script>
/*
Copyright (c) 2022 ayame.space

Extends vue-contenteditable (https://github.com/hl037/vue-contenteditable)
    Copyright (c) 2018 Léo Flaventin Hauchecorne
    License: https://github.com/hl037/vue-contenteditable/blob/master/LICENSE

 */

function replaceAll (str, search, replacement) {
	return str.split(search).join(replacement)
}
export default {
	name: "ContentEditable",
	props: {
		tag: String,
		contenteditable: {
			type: Boolean,
			default: true,
		},
		value: String,
		placeholder: {
			type: String,
			default () { return "" },
		},
		noHTML: {
			type: Boolean,
			default: true,
		},
		noNL: {
			type: Boolean,
			default: false,
		},
	},
	data () {
		return {
		}
	},
	computed: {
		styleVariables () {
			return {
				"--placeholder-text": `'${this.placeholder}'`,
			}
		},
	},
	watch: {
		value (newval, oldval) {
			if (newval !== this.current_content()) {
				this.update_content(newval)
			}
		},
	},
	mounted () {
		this.update_content(this.value)
	},
	methods: {
		current_content () {
			return this.noHTML
				? this.$refs.element.innerText
				:				this.$refs.element.innerHTML
		},
		update_content (newcontent) {
			if (this.noHTML) {
				this.$refs.element.innerText = newcontent
			} else {
				this.$refs.element.innerHTML = newcontent
			}
		},
		update (event) {
			this.$emit("input", this.current_content())
		},
		onPaste (event) {
			event.preventDefault()
			let text = (event.originalEvent || event).clipboardData.getData("text/plain")
			if (this.noNL) {
				text = replaceAll(text, "\r\n", " ")
				text = replaceAll(text, "\n", " ")
				text = replaceAll(text, "\r", " ")
			}
			window.document.execCommand("insertText", false, text)
			this.fwdEv(event)
		},
		onKeypress (event) {
			if (event.key === "Enter" && this.noNL) {
				event.preventDefault()
				this.$emit("returned", this.current_content)
			}
			this.fwdEv(event)
		},
		fwdEv (event) {
			this.$emit(event.type, event)
		},
	},
}
</script>

<style lang="scss" scoped>
.contenteditable-wrap {
	&.blank {
		&::after {
			content: var(--placeholder-text);
			opacity: 0.3;
		}
	}
}
</style>
