---
name: component
description: Maak of hergebruik een UI-component in Slaktrrr volgens de huisregels (Tailwind, theme-tokens, cva + cn, geen dark mode). Gebruik bij een vraag om een nieuw component, UI-element, sectie of variant.
argument-hint: "[omschrijving van het component]"
---

# /component: nieuw of hergebruikt UI-component

Antwoord **altijd in het Nederlands**: vragen, voorstellen en samenvatting.

Verzoek van de gebruiker: $ARGUMENTS

## Huisregels
- Gebruik zoveel mogelijk Tailwind-classes. Gebruik geen inline `style={{}}` en geen losse CSS als Tailwind het kan. Alleen dynamische waarden (bijv. een berekende transform) mogen inline.
- Hergebruik bestaande componenten. Maak alleen iets nieuws als niets past, en doe dan eerst een voorstel.
- **Geen dark mode**: geen `dark:`-classes en geen `prefers-color-scheme`.
- Doorzoek eerst het project. Bedenk niets voordat je weet wat er al is.

## Stappen

### 1. Vragen
Stel met AskUserQuestion alleen de vragen die het verzoek nog niet beantwoordt:
- Wat moet het component doen, en welke inhoud krijgt het?
- Waar wordt het gebruikt (welke pagina of sectie)?
- Welke varianten of maten zijn nodig?
- Moet het animeren?

### 2. Zoeken in het project
Zoek, voordat je iets ontwerpt, met Grep/Glob naar wat er al is:
- `src/components/ui/`: primitives (Button, Card, Badge, Typography, Tabs, Tooltip, accordion/, form/, …)
- `src/components/sections/`: paginablokken (Hero, Case, Columns, Outro, Review, Swiper, …)
- feature-mappen: `instrumentation/`, `experience/`, `navigation/`, `contact/`, `gsap/`, `transition/`
- `src/hooks/` en `src/lib/`
- `src/styles/theme.css`: tokens en `@utility`-classes (`film`, `film-page`, `noir-img`)

Kijk ook hoe vergelijkbare markup nu in pagina's gebruikt wordt.

### 3. Voorstel (wacht op akkoord)
Kies een van deze routes en leg uit waarom:
1. **Hergebruiken**: een bestaand component past al. Laat zien hoe je het gebruikt.
2. **Uitbreiden**: een bestaand component krijgt bijv. een extra cva-variant of prop.
3. **Nieuw**: alleen als niets aansluit. Geef één of meer voorstellen met:
   - de map: `ui/` voor generieke primitives, `sections/` voor paginablokken, of een feature-map
   - de props en varianten
   - een korte schets van de opbouw

Bouw pas als de gebruiker akkoord geeft.

### 4. Bouwen
Volg het patroon van `src/components/ui/Button.tsx`:
- `cva` (class-variance-authority) voor varianten, en `cn()` uit `src/lib/cn.ts` om classes samen te voegen. Laat de gebruiker altijd een `className` meegeven.
- Gebruik alleen kleuren uit `src/styles/theme.css`:
  - `brand-*` (messing) en `secondary-*` (bordeaux)
  - `black`, `black-deep|soft|vinyl|raised|groove|ash`
  - `white`, `white-bright|muted|dim|faint`
  - de aliassen `surface`, `surface-raised`, `line`, `ink`, `ink-muted`
  - geen `slate-*`, hex of `rgb()`
- Named export (`export function Naam`) en `type`-imports (`import type { … }`). Comments in het Nederlands.
- Animatie: importeer GSAP uit `src/lib/gsap.ts`, lees `useMotion()` uit `components/gsap/Motion-context.ts` en sla de animatie over als die uit staat (zie `Reveal.tsx`). Voeg `motion-reduce:`-classes toe aan CSS-transities.
- Toegankelijkheid:
  - `focus-visible:`-stijlen
  - semantische HTML
  - aria waar nodig
  - alt-teksten
- Afbeeldingen importeer je (`import img from "../assets/..."`). Gebruik geen string-paden.

### 5. Controleren
- `npx eslint <gewijzigde bestanden>`
- `npx tsc -b`: meld fouten in bestanden die je niet aanraakte apart. Los ze niet ongevraagd op.
- Sluit af met een korte samenvatting: wat er is gemaakt of veranderd, waar het staat, en een gebruiksvoorbeeld.
