<script lang="ts">
	import type { DailyRecord } from '@prisma/client';

	export let record: DailyRecord;

	let show = false;

	const date = record.date.toUTCString();
</script>

<div
	class="bg-slate-200 rounded p-4 my-2 hover:outline transition-outline cursor-pointer"
	on:click|self={() => (show = !show)}
	on:keypress|self={() => (show = !show)}
>
	<div
		class="flex flex-row justify-between cursor-pointer"
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
		<div class="cursor-auto inline">
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
</div>
