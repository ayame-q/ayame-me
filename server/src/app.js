const express = require("express")
const fs = require("fs").promises
const multer = require("multer")
const uuid = require("uuid").v4
const path = require("path")

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
		},
	}),
})
const port = process.env.PORT

let worksMaxOrder = 0;
let skillsMaxOrder = 0;

const initialize = async () => {
	const workFileNames = await fs.readdir(`${contentPath}/works/`)
	for (const fileName of workFileNames) {
		if (fileName.match(/\.json$/)) {
			const filePath = path.join(contentPath, "/works/", fileName)
			const fileData = JSON.parse(await fs.readFile(filePath, "utf8"))
			if (fileData.order > worksMaxOrder) {
				worksMaxOrder = fileData.order
			}
		}
	}
	console.log("WorksMaxOrder:", worksMaxOrder)
	const skillFileNames = await fs.readdir(`${contentPath}/skills/`)
	for (const fileName of skillFileNames) {
		if (fileName.match(/\.json$/)) {
			const filePath = path.join(contentPath, "/skills/", fileName)
			const fileData = JSON.parse(await fs.readFile(filePath, "utf8"))
			if (fileData.order > skillsMaxOrder) {
				skillsMaxOrder = fileData.order
			}
		}
	}
	console.log("SkillsMaxOrder:", skillsMaxOrder)
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`)
	})
}

app.use(express.json())

app.get("/health_check", (req, res) => {
	console.log(`[${req.method}: ${req.path}]`)
	res.status(200).send()
})

const isFileExists = async (filePath) => {
	try {
		return !!(await fs.lstat(filePath))
	} catch (error) {
		return false
	}
}

const getImageFilePathFromUrl = (inputPath) => {
	return imagePath + "/" + inputPath.replace(new RegExp(`^${imageUrl}`), "").replace(new RegExp(`^${encodeURIComponent(imageUrl)}`), "")
}

const save = async (filePath, content, method) => {
	if (method === "POST") {
		if (await isFileExists(filePath)) {
			throw new Error(`${filePath} is already exists.`)
		}
	}
	if (method === "PUT") {
		const fileData = JSON.parse(await fs.readFile(filePath, "utf8"))
		if (!content.uuid) {
			content.uuid = fileData.uuid
		}
	}
	if (method === "PATCH") {
		const fileData = JSON.parse(await fs.readFile(filePath, "utf8"))
		content = Object.assign(fileData, content)
	}
	if (!content.uuid) {
		content.uuid = uuid()
	}
	await fs.writeFile(filePath, JSON.stringify(content), "utf8")
	const fileData = await fs.readFile(filePath, "utf8")
	return JSON.parse(fileData)
}

const onContentWorksRequest = (req, res, next) => {
	const filePath = `${contentPath}/works/${req.params.slug}.json`
	console.log(`[${req.method}: ${req.path}]`, filePath)
	const content = req.body
	let orderAdded = false
	if (!content.order) {
		content.order = worksMaxOrder + 1
		orderAdded = true
	}
	save(filePath, content, req.method)
		.then(content => {
			res.json(content)
			if (orderAdded) {
				worksMaxOrder++
			}
		})
		.catch(err => {
			next(err)
		})
}

const onContentSkillsRequest = (req, res, next) => {
	const filePath = `${contentPath}/skills/${req.params.slug}.json`
	console.log(`[${req.method}: ${req.path}]`, filePath)
	const content = req.body
	let orderAdded = false
	if (!content.order) {
		content.order = skillsMaxOrder + 1
		orderAdded = true
	}
	save(filePath, content, req.method)
		.then(content => {
			res.json(content)
			if (orderAdded) {
				skillsMaxOrder++
			}
		})
		.catch(err => {
			next(err)
		})
}

app.post("/works/:slug", onContentWorksRequest)

app.put("/works/:slug", onContentWorksRequest)

app.patch("/works/:slug", onContentWorksRequest)

app.post("/skills/:slug", onContentSkillsRequest)

app.put("/skills/:slug", onContentSkillsRequest)

app.patch("/skills/:slug", onContentSkillsRequest)

app.post("/image/", upload.single("file"), (req, res) => {
	const filePath = req.file.path
	console.log(`[${req.method}: ${req.path}]`, filePath)
	res.json({
		"type": "image",
		"url": imageUrl + req.file.filename,
	})
})

process.on("SIGTERM", async () => {
	const images = []

	console.log("Process is terminating...")
	const workFileNames = await fs.readdir(`${contentPath}/works/`)
	for (const fileName of workFileNames) {
		if (fileName.match(/\.json$/)) {
			const filePath = path.join(contentPath, "/works/", fileName)
			const fileData = JSON.parse(await fs.readFile(filePath, "utf8"))
			images.push(getImageFilePathFromUrl(fileData.thumbnail))
			for (const resource of fileData.resources) {
				if (resource.type === "image") {
					images.push(getImageFilePathFromUrl(resource.url))
				}
			}
		}
	}
	const skillFileNames = await fs.readdir(`${contentPath}/skills/`)
	for (const fileName of skillFileNames) {
		if (fileName.match(/\.json$/)) {
			const filePath = path.join(contentPath, "/skills/", fileName)
			const fileData = JSON.parse(await fs.readFile(filePath, "utf8"))
			images.push(getImageFilePathFromUrl(fileData.icon))
		}
	}

	const imageFileNames = await fs.readdir(`${imagePath}/`)
	for (const imageFileName of imageFileNames) {
		const filePath = `${imagePath}/${imageFileName}`
		if (!images.includes(filePath)) {
			await fs.unlink(filePath)
			console.log("Deleted:", filePath)
		}
	}
	console.log("Clean up is finished. Bye.")
	process.exit(0)
})

initialize()
