<script>
	import { onMount } from 'svelte';
	import { portfolioData } from '$lib/config/portfolioData.js';
	import { PERSONAL_INFO, SOFT_SKILLS } from '$lib/config/portfolioData.js';

	let skillsAnimated = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !skillsAnimated) {
					skillsAnimated = true;
				}
			});
		}, { threshold: 0.3 });

		const skillsSection = document.querySelector('.skills-container');
		if (skillsSection) {
			observer.observe(skillsSection);
		}

		return () => observer.disconnect();
	});
</script>

<section class="about" data-reveal id="about">
	<div class="section-content">
		<h2 class="section-title">Sobre Mí</h2>
		<div class="about-grid">
			<div class="about-text">
				<p>{PERSONAL_INFO.aboutMe}</p>
				<p>Me interesa trabajar en <strong>{portfolioData.interests.focus}</strong>, creando soluciones completas desde la lógica de negocio hasta la interfaz.</p>
				
				<h3 class="subsection-title">Habilidades Blandas</h3>
				<div class="soft-skills-grid">
					{#each SOFT_SKILLS as skill}
						<div class="soft-skill-item">
							<span class="soft-skill-bullet">▹</span>
							{skill}
						</div>
					{/each}
				</div>
			</div>
			<div class="skills-container">
				<h3 class="skills-title">Habilidades Técnicas</h3>
				<div class="skills-list">
					{#each portfolioData.skillsWithLevels as skill}
						<div class="skill-item">
							<div class="skill-header">
								<span class="skill-name">{skill.name}</span>
								<span class="skill-percentage">{skill.level}%</span>
							</div>
							<div class="skill-bar-container">
								<div 
									class="skill-bar-fill" 
									class:animated={skillsAnimated}
									style="--skill-level: {skill.level}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
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

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
	}

	.about-text {
		font-size: 1.5rem;
		color: var(--text);
		line-height: 1.8;
	}

	.about-text p {
		margin: 0 0 24px 0;
		font-size: 1.5rem;
	}

	.subsection-title {
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--primary);
		margin: 36px 0 24px 0;
	}

	.soft-skills-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px 24px;
		margin-top: 20px;
	}

	.soft-skill-item {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--text);
		font-size: 1.5rem;
		line-height: 1.6;
	}

	.soft-skill-bullet {
		color: var(--primary);
		font-weight: 700;
		flex-shrink: 0;
	}

	.skills-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.skills-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0 0 20px 0;
	}

	.skills-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.skill-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.skill-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.skill-name {
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--text);
	}

	.skill-percentage {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--primary);
	}

	.skill-bar-container {
		width: 100%;
		height: 8px;
		background: rgba(26, 26, 46, 0.6);
		border-radius: var(--radius-full);
		overflow: hidden;
		position: relative;
	}

	.skill-bar-fill {
		height: 100%;
		width: 0;
		background: linear-gradient(90deg, var(--primary), #F4E5B7);
		border-radius: var(--radius-full);
		transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.skill-bar-fill::after {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}

	.skill-bar-fill.animated {
		width: var(--skill-level);
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 200%;
		}
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
