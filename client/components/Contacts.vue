<template>
	<section id="contacts">
		<h2>Contacts</h2>
		<ul>
			<li class="balloon">
				<a href="mailto:tatema2@ayame.me"><img src="@/assets/img/balloon-mail.svg" alt="Email"></a>
			</li>
			<li class="balloon">
				<a href="https://twitter.com/ayame_q" target="_blank"><img src="@/assets/img/balloon-twitter.svg" alt="Twitter"></a>
			</li>
			<li class="balloon">
				<a href="https://www.wantedly.com/users/28464463" target="_blank"><img src="@/assets/img/balloon-wantedly.svg" alt="Wantedly"></a>
			</li>
		</ul>
		<div class="will-house">
			<div class="text">
				<p>
					最後までご覧いただきありがとうございます。<br>
					もし興味を持っていただきましたら、ぜひお気軽に<br>
					<a href="mailto:tatema2@ayame.me">メール</a>、<a href="https://www.linkedin.com/in/ayame-tatematsu" target="_blank">Linkedin</a>、<a href="https://twitter.com/ayame_q">Twitter</a>
					などでご連絡ください！
				</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "Contacts",
}
</script>

<style lang="scss" scoped>
#contacts {
	position: relative;
	height: calc(60vw / 825.1942 * 516.4153 + 8rem);

	ul {
		list-style: none;
		padding: 0;

		li {
			position: absolute;

			&:nth-child(1) {
				width: 11vw;
				left: 5vw;
				top: 22vw;
			}

			&:nth-child(2) {
				width: 6vw;
				left: 14vw;
				top: 16.5vw;
			}

			&:nth-child(3) {
				width: 8.5vw;
				left: 23vw;
				top: 10vw;
			}
		}
	}

	.will-house {
		width: 60vw;
		height: calc(60vw / 825.1942 * 516.4153);
		background-image: url("~/assets/img/mail-house.svg");
		background-size: 100%;
		background-repeat: no-repeat;
		position: absolute;
		right: 2vw;

		p {
			font-size: 1.2rem;
			position: absolute;
			left: 43%;
			top: 73%;
			transform: translateX(-50%) translateY(-50%);
			text-decoration: none;
			width: fit-content;
		}
	}
}

</style>
