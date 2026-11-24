# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Slaktrrr is a personal portfolio site (Dutch-language UI and code comments) with a jazz/vinyl theme. It is a client-only React 19 + TypeScript + Vite SPA, styled with Tailwind CSS v4 and animated with GSAP. Write user-facing copy and code comments in Dutch, matching the existing code. Names in code (files, components, props) are English.

The project doubles as the owner's way of working: the generic layers (`ui`, `motion`, `sections`, tokens, lint rules, tests) are meant to be reused in later projects. Keep them free of Slaktrrr-specific theming.

## Conventies (huisregels)

- **Antwoord altijd in het Nederlands.**
- Gebruik zoveel mogelijk Tailwind-classes. Gebruik geen inline `style={{}}` of losse CSS als Tailwind het kan. Alleen dynamische waarden mogen inline, met een korte comment waarom.
- Hergebruik bestaande componenten. Maak alleen iets nieuws als niets past, en doe dan eerst een voorstel.
- **Geen dark mode**: geen `dark:`-classes en geen `prefers-color-scheme`.
- Doorzoek eerst het project voordat je iets nieuws bedenkt.
- Respecteer de lagen (zie Architecture). ESLint bewaakt ze.

Project-commands (`.claude/skills/`): `/component` (nieuw of hergebruikt UI-component), `/structuur` (check op structuur en huisregels), `/audit` (kwaliteitsronde over de site), `/commit` (Nederlands commit-bericht, pusht nooit), `/readme` (sectie Wijzigingen in de README bijwerken met nieuwe commits).

## Commands

- `npm run dev`: Vite dev server
- `npm run build`: `tsc -b && vite build`. The type check is part of the build, so type errors fail CI.
- `npm run lint`: ESLint (flat config in `eslint.config.js`, including the layer rules)
- `npm run preview`: serve the `dist/` build
- `npm test`: Playwright smoke tests (`tests/site.spec.ts`) and WCAG 2.1 AA checks (`tests/a11y.spec.ts`, axe) on desktop Chrome, Pixel 7 and iPhone 13. `playwright.config.ts` starts (or reuses) the dev server on port 5199. Single test: `npx playwright test tests/site.spec.ts -g "<name>"`.
- `npm run test:visual` / `test:visual:update`: full-page screenshot comparison (`tests/visual.spec.ts`, tagged `@visual`). Local only; baselines are machine-specific and not in git.
- `npm run check:bundle`: JS budget on `dist/` (initial load ≤ 245 kB gzip, each lazy chunk ≤ 30 kB). Run after `npm run build`.
- `npm run lighthouse`: Lighthouse CI on the production build (performance ≥ 0.9, accessibility ≥ 0.95), config in `lighthouserc.cjs`.

`.github/workflows/ci.yml` runs lint, build, bundle budget, `npm test` and Lighthouse on pushes to `main` and on PRs; the deploy waits for it. The way of working behind all this is documented (in Dutch, for clients too) in `docs/werkwijze.md`; keep it in sync when conventions change.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to **`master`** (Node 22, `npm ci && npm run build`), after the checks in `ci.yml` pass. Local work happens on `main`. `vite.config.ts` reads the base path from `VITE_BASE` (default `/`), and the router uses `import.meta.env.BASE_URL` as its `basename`. Asset and link paths must therefore not assume the site is served from the root.

## Architecture

**Layers.** `src/` is organised in layers. A layer may only import from layers below it (enforced by `no-restricted-imports` in `eslint.config.js`):

```
lib/, hooks/          helpers en hooks zonder UI (cn, gsap, format, useMotion, usePageMeta)
components/ui/        generieke primitives, thema-loos: Button, Card, Badge, Eyebrow, Tabs, Tooltip,
                      TrackList, GroupFilter, accordion/, form/, icons/
components/motion/    MotionProvider, MotionToggle, Reveal, SplitHeading, ParallaxScene, CountUp
components/brand/     het jazz-thema van Slaktrrr: Vinyl, VuMeter, CaseSleeve, Spotlight, LineArt, Logo, …
components/sections/  generieke paginablokken: HeroSubSection, ColumnsSection, SetlistSection, LevelsSection, SwiperSection
features/<onderwerp>/ alles over één onderwerp bij elkaar: componenten, secties, data (*.data.ts) en types
                      (home, cases, reviews, experience, instrumentation, contact, music, experiment)
components/layout/    de schil: AppShell, Navigation, NavModal, nav-items.ts, Footer, PageTransition
pages/                stellen een pagina samen uit secties en features
```

