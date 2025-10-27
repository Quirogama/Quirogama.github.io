<script>
  // Esta ruta no renderiza el escritorio; el UI principal está en +layout.svelte
  // Aquí dejamos solo contenido semántico adicional si se requiere.
</script>

<!-- Contenido accesible para IAs y SEO (visualmente oculto) -->
<div class="sr-only" aria-hidden="false">
	<h1>Quirogama - Portafolio de Analista de Datos y Desarrollador</h1>
	
	<section>
		<h2>Sobre mí</h2>
		<p>
			Analista de Datos y Programador Junior con 6 meses de experiencia en análisis de datos, 
			visualización y desarrollo de aplicaciones web. Apasionado por transformar datos en 
			insights accionables y crear soluciones tecnológicas innovadoras.
		</p>
	</section>

	<section>
		<h2>Habilidades Técnicas</h2>
		<ul>
			<li>Lenguajes: Python, SQL, JavaScript</li>
			<li>Análisis de Datos: Pandas, NumPy, análisis estadístico</li>
			<li>Visualización: Power BI, Matplotlib, Seaborn</li>
			<li>Desarrollo Web: Svelte, HTML, CSS, Git</li>
			<li>Bases de Datos: SQL Server, PostgreSQL</li>
		</ul>
	</section>

	<section>
		<h2>Proyectos Destacados</h2>
		<p>Explora mis proyectos interactivos en el escritorio Windows 98 de arriba.</p>
	</section>

	<section>
		<h2>Contacto</h2>
		<p>GitHub: <a href="https://github.com/Quirogama">github.com/Quirogama</a></p>
	</section>
</div>



<style>
	/* Screen reader only - visible para IAs pero oculto visualmente */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
