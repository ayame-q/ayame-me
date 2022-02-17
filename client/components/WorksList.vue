<template>
	<section id="works" ref="works" v-bind:style="{height: `${15 * works.length + 100}vh`}">
		<div class="content" v-bind:class="{active: isWorksActive}">
			<div class="meta">
				<h2>Works</h2>
				<ul class="options" v-bind:class="{active: isWorksActive}">
					<li v-if="isEditable">
						<nuxt-link to="/works/order">
							<img src="@/assets/img/order-gold.svg" alt="並び替え">
						</nuxt-link>
					</li>
					<li v-if="isEditable">
						<nuxt-link to="/works/new">
							<img src="@/assets/img/add-gold.svg" alt="追加">
						</nuxt-link>
					</li>
				</ul>
			</div>
			<div class="works-list">
				<article v-for="(work, index) of works" v-bind:key="index" class="teacup">
					<nuxt-link v-bind:to="`/works/${work.slug}`">
						<h3 v-html="work.title" />
						<p class="subtitle" v-html="work.subTitle" />
						<p>
							<img class="thumbnail" v-bind:src="work.thumbnail" alt="">
							<span v-if="index % 2 === 0">
								<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
							</span>
							<span v-else>
								<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
							</span>
						</p>
					</nuxt-link>
				</article>
				<div v-for="n of 12" v-bind:key="n" class="teacup">
					<p>
						<span v-if="n % 2 === (works.length % 2 === 0 ? 1 : 0)">
							<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
							<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
						</span>
						<span v-else>
							<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
							<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
						</span>
					</p>
				</div>
			</div>
			<div class="teacups-ground" />
		</div>
	</section>
</template>

<script>
export default {
	name: "WorksList",
	props: {
		scrollY: Number,
		windowWidth: Number,
		windowHeight: Number,
		works: Array,
	},
	data () {
		return {
			isWorksActive: false,
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
	watch: {
		scrollY () {
			if (this.isWorksActive) {
				this.updateTeacup()
			}
		},
		windowWidth () {
			this.updateTeacup()
		},
		windowHeight () {
			this.updateTeacup()
		},
	},
	mounted () {
		const options = {
			root: null,
			rootMargin: "90% 0% -90% 0%",
			threshold: 0,
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				this.isWorksActive = entry.isIntersecting
			})
		}, options)
		observer.observe(this.$refs.works)
		const teacups = this.$refs.works.getElementsByClassName("teacup")
		Array.prototype.forEach.call(teacups, (teacup, index) => {
			const scrollPos = 0
			const { position, width, isActive, fontSize } = this.getTeacupPosition(scrollPos, index)
			teacup.style.bottom = position.y + "px"
			teacup.style.left = position.x + "px"
			teacup.style.width = width + "vw"
			teacup.style.zIndex = (teacups.length - index).toString()
			teacup.style.display = ((isActive) ? "block" : "none")
			teacup.style.fontSize = fontSize + "px"
		})
	},
	methods: {
		updateTeacup () {
			// console.log((-this.$refs.works.getBoundingClientRect().y >= 0) ? -this.$refs.works.getBoundingClientRect().y : 0)
			const teacups = this.$refs.works.getElementsByClassName("teacup")
			Array.prototype.forEach.call(teacups, (teacup, index) => {
				const scrollPos = Math.floor((-this.$refs.works.getBoundingClientRect().y >= 0) ? -this.$refs.works.getBoundingClientRect().y : 0)
				const { position, width, isActive, fontSize } = this.getTeacupPosition(scrollPos, index)
				teacup.style.bottom = position.y + "px"
				teacup.style.left = position.x + "px"
				teacup.style.width = width + "vw"
				teacup.style.zIndex = (teacups.length - index).toString()
				teacup.style.display = ((isActive) ? "block" : "none")
				teacup.style.fontSize = fontSize + "px"
			})
		},
		getTeacupPosition (count, teacupNum) {
			const longRadius = this.windowWidth * 1.15 / 2
			const shortRadius = this.windowHeight * 0.28 / 2

			// スクロール位置 * 角速度 + 45°(円の8等分) * ティーカップ番号 - 90°(初期値を円の下にする)
			const speed = 0.005
			const radian = count * -speed + 2 * Math.PI / 8 * teacupNum + Math.PI / 2 * 3

			// 座標
			const position = {
				x: Math.floor(longRadius * Math.cos(radian)) + this.windowWidth / 100 * 5.2,
				y: Math.floor(shortRadius * Math.sin(radian)) + shortRadius + this.windowHeight / 100 * 13,
			}

			const viewPosition = { y: this.windowHeight / 100 * -30 }
			const distance = Math.abs((position.y - viewPosition.y))
			const width = 50 * Math.abs(viewPosition.y) / distance
			const fontSize = Math.floor((this.windowWidth / 100 * 2.3) * Math.abs(viewPosition.y) / distance)
			const isActive = -3 / 2 * Math.PI + 2 / 8 * Math.PI * teacupNum <= count * speed && count * speed < 1 / 2 * Math.PI + 2 / 8 * Math.PI * teacupNum
			return { position, width, isActive, fontSize }
		},
	},
}
</script>

<style lang="scss" scoped>
#works {
	position: relative;

	.meta {
		display: flex;
		width: 60vw;
		height: 5rem;
		justify-content: space-between;
		align-items: center;

		ul.options {
			list-style: none;
			display: flex;
			visibility: hidden;
			opacity: 0;
			transition: 0.2s;

			&.active {
				visibility: visible;
				opacity: 1;
				transition: 0.5s;
			}

			li {
				cursor: pointer;
				margin: 0 1rem;

				&:last-child {
					margin-right: 0;
				}

				img {
					display: block;
					width: 1rem;
				}
			}
		}
	}

	.content {
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	.works-list {
		padding: 0;

		.teacup {
			position: absolute;

			h3 {
				position: absolute;
				width: fit-content;
				text-align: center;
				bottom: 45%;
				left: 45%;
				transform: translateX(-50%);
				z-index: 4;
				font-size: 1.2em;
				line-height: 1em;
			}

			p.subtitle {
				position: absolute;
				width: fit-content;
				bottom: 65%;
				left: 45%;
				transform: translateX(-50%);
				z-index: 4;
				font-size: 1em;
			}

			img.thumbnail {
				position: absolute;
				width: 70%;
				bottom: 82%;
				left: 50%;
				transform: translateX(-58%);
				z-index: 2;
			}

			img.teacup-back {
				position: absolute;
				width: 81.7%;
				margin-left: 3.5%;
				bottom: 90%;
				z-index: 1;
			}

			img.teacup-front {
				position: relative;
				z-index: 3;
			}
		}
	}

	.teacups-ground {
		position: absolute;
		z-index: -1;
		bottom: 5vh;
		right: 7.5vw;
		background-image: url("~/assets/img/teacups-ground.svg");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 160vw;
		height: 50vh;
	}
}
</style>