Imports outside the current folder use the `@/` alias (= `src/`); imports within the same folder use `./`. Relative `../` imports are a lint error.

**Naming.** PascalCase for components (`CaseSection.tsx`), kebab-case for everything else (`cases.data.ts`, `nav-items.ts`), the `Page` suffix for pages, `use*` for hooks. Data lives next to its feature as `*.data.ts`; later it can be replaced by a fetch from Laravel without touching components.

**Accessibility.** Muted text uses `ink-subtle` (never `text-white/40`–`/55`, which fail contrast). A control's visible text must be part of its accessible name (don't give it an unrelated `aria-label`). The axe tests in CI enforce WCAG 2.1 AA.

**Routing.** `main.tsx` creates a *data router* (`createBrowserRouter`) with a single splat route that renders `<App />`. The data router exists only because `PageTransition` needs `useBlocker`. The real routes are classic `<Routes>` in `App.tsx`, generated from the `pageRoutes` array in `src/routes.tsx`. To add a page, add an entry there using the `page()` helper, which lazy-loads it (only `HomePage` is eager); `App.tsx` wraps the routes in `<Suspense>` with a full-height fallback to avoid layout shift. Each case with its own page gets its own route (unknown slugs fall through to the 404). `ErrorPage`/`NotFoundPage` live in `src/pages/StatusPages.tsx`.

**Page transitions.** `components/layout/PageTransition.tsx` uses `useBlocker` to intercept every pathname change. It animates a cover panel in, then scrolls to the top and calls `blocker.proceed()`, then animates the panel out and focuses `<main id="main">`. Any navigation goes through this, so don't add separate scroll-to-top logic.

**App shell.** `components/layout/AppShell.tsx` wraps every page: skip link, `<main id="main">`, Footer, PageTransition, and a bottom `Navigation` that receives the `Logo` and `MusicPlayer` as props. `--nav-height` in `src/index.css` reserves space for the bottom nav.

**Motion.** `MotionProvider` (`components/motion/`) holds a site-wide on/off animation preference, stored in localStorage under `slaktrrr:motion` and defaulting to `prefers-reduced-motion`. It also sets `data-motion` on `<html>`. Every animated component reads it via `useMotion()` from `src/hooks/useMotion.ts` and must skip its animation when it is disabled. Always import GSAP and its plugins from `src/lib/gsap.ts`. (`PageTransition` imports `gsap` directly and checks `prefers-reduced-motion` itself.)

**Styling.** Tailwind v4 with design tokens in `src/styles/theme.css` (`@theme static`): `brand-*` (brass), `secondary-*` (bordeaux), a custom `black-*`/`white-*` scale (note: `black` and `white` are overridden to noir and ivory), and a **semantic layer** (`surface`, `surface-raised`, `surface-hover`, `line`, `line-strong`, `ink`, `ink-strong`, `ink-muted`, `ink-subtle`, `on-brand`, `danger-*`, `success-*`). `components/ui` uses only the semantic layer, so another project only redefines that block. No Tailwind default colours (`slate-*`, …), hex or `rgb()` in components. Reusable effects are `@utility` classes in `theme.css` (`film`, `film-page`, `noir-img`, `grain`, `text-neon`). Compose classes with `cn()` from `src/lib/cn.ts`; variants use `class-variance-authority` (see `components/ui/Button.tsx`). Labels above headings use `<Eyebrow>`; icons come from `components/ui/icons`.

**Per-page meta.** Pages call `usePageMeta({ title, description })` (`src/hooks/usePageMeta.ts`), which sets `document.title` to `"<title> | Slaktrrr"` and restores it on unmount.

**Audio.** Static audio lives in `public/audio/`; track metadata in `src/features/music/tracks.data.ts`, playlists in `playlists.data.ts`.
