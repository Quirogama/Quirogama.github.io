<script>
	let {
		title = 'Untitled',
		width = 300,
		height = 200,
		z = 1,
		left = $bindable(40),
		top = $bindable(40),
		onclose = () => {},
		onminimize = () => {},
		onfocus = () => {},
		children
	} = $props();

	let dragging = $state(false);
	let startX = $state(0);
	let startY = $state(0);
	let origLeft = $state(0);
	let origTop = $state(0);

	function close() {
		onclose();
	}

	function minimize() {
		onminimize();
	}

	function onPointerDown(e) {
		// only start drag on title bar presses
		if (e.target.closest('.title-bar')) {
			dragging = true;
			startX = e.clientX;
			startY = e.clientY;
			origLeft = left;
			origTop = top;
			// capture pointer so we keep getting events
			e.target.setPointerCapture?.(e.pointerId);
			onfocus();
		}
	}

	function onPointerMove(e) {
		if (!dragging) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		left = Math.max(8, origLeft + dx);
		top = Math.max(8, origTop + dy);
	}

	function onPointerUp(e) {
		if (!dragging) return;
		dragging = false;
		e.target.releasePointerCapture?.(e.pointerId);
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
	/* Preservar saltos de línea del contenido de texto plano */
	.window-body {
		white-space: pre-wrap;
		/* permitir scroll interno cuando el contenido excede la altura */
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
	}
</style>
