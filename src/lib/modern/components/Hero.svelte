<script>
	import { onMount } from 'svelte';
	import { PERSONAL_INFO, SOCIAL_LINKS } from '$lib/config/portfolioData.js';

	let titleText = $state('');
	let isScrambling = $state(true);

	const fullTitle = PERSONAL_INFO.name;
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	// Text scramble effect
	function scrambleText() {
		let iteration = 0;
		const interval = setInterval(() => {
			titleText = fullTitle
				.split('')
				.map((letter, index) => {
					if (index < iteration) {
						return fullTitle[index];
					}
					return chars[Math.floor(Math.random() * chars.length)];
				})
				.join('');

			if (iteration >= fullTitle.length) {
				clearInterval(interval);
				isScrambling = false;
			}

			iteration += 1 / 3;
		}, 30);
	}

	// Magnetic effect para botones
	function handleMagneticMove(e) {
		const btn = e.currentTarget;
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
	}

	function handleMagneticLeave(e) {
		e.currentTarget.style.transform = 'translate(0, 0)';
	}

	onMount(() => {
		scrambleText();
	});
</script>

<section class="hero" data-reveal id="hero">
	<div class="hero-content">
		<div class="hero-main">
			<div class="hero-header">
				<div class="hero-image-wrapper hero-avatar">
					<img src="/icons/andres1.jpeg" alt={PERSONAL_INFO.name} class="hero-image" />
				</div>
				<div class="hero-headings">
					<h1 class="hero-title">
						{titleText}
						<span class="accent-dot">.</span>
					</h1>
					<p class="hero-subtitle">{PERSONAL_INFO.title}</p>
				</div>
			</div>
			<p class="hero-description">
				Desarrollador <span class="highlight">full‑stack</span> de Colombia con experiencia en <span class="highlight">backend</span>, <span class="highlight">frontend</span> y despliegue.
				He construido aplicaciones con <span class="highlight">Java/Spring Boot</span>, <span class="highlight">Angular</span> y <span class="highlight">Svelte</span>, integrando APIs y bases de datos.
				Me enfoco en crear soluciones completas con buenas prácticas de ingeniería.
			</p>
			<div class="cta-buttons">
				<a href="#projects" class="btn btn-primary"
					onmouseenter={handleMagneticMove}
					onmousemove={handleMagneticMove}
					onmouseleave={handleMagneticLeave}>
					Ver proyectos
				</a>
				<a href="#contact" class="btn btn-secondary"
					onmouseenter={handleMagneticMove}
					onmousemove={handleMagneticMove}
					onmouseleave={handleMagneticLeave}>
					Contactarme
				</a>
			</div>
			<div class="hero-social" aria-label="Redes sociales">
				<a href={SOCIAL_LINKS.github} target="_blank" rel="noopener" class="social-link github" title="GitHub" aria-label="GitHub">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
					</svg>
				</a>
				<a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener" class="social-link linkedin" title="LinkedIn" aria-label="LinkedIn">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.237-1.668-2.237-.909 0-1.45.613-1.687 1.207-.087.216-.11.517-.11.819v5.78h-3.554s.047-9.38 0-10.354h3.554v1.468c.457-.704 1.274-1.707 3.102-1.707 2.267 0 3.967 1.482 3.967 4.667v5.926zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.755 1.938 1.71 0 .949-.751 1.707-1.981 1.707zm1.946 11.019H3.39V8.598h3.893v11.854zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
					</svg>
				</a>
				<a href="mailto:{PERSONAL_INFO.email}" class="social-link email" title="Email" aria-label="Email">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="2" y="4" width="20" height="16" rx="2"></rect>
						<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		display: flex;
		align-items: center;
		padding: clamp(80px, 10vh, 140px) 40px clamp(140px, 16vh, 220px);
		position: relative;
		z-index: 1;
		animation: fadeInUp 0.8s ease-out;
		flex-direction: column;
		gap: 80px;
		background: radial-gradient(1200px 600px at 10% 10%, rgba(212, 175, 55, 0.12), transparent 60%);
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 32px;
		align-items: flex-start;
		width: 100%;
	}

	.hero-main {
		animation: slideInLeft 0.8s ease-out;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.hero-header {
		display: flex;
		gap: var(--space-lg);
		align-items: center;
	}

	.hero-headings {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.hero-title {
		font-size: clamp(2.8rem, 6vw, var(--text-6xl));
		font-weight: var(--font-weight-extrabold);
		margin: 0;
		letter-spacing: -0.03em;
		line-height: var(--line-height-tight);
		background: linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.accent-dot {
		color: var(--primary);
		animation: pulse 2s infinite;
		-webkit-text-fill-color: var(--primary);
	}

	.hero-subtitle {
		font-size: var(--text-2xl);
		color: var(--text);
		margin: 0;
		font-weight: var(--font-weight-bold);
		letter-spacing: -0.01em;
		text-shadow: 0 0 16px rgba(212, 175, 55, 0.2);
	}

	.hero-description {
		font-size: 1.5rem;
		color: var(--text);
		margin: 0;
		max-width: 620px;
		line-height: 1.5;
		margin-top: var(--space-xs);
	}

	.highlight {
		color: var(--primary);
		font-weight: var(--font-weight-bold);
		text-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
	}

	.cta-buttons {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
		animation: slideInUp 1s ease-out 0.2s both;
		margin-top: var(--space-lg);
	}

	.btn {
		padding: calc(var(--space-md) + 2px) calc(var(--space-lg) + 6px);
		border-radius: var(--radius-md);
		font-size: 1.5rem;
		font-weight: var(--font-weight-semibold);
		text-decoration: none;
		transition: all var(--transition-base);
		display: inline-block;
		border: 2px solid transparent;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.btn::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		transform: translate(-50%, -50%);
		transition: width var(--transition-slow), height var(--transition-slow);
	}

	.btn:hover::before {
		width: 300px;
		height: 300px;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
		color: var(--secondary);
		box-shadow: 0 8px 28px rgba(212, 175, 55, 0.35);
	}

	.btn-primary:hover {
		box-shadow: 0 12px 40px rgba(212, 175, 55, 0.45);
		transform: translateY(-4px);
	}

	.btn-secondary {
		background: transparent;
		color: var(--primary);
		border-color: var(--primary);
	}

	.btn:focus-visible {
		outline: 3px solid rgba(212, 175, 55, 0.45);
		outline-offset: 3px;
	}

	.btn-secondary:hover {
		background: var(--primary);
		color: var(--secondary);
		transform: translateY(-4px);
		box-shadow: 0 8px 28px rgba(212, 175, 55, 0.35);
	}

	.hero-social {
		display: flex;
		gap: 16px;
		justify-content: flex-start;
		flex-wrap: wrap;
		animation: slideInUp 0.8s ease-out 0.2s both;
		opacity: 0.9;
	}

	.hero-image-wrapper {
		position: relative;
		width: 100%;
		max-width: 220px;
		aspect-ratio: 1;
	}

	.hero-avatar {
		flex: 0 0 auto;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 16px;
		box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
		animation: imageReveal 0.8s ease-out;
		border: 2px solid var(--glass-border);
	}

	.hero-image-wrapper::before {
		content: '';
		position: absolute;
		inset: -4px;
		border-radius: 16px;
		background: linear-gradient(135deg, var(--primary), var(--primary-dark));
		z-index: -1;
		opacity: 0.4;
		animation: glowPulse 3s ease-in-out infinite;
	}

	.social-link {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		color: var(--primary);
		transition: all 0.3s ease;
		border: 2px solid var(--glass-border);
	}

	.social-link:hover {
		background: var(--primary);
		color: var(--secondary);
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
		border-color: var(--primary);
	}


	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	@keyframes imageReveal {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes glowPulse {
		0%, 100% {
			opacity: 0.4;
		}
		50% {
			opacity: 0.6;
		}
	}

	@media (max-width: 1200px) {
		.hero {
			padding: clamp(70px, 9vh, 120px) 32px clamp(120px, 14vh, 180px);
			gap: 56px;
		}

		.hero-content {
			max-width: 1080px;
			gap: 28px;
		}

		.hero-title {
			font-size: clamp(2.5rem, 5.2vw, 3.6rem);
		}

		.hero-subtitle {
			font-size: 1.35rem;
		}

		.hero-description {
			font-size: 1.4rem;
			max-width: 580px;
		}

		.hero-image-wrapper {
			max-width: 200px;
		}

		.btn {
			font-size: 1.4rem;
		}

		.social-link {
			width: 44px;
			height: 44px;
		}
	}

	@media (max-width: 768px) {
		.hero-content {
			gap: 28px;
		}

		.hero {
			padding: 72px 20px;
			gap: 32px;
		}

		.hero-title {
			font-size: 2.4rem;
		}

		.hero-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.hero-image-wrapper {
			max-width: 160px;
		}

		.cta-buttons {
			flex-direction: column;
		}

		.btn {
			width: 100%;
			text-align: center;
		}
	}
</style>
