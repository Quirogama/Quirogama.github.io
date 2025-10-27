<script>
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/Desktop.svelte';
	import Taskbar from '$lib/Taskbar.svelte';

	let { children } = $props();

	// global windows state (simple for now)
	let windows = [
		{
			id: 1,
			title: 'Welcome',
			width: 520,
			height: 320,
			z: 2,
			content:
				'Hola! Bienvenido al Windows 98 de prueba.\n\nSoy Quirogama: Analista de Datos y Desarrollador Junior. Trabajo con Python, SQL y visualización (Power BI). También desarrollo apps web (Svelte).\n\nExplora los íconos del escritorio para ver CV, proyectos y contacto. Más detalles abajo en la sección "Sobre mí" y "Proyectos".'
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

<!-- Resumen semántico visible para IAs/crawlers sin interacción -->
<footer class="semantic-summary" aria-labelledby="portfolio-summary-heading">
	<h1 id="portfolio-summary-heading">Quirogama — Analista de Datos y Desarrollador Junior</h1>
	<main>
		<section aria-labelledby="about-heading">
			<h2 id="about-heading">Sobre mí</h2>
			<p>
				Analista de Datos y Programador Junior con 6 meses de experiencia en análisis, visualización
				y desarrollo web. Enfocado en Python, SQL, Power BI y Svelte.
			</p>
		</section>
		<section aria-labelledby="skills-heading">
			<h2 id="skills-heading">Habilidades</h2>
			<ul>
				<li>Python (Pandas, NumPy) • SQL • JavaScript</li>
				<li>Power BI • Matplotlib • Seaborn</li>
				<li>Svelte • HTML • CSS • Git</li>
			</ul>
		</section>
		<section aria-labelledby="projects-heading">
			<h2 id="projects-heading">Proyectos</h2>
			<ul>
				<li>Dashboard Analítico (Power BI) — redujo 40% el tiempo de análisis.</li>
				<li>Automatización ETL (Python) — procesa 10k+ registros diarios.</li>
				<li>Portafolio Web (Svelte) — este sitio con estética Windows 98.</li>
			</ul>
		</section>
		<section aria-labelledby="links-heading">
			<h2 id="links-heading">Enlaces</h2>
			<ul>
				<li>GitHub: <a href="https://github.com/Quirogama">github.com/Quirogama</a></li>
				<li>Portfolio: <a href="https://quirogama.github.io/">quirogama.github.io</a></li>
			</ul>
		</section>
	</main>
</footer>

<!-- preserve route children (hidden pages/apps can be mounted here later) -->
{@render children?.()}
<style>
	.semantic-summary {
		margin: 24px auto;
		padding: 16px;
		max-width: 900px;
		color: #111;
		background: #f8f8f8;
		border: 1px solid #ddd;
	}
	.semantic-summary h1 { font-size: 1.25rem; margin: 0 0 8px; }
	.semantic-summary h2 { font-size: 1.1rem; margin: 16px 0 6px; }
	.semantic-summary p, .semantic-summary li { font-size: 0.95rem; }
</style>
