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

const isFileExists = async (path) => {
	try {
		return !!(await fs.lstat(path))
	} catch (error) {
		return false
	}
}

const save = async (path, content, method) => {
	if (method === "POST") {
		if (await isFileExists(path)) {
			throw new Error(`${path} is already exists.`)
		}
	}
	if (method === "PUT") {
		const fileData = JSON.parse(await fs.readFile(path, "utf8"))
		if (!content.uuid) {
			content.uuid = fileData.uuid
		}
	}
	if (method === "PATCH") {
		const fileData = JSON.parse(await fs.readFile(path, "utf8"))
		content = Object.assign(fileData, content)
	}
	if (!content.uuid) {
		content.uuid = uuid()
	}
	await fs.writeFile(path, JSON.stringify(content), "utf8")
	const fileData = await fs.readFile(path, "utf8")
	return JSON.parse(fileData)
}

const onContentRequest = (req, res, next) => {
	const path = `${contentPath}/works/${req.params.slug}.json`
	console.log(`[${req.method}: ${req.path}]`, path)
	save(path, req.body, req.method)
		.then(content => {
			res.json(content)
		})
		.catch(err => {
			next(err)
		})
}

app.post("/works/:slug", onContentRequest)

app.put("/works/:slug", onContentRequest)

app.patch("/works/:slug", onContentRequest)

app.post("/skills/:slug", onContentRequest)

app.put("/skills/:slug", onContentRequest)

app.patch("/skills/:slug", onContentRequest)

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
