<template>
	<article class="award">
		<div class="detail">
			<p class="time">
				{{ award.time }}
			</p>
			<h3>{{ award.title }}</h3>
		</div>
	</article>
</template>

<script>
export default {
	name: "AwardsOrderListAward",
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
			award: {},
		}
	},
	watch: {
		award: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
		index (newValue) {
			this.award.order = newValue + 1
		},
	},
	created () {
		this.award = { ...this.value }
		this.award.order = this.index + 1
	},
}
</script>

<style lang="scss" scoped>
.award {
	a {
		display: flex;
		align-items: center;
		width: 100%;
		text-decoration: none;

		.detail {
			margin-left: 0.7rem;

			.subtitle {
				font-size: 0.8rem;
			}
		}
	}
}
</style>
