<script>
	let { project } = $props();

	// Placeholder image con gradiente único por proyecto
	const gradients = [
		'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
		'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
		'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
		'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
	];

	const projectIndex = project.id ? project.id.split('-')[0].length % gradients.length : 0;
	const projectGradient = gradients[projectIndex];
</script>

<div class="project-card glass-card">
	
	<!-- Image placeholder con gradiente -->
	<div class="project-image" style="background: {projectGradient}">
		<div class="image-overlay">
			<span class="image-placeholder-text">📊 Dashboard Preview</span>
		</div>
	</div>

	<div class="project-content">
		<div class="project-header">
			<h3 class="project-title">{project.title}</h3>
			{#if project.highlight}
				<div class="project-highlight">
					<span class="highlight-icon">✨</span>
					{project.highlight}
				</div>
			{/if}
		</div>
		
		<p class="project-description">{project.description}</p>

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
</div>

<style>
	.project-card {
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border-radius: 12px;
		border: 2px solid var(--glass-border);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
		height: auto;
		box-shadow: none;
	}

	.project-card:hover {
		border-color: var(--primary);
		box-shadow: 0 12px 32px rgba(212, 175, 55, 0.2);
		transform: translateY(-4px);
	}

	/* Project Image */
	.project-image {
		width: 100%;
		aspect-ratio: 16 / 9;
		position: relative;
		overflow: hidden;
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
		transition: all 0.3s ease;
	}

	.project-card:hover .image-overlay {
		background: rgba(0, 0, 0, 0.5);
	}

	.image-placeholder-text {
		font-size: var(--text-4xl);
		color: white;
		font-weight: 600;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	/* Project Content */
	.project-content {
		padding: 32px;
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: visible;
	}

	.project-header {
		margin-bottom: 16px;
	}

	.project-title {
		font-size: 1.6rem;
		font-weight: 700;
		margin: 0 0 12px 0;
		color: var(--accent);
		line-height: 1.3;
	}

	.project-highlight {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 14px;
		background: rgba(212, 175, 55, 0.15);
		border: 1px solid rgba(212, 175, 55, 0.3);
		border-radius: 20px;
		font-size: 1.25rem;
		color: var(--primary);
		font-weight: 600;
	}

	.highlight-icon {
		font-size: 1rem;
	}

	.project-description {
		color: var(--text);
		font-size: 1.25rem;
		line-height: 1.7;
		margin: 0 0 20px 0;
	}

	.project-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 20px 0;
		padding-top: 16px;
		border-top: 1px solid var(--glass-border);
	}

	.stack-tag {
		padding: 4px 10px;
		background: rgba(212, 175, 55, 0.1);
		color: var(--primary);
		border-radius: 4px;
		font-size: 1.25rem;
		font-weight: 500;
		border: 1px solid var(--glass-border);
		transition: all 0.3s ease;
	}

	.stack-tag:hover {
		background: var(--primary);
		color: var(--secondary);
		border-color: var(--primary);
	}

	.project-links {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--glass-border);
	}

	.project-link {
		color: var(--primary);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.25rem;
		display: flex;
		align-items: center;
		gap: 8px;
		transition: all 0.3s ease;
	}

	.project-link:hover {
		gap: 12px;
		text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
	}

	.arrow {
		display: inline-block;
		transition: transform 0.3s ease;
	}

	.project-link:hover .arrow {
		transform: translateX(4px);
	}

	.glass-card {
		background: var(--glass-bg);
		backdrop-filter: blur(20px) saturate(180%);
		border: 2px solid var(--glass-border);
		box-shadow: none;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.project-image {
			aspect-ratio: 21 / 9;
		}

		.image-placeholder-text {
			font-size: 1.4rem;
		}

		.project-content {
			padding: 18px;
		}

		.project-title {
			font-size: 1.4rem;
		}

		.project-highlight {
			font-size: 1.1rem;
			padding: 4px 10px;
		}

		.project-description {
			font-size: 1.05rem;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.stack-tag {
			font-size: 1.05rem;
			padding: 3px 8px;
		}

		.project-link {
			font-size: 1.05rem;
		}
	}

	@media (max-width: 480px) {
		.project-content {
			padding: 16px;
		}
	}
</style>
