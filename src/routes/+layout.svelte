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
				'Quirogama — Analista de Datos & Desarrollador Junior\n\nSobre mí\nSoy Analista de Datos y Programador Junior con 6 meses de experiencia en análisis, visualización y desarrollo web. Me enfoco en transformar datos en decisiones, automatizando tareas y creando dashboards claros.\n\nStack técnico\n• Análisis: Python (Pandas, NumPy), SQL, estadística\n• Visualización: Power BI, Matplotlib, Seaborn, Excel avanzado\n• Desarrollo: Svelte, JavaScript, HTML5, CSS3\n• Herramientas: Git, GitHub, VS Code, Jupyter Notebooks\n\nProyectos destacados\n• Dashboard Analítico (Power BI) — Redujo ~40% el tiempo de análisis. Métricas en tiempo real.\n• Automatización ETL (Python) — Pipeline que procesa 10,000+ registros diarios automáticamente.\n• Portafolio Web Interactivo (Svelte + SvelteKit) — Este sitio con estética Windows 98 (GitHub Pages).\n\nExperiencia (brief)\n• 6 meses en análisis y visualización de datos.\n• Automatización y limpieza de datos; reporting con BI.\n• Desarrollo web básico para publicar resultados y demos.\n\nEnlaces\n• GitHub: https://github.com/Quirogama\n• Portfolio: https://quirogama.github.io\n• CV (PDF): /cv.pdf\n\nContacto\n• Email: (agrega tu correo aquí)\n• LinkedIn: (próximamente)\n\nNota\nDesplázate hacia abajo dentro de esta ventana para leer todo el contenido.'
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
<!-- Panel eliminado: la información se presenta dentro de la ventana principal con scroll interno. -->

<!-- preserve route children (hidden pages/apps can be mounted here later) -->
{@render children?.()}

<style>
	    /* (styles del panel eliminados) */
</style>
