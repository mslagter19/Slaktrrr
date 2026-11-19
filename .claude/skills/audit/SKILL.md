---
name: audit
description: Kwaliteitsaudit van de Slaktrrr-site (of één pagina) op toegankelijkheid, motion, assets, content en build. Gebruik bij een vraag om een audit, review of kwaliteitscheck van de site.
argument-hint: "[pagina, bijv. HomePage — standaard: hele site]"
---

# /audit: kwaliteitsronde

Antwoord **altijd in het Nederlands**.

Doel: $ARGUMENTS

Dit command **verandert niets zonder akkoord**.

## 1. Vragen
Stel met AskUserQuestion de vragen die het argument nog niet beantwoordt:
- Hele site of één pagina? De pagina's staan in `src/routes.tsx` → `src/pages/`.
- Welke onderdelen (meerkeuze): toegankelijkheid, motion, assets, content, build.

## 2. Onderdelen
Volg per pagina de componenten die gebruikt worden (pages → sections → ui). Tel `AppShell`, `Navigation`, `Footer` en `PageTransition` mee als ze voor de hele site gelden.

**Toegankelijkheid**
- `<img>`/`CardImage`/`CaseSleeve` zonder alt, of met een alt die niet klopt (bijv. een alt van een andere case)
- kopvolgorde: één `h1` per pagina, geen niveaus overgeslagen
- interactieve elementen zonder `focus-visible:`-stijl, zonder toegankelijke naam, of een `div`/`span` met `onClick`
- contrast van gebruikte tokencombinaties (bijv. `text-white-dim` op `bg-black-vinyl`): reken het uit met de hexwaarden uit `src/styles/theme.css`. Norm WCAG AA: 4.5:1 voor tekst, 3:1 voor grote tekst en UI.
- de skip-link en het focusbeheer na navigatie

**Motion**
- GSAP-animaties die `useMotion()` niet checken, en CSS-transities zonder `motion-reduce:`
- GSAP-imports die niet uit `src/lib/gsap.ts` komen

**Assets**
- string-paden naar `src/assets/` of absolute paden die de base path (`VITE_BASE`) negeren
- bestanden in `src/assets/` en `public/` die nergens gebruikt worden
- erg grote afbeeldingen (> ~500 KB)

**Content**
- placeholders zoals `[rol, bijv. …]`, `Lorem`, `TODO` en "Test image"
- `usePageMeta`: ontbreekt, of de description past niet bij de pagina
- taal- en spelfouten in de Nederlandse teksten

**Build**
- `npm run lint`
- `npx tsc -b`

## 3. Rapport
Groepeer per onderdeel en sorteer op prioriteit:
- **Hoog**: kapot, ontoegankelijk, faalt de build
- **Middel**: tegen de huisregels
- **Laag**: polish

Geef per punt `bestand:regel`, het probleem en een voorstel. Sluit af met een korte samenvatting. Vraag daarna met AskUserQuestion wat opgepakt moet worden. Volg bij het oplossen de huisregels:
- Tailwind eerst
- bestaande componenten hergebruiken
- geen dark mode
- eerst zoeken, dan bedenken
