<script>
	let { projects = [] } = $props();
</script>

<div class="projects-container">
	{#each projects as project}
		<div class="project-card">
			<div class="project-image">
				{#if project.image}
					<img src={project.image} alt={project.title} />
				{:else}
					<div class="image-placeholder">
						<span>📊</span>
					</div>
				{/if}
			</div>
			<div class="project-info">
				<h3 class="project-title">{project.title}</h3>
				<p class="project-description">{project.description}</p>
				{#if project.tech}
					<div class="project-tech">
						<strong>Tech:</strong> {project.tech}
					</div>
				{/if}
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
		display: flex;
		gap: 12px;
	}

	.project-card:last-child {
		margin-bottom: 0;
	}

	.project-image {
		width: 180px;
		height: 135px;
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
		align-items: center;
		justify-content: center;
	}

	.image-placeholder span {
		font-size: 48px;
		opacity: 0.6;
		filter: grayscale(100%);
	}

	.project-info {
		flex: 1;
		min-width: 0;
	}

	.project-title {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 18px;
		font-weight: bold;
		margin: 0 0 8px 0;
		color: #000080;
	}

	.project-description {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 14px;
		line-height: 1.4;
		margin: 0 0 8px 0;
		color: #000;
	}

	.project-tech {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 12px;
		color: #666;
		margin-top: 8px;
		padding-top: 8px;
		border-top: 1px dotted #999;
	}

	.project-tech strong {
		color: #000;
	}
</style>
