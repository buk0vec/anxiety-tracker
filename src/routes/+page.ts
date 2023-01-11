import dayjs from 'dayjs';

import type { PageLoad } from './history/$types';

export const load = (async ({ parent }) => {
  const { daily } = await parent();

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
    chartData,
		now: new Date()
	};
}) satisfies PageLoad;
