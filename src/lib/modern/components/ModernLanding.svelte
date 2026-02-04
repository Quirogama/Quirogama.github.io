<script>
	import { onMount } from 'svelte';
	import AnimatedBackground from './AnimatedBackground.svelte';
	import Hero from './Hero.svelte';
	import About from './About.svelte';
	import Experience from './Experience.svelte';
	import Projects from './Projects.svelte';
	import Education from './Education.svelte';
	import Contact from './Contact.svelte';
	import '../styles/theme.css';

	let scrollY = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		// Mouse tracking para efectos parallax
		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<svelte:window bind:scrollY />

<AnimatedBackground {mouseX} {mouseY} />

<div class="modern-container">
	<Hero />
	<About />
	<Education />
	<Experience />
	<Projects />
	<Contact />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(:root) {
		--primary: #D4AF37;
		--primary-dark: #B8941F;
		--primary-light: #F0D77C;
		--secondary: #1a1a2e;
		--secondary-light: #2d2d44;
		--accent: #ffffff;
		--text: #e8e8e8;
		--text-dim: #a0a0a0;
		--bg: #0f0f1e;
		--bg-elevated: #1a1a2e;
		--glass-bg: rgba(26, 26, 46, 0.6);
		--glass-border: rgba(212, 175, 55, 0.2);
	}

	.modern-container {
		background: var(--bg);
		color: var(--text);
		min-height: 100vh;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
		line-height: 1.6;
		position: relative;
		overflow-x: hidden;
	}
</style>
