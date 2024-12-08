<template>
	<section id="first-look">
		<div class="eye-catch">
			<p><img src="@/assets/img/merry-go-round.svg" alt=""></p>
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
