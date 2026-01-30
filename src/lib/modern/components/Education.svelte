<script>
	import { EDUCATION } from '$lib/config/portfolioData.js';
</script>

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

<style>
	.education {
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

	.education-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.education-item {
		padding: 24px;
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border-radius: 8px;
		border-left: 4px solid var(--primary);
		border: 2px solid var(--glass-border);
		border-left: 4px solid var(--primary);
		transition: all 0.3s ease;
	}

	.education-item:hover {
		border-color: var(--primary);
		box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
		transform: translateX(4px);
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
		color: var(--accent);
	}

	.edu-period {
		color: var(--primary);
		font-weight: 600;
		font-size: 0.95rem;
		white-space: nowrap;
	}

	.edu-institution {
		margin: 0 0 8px 0;
		color: var(--text-dim);
		font-weight: 500;
	}

	.edu-details {
		margin: 0;
		color: var(--text-dim);
		font-size: 0.95rem;
		line-height: 1.6;
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
		.education {
			padding: 60px 20px;
		}

		.edu-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
