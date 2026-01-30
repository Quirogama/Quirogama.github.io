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
	title: 'Analista de Datos & Desarrollador Junior',
	location: 'Bogotá, Colombia',
	email: 'quirogama@javeriana.edu.co',
	bio: 'Desarrollador fullstack de Colombia con experiencia en automatización de datos y análisis. 4 meses en Pontificia Universidad Javeriana trabajando en ETL, dashboards y soluciones web. Resuelvo problemas complejos combinando frontend interactivo con lógica de datos robusta.',
	summary: 'Especializado en análisis de datos, automatización y desarrollo web. Disponible para proyectos de Data Analysis, BI, Web Development o Data Science.'
};

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

// ─────────────────────────────────────────────────────────────────────────
// PROYECTOS (casos de estudio)
// ─────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
	{
		id: 'analytics-dashboard',
		title: 'Analytics Dashboard',
		problem: 'Reportes manuales semanales consumían 8 horas de análisis repetitivo y estaban sujetos a errores humanos.',
		solution: 'Dashboard interactivo en Power BI con actualizaciones automáticas. Consultas SQL optimizadas y DAX para cálculos complejos.',
		impact: 'Reducción del 60% en tiempo de análisis. Reportes generados automáticamente. Decisiones más rápidas basadas en datos en tiempo real.',
		stack: ['Power BI', 'SQL', 'ETL'],
		image: null,
		links: []
	},
	{
		id: 'etl-automation',
		title: 'ETL Automation Pipeline',
		problem: 'Procesamiento manual de datos de múltiples fuentes, con limpieza de datos inconsistente y consolidación tardía en la BD.',
		solution: 'Pipeline ETL en Python con Apache Airflow. Automatización end-to-end: extracción, transformación, validación, carga.',
		impact: 'Procesa 10,000+ registros diarios sin intervención. Reducción del 80% en errores de datos. Mejora en tiempo de disponibilidad de datos.',
		stack: ['Python', 'Pandas', 'SQL', 'Apache Airflow', 'PostgreSQL'],
		image: null,
		links: []
	},
	{
		id: 'windows98-portfolio',
		title: 'Windows 98 Portfolio',
		problem: 'Portafolios estándar no reflejan personalidad técnica ni creatividad en el desarrollo web moderno.',
		solution: 'Portafolio interactivo con estética Windows 98. Ventanas arrastrables/redimensionables, Paint integrado, componentes Svelte reutilizables.',
		impact: 'Diferencial visual +200% en recordación. Demuestra conocimiento de Svelte, SvelteKit, CSS avanzado y gestión de estado.',
		stack: ['Svelte', 'SvelteKit', 'JavaScript', 'CSS', 'Vite'],
		image: null,
		links: [
			{ label: 'GitHub Repo', url: 'https://github.com/Quirogama/Quirogama.github.io' },
			{ label: 'Deploy', url: 'https://quirogama.github.io' }
		]
	},
	{
		id: 'predictive-analysis',
		title: 'Predictive Analysis Model',
		problem: 'Necesidad de prever tendencias en datos históricos para toma de decisiones estratégicas sin modelos estadísticos formales.',
		solution: 'Modelo de Machine Learning con scikit-learn. Análisis exploratorio con Pandas. Visualizaciones comparativas de predictores.',
		impact: 'Precisión del 78% en predicciones. Identificación de 3 patrones clave no visibles en análisis manual.',
		stack: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'NumPy'],
		image: null,
		links: []
	},
	{
		id: 'pawcare',
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
			'Redujo base de datos de 114 registros a 21 registros válidos (81.6% de datos limpios)',
			'Creó dashboard interactivo en Power BI con análisis de practicantes desde 2008 hasta 2025',
			'Implementó validaciones de datos y documentó procesos de limpieza',
			'Presentó insights visuales a stakeholders del departamento'
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
