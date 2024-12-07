<template>
	<aside class="font-char-set">
		{{ charsString }}
	</aside>
</template>

<script>
export default {
	name: "FontCharSet",
	data () {
		return {
			charSet: new Set(),
			charsString: "",
		}
	},
	computed: {
		works () {
			return this.$store.getters.getWorks
		},
		skills () {
			return this.$store.getters.getSkills
		},
	},
	mounted () {
		this.works.forEach((work) => {
			for (const workKey in work) {
				if (typeof work[workKey] === "string") {
					work[workKey].split("").forEach((char) => {
						if (!this.charSet.has(char)) {
							this.charsString += char
							this.charSet.add(char)
						}
					})
				}
			}
		})
		this.skills.forEach((skill) => {
			for (const skillKey in skill) {
				if (typeof skill[skillKey] === "string") {
					skill[skillKey].split("").forEach((char) => {
						if (!this.charSet.has(char)) {
							this.charsString += char
							this.charSet.add(char)
						}
					})
				}
			}
		})
	},
}
</script>

<style scoped lang="scss">
.font-char-set {
	visibility: hidden;
	height: 0;
	position: absolute;
	top: -9999px;
}
</style>
