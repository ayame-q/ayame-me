<template>
	<div class="resource">
		<p v-if="resource.type === 'image'">
			<img v-bind:src="resource.url" alt="">
		</p>
		<div v-if="resource.type === 'youtube'" class="youtube">
			<iframe
				v-bind:src="`https://www.youtube.com/embed/${resource.videoId}`"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
		</div>
		<p v-if="isEditable" class="delete">
			<button v-on:click="$emit('delete')">
				削除
			</button>
		</p>
	</div>
</template>

<script>
export default {
	name: "WorkResourcesList",
	props: {
		resource: {
			type: Object,
			default () { return {} },
		},
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
}
</script>

<style lang="scss" scoped>
.resource {
	position: relative;

	> div,
	> p {
		margin: 1rem 0;
	}

	img {
		width: 100%;
	}

	.youtube {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 56.25%;

		iframe {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}

	.delete {
		display: none;
		position: absolute;
		top: 5%;
		right: 5%;
		margin: 0;

		button {
			display: block;
			background: none;
			border: none;
			width: fit-content;
			white-space: nowrap;
			font-size: 1.2vw;
			background-color: rgba($text-color, 0.7);
			padding: 10%;
			color: #fff;
			cursor: pointer;
		}
	}

	&:hover {
		.delete {
			display: block;
		}
	}
}
</style>
