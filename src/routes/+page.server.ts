import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	const panic = await prisma.panicRecord.findMany();
	const daily = await prisma.dailyRecord.findMany();

	const dailySorted = [...daily].sort((d1, d2) => d1.date.getTime() - d2.date.getTime());
	const weeksElapsed = Math.ceil(
		dailySorted.length > 0 ? dayjs(dailySorted[dailySorted.length - 1].date).diff(dayjs(dailySorted[0].date), 'weeks') : 0
	);

	const weekValues = dailySorted.map((d) =>
		Math.floor(dayjs(d.date).diff(dayjs(dailySorted[0].date), 'weeks'))
	);
	const weekRange = [...Array(weeksElapsed + 1).keys()];
	const averages = weekRange.map(
		(v) =>
			dailySorted
				.filter((_, i) => weekValues[i] === v)
				.reduce((prev, curr) => prev + curr.anxiety_level, 0) /
			weekValues.filter((wv) => wv === v).length
	);

	const chartData = {
		labels: weekRange,
		datasets: [
			{
				label: 'Average anxiety',
				data: averages,
				borderColor: 'rgb(75, 192, 192)',
				yAxisID: 'yAxis'
			}
		]
	};

	return {
		panic,
		daily,
    chartData,
		now: new Date()
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
	createPanic: async ({ request }) => {
		const fd = await request.formData();
		const date = fd.get('date') as string;
		const time = fd.get('time') as string;
		const triggers = fd.get('triggers') as string;
		const expected = (fd.get('expected') as string) === 'expected';
		const max_fear = parseInt(fd.get('max_fear') as string);
		const symptoms = fd.getAll('symptoms') as string[];
		const thoughts = fd.get('thoughts') as string;
		const behaviors = fd.get('behaviors') as string;
		await prisma.panicRecord.create({
			data: {
				date: new Date(date),
				time,
				triggers,
				expected,
				max_fear,
				thoughts,
				behaviors,
				chest_pain: symptoms.includes('chest_pain'),
				sweating: symptoms.includes('sweating'),
				heart_pounding: symptoms.includes('heart_pounding'),
				nausea: symptoms.includes('nausea'),
				short_breath: symptoms.includes('short_breath'),
				dizzy: symptoms.includes('dizzy'),
				shaking: symptoms.includes('shaking'),
				chills_flushes: symptoms.includes('chills_flushes'),
				numbness: symptoms.includes('numbness'),
				unreality: symptoms.includes('unreality'),
				choking: symptoms.includes('choking'),
				dying: symptoms.includes('dying'),
				losing_control: symptoms.includes('losing_control')
			}
		});

    throw redirect(302, '/history?showDaily=false');
	},
	deletePanic: async ({ request }) => {
		const fd = await request.formData();
		// TODO: validate that this field exists.
		const uid = fd.get('uid') as string;
		await prisma.panicRecord.delete({
			where: {
				uid
			}
		});
		throw redirect(302, '/history?showDaily=false');
	},
	logout: async ({ cookies }) => {
		cookies.delete('session');
		throw redirect(301, '/authorize');
	}
};
