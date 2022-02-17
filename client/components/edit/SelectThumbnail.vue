<template>
	<div class="thumbnail-wrap">
		<div class="select-wrap">
			<h3>サムネイル画像を選択</h3>
			<ul>
				<li v-for="(resource, index) of obj.resources" v-bind:key="resource.url">
					<input v-bind:id="`thumbnail-radio-${index}`" v-model="obj.thumbnail" type="radio" v-bind:value="resource.url">
					<label v-bind:for="`thumbnail-radio-${index}`">
						<img v-bind:src="resource.url" alt="">
					</label>
				</li>
			</ul>
		</div>
		<div class="upload-wrap">
			<p>または新しくアップロード</p>
			<Upload v-if="!uploadedImage" ref="upload" class="upload-box" v-on:uploaded="onUploaded" v-on:click="onClickUploadArea" />
			<p v-if="uploadedImage" class="upload-image" v-bind:class="{selected: isSelectedUploadedImage}" v-on:click="onClickUploadedImage">
				<img v-bind:src="uploadedImage" alt="">
			</p>
		</div>
	</div>
</template>

<script>
import Upload from "~/components/edit/Upload"
export default {
	name: "SelectThumbnail",
	components: { Upload },
	props: {
		value: {
			type: Object,
			default () { return {} },
		},
	},
	data () {
		return {
			obj: {},
			uploadedImage: "",
		}
	},
	computed: {
		isSelectedUploadedImage () {
			return this.uploadedImage === this.obj.thumbnail
		},
	},
	watch: {
		obj: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		this.obj = { ...this.value }
	},
	methods: {
		onUploaded (input) {
			this.uploadedImage = input
			this.obj.thumbnail = input
		},
		onClickUploadArea () {
			this.$refs.upload.onClickFileSelectButton()
		},
		onClickUploadedImage () {
			if (!this.isSelectedUploadedImage) {
				this.obj.thumbnail = this.uploadedImage
				return
			}
			this.uploadedImage = ""
			this.obj.thumbnail = ""
		},
	},
}
</script>

<style lang="scss" scoped>
.thumbnail-wrap {
	display: flex;
	font-size: 1.2rem;
	justify-content: space-between;

	.select-wrap {
		width: 59%;

		ul {
			max-height: 48vh;
			overflow-y: scroll;
			margin: 0.8rem 0;
			list-style: none;
			padding: 0;
			display: flex;
			flex-wrap: wrap;

			li {
				width: 33%;
				height: 33%;

				label {
					display: block;
					border: transparent 2px solid;
					padding: 2px;
					position: relative;
					cursor: pointer;

					img {
						width: 100%;
						display: block;
					}

					&::before {
						content: "";
						background-color: rgba($text-color, 0.4);
						position: absolute;
						top: 0;
						left: 0;
						width: calc(100% - 4px);
						height: calc(100% - 4px);
						margin: 2px;
					}
				}

				input[type=radio] {
					display: none;

					&:checked + label {
						border: #fff 2px solid;
						cursor: default;

						&::before {
							content: none;
						}
					}
				}
			}
		}
	}

	.upload-wrap {
		width: 38%;
		padding: 0.5rem 0;

		.upload-box,
		.upload-image {
			margin: 0.8rem 0;
			width: 100%;
			cursor: pointer;
		}

		.upload-box {
			background-color: rgba(#fff, 0.7);
		}

		.upload-image {
			border: transparent 2px solid;
			padding: 2px;
			position: relative;

			&::before {
				content: "";
				background-color: rgba($text-color, 0.4);
				position: absolute;
				top: 0;
				left: 0;
				width: calc(100% - 4px);
				height: calc(100% - 4px);
				margin: 2px;
			}

			&.selected {
				border: #fff 2px solid;

				&::before {
					content: none;
				}

				&:hover {
					&::before {
						content: "削除";
						cursor: pointer;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translateX(-50%) translateY(-50%);
						font-size: 1rem;
						width: fit-content;
						height: fit-content;
						background-color: rgba($text-color, 0.7);
						padding: 5% 8%;
						color: #fff;
					}
				}
			}

			img {
				width: 100%;
			}
		}
	}
}
</style>
