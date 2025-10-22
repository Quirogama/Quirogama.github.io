<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';

	let { children } = $props();

	// global windows state (simple for now)
	let windows = [
		{
			id: 1,
			title: 'Welcome',
			width: 360,
			height: 220,
			z: 2,
			content: 'Hola! Bienvenido al Windows 98 de prueba.'
		}
	];

	let tasks = windows.map((w) => w.title);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell-root">
	<Desktop {windows} />
	<Taskbar {tasks} />
</div>

<!-- preserve route children (hidden pages/apps can be mounted here later) -->
{@render children?.()}
