module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	parserOptions: {
		parser: "@babel/eslint-parser",
		requireConfigFile: false,
	},
	extends: [
		"@nuxtjs",
		"plugin:nuxt/recommended",
	],
	plugins: [],
	// add your custom rules here
	rules: {
		indent: ["error", "tab"],
		"no-tabs": 0,
		"no-unused-vars": 1,
		"vue/html-indent": ["error", "tab"],
		"vue/script-indent": ["error", "tab"],
		quotes: ["error", "double", {
			avoidEscape: true,
			allowTemplateLiterals: true,
		}],
		"vue/v-bind-style": ["error", "longform"],
		"vue/v-on-style": ["error", "longform"],
		"vue/no-v-html": 0,
		"comma-dangle": ["error", "always-multiline"],
	},
}
