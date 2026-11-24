import { test, expect, type Page } from '@playwright/test';

// Alle pagina's uit src/routes.tsx (de detailroute met een echte slug)
const ROUTES = ['/', '/over-mij', '/cases', '/cases/bij-martinus', '/ervaring', '/reviews', '/contact', '/experiment'];

// Bekende placeholders die (nog) niet bestaan: niet als fout tellen
const IGNORED = [/\/cv\/download/];

// Verzamelt console-fouten, paginafouten en mislukte requests (4xx/5xx) tijdens een test
function collectErrors(page: Page) {
    const errors: string[] = [];
    page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
    });
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page.on('response', (res) => {
        if (res.status() >= 400 && !IGNORED.some((re) => re.test(res.url()))) {
            errors.push(`HTTP ${res.status()}: ${res.url()}`);
        }
    });
    return errors;
}

// Scrol in stappen naar beneden, zodat Reveal/ScrollTrigger-elementen en lazy afbeeldingen meedoen
async function scrollThrough(page: Page) {
    await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise((r) => setTimeout(r, 400));
    });
}

test.describe('Elke pagina', () => {
    for (const route of ROUTES) {
        test(`${route} laadt zonder fouten en zonder horizontale scroll`, async ({ page }) => {
            const errors = collectErrors(page);

            await page.goto(route);
            await expect(page.locator('h1').first()).toBeVisible();
            await expect(page).toHaveTitle(/\| Slaktrrr$/);

            await scrollThrough(page);

            // Geen horizontale scroll
            const overflow = await page.evaluate(() => {
                const el = document.documentElement;
                return el.scrollWidth - el.clientWidth;
            });
            expect(overflow, 'pagina is breder dan het scherm').toBeLessThanOrEqual(0);

            // Geen kapotte afbeeldingen
            const broken = await page.evaluate(() =>
                Array.from(document.images)
                    .filter((img) => img.complete && img.naturalWidth === 0)
                    .map((img) => img.currentSrc || img.src)
            );
            expect(broken, 'kapotte afbeeldingen').toEqual([]);

            // Geen ankers naar een id die niet op de pagina staat (bv. href="#werk")
            const deadAnchors = await page.evaluate(() =>
                Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]'))
                    .map((a) => new URL(a.href))
                    .filter((url) => url.pathname === location.pathname && url.hash.length > 1)
                    .map((url) => url.hash)
                    .filter((hash) => !document.getElementById(decodeURIComponent(hash.slice(1))))
            );
            expect(deadAnchors, 'ankers zonder doel').toEqual([]);

            expect(errors, 'fouten in console of netwerk').toEqual([]);
        });
    }
});

test('onbekende pagina en onbekende case tonen de 404', async ({ page }) => {
    for (const route of ['/bestaat-niet', '/cases/korving-houtbewerking']) {
        await page.goto(route);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dit nummer staat niet op de plaat');
    }
});

test('de audio van de muziekspeler bestaat', async ({ page, request }) => {
    await page.goto('/');
    // De tracks staan als src op <audio> of in de lijst van de speler; haal alle /audio/-urls uit de bundle-data
    const sources = await page.evaluate(async () => {
        const mod = await import('/src/features/music/tracks.data.ts');
        return (mod.tracks as { src: string }[]).map((t) => t.src);
    });
    expect(sources.length).toBeGreaterThan(0);
    for (const src of new Set(sources)) {
        const res = await request.head(src);
        expect(res.status(), src).toBe(200);
    }
});

test('menu navigeert naar Cases en zet de focus op main', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /menu/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('link', { name: /cases/i }).first().click();

    await expect(page).toHaveURL(/\/cases$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cases');
    await expect(page.locator('main#main')).toBeFocused();
});

test('FAQ-accordion opent met klik en met toetsenbord', async ({ page }) => {
    await page.goto('/contact');
    const triggers = page.locator('h3 > button[aria-expanded]');

    const first = triggers.nth(0);
    await first.scrollIntoViewIfNeeded();
    await first.click();
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator(`#${await first.getAttribute('aria-controls')}`)).toBeVisible();

    const second = triggers.nth(1);
    await second.focus();
    await page.keyboard.press('Enter');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
});

test('case-drawer opent en sluit met Escape', async ({ page }) => {
    await page.goto('/cases');
    // De platen komen pas binnen (Reveal) als de collectie in beeld is
    await page.getByRole('group', { name: 'Filter op categorie' }).scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.5));
    const plaat = page.getByRole('button', { name: 'Bij Martinus' });
    await plaat.scrollIntoViewIfNeeded();
    await plaat.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
});

test('met beweging uit laadt de homepage gewoon', async ({ page }) => {
    const errors = collectErrors(page);
    await page.addInitScript(() => localStorage.setItem('slaktrrr:motion', 'off'));
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-motion', /off|false|reduce/);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors).toEqual([]);
});

test('knoppen in de hero vallen niet achter de bottom-nav', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500); // SplitHeading en Reveal laten uitspelen
    const nav = await page.getByRole('navigation', { name: 'Hoofdnavigatie' }).boundingBox();
    const button = await page.getByRole('link', { name: 'Bekijk mijn werk' }).boundingBox();
    expect(nav && button).toBeTruthy();
    expect(button!.y + button!.height, 'knop overlapt de navigatie').toBeLessThanOrEqual(nav!.y);
});
