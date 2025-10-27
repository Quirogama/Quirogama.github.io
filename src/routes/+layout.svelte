<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';

	let { children } = $props();

	// global windows state (simple for now)
	let windows = [
		{
			id: 1,
			title: '💼 Quirogama - Analista de Datos',
			width: 580,
			height: 400,
			z: 2,
			left: 280,
			top: 60,
			content:
				'👋 ¡Bienvenido!\n\n📊 ANALISTA DE DATOS & DESARROLLADOR JUNIOR\n\n🔧 Stack Técnico:\n• Python (Pandas, NumPy) | SQL\n• Power BI | Matplotlib | Seaborn\n• Svelte | JavaScript | HTML/CSS\n• Git | VS Code | Jupyter\n\n📈 Experiencia:\n• 6 meses en análisis y visualización\n• Proyectos con impacto (-40% tiempo)\n• Automatización (10k+ registros/día)\n\n💡 Haz doble clic en los íconos del escritorio.\n📄 CV y más info en el footer de abajo.'
		},
		{
			id: 99,
			title: '📋 Menú Rápido',
			width: 240,
			height: 300,
			z: 3,
			left: 20,
			top: 20,
			content:
				'NAVEGACIÓN:\n\n🏠 Bienvenida ←\n📊 Proyectos (escritorio)\n💼 CV (escritorio)\n💻 GitHub (escritorio)\n📧 Contacto (escritorio)\n\n───────────────\n\nINFO COMPLETA:\n✓ Footer de abajo\n✓ Scroll hacia abajo\n\n───────────────\n\n💾 GitHub:\ngithub.com/Quirogama\n\n📧 Contacto:\n(ver icono escritorio)'
		}
	];

	let tasks = windows.map((w) => w.title);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell-root">
	<Desktop {windows} />
	<Taskbar {tasks} />
</div>

<!-- Resumen semántico MEJORADO y más visible para IAs/crawlers -->
<footer class="semantic-summary" aria-labelledby="portfolio-summary-heading">
	<div class="summary-header">
		<h1 id="portfolio-summary-heading">💼 Quirogama — Analista de Datos y Desarrollador Junior</h1>
		<div class="badges">
			<span class="badge">🐍 Python</span>
			<span class="badge">📊 SQL</span>
			<span class="badge">📈 Power BI</span>
			<span class="badge">⚡ Svelte</span>
			<span class="badge">📁 Git</span>
		</div>
	</div>
	
	<main class="summary-grid">
		<section aria-labelledby="about-heading">
			<h2 id="about-heading">📖 Sobre mí</h2>
			<p>
				<strong>Analista de Datos y Programador Junior</strong> con 6 meses de experiencia en análisis, visualización
				y desarrollo web. Enfocado en transformar datos en insights accionables.
			</p>
			<p><strong>Especialidades:</strong> Python, SQL, Power BI, automatización de procesos, dashboards interactivos.</p>
		</section>

		<section aria-labelledby="skills-heading">
			<h2 id="skills-heading">🛠️ Stack Técnico</h2>
			<ul>
				<li><strong>Análisis:</strong> Python (Pandas, NumPy), SQL, estadística</li>
				<li><strong>Visualización:</strong> Power BI, Matplotlib, Seaborn, Excel avanzado</li>
				<li><strong>Desarrollo:</strong> Svelte, JavaScript, HTML5, CSS3</li>
				<li><strong>Herramientas:</strong> Git, GitHub, VS Code, Jupyter Notebooks</li>
			</ul>
		</section>

		<section aria-labelledby="projects-heading">
			<h2 id="projects-heading">🚀 Proyectos Destacados</h2>
			<ul class="projects-list">
				<li>
					<strong>📊 Dashboard Analítico</strong> (Power BI)<br>
					<em>Redujo 40% el tiempo de análisis. Métricas en tiempo real.</em>
				</li>
				<li>
					<strong>🤖 Automatización ETL</strong> (Python)<br>
					<em>Pipeline que procesa 10,000+ registros diarios automáticamente.</em>
				</li>
				<li>
					<strong>🌐 Portafolio Web Interactivo</strong> (Svelte + SvelteKit)<br>
					<em>Este sitio. Estética Windows 98, deploy en GitHub Pages.</em>
				</li>
			</ul>
		</section>

		<section aria-labelledby="links-heading">
			<h2 id="links-heading">🔗 Enlaces</h2>
			<ul class="links-list">
				<li>
					<strong>GitHub:</strong> 
					<a href="https://github.com/Quirogama" target="_blank" rel="noopener">
						github.com/Quirogama
					</a>
				</li>
				<li>
					<strong>Portfolio:</strong> 
					<a href="https://quirogama.github.io/">quirogama.github.io</a>
				</li>
				<li>
					<strong>LinkedIn:</strong> Próximamente
				</li>
			</ul>
		</section>
	</main>

	<div class="summary-footer">
		<p>
			<strong>💡 Disponible para:</strong> Análisis de datos • Business Intelligence • Desarrollo web • Data Science Junior
		</p>
	</div>
