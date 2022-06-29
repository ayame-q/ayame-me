<template>
	<section id="about-me">
		<h2>About Me</h2>
		<div class="content">
			<p>東洋大学情報連携学部(INIAD) 4年</p>
			<p class="key">
				UI/UX Designer
			</p>
			<p class="name">
				立松 あやめ
			</p>
			<p>
				私は今までの学生生活においてデザインの力をとても強く感じており、<br>
				特にUI/UXデザイナーとしてよりよいユーザー体験を実現し<br>
				人々の生活を豊かにしたい、よりよい生活を実現したいと考えています。
			</p>
			<p>
				特に普段の日常をちょっとよくする<br>
				そんなアイデアやデザインを考え<br>
				そして実現することをとても楽しいと感じています。
			</p>
			<p>
				さらに素敵なユーザー体験をめざしながら<br>
				仲間と共に人々の生活を少し素敵にする。<br>
				そんなデザインを作っていきたいです。<br>
			</p>
		</div>
	</section>
</template>

<script>
export default {
	name: "AboutMe",
}
</script>

<style lang="scss" scoped>
#about-me {
	.content {
		margin: 0 10vw;
		margin-bottom: 3rem;
		line-height: 2.2em;

		p {
			margin: 1em 0;

			&.key {
				font-family: "ぺんぱる", Penpal, sans-serif;
				font-weight: bold;
				margin-top: -1em;
			}

			&.name {
				font-size: 1.2rem;
			}
		}
	}
}

</style>
