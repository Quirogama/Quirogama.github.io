<script>
	import favicon from '$lib/assets/favicon.svg';
	import ModernLanding from '$lib/modern/components/ModernLanding.svelte';
	import {
		aboutTitle,
		aboutText,
		projects,
		WINDOW_SIZES,
		APPS,
		CONTACT_TEXT
	} from '$lib/retro/windowsConfig.js';
	import { onMount } from 'svelte';
	import '../global.css';

	let { children } = $props();

	// Estado para toggle entre moderno y retro
	let mode = $state('modern'); // 'modern' o 'retro'
	let isTransitioning = $state(false);
	let isFirstModernView = $state(true); // Para controlar animaciones solo en primera visita
	let showModeHint = $state(false);
	let isMobileViewport = $state(false);
	let mobileStartOpen = $state(false);
	let mobileStartMenuEl = $state(null);
	let mobileStartButtonEl = $state(null);
	let mobileClock = $state('');
	let mobileClockTimer;
	let RetroDesktop = $state(null);
	let RetroTaskbar = $state(null);
	let retroComponentsPromise = null;

	const mobileStartItems = Object.values(APPS).filter((app) => app.showInStartMenu);

	function updateMobileViewport() {
		if (typeof window === 'undefined') return;
		isMobileViewport = window.innerWidth <= 768;
	}

	function updateMobileClock() {
		const d = new Date();
		let hours = d.getHours();
		const minutes = String(d.getMinutes()).padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		mobileClock = `${hours}:${minutes} ${ampm}`;
	}

	function toggleMobileStartMenu() {
		mobileStartOpen = !mobileStartOpen;
	}

	function selectMobileStartApp(appId) {
		mobileStartOpen = false;
		createWindowFromApp(appId);
	}

	function closeMobileStartMenuOutside(e) {
		if (!mobileStartOpen) return;
		if (!mobileStartMenuEl || !mobileStartButtonEl) return;
		if (!mobileStartMenuEl.contains(e.target) && !mobileStartButtonEl.contains(e.target)) {
			mobileStartOpen = false;
		}
	}

	async function ensureRetroComponentsLoaded() {
		if (RetroDesktop && RetroTaskbar) return;
		if (!retroComponentsPromise) {
			retroComponentsPromise = Promise.all([
				import('$lib/retro/components/Desktop.svelte'),
				import('$lib/retro/components/Taskbar.svelte')
			]).then(([desktopModule, taskbarModule]) => {
				RetroDesktop = desktopModule.default;
				RetroTaskbar = taskbarModule.default;
			});
		}

		await retroComponentsPromise;
	}

	// Calcula la posición centrada para la ventana inicial
	let centerLeft = $state(300);
	let centerTop = $state(80);
	let aboutWindowSize = $state({
		width: WINDOW_SIZES.about.width,
		height: WINDOW_SIZES.about.height
	});

	const ICON_SLOT_W = 104;
	const ICON_SIZE_W = 96;
	const ICON_MARGIN_X = 16;
	const ICON_SLOT_H = 96;
	const TASKBAR_H = 52;
	const TOP_SAFE = 56;
	const MIN_WINDOW_W = 260;
	const MIN_WINDOW_H = 260;

	function getSafeLeftMin(viewportHeight = window.innerHeight) {
		const iconColumns = getDesktopIconColumns(viewportHeight);
		const iconAreaWidth = ICON_MARGIN_X + (iconColumns - 1) * ICON_SLOT_W + ICON_SIZE_W + 12;
		return iconAreaWidth + 24;
	}

	function fitWindowSize(baseWidth, baseHeight) {
		const leftMin = getSafeLeftMin(window.innerHeight);
		const maxWidth = Math.max(MIN_WINDOW_W, window.innerWidth - leftMin - 24);
		const maxHeight = Math.max(MIN_WINDOW_H, window.innerHeight - TASKBAR_H - TOP_SAFE - 12);

		return {
			width: Math.max(MIN_WINDOW_W, Math.min(baseWidth, maxWidth)),
			height: Math.max(MIN_WINDOW_H, Math.min(baseHeight, maxHeight))
		};
	}

	function getDesktopIconColumns(viewportHeight) {
		const desktopIconCount = Object.values(APPS).filter((app) => app.showInDesktop).length;
		const maxPerColumn = Math.max(1, Math.floor((viewportHeight - 100) / ICON_SLOT_H));
		return Math.max(1, Math.ceil(desktopIconCount / maxPerColumn));
	}

	function getSafeBounds(windowWidth, windowHeight) {
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		const leftMinRaw = getSafeLeftMin(vh);
		const leftMaxRaw = vw - windowWidth - 24;
		const topMaxRaw = vh - windowHeight - TASKBAR_H - 10;

		const leftMin = Math.max(18, Math.min(leftMinRaw, Math.max(18, leftMaxRaw)));
		const leftMax = Math.max(leftMin, leftMaxRaw);
		const topMin = TOP_SAFE;
		const topMax = Math.max(topMin, topMaxRaw);

		return { leftMin, leftMax, topMin, topMax };
	}

	function getCenteredSafePosition(windowWidth, windowHeight) {
		const bounds = getSafeBounds(windowWidth, windowHeight);
		const safeAreaWidth = Math.max(0, window.innerWidth - bounds.leftMin - 24);
		const centeredLeft = bounds.leftMin + Math.max(0, (safeAreaWidth - windowWidth) / 2);
		const centeredTop = (window.innerHeight - TASKBAR_H - windowHeight) / 2;

		return {
			left: Math.max(bounds.leftMin, Math.min(centeredLeft, bounds.leftMax)),
			top: Math.max(bounds.topMin, Math.min(centeredTop, bounds.topMax))
		};
	}

	function getSpawnSafePosition(windowWidth, windowHeight, index = 0) {
		const bounds = getSafeBounds(windowWidth, windowHeight);
		const left = bounds.leftMin + index * 26;
		const top = bounds.topMin + 18 + index * 20;

		return {
			left: Math.max(bounds.leftMin, Math.min(left, bounds.leftMax)),
			top: Math.max(bounds.topMin, Math.min(top, bounds.topMax))
		};
	}

	function updateInitialWindowPosition() {
		if (typeof window === 'undefined') return;
		aboutWindowSize = fitWindowSize(WINDOW_SIZES.about.width, WINDOW_SIZES.about.height);
		const pos = getCenteredSafePosition(aboutWindowSize.width, aboutWindowSize.height);
		centerLeft = pos.left;
		centerTop = pos.top;
	}

	// Al montar: centra la ventana "Sobre mí" en la pantalla
	onMount(() => {
		updateInitialWindowPosition();
		updateMobileViewport();
		updateMobileClock();
		showModeHint = localStorage.getItem('modeHintSeen') !== '1';
		const handleResize = () => {
			updateInitialWindowPosition();
			updateMobileViewport();
		};
		window.addEventListener('resize', handleResize);
		document.addEventListener('click', closeMobileStartMenuOutside);
		mobileClockTimer = setInterval(updateMobileClock, 1000);

		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('click', closeMobileStartMenuOutside);
			clearInterval(mobileClockTimer);
		};
	});

	// Estado global de ventanas: arranca con "Sobre mí" ya abierta
	let windows = $state([
		{
			id: 1,
			title: aboutTitle,
			get width() {
				return aboutWindowSize.width;
			},
			get height() {
				return aboutWindowSize.height;
			},
			z: 2,
			appLabel: 'Sobre Mí',
			icon: '/icons/sobremi.png',
			hiddenInTaskbar: true,
			get left() {
				return centerLeft;
			},
			get top() {
				return centerTop;
			},
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
		const window = windows.find((w) => w.id === id);
		if (!window) return;

		if (window.minimized) {
			// Restaura la ventana y la trae al frente
			const newZ = Math.max(...windows.map((w) => w.z ?? 0)) + 1;
			windows = windows.map((w) => (w.id === id ? { ...w, minimized: false, z: newZ } : w));
		} else if (id === activeWindowId) {
			// Si ya está activa, minimiza
			windows = windows.map((w) => (w.id === id ? { ...w, minimized: true } : w));
		} else {
			// Si está visible pero no activa, la trae al frente
			const newZ = Math.max(...windows.map((w) => w.z ?? 0)) + 1;
			windows = windows.map((w) => (w.id === id ? { ...w, z: newZ } : w));
		}
	}

	// Crea ventana desde APPS (única fuente de verdad)
	function createWindowFromApp(appId) {
		const app = APPS[appId];
		if (!app) {
			return;
		}

		// Si es un enlace externo, abrir en nueva pestaña
		if (app.externalUrl) {
			if (!window.confirm('Vas a abrir un sitio externo. ¿Continuar?')) {
				return;
			}
			window.open(app.externalUrl, '_blank');
			return;
		}

		// Si tiene downloadUrl, descarga el archivo directamente
		if (app.downloadUrl) {
			if (!window.confirm('Se va a descargar un archivo. ¿Deseas continuar?')) {
				return;
			}
			const link = document.createElement('a');
			link.href = app.downloadUrl;
			link.download = app.downloadFilename || 'download';
			link.click();
			return;
		}

		// Obtener tamaño
		const baseSizes = WINDOW_SIZES[app.componentType] || WINDOW_SIZES.default;
		const sizes = fitWindowSize(baseSizes.width, baseSizes.height);

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
		const spawn = getSpawnSafePosition(sizes.width, sizes.height, windows.length);
		const newZ = Math.max(...windows.map((w) => w.z ?? 0), 0) + 1;

		windows = [
			...windows,
			{
				id: newId,
				title,
				content,
				width: sizes.width,
				height: sizes.height,
				left: spawn.left,
				top: spawn.top,
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
		if (newMode === 'retro') {
			ensureRetroComponentsLoaded().catch(() => {
				// El fallback visual se encarga de comunicar que está cargando.
			});
		}
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

	function toggleMode() {
		markModeHintAsSeen();
		switchMode(mode === 'modern' ? 'retro' : 'modern');
	}

	function markModeHintAsSeen() {
		if (!showModeHint) return;
		showModeHint = false;
		localStorage.setItem('modeHintSeen', '1');
	}

	function openRetroFromHint() {
		markModeHintAsSeen();
		switchMode('retro');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="mode-switcher">
	<button
		class="slider-switch"
		class:mobile-hidden={mode === 'retro' && isMobileViewport}
		class:attention={mode === 'modern' && showModeHint}
		class:is-retro={mode === 'retro'}
		onclick={toggleMode}
		title="Cambiar entre portafolio profesional y laboratorio retro"
		disabled={isTransitioning}
		aria-label="Cambiar entre portafolio principal y laboratorio retro"
	>
		<span class="slider-track">
			<span class="slider-thumb"></span>
		</span>
		<span class="slider-text">{mode === 'modern' ? 'Portafolio' : 'Lab retro'}</span>
	</button>

	{#if mode === 'modern' && showModeHint}
		<div class="mode-hint" role="status" aria-live="polite">
			<p>
				Este sitio tiene <strong>dos versiones</strong>: portafolio profesional y laboratorio
				Windows 98.
			</p>
			<div class="mode-hint-actions">
				<button class="mode-hint-cta" onclick={openRetroFromHint}>Probar Windows 98</button>
				<button class="mode-hint-dismiss" onclick={markModeHintAsSeen} aria-label="Cerrar aviso">
					Ahora no
				</button>
			</div>
		</div>
	{/if}
</div>

{#if mode === 'retro' && isMobileViewport}
	<div class="mobile-retro-nav">
		<div class="mobile-start-wrap">
			<button
				bind:this={mobileStartButtonEl}
				class="mobile-start-btn"
				onclick={toggleMobileStartMenu}
				aria-label="Abrir menú Inicio"
			>
				<img src="/icons/windows.png" alt="" aria-hidden="true" />
				<span>Start</span>
			</button>

			{#if mobileStartOpen}
				<div bind:this={mobileStartMenuEl} class="mobile-start-menu">
					{#each mobileStartItems as app}
						<button class="mobile-start-item" onclick={() => selectMobileStartApp(app.id)}>
							<img src={app.icon} alt="" aria-hidden="true" />
							<span>{app.label}</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<button class="mobile-home-slider" onclick={toggleMode} aria-label="Cambiar al portafolio principal">
			<span class="mobile-home-track">
				<span class="mobile-home-thumb"></span>
			</span>
		</button>

		<div class="mobile-clock-wrap" aria-label="Hora actual">
			<img src="/icons/clock.png" alt="" aria-hidden="true" />
			<span>{mobileClock}</span>
		</div>
	</div>
{/if}

{#if mode === 'modern'}
	<!-- MODO MODERNO -->
	<ModernLanding shouldAnimate={isFirstModernView} />
{:else}
	<!-- MODO RETRO (Windows 98) -->
	{#if RetroDesktop && RetroTaskbar}
		<div class="shell-root">
			<RetroDesktop bind:windows />
			<RetroTaskbar {tasks} {activeWindowId} on:taskclick={handleTaskClick} on:menuselect={handleMenuSelect} />
		</div>
	{:else}
		<div class="retro-loading" role="status" aria-live="polite">
			Cargando laboratorio retro...
		</div>
	{/if}
{/if}

<!-- Reveal Overlay - Revela el nuevo contenido con cortina -->
{#if isTransitioning}
	<div class="reveal-overlay">
		<div class="reveal-content">
			{#if mode === 'modern'}
				<!-- Revelar Retro debajo del escaneo -->
				{#if RetroDesktop && RetroTaskbar}
					<div class="shell-root">
						<RetroDesktop bind:windows />
						<RetroTaskbar {tasks} {activeWindowId} on:taskclick={handleTaskClick} on:menuselect={handleMenuSelect} />
					</div>
				{:else}
					<div class="retro-loading" role="status" aria-live="polite">
						Cargando laboratorio retro...
					</div>
				{/if}
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

	.retro-loading {
		min-height: 100vh;
		display: grid;
		place-items: center;
		background: #008080;
		color: #ffffff;
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0.02em;
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
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 10px;
	}

	.slider-switch.mobile-hidden {
		display: none;
	}

	.mobile-retro-nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 52px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 4px 6px;
		background: #c0c0c0;
		box-shadow: inset 0 1px 0 #fff;
		z-index: 2500;
		box-sizing: border-box;
	}

	.mobile-start-wrap {
		position: relative;
	}

	.mobile-start-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 40px;
		padding: 0 10px;
		border-top: 1px solid #ffffff;
		border-left: 1px solid #ffffff;
		border-right: 1px solid #363636;
		border-bottom: 1px solid #363636;
		background: #c0c0c0;
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 0.95rem;
		font-weight: 700;
	}

	.mobile-start-btn img {
		width: 18px;
		height: 18px;
	}

	.mobile-start-menu {
		position: absolute;
		left: 0;
		bottom: calc(100% + 6px);
		min-width: 190px;
		max-height: min(56vh, 320px);
		overflow: auto;
		padding: 4px;
		background: #c0c0c0;
		border-top: 2px solid #ffffff;
		border-left: 2px solid #ffffff;
		border-right: 2px solid #363636;
		border-bottom: 2px solid #363636;
		box-shadow: 2px 2px 0 #000;
		z-index: 2600;
	}

	.mobile-start-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 8px;
		border: 1px solid transparent;
		background: transparent;
		text-align: left;
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 0.88rem;
	}

	.mobile-start-item img {
		width: 18px;
		height: 18px;
	}

	.mobile-start-item:active,
	.mobile-start-item:hover {
		background: #000080;
		color: #fff;
	}

	.mobile-home-slider {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 0 10px;
		border-top: 1px solid #ffffff;
		border-left: 1px solid #ffffff;
		border-right: 1px solid #363636;
		border-bottom: 1px solid #363636;
		background: #c0c0c0;
	}

	.mobile-home-track {
		position: relative;
		width: 56px;
		height: 28px;
		border-radius: 999px;
		background: rgba(134, 239, 172, 0.25);
		box-shadow: inset 0 0 0 1px rgba(46, 133, 72, 0.5);
	}

	.mobile-home-thumb {
		position: absolute;
		top: 3px;
		left: 30px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: #86efac;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
	}

	.mobile-clock-wrap {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 40px;
		padding: 0 10px;
		border-top: 1px solid #ffffff;
		border-left: 1px solid #ffffff;
		border-right: 1px solid #363636;
		border-bottom: 1px solid #363636;
		background: #c0c0c0;
		font-size: 0.92rem;
		font-weight: 700;
	}

	.mobile-clock-wrap img {
		width: 16px;
		height: 16px;
	}

	.slider-switch {
		display: inline-flex;
		align-items: center;
		gap: 14px;
		padding: 10px 18px 10px 12px;
		border: 1px solid rgba(212, 175, 55, 0.45);
		border-radius: 999px;
		background: rgba(7, 8, 31, 0.88);
		color: #f2f2f2;
		font-size: 1.1rem;
		font-weight: 700;
		cursor: pointer;
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease,
			transform 0.25s ease;
		backdrop-filter: blur(10px);
	}

	.slider-switch:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.slider-switch:hover:not(:disabled) {
		border-color: #d4af37;
		box-shadow: 0 0 16px rgba(212, 175, 55, 0.35);
		transform: translateY(-1px);
	}

	.slider-switch.attention {
		animation: switchPulse 1.8s ease-in-out infinite;
	}

	.slider-track {
		position: relative;
		width: 68px;
		height: 36px;
		border-radius: 999px;
		background: rgba(212, 175, 55, 0.18);
		box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.4);
	}

	.slider-thumb {
		position: absolute;
		top: 4px;
		left: 4px;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #d4af37;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
		transition: transform 0.3s ease;
	}

	.slider-text {
		min-width: 76px;
		text-align: left;
		color: #d4af37;
	}

	.slider-switch.is-retro .slider-thumb {
		transform: translateX(32px);
	}

	.slider-switch.is-retro .slider-track {
		background: rgba(134, 239, 172, 0.22);
		box-shadow: inset 0 0 0 1px rgba(134, 239, 172, 0.45);
	}

	.slider-switch.is-retro .slider-thumb {
		background: #86efac;
	}

	.slider-switch.is-retro .slider-text {
		color: #86efac;
	}

	.mode-hint {
		max-width: 340px;
		padding: 12px;
		border-radius: 12px;
		border: 1px solid rgba(212, 175, 55, 0.45);
		background: rgba(8, 10, 34, 0.95);
		box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(8px);
	}

	.mode-hint p {
		margin: 0;
		font-size: 0.94rem;
		line-height: 1.45;
		color: #f2f2f2;
	}

	.mode-hint-actions {
		display: flex;
		gap: 8px;
		margin-top: 10px;
	}

	.mode-hint-cta,
	.mode-hint-dismiss {
		border: 1px solid rgba(212, 175, 55, 0.4);
		border-radius: 8px;
		padding: 7px 10px;
		font-size: 0.86rem;
		font-weight: 700;
		cursor: pointer;
	}

	.mode-hint-cta {
		background: #d4af37;
		color: #1a1a2e;
	}

	.mode-hint-dismiss {
		background: transparent;
		color: #f2f2f2;
	}

	.mode-hint-cta:hover,
	.mode-hint-dismiss:hover {
		transform: translateY(-1px);
	}

	@media (max-width: 860px) {
		.mode-switcher {
			top: 10px;
			right: 10px;
			max-width: calc(100vw - 20px);
		}

		.slider-switch {
			font-size: 1rem;
			padding-right: 14px;
		}
	}

	@media (max-width: 768px) {
		.mode-switcher {
			top: 8px;
			right: 8px;
			z-index: 2000;
			left: 8px;
			align-items: stretch;
		}

		.slider-switch {
			padding: 6px 10px;
			gap: 8px;
			font-size: 0.86rem;
			border-radius: 999px;
		}

		.slider-track {
			width: 48px;
			height: 26px;
		}

		.slider-thumb {
			top: 3px;
			left: 3px;
			width: 20px;
			height: 20px;
		}

		.slider-switch.is-retro .slider-thumb {
			transform: translateX(22px);
		}

		.slider-text {
			min-width: auto;
			font-size: 0.85rem;
		}

		.mode-hint {
			max-width: 100%;
		}

		.mode-hint-actions {
			flex-wrap: wrap;
		}

		.mobile-retro-nav {
			padding-bottom: max(4px, env(safe-area-inset-bottom));
			height: calc(52px + env(safe-area-inset-bottom));
		}
	}

	@keyframes switchPulse {
		0%,
		100% {
			box-shadow: 0 0 0 rgba(212, 175, 55, 0);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(212, 175, 55, 0.16);
		}
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

	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
