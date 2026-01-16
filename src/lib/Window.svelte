<script>
	import { onMount, onDestroy } from 'svelte';

	let {
		title = 'Untitled',
		width = 300,
		height = 200,
		z = 1,
		left = $bindable(40),
		top = $bindable(40),
		isActive = false,
		onclose = () => {},
		onminimize = () => {},
		onfocus = () => {},
		onresize = () => {},
		onmove = () => {},
		children
	} = $props();

	let dragging = $state(false);
	let startX = $state(0);
	let startY = $state(0);
	let origLeft = $state(0);
	let origTop = $state(0);

	// Estado para el redimensionamiento de la ventana
	let resizing = $state(false);
	let resizeDir = $state(null); // Dirección: n, s, e, w, ne, nw, se, sw
	let rStartX = $state(0);
	let rStartY = $state(0);
	let rStartW = $state(0);
	let rStartH = $state(0);
	let rOrigLeft = $state(0);
	let rOrigTop = $state(0);
	const MIN_W = 200; // ancho mínimo de la ventana
	const MIN_H = 120; // alto mínimo de la ventana

	function close() {
		onclose();
	}

	function minimize() {
		onminimize();
	}

	// Manejo de teclado: ESC para cerrar ventana activa
	onMount(() => {
		function handleKeyDown(e) {
			if (e.key === 'Escape' && isActive) {
				e.preventDefault();
				close();
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	// Maneja el inicio del arrastre o redimensionamiento de la ventana
	function onPointerDown(e) {
		// Inicia arrastre si se presiona la barra de título
		if (e.target.closest('.title-bar')) {
			dragging = true;
			startX = e.clientX;
			startY = e.clientY;
			origLeft = left;
			origTop = top;
			e.target.setPointerCapture?.(e.pointerId);
			onfocus();
		}
		// Inicia redimensionamiento si se presiona una manija de resize
		const handle = e.target.closest('.resize-handle');
		if (handle) {
			resizing = true;
			resizeDir = handle.dataset.dir;
			rStartX = e.clientX;
			rStartY = e.clientY;
			rStartW = width;
			rStartH = height;
			rOrigLeft = left;
			rOrigTop = top;
			e.target.setPointerCapture?.(e.pointerId);
			onfocus();
		}
	}

	// Maneja el movimiento del puntero para arrastre o redimensionamiento
	function onPointerMove(e) {
		if (resizing) {
			// Calcula la diferencia de píxeles desde donde comenzó el redimensionamiento
			const dx = e.clientX - rStartX;
			const dy = e.clientY - rStartY;
			let newW = rStartW;
			let newH = rStartH;
			let newL = rOrigLeft;
			let newT = rOrigTop;
			// Redimensiona desde la derecha
			if (resizeDir.includes('e')) {
				newW = Math.max(MIN_W, Math.min(window.innerWidth - 16, rStartW + dx));
			}
			// Redimensiona desde abajo
			if (resizeDir.includes('s')) {
				newH = Math.max(MIN_H, Math.min(window.innerHeight - 80, rStartH + dy));
			}
			// Redimensiona desde la izquierda
			if (resizeDir.includes('w')) {
				newW = Math.max(MIN_W, Math.min(window.innerWidth - 16, rStartW - dx));
				newL = Math.max(8, rOrigLeft + dx);
				if (rStartW - dx < MIN_W) {
					newL = rOrigLeft + (rStartW - MIN_W);
				}
			}
			// Redimensiona desde arriba
			if (resizeDir.includes('n')) {
				newH = Math.max(MIN_H, Math.min(window.innerHeight - 80, rStartH - dy));
				newT = Math.max(8, rOrigTop + dy);
				if (rStartH - dy < MIN_H) {
					newT = rOrigTop + (rStartH - MIN_H);
				}
			}
			width = Math.round(newW);
			height = Math.round(newH);
			left = Math.round(newL);
			top = Math.round(newT);
			return;
		}
		if (!dragging) return;
		// Calcula la diferencia de píxeles desde donde comenzó el arrastre
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		left = Math.max(8, origLeft + dx);
		top = Math.max(8, origTop + dy);
	}

	// Maneja el final del arrastre o redimensionamiento
	function onPointerUp(e) {
		if (resizing) {
			resizing = false;
			resizeDir = null;
			e.target.releasePointerCapture?.(e.pointerId);
			// Notifica al padre los nuevos tamaño y posición
			onresize({ width, height, left, top });
			return;
		}
		if (!dragging) return;
		dragging = false;
		e.target.releasePointerCapture?.(e.pointerId);
		// Notifica al padre la nueva posición
		onmove({ width, height, left, top });
	}
</script>

<div
	class="window"
	role="dialog"
	tabindex="0"
	style="width: {width}px; height: {height}px; z-index: {z}; left: {left}px; top: {top}px;"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onclick={() => onfocus()}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onfocus();
		}
	}}
>
	<!-- Manijas de redimensionamiento en los 8 lados y esquinas -->
	<div class="resize-handle handle-n" data-dir="n" onpointerdown={onPointerDown} aria-hidden="true"></div>
	<div class="resize-handle handle-e" data-dir="e" onpointerdown={onPointerDown} aria-hidden="true"></div>
	<div class="resize-handle handle-s" data-dir="s" onpointerdown={onPointerDown} aria-hidden="true"></div>
		<div class="resize-handle handle-w" data-dir="w" onpointerdown={onPointerDown} aria-hidden="true"></div>
		<div class="resize-handle handle-ne" data-dir="ne" onpointerdown={onPointerDown} aria-hidden="true"></div>
		<div class="resize-handle handle-nw" data-dir="nw" onpointerdown={onPointerDown} aria-hidden="true"></div>
		<div class="resize-handle handle-se" data-dir="se" onpointerdown={onPointerDown} aria-hidden="true"></div>
		<div class="resize-handle handle-sw" data-dir="sw" onpointerdown={onPointerDown} aria-hidden="true"></div>
	<div class="title-bar" style="touch-action: none;">
		<div class="title-bar-text">{title}</div>
		<div class="title-bar-controls">
			<button 
				aria-label="Minimize" 
				onclick={(e) => {
					e.stopPropagation();
					minimize();
				}}
			></button>
			<button aria-label="Maximize" disabled></button>
			<button 
				aria-label="Close" 
				onclick={(e) => {
					e.stopPropagation();
					close();
				}}
			></button>
		</div>
	</div>
	<div class="window-body">
		{@render children?.()}
	</div>
</div>

<style>
	/* minimal tweaks — 98.css provides the core look */
	.window {
		position: absolute;
		left: 40px;
		top: 40px;
		display: flex;
		flex-direction: column;
	}

	/* Keep windows inside the viewport and avoid overflow on small screens */
	.window {
	  max-width: calc(100vw - 40px);
	  max-height: calc(100vh - 80px); /* leave room for taskbar */
	  box-sizing: border-box;
	}
	/* Preservar saltos de línea del contenido de texto plano */
	.window-body {
		white-space: pre-wrap;
		/* permitir scroll interno cuando el contenido excede la altura */
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
	}

	/* Resize handles: invisible strips covering full edges so user can resize from any point along the border */
	.resize-handle {
		position: absolute;
		z-index: 60;
		background: transparent;
		pointer-events: auto;
	}
	/* Top/bottom: full-width thin strip */
	.resize-handle.handle-n {
		top: -8px;
		left: 0;
		right: 0;
		height: 16px;
		cursor: ns-resize;
	}
	.resize-handle.handle-s {
		bottom: -8px;
		left: 0;
		right: 0;
		height: 16px;
		cursor: ns-resize;
	}
	/* Left/right: full-height thin strip */
	.resize-handle.handle-e {
		right: -8px;
		top: 0;
		bottom: 0;
		width: 16px;
		cursor: ew-resize;
	}
	.resize-handle.handle-w {
		left: -8px;
		top: 0;
		bottom: 0;
		width: 16px;
		cursor: ew-resize;
	}
	/* Corners: larger square regions to make diagonal resizing easy */
	.resize-handle.handle-ne { right: -12px; top: -12px; width: 24px; height: 24px; cursor: nesw-resize; }
	.resize-handle.handle-nw { left: -12px; top: -12px; width: 24px; height: 24px; cursor: nwse-resize; }
	.resize-handle.handle-se { right: -12px; bottom: -12px; width: 24px; height: 24px; cursor: nwse-resize; }
	.resize-handle.handle-sw { left: -12px; bottom: -12px; width: 24px; height: 24px; cursor: nesw-resize; }
</style>
