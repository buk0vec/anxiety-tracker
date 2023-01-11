<script lang="ts">
	import { browser } from '$app/environment';
	import DailyCard from '$lib/DailyCard.svelte';
	import { Chart } from 'chart.js';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	export let data: PageData;

	let showDaily = false;
	let chart: HTMLCanvasElement;

	onMount(() => {
		if (browser) {
			import('chart.js').then((cjs) => {
				Chart.register(...cjs.registerables);
				new cjs.Chart(chart, {
					type: 'line',
					data: data.chartData,
					options: {
						scales: {
							yAxis: {
								min: 0,
								max: 10
							}
						},
						maintainAspectRatio: false
					}
				});
			});
		}
	});

	$: showDaily = !data.daily.find(
		(r) =>
			data.now.getDate() === r.date.getUTCDate() &&
			data.now.getMonth() === r.date.getUTCMonth() &&
			data.now.getFullYear() === r.date.getUTCFullYear()
	);
</script>

<div in:fade>
	<div class="md:grid block md:grid-cols-2 gap-4">
		<section class="relative overflow-auto w-full h-96">
			<noscript>
				<div>
					<h3 class="text-lg">Average anxiety per week:</h3>
					<ol class="list-decimal" type="1">
						{#each data.chartData.datasets[0].data as datum}
							<li>{datum}</li>
						{/each}
					</ol>
				</div>
			</noscript>
			<canvas id="chart" class="" bind:this={chart} />
		</section>
		<section>
			<h2 class="text-xl mt-4">Daily Check-In</h2>
			{#if showDaily}
				<form method="POST" action="?/createDaily" class="flex flex-col">
					<label for="daily_date">Date</label>
					<input
						type="date"
						name="date"
						id="daily_date"
						value={`${data.now.getFullYear()}-${data.now.getMonth() < 9 ? '0' : ''}${
							data.now.getMonth() + 1
						}-${data.now.getDate() < 10 ? '0' : ''}${data.now.getDate()}`}
						required
					/>

					<label for="daily_anxiety"> Average Anxiety </label>
					<input
						type="number"
						min="0"
						max="10"
						name="anxiety"
						value="0"
						id="daily_anxiety"
						required
					/>

					<label for="daily_depression"> Average Depression </label>
					<input
						type="number"
						min="0"
						max="10"
						name="depression"
						value="0"
						id="daily_depression"
						required
					/>

					<label for="daily_worry"> Average Worry About Panic </label>
					<input type="number" min="0" max="10" name="worry" value="0" id="daily_worry" required />

					<button
						class="bg-slate-100 rounded my-4 p-2 border-solid border-2 border-purple-400 hover:bg-purple-400 transition-colors"
						>Submit</button
					>
				</form>
			{:else}
				<p>You've already done your daily check-in!</p>
				<button
					class="bg-slate-100 p-2 rounded border-2 border-purple-400 hover:bg-purple-400 transition-colors w-full"
					on:click={() => (showDaily = !showDaily)}>Show check-in form</button
				>
			{/if}
		</section>
	</div>
	<div class="flex flex-row items-baseline gap-3 justify-between">
		<h3 class="text-lg">Past check-ins</h3>
		<a href="/history" class="text-lg underline underline-offset-2">View all</a>
	</div>
	{#each [...data.daily].slice(0, 5).sort((a, b) => b.date.getTime() - a.date.getTime()) as record}
		<DailyCard {record} />
	{/each}
</div>
