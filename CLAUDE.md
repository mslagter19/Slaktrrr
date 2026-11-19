# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Slaktrrr is a personal portfolio site (Dutch-language UI and code comments) with a jazz/vinyl theme. It is a client-only React 19 + TypeScript + Vite SPA, styled with Tailwind CSS v4 and animated with GSAP. Write user-facing copy and code comments in Dutch, matching the existing code.

## Conventies (huisregels)

- **Antwoord altijd in het Nederlands.**
- Gebruik zoveel mogelijk Tailwind-classes. Gebruik geen inline `style={{}}` of losse CSS als Tailwind het kan.
- Hergebruik bestaande componenten. Maak alleen iets nieuws als niets past, en doe dan eerst een voorstel.
- **Geen dark mode**: geen `dark:`-classes en geen `prefers-color-scheme`.
- Doorzoek eerst het project voordat je iets nieuws bedenkt.

Project-commands (`.claude/skills/`): `/component` (nieuw of hergebruikt UI-component), `/structuur` (check op structuur en huisregels), `/audit` (kwaliteitsronde over de site), `/commit` (Nederlands commit-bericht, pusht nooit), `/readme` (sectie Wijzigingen in de README bijwerken met nieuwe commits).

## Commands

- `npm run dev`: Vite dev server
- `npm run build`: `tsc -b && vite build`. The type check is part of the build, so type errors fail CI.
- `npm run lint`: ESLint (flat config in `eslint.config.js`)
- `npm run preview`: serve the `dist/` build

Playwright is installed (`playwright.config.ts`, `tests/`), but `tests/example.spec.ts` is still the stock example that hits playwright.dev, and no `webServer` or `baseURL` is configured. Run tests with `npx playwright test` and a single test with `npx playwright test tests/<file>.spec.ts -g "<name>"`. To test the app itself, first configure `webServer`/`baseURL`.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to **`master`** (Node 22, `npm ci && npm run build`). Local work happens on `main`. `vite.config.ts` reads the base path from `VITE_BASE` (default `/`), and the router uses `import.meta.env.BASE_URL` as its `basename`. Asset and link paths must therefore not assume the site is served from the root.

## Architecture

**Routing.** `main.tsx` creates a *data router* (`createBrowserRouter`) with a single splat route that renders `<App />`. The data router exists only because `PageTransition` needs `useBlocker`. The real routes are classic `<Routes>` in `App.tsx`, generated from the `pageRoutes` array in `src/routes.tsx`. To add a page, add an entry there. `ErrorPage`/`NotFoundPage` live in `src/pages/SatusPages.tsx` (note the filename spelling when importing).

**Page transitions.** `components/transition/PageTransition.tsx` uses `useBlocker` to intercept every pathname change. It animates a cover panel in, then scrolls to the top and calls `blocker.proceed()`, then animates the panel out and focuses `<main id="main">`. Any navigation goes through this, so don't add separate scroll-to-top logic.

**App shell.** `components/layout/AppShell.tsx` wraps every page: skip link, `<main id="main">`, Footer, PageTransition, and a bottom `Navigation` that receives the `Logo` and `MusicPlayer` as props. `--nav-height` in `src/index.css` reserves space for the bottom nav.

**Motion.** `MotionProvider` (`components/gsap/`) holds a site-wide on/off animation preference. It is stored in localStorage under `slaktrrr:motion` and defaults to `prefers-reduced-motion`. It also sets `data-motion` on `<html>`. Animated components (e.g. `Reveal`) read it via `useMotion()` from `Motion-context.ts` and must skip their animation when it is disabled. Always import GSAP and its plugins from `src/lib/gsap.ts`, which registers ScrollTrigger, SplitText and useGSAP. (`PageTransition` imports `gsap` directly and checks `prefers-reduced-motion` itself instead of `useMotion`.)

**Styling.** Tailwind v4 with design tokens in `src/styles/theme.css` (`@theme static`): `brand-*` (brass), `secondary-*` (bordeaux), a custom `black-*`/`white-*` scale (note: `black` and `white` are overridden to noir and ivory), semantic aliases (`surface`, `ink`, `line`, …), and fonts. Use these tokens rather than raw colors. Compose classes with `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge). Component variants use `class-variance-authority` (see `components/ui/Button.tsx`).

**Components.**
- `components/ui/`: generic primitives (Button, Card, Typography, Tabs, accordion/, form/, …).
- `components/sections/`: page-level building blocks that pages compose (Hero, Case, Columns, Outro, …).
- Feature folders (`instrumentation/`, `experience/`, `navigation/`, `contact/`) keep their data next to their components (`skills.ts`, `Experience.data.ts`, `NavItems.ts`).
- Static audio lives in `public/audio/`. Track metadata is in `src/lib/tracks.ts` and `src/data/Playlists.ts`.

**Per-page meta.** Pages call `usePageMeta({ title, description })` (`src/hooks/usePageMeta.ts`), which sets `document.title` to `"<title> | Slaktrrr"` and restores it on unmount.
