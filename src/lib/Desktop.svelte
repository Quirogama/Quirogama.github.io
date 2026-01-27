<script>
	import Window from './Window.svelte';
	import DesktopIcon from './DesktopIcon.svelte';
	import PDFViewer from './PDFViewer.svelte';
	import ProjectsViewer from './ProjectsViewer.svelte';
	import AboutViewer from './AboutViewer.svelte';
	import ExperienceViewer from './ExperienceViewer.svelte';
	import PaintViewer from './PaintViewer.svelte';
	import Calculator from './Calculator.svelte';
	import GalleryViewer from './GalleryViewer.svelte';
	import MinesweeperViewer from './MinesweeperViewer.svelte';
	import SnakeViewer from './SnakeViewer.svelte';
	import { aboutText, aboutTitle, projects, experiences, WINDOW_SIZES, WINDOW_OFFSET, WINDOW_INITIAL_X, WINDOW_INITIAL_Y, APPS, CONTACT_TEXT, SOCIAL_LINKS } from '$lib/windowsConfig.js';
	import { onMount } from 'svelte';
    
	let { windows = $bindable([]) } = $props();

	// Genera iconos del escritorio desde APPS
	let icons = $state(
		Object.values(APPS)
			.filter(app => app.showInDesktop)
			.map(app => ({
				id: app.id,
				icon: app.icon,
				label: app.label,
				componentType: app.componentType,
				componentProps: app.componentProps,
				externalUrl: app.externalUrl,
				downloadUrl: app.downloadUrl,
				downloadFilename: app.downloadFilename,
				x: app.desktopPosition.x,
				y: app.desktopPosition.y,
				// Props específicas para about/contact
				content: app.id === 'about' ? aboutText : (app.id === 'contact' ? CONTACT_TEXT : null)
			}))
	);

	// Constantes para el layout de los iconos en el escritorio
	const ICON_W = 96; // ancho del slot del icono
	const ICON_H = 96; // alto del slot del icono
	const MARGIN_X = 16; // margen izquierdo
	const MARGIN_Y = 16; // margen superior

	// Modo de layout: 'column' para vertical (de arriba a abajo)
	let layoutMode = $state('column');
	let maxPerLine = $state(4); // máximo de iconos por línea

	// Recalcula cuántos iconos caben en columna según la altura
	function updateLayoutMode() {
		if (typeof window === 'undefined') return;
		const screenHeight = window.innerHeight;
		// Calcula cuántos iconos caben verticalmente
		layoutMode = 'column';
		maxPerLine = Math.max(1, Math.floor((screenHeight - 100) / ICON_H));
		repositionIcons();
	}

	// Reposiciona todos los iconos según el layout actual
	function repositionIcons() {
		icons = icons.map((ic, i) => {
			let x, y;
			// Distribuye los iconos de arriba a abajo, de izquierda a derecha
			const col = Math.floor(i / maxPerLine);
			const row = i % maxPerLine;
			x = MARGIN_X + col * (ICON_W + 8);
			y = MARGIN_Y + row * ICON_H;
			return { ...ic, x, y };
		});
	}

	// Al cargar: ajusta layout y abre "Sobre mí" si no hay ventanas
	onMount(() => {
		updateLayoutMode();
		const handler = () => updateLayoutMode();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handler);
		}

		// Abre automáticamente la ventana "About Me" cuando carga el sitio por primera vez
		const aboutIcon = icons.find(i => i.id === 'about');
		if (aboutIcon && windows.length === 0) {
			setTimeout(() => {
				if (windows.length === 0) {
					openIcon(aboutIcon);
				}
			}, 150);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handler);
			}
		};
	});

	// Contador para z-index de ventanas
	let zCounter = $state(Math.max(0, ...windows.map(w => w.z ?? 0)) || 1);
	
	// Trae una ventana al frente incrementando su z-index
	function bringToFront(id) {
		zCounter = zCounter + 1;
		windows = windows.map(w => w.id === id ? { ...w, z: zCounter } : w);
	}

	let selectedIconId = $state(null);

	// Abre un ícono del escritorio y crea una nueva ventana
	function openIcon(icon) {
		// Quita el foco del elemento activo para prevenir múltiples aperturas
		if (document.activeElement) {
			document.activeElement.blur();
		}
		
		// Si es el ícono de GitHub, abre la URL directamente en una nueva pestaña
		if (icon.id === 'github') {
			window.open(SOCIAL_LINKS.github, '_blank');
			return;
		}
		
		// Si es el ícono de LinkedIn, abre la URL directamente en una nueva pestaña
		if (icon.id === 'linkedin') {
			window.open(SOCIAL_LINKS.linkedin, '_blank');
			return;
		}
		
		// Si tiene downloadUrl, descarga el archivo directamente
		if (icon.downloadUrl) {
			const link = document.createElement('a');
			link.href = icon.downloadUrl;
			link.download = icon.downloadFilename || 'download';
			link.click();
			return;
		}
		
		const id = Math.floor(Math.random() * 100000);
		const title = icon.id === 'about' ? aboutTitle : icon.label;
		
		// Define tamaños específicos según el tipo de aplicación usando constantes
		const componentType = icon.componentType;
		const sizes = WINDOW_SIZES[componentType] || WINDOW_SIZES.default;
		const width = sizes.width;
		const height = sizes.height;
		
		// Posiciona la nueva ventana con un pequeño offset respecto a la anterior
		const offset = windows.length * WINDOW_OFFSET;
		const left = WINDOW_INITIAL_X + offset;
		const top = WINDOW_INITIAL_Y + offset;
		
		zCounter = zCounter + 1;
		const newWindow = { 
			id, 
			title, 
			width, 
			height, 
			left, 
			top, 
			z: zCounter, 
			content: icon.id === 'about' ? aboutText : (icon.content || null), 
			minimized: false, 
			appLabel: icon.label, 
			icon: icon.icon,
			componentType: icon.componentType || null,
			componentProps: icon.componentProps || null
		};
		
		windows = [...windows, newWindow];
	}
