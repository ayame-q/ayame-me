<template>
	<div v-if="activeIndex !== null" ref="wrap" class="resource-fullscreen-wrap">
		<div class="resources-list" v-on:mouseover="isListActive = true" v-on:mouseleave="isListActive = false">
			<div
				v-for="(resource, index) of resources"
				v-bind:key="index"
				class="resources-list-resource-wrap"
				v-bind:class="{active: index === activeIndex}"
				v-on:click="activeIndex = index"
			>
				<WorkResource
					v-bind:resource="resource"
					v-bind:is-thumbnail="true"
					class="resources-list-resource"
				/>
			</div>
		</div>
		<div class="hooper-wrap">
			<Hooper
				ref="hooper"
				class="hooper"
				v-bind:center-mode="true"
				v-bind:vertical="true"
				transition="100"
				v-on:slide="onSlide"
			>
				<Slide v-for="(resource, index) of resources" v-bind:key="index" class="resource-wrap">
					<WorkResource v-bind:resource="resource" class="resource" />
				</Slide>
			</Hooper>
		</div>
		<button class="close" v-on:click="close">
			<img src="@/assets/img/close.svg" alt="閉じる">
		</button>
	</div>
</template>

<script>
import { Hooper, Slide } from "hooper"
import "hooper/dist/hooper.css"

export default {
	name: "WorkResourceFullScreen",
	components: {
		Hooper,
		Slide,
	},
	props: {
		resources: {
			type: Array,
			default () { return [] },
		},
	},
	data () {
		return {
			activeIndex: null,
			hooper: null,
			isListActive: false,
		}
	},
	watch: {
		activeIndex (newIndex, oldIndex) {
			this.$nextTick(() => {
				if (oldIndex === null && newIndex !== null) {
					this.hooper = this.$refs.hooper
					document.addEventListener("keydown", this.onKeyDown)
				}
				if (newIndex === null) {
					document.removeEventListener("keydown", this.onKeyDown)
					this.hooper = null
				}
				if (this.hooper) {
					this.hooper.slideTo(newIndex)
				}
				if (!this.isListActive) {
					this.scrollToList(newIndex)
				}
			})
		},
	},
	mounted () {
		this.hooper = this.$refs.hooper
	},
	methods: {
		open (index) {
			this.activeIndex = index
		},
		close () {
			this.activeIndex = null
		},
		onKeyDown (event) {
			if (event.key === "Escape") {
				this.close()
			}
		},
		onSlide ({ currentSlide }) {
			this.activeIndex = currentSlide
		},
		scrollToList (index) {
			if (this.activeIndex !== null) {
				const resourceWrapElements = document.getElementsByClassName("resources-list-resource-wrap")
				resourceWrapElements[index].scrollIntoView({ block: "center", behavior: "smooth" })
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.resource-fullscreen-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 9999;
	display: flex;
	align-items: center;
	transform: translateZ(1px);

	.resources-list {
		width: 15%;
		height: 100%;
		overflow-y: scroll;
		background-color: $main-color;

		.resources-list-resource-wrap {
			padding: 0.8rem 13%;

			&.active {
				background-color: rgba(#fff, 0.3);
			}
		}
	}

	.hooper-wrap {
		width: 85%;
		height: 100%;
		background-color: $board-color;

		.hooper {
			width: 100%;
			height: 100%;

			.resource-wrap {
				display: flex;
				width: 100%;
				height: 100%;
				justify-content: center;
				align-items: center;

				.resource {
					width: 85%;
					max-height: 95%;
					overflow-y: scroll;
				}
			}
		}
	}

	.close {
		z-index: 1000;
		display: block;
		position: fixed;
		background: none;
		border: none;
		width: 1.6rem;
		height: 1.6rem;
		top: 4vh;
		right: 4vw;
		cursor: pointer;

		img {
			width: 100%;
		}
	}
}
</style>
