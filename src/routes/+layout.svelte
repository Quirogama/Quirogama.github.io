<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';
	import PDFViewer from '$lib/PDFViewer.svelte';
	import ProjectsViewer from '$lib/ProjectsViewer.svelte';
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
				title: 'My Projects - Portfolio', 
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
				width: 650,
				height: 500,
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
