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
	import { onMount } from 'svelte';
    
	let { windows = $bindable([]) } = $props();

	// example icons for the portfolio desktop
	// icons without positions will be laid out adaptively
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
			componentProps: { 
				projects: [
					{
						title: 'Analytics Dashboard',
						description: 'Interactive Power BI dashboard that reduced analysis time by ~40%. Real-time metrics tracking with automated data refresh.',
						tech: 'Power BI, SQL, DAX',
						image: null
					},
					{
						title: 'ETL Automation Pipeline',
						description: 'Python-based ETL system processing 10,000+ records daily. Automated data cleaning, transformation, and loading to database.',
						tech: 'Python, Pandas, SQL, Apache Airflow',
						image: null
					},
					{
						title: 'Windows 98 Portfolio',
						description: 'This retro-styled interactive portfolio website. Features draggable windows, taskbar, and classic Windows 98 UI elements.',
						tech: 'Svelte, SvelteKit, JavaScript, CSS',
						image: null
					},
					{
						title: 'Predictive Analysis Model',
						description: 'Machine learning prototype for forecasting trends. Uses regression and classification algorithms with scikit-learn.',
						tech: 'Python, scikit-learn, Pandas, Matplotlib',
						image: null
					}
					]
				},
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

	const ICON_W = 96; // icon slot width (reduced)
	const ICON_H = 96; // vertical spacing (reduced)
	const MARGIN_X = 16;
	const MARGIN_Y = 16;

	// Determine layout direction based on screen height
	// Keep layoutMode as 'column' (top-to-bottom) at all viewport heights
	let layoutMode = $state('column'); // 'column' or 'row'
	let maxPerLine = $state(4);

	function updateLayoutMode() {
		if (typeof window === 'undefined') return;
		const screenHeight = window.innerHeight;
		// Always use column-major (top-to-bottom), even on short viewports.
		// Calculate how many icons fit vertically; ensure at least 1 per column.
		layoutMode = 'column';
		maxPerLine = Math.max(1, Math.floor((screenHeight - 100) / ICON_H));
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

	// Initial layout + resize listener (once on mount)
	onMount(() => {
		updateLayoutMode();
		const handler = () => updateLayoutMode();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handler);
		}

		// Auto-open the About window on first load so the change is visible in preview
		// Use a small timeout so the UI has time to mount
		const aboutIcon = icons.find(i => i.id === 'about');
		if (aboutIcon && windows.length === 0) {
			setTimeout(() => {
				// guard in case user already opened windows quickly
				if (windows.length === 0) {
					openIcon(aboutIcon);
					// also create a second 'About' window on the left to serve as the additional box
					// only add it if windows is still small (avoid duplicates)
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

	// bring a window to front by id
	let zCounter = $state(Math.max(0, ...windows.map(w => w.z ?? 0)) || 1);
	function bringToFront(id) {
		zCounter = zCounter + 1;
		windows = windows.map(w => w.id === id ? { ...w, z: zCounter } : w);
	}

	let selectedIconId = $state(null);

	function openIcon(icon) {
		// Create a new window entry and push (larger default size)
		const id = Math.floor(Math.random() * 100000);
		const isAbout = icon.id === 'about';
		const isPDF = icon.componentType === 'pdf';
		const isProjects = icon.componentType === 'projects';
        const isPaint = icon.componentType === 'paint';
		const title = isAbout ? aboutTitle : icon.label;
	// adjust Paint default to be a bit larger for comfortable drawing
	// default sizes, make calculator narrower to avoid wide horizontal layout
	const width = isAbout ? aboutWidth : (isPDF ? 700 : (isProjects ? 650 : (isPaint ? 700 : (icon.componentType === 'calc' ? 360 : 520))));
	const height = isAbout ? aboutHeight : (isPDF ? 600 : (isProjects ? 500 : (isPaint ? 410 : (icon.componentType === 'calc' ? 390 : 360))));
		
		// Calculate position: slightly offset from previous windows
		const offset = windows.length * 30;
		const left = 100 + offset;
		const top = 100 + offset;
		
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
	/* Let the desktop fill the available space inside .shell-root (which already accounts for the taskbar) */
	.desktop {
		position: relative;
		width: 100%;
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
	}
</style>
