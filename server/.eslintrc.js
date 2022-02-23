module.exports = {
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	parserOptions: {
		parser: "@babel/eslint-parser",
		requireConfigFile: false,
	},
	extends: [],
	plugins: [],
	// add your custom rules here
	rules: {
		indent: ["error", "tab"],
		"no-tabs": 0,
		"no-unused-vars": 1,
		quotes: ["error", "double", {
			avoidEscape: true,
			allowTemplateLiterals: true,
		}],
		"comma-dangle": ["error", "always-multiline"],
	},
}
