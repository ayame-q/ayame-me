<template>
	<section id="skills">
		<div class="title-wrap">
			<h2>Skills</h2>
		</div>
		<ul>
			<li style="top: calc(2.5vw + 37.5vw); left: 7vw; width: 18.5vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-vue.svg" alt="Vue/Nuxt.js">
				</nuxt-link>
			</li>
			<li style="top: calc(2.5vw + 33.5vw); left: 28vw; width: 18vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-illustrator.svg" alt="Illustrator">
				</nuxt-link>
			</li>
			<li style="top: calc(2.5vw + 27.2vw); left: 48vw; width: 17vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-htmlcss.svg" alt="HTML5/CSS3">
				</nuxt-link>
			</li>
			<li style="top: calc(2.5vw + 24vw); left: 67vw; width: 14.5vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-django.svg" alt="Django">
				</nuxt-link>
			</li>
			<li style="top: calc(2.5vw + 21vw); left: 6vw; width: 14.5vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-javascript.svg" alt="JavaScript">
				</nuxt-link>
			</li>
			<li style="top: calc(2.5vw + 12.2vw); left: 22vw; width: 13.5vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-photoshop.svg" alt="Photoshop">
				</nuxt-link>
			</li>
			<li style="top: calc(2.5vw + 6.4vw); left: 35vw; width: 12vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-xd.svg" alt="XD">
				</nuxt-link>
			</li>
			<li style="top: calc(2.5vw - 0.8vw); left: 47vw; width: 11vw;">
				<nuxt-link to="">
					<img src="@/assets/img/coaster-python.svg" alt="Python">
				</nuxt-link>
			</li>
		</ul>
		<div class="coaster-rail" />
	</section>
</template>

<script>
export default {
	name: "SkillsList",
}
</script>

<style lang="scss" scoped>

#skills {
	position: relative;
	height: calc(100vw / 1366 * 900.1094);
	margin-bottom: 3.5rem;

	.coaster-rail {
		position: absolute;
		height: calc(100vw / 1366 * 1659.1094);
		z-index: -1;
		bottom: 0;
		left: 0;
		width: 100vw;
		background-image: url("~/assets/img/coaster-rail.svg");
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: left 152% top;
	}

	.title-wrap {
		height: 10rem;

		h2 {
			position: sticky;
			top: 0;
		}
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
</style>
