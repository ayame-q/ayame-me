<template>
	<div class="drop-wrap">
		<div
			class="drop-area"
			v-on:dragover.prevent
			v-on:drop.prevent="dropFiles"
		/>
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
	},
	data () {
		return {
			resources: [],
		}
	},
	created () {
		this.resources = this.value
	},
	methods: {
		dropFiles (event) {
			const files = [...event.dataTransfer.files]
			files.forEach((file) => {
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
			})
		},
		async uploadImage (file) {
			const formData = new FormData()
			formData.append("file", file)
			const response = await this.$axios.post("http://localhost/api/image/", formData)
			this.resources.push({
				type: "image",
				url: response.data.url,
			})
			this.$emit("input", this.resources)
		},
		async uploadPdf (file) {
			const MAX_PORTFOLIO_PDF_IMAGE_WIDTH = 1920
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
				if (viewport.width > MAX_PORTFOLIO_PDF_IMAGE_WIDTH) {
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
	width: 100%;
	position: relative;

	&::before {
		content: "";
		display: block;
		padding-top: calc(100% / 16 * 9);
	}

	.drop-area {
		width: 100%;
		height: 100%;
		background-color: $main-color;
		position: absolute;
		top: 0;
		left: 0;
	}

	.pdf-render {
		position: absolute;
		visibility: hidden;
		z-index: -99;
	}
}
</style>
