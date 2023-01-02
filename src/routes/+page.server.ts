import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	return {
		panic: await prisma.panicRecord.findMany(),
		daily: await prisma.dailyRecord.findMany()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createDaily: async ({ request }) => {
		const fd = await request.formData();
		const date = fd.get('date') as string;
		const anxiety = parseInt(fd.get('anxiety') as string);
		const depression = parseInt(fd.get('depression') as string);
		const worry = parseInt(fd.get('worry') as string);

		const query = await prisma.dailyRecord.findFirst({
			where: {
				date: new Date(date)
			}
		});
		if (query) {
			await prisma.dailyRecord.update({
				where: { date: new Date(date) },
				data: { 
					anxiety_level: anxiety,
					depression_level: depression,
					worry_level: worry
				}
			});
		} else {
			await prisma.dailyRecord.create({
				data: {
					date: new Date(date),
					anxiety_level: anxiety,
					depression_level: depression,
					worry_level: worry
				}
			});
		}
		return;
	},
  logout: async ({ cookies }) => {
    cookies.delete('session');
    throw redirect(301, '/authorize')
  }
};
