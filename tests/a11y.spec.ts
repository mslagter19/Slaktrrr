import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/*
 * Toegankelijkheid: elke pagina moet zonder overtredingen door axe komen op WCAG 2.1 AA.
 * - Beweging staat uit (slaktrrr:motion = off), zodat alle Reveal-/SplitText-inhoud direct zichtbaar is
 *   en axe niet meet op elementen die nog half ingefaded zijn.
 * - Draait in elk Playwright-project, dus ook op mobiele schermen.
 */
const ROUTES = ['/', '/over-mij', '/cases', '/cases/bij-martinus', '/ervaring', '/reviews', '/contact', '/experiment', '/styleguide'];

async function audit(page: Page) {
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

    // Leesbaar overzicht: regel, impact, aantal elementen en het eerste element
    return results.violations.map((v) => `${v.id} (${v.impact}, ${v.nodes.length}×): ${v.nodes[0]?.target.join(' ')}`);
}

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('slaktrrr:motion', 'off'));
});

for (const route of ROUTES) {
    test(`${route} voldoet aan WCAG 2.1 AA`, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator('h1').first()).toBeVisible();
        expect(await audit(page)).toEqual([]);
    });
}
