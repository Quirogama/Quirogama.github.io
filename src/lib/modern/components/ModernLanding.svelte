<script>
	import { onMount } from 'svelte';
	import { PERSONAL_INFO, SOCIAL_LINKS, SKILLS_FLAT, PROJECTS, EXPERIENCES, EDUCATION, PROFESSIONAL_INTERESTS } from '$lib/config/portfolioData.js';

	let scrollY = $state(0);
	let revealedElements = $state(new Set());

	// Observer para animaciones de reveal al scroll
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					revealedElements.add(entry.target.id);
					revealedElements = revealedElements;
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('[data-reveal]').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});

	function isRevealed(id) {
		return revealedElements.has(id);
	}
</script>

<svelte:window bind:scrollY />

<div class="modern-container">
	<!-- HERO SECTION -->
	<section class="hero" data-reveal id="hero">
		<div class="hero-content">
			<div class="hero-text">
				<h1 class="hero-title">
					{PERSONAL_INFO.name}
					<span class="accent-dot">.</span>
				</h1>
				<p class="hero-subtitle">{PERSONAL_INFO.title}</p>
				<p class="hero-description">
					Desarrollador <span class="highlight">fullstack</span> de Colombia con experiencia en <span class="highlight">automatización de datos</span> y <span class="highlight">análisis</span>. 
					4 meses en Pontificia Universidad Javeriana trabajando en <span class="highlight">ETL</span>, dashboards y soluciones web. 
					Resuelvo problemas complejos combinando <span class="highlight">frontend interactivo</span> con <span class="highlight">lógica de datos</span> robusta.
				</p>
				<div class="cta-buttons">
					<a href="#projects" class="btn btn-primary">Ver Proyectos</a>
					<a href="#contact" class="btn btn-secondary">Contacto</a>
				</div>
			</div>
			<div class="hero-image-section">
				<div class="hero-image-wrapper">
					<img src="/icons/andres1.jpeg" alt={PERSONAL_INFO.name} class="hero-image" />
				</div>
				<div class="hero-social">
					<a href={SOCIAL_LINKS.github} target="_blank" rel="noopener" class="social-link github" title="GitHub">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
						</svg>
					</a>
					<a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener" class="social-link linkedin" title="LinkedIn">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.237-1.668-2.237-.909 0-1.45.613-1.687 1.207-.087.216-.11.517-.11.819v5.78h-3.554s.047-9.38 0-10.354h3.554v1.468c.457-.704 1.274-1.707 3.102-1.707 2.267 0 3.967 1.482 3.967 4.667v5.926zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.755 1.938 1.71 0 .949-.751 1.707-1.981 1.707zm1.946 11.019H3.39V8.598h3.893v11.854zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
						</svg>
					</a>
					<a href="mailto:{PERSONAL_INFO.email}" class="social-link email" title="Email">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="2" y="4" width="20" height="16" rx="2"></rect>
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ABOUT SECTION -->
	<section class="about" data-reveal id="about">
		<div class="section-content">
			<h2 class="section-title">Sobre Mí</h2>
			<div class="about-grid">
				<div class="about-text">
					<p>{PERSONAL_INFO.summary}</p>
					<p>Especializado en <strong>{PROFESSIONAL_INTERESTS.focus}</strong> con experiencia en:</p>
				</div>
				<div class="skills-grid">
					{#each SKILLS_FLAT as skill}
						<div class="skill-tag">{skill}</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- EXPERIENCE SECTION -->
	<section class="experience" data-reveal id="experience">
		<div class="section-content">
			<h2 class="section-title">Experiencia</h2>
			<div class="timeline">
				{#each EXPERIENCES as exp, idx (exp.id)}
					<div class="timeline-item" style="--item-index: {idx}">
						<div class="timeline-marker">
							<div class="timeline-dot"></div>
						</div>
						<div class="timeline-content">
							<div class="timeline-year">2025</div>
							<div class="timeline-card">
								<h3 class="timeline-position">{exp.position}</h3>
								<p class="timeline-company">{exp.company}</p>
								<p class="timeline-period">{exp.dates}</p>
								<p class="timeline-description">{exp.description}</p>
								<div class="timeline-tech">
									{#each exp.technologies as tech}
										<span class="timeline-tech-badge">{tech}</span>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- PROJECTS SECTION -->
	<section class="projects" data-reveal id="projects">
		<div class="section-content">
			<h2 class="section-title">Proyectos Destacados</h2>
			<div class="projects-grid">
				{#each PROJECTS as project (project.id)}
					<div class="project-card">
						<div class="project-header">
							<h3 class="project-title">{project.title}</h3>
						</div>
						<div class="project-problem">
							<h4>Problema</h4>
							<p>{project.problem}</p>
						</div>
						<div class="project-solution">
							<h4>Solución</h4>
							<p>{project.solution}</p>
						</div>
						<div class="project-impact">
							<h4>Impacto</h4>
							<p>{project.impact}</p>
						</div>
						<div class="project-stack">
							{#each project.stack as tech}
								<span class="stack-tag">{tech}</span>
							{/each}
						</div>
						{#if project.links.length > 0}
							<div class="project-links">
								{#each project.links as link}
									<a href={link.url} target="_blank" rel="noopener" class="project-link">
										{link.label}
										<span class="arrow">→</span>
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- EDUCATION SECTION -->
	<section class="education" data-reveal id="education">
		<div class="section-content">
			<h2 class="section-title">Educación</h2>
			<div class="education-list">
				{#each EDUCATION as edu (edu.degree)}
					<div class="education-item">
						<div class="edu-header">
							<h3 class="edu-degree">{edu.degree}</h3>
							<span class="edu-period">{edu.period}</span>
						</div>
						<p class="edu-institution">{edu.institution}</p>
						<p class="edu-details">{edu.details}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CONTACT SECTION -->
	<section class="contact" data-reveal id="contact">
		<div class="section-content">
			<h2 class="section-title">Contacto</h2>
			<div class="contact-info">
				<p>Me interesa participar en proyectos de {PROFESSIONAL_INTERESTS.roles.join(', ')}.</p>
				<div class="contact-links">
					<a href={SOCIAL_LINKS.github} target="_blank" rel="noopener" class="contact-link">GitHub</a>
					<a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener" class="contact-link">LinkedIn</a>
					<a href="mailto:{PERSONAL_INFO.email}" class="contact-link">{PERSONAL_INFO.email}</a>
				</div>
			</div>
		</div>
	</section>

	<!-- FOOTER -->
	<footer class="footer">
		<p>© 2025 {PERSONAL_INFO.name}. Diseño & código hecho con ❤️</p>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	.modern-container {
		background: #ffffff;
		color: #1a1a1a;
		min-height: 100vh;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
		line-height: 1.6;
	}

	/* ─────────────────────────────────────── HERO ─────────────────────────────────────── */
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 80px 40px;
		background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
		animation: fadeInUp 0.8s ease-out;
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: center;
		width: 100%;
	}

	.hero-text {
		animation: slideInLeft 0.8s ease-out;
	}

	.hero-title {
		font-size: clamp(3.5rem, 10vw, 5.5rem);
		font-weight: 800;
		margin: 0 0 15px 0;
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.accent-dot {
		color: #2563eb;
		animation: pulse 2s infinite;
	}

	.hero-subtitle {
		font-size: 1.75rem;
		color: #2563eb;
		margin: 0 0 25px 0;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.hero-description {
		font-size: 1.4rem;
		color: #475569;
		margin: 0 0 30px 0;
		max-width: 550px;
		line-height: 1.9;
	}

	.highlight {
		color: #2563eb;
		font-weight: 700;
	}

	.cta-buttons {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		animation: slideInUp 1s ease-out 0.2s both;
	}

	.btn {
		padding: 14px 32px;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: inline-block;
		border: 2px solid transparent;
		cursor: pointer;
	}

	.btn-primary {
		background: #2563eb;
		color: white;
	}

	.btn-primary:hover {
		background: #1d4ed8;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
	}

	.btn-secondary {
		background: transparent;
		color: #1a1a1a;
		border-color: #1a1a1a;
	}

	.btn-secondary:hover {
		background: #1a1a1a;
		color: white;
		transform: translateY(-2px);
	}

	.hero-social {
		display: flex;
		gap: 24px;
		justify-content: center;
		flex-wrap: wrap;
		animation: slideInUp 0.8s ease-out 0.2s both;
	}

	.hero-image-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		animation: slideInRight 0.8s ease-out;
	}

	.hero-image-wrapper {
		position: relative;
		width: 100%;
		max-width: 400px;
		aspect-ratio: 1;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 16px;
		box-shadow: 0 20px 60px rgba(37, 99, 235, 0.2);
		animation: imageReveal 0.8s ease-out;
	}

	.hero-image-wrapper::before {
		content: '';
		position: absolute;
		inset: -4px;
		border-radius: 16px;
		background: linear-gradient(135deg, #2563eb, #1e40af);
		z-index: -1;
		opacity: 0.2;
		animation: glowPulse 3s ease-in-out infinite;
	}

	.social-link {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: #e2e8f0;
		color: #1a1a1a;
		transition: all 0.3s ease;
		border: 2px solid transparent;
	}

	.social-link:hover {
		background: #2563eb;
		color: white;
		transform: translateY(-4px);
		box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
	}

	/* ─────────────────────────────────────── SECTIONS ─────────────────────────────────────── */
	section {
		padding: 100px 40px;
		animation: fadeIn 0.6s ease-out;
	}

	.section-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-title {
		font-size: clamp(2.5rem, 6vw, 3.5rem);
		font-weight: 700;
		margin: 0 0 60px 0;
		letter-spacing: -0.01em;
		position: relative;
		display: inline-block;
	}

	.section-title::after {
		content: '';
		position: absolute;
		bottom: -12px;
		left: 0;
		width: 60px;
		height: 4px;
		background: #2563eb;
		border-radius: 2px;
	}

	/* ─────────────────────────────────────── ABOUT ─────────────────────────────────────── */
	.about {
		background: #f8fafc;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
	}

	.about-text {
		font-size: 1.25rem;
		color: #475569;
		line-height: 1.8;
	}

	.about-text p {
		margin: 0 0 16px 0;
	}

	.skills-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.skill-tag {
		padding: 8px 16px;
		background: white;
		border: 2px solid #e2e8f0;
		border-radius: 24px;
		font-size: 0.95rem;
		font-weight: 500;
		color: #1a1a1a;
		transition: all 0.3s ease;
	}

	.skill-tag:hover {
		border-color: #2563eb;
		background: #eff6ff;
		color: #2563eb;
		transform: translateY(-2px);
	}

	/* ─────────────────────────────────────── EXPERIENCE (TIMELINE) ─────────────────────────────────────── */
	.experience {
		background: #f8fafc;
	}

	.timeline {
		position: relative;
		padding: 40px 0;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 100%;
		background: linear-gradient(180deg, #2563eb, #1e40af);
		border-radius: 2px;
	}

	.timeline-item {
		margin-bottom: 50px;
		display: flex;
		gap: 40px;
		position: relative;
		animation: fadeInUp 0.6s ease-out;
		animation-delay: calc(var(--item-index) * 0.1s);
	}

	.timeline-item:nth-child(odd) {
		flex-direction: row;
	}

	.timeline-item:nth-child(even) {
		flex-direction: row-reverse;
	}

	.timeline-marker {
		flex: 0 0 50%;
		display: flex;
		justify-content: center;
		position: relative;
	}

	.timeline-dot {
		width: 24px;
		height: 24px;
		background: white;
		border: 4px solid #2563eb;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 8px;
		z-index: 10;
		box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
		transition: all 0.3s ease;
	}

	.timeline-item:hover .timeline-dot {
		width: 32px;
		height: 32px;
		box-shadow: 0 0 30px rgba(37, 99, 235, 0.6);
	}

	.timeline-content {
		flex: 1;
		padding: 0 20px;
	}

	.timeline-year {
		font-size: 1.5rem;
		font-weight: 800;
		color: #2563eb;
		margin-bottom: 12px;
	}

	.timeline-card {
		background: white;
		border: 2px solid #e2e8f0;
		border-radius: 12px;
		padding: 28px;
		transition: all 0.3s ease;
	}

	.timeline-item:hover .timeline-card {
		border-color: #2563eb;
		box-shadow: 0 12px 32px rgba(37, 99, 235, 0.15);
		transform: translateY(-4px);
	}

	.timeline-position {
		font-size: 1.4rem;
		font-weight: 700;
		margin: 0 0 6px 0;
		color: #1a1a1a;
	}

	.timeline-company {
		margin: 0 0 8px 0;
		color: #2563eb;
		font-weight: 600;
		font-size: 1.05rem;
	}

	.timeline-period {
		margin: 0 0 12px 0;
		color: #64748b;
		font-size: 0.95rem;
		font-weight: 500;
	}

	.timeline-description {
		margin: 0 0 16px 0;
		color: #475569;
		line-height: 1.7;
		font-size: 1.05rem;
	}

	.timeline-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.timeline-tech-badge {
		padding: 6px 12px;
		background: #eff6ff;
		color: #2563eb;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.timeline-tech-badge:hover {
		background: #2563eb;
		color: white;
	}

	@media (max-width: 768px) {
		.timeline::before {
			left: 20px;
		}

		.timeline-item {
			flex-direction: column !important;
			gap: 20px;
		}

		.timeline-item:nth-child(even) {
			flex-direction: column !important;
		}

		.timeline-marker {
			flex: none;
			width: 100%;
			justify-content: flex-start;
		}

		.timeline-dot {
			left: 20px;
		}

		.timeline-content {
			padding: 0 0 0 60px;
		}

		.timeline-year {
			font-size: 1.1rem;
		}
	}

	/* Old experience styles (backup) */
	.experience-list {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.experience-item {
		padding: 32px;
		border-left: 4px solid #2563eb;
		background: #f8fafc;
		border-radius: 8px;
		transition: all 0.3s ease;
	}

	.experience-item:hover {
		background: white;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
		transform: translateX(4px);
	}

	.exp-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 12px;
		gap: 16px;
	}

	.exp-position {
		font-size: 1.3rem;
		font-weight: 700;
		margin: 0 0 4px 0;
		color: #1a1a1a;
	}

	.exp-company {
		margin: 0;
		color: #64748b;
		font-weight: 500;
	}

	.exp-dates {
		padding: 6px 12px;
		background: white;
		border-radius: 6px;
		font-size: 0.9rem;
		color: #2563eb;
		font-weight: 600;
		white-space: nowrap;
	}

	.exp-description {
		margin: 16px 0;
		color: #475569;
		line-height: 1.7;
		font-size: 1.05rem;
	}

	.exp-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tech-badge {
		padding: 6px 12px;
		background: #e0e7ff;
		color: #2563eb;
		border-radius: 4px;
		font-size: 0.85rem;
		font-weight: 500;
	}

	/* ─────────────────────────────────────── PROJECTS ─────────────────────────────────────── */
	.projects {
		background: #f8fafc;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		gap: 32px;
	}

	.project-card {
		background: white;
		padding: 32px;
		border-radius: 12px;
		border: 2px solid #e2e8f0;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
	}

	.project-card:hover {
		border-color: #2563eb;
		box-shadow: 0 16px 40px rgba(37, 99, 235, 0.15);
		transform: translateY(-8px);
	}

	.project-header {
		margin-bottom: 20px;
	}

	.project-title {
		font-size: 1.3rem;
		font-weight: 700;
		margin: 0;
		color: #1a1a1a;
	}

	.project-card h4 {
		font-size: 0.95rem;
		font-weight: 700;
		margin: 16px 0 8px 0;
		color: #2563eb;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.project-card p {
		margin: 0;
		color: #475569;
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.project-problem,
	.project-solution,
	.project-impact {
		margin-bottom: 16px;
	}

	.project-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 16px 0;
		padding-top: 16px;
		border-top: 1px solid #e2e8f0;
	}

	.stack-tag {
		padding: 6px 12px;
		background: #f0f4ff;
		color: #2563eb;
		border-radius: 4px;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.project-links {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: auto;
		padding-top: 16px;
		border-top: 1px solid #e2e8f0;
	}

	.project-link {
		color: #2563eb;
		text-decoration: none;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 8px;
		transition: all 0.3s ease;
	}

	.project-link:hover {
		gap: 12px;
	}

	.arrow {
		display: inline-block;
		transition: transform 0.3s ease;
	}

	.project-link:hover .arrow {
		transform: translateX(4px);
	}

	/* ─────────────────────────────────────── EDUCATION ─────────────────────────────────────── */
	.education-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.education-item {
		padding: 24px;
		background: #f8fafc;
		border-radius: 8px;
		border-left: 4px solid #2563eb;
	}

	.edu-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 8px;
		gap: 16px;
	}

	.edu-degree {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0;
		color: #1a1a1a;
	}

	.edu-period {
		color: #2563eb;
		font-weight: 600;
		font-size: 0.95rem;
		white-space: nowrap;
	}

	.edu-institution {
		margin: 0 0 8px 0;
		color: #64748b;
		font-weight: 500;
	}

	.edu-details {
		margin: 0;
		color: #475569;
		font-size: 0.95rem;
		line-height: 1.6;
	}

	/* ─────────────────────────────────────── CONTACT ─────────────────────────────────────── */
	.contact {
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
		color: white;
	}

	.contact .section-title {
		color: white;
	}

	.contact .section-title::after {
		background: #2563eb;
	}

	.contact-info {
		text-align: center;
	}

	.contact-info p {
		font-size: 1.3rem;
		margin-bottom: 32px;
		color: #e2e8f0;
	}

	.contact-links {
		display: flex;
		gap: 24px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.contact-link {
		padding: 12px 28px;
		border: 2px solid #2563eb;
		color: #2563eb;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.contact-link:hover {
		background: #2563eb;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
	}

	/* ─────────────────────────────────────── FOOTER ─────────────────────────────────────── */
	.footer {
		background: #0f172a;
		color: #94a3b8;
		padding: 40px;
		text-align: center;
		font-size: 0.95rem;
	}

	.footer p {
		margin: 0;
	}

	/* ─────────────────────────────────────── ANIMATIONS ─────────────────────────────────────── */
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

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
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
			opacity: 0.2;
		}
		50% {
			opacity: 0.4;
		}
	}

	/* ─────────────────────────────────────── RESPONSIVE ─────────────────────────────────────── */
	@media (max-width: 768px) {
		.hero-content {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.hero {
			padding: 60px 20px;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.about-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.exp-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		section {
			padding: 60px 20px;
		}

		.cta-buttons {
			flex-direction: column;
		}

		.btn {
			width: 100%;
			text-align: center;
		}

		.contact-links {
			flex-direction: column;
		}

		.contact-link {
			width: 100%;
			text-align: center;
		}
	}
</style>
