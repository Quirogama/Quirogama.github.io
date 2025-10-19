import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.B1JJanJX.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Gh2S5eGj.js","_app/immutable/chunks/D5_2jSvg.js","_app/immutable/chunks/CS-ZYib0.js","_app/immutable/chunks/CpW7Jdrt.js"];
export const stylesheets = ["_app/immutable/assets/Taskbar.9pw2niHH.css"];
export const fonts = [];
