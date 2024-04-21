<template>
	<article class="wheel" v-bind:class="{editing: isEditing}">
		<p class="period">
			<ContentEditable v-model="award.time" v-bind:contenteditable="isEditable" tag="time" placeholder="時期" />
		</p>
		<p class="title">
			<ContentEditable v-model="award.title" v-bind:contenteditable="isEditable" tag="span" placeholder="タイトル" />
		</p>
		<SubmitButton
			v-if="isEditable"
			v-model="award"
			class="config-wrap"
			api-type="awards"
			root-path="/awards/"
			v-bind:has-thumbnail="false"
		/>
	</article>
</template>

<script>
import ContentEditable from "~/components/edit/ContentEditable.vue"
import SubmitButton from "~/components/edit/SubmitButton.vue"

export default {
	name: "AwardsListAward",
	components: { SubmitButton, ContentEditable },
	props: {
		value: {
			type: Object,
			default () {
				return {
					time: "",
					title: "",
				}
			},
		},
	},
	data () {
		return {
			award: {},
			updateCount: -2,
			isEditing: false,
		}
	},
	computed: {
		isEditable () {
			return this.$store.getters["status/getIsEditable"]
		},
	},
	watch: {
		award: {
			handler (newValue) {
				this.updateCount++
				if (this.updateCount > 0) {
					this.isEditing = true
				}
				this.$emit("input", newValue)
			},
			deep: true,
		},
	},
	created () {
		if (this.value.isEditing) {
			delete this.value.isEditing
			this.isEditing = true
		}
		this.award = { ...this.value }
	},
}
</script>

<style scoped lang="scss">
.wheel {
	.period {
		position: absolute;
		width: fit-content;
		display: block;
		font-size: 1.3vw;
		left: 48%;
		transform: translateX(-50%);
		bottom: 55%;
		color: #c37394;
	}

	.title {
		color: #fff;
		white-space: pre-line;
		position: absolute;
		width: 80%;
		display: block;
		font-size: 1.3vw;
		text-align: center;
		left: 48%;
		bottom: 5%;
		transform: translateX(-50%);
		line-height: 2.2;
	}

	&:hover {
		.config-wrap {
			display: block;
		}
	}

	&.editing {
		.config-wrap {
			display: block;
		}
	}

	.config-wrap {
		display: none;
		position: absolute;
		left: 48%;
		transform: translateX(-50%);
		bottom: 80%;
	}
}
</style>
