import type { CasePanelData } from "../ui/CasePanel"
import bijMartinus from "../../assets/images/cases/bij-martinus.webp"

// CONCEPT: covers en samenvattingen zijn nog placeholders.
// Gebruikt door CaseSection (de plank) en CasesPage (de cijfers en de hoes in de hero).
// Nieuwste case bovenaan. Een case met een eigen pagina krijgt ook een route in src/routes.tsx.
export const CASES: CasePanelData[] = [
    {
        slug: "bij-martinus",
        title: "Bij Martinus",
        cover: bijMartinus,
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website", "Webshop"],
    },
    {
        slug: "korving-houtbewerking",
        title: "Korving houtbewerking",
        cover: bijMartinus,
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website"],
    },
    {
        slug: "project-3",
        title: "Project 3",
        cover: bijMartinus,
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Webapp"],
    },
    {
        slug: "project-4",
        title: "Project 4",
        cover: bijMartinus,
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Webshop"],
    },
]

