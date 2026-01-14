// Configuración centralizada de proyectos (evita duplicación)
export const projects = [
	{
		title: 'Analytics Dashboard',
		description: 'Interactive Power BI dashboard that reduced analysis time by ~40%. Real-time metrics tracking with automated data refresh.',
		tech: 'Power BI, SQL, DAX',
		image: null
	},
	{
		title: 'ETL Automation Pipeline',
		description: 'Python-based ETL system processing 10,000+ records daily. Automated data cleaning, transformation, and loading to database.',
		tech: 'Python, Pandas, SQL, Apache Airflow',
		image: null
	},
	{
		title: 'Windows 98 Portfolio',
		description: 'This retro-styled interactive portfolio website. Features draggable windows, taskbar, and classic Windows 98 UI elements.',
		tech: 'Svelte, SvelteKit, JavaScript, CSS',
		image: null
	},
	{
		title: 'Predictive Analysis Model',
		description: 'Machine learning prototype for forecasting trends. Uses regression and classification algorithms with scikit-learn.',
		tech: 'Python, scikit-learn, Pandas, Matplotlib',
		image: null
	}
];

// Tamaños por defecto de ventanas según tipo (evita números mágicos)
export const WINDOW_SIZES = {
	about: { width: 860, height: 600 },
	pdf: { width: 700, height: 600 },
	projects: { width: 650, height: 500 },
	paint: { width: 700, height: 410 },
	calc: { width: 360, height: 390 },
	default: { width: 520, height: 360 }
};

// Constantes de posicionamiento de ventanas
export const WINDOW_OFFSET = 30; // Offset para cada nueva ventana
export const WINDOW_INITIAL_X = 100;
export const WINDOW_INITIAL_Y = 100;
