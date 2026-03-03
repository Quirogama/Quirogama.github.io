import { describe, expect, it } from 'vitest';
import { APPS, WINDOW_SIZES } from '../src/lib/retro/windowsConfig.js';

describe('retro windows config', () => {
	it('includes core desktop apps', () => {
		expect(APPS.about).toBeDefined();
		expect(APPS.projects).toBeDefined();
		expect(APPS.contact).toBeDefined();
		expect(APPS.about.showInDesktop).toBe(true);
	});

	it('has sizes for critical window types', () => {
		expect(WINDOW_SIZES.about).toBeDefined();
		expect(WINDOW_SIZES.projects).toBeDefined();
		expect(WINDOW_SIZES.experience).toBeDefined();
		expect(WINDOW_SIZES.default).toBeDefined();
	});

	it('can resolve a valid window size for each app that opens a component', () => {
		for (const app of Object.values(APPS)) {
			if (!app.componentType) continue;
			const size = WINDOW_SIZES[app.componentType] || WINDOW_SIZES.default;
			expect(size).toBeDefined();
			expect(size.width).toBeGreaterThan(150);
			expect(size.height).toBeGreaterThan(100);
		}
	});

	it('keeps CV download target configured', () => {
		expect(APPS.cv.downloadUrl).toBe('/cv.pdf');
		expect(APPS.cv.downloadFilename).toContain('CV');
	});
});
