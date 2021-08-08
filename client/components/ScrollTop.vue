<template>
	<div class="scroll-top">
		<p class="balloon">
			<nuxt-link v-scroll-to="'#index'" to="">
				<img src="@/assets/img/scroll-top.svg" alt="Scroll Top">
			</nuxt-link>
		</p>
	</div>
</template>

<script>
export default {
	name: "ScrollTop",
}
</script>

<style lang="scss" scoped>

.scroll-top {
	position: fixed;
	top: 85vh;
	right: 4vw;

	img {
		width: 4.5vw;
	}
}
</style>
