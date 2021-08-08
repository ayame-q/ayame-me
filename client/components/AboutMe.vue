<template>
	<section id="about-me">
		<h2>About Me</h2>
		<div class="content">
			<p>東洋大学情報連携学部(INIAD) 3年</p>
			<p class="key">
				Web & UI/UX Designer, Front-end & Web Engineer
			</p>
			<p class="name">
				立松 あやめ
			</p>
			<p>
				現在メディア系大学サークル「Webメディア研究会」の代表をしており、<br>
				様々な分野を学んでいる友人と共に、コロナ禍の中IT技術やデザインを活かした<br>
				オンライン新歓イベントの主催や、学内Web新聞の運営を行っています。
			</p>
			<p>
				また、大学祭実行委員会では広報部長としてデザインチームとシステム開発チームを率いて、<br>
				すべて"1から"自分たちでデザイン・開発した<br>
				"会場を歩き回れるオンライン学祭"を作り上げました。
			</p>
			<p>
				コロナ禍で激しい変化の中、私たちの通う大学の新しい"普通"を<br>
				友人と共に作ってきたと自負しています。さらに素敵なユーザー体験をめざしながら、<br>
				仲間と共にもっと楽しいことをしたいと思っています。
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
