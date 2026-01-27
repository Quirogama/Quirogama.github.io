// Configuración centralizada del portafolio (evita duplicación entre componentes)

// Información de contacto y redes sociales
export const CONTACT_EMAIL = 'quirogama@javeriana.edu.co';
export const SOCIAL_LINKS = {
	github: 'https://github.com/Quirogama',
	linkedin: 'https://www.linkedin.com/in/quirogama/'
};

export const CONTACT_TEXT = `Contacto

📧 Email: ${CONTACT_EMAIL}
🔗 GitHub: ${SOCIAL_LINKS.github}
💼 LinkedIn: ${SOCIAL_LINKS.linkedin}
📍 Bogotá, Colombia

Especializado en análisis de datos, automatización y desarrollo web. Disponible para proyectos de Data Analysis, BI, Web Development o Data Science.`;

// Texto del About Me
export const aboutTitle = 'Andrés Quiroga - Analista de Datos & Desarrollador Junior';

export const aboutText = `_____________________________________________________

Hola, bienvenido a mi portafolio estilo Windows 98!

_____________________________________________________

¿Quién soy?

Desarrollador fullstack de Colombia con experiencia en automatización de datos y análisis. 4 meses en Pontificia Universidad Javeriana trabajando en ETL, dashboards y soluciones web. Resuelvo problemas complejos combinando frontend interactivo con lógica de datos robusta.

_____________________________________________________

Lo que he hecho
→ Desarrollé dashboards BI que redujeron tiempo de análisis manual en 60%
→ Automaticé pipeline ETL que procesa 10k+ registros diarios sin intervención
→ Construí este portfolio interactivo (Svelte, componentes avanzados, gestión de estado)
→ Implementé Paint, Calculadora, Snake, Buscaminas — demostrando lógica de juegos y UI interactiva

__________________________________________________________________________________

Educación & Contexto
🎓 Ingeniería de Sistemas — Pontificia Universidad Javeriana (2022-2026)
💼 Experiencia como Analista de Datos — PUJ (4 meses, 2025)
🔬 Intereses: Full-stack development, data-driven solutions, automatización, UX interactiva

__________________________________________________________________________________

Me interesa
Roles en Fullstack Development, Data Engineering, BI, o ETL donde pueda combinar frontend + backend. Abierto a full-time, proyectos o colaboraciones.`;

// Proyectos (casos de estudio)
// Lista de proyectos destacados (cada objeto es un caso de estudio)
export const projects = [
	{
		title: 'Analytics Dashboard',
		problem: 'Reportes manuales semanales consumían 8 horas de análisis repetitivo y estaban sujetos a errores humanos.',
		solution: 'Dashboard interactivo en Power BI con actualizaciones automáticas. Consultas SQL optimizadas y DAX para cálculos complejos.',
		impact: 'Reducción del 60% en tiempo de análisis. Reportes generados automáticamente. Decisiones más rápidas basadas en datos en tiempo real.',
		stack: ['Power BI', 'SQL', 'DAX', 'ETL'],
		links: []
	},
	{
		title: 'ETL Automation Pipeline',
		problem: 'Procesamiento manual de datos de múltiples fuentes, con limpieza de datos inconsistente y consolidación tardía en la BD.',
		solution: 'Pipeline ETL en Python con Apache Airflow. Automatización end-to-end: extracción, transformación, validación, carga.',
		impact: 'Procesa 10,000+ registros diarios sin intervención. Reducción del 80% en errores de datos. Mejora en tiempo de disponibilidad de datos.',
		stack: ['Python', 'Pandas', 'SQL', 'Apache Airflow', 'PostgreSQL'],
		links: []
	},
	{
		title: 'Windows 98 Portfolio',
		problem: 'Portafolios estándar no reflejan personalidad técnica ni creatividad en el desarrollo web moderno.',
		solution: 'Portafolio interactivo con estética Windows 98. Ventanas arrastrables/redimensionables, Paint integrado, componentes Svelte reutilizables.',
		impact: 'Diferencial visual +200% en recordación. Demuestra conocimiento de Svelte, SvelteKit, CSS avanzado y gestión de estado.',
		stack: ['Svelte', 'SvelteKit', 'JavaScript', 'CSS', 'Vite'],
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
	},
	{
		title: 'PawCare - Sistema Veterinario',
		problem: 'Necesidad de un sistema integral para gestionar clientes, mascotas, citas y servicios en una veterinaria con diferenciación entre roles de cliente y administrador.',
		solution: 'Plataforma web completa con CRUDs para gestión de mascotas, clientes y citas. Dashboards de estadísticas para administradores. Sistema de autenticación diferenciado con login de cliente y administrador. Interfaz intuitiva basada en Bootstrap.',
		impact: 'Centraliza la información de la veterinaria. Mejora la experiencia del cliente con acceso a su historial de mascotas. Facilita la administración con dashboards analíticos de citas y servicios.',
		stack: ['Angular', 'Bootstrap', 'TypeScript', 'HTTP Client'],
		image: '/icons/pawcare.png',
		links: [
			{ label: 'Backend (Spring Boot)', url: 'https://github.com/Quirogama/PAW-CARE-SPRINGBOOT' },
			{ label: 'Frontend (Angular)', url: 'https://github.com/Quirogama/PAW-CARE-ANGULAR' }
		]
	}
];

