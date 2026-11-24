# Slaktrrr

Persoonlijk portfolio met een jazz- en vinylthema. Gebouwd als client-only SPA met React 19, TypeScript en Vite, gestyled met Tailwind CSS v4 en geanimeerd met GSAP.

## Aan de slag

```bash
npm install
npm run dev       # Vite dev server
npm run build     # type check (tsc -b) + productiebuild
npm run lint      # ESLint, inclusief de laagregels
npm run preview   # de build in dist/ serveren
npm test              # smoke- en toegankelijkheidstests (WCAG 2.1 AA) op desktop, Pixel 7 en iPhone 13
npm run test:visual   # screenshots vergelijken met de baseline (alleen lokaal)
npm run check:bundle  # JavaScript-budget, na een build
npm run lighthouse    # Lighthouse op de productiebuild
```

Hoe en waarom het project zo is opgezet, staat in [`docs/werkwijze.md`](docs/werkwijze.md). Het design system staat live op `/styleguide`.

## Structuur

```
src/
  lib/, hooks/          helpers en hooks zonder UI
  components/ui/        thema-loze primitives (Button, Card, Eyebrow, icons, form, …)
  components/motion/    animatie en de motion-instelling
  components/brand/     het jazz-thema (Vinyl, VuMeter, CaseSleeve, …)
  components/sections/  generieke paginablokken
  features/<onderwerp>/ componenten, secties en data per onderwerp
  components/layout/    navigatie, footer, paginatransitie
  pages/                pagina's
```

Een laag importeert alleen uit lagen eronder; ESLint bewaakt dat. Imports buiten de eigen map gaan via `@/`.

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

### 24 november 2026
- **Easter egg**: neonflamingo vliegt af en toe over de hero en landt even op de draaiende plaat
- **Experiment**: verborgen `/experiment` met een balansspel op de plaat, van Ballad tot Bebop
- **Experiment**: roze confetti bij een record en score delen met uitdagingslink via `ShareButton`
- **Pagina's**: nieuwe Over mij met omdraaibare hoes, verhaal, standards en teasers
- **Muziekspeler**: zeven menselijk gemaakte jazznummers, met gelinkte licenties in de credits
- **Animaties**: `Underline` tekent zich uit met een naald en het Spotlight-licht komt zacht op
- **Secties**: line-art zonder horizontale scroll, sleeves weer op de plank en knop naar alle cases
- **Opschoning**: oude playlist met de AI-gegenereerde track en Slow Music verwijderd

### 23 november 2026
- **Pagina's**: nieuwe Cases met filter, Ervaring met `SetlistSection`, Reviews en Contact met FAQ
- **Animaties**: scroll-reveals op de homepage spelen nu echt af, met verse triggers na navigatie
- **Knoppen**: naald-wipe als hover op buttons en een equalizer-hamburger die naar een kruisje draait
- **Contact**: formulier los als `ContactTicket`, voor de modal en de contactpagina
- **Footer**: muziekcredits in een liner notes-modal en links met een messing groef-lijn
- **Cases**: case BijMartinus met grotere hoes, VU-meters bij de cijfers en de stack als personnel
- **Layout**: tickets even hoog, Instrumentation-slider op mobiel hersteld, film-effect op foto's
- **Build**: `.htaccess` als SPA-fallback en geen scroll-flits meer bij het openen van modals

### 19 november 2026
- **Contact**: contactformulier `ContactModal` en cv-download in de outro, met podiumlicht
- **Secties**: cases staan als platen op een plank met een zwart naambordje
- **Animaties**: koppen animeren met `SplitHeading`, saxofoon en speelkaart krijgen parallax
- **Thema**: `noir-img`-filter maakt foto's zwart-wit, met kleur bij hover of focus
- **Navigatie**: neonlabel uit de balk gehaald en andere tabtitel als de bezoeker wegklikt
- **Layout**: grotere tekst, rondere knoppen en een kleiner logo op mobiel
- **Tooling**: project-commands voor Claude, `CLAUDE.md` en een Nederlandse README met changelog
- **Build**: afbeeldingspaden gerepareerd zodat ze ook in de productiebuild werken

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

<!-- readme:laatste-commit 9c34f6f -->
