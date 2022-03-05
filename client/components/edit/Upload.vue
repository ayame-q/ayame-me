<template>
	<div class="drop-wrap" v-on:click="onClickWrap">
		<div
			class="drop-area"
			v-bind:class="{small: isSmall}"
			v-on:dragover.prevent
			v-on:drop.prevent="onDropFiles"
		>
			<p class="upload-icon" v-bind:class="{small: isSmall}">
				<img src="~/assets/img/upload.svg" alt="">
			</p>
			<div class="buttons">
				<slot />
			</div>
		</div>
		<input ref="fileInput" type="file" class="file-input" accept="application/pdf,image/png,image/jpeg,image/svg+xml" v-on:change.prevent="onSelectFiles">
		<canvas ref="canvas" class="pdf-render" />
	</div>
</template>

<script>
import PDFJS from "pdfjs-dist"
export default {
	props: {
		value: {
			type: Array,
			default () { return [] },
		},
		isSmall: {
			type: Boolean,
			default () { return false },
		},
	},
	methods: {
		onClickWrap (event) {
			this.$emit("click", event)
		},
		onClickFileSelectButton () {
			this.$refs.fileInput.click()
		},
		onSelectFiles (event) {
			for (const file of event.target.files) {
				this.onGetFile(file)
			}
		},
		onDropFiles (event) {
			const files = [...event.dataTransfer.files]
			files.forEach((file) => {
				this.onGetFile(file)
			})
		},
		onGetFile (file) {
			switch (file.type) {
			case "application/pdf":
				this.uploadPdf(file)
				break
			case "image/png":
			case "image/jpeg":
			case "image/svg+xml":
				this.uploadImage(file)
				break
			default:
				// eslint-disable-next-line no-console
				console.error("Unknown file type.", file.type)
			}
		},
		async uploadImage (file) {
			const formData = new FormData()
			formData.append("file", file)
			const response = await this.$http.$post("/api/image/", formData)
			this.$emit("uploaded", response.url)
		},
		async uploadPdf (file) {
			const MIN_PORTFOLIO_PDF_IMAGE_WIDTH = 1920
			const MAX_PORTFOLIO_PDF_IMAGE_WIDTH = 3840
			// PDFファイルデータをArrayBuffer型で取得
			const fileData = await this.readFileAsync(file)

			// PDFファイルのパース
			const pdf = await PDFJS.getDocument({
				data: fileData,
				cMapUrl: "/cmaps/",
				cMapPacked: true,
			})

			// 1ページずつ処理
			for (let i = 1; i <= pdf.numPages; i++) {
				// canvasにレンダリング
				const page = await pdf.getPage(i)
				const canvas = this.$refs.canvas
				let viewport = page.getViewport({ scale: 1 })
				if (viewport.width < MIN_PORTFOLIO_PDF_IMAGE_WIDTH) {
					const newScale = MIN_PORTFOLIO_PDF_IMAGE_WIDTH / viewport.width
					viewport = page.getViewport({ scale: newScale })
				} else if (viewport.width > MAX_PORTFOLIO_PDF_IMAGE_WIDTH) {
					const newScale = MAX_PORTFOLIO_PDF_IMAGE_WIDTH / viewport.width
					viewport = page.getViewport({ scale: newScale })
				}
				canvas.height = viewport.height
				canvas.width = viewport.width
				const context = canvas.getContext("2d")
				const task = page.render({
					canvasContext: context,
					viewport,
				})
				await task.promise

				// canvasにレンダリングされた画像をファイル化
				const base64 = canvas.toDataURL("image/png")
				const tmp = base64.split(",")
				const data = atob(tmp[1])
				const mime = tmp[0].split(":")[1].split(";")[0]
				const buf = new Uint8Array(data.length)
				for (let i = 0; i < data.length; i++) {
					buf[i] = data.charCodeAt(i)
				}
				const blob = new Blob([buf], { type: mime })
				const imageFile = new File([blob], "image.png", {
					lastModified: new Date().getTime(),
				})
				await this.uploadImage(imageFile)
			}
		},
		readFileAsync (file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = () => {
					resolve(reader.result)
				}
				reader.onerror = reject
				reader.readAsArrayBuffer(file)
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.drop-wrap {
	position: relative;

	&::before {
		content: "";
		display: block;
		padding-top: calc(100% / 16 * 9);
	}

	.drop-area {
		width: 100%;
		height: 100%;
		//background-color: $main-color;
		border: $main-color dashed 5px;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&.small {
			border: $main-color dashed 3px;
		}

		p.upload-icon {
			width: 20%;
			margin: 5%;

			&.small {
				width: 50%;
			}

			img {
				width: 100%;
				display: block;
			}
		}

		.buttons {
			width: 100%;
		}
	}

	.pdf-render,
	.file-input {
		position: absolute;
		visibility: hidden;
		z-index: -99;
	}
}
</style>