</script>

<div class="desktop">
	<!-- Renderiza todos los iconos del escritorio -->
	{#each icons as ic}
		<DesktopIcon 
			icon={ic.icon} 
			label={ic.label} 
			x={ic.x} 
			y={ic.y} 
			selected={selectedIconId === ic.id}
			onselect={() => selectedIconId = ic.id}
			onopen={() => openIcon(ic)} 
		/>
	{/each}

	<!-- Renderiza todas las ventanas abiertas -->
	{#each windows as w (w.id)}
		{#if !w.minimized}
			<Window
				title={w.title}
				width={w.width}
				height={w.height}
				left={w.left ?? 40}
				top={w.top ?? 40}
				z={w.z}
				isActive={w.z === Math.max(...windows.map(win => win.z ?? 0))}
				onclose={() => {
					windows = windows.filter(win => win.id !== w.id);
				}}
				onminimize={() => {
					windows = windows.map(win => 
						win.id === w.id ? { ...win, minimized: true } : win
					);
				}}
				onfocus={() => bringToFront(w.id)}
				onresize={({ width, height, left, top }) => {
					windows = windows.map(win => win.id === w.id ? { ...win, width, height, left, top } : win);
				}}
				onmove={({ width, height, left, top }) => {
					windows = windows.map(win => win.id === w.id ? { ...win, width, height, left, top } : win);
				}}
			>
				<!-- Renderiza el componente correspondiente según el tipo de ventana -->
				{#if w.componentType === 'pdf' && w.componentProps?.src}
					<PDFViewer src={w.componentProps.src} />
				{:else if w.componentType === 'projects' && w.componentProps?.projects}
					<ProjectsViewer projects={w.componentProps.projects} />
				{:else if w.componentType === 'experience'}
					<ExperienceViewer {experiences} />
				{:else if w.componentType === 'about'}
					<AboutViewer content={w.content} />
				{:else if w.componentType === 'paint'}
					<PaintViewer />
			{:else if w.componentType === 'calc'}
				<Calculator />
			{:else if w.componentType === 'gallery'}
				<GalleryViewer />
				{:else if w.componentType === 'snake'}
					<SnakeViewer />
				{:else if w.componentType === 'minesweeper'}
					<MinesweeperViewer />
				{:else if w.content}
					<div style="padding:8px">{w.content}</div>
				{:else}
					<div style="padding:8px">Loading...</div>
				{/if}
			</Window>
		{/if}
	{/each}
</div>

<style>
	/* El escritorio ocupa todo el espacio disponible y maneja el overflow de ventanas */
	.desktop {
		position: relative;
		width: 100%;
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
	}
</style>