</footer>

<!-- preserve route children (hidden pages/apps can be mounted here later) -->
{@render children?.()}

<style>
	/* Footer semántico más prominente y atractivo */
	.semantic-summary {
		margin: 32px auto;
		padding: 32px 24px;
		max-width: 1000px;
		color: #000;
		background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
		border: 3px solid #808080;
		box-shadow: 
			inset -1px -1px 0 #000, 
			inset 1px 1px 0 #fff,
			inset -2px -2px 0 #808080, 
			inset 2px 2px 0 #dfdfdf;
		font-family: 'MS Sans Serif', Tahoma, Arial, sans-serif;
	}

	.summary-header {
		text-align: center;
		margin-bottom: 24px;
		padding-bottom: 16px;
		border-bottom: 2px solid #808080;
	}

	.summary-header h1 {
		font-size: 1.5rem;
		margin: 0 0 12px;
		color: #000080;
		text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
	}

	.badges {
		display: flex;
		gap: 8px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.badge {
		display: inline-block;
		padding: 4px 12px;
		background: #c0c0c0;
		border: 2px solid;
		border-color: #fff #000 #000 #fff;
		font-size: 0.85rem;
		font-weight: bold;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 24px;
		margin-bottom: 24px;
	}

	.semantic-summary h2 {
		font-size: 1.1rem;
		margin: 0 0 12px;
		color: #000080;
		border-bottom: 1px solid #808080;
		padding-bottom: 4px;
	}

	.semantic-summary p {
		font-size: 0.95rem;
		line-height: 1.5;
		margin: 8px 0;
	}

	.semantic-summary ul {
		list-style: none;
		padding: 0;
		margin: 8px 0;
	}

	.semantic-summary li {
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 6px 0;
		padding-left: 8px;
	}

	.semantic-summary ul:not(.projects-list):not(.links-list) li::before {
		content: "▪ ";
		color: #000080;
		font-weight: bold;
		margin-right: 4px;
	}

	.projects-list li {
		margin: 12px 0;
		padding: 8px;
		background: #fff;
		border: 1px solid #808080;
	}

	.projects-list strong {
		color: #000080;
	}

	.projects-list em {
		color: #555;
		font-size: 0.9rem;
	}

	.links-list li {
		margin: 8px 0;
	}

	.links-list a {
		color: #0000ff;
		text-decoration: underline;
		font-weight: bold;
	}

	.links-list a:hover {
		color: #ff0000;
	}

	.summary-footer {
		text-align: center;
		padding-top: 16px;
		border-top: 2px solid #808080;
		margin-top: 24px;
	}

	.summary-footer p {
		font-size: 1rem;
		color: #000080;
		margin: 0;
	}
</style>
