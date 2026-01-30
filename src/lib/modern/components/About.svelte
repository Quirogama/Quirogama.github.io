<script>
	import { PERSONAL_INFO, SKILLS_FLAT, PROFESSIONAL_INTERESTS } from '$lib/config/portfolioData.js';
</script>

<section class="about" data-reveal id="about">
	<div class="section-content">
		<h2 class="section-title">Sobre Mí</h2>
		<div class="about-grid">
			<div class="about-text">
				<p>{PERSONAL_INFO.summary}</p>
				<p>Especializado en <strong>{PROFESSIONAL_INTERESTS.focus}</strong> con experiencia en:</p>
			</div>
			<div class="skills-grid">
				{#each SKILLS_FLAT as skill}
					<div class="skill-tag">{skill}</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about {
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

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
	}

	.about-text {
		font-size: var(--text-lg);
		color: var(--text-dim);
		line-height: var(--line-height-relaxed);
	}

	.about-text p {
		margin: 0 0 16px 0;
	}

	.skills-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.skill-tag {
		padding: 8px 16px;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 2px solid var(--glass-border);
		border-radius: var(--radius-full);
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--text);
		transition: all 0.3s ease;
	}

	.skill-tag:hover {
		border-color: var(--primary);
		background: rgba(212, 175, 55, 0.1);
		color: var(--primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
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
		.about {
			padding: 60px 20px;
		}

		.about-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}
	}
</style>
