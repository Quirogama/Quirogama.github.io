<script>
	import { portfolioData } from '$lib/config/portfolioData.js';
	import { SKILLS } from '$lib/config/portfolioData.js';
	import { PERSONAL_INFO, SOFT_SKILLS } from '$lib/config/portfolioData.js';

	let { shouldAnimate = true } = $props();

	const SKILL_AREAS = [
		{ title: 'Lenguajes', items: SKILLS.languages },
		{ title: 'Frontend', items: SKILLS.frontend },
		{ title: 'Backend', items: SKILLS.backend },
		{ title: 'Datos y BI', items: SKILLS.dataTools },
		{ title: 'Bases de Datos', items: SKILLS.databases },
		{ title: 'Herramientas', items: SKILLS.tools }
	];
</script>

<section class="about" data-reveal id="about" class:animate={shouldAnimate}>
	<div class="section-content">
		<h2 class="section-title">Sobre Mí</h2>
		<div class="about-grid">
			<div class="about-text">
				<p>{PERSONAL_INFO.aboutMe}</p>
				<p>
					Me interesa trabajar en <strong>{portfolioData.interests.focus}</strong>, creando
					soluciones completas desde la lógica de negocio hasta la interfaz.
				</p>

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
				<h3 class="skills-title">Stack Técnico Aplicado</h3>
				<div class="skills-area-list">
					{#each SKILL_AREAS as area}
						<div class="skills-area">
							<h4 class="skills-area-title">{area.title}</h4>
							<div class="skills-tags">
								{#each area.items as item}
									<span class="skill-tag">{item}</span>
								{/each}
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
		position: relative;
		z-index: 1;
	}

	.about.animate {
		animation: fadeIn 0.6s ease-out;
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
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
		gap: 60px;
		align-items: start;
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
		gap: 12px;
		padding-top: 4px;
	}

	.skills-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.skills-area-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.skills-area {
		background: rgba(26, 26, 46, 0.35);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		padding: 12px;
	}

	.skills-area-title {
		margin: 0 0 8px 0;
		font-size: 1.12rem;
		font-weight: 700;
		color: var(--primary-light);
	}

	.skills-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.skill-tag {
		padding: 6px 10px;
		border-radius: 999px;
		border: 1px solid var(--glass-border);
		background: rgba(212, 175, 55, 0.08);
		color: var(--text);
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.2;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 1200px) {
		.about {
			padding: 96px 32px;
		}

		.section-content {
			max-width: 1080px;
		}

		.section-title {
			font-size: clamp(2.3rem, 5vw, 3.2rem);
			margin: 0 0 50px 0;
		}

		.about-text,
		.about-text p,
		.soft-skill-item {
			font-size: 1.4rem;
		}

		.subsection-title {
			font-size: 1.5rem;
		}

		.skills-title {
			font-size: 1.4rem;
		}

		.skills-area-list {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.about {
			padding: 60px 20px;
		}

		.section-title {
			font-size: clamp(2rem, 8vw, 2.5rem);
			margin: 0 0 34px 0;
		}

		.about-grid {
			grid-template-columns: 1fr;
			gap: 28px;
		}

		.about-text,
		.about-text p,
		.soft-skill-item,
		.skill-tag {
			font-size: 1.1rem;
			line-height: 1.55;
		}

		.about-text p {
			margin: 0 0 14px 0;
		}

		.subsection-title,
		.skills-title {
			font-size: 1.2rem;
			margin: 20px 0 14px 0;
		}

		.soft-skills-grid {
			gap: 10px 14px;
			margin-top: 12px;
		}

		.skills-area-list {
			gap: 10px;
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.about-text,
		.about-text p,
		.soft-skill-item,
		.skill-tag {
			font-size: 1rem;
		}

		.subsection-title,
		.skills-title {
			font-size: 1.12rem;
		}
	}
</style>
