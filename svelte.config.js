import adapter from '@sveltejs/adapter-static';

const outputDir = process.env.SITE_OUTPUT_DIR || 'docs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: outputDir,
			assets: outputDir,
			fallback: undefined,
			strict: true
		}),
		paths: {
			base: '',
			relative: false
		}
	}
};

export default config;
