<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';

	let { children } = $props();

	// global windows state (simple for now)
	let windows = [
		{
			id: 1,
			title: 'Bienvenido - Quirogama',
			width: 650,
			height: 420,
			z: 2,
			left: 200,
			top: 50,
			content:
				'Hola! Soy Quirogama.\n\nANALISTA DE DATOS & DESARROLLADOR JUNIOR\n\n━━━ STACK TÉCNICO ━━━\n• Python (Pandas, NumPy), SQL\n• Power BI, Matplotlib, Seaborn\n• Svelte, JavaScript, HTML/CSS\n• Git, VS Code, Jupyter\n\n━━━ EXPERIENCIA ━━━\n• 6 meses en análisis y visualización\n• Reducción de 40% en tiempo de análisis\n• Automatización que procesa 10k+ registros/día\n\n━━━ NAVEGACIÓN ━━━\nHaz doble clic en los íconos del escritorio para:\n✓ Ver CV completo\n✓ Explorar proyectos detallados\n✓ Acceder a GitHub y contacto\n\nAbre el panel de RESUMEN (abajo a la derecha) para ver toda la información.\n\nGitHub: github.com/Quirogama'
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

<!-- Panel desplegable (caja) con toda la info relevante, estilo Win98 -->
<details class="info-drawer" aria-labelledby="drawer-heading">
	<summary class="drawer-summary" aria-controls="drawer-panel">
		<span class="summary-title">� Resumen profesional</span>
		<span class="summary-badges">
			<span class="badge">🐍 Python</span>
			<span class="badge">📊 SQL</span>
			<span class="badge">📈 Power BI</span>
			<span class="badge">⚡ Svelte</span>
			<span class="badge">📁 Git</span>
		</span>
	</summary>
	<div id="drawer-panel" class="drawer-panel">
		<header class="drawer-header">
			<h1 id="drawer-heading">💼 Quirogama — Analista de Datos y Desarrollador Junior</h1>
		</header>

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
					<li>
						<strong>CV (PDF):</strong> 
						<a href="/cv.pdf" target="_blank" rel="noopener">Descargar CV</a>
						<em style="color:#555; font-size:0.9rem;"> (coloca tu cv.pdf en la carpeta static/)</em>
					</li>
				</ul>
			</section>
		</main>

		<div class="summary-footer">
			<p>
				<strong>💡 Disponible para:</strong> Análisis de datos • Business Intelligence • Desarrollo web • Data Science Junior
			</p>
		</div>
	</div>
</details>

<!-- preserve route children (hidden pages/apps can be mounted here later) -->
{@render children?.()}

<style>
	    /* Panel desplegable fijo tipo Win98 */
	    .info-drawer {
	    	position: fixed;
	    	bottom: 60px; /* evitar superposición con la taskbar */
	    	right: 16px;
	    	max-width: min(95vw, 1000px);
	    	z-index: 9999;
	    	font-family: 'MS Sans Serif', Tahoma, Arial, sans-serif;
	    }

	    .drawer-summary {
	    	display: inline-flex;
	    	align-items: center;
	    	gap: 10px;
	    	padding: 6px 12px;
	    	background: #c0c0c0;
	    	border: 2px solid;
	    	border-color: #fff #000 #000 #fff;
	    	cursor: pointer;
	    	user-select: none;
	    }

	    .drawer-summary::-webkit-details-marker { display: none; }

	    .summary-title {
	    	font-weight: bold;
	    	color: #000080;
	    }

	    .summary-badges { display: none; gap: 6px; }

	    @media (min-width: 640px) {
	    	.summary-badges { display: inline-flex; }
	    }

	    .badge {
	    	display: inline-block;
	    	padding: 2px 8px;
	    	background: #c0c0c0;
	    	border: 2px solid;
	    	border-color: #fff #000 #000 #fff;
	    	font-size: 0.8rem;
	    	font-weight: bold;
	    }

	    .drawer-panel {
	    	margin-top: 8px;
	    	background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
	    	border: 3px solid #808080;
	    	box-shadow:
	    		inset -1px -1px 0 #000,
	    		inset 1px 1px 0 #fff,
	    		inset -2px -2px 0 #808080,
	    		inset 2px 2px 0 #dfdfdf;
	    	padding: 20px 18px;
	    	max-height: 70vh;
	    	overflow: auto;
	    	color: #000;
	    }

	    .drawer-header h1 {
	    	font-size: 1.2rem;
	    	margin: 0 0 12px;
	    	color: #000080;
	    	text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
	    	border-bottom: 2px solid #808080;
	    	padding-bottom: 8px;
	    }

	    .summary-grid {
	    	display: grid;
	    	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	    	gap: 18px;
	    	margin-bottom: 16px;
	    }

	    .drawer-panel h2 {
	    	font-size: 1.05rem;
	    	margin: 0 0 10px;
	    	color: #000080;
	    	border-bottom: 1px solid #808080;
	    	padding-bottom: 4px;
	    }

	    .drawer-panel p { font-size: 0.95rem; line-height: 1.5; margin: 8px 0; }
	    .drawer-panel ul { list-style: none; padding: 0; margin: 8px 0; }
	    .drawer-panel li { font-size: 0.95rem; line-height: 1.6; margin: 6px 0; padding-left: 8px; }
	    .drawer-panel ul:not(.projects-list):not(.links-list) li::before { content: "▪ "; color: #000080; font-weight: bold; margin-right: 4px; }

	    .projects-list li { margin: 12px 0; padding: 8px; background: #fff; border: 1px solid #808080; }
	    .projects-list strong { color: #000080; }
	    .projects-list em { color: #555; font-size: 0.9rem; }

	    .links-list li { margin: 8px 0; }
	    .links-list a { color: #0000ff; text-decoration: underline; font-weight: bold; }
	    .links-list a:hover { color: #ff0000; }

	    .summary-footer { text-align: center; padding-top: 12px; border-top: 2px solid #808080; margin-top: 8px; }
	    .summary-footer p { font-size: 1rem; color: #000080; margin: 0; }
</style>
