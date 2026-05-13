// ============================================================================
// EXPORTS CENTRALIZADOS - $lib alias
// ============================================================================
// Importa desde módulos organizados y re-exporta para acceso fácil
// Uso: import { safeEval, playUiClick } from '$lib'

// 📊 DATA & CONFIG
export { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCES } from './config/portfolioData.js';
export {
	APPS,
	WINDOW_SIZES,
	WINDOW_OFFSET,
	WINDOW_INITIAL_X,
	WINDOW_INITIAL_Y,
	aboutTitle,
	aboutText,
	projects,
	experiences
} from './retro/config/windowsConfig.js';

// 🛠️ UTILITIES
export { safeEval } from './utils/mathParser.js';

// 🔊 AUDIO
export {
	playUiClick,
	playUiOpen,
	playUiClose,
	playSnakeEat,
	playSnakeCrash,
	playMinesweeperFlag,
	playMinesweeperLose,
	playMinesweeperWin
} from './retro/config/retroAudio.js';
