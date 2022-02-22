<template>
	<div class="add-movie-wrap">
		<div class="add-movie">
			<h3>Youtube動画を追加</h3>
			<form class="config" v-on:submit.prevent="onSubmit">
				<p class="url-input">
					<input v-model="url" type="text" placeholder="URL">
				</p>
				<div v-if="embedUrl" class="preview">
					<iframe
						v-bind:src="embedUrl"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					/>
				</div>
				<p class="submit-input">
					<input type="submit" value="追加">
				</p>
			</form>
		</div>
		<div class="overlay" v-on:click="onClose" />
	</div>
</template>

<script>
export default {
	name: "AddResourceMovieModal",
	data () {
		return {
			url: "",
		}
	},
	computed: {
		videoId () {
			const matchFullUrl = this.url.match(/youtube\.com\/watch\?(.+&)?v=([0-9a-zA-Z_-]+)(&.+)?$/)
			if (matchFullUrl) {
				return matchFullUrl[2]
			}
			const matchShortUrl = this.url.match(/youtu\.be\/([0-9a-zA-Z_-]+)(\?.+)?$/)
			if (matchShortUrl) {
				return matchShortUrl[1]
			}
			return ""
		},
		embedUrl () {
			if (!this.videoId) {
				return ""
			}
			return `https://www.youtube.com/embed/${this.videoId}`
		},
	},
	methods: {
		onClose () {
			this.$emit("close")
		},
		onSubmit () {
			this.$emit("add", {
				type: "youtube",
				videoId: this.videoId,
			})
			this.$emit("close")
		},
	},
}
</script>

<style lang="scss" scoped>
.add-movie-wrap {
	.add-movie {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 75%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 9999;
		background-color: $main-color;
		color: #fff;
		font-size: 2rem;
		padding: 1.5rem;

		p.url-input {
			display: flex;

			input[type=text] {
				width: 100%;
				font-size: 2rem;
				background-color: transparent;
				border: none;
				color: #fff;

				&::placeholder {
					color: rgba(#fff, 0.3);
				}

				&:focus {
					outline: none;
				}
			}
		}

		.preview {
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 56.25%;
			margin: 1rem 0;

			iframe {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
		}

		.submit-input {
			display: flex;
			justify-content: flex-end;

			input[type=submit] {
				width: 20%;
				font-size: 1.5rem;
				color: #fff;
				background-color: transparent;
				border: #fff solid 3px;
				cursor: pointer;

				&:hover {
					background-color: #fff;
					color: $main-color;
				}
			}
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(#000, 0.5);
		z-index: 9998;
	}
}
</style>
