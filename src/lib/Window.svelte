<script>
	import { createEventDispatcher } from 'svelte';
	export let title = 'Untitled';
	export let width = 300;
	export let height = 200;
	export let z = 1;
	export let left = 40;
	export let top = 40;
	const dispatch = createEventDispatcher();

	let dragging = false;
	let startX = 0;
	let startY = 0;
	let origLeft = 0;
	let origTop = 0;

	function close() {
		dispatch('close');
	}

	function minimize() {
		dispatch('minimize');
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
			dispatch('focus');
		}
	}

	function onPointerMove(e) {
		if (!dragging) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		left = Math.max(8, origLeft + dx);
		top = Math.max(8, origTop + dy);
		dispatch('move', { left, top });
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
	on:pointerdown={onPointerDown}
	on:pointermove={onPointerMove}
	on:pointerup={onPointerUp}
	on:click={() => dispatch('focus')}
	on:keydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			dispatch('focus');
		}
	}}
>
	<div class="title-bar" style="touch-action: none;">
		<div class="title-bar-text">{title}</div>
		<div class="title-bar-controls">
			<button aria-label="Minimize" on:click={minimize}></button>
			<button aria-label="Maximize" disabled></button>
			<button aria-label="Close" on:click={close}></button>
		</div>
	</div>
	<div class="window-body">
		<slot />
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
