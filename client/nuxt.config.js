export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "ayame.me",
		titleTemplate: "%s - ayame.me",
		htmlAttrs: {
			lang: "ja",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "UI/UX Designer. UI/UX Designer 立松あやめのポートフォリオサイトです。" },
			{ name: "format-detection", content: "telephone=no" },
			{ hid: "keywords", name: "keywords", content: "立松 あやめ" },
			{ hid: "og:site_name", property: "og:site_name", content: "ayame.me" },
			{ hid: "og:type", property: "og:type", content: "website" },
			{ hid: "og:url", property: "og:url", content: "https://ayame.me/" },
			{ hid: "og:title", property: "og:title", content: "ayame.me | Ayame Tatematsu Portfolio" },
			{ hid: "og:description", property: "og:description", content: "UI/UX Designer. UI/UX Designer UI/UX Designer 立松あやめのポートフォリオサイトです。" },
			{ hid: "og:image", property: "og:image", content: "https://ayame.me/eyecatch.png" },
			{ hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
			{ hid: "twitter:site", name: "twitter:site", content: "@ayame_q" },
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
		],
		script: [
			{ src: "//typesquare.com/3/tsst/script/ja/typesquare.js?60aa9f657b0c4f27bf3549c2e90393a3", charSet: "utf-8" },
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"@/assets/scss/_common.scss",
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "@/plugins/v-scroll-lock.client.js", mode: "client" },
		{ src: "@/plugins/v-click-outside.client.js", mode: "client" },
		{ src: "@/plugins/vue-easymde.client.js", mode: "client" },
		{ src: "@/plugins/vue-loading.client.js", mode: "client" },
		{ src: "@/plugins/vue-js-modal.js" },
		{ src: "@/plugins/initialize.client.js", mode: "client" },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
		// https://go.nuxtjs.dev/stylelint
		"@nuxtjs/stylelint-module",
		// https://github.com/nuxt-community/style-resources-module
		"@nuxtjs/style-resources",
	],

	// ESLint Configuration: https://github.com/nuxt-community/eslint-module
	eslint: {
		fix: true,
	},

	// StyleLint Configuration: https://github.com/nuxt-community/stylelint-module
	stylelint: {
		fix: true,
	},

	// Style Resources Configuration: https://github.com/nuxt-community/style-resources-module
	styleResources: {
		scss: ["@/assets/scss/*.scss"],
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://content.nuxtjs.org/ja/
		"@nuxt/content",
		// https://http.nuxtjs.org/
		"@nuxt/http",
		// https://github.com/rigor789/vue-scrollto
		"vue-scrollto/nuxt",
		// https://portal-vue.linusb.org
		"portal-vue/nuxt",
		// https://github.com/nuxt-community/google-gtag-module
		"@nuxtjs/google-gtag",
	],

	content: {
		fullTextSearchFields: ["uuid", "slug", "title", "description"],
	},

	// http module configuration: https://http.nuxtjs.org/options
	http: {
		baseURL: "/",
	},

	// Middlewares: https://nuxtjs.org/ja/docs/directory-structure/middleware/
	router: {
		middleware: [
			"checkIsEditable",
		],
	},

	// Google gtag configuration: https://github.com/nuxt-community/google-gtag-module
	"google-gtag": {
		id: "UA-97540933-2",
		additionalAccounts: [{
			id: "G-M9BBX4E3PP",
		}],
	},

	generate: {
		async routes () {
			const { $content } = require("@nuxt/content")
			const files = await $content().only(["path"]).fetch()

			return files.map(file => file.path === "/index" ? "/" : file.path)
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
}
