<script>
	import { createEventDispatcher } from 'svelte';
	export let icon = '/icons/cv.svg';
	export let label = 'Item';
	export let x = 16;
	export let y = 16;
	const dispatch = createEventDispatcher();

	let clickCount = 0;
	let clickTimer;

	function handleClick() {
		clickCount++;
		clearTimeout(clickTimer);
		clickTimer = setTimeout(() => (clickCount = 0), 400);
		if (clickCount === 2) {
			dispatch('open');
			clickCount = 0;
		}
	}
</script>

<div
	class="desktop-icon"
	style="left:{x}px; top:{y}px"
	on:click={handleClick}
	on:keydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	}}
	role="button"
	tabindex="0"
	aria-label={label}
>
	<img src={icon} alt={label} width="48" height="48" />
	<div class="label">{label}</div>
</div>

<style>
	.desktop-icon {
		position: absolute;
		width: 140px;
		text-align: center;
		cursor: default;
		user-select: none;
		padding-top: 4px;
	}
	.desktop-icon img {
		display: block;
		margin: 0 auto;
	}
	.desktop-icon .label {
		font-size: 22px;
		color: #ffffff;
		word-wrap: break-word;
		line-height: 1.1;
	}
</style>
