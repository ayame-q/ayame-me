<template>
	<section id="awards" ref="awards">
		<h2>Awards & Experiences</h2>
		<ul>
			<li v-for="n of 1" v-bind:key="n" class="wheel" />
			<li v-for="(award, index) of awards" v-bind:key="index" class="wheel">
				<!--TODO: keyをuuidに変更 -->
				<time>{{ award.time }}</time>
				<span class="title">
					{{ award.title }}
				</span>
			</li>
			<li v-for="n of 12" v-bind:key="n" class="wheel" />
		</ul>
		<div class="ferriswheel-pillar-base" />
		<div ref="pillarCircle" class="ferriswheel-pillar-circle" />
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
			awards: [
				{
					time: "2023.3",
					title: "東洋大学情報連携学部\n(UI/UXデザイン専攻)\n卒業",
				},
				{
					time: "2022.4〜2023.3",
					title: "椋計人研究室\n(UI/UXデザイン)\n所属",
				},
				{
					time: "2020.2〜2023.1",
					title: "INIAD公認サークル\nWebメディア研究会\n代表",
				},
				{
					time: "2022.11",
					title: "画像情報教育振興協会\nWebデザイナー検定\nエキスパート 合格",
				},
				{
					time: "2021.2〜2022.1",
					title: "INIAD-FES(大学祭)\n実行委員会\n副委員長",
				},
				{
					time: "2021.10",
					title: "経済産業省\n応用情報技術者検定\n合格",
				},
				{
					time: "2021.7",
					title: "東京商工会議所\nカラーコーディネーター検定\nスタンダードクラス 合格",
				},
				{
					time: "2020.2〜2021.2",
					title: "INIAD-FES(大学祭)\n実行委員会\n広報部長",
				},
				{
					time: "2020.5",
					title: "2019年度東洋大学情報連携学部\nプログラミング技術優秀者\n受賞",
				},
				{
					time: "2019.4",
					title: "東洋大学情報連携学部\n(INIAD)\n入学",
				},
				{
					time: "2016.10",
					title: "経済産業省\n基本情報技術者試験\n合格",
				},
			],
		}
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
	},
}
</script>

<style lang="scss" scoped>
#awards {
	position: relative;
	width: 100%;
	height: calc(100vw / 1231.4572 * 1776.1758 - 15vw);
	overflow-x: clip;

	ul {
		list-style: none;
		padding: 0;

		li {
			position: absolute;
			width: 25vw;
			height: calc(25vw / 342.623 * 344.7631);
			background-image: url("~/assets/img/ferriswheel-cargo.svg");
			background-size: 100%;
			background-repeat: no-repeat;
			z-index: 2;
			transform: translateY(-10%);

			img {
				width: 1em;
			}

			time {
				position: absolute;
				width: fit-content;
				display: block;
				font-size: 1.3vw;
				left: 48%;
				transform: translateX(-50%);
				bottom: 55%;
				color: #c37394;
			}

			span.title {
				color: #fff;
				white-space: pre-line;
				position: absolute;
				width: 80%;
				display: block;
				font-size: 1.3vw;
				text-align: center;
				left: 48%;
				bottom: 5%;
				transform: translateX(-50%);
				line-height: 2.2;
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
