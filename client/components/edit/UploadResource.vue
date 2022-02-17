<template>
	<Upload ref="upload" class="upload-box" v-on:uploaded="onUploaded">
		<p class="buttons">
			<button v-on:click="onClickFileSelectButton">
				ファイルを選択
			</button>
			<button v-on:click="isMovieModalOpen = true">
				Youtube動画を埋め込む
			</button>
		</p>
		<AddResourceMovieModal v-if="isMovieModalOpen" v-on:close="isMovieModalOpen = false" v-on:add="addResource" />
	</Upload>
</template>

<script>
import Upload from "~/components/edit/Upload"
import AddResourceMovieModal from "~/components/edit/AddResourceMovieModal"
export default {
	components: { AddResourceMovieModal, Upload },
	props: {
		value: {
			type: Array,
			default () { return [] },
		},
	},
	data () {
		return {
			resources: [],
			isMovieModalOpen: false,
		}
	},
	created () {
		this.resources = this.value
	},
	methods: {
		onUploaded (input) {
			this.resources.push({
				type: "image",
				url: input,
			})
			this.$emit("input", this.resources)
		},
		addResource (input) {
			this.resources.push(input)
			this.$emit("input", this.resources)
		},
		onClickFileSelectButton () {
			this.$refs.upload.onClickFileSelectButton()
		},
	},
}
// TODO: Youtubeの並び替え対応
</script>
<style lang="scss" scoped>
.upload-box {
	margin: 1rem 0;
	width: 100%;

	p.buttons {
		display: flex;
		width: 100%;
		padding: 0 5%;
		justify-content: space-around;

		button {
			color: $main-color;
			border: $main-color solid 3px;
			background-color: transparent;
			padding: 3% 0;
			width: 38%;
			cursor: pointer;

			&:hover {
				color: #fff;
				background-color: $main-color;
			}
		}
	}
}

</style>
