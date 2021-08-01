<template>
	<div id="index">
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
		<main>
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
							新しい”普通”を、みんなで
						</p>
						<p class="scroll-down">
							<img src="@/assets/img/scroll-down.svg" alt="Scroll Down">
						</p>
					</div>
				</div>
			</section>
			<div class="coaster-wrap">
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
				<section id="skills">
					<h2>Skills</h2>
					<ul>
						<li style="top: calc(58vw + 37.5vw); left: 7vw; width: 18.5vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-vue.svg" alt="Vue/Nuxt.js">
							</nuxt-link>
						</li>
						<li style="top: calc(58vw + 33.5vw); left: 28vw; width: 18vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-illustrator.svg" alt="Illustrator">
							</nuxt-link>
						</li>
						<li style="top: calc(58vw + 27.2vw); left: 48vw; width: 17vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-htmlcss.svg" alt="HTML5/CSS3">
							</nuxt-link>
						</li>
						<li style="top: calc(58vw + 24vw); left: 67vw; width: 14.5vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-django.svg" alt="Django">
							</nuxt-link>
						</li>
						<li style="top: calc(58vw + 21vw); left: 6vw; width: 14.5vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-javascript.svg" alt="JavaScript">
							</nuxt-link>
						</li>
						<li style="top: calc(58vw + 12.2vw); left: 22vw; width: 13.5vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-photoshop.svg" alt="Photoshop">
							</nuxt-link>
						</li>
						<li style="top: calc(58vw + 6.4vw); left: 35vw; width: 12vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-xd.svg" alt="XD">
							</nuxt-link>
						</li>
						<li style="top: calc(58vw - 0.8vw); left: 47vw; width: 11vw;">
							<nuxt-link to="">
								<img src="@/assets/img/coaster-python.svg" alt="Python">
							</nuxt-link>
						</li>
					</ul>
				</section>
				<div class="coaster-rail" />
			</div>
			<section id="works" ref="works" style="height: 150vh;">
				<div class="content" v-bind:class="{active: isWorksActive}">
					<h2>Works</h2>
					<div class="works-list">
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<h3>INIAD meets web</h3>
								<p class="subtitle">
									学内オンライン新歓イベント
								</p>
								<p>
									<img class="thumbnail" src="/iniadmeetsweb.png" alt="">
									<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
									<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
								</p>
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-blue-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-blue-front.svg" alt="">
							</nuxt-link>
						</article>
						<article>
							<nuxt-link to="">
								<img class="teacup-back" src="@/assets/img/teacup-pink-back.svg" alt="">
								<img class="teacup-front" src="@/assets/img/teacup-pink-front.svg" alt="">
							</nuxt-link>
						</article>
					</div>
					<div class="teacups-ground" />
				</div>
			</section>
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
			<section id="contacts">
				<h2>Contacts</h2>
				<ul>
					<li class="balloon">
						<a href="mailto:s1f101900879@toyo.jp"><img src="@/assets/img/balloon-mail.svg" alt="Email"></a>
					</li>
					<li class="balloon">
						<a href="https://student.redesigner.jp/students/a712f2d416eccc924a60f0b5b1f542fc" target="_blank"><img src="@/assets/img/balloon-redesigner.svg" alt="ReDesigner"></a>
					</li>
					<li class="balloon">
						<a href="https://www.wantedly.com/users/28464463" target="_blank"><img src="@/assets/img/balloon-wantedly.svg" alt="Wantedly"></a>
					</li>
				</ul>
				<div class="will-house">
					<div class="text">
						<p>
							<a href="mailto:s1f101900879@toyo.jp">Thank you for reading!</a>
						</p>
					</div>
				</div>
			</section>
		</main>
		<div class="scroll-top">
			<p class="balloon">
				<nuxt-link v-scroll-to="'#index'" to="">
					<img src="@/assets/img/scroll-top.svg" alt="Scroll Top">
				</nuxt-link>
			</p>
		</div>
		<div class="title-font">
			〜
		</div>
		<footer>
			<p><small>&copy; 2021 Ayame Tatematsu</small></p>
		</footer>
	</div>
</template>

