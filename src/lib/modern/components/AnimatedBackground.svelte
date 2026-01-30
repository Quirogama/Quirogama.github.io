<script>
	let { mouseX = 0, mouseY = 0 } = $props();
</script>

<div class="bg-animation">
	<div class="gradient-orb orb-1" style="transform: translate({mouseX * 0.02}px, {mouseY * 0.02}px)"></div>
	<div class="gradient-orb orb-2" style="transform: translate({mouseX * -0.015}px, {mouseY * 0.015}px)"></div>
	<div class="gradient-orb orb-3" style="transform: translate({mouseX * 0.01}px, {mouseY * -0.01}px)"></div>
	<div class="noise-overlay"></div>
</div>

<style>
	.bg-animation {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
		opacity: 0.3;
		animation: float 20s ease-in-out infinite;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
		top: -200px;
		left: -200px;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, #6366f1 0%, transparent 70%);
		bottom: -150px;
		right: -150px;
		animation-delay: -7s;
	}

	.orb-3 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
		top: 50%;
		left: 50%;
		animation-delay: -14s;
	}

	.noise-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		opacity: 0.03;
		pointer-events: none;
	}

	@keyframes float {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}
</style>
