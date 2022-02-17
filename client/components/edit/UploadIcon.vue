<template>
	<Upload ref="upload" v-bind:is-small="true" class="upload-box" v-on:uploaded="onUploaded" v-on:click="onClickUploadArea" />
</template>

<script>
import Upload from "~/components/edit/Upload"
export default {
	name: "UploadIcon",
	components: { Upload },
	props: {
		value: {
			type: String,
			default () { return "" },
		},
	},
	methods: {
		onUploaded (input) {
			this.$emit("input", input)
		},
		onClickUploadArea () {
			this.$refs.upload.onClickFileSelectButton()
		},
	},
}
</script>

<style lang="scss" scoped>
.upload-box {
	cursor: pointer;
}
</style>
