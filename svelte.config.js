import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: 'index.html' // si quieres comportamiento SPA para rutas no prerenderizadas
    })
    // NO pongas `prerender: { default: true }` aquí si te da error
  }
};

export default config;
