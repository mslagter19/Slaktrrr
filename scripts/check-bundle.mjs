// Performance-budget: faalt als de JavaScript-bundle boven de grens komt.
// Draai na `npm run build`: `npm run check:bundle`.
// - "eerste lading" = de entry plus alles wat index.html meteen preloadt (dat betaalt elke bezoeker)
// - "per chunk"     = elke lazy pagina-chunk afzonderlijk (dat betaal je pas bij navigeren)
// Grenzen in kB gzip. Verhoog ze alleen bewust, met een reden in de commit.
import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"

const BUDGET = {
    initialKb: 245, // stand 24-11-2026: 224 kB (react-dom, router, GSAP, Swiper, de homepage)
    chunkKb: 30, // grootste pagina-chunk nu: Styleguide ±9 kB
}

const dist = path.resolve("dist")
const html = fs.readFileSync(path.join(dist, "index.html"), "utf8")
const gz = (file) => zlib.gzipSync(fs.readFileSync(path.join(dist, file))).length / 1024

// Alles wat index.html direct laadt: <script src> en <link rel="modulepreload" href>
const initial = [...html.matchAll(/(?:src|href)="\/?(?:[^"]*\/)?(assets\/[^"]+\.js)"/g)].map((m) => m[1])
const all = fs.readdirSync(path.join(dist, "assets")).filter((f) => f.endsWith(".js")).map((f) => `assets/${f}`)
const lazy = all.filter((f) => !initial.includes(f))

const initialKb = initial.reduce((sum, f) => sum + gz(f), 0)
const errors = []

console.log(`Eerste lading: ${initialKb.toFixed(1)} kB gzip (grens ${BUDGET.initialKb} kB), ${initial.length} bestanden`)
if (initialKb > BUDGET.initialKb) errors.push(`eerste lading ${initialKb.toFixed(1)} kB > ${BUDGET.initialKb} kB`)

for (const f of lazy) {
    const kb = gz(f)
    if (kb > BUDGET.chunkKb) errors.push(`${f}: ${kb.toFixed(1)} kB > ${BUDGET.chunkKb} kB`)
}
const largest = lazy.map((f) => [f, gz(f)]).sort((a, b) => b[1] - a[1])[0]
if (largest) console.log(`Grootste lazy chunk: ${largest[0]} ${largest[1].toFixed(1)} kB (grens ${BUDGET.chunkKb} kB)`)

if (errors.length) {
    console.error("\nBuiten het budget:\n- " + errors.join("\n- "))
    process.exit(1)
}
console.log("Binnen het budget.")
