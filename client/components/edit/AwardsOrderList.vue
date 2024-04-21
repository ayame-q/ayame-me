<template>
	<main>
		<article>
			<div class="meta">
				<div>
					<div class="title-wrap">
						<h2>
							Awards List
						</h2>
					</div>
					<div v-if="isEditable" class="options">
						<p>
							<button class="save" v-on:click="onSave">
								<img src="@/assets/img/save.svg" alt="保存">
							</button>
							<nuxt-link to="/awards/new" class="add">
								<img src="@/assets/img/add-pink.svg" alt="+">
							</nuxt-link>
						</p>
					</div>
				</div>
			</div>
			<VueDraggable
				v-if="isEditable"
				v-model="awards"
				class="content-wrap"
			>
				<AwardsOrderListAward v-for="(award, index) of awards" v-bind:key="award.uuid" v-model="awards[index]" v-bind:index="awards.length - index - 1" class="award" />
			</VueDraggable>
		</article>
	</main>
</template>

<script>
import VueDraggable from "vuedraggable"
import AwardsOrderListAward from "~/components/edit/AwardsOrderListAward"

export default {
	name: "AwardsOrderList",
	components: { AwardsOrderListAward, VueDraggable },
	props: {
		value: {
			type: Array,
			default () { return [] },
		},
	},
	data () {
		return {
			awards: [],
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
	watch: {
		awards: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		this.awards = [...this.value]
	},
	methods: {
		async onSave () {
			for (const award of this.awards) {
				await this.$http.$patch(`/api/awards/${award.slug}`, {
					order: award.order,
				})
			}
			this.$router.push("/")
		},
	},
}
</script>

<style lang="scss" scoped>
h2 {
	color: $text-color;
	font-family: "A1ゴシック M", A1 Gothic M, sans-serif;
}

main {
	article {
		height: 100%;

		.meta {
			display: flex;
			align-items: center;
			position: relative;

			.title-wrap {
				display: flex;
				align-items: baseline;
				flex-shrink: 0;

				h2 {
					font-size: 2rem;
				}
			}

			.options {
				position: absolute;
				top: 50%;
				right: 20%;
				transform: translateY(-50%);

				p {
					display: flex;
					align-items: center;

					a,
					button {
						display: block;
						text-decoration: none;
						background: none;
						border: none;
						margin: 0 0.5rem;
						cursor: pointer;

						img {
							width: 1rem;
							height: 1rem;
						}
					}
				}
			}
		}

		.content-wrap {
			.award {
				margin: 1.2rem 1rem;
			}
		}
	}
}
</style>
