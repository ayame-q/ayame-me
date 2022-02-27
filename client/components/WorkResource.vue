<template>
	<div class="resource" v-on:click="$emit('click')">
		<p v-if="resource.type === 'image'">
			<img v-bind:src="resource.url" alt="">
		</p>
		<div v-if="resource.type === 'youtube'" class="youtube">
			<iframe
				v-if="!isThumbnail"
				v-bind:src="`https://www.youtube.com/embed/${resource.videoId}`"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
			<p v-if="isThumbnail" class="thumbnail">
				<img v-bind:src="`https://img.youtube.com/vi/${resource.videoId}/maxresdefault.jpg`" alt="">
			</p>
		</div>
		<slot />
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
		isThumbnail: {
			type: Boolean,
			default () { return false },
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
		margin: 0;
	}

	img {
		width: 100%;
		display: block;
	}

	.youtube {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 56.25%;

		iframe,
		.thumbnail {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}
}
</style>
