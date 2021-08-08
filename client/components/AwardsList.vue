<template>
	<section id="awards">
		<h2>Awards & Experiences</h2>
		<ul>
			<li>
				<time>2021.7</time>
				<span class="text">
					<span>東京商工会議所</span>
					<span>カラーコーディネーター検定</span>
					<span>スタンダードクラス 合格</span>
				</span>
			</li>
			<li>
				<time>2020.5</time>
				<span class="text">
					<span>2019年度東洋大学情報連携学部</span>
					<span>プログラミング技術優秀者</span>
					<span>受賞</span>
				</span>
			</li>
			<li>
				<time>2020.2〜</time>
				<span class="text">
					<span>INIAD公認サークル</span>
					<span>Webメディア研究会</span>
					<span>代表</span>
				</span>
			</li>
			<li>
				<span class="time">
					<span class="period">
						<time class="start">2020.2〜</time>
						<time class="end">2021.2</time>
					</span>
					<span><img src="@/assets/img/arrow-pink.svg" alt="→"></span>
					<time>2021.2〜</time>
				</span>
				<span class="text">
					<span>INIAD-FES(大学祭)実行委員会</span>
					<span class="period">
						<span>広報部長</span>
						<span><img src="@/assets/img/arrow-white.svg" alt="→"></span>
						<span>副委員長</span>
					</span>
				</span>
			</li>
			<li>
				<time>2016.10〜</time>
				<span class="text">
					<span>経済産業省</span>
					<span>基本情報技術者試験</span>
					<span>合格</span>
				</span>
			</li>
		</ul>
		<div class="ferriswheel-pillar" />
	</section>
</template>

<script>
export default {
	name: "AwardsList",
}
</script>

<style lang="scss" scoped>
#awards {
	position: relative;
	width: 100%;
	height: calc(100vw / 1231.4572 * 1776.1758 - 15vw);

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

			img {
				width: 1em;
			}

			&:nth-child(1) {
				top: 3vw;
				left: 67vw;
			}

			&:nth-child(2) {
				top: 20vw;
				left: 30vw;
			}

			&:nth-child(3) {
				top: 53vw;
				left: 17vw;
			}

			&:nth-child(4) {
				top: 86vw;
				left: 33vw;
			}

			&:nth-child(5) {
				top: 98vw;
				left: 67vw;
			}

			> time,
			> span.period {
				position: absolute;
				width: fit-content;
				display: block;
				font-size: 1.3vw;
				left: 48%;
				transform: translateX(-50%);
				bottom: 55%;
				color: #c37394;
			}

			span.time {
				position: absolute;
				display: block;
				left: 48%;
				transform: translateX(-50%);
				bottom: 55%;
				font-size: 1.3vw;
				color: #c37394;
				width: 90%;

				>time,
				>span {
					&:nth-child(1) {
						position: absolute;
						right: 78%;
						bottom: 0;
						transform: translateX(-50%);
					}

					&:nth-child(2) {
						position: absolute;
						left: 50%;
						bottom: 0.1vw;
						transform: translateX(-50%);
					}

					&:nth-child(3) {
						position: absolute;
						left: 70%;
						bottom: 0;
						transform: translateX(-50%);
					}
				}

				time {
					position: absolute;
					display: block;
					bottom: 0;

					&.start {
						bottom: 1.1em;
						left: -0.8em;
					}
				}
			}

			span.text {
				color: #fff;
				white-space: nowrap;

				> span {
					position: absolute;
					width: fit-content;
					display: block;
					font-size: 1.3vw;

					&:nth-child(1) {
						left: 10%;
						bottom: 28%;
					}

					&:nth-child(2) {
						left: 48%;
						transform: translateX(-50%);
						bottom: 17%;
					}

					&:nth-child(3) {
						right: 22%;
						bottom: 6%;
					}

					&.period {
						left: 48%;
						transform: translateX(-50%);
						width: 90%;

						span {
							position: absolute;
							display: block;
							width: fit-content;

							&:nth-child(1) {
								right: 68%;
								transform: translateX(50%);
							}

							&:nth-child(2) {
								left: 50%;
								transform: translateX(-50%);
							}

							&:nth-child(3) {
								left: 68%;
								transform: translateX(-50%);
							}
						}
					}
				}
			}
		}
	}

	.ferriswheel-pillar {
		position: absolute;
		background-image: url("assets/img/ferriswheel-pillar.svg");
		background-size: 100vw 100%;
		background-repeat: no-repeat;
		width: 70vw;
		height: calc(100vw / 1231.4572 * 1776.1758);
		left: 30vw;
		top: 5rem;
	}
}
</style>
