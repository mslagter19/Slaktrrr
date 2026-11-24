// Lighthouse CI: meet de productiebuild (vite preview) op een paar representatieve pagina's.
// Lokaal: `npm run build && npm run lighthouse`. In CI draait dit na de build.
// Drempels zijn de kwaliteitsbelofte uit docs/werkwijze.md; verlaag ze niet zonder reden.
module.exports = {
    ci: {
        collect: {
            startServerCommand: "npm run preview -- --port 4173 --strictPort",
            startServerReadyPattern: "Local",
            url: [
                "http://localhost:4173/",
                "http://localhost:4173/cases",
                "http://localhost:4173/contact",
            ],
            numberOfRuns: 1,
            settings: {
                // Mobiel profiel (Lighthouse-standaard): de strengste meting
                chromeFlags: "--headless=new --no-sandbox",
            },
        },
        assert: {
            assertions: {
                "categories:performance": ["error", { minScore: 0.9 }],
                "categories:accessibility": ["error", { minScore: 0.95 }],
                "categories:best-practices": ["warn", { minScore: 0.9 }],
                "categories:seo": ["warn", { minScore: 0.9 }],
            },
        },
        upload: {
            // Rapporten lokaal bewaren (map .lighthouseci/), niet naar een externe server sturen
            target: "filesystem",
            outputDir: ".lighthouseci",
        },
    },
}
