<script>
	let {
		icon = '/icons/cv.svg',
		label = 'Item',
		x = 16,
		y = 16,
		selected = false,
		onopen = () => {},
		onselect = () => {}
	} = $props();

	let clickCount = $state(0);
	let clickTimer;

	function handleClick() {
		clickCount++;
		clearTimeout(clickTimer);
		if (clickCount === 1) {
			onselect();
		}
		clickTimer = setTimeout(() => (clickCount = 0), 400);
		if (clickCount === 2) {
			onopen();
			clickCount = 0;
		}
	}

	// Teclado: abrir con 1 sola pulsación de ENTER/SPACE (más intuitivo)
	function handleKeyDown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onopen();
		}
	}
</script>

<div
	class="desktop-icon {selected ? 'selected' : ''}"
	style="left:{x}px; top:{y}px"
	onclick={handleClick}
	onkeydown={handleKeyDown}
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
		width: 120px;
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
		font-size: 14px;
		color: #ffffff;
		word-wrap: break-word;
		line-height: 1.1;
		display: inline-block;
		margin-top: 4px;
		padding: 2px 4px;
	}
	.desktop-icon.selected .label {
		background: #000080; /* Win98 blue */
		color: #fff;
	}
	.desktop-icon.selected img {
		outline: 1px dotted #ffffff;
		outline-offset: 2px;
	}
</style>

