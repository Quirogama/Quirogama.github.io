<script>
	import { portfolioData } from '$lib/config/portfolioData.js';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section class="projects" data-reveal id="projects">
	<div class="section-content">
		<h2 class="section-title">Proyectos Destacados</h2>
		<div class="projects-grid">
			{#each portfolioData.projects as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>
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
