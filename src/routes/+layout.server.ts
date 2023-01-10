import { prisma } from "$lib/server/prisma";
import dayjs from "dayjs";
import type { Actions, LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ url }) => {
  if (url.pathname.includes("authorize")) {
    return {
      panic: [],
      daily: [],
      chartData: {},
      now: new Date()
    }
  }

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
}) satisfies LayoutServerLoad;

export const actions = {
  logout: async ({ cookies }) => {
		cookies.delete('session');
		throw redirect(301, '/authorize');
	}
} satisfies Actions;