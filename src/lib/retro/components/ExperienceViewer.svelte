<script>
	let { experiences = [] } = $props();
</script>

<div class="experience-container">
	{#each experiences as experience}
		<div class="experience-card">
			<div class="experience-layout">
				<div class="experience-image">
					{#if experience.image}
						<img src={experience.image} alt={experience.company} />
					{:else}
						<div class="image-placeholder">
							<span class="placeholder-icon">🏢</span>
							<p class="placeholder-text">Experiencia Profesional</p>
						</div>
					{/if}
				</div>

				<div class="experience-details">
					<div class="experience-header">
						<h3 class="experience-title">{experience.position}</h3>
						<p class="experience-company">{experience.company}</p>
						<p class="experience-dates">
							{experience.dates}
							{#if experience.duration}
								<span class="duration-pill">{experience.duration}</span>
							{/if}
						</p>
					</div>

					<div class="detail-sections">
						{#if experience.description}
							<div class="detail-section">
								<strong class="detail-label">Descripción:</strong>
								<p class="detail-text">{experience.description}</p>
							</div>
						{/if}

						{#if experience.achievements && experience.achievements.length > 0}
							<div class="detail-section">
								<strong class="detail-label">Logros:</strong>
								<ul class="achievement-list">
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

	.experience-card:last-child {
		margin-bottom: 0;
	}

	.experience-layout {
		display: flex;
		gap: 12px;
	}

	.experience-image {
		width: 210px;
		height: 150px;
		flex-shrink: 0;
		border: 2px solid #808080;
		overflow: hidden;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.experience-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		image-rendering: auto;
		padding: 8px;
		box-sizing: border-box;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #5f5f5f 25%, #8a8a8a 25%, #8a8a8a 50%, #5f5f5f 50%);
		background-size: 18px 18px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.placeholder-icon {
		font-size: 42px;
		opacity: 0.92;
	}

	.placeholder-text {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 10px;
		color: #ffffff;
		margin: 0;
		text-shadow: 1px 1px 0 #000;
		font-weight: bold;
	}

	.experience-details {
		flex: 1;
		min-width: 0;
	}

	.experience-header {
		margin-bottom: 12px;
		padding-bottom: 8px;
		border-bottom: 2px solid #dfdfdf;
	}

	.experience-title {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 16px;
		font-weight: bold;
		margin: 0 0 6px;
		color: #000080;
	}

	.experience-company {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 12px;
		line-height: 1.35;
		margin: 0 0 6px;
		color: #000;
	}

	.experience-dates {
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 12px;
		margin: 0;
		color: #555;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
	}

	.duration-pill {
		font-size: 10px;
		font-weight: bold;
		text-transform: uppercase;
		padding: 2px 6px;
		background: #e9f1ff;
		border: 1px solid #6b8fcf;
		color: #0e3d7a;
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

	.achievement-list {
		margin: 0;
		padding: 0 0 0 22px;
		color: #0a5f00;
		border-left: 3px solid #00aa33;
		padding-left: 10px;
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 12px;
		line-height: 1.35;
	}

	.achievement-list li {
		margin: 0 0 4px;
	}

	.achievement-list li:last-child {
		margin-bottom: 0;
	}

	.stack-text {
		color: #663300;
		border-left-color: #ff9900;
		font-size: 11px;
	}

	@media (max-width: 768px) {
		.experience-layout {
			flex-direction: column;
		}

		.experience-image {
			width: 100%;
			height: 130px;
		}

		.experience-company {
			font-size: 13px;
		}
	}
</style>
