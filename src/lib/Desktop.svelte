<script>
	import Window from './Window.svelte';
	import DesktopIcon from './DesktopIcon.svelte';
	import { aboutText, aboutTitle, aboutWidth, aboutHeight } from '$lib/content.js';
	
	let { windows = $bindable([]) } = $props();

	// example icons for the portfolio desktop
	// icons without positions will be laid out adaptively
	let icons = $state([
		{
			id: 'about',
			icon: '/icons/sobremi.png',
			label: 'Sobre Mi',
			content: aboutText,
			x: 16,
			y: 16
		},
		{ 
			id: 'cv', 
			icon: '/icons/cv.png', 
			label: 'CV', 
			content: 'CV - Andrés Quiroga\n\nAnalista de Datos & Desarrollador Junior.\n\nExperiencia: 6 meses en análisis de datos y desarrollo.\nProyectos: Automatización con Python, dashboards y visualización.\nHabilidades: Python, SQL, Power BI, Git.',
			x: 16,
			y: 126
		},
		{
			id: 'projects',
			icon: '/icons/proyectos.png',
			label: 'Proyectos',
			content: 'Proyectos Destacados\n\n- Dashboard Analítico (Power BI): -40% tiempo de análisis.\n- Automatización ETL (Python): procesa 10k+ registros/día.\n- Portafolio Web (Svelte): este sitio estilo Windows 98.\n- Análisis Predictivo (ML): modelo con scikit-learn.',
			x: 16,
			y: 236
		},
		{ 
			id: 'github', 
			icon: '/icons/github.png', 
			label: 'GitHub', 
			content: 'GitHub - @Quirogama\n\nExplora mis repos: análisis de datos, automatización en Python, apps web y notebooks.\nEnlace: github.com/Quirogama',
			x: 16,
			y: 346
		},
		{
			id: 'linkedin',
			icon: '/icons/linkedin.png',
			label: 'LinkedIn',
			content: 'LinkedIn\n\nPerfil profesional: Quirogama (Analista de Datos & Dev Junior).\nAbierto a oportunidades en Análisis de datos, BI, Desarrollo web, Data Science Jr.\nEnlace: (próximamente)',
			x: 134,
			y: 16
		},
		{
			id: 'contact',
			icon: '/icons/contacto.png',
			label: 'Contacto',
			content: 'Contacto\n\nUbicación: [Tu ciudad/país]\nEmail: correo@ejemplo.com\nGitHub: @Quirogama\n\nOfrezco: análisis accionables, automatización, dashboards, desarrollo web.',
			x: 134,
			y: 126
		}
	]);

	const ICON_W = 110; // icon slot width
	const ICON_H = 110; // vertical spacing
	const MARGIN_X = 16;
	const MARGIN_Y = 16;

	// Determine layout direction based on screen height
	let layoutMode = $state('column'); // 'column' or 'row'
	let maxPerLine = $state(4);

	function updateLayoutMode() {
		if (typeof window === 'undefined') return;
		const screenHeight = window.innerHeight;
		// If screen is short (< 600px), use row-major (left-to-right, then down)
		// Otherwise use column-major (top-to-bottom, then right)
		if (screenHeight < 600) {
			layoutMode = 'row';
			maxPerLine = Math.floor((window.innerWidth - MARGIN_X * 2) / (ICON_W + 8)) || 3;
		} else {
			layoutMode = 'column';
			maxPerLine = Math.floor((screenHeight - 100) / ICON_H) || 4;
		}
		repositionIcons();
	}

	function repositionIcons() {
		icons = icons.map((ic, i) => {
			let x, y;
			if (layoutMode === 'row') {
				// Row-major: left to right, then down
				const row = Math.floor(i / maxPerLine);
				const col = i % maxPerLine;
				x = MARGIN_X + col * (ICON_W + 8);
				y = MARGIN_Y + row * ICON_H;
			} else {
				// Column-major: top to bottom, then right
				const col = Math.floor(i / maxPerLine);
				const row = i % maxPerLine;
				x = MARGIN_X + col * (ICON_W + 8);
				y = MARGIN_Y + row * ICON_H;
			}
			return { ...ic, x, y };
		});
	}

	// Initial layout
	$effect(() => {
		updateLayoutMode();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateLayoutMode);
			return () => window.removeEventListener('resize', updateLayoutMode);
		}
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
		<DesktopIcon 
			icon={ic.icon} 
			label={ic.label} 
			x={ic.x} 
			y={ic.y} 
			onopen={() => openIcon(ic)} 
		/>
	{/each}

	{#each windows as w (w.id)}
		{#if !w.closed}
			<Window
				title={w.title}
				width={w.width}
				height={w.height}
				left={w.left ?? 40}
				top={w.top ?? 40}
				z={w.z}
				onclose={() => {
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
