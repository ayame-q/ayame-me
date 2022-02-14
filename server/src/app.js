const express = require("express")
const fs = require("fs").promises
const multer = require('multer')
const uuid = require("uuid").v4

const app = express()
const contentPath = process.env.CONTENT_PATH
const imagePath = process.env.IMAGE_PATH
const imageUrl = process.env.IMAGE_URL
const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, imagePath)
		},
		filename(req, file, cb) {
			const ext = file.originalname.match(/(\.[^.]+?)$/)[1]
			cb(null, uuid() + ext)
		}
	})
})
const port = process.env.PORT

app.use(express.json())

app.get("/health_check", (req, res) => {
	console.log(`[${req.method}: ${req.path}]`)
	res.status(200).send()
})

app.post("/works/:slug", (req, res, next) => {
	const path = `${contentPath}/works/${req.params.slug}.json`
	console.log(`[${req.method}: ${req.path}]`, path)
	fs.writeFile(path, JSON.stringify(req.body), "utf8")
		.then(() => {
			return fs.readFile(path, "utf8")
		})
		.then(content => {
			res.json(JSON.parse(content))
		})
		.catch(err => {
			next(err)
		})
})

app.put("/works/:slug", (req, res, next) => {
	const path = `${contentPath}/works/${req.params.slug}.json`
	console.log(`[${req.method}: ${req.path}]`, path)
	fs.writeFile(path, JSON.stringify(req.body), "utf8")
		.then(() => {
			return fs.readFile(path, "utf8")
		})
		.then(content => {
			res.json(JSON.parse(content))
		})
		.catch(err => {
			next(err)
		})
})

app.patch("/works/:slug", (req, res, next) => {
	const path = `${contentPath}/works/${req.params.slug}.json`
	console.log(`[${req.method}: ${req.path}]`, path)
	fs.readFile(path, "utf8")
		.then(content => {
			const data = Object.assign(JSON.parse(content), req.body)
			return fs.writeFile(path, JSON.stringify(data), "utf8")
		})
		.then(() => {
			return fs.readFile(path, "utf8")
		})
		.then(content => {
			res.json(JSON.parse(content))
		})
		.catch(err => {
			next(err)
		})
})

app.post("/image/", upload.single("file"), (req, res) => {
	const path = req.file.path
	console.log(`[${req.method}: ${req.path}]`, path)
	res.json({
		"type": "image",
		"url": imageUrl + req.file.filename
	})
})

app.delete("/image/", (req, res, next) => {
	const path = imagePath + "/" + req.body.url.replace(new RegExp(`^${encodeURIComponent(imageUrl)}`), "")
	console.log(`[${req.method}: ${req.path}]`, path)
	fs.unlink(path)
		.then(content => {
			res.json({url: req.body.url})
		})
		.catch(err => {
			next(err)
		})
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

process.on("SIGTERM", async () => {
	/*
	TODO
	終了時不要な画像ファイルを削除する処理を追加
	*/
})
