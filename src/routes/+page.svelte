<script lang="ts">
	import DailyCard from '$lib/DailyCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showDaily = !data.daily.find(
		(r) =>
			data.now.getDate() === r.date.getUTCDate() &&
			data.now.getMonth() === r.date.getUTCMonth() &&
			data.now.getFullYear() === r.date.getUTCFullYear()
	);
</script>

<svelte:head>
	<title>Anxiety Tracker</title>
</svelte:head>

<h1 class="text-3xl">Anxiety Record</h1>

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
		/>

		<label for="daily_anxiety"> Average Anxiety </label>
		<input type="number" min="0" max="10" name="anxiety" value="0" id="daily_anxiety" />

		<label for="daily_depression"> Average Depression </label>
		<input type="number" min="0" max="10" name="depression" value="0" id="daily_depression" />

		<label for="daily_worry"> Average Worry About Panic </label>
		<input type="number" min="0" max="10" name="worry" value="0" id="daily_worry" />

		<button
			class="bg-slate-100 rounded my-4 p-2 border-solid border-2 border-purple-400 hover:bg-purple-400 transition-colors"
			>Submit</button
		>
	</form>
{:else}
	<p>You've already done your daily check-in!</p>
	<button
		class="bg-slate-100 p-2 rounded border-2 border-purple-400 hover:bg-purple-400 transition-colors"
		on:click={() => (showDaily = !showDaily)}>Show form</button
	>
{/if}
<h2 class="text-xl mt-4">Panic Attack Reporting</h2>

<h3 class="text-lg">Past records</h3>
{#each [...data.daily].sort((a, b) => b.date.getTime() - a.date.getTime()) as record}
	<DailyCard {record} />
{/each}

<form method="POST" action="?/logout">
	<button
		class="bg-slate-100 p-2 rounded border-2 border-purple-400 hover:bg-purple-400 transition-colors"
		>Logout</button
	>
</form>
