<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';
	import { aboutTitle, aboutText, aboutWidth, aboutHeight } from '$lib/content.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Calculate centered position for initial window
	let centerLeft = $state(300);
	let centerTop = $state(80);

	onMount(() => {
		// Center the window on mount
		centerLeft = Math.max(50, (window.innerWidth - aboutWidth) / 2);
		centerTop = Math.max(50, (window.innerHeight - aboutHeight - 100) / 2); // -100 for taskbar
	});

	// global windows state (simple for now)
	let windows = $state([
		{
			id: 1,
			title: aboutTitle,
			width: aboutWidth,
			height: aboutHeight,
			z: 2,
			// App identity for taskbar
			appLabel: 'About Me',
			icon: '/icons/sobremi.png',
			hiddenInTaskbar: true,
			get left() { return centerLeft; },
			get top() { return centerTop; },
			content: aboutText
		}
	]);

	let tasks = $derived(
		windows
			.filter((w) => !w.hiddenInTaskbar)
			.map((w) => ({ id: w.id, label: w.appLabel ?? w.title, icon: w.icon }))
	);

	let activeWindowId = $derived(
		windows.reduce((maxW, w) => (!w.minimized && w.z > (maxW?.z ?? 0) ? w : maxW), null)?.id ?? null
	);

	function handleTaskClick(event) {
		const { id } = event.detail;
		const window = windows.find(w => w.id === id);
		if (!window) return;

		if (window.minimized) {
			// Restaurar y traer al frente
			const newZ = Math.max(...windows.map(w => w.z ?? 0)) + 1;
			windows = windows.map(w => 
				w.id === id ? { ...w, minimized: false, z: newZ } : w
			);
		} else if (id === activeWindowId) {
			// Si ya está activa, minimizar
			windows = windows.map(w => 
				w.id === id ? { ...w, minimized: true } : w
			);
		} else {
			// Si está visible pero no activa, traer al frente
			const newZ = Math.max(...windows.map(w => w.z ?? 0)) + 1;
			windows = windows.map(w => 
				w.id === id ? { ...w, z: newZ } : w
			);
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell-root">
	<Desktop bind:windows />
	<Taskbar {tasks} {activeWindowId} on:taskclick={handleTaskClick} />
</div>

<!-- Panel desplegable (caja) con toda la info relevante, estilo Win98 -->
<!-- Panel eliminado: la información se presenta dentro de la ventana principal con scroll interno. -->

<!-- preserve route children (hidden pages/apps can be mounted here later) -->
{@render children?.()}

<style>
	    /* (styles del panel eliminados) */
</style>
