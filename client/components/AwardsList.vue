<template>
	<section id="awards" ref="awards" v-bind:style="{height: `${15 * awards.length + 200}vh`}">
		<div class="meta">
			<h2><img src="@/assets/img/title-awards-experiences.svg" alt="Awards & Experiences"></h2>
			<ul class="options" v-bind:class="{active: isAwardsActive}">
				<li v-if="isEditable">
					<nuxt-link to="/awards/order">
						<img src="@/assets/img/order-gold.svg" alt="並び替え">
					</nuxt-link>
				</li>
			</ul>
		</div>
		<div class="awards-list">
			<div class="wheel">
				<div v-if="isEditable" class="add" v-on:click="add">
					<p>
						<img src="@/assets/img/add-white.svg" alt="+">
					</p>
				</div>
			</div>
			<AwardsListAward
				v-for="(award, index) of awards"
				v-bind:key="award.uuid"
				v-model="awards[index]"
				class="wheel"
			/>
			<div v-for="n of 14" v-bind:key="n" class="wheel" />
			<div class="ferriswheel-pillar-base" />
			<div ref="pillarCircle" class="ferriswheel-pillar-circle" />
		</div>
	</section>
</template>

<script>
export default {
	name: "AwardsList",
	props: {
		scrollY: Number,
		windowWidth: Number,
		windowHeight: Number,
	},
	data () {
		return {
			isAwardsActive: false,
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
		awards () {
			return this.$store.getters.getAwards
		},
	},
	watch: {
		scrollY () {
			if (this.isAwardsActive) {
				this.updateWheel()
			}
		},
		windowWidth () {
			this.updateWheel()
		},
		windowHeight () {
			this.updateWheel()
		},
		awards: {
			handler (newValue) {
				this.updateWheel()
			},
			deep: true,
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
				this.isAwardsActive = entry.isIntersecting
			})
		}, options)
		observer.observe(this.$refs.awards)
		const wheels = this.$refs.awards.getElementsByClassName("wheel")
		Array.prototype.forEach.call(wheels, (wheel, index) => {
			const scrollPos = 0
			const { position, isActive } = this.getWheelPosition(scrollPos, index)
			wheel.style.top = position.y + "px"
			wheel.style.left = position.x + "px"
			wheel.style.display = ((isActive) ? "block" : "none")
		})
	},
	methods: {
		updateWheel () {
			const wheels = this.$refs.awards.getElementsByClassName("wheel")
			const scrollPos = Math.floor((-this.$refs.awards.getBoundingClientRect().y >= 0) ? -this.$refs.awards.getBoundingClientRect().y : 0)
			Array.prototype.forEach.call(wheels, (wheel, index) => {
				const { position, isActive } = this.getWheelPosition(scrollPos, index)
				wheel.style.top = position.y + "px"
				wheel.style.left = position.x + "px"
				wheel.style.display = ((isActive) ? "block" : "none")
			})
			const pillarCircle = this.$refs.pillarCircle
			pillarCircle.style.rotate = this.getWheelDeg(scrollPos) + "deg"
		},
		getWheelPosition (count, wheelNum) {
			const longRadius = this.windowWidth * 1.02 / 2
			const shortRadius = this.windowWidth * 0.95 / 2

			// スクロール位置 * 角速度 + 45°(円の8等分) * ホイール番号 - 90°(初期値を円の下にする)
			const speed = 0.005
			const radian = count * speed + 2 * Math.PI / 8 * -wheelNum + Math.PI / 2 * 3

			// 座標
			const position = {
				x: Math.floor(longRadius * Math.cos(radian)) + this.windowWidth / 100 * 68,
				y: Math.floor(shortRadius * Math.sin(radian)) + shortRadius + this.windowWidth / 100 * 6,
			}

			const isActive = -3 / 2 * Math.PI + 2 / 8 * Math.PI * wheelNum <= count * speed && count * speed < 1 / 2 * Math.PI + 2 / 8 * Math.PI * wheelNum
			return { position, isActive }
		},
		getWheelDeg (count) {
			const speed = 0.005
			const radian = count * speed
			return (radian * 360 / (2 * Math.PI))
		},
		add () {
			this.awards.unshift({
				isEditing: true,
				time: "",
				title: "",
			})
			this.$nextTick(() => {
				this.updateWheel()
			})
		},
	},
}
</script>

<style lang="scss" scoped>
#awards {
	position: relative;
	width: 100%;
	height: calc(100vw / 1231.4572 * 1776.1758 - 15vw);
	overflow-x: clip;

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

	.awards-list {
		position: sticky;
		top: -50vh;

		@media (max-aspect-ratio: 1.2/1) {
			top: 0;
		}

		left: 0;
		width: 100%;
		height: calc(100vw / 1231.4572 * 1776.1758 - 15vw);

		.wheel {
			position: absolute;
			width: 25vw;
			height: calc(25vw / 342.623 * 344.7631);
			background-image: url("~/assets/img/ferriswheel-cargo.svg");
			background-size: 100%;
			background-repeat: no-repeat;
			z-index: 2;
			transform: translateY(-10%);

			.add {
				width: 100%;
				height: 100%;
				cursor: pointer;

				p {
					position: absolute;
					width: 1.5vw;
					display: block;
					left: 48%;
					transform: translateX(-50%);
					bottom: 20%;

					img {
						width: 100%;
					}
				}
			}
		}
	}

	.ferriswheel-pillar-base {
		position: absolute;
		background-image: url("assets/img/ferriswheel-pillar-base.svg");
		background-size: 100% 65%;
		background-repeat: no-repeat;
		background-position: left bottom;
		width: 70vw;
		height: calc(100vw / 1231.4572 * 1776.1758);
		left: 45.3vw;
		top: 5rem;
	}

	.ferriswheel-pillar-circle {
		position: absolute;
		background-image: url("assets/img/ferriswheel-pillar-circle.svg");
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: left top;
		width: 100vw;
		height: 100vw;
		left: 30vw;
		top: 5rem;
		rotate: 0deg;
	}
}
</style>
