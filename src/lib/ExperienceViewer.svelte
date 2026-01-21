<script>
	let { experiences = [] } = $props();
</script>

<div class="experience-container">
	{#each experiences as experience}
		<div class="experience-card">
			<div class="experience-layout">
				<!-- Placeholder de imagen -->
				<div class="experience-image">
					{#if experience.image}
						<img src={experience.image} alt={experience.company} />
					{:else}
						<div class="image-placeholder">
							<span class="placeholder-icon">🏢</span>
							<p class="placeholder-text">Logo Empresa</p>
						</div>
					{/if}
				</div>

				<!-- Contenido de la experiencia -->
				<div class="experience-details">
					<div class="experience-header">
						<h3 class="experience-title">{experience.position}</h3>
						<p class="experience-company">{experience.company}</p>
						<p class="experience-dates">{experience.dates}</p>
					</div>

					<div class="detail-sections">
						{#if experience.description}
							<div class="detail-section">
								<strong class="detail-label">Descripción:</strong>
								<p class="detail-text">
									{experience.description}
								</p>
							</div>
						{/if}

						{#if experience.achievements && experience.achievements.length > 0}
							<div class="detail-section">
								<strong class="detail-label">Logros:</strong>
								<ul class="responsibility-list">
									{#each experience.achievements as achievement}
										<li>{achievement}</li>
									{/each}
								</ul>
							</div>
						{/if}

						{#if experience.technologies && experience.technologies.length > 0}
							<div class="detail-section">
								<strong class="detail-label">Tecnologías:</strong>
								<p class="detail-text stack-text">{experience.technologies.join(' · ')}</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.experience-container {
		padding: 12px;
		overflow-y: auto;
		height: 100%;
		background: var(--window-face, #c0c0c0);
	}

	.experience-card {
		background: #ffffff;
		border-top: 2px solid #808080;
		border-left: 2px solid #808080;
		border-right: 2px solid #ffffff;
		border-bottom: 2px solid #ffffff;
		margin-bottom: 16px;
		padding: 12px;
	}

	.experience-layout {
		display: flex;
		gap: 20px;
		align-items: flex-start;
	}

	.experience-image {
		flex-shrink: 0;
		width: 150px;
		height: 150px;
	}

	.experience-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: #ffffff;
		border: 2px solid #808080;
		padding: 8px;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		background: #f0f0f0;
		border: 2px dashed #999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 8px;
		text-align: center;
	}

	.placeholder-icon {
		font-size: 32px;
	}

	.placeholder-text {
		font-size: 11px;
		color: #666;
		margin: 0;
	}

	.experience-details {
		flex: 1;
	}

	.experience-header {
		margin-bottom: 12px;
	}

	.experience-title {
		margin: 0 0 6px 0;
		font-size: 20px;
		font-weight: bold;
		color: #000080;
	}

	.experience-company {
		margin: 0 0 6px 0;
		font-size: 15px;
		font-weight: bold;
		color: #333;
	}

	.experience-dates {
		margin: 0;
		font-size: 14px;
		color: #666;
	}

	.detail-sections {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.detail-section {
		margin: 0;
	}

	.detail-label {
		font-size: 14px;
		font-weight: bold;
		color: #000080;
	}

	.detail-text {
		font-size: 14px;
		margin: 4px 0 0 0;
		color: #333;
		line-height: 1.5;
	}

	.stack-text {
		color: #666;
		font-style: italic;
	}

	.responsibility-list {
		margin: 4px 0 0 0;
		padding-left: 20px;
		font-size: 14px;
		color: #333;
		line-height: 1.5;
	}

	.responsibility-list li {
		margin: 2px 0;
	}
</style>
