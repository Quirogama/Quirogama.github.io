<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';
	import PDFViewer from '$lib/PDFViewer.svelte';
	import ProjectsViewer from '$lib/ProjectsViewer.svelte';
	import { aboutTitle, aboutText, projects, WINDOW_SIZES, WINDOW_OFFSET, WINDOW_INITIAL_X, WINDOW_INITIAL_Y, APPS } from '$lib/windowsConfig.js';
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

	// Crea ventana desde APPS (única fuente de verdad)
	function createWindowFromApp(appId) {
		const app = APPS[appId];
		if (!app) {
			console.log('App no encontrada:', appId);
			return;
		}

		// Obtener tamaño
		const sizes = WINDOW_SIZES[app.componentType] || WINDOW_SIZES.default;

		// Construir título según la app
		let title = app.label;
		if (appId === 'about') title = aboutTitle;
		else if (appId === 'cv') title = 'Currículum - Andrés Quiroga';
		else if (appId === 'projects') title = 'Mis Proyectos - Portafolio';
		else if (appId === 'contact') title = 'Contacto - Andrés Quiroga';

		// Construir contenido según la app
		let content = null;
		if (appId === 'about') content = aboutText;
		else if (appId === 'contact') content = 'Contacto\n\n📧 Email: quirogama@javeriana.edu.co\n🔗 GitHub: github.com/Quirogama\n💼 LinkedIn: linkedin.com/in/quirogama\n📍 Bogotá, Colombia\n\nEspecializado en análisis de datos, automatización y desarrollo web. Disponible para proyectos de Data Analysis, BI, Web Development o Data Science.';

		// Construir componentProps
		let componentProps = { ...app.componentProps };
		if (appId === 'projects') componentProps = { projects };
		if (appId === 'about') componentProps = { content: aboutText };

		// Crear nueva ventana
		const newId = Date.now();
		const offset = windows.length * WINDOW_OFFSET;
		const newZ = Math.max(...windows.map(w => w.z ?? 0), 0) + 1;

		windows = [
			...windows,
			{
				id: newId,
				title,
				content,
				width: sizes.width,
				height: sizes.height,
				left: WINDOW_INITIAL_X + offset,
				top: WINDOW_INITIAL_Y + offset,
				z: newZ,
				appLabel: app.label,
				icon: app.icon,
				minimized: false,
				componentType: app.componentType,
				componentProps
			}
		];
	}

	// Maneja la selección de elementos del menú Start
	function handleMenuSelect(event) {
		const { id } = event.detail;
		createWindowFromApp(id);
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
