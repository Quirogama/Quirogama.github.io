<script>
	let { projects = [] } = $props();
	
	// Mapeo de iconos por tipo de proyecto
	const projectIcons = {
		'Analytics Dashboard': '📊',
		'ETL Automation Pipeline': '⚙️',
		'Windows 98 Portfolio': '💻',
		'Predictive Analysis Model': '🤖',
		'PawCare - Sistema Veterinario': '🐾'
	};
</script>

<div class="projects-container">
	{#each projects as project}
		<div class="project-card">
			<div class="project-layout">
				<!-- Placeholder de imagen -->
				<div class="project-image">
					{#if project.image}
						<img src={project.image} alt={project.title} />
					{:else}
						<div class="image-placeholder">
							<span class="placeholder-icon">{projectIcons[project.title] || '📁'}</span>
							<p class="placeholder-text">Evidencia visual</p>
						</div>
					{/if}
				</div>

				<!-- Contenido del proyecto -->
				<div class="project-details">
					<div class="project-header">
						<h3 class="project-title">{project.title}</h3>
					</div>
					
					<div class="detail-sections">
						{#if project.problem}
							<div class="detail-section">
								<strong class="detail-label">Problema:</strong>
								<p class="detail-text">{project.problem}</p>
							</div>
						{/if}

						{#if project.solution}
							<div class="detail-section">
								<strong class="detail-label">Solución:</strong>
								<p class="detail-text">{project.solution}</p>
							</div>
						{/if}

						{#if project.impact}
							<div class="detail-section impact-section">
								<strong class="detail-label">Impacto:</strong>
								<p class="detail-text impact-text">{project.impact}</p>
							</div>
						{/if}

						{#if project.stack}
							<div class="detail-section">
								<strong class="detail-label">Stack:</strong>
								<p class="detail-text stack-text">{project.stack.join(' · ')}</p>
							</div>
						{/if}

						{#if project.links && project.links.length > 0}
							<div class="detail-section links-section">
								<strong class="detail-label">Links:</strong>
								<div class="links-group">
									{#each project.links as link}
										<a href={link.url} target="_blank" rel="noopener noreferrer" class="project-link">
											{link.label}
										</a>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.projects-container {
		padding: 12px;
		overflow-y: auto;
		height: 100%;
		background: var(--window-face, #c0c0c0);
	}

	.project-card {
		background: #ffffff;
		border-top: 2px solid #808080;
		border-left: 2px solid #808080;
		border-right: 2px solid #ffffff;
		border-bottom: 2px solid #ffffff;
		margin-bottom: 16px;
		padding: 12px;
	}

	.project-card:last-child {
		margin-bottom: 0;
	}

	.project-layout {
		display: flex;
		gap: 12px;
	}

	.project-image {
		width: 200px;
		height: 150px;
		flex-shrink: 0;
		border: 2px solid #000;
		overflow: hidden;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		image-rendering: pixelated;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #008080 25%, #000080 25%, #000080 50%, #008080 50%, #008080 75%, #000080 75%, #000080);
		background-size: 20px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.placeholder-icon {
		font-size: 64px;
		opacity: 0.8;
	}

	.placeholder-text {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 10px;
		color: #ffffff;
		margin: 0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		font-weight: bold;
	}

	.project-details {
		flex: 1;
		min-width: 0;
	}

	.project-header {
		margin-bottom: 12px;
		padding-bottom: 8px;
		border-bottom: 2px solid #dfdfdf;
	}

	.project-title {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 16px;
		font-weight: bold;
		margin: 0;
		color: #000080;
	}

	.detail-sections {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.detail-section {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 12px;
	}

	.detail-label {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 11px;
		color: #000080;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.detail-text {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 12px;
		line-height: 1.4;
		margin: 0;
		color: #000;
		padding-left: 6px;
		border-left: 3px solid #0066cc;
	}

	.impact-text {
		color: #006600;
		border-left-color: #00cc00;
		font-weight: bold;
	}

	.stack-text {
		color: #663300;
		border-left-color: #ff9900;
		font-size: 11px;
	}

	.links-section {
		margin-top: 4px;
	}

	.links-group {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding-left: 6px;
	}

	.project-link {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 11px;
		color: #0066cc;
		text-decoration: underline;
		cursor: pointer;
		padding: 2px 6px;
		border: 1px solid transparent;
		transition: all 0.1s;
	}

	.project-link:hover {
		background: #e0e0e0;
		border: 1px solid #808080;
	}

	.project-link:active {
		background: #c0c0c0;
		border-style: inset;
	}

	/* Responsivo para pantallas pequeñas */
	@media (max-width: 768px) {
		.project-layout {
			flex-direction: column;
		}

		.project-image {
			width: 100%;
			height: 120px;
		}
	}
</style>



