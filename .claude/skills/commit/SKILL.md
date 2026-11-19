---
name: commit
description: Stel een Nederlands commit-bericht voor op basis van de diff en commit na akkoord. Pusht nooit.
argument-hint: "[optionele context voor het bericht]"
disable-model-invocation: true
---

# /commit: Nederlands commit-bericht

Antwoord **altijd in het Nederlands**.

Extra context van de gebruiker: $ARGUMENTS

## 1. Wijzigingen bekijken
- `git status`
- `git diff --staged` en `git diff`
- `git log --oneline -5`, voor de toon van eerdere berichten

## 2. Waarschuwen
Meld het, en zet het niet zomaar in de commit, als je dit ziet:
- bestanden die niet in een commit horen: `.env*`, `dist/`, `test-results/`, `playwright-report/`, `.claude/settings.local.json`, grote binaire bestanden
- lint- of typefouten in de gewijzigde bestanden: draai `npx eslint <gewijzigde .ts/.tsx>` en `npx tsc -b`. Fouten blokkeren de deploy op `master`, dus noem ze. Of er toch gecommit wordt, beslist de gebruiker.

## 3. Vragen wat er mee moet
- Staat er al iets gestaged? Vraag dan of alleen dat mee moet.
- Zo niet, vraag met AskUserQuestion: alles, of een selectie.
- Horen de wijzigingen inhoudelijk niet bij elkaar? Stel dan een splitsing in meerdere commits voor, met per commit de bestanden.

## 4. Bericht voorstellen
- **Titel**: Nederlands, gebiedende wijs, maximaal ~60 tekens, zonder punt. Bijv. "Voeg ContactModal toe", "Repareer afbeeldingspaden op casepagina's".
- **Body** (als het meer is dan één kleine wijziging): een witregel, dan een opsomming van wat er veranderd is en waarom.
- Sluit af met de attributieregel uit de systeeminstructies, als die er is.

Laat het bericht zien en pas het aan tot de gebruiker akkoord geeft.

## 5. Committen
- Stage alleen de gekozen bestanden, met expliciete paden. Gebruik geen `git add -A` bij een selectie.
- Commit met een heredoc, zodat de opmaak van het bericht blijft staan.
- Laat `git log --oneline -1` zien als bevestiging.
- **Push nooit.** Wijs erop dat een push naar `master` direct naar GitHub Pages deployt.
