<script>
  // Esta ruta no renderiza el escritorio; el UI principal está en +layout.svelte
  // Aquí dejamos solo contenido semántico adicional si se requiere.
</script>

<!-- Contenido accesible para IAs y SEO (visualmente oculto) -->
<div class="sr-only" aria-hidden="false">
	<h1>Quirogama - Portafolio de Desarrollador Full-Stack Junior</h1>
	
	<section>
		<h2>Sobre mí</h2>
		<p>
			Desarrollador full‑stack junior con experiencia en backend, frontend y construcción de aplicaciones web. 
			Apasionado por crear soluciones completas con buenas prácticas de ingeniería.
		</p>
	</section>

	<section>
		<h2>Habilidades Técnicas</h2>
		<ul>
			<li>Backend: Java, Spring Boot, REST APIs</li>
			<li>Frontend: Angular, Svelte, HTML, CSS, JavaScript</li>
			<li>Bases de Datos: PostgreSQL, SQL Server</li>
			<li>DevOps/Tools: Docker, Git, GitHub Actions</li>
			<li>Otros: Python, Firebase, Google Maps SDK</li>
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
