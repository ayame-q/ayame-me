<template>
	<header v-bind:style="{height: `max(8.2vw, ${navHeight}px)`}">
		<nav>
			<ul>
				<li class="balloon" v-bind:style="{top: '1vw'}">
					<nuxt-link v-scroll-to="'#about-me'" to="">
						<img src="@/assets/img/menu-aboutme.svg" alt="About Me">
					</nuxt-link>
				</li>
				<li class="balloon" v-bind:style="{top: `max(1.5vw, calc(3.2vw - ${scrollY}px)`}">
					<nuxt-link v-scroll-to="'#skills'" to="">
						<img src="@/assets/img/menu-skills.svg" alt="Skills">
					</nuxt-link>
				</li>
				<li class="balloon" v-bind:style="{top: `max(1vw, calc(5.4vw - ${scrollY}px)`}">
					<nuxt-link v-scroll-to="'#works'" to="">
						<img src="@/assets/img/menu-works.svg" alt="Works">
					</nuxt-link>
				</li>
				<li class="balloon" v-bind:style="{top: `max(1.5vw, calc(7.6vw - ${scrollY}px)`}">
					<nuxt-link v-scroll-to="'#awards'" to="">
						<img src="@/assets/img/menu-awards.svg" alt="Awards & Experiences">
					</nuxt-link>
				</li>
				<li class="balloon" v-bind:style="{top: `max(1vw, calc(9.8vw - ${scrollY}px)`}">
					<nuxt-link v-scroll-to="'#contacts'" to="">
						<img src="@/assets/img/menu-contacts.svg" alt="Contacts">
					</nuxt-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: "HeaderNav",
	props: {
		scrollY: Number,
	},
	computed: {
		navHeight () {
			if (!process.browser) {
				return 0
			}
			const vw = window.innerWidth / 100
			return 25 * vw - ((25 * vw - 8.2 * vw) / (9.8 * vw - vw) * this.scrollY)
		},
	},
}
</script>

<style lang="scss" scoped>
header {
	position: fixed;
	top: 0;
	right: 0;
	width: 36vw;
	height: 30vw;
	overflow: hidden;
	z-index: 99;

	&.scrolled {
		height: 8.2vw;
	}

	nav {
		ul {
			display: flex;
			list-style: none;
			padding: 0;
			margin-left: auto;
			margin-right: 0;
			justify-content: space-around;
			align-items: center;
			position: relative;

			li {
				&:nth-child(2n + 1) {
					img {
						width: 4.5vw;
					}
				}

				&:nth-child(2n) {
					img {
						width: 3.8vw;
					}
				}

				position: absolute;

				&:nth-child(1) {
					right: 29vw;
				}

				&:nth-child(2) {
					right: 22.5vw;
				}

				&:nth-child(3) {
					right: 15.5vw;
				}

				&:nth-child(4) {
					right: 9vw;
				}

				&:nth-child(5) {
					right: 2vw;
				}
			}
		}
	}
}
</style>
