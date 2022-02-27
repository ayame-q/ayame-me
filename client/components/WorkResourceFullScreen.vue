<template>
	<div v-if="activeIndex !== null" class="resource-fullscreen-wrap">
		<div class="resources-list">
			<div
				v-for="(resource, index) of resources"
				v-bind:key="index"
				class="resource"
				v-bind:class="{active: index === activeIndex}"
				v-on:click="activeIndex = index"
			>
				<WorkResource
					v-bind:resource="resource"
					v-bind:is-thumbnail="true"
				/>
			</div>
		</div>
		<div class="resource-wrap">
			<WorkResource v-bind:resource="resources[activeIndex]" class="resource" />
		</div>
		<button class="close" v-on:click="activeIndex = null">
			<img src="@/assets/img/close.svg" alt="閉じる">
		</button>
	</div>
</template>

<script>
export default {
	name: "WorkResourceFullScreen",
	props: {
		resources: {
			type: Array,
			default () { return [] },
		},
	},
	data () {
		return {
			activeIndex: null,
		}
	},
	methods: {
		open (index) {
			this.activeIndex = index
		},
		close () {
			this.activeIndex = null
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

	.resources-list {
		width: 15%;
		height: 100%;
		overflow-y: scroll;
		background-color: $main-color;

		.resource {
			padding: 0.5rem 8%;

			&.active {
				background-color: rgba(#fff, 0.3);
			}
		}
	}

	.resource-wrap {
		width: 85%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $board-color;

		.resource {
			width: 85%;
			max-height: 95%;
			overflow-y: scroll;
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
