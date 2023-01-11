<script>
	import '../app.postcss';
	import { page } from '$app/stores';
</script>

<div class="p-4">
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
	<slot />
</div>
