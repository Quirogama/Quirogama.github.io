// Configuración de la versión retro (Windows 98)
// Importa datos centralizados de portfolioData.js
import {
	PERSONAL_INFO,
	SOCIAL_LINKS,
	CONTACT_TEXT,
	PROJECTS,
	EXPERIENCES,
	ABOUT_TEXT_RETRO,
	ABOUT_TITLE_RETRO
} from '../config/portfolioData.js';

// Re-exporta para mantener compatibilidad backward con componentes existentes
export { SOCIAL_LINKS, CONTACT_TEXT };
export const CONTACT_EMAIL = PERSONAL_INFO.email;
export const aboutTitle = ABOUT_TITLE_RETRO;
export const aboutText = ABOUT_TEXT_RETRO;
export const projects = PROJECTS;
export const experiences = EXPERIENCES;

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
