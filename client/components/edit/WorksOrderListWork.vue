<template>
	<article class="work">
		<nuxt-link v-bind:to="`/works/${work.slug}`">
			<p class="thumbnail">
				<img v-bind:src="work.thumbnail" alt="">
			</p>
			<div class="detail">
				<h3>{{ work.title }}</h3>
				<p class="subtitle">
					{{ work.subTitle }}
				</p>
			</div>
		</nuxt-link>
	</article>
</template>

<script>
export default {
	name: "WorksOrderListWork",
	props: {
		value: {
			type: Object,
			default () {
				return {}
			},
		},
		index: {
			type: Number,
			default () { return 0 },
		},
	},
	data () {
		return {
			work: {},
		}
	},
	watch: {
		work: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
		index (newValue) {
			this.work.order = newValue + 1
		},
	},
	created () {
		this.work = { ...this.value }
		this.work.order = this.index + 1
	},
}
</script>

<style lang="scss" scoped>
.work {
	a {
		display: flex;
		align-items: center;
		width: 100%;
		text-decoration: none;

		.thumbnail {
			width: 6rem;
			height: 4rem;

			img {
				display: block;
				width: 100%;
				max-height: 100%;
			}
		}

		.detail {
			margin-left: 0.7rem;

			.subtitle {
				font-size: 0.8rem;
			}
		}
	}
}
</style>
