import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  deletePanic: async ({ request }) => {
		const fd = await request.formData();
		// TODO: validate that this field exists.
		const uid = fd.get('uid') as string;
		await prisma.panicRecord.delete({
			where: {
				uid
			}
		});
		throw redirect(300, '/history?showDaily=false')
	},
}