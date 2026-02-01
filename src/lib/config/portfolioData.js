// ============================================================================
// PORTFOLIO DATA - CENTRALIZADO
// Fuente única de verdad para contenido que reutilizan ambas versiones:
// - Versión retro (Windows 98)
// - Versión moderna (landing profesional)
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────
// INFORMACIÓN PERSONAL & CONTACTO
// ─────────────────────────────────────────────────────────────────────────

export const PERSONAL_INFO = {
	name: 'Andrés Quiroga',
	title: 'Ingeniero de Sistemas | Especialista en Datos y Desarrollo',
	location: 'Bogotá, Colombia',
	email: 'quirogama@javeriana.edu.co',
	bio: 'Desarrollador fullstack de Colombia con experiencia en automatización de datos y análisis. 4 meses en Pontificia Universidad Javeriana trabajando en ETL, dashboards y soluciones web. Resuelvo problemas complejos combinando frontend interactivo con lógica de datos robusta.',
	summary: 'Especializado en análisis de datos, automatización y desarrollo web. Disponible para proyectos de Data Analysis, BI, Web Development o Data Science.',
	aboutMe: 'Estudiante de Ingeniería de Sistemas apasionado por convertir datos complejos en soluciones prácticas. Me motiva construir herramientas que realmente impacten, desde dashboards analíticos hasta aplicaciones web interactivas.'
};

export const SOFT_SKILLS = [
	'Resolución creativa de problemas',
	'Adaptabilidad',
	'Trabajo en equipo',
	'Aprendizaje continuo',
	'Comunicación efectiva',
	'Pensamiento analítico',
	'Atención al detalle'
];

export const SOCIAL_LINKS = {
	github: 'https://github.com/Quirogama',
	linkedin: 'https://www.linkedin.com/in/quirogama/'
};

export const CONTACT_TEXT = `Contacto

📧 Email: ${PERSONAL_INFO.email}
🔗 GitHub: ${SOCIAL_LINKS.github}
💼 LinkedIn: ${SOCIAL_LINKS.linkedin}
📍 ${PERSONAL_INFO.location}

${PERSONAL_INFO.summary}`;

// ─────────────────────────────────────────────────────────────────────────
// SKILLS / HABILIDADES TÉCNICAS
// ─────────────────────────────────────────────────────────────────────────

export const SKILLS = {
	languages: ['Python', 'SQL', 'JavaScript', 'Java'],
	frontend: ['Svelte', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
	backend: ['Python', 'Node.js'],
	dataTools: ['Pandas', 'Power BI', 'Matplotlib', 'Seaborn'],
	databases: ['SQL Server', 'PostgreSQL', 'MongoDB'],
	tools: ['Git', 'GitHub', 'AWS', 'Jupyter', 'Excel']
};

// Versión flat para más fácil iterar (usado en landing moderno)
export const SKILLS_FLAT = [
	'Python',
	'SQL',
	'JavaScript',
	'Svelte',
	'Power BI',
	'Pandas',
	'HTML/CSS',
	'Git',
	'PostgreSQL',
	'Bootstrap',
	'AWS',
	'Node.js'
];

// Habilidades con niveles de proficiencia (para progress bars)
export const SKILLS_WITH_LEVELS = [
	{ name: 'Python', level: 85, category: 'language' },
	{ name: 'SQL', level: 80, category: 'language' },
	{ name: 'JavaScript', level: 75, category: 'language' },
	{ name: 'Power BI', level: 90, category: 'data' },
	{ name: 'Pandas', level: 80, category: 'data' },
	{ name: 'Svelte', level: 70, category: 'frontend' },
	{ name: 'HTML/CSS', level: 85, category: 'frontend' },
	{ name: 'PostgreSQL', level: 75, category: 'database' },
	{ name: 'Git', level: 80, category: 'tool' },
	{ name: 'AWS', level: 60, category: 'tool' }
];

// ─────────────────────────────────────────────────────────────────────────
// PROYECTOS (casos de estudio)
// ─────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
	{
		id: 'analytics-dashboard',
		title: 'Analytics Dashboard',
		description: 'Dashboard interactivo en Power BI con análisis histórico de practicantes universitarios. Incluye visualizaciones de tendencias desde 2008 hasta 2025 con filtros dinámicos.',
		highlight: 'Reducción del 60% en tiempo de análisis',
		stack: ['Power BI', 'SQL', 'ETL'],
		image: null,
		links: []
	},
	{
		id: 'etl-automation',
		title: 'ETL Automation Pipeline',
		description: 'Pipeline automatizado para extracción, transformación y carga de datos. Procesa múltiples fuentes con validaciones automáticas y manejo de errores.',
		highlight: 'Reducción del 80% en errores de datos',
		stack: ['Python', 'Pandas', 'SQL', 'PostgreSQL'],
		image: null,
		links: []
	},
	{
		id: 'windows98-portfolio',
		title: 'Windows 98 Portfolio',
		description: 'Portafolio interactivo con estética nostálgica de Windows 98. Incluye ventanas arrastrables, Paint funcional, Calculadora, Snake y Buscaminas. Arquitectura modular con componentes Svelte.',
		highlight: 'Experiencia de usuario única y memorable',
		stack: ['Svelte', 'SvelteKit', 'JavaScript', 'CSS'],
		image: null,
		links: [
			{ label: 'GitHub', url: 'https://github.com/Quirogama/Quirogama.github.io' },
			{ label: 'Ver Demo', url: 'https://quirogama.github.io' }
		]
	},
	{
		id: 'predictive-analysis',
		title: 'Predictive Analysis Model',
		description: 'Modelo de Machine Learning para predicción de tendencias en datos históricos. Incluye análisis exploratorio, feature engineering y visualizaciones interactivas.',
		highlight: 'Precisión del 78% en predicciones',
		stack: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
		image: null,
		links: []
	},
	{
		id: 'pawcare',
		title: 'PawCare - Sistema Veterinario',
		description: 'Sistema integral para gestión veterinaria con roles diferenciados. Incluye CRUDs completos, dashboards analíticos, autenticación JWT y administración de citas y servicios.',
		highlight: 'Arquitectura fullstack escalable',
		stack: ['Angular', 'Spring Boot', 'TypeScript', 'Bootstrap'],
		image: '/icons/pawcare.png',
		links: [
			{ label: 'Backend', url: 'https://github.com/Quirogama/PAW-CARE-SPRINGBOOT' },
			{ label: 'Frontend', url: 'https://github.com/Quirogama/PAW-CARE-ANGULAR' }
		]
	}
];

