<template>
	<div id="index">
		<header-nav v-bind:scroll-y="scrollY" />
		<main ref="main">
			<first-look />
			<about-me />
			<skills-list />
			<works-list v-bind:works="works" v-bind:scroll-y="scrollY" />
			<awards-list />
			<contacts />
		</main>
		<scroll-top />
		<div class="title-font">
			〜
		</div>
		<footer>
			<p><small>&copy; 2021 Ayame Tatematsu</small></p>
		</footer>
	</div>
</template>

<script>
export default {
	scrollToTop: false,
	data () {
		return {
			scrollY: 0,
		}
	},
	computed: {
		works () {
			return this.$store.getters["works/getAll"]
		},
	},
	mounted () {
		this.loadWebFont()
		window.addEventListener("scroll", this.onScroll)
		this.scrollY = window.scrollY
		this.trackScroll()
	},
	beforeDestroy () {
		window.removeEventListener("scroll", this.onScroll)
	},
	methods: {
		loadWebFont () {
			/* global Ts */
			Ts.loadFont()
		},
		onScroll (event) {
			this.scrollY = window.scrollY
		},
		trackScroll () {
			const options = {
				root: null,
				rootMargin: "90% 0% -90% 0%",
				threshold: 0,
			}
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const elementName = entry.target.getAttribute("id")
						this.$gtag("event", `show_${elementName}`, {})
					}
				})
			}, options)
			const sectionElements = this.$refs.main.getElementsByTagName("section")
			sectionElements.forEach((element) => {
				observer.observe(element)
			})
		},
	},
}
</script>

<style lang="scss" scoped>

h2,
::v-deep h2 {
	margin-left: 5vw;
	font-size: 1.8rem;

	&::before {
		content: "〜";
		margin-right: 0.1em;
	}

	&::after {
		content: "〜";
		margin-left: 0.1em;
	}
}

footer {
	background-color: $main-color;
	color: #fff;
	text-align: center;
	padding: 1rem;
}

.title-font {
	display: none;
	font-family: "ぺんぱる", Penpal, sans-serif;
}
</style>
