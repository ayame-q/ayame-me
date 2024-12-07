<template>
	<div id="index">
		<header-nav v-bind:scroll-y="scrollY" />
		<main ref="main">
			<first-look />
			<about-me />
			<skills-list />
			<works-list v-bind:works="works" v-bind:scroll-y="scrollY" v-bind:window-width="windowWidth" v-bind:window-height="windowHeight" />
			<awards-list v-bind:scroll-y="scrollY" v-bind:window-width="windowWidth" v-bind:window-height="windowHeight" />
			<contacts />
		</main>
		<scroll-top />
		<div class="title-font">
			〜
		</div>
		<footer>
			<p><small>&copy; 2021 - 2023 Ayame Tatematsu</small></p>
		</footer>
		<font-char-set />
	</div>
</template>

<script>

export default {
	scrollToTop: false,
	data () {
		return {
			scrollY: 0,
			windowWidth: 0,
			windowHeight: 0,
		}
	},
	computed: {
		works () {
			return this.$store.getters.getWorks
		},
	},
	mounted () {
		this.loadWebFont()
		window.addEventListener("scroll", this.onScroll)
		window.addEventListener("resize", this.onResizeWindow)
		this.scrollY = window.scrollY
		this.onResizeWindow()
		this.trackScroll()
	},
	beforeDestroy () {
		window.removeEventListener("scroll", this.onScroll)
	},
	methods: {
		loadWebFont () {
			try {
				/* global Ts */
				Ts.loadFont()
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e)
			}
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
			Array.prototype.forEach.call(sectionElements, (element) => {
				observer.observe(element)
			})
		},
		onResizeWindow () {
			this.windowWidth = window.innerWidth
			this.windowHeight = window.innerHeight
		},
	},
}
</script>

<style lang="scss" scoped>

h2,
::v-deep h2 {
	margin-left: 5vw;
	font-size: 1.8rem;

	img {
		height: 3rem;
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
