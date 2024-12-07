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
			charsString: "",
		}
	},
	created () {
		const charSet = new Set()

		const works = this.$store.getters.getWorks
		const skills = this.$store.getters.getSkills
		const awards = this.$store.getters.getAwards
		works.forEach((work) => {
			for (const workKey in work) {
				if (typeof work[workKey] === "string") {
					work[workKey].split("").forEach((char) => {
						if (!charSet.has(char)) {
							charSet.add(char)
							this.charsString += char
						}
					})
				}
			}
		})
		skills.forEach((skill) => {
			for (const skillKey in skill) {
				if (typeof skill[skillKey] === "string") {
					skill[skillKey].split("").forEach((char) => {
						if (!charSet.has(char)) {
							charSet.add(char)
							this.charsString += char
						}
					})
				}
			}
		})
		awards.forEach((award) => {
			for (const awardKey in award) {
				if (typeof award[awardKey] === "string") {
					award[awardKey].split("").forEach((char) => {
						if (!charSet.has(char)) {
							charSet.add(char)
							this.charsString += char
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
