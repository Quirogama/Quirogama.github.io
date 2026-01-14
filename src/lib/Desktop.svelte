<script>
	import Window from './Window.svelte';
	import DesktopIcon from './DesktopIcon.svelte';
	import PDFViewer from './PDFViewer.svelte';
	import ProjectsViewer from './ProjectsViewer.svelte';
	import AboutViewer from './AboutViewer.svelte';
	import PaintViewer from './PaintViewer.svelte';
	import NotesViewer from './NotesViewer.svelte';
	import Calculator from './Calculator.svelte';
	import GalleryViewer from './GalleryViewer.svelte';
	import MiniBrowser from './MiniBrowser.svelte';
	import MinesweeperViewer from './MinesweeperViewer.svelte';
	import TetrisViewer from './TetrisViewer.svelte';
	import { aboutText, aboutTitle, aboutWidth, aboutHeight } from '$lib/content.js';
	import { projects, WINDOW_SIZES, WINDOW_OFFSET, WINDOW_INITIAL_X, WINDOW_INITIAL_Y } from '$lib/windowsConfig.js';
	import { onMount } from 'svelte';
    
	let { windows = $bindable([]) } = $props();

	// Lista de iconos del escritorio con su información: id, imagen, etiqueta y componente
	let icons = $state([
		{
			id: 'about',
			icon: '/icons/sobremi.png',
			label: 'About Me',
			componentType: 'about',
			content: aboutText,
			x: 16,
			y: 16
		},
		{ 
			id: 'cv', 
			icon: '/icons/cv.png', 
			label: 'Resume',
			componentType: 'pdf',
			componentProps: { src: '/cv.pdf' },
			x: 16,
			y: 126
		},
		{
			id: 'projects',
			icon: '/icons/proyectos.png',
			label: 'Projects',
			componentType: 'projects',
			componentProps: { projects },
			x: 16,
			y: 236
		},
		{
			id: 'paint',
			icon: '/icons/paint.png',
			label: 'Paint',
			componentType: 'paint',
			x: 16,
			y: 456
		},
		{ 
			id: 'github', 
			icon: '/icons/github.png', 
			label: 'GitHub', 
			content: 'GitHub — @Quirogama\n\nExplore my repos: data analysis, Python automation, web apps, and notebooks.\nLink: github.com/Quirogama',
			x: 16,
			y: 346
		},
		{
			id: 'linkedin',
			icon: '/icons/linkedin.png',
			label: 'LinkedIn',
			content: 'LinkedIn\n\nProfessional profile: Quirogama (Data Analyst & Junior Dev).\nOpen to roles in Data Analysis, BI, Web Development, or Junior Data Science.\nLink: (coming soon)',
			x: 134,
			y: 16
		},
		{
			id: 'contact',
			icon: '/icons/contacto.png',
			label: 'Contact',
			content: 'Contact\n\nLocation: [Your city/country]\nEmail: email@example.com\nGitHub: @Quirogama\n\nI can help with: actionable analysis, automation, dashboards, and web development.',
			x: 134,
			y: 126
		}
		,
		{
			id: 'notes',
			icon: '/icons/notepad.png',
			label: 'Notes',
			componentType: 'notes',
			x: 134,
			y: 236
		},
		{
			id: 'calc',
			icon: '/icons/cv.png',
			label: 'Calculator',
			componentType: 'calc',
			x: 134,
			y: 346
		},
		{
			id: 'gallery',
			icon: '/icons/gallery.png',
			label: 'Gallery',
			componentType: 'gallery',
			x: 252,
			y: 16
		},
		{
			id: 'browser',
			icon: '/icons/browser.png',
			label: 'Mini Browser',
			componentType: 'browser',
			x: 252,
			y: 126
		}
		,
		{
			id: 'tetris',
			icon: '/icons/tetris.png',
			label: 'Tetris',
			componentType: 'tetris',
			x: 252,
			y: 236
		},
		{
			id: 'minesweeper',
			icon: '/icons/minesweeper.png',
			label: 'Minesweeper',
			componentType: 'minesweeper',
			x: 252,
			y: 346
		}
	]);

	// Constantes para el layout de los iconos en el escritorio
	const ICON_W = 96; // ancho del slot del icono
	const ICON_H = 96; // alto del slot del icono
	const MARGIN_X = 16; // margen izquierdo
	const MARGIN_Y = 16; // margen superior

	// Modo de layout: 'column' para vertical (de arriba a abajo)
	let layoutMode = $state('column');
	let maxPerLine = $state(4); // máximo de iconos por línea

	// Recalcula el layout basado en la altura de la pantalla
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

	// Al cargar, inicializa el layout y abre la ventana de "Sobre mí" automáticamente
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
					// Abre una segunda ventana "About" a la izquierda
					setTimeout(() => {
						if (windows.length <= 1) {
							zCounter = zCounter + 1;
							const leftWin = {
								id: Math.floor(Math.random() * 100000),
								title: aboutTitle + ' (Left)',
								width: Math.min(420, aboutWidth - 100),
								height: Math.max(300, aboutHeight - 40),
								left: 40,
								top: 100,
								z: zCounter,
								content: aboutText,
								minimized: false,
								appLabel: 'About',
								icon: aboutIcon.icon,
								componentType: 'about',
								componentProps: null
							};
							windows = [...windows, leftWin];
						}
					}, 80);
				}
			}, 150);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handler);
			}
		};
	});

	// Contador para controlar el orden de profundidad (z-index) de las ventanas
	let zCounter = $state(Math.max(0, ...windows.map(w => w.z ?? 0)) || 1);
	
	// Trae una ventana al frente incrementando su z-index
	function bringToFront(id) {
		zCounter = zCounter + 1;
		windows = windows.map(w => w.id === id ? { ...w, z: zCounter } : w);
	}

	let selectedIconId = $state(null);

	// Abre un ícono del escritorio y crea una nueva ventana
	function openIcon(icon) {
		const id = Math.floor(Math.random() * 100000);
		const isAbout = icon.id === 'about';
		const title = isAbout ? aboutTitle : icon.label;
		
		// Define tamaños específicos según el tipo de aplicación usando constantes
		const componentType = icon.componentType;
		const sizes = WINDOW_SIZES[componentType] || WINDOW_SIZES.default;
		const width = isAbout ? aboutWidth : sizes.width;
		const height = isAbout ? aboutHeight : sizes.height;
		
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
			content: icon.content || null, 
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
				{:else if w.componentType === 'about'}
					<AboutViewer content={w.content} />
				{:else if w.componentType === 'paint'}
					<PaintViewer />
				{:else if w.componentType === 'notes'}
					<NotesViewer />
				{:else if w.componentType === 'calc'}
					<Calculator />
				{:else if w.componentType === 'gallery'}
					<GalleryViewer />
				{:else if w.componentType === 'browser'}
					<MiniBrowser />
				{:else if w.componentType === 'tetris'}
					<TetrisViewer />
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
