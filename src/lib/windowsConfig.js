// Configuración centralizada de proyectos (evita duplicación)
export const projects = [
	{
		title: 'Analytics Dashboard',
		problem: 'Reportes manuales semanales consumían 8 horas de análisis repetitivo y estaban sujetos a errores humanos.',
		solution: 'Dashboard interactivo en Power BI con actualizaciones automáticas. Consultas SQL optimizadas y DAX para cálculos complejos.',
		impact: 'Reducción del 60% en tiempo de análisis. Reportes generados automáticamente. Decisiones más rápidas basadas en datos en tiempo real.',
		stack: ['Power BI', 'SQL', 'DAX', 'ETL'],
		image: null, // Placeholder: agregar screenshot del dashboard
		links: [
			{ label: 'Dashboard', url: '#' }
		]
	},
	{
		title: 'ETL Automation Pipeline',
		problem: 'Procesamiento manual de datos de múltiples fuentes, con limpieza de datos inconsistente y consolidación tardía en la BD.',
		solution: 'Pipeline ETL en Python con Apache Airflow. Automatización end-to-end: extracción, transformación, validación, carga.',
		impact: 'Procesa 10,000+ registros diarios sin intervención. Reducción del 80% en errores de datos. Mejora en tiempo de disponibilidad de datos.',
		stack: ['Python', 'Pandas', 'SQL', 'Apache Airflow', 'PostgreSQL'],
		image: null, // Placeholder: agregar screenshot del pipeline corriendo
		links: [
			{ label: 'GitHub Repo', url: '#' }
		]
	},
	{
		title: 'Windows 98 Portfolio',
		problem: 'Portafolios estándar no reflejan personalidad técnica ni creatividad en el desarrollo web moderno.',
		solution: 'Portafolio interactivo con estética Windows 98. Ventanas arrastrables/redimensionables, Paint integrado, componentes Svelte reutilizables.',
		impact: 'Diferencial visual +200% en recordación. Demuestra conocimiento de Svelte, SvelteKit, CSS avanzado y gestión de estado.',
		stack: ['Svelte', 'SvelteKit', 'JavaScript', 'CSS', 'Vite'],
		image: null, // Placeholder: agregar screenshot del portfolio
		links: [
			{ label: 'GitHub Repo', url: 'https://github.com/Quirogama/Quirogama.github.io' },
			{ label: 'Deploy', url: 'https://quirogama.github.io' }
		]
	},
	{
		title: 'Predictive Analysis Model',
		problem: 'Necesidad de prever tendencias en datos históricos para toma de decisiones estratégicas sin modelos estadísticos formales.',
		solution: 'Modelo de Machine Learning con scikit-learn. Análisis exploratorio con Pandas. Visualizaciones comparativas de predictores.',
		impact: 'Precisión del 78% en predicciones. Identificación de 3 patrones clave no visibles en análisis manual.',
		stack: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'NumPy'],
		image: null, // Placeholder: agregar screenshot del notebook o gráficos
		links: [
			{ label: 'GitHub Repo', url: '#' },
			{ label: 'Notebook', url: '#' }
		]
	}
];

// Tamaños por defecto de ventanas según tipo (evita números mágicos)
export const WINDOW_SIZES = {
	about: { width: 860, height: 600 },
	pdf: { width: 700, height: 600 },
	projects: { width: 750, height: 550 },
	paint: { width: 700, height: 410 },
	calc: { width: 360, height: 390 },
	default: { width: 520, height: 360 }
};

// Constantes de posicionamiento de ventanas
export const WINDOW_OFFSET = 30; // Offset para cada nueva ventana
export const WINDOW_INITIAL_X = 100;
export const WINDOW_INITIAL_Y = 100;
