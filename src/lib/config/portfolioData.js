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
	title: 'Ingeniero de Sistemas | Desarrollador Full-Stack Junior',
	location: 'Bogotá, Colombia',
	email: 'quirogama@javeriana.edu.co',
	bio: 'Desarrollador full‑stack de Colombia con experiencia en backend, frontend y despliegue. He construido aplicaciones con Java/Spring Boot, Angular y Svelte, integrando APIs y bases de datos. Me enfoco en crear soluciones completas con buenas prácticas de ingeniería.',
	summary:
		'Disponible para roles Junior de Full‑Stack, Backend o Frontend, con interés en proyectos de software end‑to‑end.',
	aboutMe:
		'Estudiante de Ingeniería de Sistemas enfocado en desarrollo de software. Me motiva construir productos completos: desde APIs y lógica de negocio hasta interfaces web y despliegue con buenas prácticas.'
};

export const SOFT_SKILLS = [
	'Orientación al logro',
	'Adaptabilidad',
	'Trabajo en equipo',
	'Aprendizaje continuo',
	'Comunicación efectiva',
	'Pensamiento analítico'
];

export const SOCIAL_LINKS = {
	github: 'https://github.com/Quirogama',
	linkedin: 'https://www.linkedin.com/in/quirogama/'
};

// Formspree ID para el formulario de contacto
// Obtén tu ID en https://formspree.io (crea una cuenta gratuita)
export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xjgegrzr';

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
	languages: ['Python', 'C++', 'Java', 'Kotlin', 'SQL', 'JavaScript'],
	frontend: ['Svelte', 'Angular', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
	backend: ['Node.js', 'NestJS', 'Spring Boot', 'Python'],
	dataTools: ['Power BI', 'Matplotlib'],
	databases: ['SQL Server', 'PostgreSQL', 'MongoDB'],
	tools: ['Git', 'GitHub', 'AWS', 'Excel']
};

// Versión flat para más fácil iterar (usado en landing moderno)
export const SKILLS_FLAT = [
	'Python',
	'C++',
	'Java',
	'Kotlin',
	'SQL',
	'JavaScript',
	'Svelte',
	'Angular',
	'Power BI',
	'HTML/CSS',
	'Git',
	'PostgreSQL',
	'Bootstrap',
	'AWS',
	'Node.js',
	'NestJS',
	'Spring Boot'
];

// Habilidades con niveles de proficiencia (para progress bars)
export const SKILLS_WITH_LEVELS = [
	{ name: 'Python', level: 85, category: 'language' },
	{ name: 'Java', level: 90, category: 'language' },
	{ name: 'SQL', level: 65, category: 'language' },
	{ name: 'JavaScript', level: 75, category: 'language' },
	{ name: 'Power BI', level: 90, category: 'data' },
	{ name: 'Svelte', level: 70, category: 'frontend' },
	{ name: 'HTML/CSS', level: 85, category: 'frontend' },
	{ name: 'PostgreSQL', level: 65, category: 'database' },
	{ name: 'Git', level: 80, category: 'tool' },
	{ name: 'AWS', level: 80, category: 'tool' }
];

