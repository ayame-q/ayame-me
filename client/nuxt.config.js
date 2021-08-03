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
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" },
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
		],
		script: [
			{ src: "//typesquare.com/3/tsst/script/ja/typesquare.js?60aa9f6540dc426583e049c2e90393a3&onload=false", charSet: "utf-8" },
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"@/assets/scss/_common.scss",
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "@/plugins/v-scroll-lock.client.js", mode: "client" },
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
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://github.com/rigor789/vue-scrollto
		"vue-scrollto/nuxt",
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
}
