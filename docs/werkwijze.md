# Werkwijze

Zo bouw ik websites en webapps. Dit document is er voor twee lezers:

- **Opdrachtgevers**, om te zien hoe ik werk en waarom je daarop kunt bouwen.
- **Mijzelf**, als vaste basis voor elk volgend project.

Slaktrrr is het eerste project dat volledig volgens deze werkwijze is opgezet. Alles hieronder is in deze repository terug te vinden en wordt bij elke wijziging automatisch gecontroleerd.

---

## 1. Mijn standards

Zoals een jazzmuzikant zijn standards heeft, heb ik er vier die in elk project terugkomen. Ze staan niet alleen op papier: bij elke standard hoort een controle die faalt als ik me er niet aan houd.

| Standard | Wat het betekent | Hoe het bewaakt wordt |
|---|---|---|
| **Toegankelijk voor iedereen** | Toetsenbord, schermlezer, spraakbesturing of een trage verbinding: iedereen moet mee kunnen doen. | Elke pagina wordt op elk schermformaat getoetst aan WCAG 2.1 AA (axe). Lighthouse-toegankelijkheid ≥ 0.95. Beweging is site-breed uit te zetten. |
| **Snel als bebop** | Een site die laadt voordat je met je vingers knipt. | Een vast budget voor JavaScript. Pagina's laden pas als je ze nodig hebt. Lighthouse-performance ≥ 0.9 op een mobiel profiel. |
| **Detail in de maat** | Een animatie die net goed valt, een knop die precies reageert. | Één designsysteem met tokens. Visuele regressietests vangen een verschoven blok op voordat het live gaat. |
| **Samenspel** | Code die een ander (of ik over een jaar) direct begrijpt. | Een vaste mappenstructuur in lagen, die de linter afdwingt. Duidelijke namen, kleine componenten en Nederlandse commentaren waar het "waarom" niet vanzelf spreekt. |

---

## 2. Structuur: lagen van basis naar thema

De code is opgebouwd in lagen. Een laag mag alleen iets gebruiken uit de lagen **onder** zich. De linter (`eslint.config.js`) laat een import "omhoog" falen.

```
pages/                pagina's: stellen secties en features samen
components/layout/    de schil: navigatie, footer, paginatransitie
features/<onderwerp>/ alles over één onderwerp: componenten, secties, data
components/sections/  generieke paginablokken (hero, kolommen, setlist, levels)
components/brand/     het thema: in Slaktrrr vinyl, VU-meters, platenhoezen, lijnwerk
components/motion/    animatie en de site-brede instelling "beweging aan/uit"
components/ui/        thema-loze bouwstenen: knop, kaart, formulier, iconen, accordion
lib/, hooks/          hulpfuncties en hooks zonder UI
```

**Waarom zo?** De onderste lagen (`ui`, `motion`, `sections`, `lib`, `hooks`) weten niets van het thema. Die neem ik ongewijzigd mee naar een volgend project. Daar vervang ik alleen de `brand`-laag en de tokens. Een opdrachtgever krijgt zo een eigen gezicht, gebouwd op een basis die al bewezen is.

**Een feature** is één onderwerp, met alles erbij op één plek:

```
features/cases/
  CaseSection.tsx     de sectie die pagina's gebruiken
  CaseDrawer.tsx      onderdelen die alleen hier nodig zijn
  CasePanel.tsx
  cases.data.ts       de inhoud
```

De data staat als `*.data.ts` naast de feature. Komt de inhoud later uit een CMS of API (bijvoorbeeld Laravel), dan vervang ik alleen dat bestand door een fetch. De componenten blijven gelijk.

### Naamgeving en imports

- Namen in de code zijn **Engels**. Commentaar en teksten voor de bezoeker zijn **Nederlands**.
- `PascalCase` voor componenten (`CaseSection.tsx`) en `kebab-case` voor de rest (`cases.data.ts`, `nav-items.ts`).
- Pagina's krijgen het suffix `Page` en hooks beginnen met `use`.
- Buiten de eigen map importeer je via `@/` (`@/components/ui/Button`), binnen de map via `./`. Een `../`-import is een lintfout. Zo kun je een bestand verplaatsen zonder dat er van alles breekt.

---

## 3. Designsysteem: tokens in drie lagen

Alle kleuren, lettertypes, afstanden en bewegingen staan in `src/styles/theme.css`, opgebouwd in drie lagen:

1. **Schalen**: de ruwe kleuren, zoals `brand-50 … brand-950` (messing) en `secondary-*` (bordeaux).
2. **Semantisch**: de betekenis, zoals `surface`, `line`, `ink`, `ink-muted`, `ink-subtle`, `on-brand` en `danger-*`.
3. **Componenten**: die gebruiken de semantische laag, nooit een losse kleur.

De componenten in `ui/` gebruiken **alleen** de semantische laag. Een ander thema betekent dus: dat ene blok in `theme.css` opnieuw invullen, en alle knoppen, formulieren en kaarten kleuren mee.

Spelregels:

- Geen standaardkleuren van Tailwind (`slate-*`), geen hex en geen `rgb()` in componenten.
- Gedempte tekst is `ink-subtle`, nooit een lagere opacity (`text-white/40` haalt het contrast niet).
- Een effect dat vaker terugkomt, wordt een `@utility` in `theme.css`. Voorbeelden: `grain` (filmkorrel), `noir-img` en `text-neon`.
- Geen dark mode: het ontwerp ís donker. Er is één thema, en dat klopt.

De **styleguide** (`/styleguide`, te vinden via de footer) laat het hele systeem live zien. De kleuren worden rechtstreeks uit `theme.css` gelezen, dus de styleguide loopt nooit achter.

