export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/98.css","fonts/OFL.txt","icons/contact.svg","icons/contacto.png","icons/cv.png","icons/cv.svg","icons/github.png","icons/linkedin.png","icons/proyectos.png","robots.txt"]),
	mimeTypes: {".css":"text/css",".txt":"text/plain",".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.VYr02bbP.js",app:"_app/immutable/entry/app.RR2XPkG8.js",imports:["_app/immutable/entry/start.VYr02bbP.js","_app/immutable/chunks/cxH3LUjo.js","_app/immutable/chunks/Gh2S5eGj.js","_app/immutable/entry/app.RR2XPkG8.js","_app/immutable/chunks/Gh2S5eGj.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CpW7Jdrt.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
