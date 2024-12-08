<template>
	<section id="first-look">
		<div class="eye-catch">
			<ul ref="merry-go-round" class="merry-go-round">
				<li class="horse">
					<img src="@/assets/img/merry-go-round-horse-pink.svg" alt="">
				</li>
				<li class="horse">
					<img src="@/assets/img/merry-go-round-horse-yellow.svg" alt="">
				</li>
				<li class="horse">
					<img src="@/assets/img/merry-go-round-horse-blue.svg" alt="">
				</li>
			</ul>
		</div>
		<div class="detail-wrap">
			<div class="detail">
				<h1 class="name">
					<img src="@/assets/img/ayame-tatematsu.svg" alt="Ayame Tatematsu">
				</h1>
				<p class="tag-line">
					<img src="@/assets/img/tag-line.svg" alt="デザインとITで、よりよい”日常”を">
				</p>
				<p class="scroll-down">
					<img src="@/assets/img/scroll-down.svg" alt="Scroll Down">
				</p>
			</div>
		</div>
	</section>
</template>

<script>

export default {
	name: "FirstLook",
	props: {
		scrollY: Number,
		windowWidth: Number,
	},
	watch: {
		scrollY () {
			this.updateHorses()
		},
		windowWidth () {
			this.updateHorses()
		},
	},
	mounted () {
		this.$nextTick(() => {
			this.updateHorses()
		})
	},
	methods: {
		updateHorses () {
			const horses = this.$refs["merry-go-round"].getElementsByClassName("horse")
			Array.prototype.forEach.call(horses, (horse, index) => {
				const { position } = this.getHorsePosition(this.scrollY, index)
				horse.style.top = position + "px"
			})
		},
		getHorsePosition (count, horseNum) {
			const radius = this.windowWidth * 1.00 / 68

			// スクロール位置 * 角速度 + 120°(円の3等分) * ホイール番号 - なんかの角度°(初期値を円の2.6等分した場所にする
			const speed = 0.025
			const radian = count * speed + 2 * Math.PI / 3 * -horseNum + Math.PI / 2 * 2.6

			// 座標
			const position = Math.floor(radius * Math.sin(radian)) + this.windowWidth / 100 * 16.0
			return { position }
		},
	},
}
</script>

<style lang="scss" scoped>

#first-look {
	height: 100vh;
	display: flex;
	align-items: center;
	color: $title-color;
	font-family: "ぺんぱる", Penpal, sans-serif;

	.eye-catch {
		width: 50%;
		display: flex;
		justify-content: center;

		ul.merry-go-round {
			position: relative;
			padding: 0;
			list-style: none;
			width: 32.5vw;
			height: 32vw;
			background-image: url("@/assets/img/merry-go-round-pillar.svg");
			background-position: center;
			background-size: 90%;
			background-repeat: no-repeat;

			li {
				list-style: none;
				width: 12.9vw;

				&:nth-child(1) {
					position: absolute;
					// top: 14vw;  JavaScriptで計算する
					left: -0.45vw;
					z-index: 1;
				}

				&:nth-child(2) {
					position: absolute;
					// top: 17.1vw;  JavaScriptで計算する
					left: 9.7vw;
					z-index: 2;
				}

				&:nth-child(3) {
					position: absolute;
					// top: 14.3vw;  JavaScriptで計算する
					left: 19.3vw;
					z-index: 1;
				}
			}
		}

		p {
			img {
				width: 32vw;
			}
		}
	}

	.detail-wrap {
		width: 50%;
		padding-top: 25vh;
		padding-bottom: 3vh;

		.detail {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: fit-content;
		}

		h1,
		p {
			margin: 0.5em 0;

			&.name img {
				width: 40vw;
			}

			&.tag-line {
				padding-bottom: 3vw;

				img {
					height: 2vw;
				}
			}

			&.scroll-down img {
				width: 2vw;
			}
		}
	}
}
</style>
