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
- `src/components/ui/`: thema-loze primitives (Button, Card, Badge, Eyebrow, Typography, Tabs, Tooltip, TrackList, GroupFilter, accordion/, form/, icons/)
- `src/components/motion/`: Reveal, SplitHeading, ParallaxScene, CountUp, MotionToggle
- `src/components/brand/`: het jazz-thema (Vinyl, VuMeter, CaseSleeve, Spotlight, LineArt, Logo, …)
- `src/components/sections/`: generieke paginablokken (HeroSubSection, ColumnsSection, SetlistSection, LevelsSection, SwiperSection)
- `src/features/<onderwerp>/`: componenten, secties en data per onderwerp (cases, reviews, experience, contact, music, …)
- `src/hooks/` en `src/lib/`
- `src/styles/theme.css`: tokens en `@utility`-classes (`film`, `film-page`, `noir-img`, `grain`, `text-neon`)

Kijk ook hoe vergelijkbare markup nu in pagina's gebruikt wordt.

### 3. Voorstel (wacht op akkoord)
Kies een van deze routes en leg uit waarom:
1. **Hergebruiken**: een bestaand component past al. Laat zien hoe je het gebruikt.
2. **Uitbreiden**: een bestaand component krijgt bijv. een extra cva-variant of prop.
3. **Nieuw**: alleen als niets aansluit. Geef één of meer voorstellen met:
   - de map en laag: `ui/` als het thema-loos en herbruikbaar is, `brand/` als het het jazz-thema draagt, `sections/` voor een generiek paginablok, of `features/<onderwerp>/` als het bij één onderwerp hoort. Een laag importeert nooit uit een laag erboven (zie CLAUDE.md).
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
  - de semantische laag `surface`, `surface-raised`, `surface-hover`, `line`, `line-strong`, `ink`, `ink-strong`, `ink-muted`, `ink-subtle`, `on-brand`, `danger-*`, `success-*`. In `ui/` gebruik je **alleen** deze laag.
  - geen `slate-*`, hex of `rgb()`
- Named export (`export function Name`) met een Engelse naam, en `type`-imports (`import type { … }`). Comments in het Nederlands.
- Imports: `@/…` buiten de eigen map, `./…` binnen de map.
- Labels boven een kop: `<Eyebrow>`. Iconen: `components/ui/icons` (voeg een nieuw icoon daar toe, niet lokaal).
- Animatie: importeer GSAP uit `src/lib/gsap.ts`, lees `useMotion()` uit `src/hooks/useMotion.ts` en sla de animatie over als die uit staat (zie `components/motion/Reveal.tsx`). Voeg `motion-reduce:`-classes toe aan CSS-transities.
- Toegankelijkheid:
  - `focus-visible:`-stijlen
  - semantische HTML
  - aria waar nodig
  - alt-teksten
- Afbeeldingen importeer je (`import img from "@/assets/..."`). Gebruik geen string-paden.

### 5. Controleren
- `npx eslint <gewijzigde bestanden>`
- `npx tsc -b`: meld fouten in bestanden die je niet aanraakte apart. Los ze niet ongevraagd op.
- Sluit af met een korte samenvatting: wat er is gemaakt of veranderd, waar het staat, en een gebruiksvoorbeeld.
