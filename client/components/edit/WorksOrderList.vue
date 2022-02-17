<template>
	<main>
		<article>
			<div class="meta">
				<div>
					<div class="title-wrap">
						<h2>
							Works List
						</h2>
					</div>
					<div v-if="isEditable" class="options">
						<p>
							<button class="save" v-on:click="onSave">
								<img src="@/assets/img/save.svg" alt="保存">
							</button>
							<nuxt-link to="/works/new" class="add">
								<img src="@/assets/img/add-pink.svg" alt="+">
							</nuxt-link>
						</p>
					</div>
				</div>
			</div>
			<VueDraggable
				v-if="isEditable"
				v-model="works"
				class="content-wrap"
			>
				<WorksOrderListWork v-for="(work, index) of works" v-bind:key="work.uuid" v-model="works[index]" v-bind:index="index" class="work" />
			</VueDraggable>
		</article>
	</main>
</template>

<script>
import VueDraggable from "vuedraggable"
import WorksOrderListWork from "~/components/edit/WorksOrderListWork"

export default {
	name: "WorksOrderList",
	components: { WorksOrderListWork, VueDraggable },
	props: {
		value: {
			type: Array,
			default () { return [] },
		},
	},
	data () {
		return {
			works: [],
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
	watch: {
		works: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		this.works = [...this.value]
	},
	methods: {
		async onSave () {
			for (const work of this.works) {
				await this.$http.$patch(`/api/works/${work.slug}`, {
					order: work.order,
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
			.work {
				margin: 1.2rem 1rem;
			}
		}
	}
}
</style>