// ─────────────────────────────────────────────────────────────────────────
// EXPERIENCIA LABORAL
// ─────────────────────────────────────────────────────────────────────────

export const EXPERIENCES = [
	{
		id: 'puj-analyst',
		position: 'Analista de Datos',
		company: 'Pontificia Universidad Javeriana - Departamento de Proyectos Sociales Universitarios',
		dates: 'Agosto 2025 - Noviembre 2025',
		duration: '4 meses',
		description: 'Análisis y limpieza de base de datos de practicantes. Creación de dashboard interactivo en Power BI para visualización histórica de participación de practicantes.',
		achievements: [
			'Reduje base de datos de 114 registros a 21 registros válidos (81.6% de datos limpios)',
			'Creé dashboard interactivo en Power BI con análisis de practicantes desde 2008 hasta 2025',
			'Implementé validaciones de datos y documenté procesos de limpieza',
			'Presenté insights visuales a stakeholders del departamento'
		],
		technologies: ['Power BI', 'SQL', 'Excel', 'DAX', 'Análisis de Datos'],
		image: '/icons/javeriana.png'
	}
];

// ─────────────────────────────────────────────────────────────────────────
// EDUCACIÓN
// ─────────────────────────────────────────────────────────────────────────

export const EDUCATION = [
	{
		degree: 'Ingeniería de Sistemas',
		institution: 'Pontificia Universidad Javeriana',
		period: '2022-2026',
		status: 'En curso',
		details: 'Formación en desarrollo de software, bases de datos y sistemas distribuidos.'
	}
];

// ─────────────────────────────────────────────────────────────────────────
// INTERESES & GOALS PROFESIONALES
// ─────────────────────────────────────────────────────────────────────────

export const PROFESSIONAL_INTERESTS = {
	roles: ['Fullstack Development', 'Data Engineering', 'BI', 'ETL'],
	focus: 'Combinar frontend interactivo con lógica de datos robusta',
	openTo: ['Full-time', 'Proyectos', 'Colaboraciones'],
	interests: ['Full-stack development', 'Data-driven solutions', 'Automatización', 'UX interactiva']
};

// ─────────────────────────────────────────────────────────────────────────
// ABOUT TEXT (para versión retro Windows 98)
// ─────────────────────────────────────────────────────────────────────────

export const ABOUT_TEXT_RETRO = `_____________________________________________________

Hola, bienvenido a mi portafolio estilo Windows 98!

_____________________________________________________

¿Quién soy?

${PERSONAL_INFO.bio}

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
🔬 Intereses: ${PROFESSIONAL_INTERESTS.interests.join(', ')}

__________________________________________________________________________________

Me interesa
Roles en ${PROFESSIONAL_INTERESTS.roles.join(', ')} donde pueda ${PROFESSIONAL_INTERESTS.focus}. Abierto a ${PROFESSIONAL_INTERESTS.openTo.join(', ')}.`;

export const ABOUT_TITLE_RETRO = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`;

// ─────────────────────────────────────────────────────────────────────────
// ESTADÍSTICAS / MÉTRICAS (para sección Stats)
// ─────────────────────────────────────────────────────────────────────────

export const STATS = [
	{
		value: 114,
		suffix: '',
		label: 'Registros Analizados',
		icon: '📊'
	},
	{
		value: 81,
		suffix: '%',
		label: 'Precisión en Limpieza',
		icon: '✨'
	},
	{
		value: 4,
		suffix: '',
		label: 'Meses de Experiencia',
		icon: '💼'
	},
	{
		value: 5,
		suffix: '',
		label: 'Proyectos Desarrollados',
		icon: '🚀'
	}
];

// ─────────────────────────────────────────────────────────────────────────
// OBJETO CONSOLIDADO (para acceso fácil)
// ─────────────────────────────────────────────────────────────────────────

export const portfolioData = {
	personal: PERSONAL_INFO,
	social: SOCIAL_LINKS,
	skills: SKILLS,
	skillsFlat: SKILLS_FLAT,
	skillsWithLevels: SKILLS_WITH_LEVELS,
	projects: PROJECTS,
	experiences: EXPERIENCES,
	education: EDUCATION,
	stats: STATS,
	interests: PROFESSIONAL_INTERESTS,
	aboutRetro: ABOUT_TEXT_RETRO,
	contactText: CONTACT_TEXT
};
