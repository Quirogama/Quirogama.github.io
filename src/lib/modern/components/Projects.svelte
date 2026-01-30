<script>
	import { PROJECTS } from '$lib/config/portfolioData.js';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section class="projects" data-reveal id="projects">
	<div class="section-content">
		<h2 class="section-title">Proyectos Destacados</h2>
		<div class="projects-grid">
			{#each PROJECTS as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		background: rgba(0, 0, 0, 0.2);
		padding: 100px 40px;
		animation: fadeIn 0.6s ease-out;
		position: relative;
		z-index: 1;
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

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		gap: 32px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.projects {
			padding: 60px 20px;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
