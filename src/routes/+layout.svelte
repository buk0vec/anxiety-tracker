<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import GithubLink from '$lib/GithubLink.svelte';
</script>

<svelte:head>
	<title>Anxiety Tracker</title>
</svelte:head>

<div class="p-4 flex flex-col min-h-screen">
	<header class="flex flex-row items-baseline gap-4 justify-between sm:pr-6">
		<h1 class="text-3xl">Anxiety Record</h1>
		<div class="flex flex-row gap-4 content-end">
			<a href="/">Home</a>
			<a href="/report">Reporter</a>
			<a href="/history">History</a>
			{#if $page.url.pathname != '/authorize'}
				<form method="post" action="/?/logout">
					<button>Logout</button>
				</form>
			{/if}
		</div>
	</header>
	<div class="flex-1">
		<slot />
	</div>
	<footer class="flex flex-row justify-between items-end pt-4">
		<p class="text-slate-500">By Nick Bukovec (@buk0vec)</p>
		<GithubLink />
	</footer>
</div>