<script>
export default {
	data () {
		return {
			scrollY: 0,
			isWorksActive: false,
		}
	},
	head: {
		title: "ayame.me | Ayame Tatematsu Portfolio",
		titleTemplate: "",
	},
	computed: {
		navHeight () {
			if (!process.browser) { return 0 }
			const vw = window.innerWidth / 100
			return 25 * vw - ((25 * vw - 8.2 * vw) / (9.8 * vw - vw) * this.scrollY)
		},
	},
	mounted () {
		this.loadWebFont()
		window.addEventListener("scroll", this.onScroll)
		this.scrollY = window.scrollY

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
		const teacups = this.$refs.works.getElementsByTagName("article")
		teacups.forEach((teacup, index) => {
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
	beforeDestroy () {
		window.removeEventListener("scroll", this.onScroll)
	},
	methods: {
		loadWebFont () {
			/* global Ts */
			Ts.loadFont()
		},
		onScroll (event) {
			this.scrollY = window.scrollY

			if (this.isWorksActive) {
				const teacups = this.$refs.works.getElementsByTagName("article")
				teacups.forEach((teacup, index) => {
					const scrollPos = Math.floor((-this.$refs.works.getBoundingClientRect().y >= 0) ? -this.$refs.works.getBoundingClientRect().y : 0)
					const { position, width, isActive, fontSize } = this.getTeacupPosition(scrollPos, index)
					teacup.style.bottom = position.y + "px"
					teacup.style.left = position.x + "px"
					teacup.style.width = width + "vw"
					teacup.style.zIndex = (teacups.length - index).toString()
					teacup.style.display = ((isActive) ? "block" : "none")
					teacup.style.fontSize = fontSize + "px"
				})
			}
		},
		getTeacupPosition (count, teacupNum) {
			const longRadius = window.innerWidth * 1.1 / 2
			const shortRadius = window.innerHeight * 0.28 / 2

			// スクロール位置 * 角速度 + 45°(円の8等分) * ティーカップ番号 - 90°(初期値を円の下にする)
			const speed = 0.01
			const radian = count * -speed + 2 * Math.PI / 8 * teacupNum + Math.PI / 2 * 3

			// 座標
			const position = {
				x: Math.floor(longRadius * Math.cos(radian)) + window.innerWidth / 100 * 5.2,
				y: Math.floor(shortRadius * Math.sin(radian)) + shortRadius + window.innerHeight / 100 * 18,
			}

			const viewPosition = { y: window.innerHeight / 100 * -30 }
			const distance = Math.abs((position.y - viewPosition.y))
			const width = 60 * Math.abs(viewPosition.y) / distance
			const fontSize = Math.floor(35 * Math.abs(viewPosition.y) / distance)
			const isActive = -3 / 2 * Math.PI + 2 / 8 * Math.PI * teacupNum <= count * speed && count * speed < 1 / 2 * Math.PI + 2 / 8 * Math.PI * teacupNum
			return { position, width, isActive, fontSize }
		},
	},
}
</script>

<style lang="scss" scoped>

@keyframes balloon-scroll-top {
	0% {
		margin-top: 0;
	}

	100% {
		margin-top: 2vh;
	}
}

@keyframes balloon-nav {
	0% {
		margin-top: 0;
	}

	100% {
		margin-top: 0.5vmin;
	}
}

.balloon {
	animation: balloon-nav 2s ease-in-out infinite alternate;

	&:nth-child(2n + 1) {
		animation-delay: 2s;
	}
}

h2 {
	margin-left: 5vw;
	font-size: 1.8rem;

	&::before {
		content: "〜";
		margin-right: 0.1em;
	}

	&::after {
		content: "〜";
		margin-left: 0.1em;
	}
}

header {
	position: fixed;
	top: 0;
	right: 0;
	width: 36vw;
	height: 30vw;
	overflow: hidden;
	z-index: 999;

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

.scroll-top {
	position: fixed;
	top: 85vh;
	right: 4vw;

	img {
		width: 4.5vw;
	}
}

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

		.detail {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: fit-content;
		}

		h1,
		p {
			margin: 1em 0;

			&.name img {
				width: 40vw;
			}

			&.tag-line {
				font-size: 1.8vw;
			}

			&.scroll-down img {
				width: 2vw;
			}
		}
	}
}

.coaster-wrap {
	position: relative;
	height: calc(100vw / 1366 * 1659.1094);
	margin-bottom: 3.5rem;

	.coaster-rail {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		background-image: url("~/assets/img/coaster-rail.svg");
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: left 152% top;
	}

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

	#skills {
		height: 6em;

		h2 {
			position: sticky;
			top: 0;
		}

		ul {
			list-style: none;
			padding: 0;

			li {
				position: absolute;

				img {
					width: 100%;
				}
			}
		}
	}
}

#works {
	position: relative;

	.content {
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	.works-list {
		padding: 0;

		article {
			position: absolute;

			h3 {
				position: absolute;
				width: fit-content;
				bottom: 45%;
				left: 50%;
				transform: translateX(-63%);
				z-index: 4;
				font-size: 1.2em;
			}

			p.subtitle {
				position: absolute;
				width: fit-content;
				bottom: 65%;
				left: 50%;
				transform: translateX(-60%);
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
		height: 55vh;
	}
}

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

		a {
			font-size: 1.7rem;
			position: absolute;
			left: 43%;
			top: 73%;
			transform: translateX(-50%) translateY(-50%);
			text-decoration: none;
		}
	}
}

footer {
	background-color: #ad5a88;
	color: #fff;
	text-align: center;
	padding: 1rem;
}

.title-font {
	display: none;
	font-family: "ぺんぱる", Penpal, sans-serif;
}
</style>
