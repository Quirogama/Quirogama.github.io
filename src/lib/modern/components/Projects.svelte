<script>
	import { portfolioData } from '$lib/config/portfolioData.js';
	import ProjectCard from './ProjectCard.svelte';

	let showAllProjects = $state(false);

	const featuredProjects = portfolioData.projects.slice(0, 3);
	const secondaryProjects = portfolioData.projects.slice(3);
	const hasSecondaryProjects = secondaryProjects.length > 0;

	function toggleProjects() {
		showAllProjects = !showAllProjects;
	}
</script>

<section class="projects" data-reveal id="projects">
	<div class="section-content">
		<h2 class="section-title">Proyectos Destacados</h2>
		<div class="projects-grid featured-grid">
			{#each featuredProjects as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>

		{#if hasSecondaryProjects}
			<div class="projects-actions">
				<button class="show-more-button" onclick={toggleProjects} aria-expanded={showAllProjects}>
					{showAllProjects ? 'Mostrar solo destacados' : `Ver ${secondaryProjects.length} proyecto(s) más`}
				</button>
			</div>

			{#if showAllProjects}
				<div class="more-projects">
					<h3 class="more-projects-title">Más proyectos</h3>
					<div class="projects-grid secondary-grid">
						{#each secondaryProjects as project (project.id)}
							<ProjectCard {project} />
						{/each}
					</div>
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.projects {
		background: rgba(0, 0, 0, 0.2);
		padding: 120px 40px;
		animation: fadeIn 0.6s ease-out;
		position: relative;
		z-index: 1;
	}

	.section-content {
		max-width: 1400px;
		margin: 0 auto;
	}

	.section-title {
		font-size: clamp(2.5rem, 6vw, 3.5rem);
		font-weight: 700;
		margin: 0 0 60px 0;
		letter-spacing: -0.01em;
		position: relative;
		display: inline-block;
		color: var(--accent);
	}

	.section-title::after {
		content: '';
		position: absolute;
		bottom: -12px;
		left: 0;
		width: 60px;
		height: 4px;
		background: linear-gradient(90deg, var(--primary), transparent);
		border-radius: 2px;
	}

	/* Grid uniforme y responsivo */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 32px;
	}

	.secondary-grid {
		margin-top: 28px;
	}

	.more-projects {
		margin-top: 28px;
	}

	.more-projects-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-light);
		margin: 0;
	}

	.projects-actions {
		display: flex;
		justify-content: center;
		margin-top: 28px;
	}

	.show-more-button {
		border: 1px solid rgba(212, 175, 55, 0.5);
		background: rgba(212, 175, 55, 0.12);
		color: var(--primary-light);
		border-radius: 999px;
		padding: 10px 18px;
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
		transition:
			background var(--transition-base),
			border-color var(--transition-base),
			transform var(--transition-base);
	}

	.show-more-button:hover {
		background: rgba(212, 175, 55, 0.2);
		border-color: rgba(212, 175, 55, 0.8);
		transform: translateY(-2px);
	}

	.projects-grid > :global(.project-card) {
		grid-column: span 2;
	}

	/* Si queda 1 card en la última fila, ocupa todo el ancho */
	.projects-grid > :global(.project-card):nth-last-child(1):nth-child(3n + 1) {
		grid-column: span 6;
	}

	/* Si quedan 2 cards en la última fila, cada una ocupa la mitad */
	.projects-grid > :global(.project-card):nth-last-child(2):nth-child(3n + 1),
	.projects-grid > :global(.project-card):nth-last-child(1):nth-child(3n + 2) {
		grid-column: span 3;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 1200px) {
		.projects {
			padding: 96px 32px;
		}

		.section-content {
			max-width: 1080px;
		}

		.section-title {
			font-size: clamp(2.3rem, 5vw, 3.2rem);
			margin: 0 0 50px 0;
		}

		.projects-grid {
			gap: 28px;
		}
	}

	@media (max-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 24px;
		}

		.projects-grid > :global(.project-card) {
			grid-column: span 1;
		}
	}

	@media (max-width: 900px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 18px;
		}

		.projects-grid > :global(.project-card),
		.projects-grid > :global(.project-card):nth-last-child(1):nth-child(3n + 1),
		.projects-grid > :global(.project-card):nth-last-child(2):nth-child(3n + 1),
		.projects-grid > :global(.project-card):nth-last-child(1):nth-child(3n + 2) {
			grid-column: span 1;
		}
	}

	@media (max-width: 768px) {
		.projects {
			padding: 48px 16px;
		}

		.section-title {
			margin: 0 0 40px 0;
		}

		.projects-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.projects-grid > :global(.project-card) {
			grid-column: span 1;
		}
	}

	@media (max-width: 480px) {
		.projects {
			padding: 40px 14px;
		}
	}
</style>