---

## 4. Componenten

- **Hergebruik eerst.** Voordat er iets nieuws komt, zoek ik wat er al is. Een nieuw component komt er pas als niets past, en dan eerst als voorstel.
- **Varianten** maak ik met `class-variance-authority`. Een `className` kan altijd mee, maar een override die bij elk gebruik terugkomt, hoort in de variant zelf. (In deze repo stond twaalf keer `border-white/30 text-white hover:bg-white/10` bij een knop. Nu is dat gewoon `variant="outline"`.)
- **Classes combineren** doe ik met `cn()` (clsx en tailwind-merge).
- **Vaste onderdelen**: `<Eyebrow>` voor het label boven een kop, en `components/ui/icons` voor iconen. Lokale SVG-kopieën gebruik ik niet.
- **Tailwind eerst.** Een inline `style` mag alleen voor een écht dynamische waarde, zoals een berekende positie, met een korte comment waarom.

---

## 5. Beweging en toegankelijkheid

- Animaties maak ik met GSAP. GSAP wordt altijd geïmporteerd via `src/lib/gsap.ts`, waar de plugins één keer worden geregistreerd.
- De bezoeker kan beweging site-breed uitzetten. Standaard volgt die instelling `prefers-reduced-motion`. **Elk** geanimeerd component leest `useMotion()` en slaat de animatie over als die uit staat. CSS-transities krijgen `motion-reduce:`.
- Toegankelijkheid:
  - semantische HTML en zichtbare `focus-visible`-stijlen
  - een skiplink
  - focus naar `<main>` na elke paginawissel
  - alt-teksten
  - de zichtbare tekst van een knop zit ook in zijn toegankelijke naam, zodat spraakbesturing ("klik Draai om") werkt
  - native `<dialog>` voor modals, zodat focus-trap en Escape vanzelf werken

---

## 6. Kwaliteitschecks

| Check | Wat | Drempel | Wanneer |
|---|---|---|---|
| `npm run lint` | ESLint, inclusief de laagregels | 0 fouten | lokaal en in CI |
| `npm run build` | Typecheck en productiebuild | 0 fouten | lokaal en in CI |
| `npm run check:bundle` | JavaScript-budget (gzip) | eerste lading ≤ 245 kB, elke pagina-chunk ≤ 30 kB | in CI |
| `npm test` | Smoke-tests: elke pagina laadt zonder fouten, zonder horizontale scroll en zonder dode links of afbeeldingen, en navigatie, menu, accordion en drawer werken | alles groen | lokaal en in CI |
| `npm test` | Toegankelijkheid (axe), WCAG 2.1 AA | 0 overtredingen | lokaal en in CI |
| `npm run lighthouse` | Lighthouse op de productiebuild, mobiel profiel | performance ≥ 0.9, toegankelijkheid ≥ 0.95 | in CI |
| `npm run test:visual` | Screenshot per pagina vergeleken met de baseline | ≤ 1 % pixelverschil | lokaal, vóór en na een verbouwing |

- **Testschermen:** de tests draaien op desktop (Chrome), Android (Pixel 7) en iPhone 13.
- **CI** (`.github/workflows/ci.yml`) draait de checks bij elke push naar `main` en bij elke pull request. Een deploy naar GitHub Pages gaat alleen door als ze allemaal slagen.
- **Visuele baselines** zijn per machine anders (lettertypes en anti-aliasing verschillen per besturingssysteem) en staan daarom niet in git. Op een nieuwe machine maak je eerst een baseline met `npm run test:visual:update`, voordat je gaat verbouwen.
- **Een drempel verhoog** ik alleen bewust, met de reden in het commitbericht.

---

## 7. Werkproces

1. **Soundcheck.** Een kort gesprek over doel, publiek en planning.
2. **Setlist.** Ik deel het werk op in kleine stappen die je elke week kunt zien.
3. **Spelen.** Ik bouw per stap volgens deze werkwijze. Per stap draaien lint, build en tests.
4. **Opname.** Ik maak een commit per afgeronde stap, met een Nederlands bericht in de gebiedende wijs ("Voeg … toe", "Repareer …") en een opsomming van wat er veranderd is en waarom.
5. **Release.** Een push naar `master` deployt, maar pas als CI groen is.

### Project-commands (Claude Code)

In `.claude/skills/` staan vaste opdrachten, zodat elk project op dezelfde manier wordt bewaakt:

| Command | Doet |
|---|---|
| `/component` | een component maken of hergebruiken volgens de huisregels |
| `/structuur` | gewijzigde code controleren op structuur, lagen, tokens en motion |
| `/audit` | een kwaliteitsronde over de hele site |
| `/commit` | een Nederlands commitbericht voorstellen en committen (pusht nooit) |
| `/readme` | het wijzigingslog in de README bijwerken |

---

## 8. Wat meegaat naar een volgend project

| Gaat mee | Wordt per project nieuw |
|---|---|
| `components/ui`, `motion`, `sections` | `components/brand` (het thema) |
| `lib/`, `hooks/` | de schalen in `theme.css` (de semantische laag blijft, met nieuwe waarden) |
| `eslint.config.js` met de laagregels | `features/` en `pages/` |
| Playwright-config en de smoke-, a11y- en visuele tests | inhoud (`*.data.ts`) |
| `check-bundle.mjs`, `lighthouserc.cjs`, `ci.yml` | |
| CLAUDE.md-huisregels en de project-commands | |
| dit document | |

Of dat een eigen template-repository wordt of een andere vorm krijgt, beslis ik als Slaktrrr volledig volgens deze werkwijze draait.
