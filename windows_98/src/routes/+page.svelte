<script>
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';

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

	let tasks = ['Welcome'];
</script>

<Desktop {windows} />
<Taskbar {tasks} />
