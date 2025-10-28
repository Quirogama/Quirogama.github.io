<script>
	import Window from './Window.svelte';
	import DesktopIcon from './DesktopIcon.svelte';
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
			content: aboutText,
			x: 16,
			y: 16
		},
		{ 
			id: 'cv', 
			icon: '/icons/cv.png', 
			label: 'Resume', 
			content: 'Resume — Andrés Quiroga\n\nData Analyst & Junior Developer.\n\nExperience: 6 months in data analysis and development.\nProjects: Python automation, dashboards, data visualization.\nSkills: Python, SQL, Power BI, Git.',
			x: 16,
			y: 126
		},
		{
			id: 'projects',
			icon: '/icons/proyectos.png',
			label: 'Projects',
			content: 'Selected Projects\n\n- Analytics Dashboard (Power BI): ~40% faster analysis.\n- ETL Automation (Python): processes 10k+ records/day.\n- Web Portfolio (Svelte): this Windows 98–style site.\n- Predictive Analysis (ML): prototype with scikit-learn.',
			x: 16,
			y: 236
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

	// Initial layout + resize listener (once on mount)
	onMount(() => {
		updateLayoutMode();
		const handler = () => updateLayoutMode();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handler);
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
		const title = isAbout ? aboutTitle : icon.label;
		const width = isAbout ? aboutWidth : 520;
		const height = isAbout ? aboutHeight : 360;
		
		// Calculate position: slightly offset from previous windows
		const offset = windows.length * 30;
		const left = 100 + offset;
		const top = 100 + offset;
		
		zCounter = zCounter + 1;
		windows = [
			...windows,
			{ id, title, width, height, left, top, z: zCounter, content: icon.content, minimized: false, appLabel: icon.label, icon: icon.icon }
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
			selected={selectedIconId === ic.id}
			onselect={() => selectedIconId = ic.id}
			onopen={() => openIcon(ic)} 
		/>
	{/each}

	{#each windows as w (w.id)}
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
			onfocus={() => bringToFront(w.id)}
		>
			<div style="padding:8px">{w.content}</div>
		</Window>
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
