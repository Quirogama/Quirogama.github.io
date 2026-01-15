<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';
	import PDFViewer from '$lib/PDFViewer.svelte';
	import ProjectsViewer from '$lib/ProjectsViewer.svelte';
	import { aboutTitle, aboutText } from '$lib/content.js';
	import { projects, WINDOW_SIZES, WINDOW_OFFSET, WINDOW_INITIAL_X, WINDOW_INITIAL_Y } from '$lib/windowsConfig.js';
	import { onMount } from 'svelte';
	import '../global.css';

	let { children } = $props();

	// Calcula la posición centrada para la ventana inicial
	let centerLeft = $state(300);
	let centerTop = $state(80);

	// Al montar: centra la ventana "Sobre mí" en la pantalla
	onMount(() => {
		centerLeft = Math.max(50, (window.innerWidth - WINDOW_SIZES.about.width) / 2);
		centerTop = Math.max(50, (window.innerHeight - WINDOW_SIZES.about.height - 100) / 2); // -100 para la taskbar
	});

	// Estado global de ventanas: contiene la ventana "Sobre mí" abierta por defecto
	let windows = $state([
		{
			id: 1,
			title: aboutTitle,
			width: WINDOW_SIZES.about.width,
			height: WINDOW_SIZES.about.height,
			z: 2,
			appLabel: 'Sobre Mí',
			icon: '/icons/sobremi.png',
			hiddenInTaskbar: true,
			get left() { return centerLeft; },
			get top() { return centerTop; },
			content: aboutText,
			componentType: 'about',
			componentProps: { content: aboutText }
		}
	]);

	// Lista de tareas (ventanas visibles) para la taskbar
	let tasks = $derived(
		windows
			.filter((w) => !w.hiddenInTaskbar)
			.map((w) => ({ id: w.id, label: w.appLabel ?? w.title, icon: w.icon }))
	);

	// ID de la ventana activa (la que está en el frente)
	let activeWindowId = $derived(
		windows.reduce((maxW, w) => (!w.minimized && w.z > (maxW?.z ?? 0) ? w : maxW), null)?.id ?? null
	);

	// Maneja los clics en las tareas de la taskbar
	function handleTaskClick(event) {
		const { id } = event.detail;
		const window = windows.find(w => w.id === id);
		if (!window) return;

		if (window.minimized) {
			// Restaura la ventana y la trae al frente
			const newZ = Math.max(...windows.map(w => w.z ?? 0)) + 1;
			windows = windows.map(w => 
				w.id === id ? { ...w, minimized: false, z: newZ } : w
			);
		} else if (id === activeWindowId) {
			// Si ya está activa, minimiza
			windows = windows.map(w => 
				w.id === id ? { ...w, minimized: true } : w
			);
		} else {
			// Si está visible pero no activa, la trae al frente
			const newZ = Math.max(...windows.map(w => w.z ?? 0)) + 1;
			windows = windows.map(w => 
				w.id === id ? { ...w, z: newZ } : w
			);
		}
	}

	// Maneja la selección de elementos del menú Start
	function handleMenuSelect(event) {
		const { id } = event.detail;
		
		// Mapeo de IDs del menú a datos de ventanas
		const contentMap = {
			about: { 
				title: aboutTitle, 
				content: aboutText,
			width: WINDOW_SIZES.about.width,
			height: WINDOW_SIZES.about.height,
				appLabel: 'Sobre Mí',
				icon: '/icons/sobremi.png'
			},
			cv: { 
				title: 'Currículum - Andrés Quiroga', 
				componentType: 'pdf',
				componentProps: { src: '/cv.pdf' },
				width: WINDOW_SIZES.pdf.width,
				height: WINDOW_SIZES.pdf.height,
				appLabel: 'Currículum',
				icon: '/icons/cv.png'
			},
			projects: { 
				title: 'Mis Proyectos - Portafolio', 
				componentType: 'projects',
				componentProps: { projects },
				width: WINDOW_SIZES.projects.width,
				height: WINDOW_SIZES.projects.height,
				appLabel: 'Proyectos',
				icon: '/icons/proyectos.png'
			},
			paint: {
				title: 'Paint',
				componentType: 'paint',
				width: WINDOW_SIZES.paint.width,
				height: WINDOW_SIZES.paint.height,
				appLabel: 'Paint',
				icon: '/icons/paint.png'
			},
			github: { 
				title: 'GitHub', 
				content: 'GitHub — @Quirogama\n\nExplore my repos: data analysis, Python automation, web apps, and notebooks.\nLink: github.com/Quirogama',
				width: WINDOW_SIZES.default.width,
				height: WINDOW_SIZES.default.height,
				appLabel: 'GitHub',
				icon: '/icons/github.png'
			},
			linkedin: { 
				title: 'LinkedIn', 
				content: 'LinkedIn\n\nProfessional profile: Quirogama (Data Analyst & Junior Dev).\nOpen to roles in Data Analysis, BI, Web Development, or Junior Data Science.\nLink: (coming soon)',
				width: WINDOW_SIZES.default.width,
				height: WINDOW_SIZES.default.height,
				appLabel: 'LinkedIn',
				icon: '/icons/linkedin.png'
			},
			contact: { 
				title: 'Contact', 
				content: 'Contact\n\nLocation: [Your city/country]\nEmail: email@example.com\nGitHub: @Quirogama\n\nI can help with: actionable analysis, automation, dashboards, and web development.',
				width: WINDOW_SIZES.default.width,
				height: WINDOW_SIZES.default.height,
				appLabel: 'Contact',
				icon: '/icons/contacto.png'
			}
		};

		const windowData = contentMap[id];
		if (!windowData) {
			console.log('No action for:', id);
			return;
		}

		// Crea una nueva ventana con los datos del menú seleccionado
		const newId = Date.now();
		const offset = windows.length * WINDOW_OFFSET;
		const newZ = Math.max(...windows.map(w => w.z ?? 0), 0) + 1;

		windows = [
			...windows,
			{
				id: newId,
				title: windowData.title,
				content: windowData.content,
				width: windowData.width,
				height: windowData.height,
				left: WINDOW_INITIAL_X + offset,
				top: WINDOW_INITIAL_Y + offset,
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

<!-- Contenedor principal con Desktop y Taskbar -->
<div class="shell-root">
	<Desktop bind:windows />
	<Taskbar {tasks} {activeWindowId} on:taskclick={handleTaskClick} on:menuselect={handleMenuSelect} />
</div>

<!-- Rutas anidadas (contenido de las páginas del sitio) -->
{@render children?.()}

<style>
	/* El shell-root ocupa toda la pantalla y gestiona el layout entre desktop y taskbar */
</style>