// ─────────────────────────────────────────────────────────────────────────
// PROYECTOS (casos de estudio)
// ─────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
	{
		id: 'medical-dicom-api-thesis',
		title: 'Tesis: API de Imágenes Médicas DICOM',
		description:
			'API REST para almacenar, consultar y descargar imágenes médicas DICOM, enfocada en estudios transfontanelares de la Fundación Canguro y en el intercambio con terceros/hospitales. Implementa estándares DICOMWeb (STOW-RS, QIDO-RS y WADO-RS) con arquitectura Node.js, SQLite y almacenamiento de archivos en servidor.',
		highlight: 'API DICOMWeb funcional con flujo completo STOW-QIDO-WADO',
		stack: ['Node.js', 'SQLite', 'DICOMWeb'],
		image: '/proyectos/canguro_logo.webp',
		links: [{ label: 'GitHub', url: 'https://github.com/JoseJ1709/ATIM.git' }]
	},
	{
		id: 'riesgo-crediticio-xgboost-shap',
		title: 'Riesgo Crediticio: Scoring IA con XGBoost + SHAP',
		description:
			'Modelo de machine learning para estimar probabilidad de impago en préstamos. Expone API con FastAPI para scoring y explicaciones por predicción con SHAP, priorizando interpretabilidad y decisiones de crédito más confiables.',
		highlight: 'AUC 77.6% en test con explicabilidad SHAP por cliente',
		stack: ['XGBoost', 'SHAP', 'FastAPI', 'Scikit-learn'],
		image: '/proyectos/credito_logo.webp',
		links: [
			{ label: 'GitHub', url: 'https://github.com/Quirogama/Riesgo_Credito.git' },
			{ label: 'Ver Demo', url: 'https://riesgo-credito.onrender.com/demo' }
		]
	},
	{
		id: 'windows98-portfolio',
		title: 'Windows 98 Portfolio',
		description:
			'Portafolio interactivo con estética nostálgica de Windows 98. Incluye ventanas arrastrables, Paint funcional, Calculadora, Snake y Buscaminas. Arquitectura modular con componentes Svelte.',
		highlight: 'Portafolio doble con layout moderno y retro',
		stack: ['Svelte', 'SvelteKit', 'JavaScript', 'CSS'],
		image: '/proyectos/windows_logo.webp',
		links: [
			{ label: 'GitHub', url: 'https://github.com/Quirogama/Quirogama.github.io' },
			{ label: 'Ver Demo', url: 'https://quirogama.github.io' }
		]
	},
	{
		id: 'pawcare',
		title: 'PawCare - Sistema Veterinario',
		description:
			'Sistema integral para gestión veterinaria con roles diferenciados. Incluye CRUDs completos, dashboards analíticos, autenticación JWT y administración de citas y servicios.',
		highlight: 'Arquitectura fullstack escalable',
		stack: ['Angular', 'Spring Boot', 'TypeScript', 'Bootstrap'],
		image: '/proyectos/pawcare_logo.webp',
		links: [
			{ label: 'Backend', url: 'https://github.com/Quirogama/PAW-CARE-SPRINGBOOT' },
			{ label: 'Frontend', url: 'https://github.com/Quirogama/PAW-CARE-ANGULAR' }
		]
	},
	{
		id: 'analytics-dashboard',
		title: 'Análisis de Datos - Universidad Javeriana',
		description:
			'Proyecto de análisis de datos en la Pontificia Universidad Javeriana. Incluyó limpieza y depuración de información histórica de practicantes, estructuración de indicadores y construcción de dashboard en Power BI con tendencias 2008-2025, segmentación por variables clave y apoyo a la toma de decisiones del área.',
		highlight: 'Proyecto aplicado durante 4 meses de experiencia en análisis de datos',
		stack: ['Power BI', 'SQL', 'ETL'],
		image: '/proyectos/javeriana_logo.webp',
		links: []
	},
	{
		id: 'walkypet-mobile',
		title: 'WalkyPet - App Móvil para Paseos',
		description:
			'Aplicación móvil enfocada en mejorar la experiencia de paseo con mascotas. Permite crear rutas, realizar seguimiento durante recorridos y explorar puntos de interés para dueños de mascotas.',
		highlight: 'Proyecto móvil colaborativo con enfoque en rutas y geolocalización',
		stack: ['Kotlin', 'Firebase', 'OpenStreetMap', 'Android'],
		image: '/proyectos/walkypet_logo.webp',
		links: [{ label: 'GitHub', url: 'https://github.com/PUJ-ICM-13190/Walkypet.git' }]
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
		description:
			'Análisis y limpieza de base de datos de practicantes. Creación de dashboard interactivo en Power BI para visualización histórica de participación de practicantes.',
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

export const CERTIFICATIONS = [
	{
		id: 'iddi-liderazgo-filosofico-2026',
		name: 'Liderazgo Filosófico',
		issuer: 'IDDI - International Lean Six Sigma Group',
		year: 'Abril 2026',
		duration: '3 horas',
		credentialType: 'Certificado de culminación',
		url: '/certificados/Certificado%20Liderazgo%20Lean%20Sigma.pdf'
	},
	{
		id: 'bigschool-ciberseguridad-hacking-etico-2026',
		name: 'Ciberseguridad y Hacking Ético',
		issuer: 'BIG school',
		year: 'Abril 2026',
		duration: '6 horas',
		credentialType: 'Certificado de asistencia',
		url: '/certificados/Certificado%20Ciberseguridad.pdf'
	},
	{
		id: 'daxus-powerbi-ia-2025',
		name: 'Acelerador de Carrera con Power BI + IA',
		issuer: 'Daxus LATAM',
		year: 'Noviembre 2025',
		duration: '8 horas',
		credentialType: 'Certificado de participación',
		url: '/certificados/Certificado%20Power%20BI.pdf'
	}
];

// ─────────────────────────────────────────────────────────────────────────
// INTERESES & GOALS PROFESIONALES
// ─────────────────────────────────────────────────────────────────────────

export const PROFESSIONAL_INTERESTS = {
	roles: ['Fullstack Development', 'Backend Development', 'Frontend Development'],
	focus: 'construir soluciones end‑to‑end con buenas prácticas de ingeniería',
	openTo: ['Full-time', 'Proyectos', 'Colaboraciones'],
	interests: [
		'Full-stack development',
		'Backend/APIs',
		'Frontend/UI',
		'DevOps básico',
		'Automatización'
	]
};

export const CONTENT_SECTIONS = {
	hero: {
		lead:
			'Desarrollador full‑stack junior enfocado en backend y soluciones end‑to‑end. Cuento con experiencia en backend, frontend y despliegue. He construido aplicaciones con Java/Spring Boot, Angular y Svelte, integrando APIs y bases de datos. Actualmente busco seguir fortaleciendo mi experiencia en ingeniería de software con proyectos reales de producto.'
	},
	about: {
		intro: PERSONAL_INFO.aboutMe,
		focus:
			'Me interesa trabajar en construir soluciones end‑to‑end con buenas prácticas de ingeniería, creando soluciones completas desde la lógica de negocio hasta la interfaz.',
		highlights: [
			'Desarrollé una plataforma veterinaria full‑stack (Spring Boot + Angular + PostgreSQL) con roles y CRUD',
			'Construí una app móvil en Kotlin con geolocalización y Google Maps para rutas y ETA',
			'Creé este portafolio interactivo en Svelte con ventanas, apps retro y estado reactivo',
			'He trabajado con datos cuando el proyecto lo requiere (dashboards y automatización)'
		]
	}
};

// ─────────────────────────────────────────────────────────────────────────
// ABOUT TEXT (para versión retro Windows 98)
// ─────────────────────────────────────────────────────────────────────────

export const ABOUT_TEXT_RETRO = `_____________________________________________________

Hola, bienvenido a mi portafolio estilo Windows 98!

_____________________________________________________

¿Quién soy?

${CONTENT_SECTIONS.about.intro}


_____________________________________________________

Lo que he hecho
${CONTENT_SECTIONS.about.highlights.map((item) => `→ ${item}`).join('\n')}

_____________________________________________________

Habilidades blandas
${SOFT_SKILLS.map((skill) => `• ${skill}`).join('\n')}

__________________________________________________________________________________

Educación & Contexto
Ingeniería de Sistemas — Pontificia Universidad Javeriana (2022-2026)
Experiencia como Analista de Datos — PUJ (4 meses, 2025)
Intereses: ${PROFESSIONAL_INTERESTS.interests.join(', ')}

__________________________________________________________________________________

Me interesa
Roles en ${PROFESSIONAL_INTERESTS.roles.join(', ')} donde pueda ${CONTENT_SECTIONS.about.focus}. Abierto a ${PROFESSIONAL_INTERESTS.openTo.join(', ')}.`;

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
		icon: '✓'
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
	certifications: CERTIFICATIONS,
	stats: STATS,
	interests: PROFESSIONAL_INTERESTS,
	contentSections: CONTENT_SECTIONS,
	aboutRetro: ABOUT_TEXT_RETRO,
	contactText: CONTACT_TEXT
};
