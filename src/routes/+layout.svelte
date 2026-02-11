<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/retro/components/Desktop.svelte';
	import Taskbar from '$lib/retro/components/Taskbar.svelte';
	import ModernLanding from '$lib/modern/components/ModernLanding.svelte';
	import { aboutTitle, aboutText, projects, WINDOW_SIZES, WINDOW_OFFSET, WINDOW_INITIAL_X, WINDOW_INITIAL_Y, APPS, CONTACT_TEXT } from '$lib/retro/windowsConfig.js';
	import { onMount } from 'svelte';
	import '../global.css';

	let { children } = $props();
	
	// Estado para toggle entre modern y retro
	let mode = $state('modern'); // 'modern' o 'retro'
	let isTransitioning = $state(false);
	let isFirstModernView = $state(true); // Para controlar animaciones solo en primera visita

	// Calcula la posición centrada para la ventana inicial
	let centerLeft = $state(300);
	let centerTop = $state(80);

	// Al montar: centra la ventana "Sobre mí" en la pantalla
	onMount(() => {
		centerLeft = Math.max(50, (window.innerWidth - WINDOW_SIZES.about.width) / 2);
		centerTop = Math.max(50, (window.innerHeight - WINDOW_SIZES.about.height - 100) / 2); // -100 para la taskbar
	});

	// Estado global de ventanas: arranca con "Sobre mí" ya abierta
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

	// Derivado: lista de tareas visibles para la taskbar
	let tasks = $derived(
		windows
			.filter((w) => !w.hiddenInTaskbar)
			.map((w) => ({ id: w.id, label: w.appLabel ?? w.title, icon: w.icon }))
	);

	// Derivado: id de la ventana activa (la que tiene z más alto y no está minimizada)
	let activeWindowId = $derived(
		windows.reduce((maxW, w) => (!w.minimized && w.z > (maxW?.z ?? 0) ? w : maxW), null)?.id ?? null
	);

	// Click en una tarea: restaura, minimiza o trae al frente según estado
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
			return;
		}

		// Si tiene downloadUrl, descarga el archivo directamente
		if (app.downloadUrl) {
			const link = document.createElement('a');
			link.href = app.downloadUrl;
			link.download = app.downloadFilename || 'download';
			link.click();
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
		else if (appId === 'contact') content = CONTACT_TEXT;

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

	// Función para cambiar de modo con animación de escaneo
	function switchMode(newMode) {
		isTransitioning = true;
		// Si cambiamos a moderno desde retro, ya no es la primera vez
		if (newMode === 'modern' && mode === 'retro') {
			isFirstModernView = false;
		}
		// Espera a que la cortina termine completamente (1200ms) para cambiar el contenido
		// Así la animación es suave y sin interrupciones
		setTimeout(() => {
			mode = newMode;
			isTransitioning = false;
		}, 1200);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if mode === 'modern'}
	<!-- MODO MODERNO -->
	<div class="mode-switcher">
		<button class="switch-btn retro-btn" onclick={() => switchMode('retro')} title="Cambiar a versión retro" disabled={isTransitioning}>
			<span>↻</span> Ver Portafolio Retro
		</button>
	</div>
	<ModernLanding shouldAnimate={isFirstModernView} />
{:else}
	<!-- MODO RETRO (Windows 98) -->
	<div class="mode-switcher">
		<button class="switch-btn modern-btn" onclick={() => switchMode('modern')} title="Cambiar a versión moderna" disabled={isTransitioning}>
			<span>↻</span> Ver Versión Moderna
		</button>
	</div>
	<div class="shell-root">
		<Desktop bind:windows />
		<Taskbar {tasks} {activeWindowId} on:taskclick={handleTaskClick} on:menuselect={handleMenuSelect} />
	</div>
{/if}

<!-- Reveal Overlay - Revela el nuevo contenido con cortina -->
{#if isTransitioning}
	<div class="reveal-overlay">
		<div class="reveal-content">
			{#if mode === 'modern'}
				<!-- Revelar Retro debajo del escaneo -->
				<div class="shell-root">
					<Desktop bind:windows />
					<Taskbar {tasks} {activeWindowId} on:taskclick={handleTaskClick} on:menuselect={handleMenuSelect} />
				</div>
			{:else}
				<!-- Revelar Moderno debajo del escaneo -->
				<ModernLanding shouldAnimate={false} />
			{/if}
		</div>
	</div>
	
	<!-- Scan Overlay encima de todo -->
	<div class="scan-overlay">
		<div class="scan-lines"></div>
	</div>
{/if}

<!-- Rutas anidadas (contenido de las páginas del sitio) -->
{@render children?.()}

<style>
	/* Reveal Overlay - Cortina que revela el nuevo contenido */
	.reveal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9998;
		pointer-events: none;
		overflow: hidden;
	}

	.reveal-content {
		width: 100%;
		height: 100%;
		/* Empieza tapado (0% visibilidad arriba) */
		clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
		/* Anima la cortina bajando para revelar contenido */
		animation: revealCurtain 1.2s ease-in-out forwards;
	}

	@keyframes revealCurtain {
		0% {
			/* Nada visible - la línea está en el tope */
			clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
		}
		100% {
			/* Todo visible - la cortina bajó completamente */
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		}
	}

	/* Scan Overlay - Líneas de escaneo que bajan */
	.scan-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
		z-index: 10000;
		animation: scanFade 1.2s ease-in-out forwards;
		pointer-events: none;
	}

	.scan-lines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: repeating-linear-gradient(
			0deg,
			rgba(212, 175, 55, 0.15) 0px,
			rgba(212, 175, 55, 0.15) 2px,
			transparent 2px,
			transparent 4px
		);
		animation: scanSweep 1.2s ease-in-out forwards;
	}

	.scan-lines::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 8px;
		background: linear-gradient(
			180deg,
			rgba(212, 175, 55, 0.8) 0%,
			rgba(212, 175, 55, 0.4) 50%,
			transparent 100%
		);
		animation: scanBright 1.2s ease-in-out forwards;
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
	}

	@keyframes scanFade {
		0% {
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes scanSweep {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(100vh);
		}
	}

	@keyframes scanBright {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(100vh);
		}
	}

	.mode-switcher {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 9999;
		animation: fadeInDown 0.4s ease-out;
	}

	.switch-btn {
		padding: 10px 16px;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 6px;
		backdrop-filter: blur(10px);
	}

	.switch-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.modern-btn {
		background: rgba(255, 255, 255, 0.9);
		color: #1a1a1a;
		border: 2px solid #2563eb;
	}

	.modern-btn:hover:not(:disabled) {
		background: white;
		box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
		transform: translateY(-2px);
	}

	.retro-btn {
		background: rgba(192, 192, 192, 0.95);
		color: #000080;
		border: 2px outset #dfdfdf;
		font-family: 'MS Sans Serif', Tahoma, sans-serif;
		font-size: 11px;
	}

	.retro-btn:active:not(:disabled) {
		border-style: inset;
	}

	.retro-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.95);
	}

	.switch-btn span {
		display: inline-block;
		animation: spin 1s linear infinite;
	}

	.switch-btn:hover:not(:disabled) span {
		animation: spin 0.6s linear infinite;
	}

	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>

