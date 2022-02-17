<template>
	<div>
		<button class="save" v-on:click="onClickSubmitButton">
			<img src="@/assets/img/save.svg" alt="保存">
		</button>
		<button class="config" v-on:click="isSlugModalOpen = true">
			<img src="@/assets/img/config.svg" alt="設定">
		</button>
		<ConfigModal
			v-if="isSlugModalOpen"
			v-model="obj"
			v-bind:do-submit-after-close="isPushedSubmit"
			v-bind:root-path="rootPath"
			v-bind:has-thumbnail="hasThumbnail"
			v-on:close="onCloseSlugModal"
			v-on:submit="doSubmit"
		/>
	</div>
</template>

<script>
import ConfigModal from "~/components/edit/ConfigModal"
export default {
	name: "SubmitButton",
	components: { ConfigModal },
	props: {
		value: {
			type: Object,
			default () {
				return {
					slug: "",
				}
			},
		},
		apiType: {
			type: String,
			default () { return "" },
		},
		rootPath: {
			type: String,
			default () { return "/" },
		},
		hasThumbnail: {
			type: Boolean,
			default () { return false },
		},
	},
	data () {
		return {
			isSlugModalOpen: false,
			isPushedSubmit: false,
			obj: {},
		}
	},
	watch: {
		obj: {
			handler (newValue) {
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		this.obj = { ...this.value }
	},
	methods: {
		onCloseSlugModal () {
			this.isPushedSubmit = false
			this.isSlugModalOpen = false
		},
		onClickSubmitButton () {
			if (!this.obj.slug) {
				this.isPushedSubmit = true
				this.isSlugModalOpen = true
				return
			}
			this.doSubmit()
		},
		doSubmit () {
			if (this.obj.uuid) {
				this.$http.$put(`/api/${this.apiType}/${this.obj.slug}`, this.obj)
					.then(() => {
						this.$router.push("/")
					})
			} else {
				this.$http.$post(`/api/${this.apiType}/${this.obj.slug}`, this.obj)
					.then(() => {
						this.$router.push("/")
					})
			}
		},
	},
}
</script>

<style lang="scss" scoped>

.save,
.config {
	z-index: 1003;
	display: block;
	position: fixed;
	background: none;
	border: none;
	width: 1.6rem;
	height: 1.6rem;
	top: 4vh;
	right: 9vw;
	cursor: pointer;

	img {
		width: 100%;
	}

	&.save {
		right: 12.5vw;
	}

	&.config {
		right: 16vw;
	}
}
</style>
