<script lang="ts">
	import type { DailyRecord } from '@prisma/client';

	export let record: DailyRecord;

	let show = false;

	const date = record.date.toUTCString();
</script>

<div
	class={`bg-slate-200 rounded my-2 hover:shadow-md transition-shadow ${show ? 'shadow-md' : ''}`}
>
	<div
		class="flex flex-row justify-between p-4 cursor-pointer"
		on:click={() => (show = !show)}
		on:keypress={() => (show = !show)}
	>
		<span class="font-bold inline">{date.substring(0, date.indexOf(':') - 3)}</span>

		<span>
			{#if !show}
				Click to expand
			{:else}
				Click to hide
			{/if}
		</span>
	</div>
	{#if show}
		<div class="bg-slate-500 h-px mx-4 mb-2" />
		<div class="cursor-auto px-4 pb-4 sep">
			<p class="inline">
				Average anxiety: <span class="font-semibold">{record.anxiety_level}<span /></span>
			</p>
			<br />
			<p class="inline">
				Average depression: <span class="font-semibold">{record.depression_level}</span>
			</p>
			<br />
			<p class="inline">
				Average worry about panic: <span class="font-semibold">{record.worry_level}</span>
			</p>
		</div>
	{/if}
	<noscript>
		<div class="bg-slate-500 h-px mx-4 mb-2" />
		<div class="cursor-auto px-4 pb-4 sep">
			<p class="inline">
				Average anxiety: <span class="font-semibold">{record.anxiety_level}<span /></span>
			</p>
			<br />
			<p class="inline">
				Average depression: <span class="font-semibold">{record.depression_level}</span>
			</p>
			<br />
			<p class="inline">
				Average worry about panic: <span class="font-semibold">{record.worry_level}</span>
			</p>
		</div>
	</noscript>
</div>

<style>
	.sep {
		width: calc(100% - 1rem - 1rem);
	}
</style>
