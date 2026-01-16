// Configuración centralizada del portafolio (evita duplicación)

// Información del About
export const aboutTitle = 'Andrés Quiroga - Analista de Datos & Desarrollador Junior';

export const aboutText = `Hola, bienvenido a mi portafolio estilo Windows 98!

¿Quién soy?

Desarrollador fullstack de Colombia con experiencia en automatización de datos y análisis. 4 meses en Pontificia Universidad Javeriana trabajando en ETL, dashboards y soluciones web. Resuelvo problemas complejos combinando frontend interactivo con lógica de datos robusta.

Stack Técnico
Frontend: Svelte | JavaScript | SvelteKit | HTML/CSS | Vite
Backend/Data: Python | SQL | Pandas | NumPy | Apache Airflow
Análisis: Power BI | DAX | Análisis exploratorio
Bases de datos: PostgreSQL | SQL optimizado

Lo que he hecho
→ Desarrollé dashboards BI que redujeron tiempo de análisis manual en 60%
→ Automaticé pipeline ETL que procesa 10k+ registros diarios sin intervención
→ Construí este portfolio interactivo (Svelte, componentes avanzados, gestión de estado)
→ Implementé Paint, Calculadora, Tetris, Buscaminas — demostrando lógica de juegos y UI interactiva

Educación & Contexto
🎓 Ingeniería de Sistemas — Pontificia Universidad Javeriana (2022-2026)
💼 Experiencia como Analista de Datos — PUJ (4 meses, 2025)
🔬 Intereses: Full-stack development, data-driven solutions, automatización, UX interactiva

Me interesa
Roles en Fullstack Development, Data Engineering, BI, o ETL donde pueda combinar frontend + backend. Abierto a full-time, proyectos o colaboraciones.`;

// Proyectos (casos de estudio)
export const projects = [
	{
		title: 'Analytics Dashboard',
		problem: 'Reportes manuales semanales consumían 8 horas de análisis repetitivo y estaban sujetos a errores humanos.',
		solution: 'Dashboard interactivo en Power BI con actualizaciones automáticas. Consultas SQL optimizadas y DAX para cálculos complejos.',
		impact: 'Reducción del 60% en tiempo de análisis. Reportes generados automáticamente. Decisiones más rápidas basadas en datos en tiempo real.',
		stack: ['Power BI', 'SQL', 'DAX', 'ETL'],
		image: null, // Placeholder: agregar screenshot del dashboard
		links: []
	},
	{
		title: 'ETL Automation Pipeline',
		problem: 'Procesamiento manual de datos de múltiples fuentes, con limpieza de datos inconsistente y consolidación tardía en la BD.',
		solution: 'Pipeline ETL en Python con Apache Airflow. Automatización end-to-end: extracción, transformación, validación, carga.',
		impact: 'Procesa 10,000+ registros diarios sin intervención. Reducción del 80% en errores de datos. Mejora en tiempo de disponibilidad de datos.',
		stack: ['Python', 'Pandas', 'SQL', 'Apache Airflow', 'PostgreSQL'],
		image: null, // Placeholder: agregar screenshot del pipeline corriendo
		links: []
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
		links: []
	}
];

// Tamaños por defecto de cada ventana 
export const WINDOW_SIZES = {
	about: { width: 850, height: 580 },
	pdf: { width: 700, height: 600 },
	projects: { width: 750, height: 550 },
	paint: { width: 640, height: 410 },
	calc: { width: 260, height: 390 },
	default: { width: 520, height: 360 }
};

// Constantes de posicionamiento de ventanas
// Constantes de posicionamiento de ventanas
export const WINDOW_OFFSET = 30; // Offset para cada nueva ventana
export const WINDOW_INITIAL_X = 100;
export const WINDOW_INITIAL_Y = 100;

// Helper para gestionar z-index sin duplicación de lógica
export function getNextZIndex(windows) {
	return Math.max(...windows.map(w => w.z ?? 0), 0) + 1;
}

// Metadatos centralizados de todas las aplicaciones (única fuente de verdad)
// NO se usa aún en Desktop/Taskbar/+layout, es preparación para Fase 3
export const APPS = {
	about: {
		id: 'about',
		label: 'Sobre Mí',
		icon: '/icons/sobremi.png',
		componentType: 'about',
		showInDesktop: true,
		showInStartMenu: true,
		desktopPosition: { x: 16, y: 16 }
	},
	projects: {
		id: 'projects',
		label: 'Proyectos',
		icon: '/icons/proyectos.png',
		componentType: 'projects',
		showInDesktop: true,
		showInStartMenu: true,
		desktopPosition: { x: 16, y: 236 },
		componentProps: { projects }
	},
	paint: {
		id: 'paint',
		label: 'Paint',
		icon: '/icons/paint.png',
		componentType: 'paint',
		showInDesktop: true,
		showInStartMenu: true,
		desktopPosition: { x: 16, y: 456 }
	},
	contact: {
		id: 'contact',
		label: 'Contacto',
		icon: '/icons/contacto.png',
		showInDesktop: true,
		showInStartMenu: true,
		desktopPosition: { x: 134, y: 126 }
	},
	calc: {
		id: 'calc',
		label: 'Calculadora',
		icon: '/icons/calc.png',
		componentType: 'calc',
		showInDesktop: true,
		showInStartMenu: false,
		desktopPosition: { x: 134, y: 346 }
	},
	gallery: {
		id: 'gallery',
		label: 'Galería',
		icon: '/icons/gallery.png',
		componentType: 'gallery',
		showInDesktop: true,
		showInStartMenu: false,
		desktopPosition: { x: 252, y: 16 }
	},
	tetris: {
		id: 'tetris',
		label: 'Tetris',
		icon: '/icons/tetris.png',
		componentType: 'tetris',
		showInDesktop: true,
		showInStartMenu: false,
		desktopPosition: { x: 252, y: 236 }
	},
	minesweeper: {
		id: 'minesweeper',
		label: 'Buscaminas',
		icon: '/icons/minesweeper.png',
		componentType: 'minesweeper',
		showInDesktop: true,
		showInStartMenu: false,
		desktopPosition: { x: 252, y: 346 }
	},
	cv: {
		id: 'cv',
		label: 'Currículum',
		icon: '/icons/cv.png',
		componentType: 'pdf',
		showInDesktop: true,
		showInStartMenu: true,
		desktopPosition: { x: 16, y: 126 },
		componentProps: { src: '/cv.pdf' }
	},
	github: {
		id: 'github',
		label: 'GitHub',
		icon: '/icons/github.png',
		showInDesktop: true,
		showInStartMenu: false,
		desktopPosition: { x: 16, y: 346 },
		externalUrl: 'https://github.com/Quirogama'
	},
	linkedin: {
		id: 'linkedin',
		label: 'LinkedIn',
		icon: '/icons/linkedin.png',
		showInDesktop: true,
		showInStartMenu: false,
		desktopPosition: { x: 134, y: 16 },
		externalUrl: 'https://www.linkedin.com/in/quirogama/'
	}
};
