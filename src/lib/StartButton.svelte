<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	let { label = 'Start', menuItems = [] } = $props();
	const dispatch = createEventDispatcher();

	let open = $state(false);
	let btnEl;
	let menuEl = $state(null);
	let itemsRefs = $state([]);
	let menuTop = $state(0);
	let menuLeft = $state(0);

	function toggle() {
		open = !open;
		if (open) {
			dispatch('open');
			// wait for menu to render then position and focus
			requestAnimationFrame(() => {
				positionMenu();
				focusFirst();
			});
		} else {
			dispatch('close');
			btnEl.focus();
		}
	}

	function openMenu() {
		if (!open) toggle();
	}

	function closeMenu() {
		if (open) {
			open = false;
			dispatch('close');
			btnEl.focus();
		}
	}

	function positionMenu() {
		if (!btnEl || !menuEl) return;
		const btnRect = btnEl.getBoundingClientRect();
		const menuRect = menuEl.getBoundingClientRect();
		let top = Math.max(8, btnRect.top - menuRect.height - 4);
		let left = btnRect.left;
		if (left + menuRect.width > window.innerWidth - 8)
			left = window.innerWidth - menuRect.width - 8;
		menuTop = top;
		menuLeft = left;
	}

	function focusFirst() {
		if (itemsRefs[0]) itemsRefs[0].focus();
	}

	function onButtonKeydown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			openMenu();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			openMenu();
			requestAnimationFrame(() => itemsRefs[menuItems.length - 1]?.focus());
		}
	}

	function onMenuKeydown(e, idx) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const ni = (idx + 1) % menuItems.length;
			itemsRefs[ni]?.focus();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const ni = (idx - 1 + menuItems.length) % menuItems.length;
			itemsRefs[ni]?.focus();
		} else if (e.key === 'Home') {
			e.preventDefault();
			itemsRefs[0]?.focus();
		} else if (e.key === 'End') {
			e.preventDefault();
			itemsRefs[menuItems.length - 1]?.focus();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			closeMenu();
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			selectItem(idx);
		}
	}

	function selectItem(idx) {
		const item = menuItems[idx];
		dispatch('select', item);
		if (item && typeof item.action === 'function') item.action();
		closeMenu();
	}

	function onDocumentClick(e) {
		if (!btnEl.contains(e.target) && !menuEl?.contains(e.target)) closeMenu();
	}

	// action to register menu item nodes
	function register(node, idx) {
		itemsRefs[idx] = node;
		return {
			destroy() {
				itemsRefs[idx] = null;
			}
		};
	}

	onMount(() => {
		document.addEventListener('click', onDocumentClick);
		window.addEventListener('resize', positionMenu);
	});

	onDestroy(() => {
		document.removeEventListener('click', onDocumentClick);
		window.removeEventListener('resize', positionMenu);
	});
</script>

<div class="start-wrapper">
	<button
		class="start-button"
		bind:this={btnEl}
		aria-haspopup="true"
		aria-expanded={open}
		onclick={toggle}
		onkeydown={onButtonKeydown}
	>
		<!-- small classic-style icon -->
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			class="start-icon"
			aria-hidden="true"
			focusable="false"
		>
			<rect x="1" y="1" width="14" height="14" fill="#c0c0c0" stroke="#000" stroke-width="0.5" />
			<rect x="3" y="3" width="4" height="4" fill="#008080" />
			<rect x="9" y="3" width="4" height="4" fill="#004c4c" />
		</svg>
		<span class="start-label">{label}</span>
	</button>

	{#if open}
		<ul
			class="start-menu"
			bind:this={menuEl}
			role="menu"
			aria-label="Start menu"
			style="position:fixed; left: {menuLeft}px; top: {menuTop}px;"
		>
			{#each menuItems as item, i}
				<li
					role="menuitem"
					tabindex="-1"
					use:register={i}
					onkeydown={(e) => onMenuKeydown(e, i)}
					onclick={() => selectItem(i)}
				>
					{item.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.start-wrapper {
		position: relative;
		display: inline-block;
	}
	.start-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		background: linear-gradient(#efefef, #dedede);
		border-top: 2px solid #ffffff;
		border-left: 2px solid #ffffff;
		border-right: 2px solid #404040;
		border-bottom: 2px solid #404040;
		box-shadow: inset -1px -1px 0 rgba(0, 0, 0, 0.06);
		cursor: pointer;
		font-weight: bold;
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
	}
	.start-button[aria-expanded='true'] {
		/* pressed look */
		border-top: 2px solid #404040;
		border-left: 2px solid #404040;
		border-right: 2px solid #ffffff;
		border-bottom: 2px solid #ffffff;
		box-shadow: none;
	}
	.start-icon {
		width: 16px;
		height: 16px;
	}
	.start-label {
		font-size: 14px;
	}

	.start-menu {
		min-width: 220px;
		background: var(--window-face, #e0e0e0);
		border-top: 2px solid #ffffff;
		border-left: 2px solid #ffffff;
		border-right: 2px solid #404040;
		border-bottom: 2px solid #404040;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.12);
		padding: 6px 4px;
		list-style: none;
		margin: 0;
	}
	.start-menu li {
		padding: 6px 10px;
		cursor: default;
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
	}
	.start-menu li:focus,
	.start-menu li:hover {
		outline: none;
		background: linear-gradient(#3160a8, #1f4f8b);
		color: white;
	}
</style>