// Experiencia laboral
// Experiencia laboral (array para permitir múltiples entradas en el futuro)
export const experiences = [
	{
		position: 'Analista de Datos',
		company: 'Pontificia Universidad Javeriana - Departamento de Proyectos Sociales Universitarios',
		dates: 'Agosto 2025 - Noviembre 2025 (4 meses)',
		description: 'Análisis y limpieza de base de datos de practicantes. Creación de dashboard interactivo en Power BI para visualización histórica de participación de practicantes.',
		achievements: [
			'Redujo base de datos de 114 registros a 21 registros válidos (81.6% de datos limpios)',
			'Creó dashboard interactivo en Power BI con análisis de practicantes desde 2008 hasta 2025',
			'Implementó validaciones de datos y documentó procesos de limpieza',
			'Presentó insights visuales a stakeholders del departamento'
		],
		technologies: ['Power BI', 'SQL', 'Excel', 'DAX', 'Análisis de Datos'],
		image: '/icons/javeriana.png'
	}
];

// Tamaños por defecto de cada ventana 
// Tamaños por defecto de cada ventana según tipo de app
export const WINDOW_SIZES = {
	about: { width: 850, height: 580 },
	pdf: { width: 700, height: 600 },
	projects: { width: 750, height: 550 },
	experience: { width: 900, height: 650 },
	paint: { width: 640, height: 410 },
	calc: { width: 260, height: 390 },
	snake: { width: 480, height: 620 },
	default: { width: 520, height: 360 }
};

// Offset y posición inicial al abrir nuevas ventanas
export const WINDOW_OFFSET = 30; // Offset para cada nueva ventana
export const WINDOW_INITIAL_X = 100;
export const WINDOW_INITIAL_Y = 100;

// Metadatos centralizados de todas las aplicaciones
// Registro central de apps: íconos, visibilidad y tipo de componente
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
	experience: {
		id: 'experience',
		label: 'Experiencia',
		icon: '/icons/experience.png',
		componentType: 'experience',
		showInDesktop: true,
		showInStartMenu: true,
		desktopPosition: { x: 16, y: 346 }
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
	snake: {
		id: 'snake',
		label: 'Snake',
		icon: '/icons/snake.png',
		componentType: 'snake',
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
		showInDesktop: true,
		showInStartMenu: true,
		desktopPosition: { x: 16, y: 126 },
		downloadUrl: '/cv.pdf',
		downloadFilename: 'Andres_Quiroga_CV.pdf'
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
