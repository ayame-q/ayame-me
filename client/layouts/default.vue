<template>
	<div>
		<Home />
		<div v-scroll-lock="isModal" v-bind:class="{ modal: isModal, hidden: isIndex }">
			<Nuxt />
			<button class="close" v-on:click="closeModal">
				<img src="@/assets/img/close.svg" alt="閉じる">
			</button>
		</div>
		<div
			class="overlay"
			v-bind:class="{ active: isModal }"
			v-on:click="closeModal"
		/>
		<!--
		<div id="loading" v-bind:class="{active: !isLoaded}">
		</div>
		-->
	</div>
</template>

<script>
export default {
	name: "Default",
	computed: {
		isModal () {
			return this.$route.path.startsWith("/works/") || this.$route.path.startsWith("/skills/")
		},
		isIndex () {
			return this.$route.name === "index"
		},
		/*
		isLoaded () {
			return this.$store.getters.getIsLoaded
		}, */
	},
	methods: {
		closeModal () {
			this.$router.push("/")
		},
	},
}
</script>

<style lang="scss" scoped>
.hidden {
	opacity: 0;
	visibility: hidden;
	position: absolute;
	bottom: 0;
	z-index: -2;
}

.modal {
	z-index: 998;
	visibility: visible;
	opacity: 1;
	transition: opacity 0.5s;
	overflow: scroll;
	position: fixed;
	width: 95vw;
	height: 90vh;
	left: 2.5vw;
	bottom: 0;
	margin-bottom: 8vh;
	background-color: $board-color;
	padding: 2.5vw calc(2.5vw + 4vw);

	&::before,
	&::after {
		content: "";
		width: 4vw;
		height: 98vh;
		position: fixed;
		bottom: 0;
		background-color: $main-color;
	}

	&::before {
		left: 2.5vw;
	}

	&::after {
		right: 2.5vw;
	}

	.close {
		z-index: 998;
		display: block;
		position: fixed;
		background: none;
		border: none;
		width: 1.6rem;
		height: 1.6rem;
		top: 4vh;
		right: 9vw;
		cursor: pointer;

		img {
			width: 100%;
		}
	}
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
	background-color: rgba(#000, 0.7);
	opacity: 0;
	width: 100%;
	height: 100%;
	transition: 0.5s;

	&.active {
		opacity: 1;
		z-index: 995;
		cursor: pointer;
	}
}

#loading {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #fff;
	width: 100%;
	height: 100%;
	visibility: hidden;
	opacity: 0;
	z-index: -1;
	transition: 0.2s;

	&.active {
		visibility: visible;
		opacity: 1;
		z-index: 996;
	}
}
</style>
