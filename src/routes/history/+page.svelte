<script lang="ts">
	import { page } from '$app/stores';
	import DailyCard from '$lib/DailyCard.svelte';
	import PanicCard from '$lib/PanicCard.svelte';
	import { fade } from 'svelte/transition';

	import type { PageData } from './$types';

	export let data: PageData;

	let showDaily = data.showDaily;
</script>

<div in:fade>
	<div class="md:hidden flex gap-4 pt-2">
		<button
			class={`text-lg transition-border ${
				showDaily
					? 'font-semibold border-b-2 border-neutral-700'
					: 'hover:border-b-2 border-neutral-700'
			}`}
			on:click={() => (showDaily = true)}>Daily records</button
		>
		<button
			class={`text-lg transition-border ${
				!showDaily
					? 'font-semibold border-b-2 border-neutral-700'
					: 'hover:border-b-2 border-neutral-700'
			}`}
			on:click={() => (showDaily = false)}>Panic records</button
		>
	</div>
	<noscript>
		{#if showDaily}
			<a href="/history?showDaily=false">Show panic records</a>
		{:else}
			<a href="/history">Show daily records</a>
		{/if}
	</noscript>
	<div class="md:grid md:grid-cols-2 md:gap-4">
		<div>
			<h3 class="text-lg font-medium md:inline-block hidden">Daily records</h3>
			<div class={`md:block ${!showDaily ? 'hidden' : ''}`}>
				{#if $page.data.daily.length === 0}
					<p>No entries.</p>
				{:else}
					{#each [...$page.data.daily].sort((a, b) => b.date.getTime() - a.date.getTime()) as record (record.uid)}
						<DailyCard {record} />
					{/each}
				{/if}
			</div>
		</div>
		<div>
			<h3 class="text-lg font-medium md:inline-block hidden">Panic records</h3>
			<div class={`md:block ${showDaily ? 'hidden' : ''}`}>
				{#if $page.data.panic.length === 0}
					<p>No entries.</p>
				{:else}
					{#each [...$page.data.panic].sort((a, b) => b.date.getTime() - a.date.getTime()) as record (record.uid)}
						<PanicCard {record} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
