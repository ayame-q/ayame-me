export default async ({ store }) => {
	if (process.client) {
		if (!store.getters["status/getIsEditable"]) {
			await store.dispatch("status/checkIsEditable")
		}
	}
}
