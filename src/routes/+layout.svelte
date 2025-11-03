<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';
	import PDFViewer from '$lib/PDFViewer.svelte';
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

	function handleMenuSelect(event) {
		const { id } = event.detail;
		
		// Mapeo de IDs del menú a contenido de ventanas
		const contentMap = {
			about: { 
				title: aboutTitle, 
				content: aboutText,
				width: aboutWidth,
				height: aboutHeight,
				appLabel: 'About Me',
				icon: '/icons/sobremi.png'
			},
			cv: { 
				title: 'Resume - Andrés Quiroga', 
				componentType: 'pdf',
				componentProps: { src: '/CV.pdf' },
				width: 700,
				height: 600,
				appLabel: 'Resume',
				icon: '/icons/cv.png'
			},
			projects: { 
				title: 'Projects', 
				content: 'Selected Projects\n\n- Analytics Dashboard (Power BI): ~40% faster analysis.\n- ETL Automation (Python): processes 10k+ records/day.\n- Web Portfolio (Svelte): this Windows 98–style site.\n- Predictive Analysis (ML): prototype with scikit-learn.',
				width: 520,
				height: 360,
				appLabel: 'Projects',
				icon: '/icons/proyectos.png'
			},
			github: { 
				title: 'GitHub', 
				content: 'GitHub — @Quirogama\n\nExplore my repos: data analysis, Python automation, web apps, and notebooks.\nLink: github.com/Quirogama',
				width: 520,
				height: 360,
				appLabel: 'GitHub',
				icon: '/icons/github.png'
			},
			linkedin: { 
				title: 'LinkedIn', 
				content: 'LinkedIn\n\nProfessional profile: Quirogama (Data Analyst & Junior Dev).\nOpen to roles in Data Analysis, BI, Web Development, or Junior Data Science.\nLink: (coming soon)',
				width: 520,
				height: 360,
				appLabel: 'LinkedIn',
				icon: '/icons/linkedin.png'
			},
			contact: { 
				title: 'Contact', 
				content: 'Contact\n\nLocation: [Your city/country]\nEmail: email@example.com\nGitHub: @Quirogama\n\nI can help with: actionable analysis, automation, dashboards, and web development.',
				width: 520,
				height: 360,
				appLabel: 'Contact',
				icon: '/icons/contacto.png'
			}
		};

		const windowData = contentMap[id];
		if (!windowData) {
			console.log('No action for:', id);
			return;
		}

		// Crear nueva ventana
		const newId = Date.now();
		const offset = windows.length * 30;
		const newZ = Math.max(...windows.map(w => w.z ?? 0), 0) + 1;

		windows = [
			...windows,
			{
				id: newId,
				title: windowData.title,
				content: windowData.content,
				width: windowData.width,
				height: windowData.height,
				left: 100 + offset,
				top: 100 + offset,
				z: newZ,
				appLabel: windowData.appLabel,
				icon: windowData.icon,
				minimized: false,
				componentType: windowData.componentType,
				componentProps: windowData.componentProps
			}
		];
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell-root">
	<Desktop bind:windows />
	<Taskbar {tasks} {activeWindowId} on:taskclick={handleTaskClick} on:menuselect={handleMenuSelect} />
</div>

<!-- Panel desplegable (caja) con toda la info relevante, estilo Win98 -->
<!-- Panel eliminado: la información se presenta dentro de la ventana principal con scroll interno. -->

<!-- preserve route children (hidden pages/apps can be mounted here later) -->
{@render children?.()}

<style>
	    /* (styles del panel eliminados) */
</style>
