import { describe, expect, it } from 'vitest';
import {
	EXPERIENCES,
	FORMSPREE_ID,
	PERSONAL_INFO,
	PROJECTS,
	SKILLS_WITH_LEVELS
} from '../src/lib/config/portfolioData.js';

describe('portfolioData', () => {
	it('has required personal info fields', () => {
		expect(PERSONAL_INFO.name).toBeTruthy();
		expect(PERSONAL_INFO.title).toBeTruthy();
		expect(PERSONAL_INFO.email).toContain('@');
	});

	it('has a valid Formspree ID configured', () => {
		expect(typeof FORMSPREE_ID).toBe('string');
		expect(FORMSPREE_ID.length).toBeGreaterThanOrEqual(6);
	});

	it('has projects with unique IDs and minimum fields', () => {
		const ids = PROJECTS.map((project) => project.id);
		const uniqueIds = new Set(ids);

		expect(uniqueIds.size).toBe(ids.length);
		expect(PROJECTS.length).toBeGreaterThan(0);

		for (const project of PROJECTS) {
			expect(project.title).toBeTruthy();
			expect(project.description).toBeTruthy();
			expect(Array.isArray(project.stack)).toBe(true);
			expect(project.stack.length).toBeGreaterThan(0);
		}
	});

	it('has at least one experience and at least one skill level', () => {
		expect(EXPERIENCES.length).toBeGreaterThan(0);
		expect(SKILLS_WITH_LEVELS.length).toBeGreaterThan(0);
	});
});
