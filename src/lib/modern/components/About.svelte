<script>
	import { CONTENT_SECTIONS, SOFT_SKILLS } from '$lib/config/portfolioData.js';
	import {
		siAngular,
		siBootstrap,
		siCplusplus,
		siDocker,
		siGit,
		siGithub,
		siHtml5,
		siJavascript,
		siKotlin,
		siMongodb,
		siNestjs,
		siNodedotjs,
		siOpenjdk,
		siPandas,
		siPostgresql,
		siPython,
		siSpringboot,
		siSqlite,
		siSvelte
	} from 'simple-icons';

	let { shouldAnimate = true } = $props();

	const TECH_SECTIONS = [
		{
			title: 'Lenguajes',
			subtitle: 'Base de lógica, scripting y análisis.',
			leadIcon: 'siPython',
			items: [
				{ label: 'Python', icon: 'siPython' },
				{ label: 'C++', icon: 'siCplusplus' },
				{ label: 'Java', icon: 'siOpenjdk' },
				{ label: 'Kotlin', icon: 'siKotlin' },
				{ label: 'JavaScript', icon: 'siJavascript' },
				{ label: 'SQL', icon: null }
			]
		},
		{
			title: 'Frontend',
			subtitle: 'Interfaces, presentación y experiencia.',
			leadIcon: 'siSvelte',
			items: [
				{ label: 'Svelte', icon: 'siSvelte' },
				{ label: 'Angular', icon: 'siAngular' },
				{ label: 'HTML / CSS', icon: 'siHtml5' },
				{ label: 'JavaScript', icon: 'siJavascript' },
				{ label: 'Bootstrap', icon: 'siBootstrap' }
			]
		},
		{
			title: 'Backend',
			subtitle: 'APIs, lógica y servicios.',
			leadIcon: 'siNodedotjs',
			items: [
				{ label: 'Node.js', icon: 'siNodedotjs' },
				{ label: 'NestJS', icon: 'siNestjs' },
				{ label: 'Spring Boot', icon: 'siSpringboot' },
				{ label: 'Python', icon: 'siPython' }
			]
		},
		{
			title: 'Datos y BI',
			subtitle: 'Análisis, limpieza y visualización.',
			leadIcon: 'siPandas',
			items: [
				{ label: 'Power BI', icon: null },
				{ label: 'Pandas', icon: 'siPandas' },
				{ label: 'Matplotlib', icon: null }
			]
		},
		{
			title: 'Bases de Datos',
			subtitle: 'Persistencia relacional y NoSQL.',
			leadIcon: 'siPostgresql',
			items: [
				{ label: 'PostgreSQL', icon: 'siPostgresql' },
				{ label: 'MongoDB', icon: 'siMongodb' },
				{ label: 'SQL Server', icon: null },
				{ label: 'SQLite', icon: 'siSqlite' }
			]
		},
		{
			title: 'Herramientas',
			subtitle: 'Versionado, despliegue y soporte.',
			leadIcon: 'siGit',
			items: [
				{ label: 'Git', icon: 'siGit' },
				{ label: 'GitHub', icon: 'siGithub' },
				{ label: 'AWS', icon: null },
				{ label: 'Docker', icon: 'siDocker' },
				{ label: 'Excel', icon: null }
			]
		}
	];

	const ICONS = {
		siAngular,
		siBootstrap,
		siCplusplus,
		siDocker,
		siGit,
		siGithub,
		siHtml5,
		siJavascript,
		siKotlin,
		siMongodb,
		siNestjs,
		siNodedotjs,
		siOpenjdk,
		siPandas,
		siPostgresql,
		siPython,
		siSpringboot,
		siSqlite,
		siSvelte
	};

	function resolveIcon(iconName) {
		if (!iconName) return null;
		return ICONS[iconName] ?? null;
	}

	function initials(label) {
		return label
			.split(/\s|\//)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0])
			.join('')
			.toUpperCase();
	}

	const skillAreas = TECH_SECTIONS.map((section) => ({
		...section,
		lead: resolveIcon(section.leadIcon),
		items: section.items.map((item) => ({
			...item,
			iconData: resolveIcon(item.icon),
			fallback: initials(item.label)
		}))
	}));
</script>

<section class="about section-shell section-shell--soft" data-reveal id="about" class:animate={shouldAnimate}>
	<div class="section-content section-content-shell">
		<h2 class="section-title section-title-shell">Sobre Mí</h2>
		<div class="about-grid">
			<div class="about-text">
				<p>{CONTENT_SECTIONS.about.intro}</p>
				<p>
					{CONTENT_SECTIONS.about.focus}
				</p>
			</div>
			<div class="skills-column">
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
				<p class="skills-caption">Vista visual de las tecnologías que uso para construir productos, APIs, interfaces y análisis de datos.</p>
				<div class="skills-area-list">
					{#each skillAreas as area}
						<article class="skills-area">
							<div class="skills-area-header">
								<div class="skills-area-mark" aria-hidden="true">
									{#if area.lead}
										<svg viewBox="0 0 24 24" role="img" aria-hidden="true">
											<path d={area.lead.path} fill={`#${area.lead.hex}`}></path>
										</svg>
									{:else}
										<span>{initials(area.title)}</span>
									{/if}
								</div>
								<div>
									<h4 class="skills-area-title">{area.title}</h4>
									<p class="skills-area-subtitle">{area.subtitle}</p>
								</div>
							</div>
							<div class="skills-tags">
								{#each area.items as item}
									<span class="skill-tag">
										<span class="skill-tag-icon" aria-hidden="true">
											{#if item.iconData}
												<svg viewBox="0 0 24 24" role="img" aria-hidden="true">
													<path d={item.iconData.path} fill={`#${item.iconData.hex}`}></path>
												</svg>
											{:else}
												<span>{item.fallback}</span>
											{/if}
										</span>
										<span>{item.label}</span>
									</span>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: rgba(0, 0, 0, 0.2);
		position: relative;
		z-index: 1;
	}

	.about.animate {
		animation: fadeIn 0.6s ease-out;
	}

	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
		grid-template-areas:
			'intro soft'
			'tech tech';
		gap: 40px 56px;
		align-items: start;
	}

	.about-text {
		grid-area: intro;
		font-size: 1.5rem;
		color: var(--text);
		line-height: 1.8;
	}

	.skills-column {
		grid-area: soft;
		padding-top: 0;
		margin-top: -65px;
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
		grid-area: tech;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: 8px;
	}

	.skills-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.skills-caption {
		margin: 0;
		color: var(--text-dim);
		font-size: 1rem;
		line-height: 1.6;
		max-width: 52ch;
	}

	.skills-area-list {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.skills-area {
		background: linear-gradient(180deg, rgba(26, 26, 46, 0.84), rgba(20, 20, 34, 0.92));
		border: 1px solid rgba(212, 175, 55, 0.16);
		border-radius: var(--radius-lg);
		padding: 16px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
		transition:
			transform var(--transition-base),
			border-color var(--transition-base),
			box-shadow var(--transition-base);
	}

	.skills-area:hover {
		transform: translateY(-3px);
		border-color: rgba(212, 175, 55, 0.45);
		box-shadow: 0 14px 32px rgba(0, 0, 0, 0.24);
	}

	.skills-area-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 14px;
	}

	.skills-area-mark {
		width: 44px;
		height: 44px;
		border-radius: 14px;
		background: rgba(212, 175, 55, 0.12);
		border: 1px solid rgba(212, 175, 55, 0.22);
		display: grid;
		place-items: center;
		flex-shrink: 0;
		color: var(--primary-light);
	}

	.skills-area-mark svg {
		width: 24px;
		height: 24px;
	}

	.skills-area-mark span {
		font-size: 0.9rem;
		font-weight: 800;
		letter-spacing: 0.06em;
	}

	.skills-area-subtitle {
		margin: 4px 0 0 0;
		color: var(--text-dim);
		font-size: 0.95rem;
		line-height: 1.4;
	}

	.skills-area-title {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--primary-light);
	}

	.skills-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.skill-tag {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 999px;
		border: 1px solid rgba(212, 175, 55, 0.22);
		background: rgba(212, 175, 55, 0.08);
		color: var(--text);
		font-size: 0.98rem;
		font-weight: 600;
		line-height: 1.2;
		transition:
			transform var(--transition-fast),
			border-color var(--transition-fast),
			background var(--transition-fast);
	}

	.skill-tag:hover {
		transform: translateY(-1px);
		border-color: rgba(212, 175, 55, 0.45);
		background: rgba(212, 175, 55, 0.14);
	}

	.skill-tag-icon {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--primary-light);
	}

	.skill-tag-icon svg {
		width: 100%;
		height: 100%;
	}

	.skill-tag-icon span {
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		color: var(--primary-light);
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
		.section-content {
			max-width: 1080px;
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

		.skills-caption {
			font-size: 0.95rem;
		}

		.skills-area-list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 768px) {
		.about-grid {
			grid-template-columns: 1fr;
			grid-template-areas:
				'intro'
				'soft'
				'tech';
			gap: 28px;
		}

		.skills-column {
			margin-top: 0;
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

		.skills-area {
			padding: 14px;
		}

		.skills-area-mark {
			width: 40px;
			height: 40px;
		}

		.skill-tag {
			font-size: 0.92rem;
			padding: 7px 10px;
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
