<script lang="ts">
	import DailyCard from '$lib/DailyCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let now = new Date();
	now = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
	let showDaily = !data.daily.find((r) => {
		let d = new Date(r.date.getTime() + r.date.getTimezoneOffset() * 60 * 1000);
		return (
			d.getDate() === new Date().getDate() &&
			d.getMonth() === new Date().getMonth() &&
			d.getFullYear() === new Date().getFullYear()
		);
	});
</script>

<h1 class="text-3xl">Anxiety Record</h1>

<h2 class="text-xl mt-4">Daily Check-In</h2>
{#if showDaily}
	<form method="POST" action="?/createDaily" class="flex flex-col">
		<label for="daily_date">Date</label>
		<input type="date" name="date" id="daily_date" value={now.toISOString().split('T')[0]} />

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
<h3 class="text-lg">Past records</h3>
{#each data.daily as record}
	<DailyCard {record} />
{/each}
