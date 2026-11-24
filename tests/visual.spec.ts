import { test, expect } from '@playwright/test';

/*
 * Visuele regressie: een full-page screenshot per pagina, vergeleken met de vastgelegde baseline.
 * - Beweging uit, zodat elke pagina elke keer hetzelfde beeld geeft.
 * - Alleen lokaal en alleen desktop-chromium + mobile-chrome: screenshots verschillen per OS en browser,
 *   dus de baselines (tests/visual.spec.ts-snapshots/) horen bij deze machine.
 * - De baselines staan NIET in git (±13 MB, en per machine anders). Maak ze vóór je gaat verbouwen:
 *   `npx playwright test tests/visual.spec.ts --update-snapshots`, verbouw, en draai de test daarna opnieuw.
 */
const ROUTES = ['/', '/over-mij', '/cases', '/cases/bij-martinus', '/ervaring', '/reviews', '/contact', '/styleguide'];

test.skip(!!process.env.CI, 'Visuele baselines zijn machine-afhankelijk; alleen lokaal.');

test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-safari', 'Eén mobiele browser is genoeg voor de baseline.');
    await page.addInitScript(() => localStorage.setItem('slaktrrr:motion', 'off'));
});

for (const route of ROUTES) {
    test(`${route} ziet er nog hetzelfde uit @visual`, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator('h1').first()).toBeVisible();
        await page.evaluate(() => document.fonts.ready);

        const name = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-');
        await expect(page).toHaveScreenshot(`${name}.png`, {
            fullPage: true,
            animations: 'disabled',
            // Kleine verschillen in anti-aliasing mogen; een verschoven blok niet
            maxDiffPixelRatio: 0.01,
            // De muziekspeler toont een hint met timer; die hoort niet bij de layout
            mask: [page.locator('#music-hint')],
        });
    });
}
