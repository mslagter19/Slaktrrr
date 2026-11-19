# Slaktrrr

Persoonlijk portfolio met een jazz- en vinylthema. Gebouwd als client-only SPA met React 19, TypeScript en Vite, gestyled met Tailwind CSS v4 en geanimeerd met GSAP.

## Aan de slag

```bash
npm install
npm run dev       # Vite dev server
npm run build     # type check (tsc -b) + productiebuild
npm run lint      # ESLint
npm run preview   # de build in dist/ serveren
```

## Deployment

Een push naar `master` bouwt de site en zet hem op GitHub Pages (`.github/workflows/deploy.yml`). Lokaal werk gebeurt op `main`. Het base path komt uit `VITE_BASE` (standaard `/`), dus paden mogen er niet van uitgaan dat de site op de root draait.

## Project-commands

Claude Code-commands in `.claude/skills/`:

- `/component`: nieuw of hergebruikt UI-component volgens de huisregels
- `/structuur`: check op projectstructuur en huisregels
- `/audit`: kwaliteitsronde over de site
- `/commit`: Nederlands commit-bericht voorstellen en committen (pusht nooit)
- `/readme`: sectie Wijzigingen hieronder bijwerken met nieuwe commits

## Wijzigingen

### 18 november 2026
- **Animaties**: `MotionProvider` met aan/uit-knop, plus `Reveal`, `SplitHeading` en `ParallaxScene`
- **Navigatie**: volledig scherm-menu `NavModal` met neonlabels en vernieuwde navigatiebalk
- **Pagina's**: nieuwe Over mij-pagina met ervaring, reviews en `NowSpinning`
- **Ervaring**: werkervaring als bladmuziek (`Score`) en concertkaartjes (`TicketStub`)
- **Reviews**: reviews als speelkaarten in een hand (`ReviewHand`, `ReviewCard`)
- **Secties**: map `showcase/` hernoemd naar `sections/`, nieuwe Experience- en Review-sectie
- **Favicon**: complete set icons, Apple touch icon en webmanifest
- **Build**: buildfouten opgelost en `LogoShowcase` verwijderd

### 17 november 2026
- **Muziekspeler**: speler in de navigatie met twee jazztracks en tracklijst
- **Paginatransities**: afdekpaneel bij elke navigatie, met scroll naar boven en focus op de inhoud
- **Secties**: bouwblokken voor pagina's: Hero, Case, Columns, Outro en Swiper
- **Pagina's**: casepagina Bij Martinus en eigen fout- en 404-pagina
- **Instrumentatie**: skills als mengpaneel met kanalen, meters en groepsfilter
- **Layout**: logo, footer en navigatie onderin vervangen de sidebar
- **Thema**: design tokens uitgebreid met brass, bordeaux en een noir/ivoor-schaal
- **Opschoning**: demopagina's voor de UI-primitives verwijderd, Playwright toegevoegd

### 10 november 2026
- **Projectopzet**: basis met React 19, TypeScript, Vite en Tailwind v4, deploy naar GitHub Pages
- **UI-primitives**: basiscomponenten Button, Card, Badge, Tabs, Typography, accordion en formulier
- **Pagina's**: demopagina per primitive en een overzicht van de design tokens

<!-- readme:laatste-commit ac901df -->
