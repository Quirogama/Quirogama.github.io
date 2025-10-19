<script>
	import Window from './Window.svelte';
	import DesktopIcon from './DesktopIcon.svelte';
	export let windows = [];

	// example icons for the portfolio
	// icons without positions will be laid out column-major from top-left
	let icons = [
		{ id: 'cv', icon: '/icons/cv.png', label: 'CV', content: 'Aquí va mi CV...' },
		{
			id: 'projects',
			icon: '/icons/proyectos.png',
			label: 'Proyectos',
			content: 'Listado de proyectos...'
		},
		{ id: 'github', icon: '/icons/github.png', label: 'GitHub', content: 'Mi perfil de GitHub...' },
		{
			id: 'linkedin',
			icon: '/icons/linkedin.png',
			label: 'LinkedIn',
			content: 'Mi perfil de LinkedIn...'
		},
		{
			id: 'contact',
			icon: '/icons/contacto.png',
			label: 'Contacto',
			content: 'Contacto: correo@ejemplo.com'
		}
	];

	const ICON_W = 110; // icon slot width
	const ICON_H = 110; // vertical spacing
	const MARGIN_X = 16;
	const MARGIN_Y = 16;
	const MAX_PER_COLUMN = 4;

	// assign positions column-major
	icons = icons.map((ic, i) => {
		const col = Math.floor(i / MAX_PER_COLUMN);
		const row = i % MAX_PER_COLUMN;
		return { ...ic, x: MARGIN_X + col * (ICON_W + 8), y: MARGIN_Y + row * ICON_H };
	});

	function openIcon(icon) {
		// Create a new window entry and push (larger default size)
		const id = Math.floor(Math.random() * 100000);
		windows = [
			...windows,
			{ id, title: icon.label, width: 520, height: 360, z: 2, content: icon.content }
		];
	}
</script>

<div class="desktop">
	{#each icons as ic}
		<DesktopIcon icon={ic.icon} label={ic.label} x={ic.x} y={ic.y} on:open={() => openIcon(ic)} />
	{/each}

	{#each windows as w (w.id)}
		{#if !w.closed}
			<Window
				title={w.title}
				width={w.width}
				height={w.height}
				z={w.z}
				on:close={() => {
					w.closed = true;
				}}
			>
				<div style="padding:8px">{w.content}</div>
			</Window>
		{/if}
	{/each}
</div>

<style>
	/* Let the desktop fill the available space inside .shell-root (which already accounts for the taskbar) */
	.desktop {
		position: relative;
		width: 100%;
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
	}
</style>
