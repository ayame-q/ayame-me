<template>
	<portal to="portal-modal">
		<div class="config-wrap">
			<form class="config" v-on:submit.prevent="onSubmit">
				<p class="slug-input">
					{{ rootPath }}<input v-model="obj.slug" type="text" placeholder="スラグ">
				</p>
				<SelectThumbnail v-if="hasThumbnail" v-model="obj" />
				<p class="submit-input">
					<input type="submit" value="保存">
				</p>
			</form>
			<div class="overlay" v-on:click="onClose" />
		</div>
	</portal>
</template>

<script>
import SelectThumbnail from "~/components/edit/SelectThumbnail"
export default {
	name: "ConfigModal",
	components: { SelectThumbnail },
	props: {
		value: {
			type: Object,
			default () { return { slug: "" } },
		},
		rootPath: {
			type: String,
			default () { return "/" },
		},
		doSubmitAfterClose: {
			type: Boolean,
			default () { return false },
		},
		hasThumbnail: {
			type: Boolean,
			default () { return false },
		},
	},
	data () {
		return {
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
		onClose () {
			this.$emit("close")
		},
		onSubmit () {
			if (this.doSubmitAfterClose) {
				this.$emit("submit")
			} else {
				this.$emit("close")
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.config-wrap {
	.config {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 70%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 9999;
		background-color: $main-color;
		color: #fff;
		font-size: 2rem;
		padding: 1.5rem;

		p.slug-input {
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

		p.submit-input {
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
