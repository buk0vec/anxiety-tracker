<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="text-2xl">Please enter the password to access Anxiety Tracker:</h1>
<form method="POST" class="flex flex-col">
	<input type="text" autocomplete="username" id="username" name="username" hidden />
	<input
		type="password"
		id="password"
		name="password"
		placeholder="Password..."
		autocomplete="current-password"
		class="mt-4"
	/>
	{#if form?.incorrect}
		<p class="m-0 p-0 text-red-500">Incorrect password.</p>
	{/if}
	<button
		class="bg-slate-100 p-2 rounded border-2 border-purple-400 hover:bg-purple-400 transition-colors my-4"
		>Access</button
	>
</form>
