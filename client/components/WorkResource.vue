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
}
</script>

<style lang="scss" scoped>
.resource {
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
}
</style>
