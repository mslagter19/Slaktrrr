---
name: structuur
description: Controleer gewijzigde (of opgegeven) bestanden in Slaktrrr op projectstructuur en huisregels (juiste map, hergebruik van componenten, Tailwind i.p.v. inline styles, tokens, geen dark mode). Gebruik bij een vraag om de structuur of code te checken.
argument-hint: "[pad of map, standaard: gewijzigde bestanden]"
---

# /structuur: structuurcheck

Antwoord **altijd in het Nederlands**.

Doel: $ARGUMENTS

Dit command **verandert niets zonder akkoord**. Eerst komt een rapport, daarna de vraag wat aangepast moet worden.

## 1. Bepaal welke bestanden je controleert
- Met een argument: de opgegeven bestanden of map.
- Zonder argument: de gewijzigde en nieuwe bestanden: `git diff --name-only HEAD` plus `git ls-files --others --exclude-standard`. Neem alleen bestanden onder `src/`.

## 2. Checkpunten
Lees elk bestand en controleer:

1. **Juiste map en laag** (zie Architecture in CLAUDE.md; ESLint bewaakt de imports)
   - `lib/`, `hooks/`: helpers en hooks zonder UI
   - `components/ui/`: generieke, thema-loze primitives (zou in een ander project ongewijzigd moeten werken)
   - `components/motion/`: animatiecomponenten en de MotionProvider
   - `components/brand/`: het jazz-thema van Slaktrrr
   - `components/sections/`: generieke paginablokken
   - `features/<onderwerp>/`: alles over één onderwerp, met data als `*.data.ts`
   - `components/layout/`: de schil (navigatie, footer, transities)
   - `pages/`: pagina's, met het suffix `Page`
   - Staat iets Slaktrrr-specifieks in `ui/` of `sections/`? Dan hoort het in `brand/` of een feature.
   - **Naamgeving**: PascalCase voor componenten, kebab-case voor de rest, Engelse namen.
   - **Imports**: `@/` buiten de eigen map, `./` binnen de map, nooit `../`.
2. **Hergebruik**: zoek in het project of er een bestaand component is voor zelfgebouwde markup. Bijvoorbeeld een eigen `<button>`/`<a>` met knopstijl waar `Button` kan, een eigen kaart waar `Card` kan, een eigen heading/tekststijl waar `Typography` kan, een label met lijntje waar `Eyebrow` kan, of een lokale `<svg>` waar een icoon uit `components/ui/icons` kan. Noem het component dat er al is. Let ook op `className`-overrides die bij elk gebruik hetzelfde zijn: dan hoort die stijl in de variant zelf.
3. **Tailwind eerst**:
   - inline `style={{}}` met statische waarden
   - nieuwe losse CSS in `theme.css`/`index.css` die met Tailwind of een `@utility` kan
4. **Tokens**: hardgecodeerde kleuren (hex, `rgb(`, `hsl(`) of Tailwind-standaardkleuren (`slate-*`, `gray-*`, `zinc-*`, …) in plaats van de tokens uit `src/styles/theme.css`. In `components/ui/` alleen de semantische laag (`surface`, `line`, `ink`, `on-brand`, …), geen `brand-*`-schaal tenzij het een merkaccent is.
5. **Geen dark mode**: `dark:`-classes of `prefers-color-scheme`.
6. **`cn()`**: classNames die met template strings of `+` zijn samengevoegd in plaats van `cn()` uit `src/lib/cn.ts`.
7. **GSAP en motion**:
   - GSAP niet geïmporteerd uit `src/lib/gsap.ts`
   - animaties die alleen `prefers-reduced-motion` checken en niet `useMotion()` uit `src/hooks/useMotion.ts`
   - animaties die `useMotion()` negeren
8. **Pagina's en routes**:
   - een pagina zonder `usePageMeta`
   - een pagina die niet in `pageRoutes` in `src/routes.tsx` staat
9. **Assets**: string-paden naar `src/assets` (moet een import zijn) of absolute paden die de base path negeren.
10. **TypeScript en lint**: draai `npx eslint <bestanden>` en `npx tsc -b`. Neem de fouten mee in het rapport.

## 3. Rapport
Groepeer de bevindingen per bestand. Geef per bevinding:
- `bestand:regel`
- wat er mis is, en welke regel het breekt
- een concreet voorstel (bijv. "gebruik `<Button variant="link">`" of "vervang `#c9a24b` door `brand-500`")

Sluit af met het aantal bevindingen per soort. Vraag daarna met AskUserQuestion welke bevindingen opgelost moeten worden: alles, per categorie, of een selectie. Pas pas daarna iets aan, en controleer het daarna opnieuw met eslint en tsc.
