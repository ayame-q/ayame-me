<template>
	<div>
		<!-- PDFファイル選択 -->
		<input
			type="file"
			accept="application/pdf"
			v-on:change.prevent="uploadPdf"
		>

		<!-- レンダリング用canvas -->
		<canvas ref="canvas" />
	</div>
</template>

<script>
import PDFJS from "pdfjs-dist"
export default {
	methods: {
		async uploadPdf (e) {
			const MAX_PORTFOLIO_PDF_IMAGE_WIDTH = 1920
			// PDFファイルデータをArrayBuffer型で取得
			const fileData = await this.readFileAsync(e.target.files[0])

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

				// multipart/form-data形式でアップロード
				// ここはアップロード先のAPIの仕様によって変わります
				const formData = new FormData()
				formData.append("image_file", imageFile)
				console.log(imageFile)
				// await this.$axios.post("APIのエンドポイント", formData)
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
