<script>
	import { EXPERIENCES } from '$lib/config/portfolioData.js';
</script>

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
						{#if exp.achievements && exp.achievements.length > 0}
							<ul class="timeline-achievements">
								{#each exp.achievements as achievement}
									<li class="achievement-item">
										<span class="achievement-bullet">▹</span>
										{achievement}
									</li>
								{/each}
							</ul>
						{:else}
							<p class="timeline-description">{exp.description}</p>
						{/if}
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

<style>
	.experience {
		background: rgba(0, 0, 0, 0.2);
		padding: 120px 40px;
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
		background: linear-gradient(180deg, var(--primary), transparent);
		border-radius: 2px;
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
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
		background: var(--secondary);
		border: 4px solid var(--primary);
		border-radius: 50%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 8px;
		z-index: 10;
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
		transition: all 0.3s ease;
	}

	.timeline-item:hover .timeline-dot {
		width: 32px;
		height: 32px;
		box-shadow: 0 0 40px rgba(212, 175, 55, 0.8);
	}

	.timeline-content {
		flex: 1;
		padding: 0 20px;
	}

	.timeline-year {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--primary);
		margin-bottom: 12px;
		text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
	}

	.timeline-card {
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border: 2px solid var(--glass-border);
		border-radius: 12px;
		padding: 32px;
		transition: all 0.3s ease;
	}

	.timeline-item:hover .timeline-card {
		border-color: var(--primary);
		box-shadow: 0 12px 32px rgba(212, 175, 55, 0.2);
		transform: translateY(-4px);
	}

	.timeline-position {
		font-size: 1.6rem;
		font-weight: 700;
		margin: 0 0 8px 0;
		color: var(--accent);
	}

	.timeline-company {
		margin: 0 0 8px 0;
		color: var(--primary);
		font-weight: 600;
		font-size: 1.2rem;
	}

	.timeline-period {
		margin: 0 0 12px 0;
		color: var(--text-dim);
		font-size: 1.05rem;
		font-weight: 500;
	}

	.timeline-description {
		margin: 0 0 16px 0;
		color: var(--text);
		line-height: 1.7;
		font-size: 1.25rem;
	}

	.timeline-achievements {
		margin: 0 0 16px 0;
		padding: 0;
		list-style: none;
	}

	.achievement-item {
		color: var(--text);
		font-size: 1.2rem;
		line-height: 1.7;
		margin-bottom: 10px;
		display: flex;
		gap: 12px;
	}

	.achievement-bullet {
		color: var(--primary);
		font-weight: 700;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.timeline-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.timeline-tech-badge {
		padding: 8px 14px;
		background: rgba(212, 175, 55, 0.1);
		color: var(--primary);
		border-radius: var(--radius-sm);
		font-size: var(--text-base);
		font-weight: var(--font-weight-semibold);
		transition: all 0.3s ease;
		border: 1px solid var(--glass-border);
	}

	.timeline-tech-badge:hover {
		background: var(--primary);
		color: var(--secondary);
		border-color: var(--primary);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
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

	@media (max-width: 768px) {
		.experience {
			padding: 60px 20px;
		}

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
</style>
