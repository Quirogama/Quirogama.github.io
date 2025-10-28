<script>
	import Window from './Window.svelte';
	import DesktopIcon from './DesktopIcon.svelte';
	import { aboutText, aboutTitle, aboutWidth, aboutHeight } from '$lib/content.js';
	export let windows = [];

	// example icons for the portfolio desktop
	// icons without positions will be laid out column-major from top-left
	let icons = [
		{
			id: 'about',
			icon: '/icons/contacto.png',
			label: 'Sobre Mi',
			content: aboutText
		},
		{ 
			id: 'cv', 
			icon: '/icons/cv.png', 
			label: 'CV', 
			content: 'CV - Andrés Quiroga\n\nAnalista de Datos & Desarrollador Junior.\n\nExperiencia: 6 meses en análisis de datos y desarrollo.\nProyectos: Automatización con Python, dashboards y visualización.\nHabilidades: Python, SQL, Power BI, Git.' 
		},
		{
			id: 'projects',
			icon: '/icons/proyectos.png',
			label: 'Proyectos',
			content: 'Proyectos Destacados\n\n- Dashboard Analítico (Power BI): -40% tiempo de análisis.\n- Automatización ETL (Python): procesa 10k+ registros/día.\n- Portafolio Web (Svelte): este sitio estilo Windows 98.\n- Análisis Predictivo (ML): modelo con scikit-learn.'
		},
		{ 
			id: 'github', 
			icon: '/icons/github.png', 
			label: 'GitHub', 
			content: 'GitHub - @Quirogama\n\nExplora mis repos: análisis de datos, automatización en Python, apps web y notebooks.\nEnlace: github.com/Quirogama'
		},
		{
			id: 'linkedin',
			icon: '/icons/linkedin.png',
			label: 'LinkedIn',
			content: 'LinkedIn\n\nPerfil profesional: Quirogama (Analista de Datos & Dev Junior).\nAbierto a oportunidades en Análisis de datos, BI, Desarrollo web, Data Science Jr.\nEnlace: (próximamente)'
		},
		{
			id: 'contact',
			icon: '/icons/contacto.png',
			label: 'Contacto',
			content: 'Contacto\n\nUbicación: [Tu ciudad/país]\nEmail: correo@ejemplo.com\nGitHub: @Quirogama\n\nOfrezco: análisis accionables, automatización, dashboards, desarrollo web.'
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
		const isAbout = icon.id === 'about';
		const title = isAbout ? aboutTitle : icon.label;
		const width = isAbout ? aboutWidth : 520;
		const height = isAbout ? aboutHeight : 360;
		windows = [
			...windows,
			{ id, title, width, height, z: 2, content: icon.content }
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
