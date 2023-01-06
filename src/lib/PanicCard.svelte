<script lang="ts">
	import type { PanicRecord } from '@prisma/client';
	import get from 'lodash.get';

	export let record: PanicRecord;

	let show = false;

	const date = record.date.toUTCString();

	type SymptomMapping = Record<
		keyof Omit<
			PanicRecord,
			'uid' | 'date' | 'time' | 'triggers' | 'expected' | 'max_fear' | 'thoughts' | 'behaviors'
		>,
		string
	>;

	const symptomsToStr: SymptomMapping = {
		chest_pain: 'Chest pain',
		sweating: 'Sweating',
		heart_pounding: 'Heart racing/palpitations/pounding',
		nausea: 'Nausea/upset stomach',
		short_breath: 'Shortness of breath',
		dizzy: 'Dizzy/unsteady/lightheaded/faint',
		shaking: 'Shaking/trembling',
		chills_flushes: 'Chills/hot flushes',
		numbness: 'Numbness/tingling',
		unreality: 'Feelings of unreality',
		choking: 'Feelings of choking',
		dying: 'Fear of dying',
		losing_control: 'Fear of losing control/going insane'
	};

	const allSymptoms = Object.entries(symptomsToStr)
		.filter(([id, _]) => !!get(record, id, false))
		.map(([_, str]) => str);
</script>

<div
	class={`bg-slate-200 rounded my-2 hover:shadow-md transition-shadow ${show ? 'shadow-md' : ''}`}
>
	<div
		class="flex flex-row justify-between p-4 cursor-pointer"
		on:click={() => (show = !show)}
		on:keypress={() => (show = !show)}
	>
		<span>
			<span class="font-bold inline">{date.substring(0, date.indexOf(':') - 3)}</span>
			<span class="font-light inline"> | {record.time}</span>
		</span>

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
			<p class="inline">Triggers: <span class="font-semibold">{record.triggers}</span></p>
			<br />
			<p class="inline">
				This panic attack was
				<span class="font-semibold">
					{#if record.expected}
						expected
					{:else}
						unexpected
					{/if}
				</span>
			</p>
			<br />
			<div class="flex flex-row content-center gap-2">
				<p class="inline whitespace-nowrap">Maximum fear:</p>
				<div class="md:w-1/2 h-4 outline my-1 w-full">
					<div class="bg-slate-700 h-4 bar-inner" style:width={`${10 * record.max_fear}%`} />
				</div>
				<span class="font-semibold">{record.max_fear}</span>
			</div>
			<p class="inline">Symptoms:</p>
			<br />
			<ul>
				{#each allSymptoms as str}
					<li class="font-semibold break-words list-disc list-inside">
						{str}
					</li>
				{/each}
			</ul>
			<p class="inline">Thoughts: <span class="font-semibold">{record.thoughts}</span></p>
			<br />
			<p class="inline">Behaviors: <span class="font-semibold">{record.behaviors}</span></p>
		</div>
	{/if}
	<noscript>
		<div class="bg-slate-500 h-px mx-4 mb-2" />
		<div class="cursor-auto px-4 pb-4 sep">
			<p class="inline">Triggers: <span class="font-semibold">{record.triggers}</span></p>
			<br />
			<p class="inline">
				This panic attack was
				<span class="font-semibold">
					{#if record.expected}
						expected
					{:else}
						unexpected
					{/if}
				</span>
			</p>
			<br />
			<div class="flex flex-row content-center gap-2">
				<p class="inline whitespace-nowrap">Maximum fear:</p>
				<div class="md:w-1/2 h-4 outline my-1 w-full">
					<div class="bg-slate-700 h-4 bar-inner" style:width={`${10 * record.max_fear}%`} />
				</div>
				<span class="font-semibold">{record.max_fear}</span>
			</div>
			<p class="inline">Symptoms:</p>
			<br />
			<ul>
				{#each allSymptoms as str}
					<li class="font-semibold break-words list-disc list-inside">
						{str}
					</li>
				{/each}
			</ul>
			<p class="inline">Thoughts: <span class="font-semibold">{record.thoughts}</span></p>
			<br />
			<p class="inline">Behaviors: <span class="font-semibold">{record.behaviors}</span></p>
		</div>
	</noscript>
</div>

<style>
	@keyframes bar {
		from {
			width: 0%;
		}
	}
	.bar-inner {
		animation-name: bar;
		animation-duration: 2s;
	}

	.sep {
		width: calc(100% - 1rem - 1rem);
	}
</style>
