---
name: readme
description: Werk de sectie Wijzigingen in README.md bij met de commits sinds de laatste update, in een vaste Nederlandse stijl. Commit en pusht niet.
argument-hint: "[optionele context, bijv. een onderdeel om te benadrukken]"
disable-model-invocation: true
---

# /readme: changelog in de README bijwerken

Antwoord **altijd in het Nederlands**.

Extra context van de gebruiker: $ARGUMENTS

## 1. Startpunt bepalen
- Lees `README.md` en zoek onderaan de sectie `## Wijzigingen` de marker:
  `<!-- readme:laatste-commit <hash> -->`
- Geen marker of geen sectie? Dan begin je bij de eerste commit en maak je de sectie aan volgens de opbouw in stap 4.

## 2. Commits verzamelen
- `git log <hash>..HEAD --reverse --stat --format='=== %h %ad %s' --date=short`
  (zonder marker: laat `<hash>..` weg)
- Geen nieuwe commits? Meld dat en stop.
- Is een commit-titel vaag (bijv. "A lot of updates", "fixes")? Kijk dan in `git show --stat <hash>` en zo nodig in de diff van de belangrijkste bestanden, zodat je beschrijft wat er écht veranderd is.
- **Alleen commits tellen mee.** Niet-gecommitte wijzigingen in de werkmap neem je niet op.

## 3. Regels schrijven (vaste stijl)
Elke regel moet er precies zo uitzien. Wijk hier niet van af.

**Datumkop**
- Formaat: `### <dag> <maand voluit> <jaar>`, bijv. `### 18 november 2026`. Dag zonder voorloopnul, maand in kleine letters.
- Gebruik de commitdatum (`%ad`). Commits van dezelfde dag komen onder één kop.
- Bestaat de kop van die dag al in de README? Vul de bullets daaronder aan en maak geen tweede kop.
- Nieuwste datum bovenaan.

**Bullet**
- Formaat: `- **<Onderdeel>**: <beschrijving>`
- *Onderdeel*: één of twee woorden, begint met een hoofdletter. Hergebruik onderdelen die al in de README staan, zodat de lijst consistent blijft. Voorbeelden: Projectopzet, Navigatie, Animaties, Muziekspeler, Paginatransities, Secties, Pagina's, Thema, Logo, Favicon, Tests, Build, Opschoning.
- *Beschrijving*:
  - Nederlands, begint met een kleine letter (of een backtick), **geen punt aan het eind**.
  - Beschrijvend, niet gebiedend: "nieuwe muziekspeler met tracklijst", niet "voeg muziekspeler toe".
  - Maximaal ~90 tekens. Componentnamen mogen in backticks, bijv. `` `NavModal` ``.
  - Beschrijf wat er veranderd is voor de bezoeker of ontwikkelaar, niet welke bestanden zijn aangeraakt.
- Maximaal ~8 bullets per dag. Bundel kleine fixes tot één bullet, bijv. `- **Build**: lint- en typefouten opgelost`.
- Verwijderingen en hernoemingen krijgen ook een bullet, bijv. `- **Opschoning**: demopagina's voor de UI-primitives verwijderd`.
- Zet bullets binnen een dag in volgorde van belang: grote features eerst, opschoning en fixes onderaan.

## 4. Voorstel tonen en toepassen
- Laat de nieuwe of aangevulde datumblokken eerst zien en pas aan tot de gebruiker akkoord geeft.
- Zet ze daarna in `README.md` onder `## Wijzigingen`, nieuwste bovenaan.
- Werk de marker bij naar `git rev-parse --short HEAD`. De marker staat altijd als laatste regel van de sectie.
- Opbouw van de sectie:

```markdown
## Wijzigingen

### 18 november 2026
- **Navigatie**: volledig scherm-menu `NavModal` met neonlabels

### 17 november 2026
- **Muziekspeler**: speler in de navigatie met twee jazztracks

<!-- readme:laatste-commit ac901df -->
```

- Controleer of elke bullet het formaat volgt: `^- \*\*[^*]+\*\*: [a-z\`].*[^.]$`

## 5. Afronden
- Pas alleen de sectie `## Wijzigingen` aan. Andere secties alleen als de gebruiker erom vraagt of als ze aantoonbaar verouderd zijn (bijv. een nieuw npm-script of een nieuwe project-command); stel dat dan eerst voor.
- **Commit en push niet.** Verwijs voor committen naar `/commit`.
