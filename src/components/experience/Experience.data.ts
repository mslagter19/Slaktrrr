/* ---------- Type ---------- */
// Later kun je dit 1-op-1 laten vullen door Laravel (bv. GET /api/experiences
// met een API Resource die dezelfde veldnamen teruggeeft).
export type ExperienceType = "work" | "education"

export type Experience = {
    id: string // uniek, URL-veilig (komt in id-attributen terecht)
    type: ExperienceType // "work" = gevulde noot (onder de balk), "education" = holle noot (boven de balk)
    role: string
    company: string
    location?: string
    start: string // "YYYY-MM"
    end?: string // "YYYY-MM". Leeg = huidige rol
    pitch: number // 0-8: hoogte van de noot op de balk (bv. senioriteit of impact)
    summary: string
    highlights?: string[]
    stack: string[]
}

/* ---------- Voorbeelddata: vervang door je eigen loopbaan ---------- */
const experienceData: Experience[] = [
    {
        id: "hbo-cmd",
        type: "education",
        role: "Communication & Multimedia Design",
        company: "Hogeschool (voorbeeld)",
        start: "2014-09",
        end: "2018-06",
        pitch: 2,
        summary:
            "Hier leerde ik het verschil tussen iets dat mooi is en iets dat werkt. Ontwerp, interactie en de eerste regels code.",
        stack: ["HTML", "CSS", "JavaScript"],
    },
    {
        id: "studio-noord",
        type: "work",
        role: "Junior front-end developer",
        company: "Studio Noord (voorbeeld)",
        location: "Utrecht",
        start: "2018-08",
        end: "2020-12",
        pitch: 3,
        summary:
            "Marketingsites en campagnepagina's gebouwd op basis van ontwerpen, met de nadruk op nette HTML en CSS.",
        highlights: [
            "Een eigen componentenbibliotheek opgezet voor alle klantsites",
            "Laadtijd van de zwaarste campagnesite gehalveerd",
        ],
        stack: ["HTML", "SCSS", "JavaScript", "WordPress"],
    },
    {
        id: "bureau-blauw",
        type: "work",
        role: "Front-end developer",
        company: "Bureau Blauw (voorbeeld)",
        location: "Amsterdam",
        start: "2021-01",
        end: "2023-06",
        pitch: 5,
        summary:
            "Webapplicaties in React gebouwd voor opdrachtgevers in zorg en cultuur, in een team met ontwerpers en back-enders.",
        highlights: [
            "Toegankelijkheid (WCAG AA) vast onderdeel van elke oplevering gemaakt",
            "Animaties met GSAP die de merkbeleving versterken zonder te vertragen",
        ],
        stack: ["React", "TypeScript", "Tailwind", "GSAP"],
    },
    {
        id: "slaktrrr",
        type: "work",
        role: "Senior front-end developer",
        company: "Slaktrrr",
        location: "Op afstand",
        start: "2023-07",
        // end weglaten = huidige rol
        pitch: 7,
        summary:
            "Zelfstandig front-end developer. Ik bouw design systems en interactieve websites, van eerste schets tot oplevering.",
        highlights: [
            "Slagvast Design system ontwikkeld en in meerdere projecten ingezet",
            "Volledige koppeling met Laravel- en MySQL-back-ends",
        ],
        stack: ["React", "TypeScript", "Laravel", "MySQL", "GSAP"],
    },
]

// Altijd chronologisch, zodat de partituur van links naar rechts leest
export const experiences = [...experienceData].sort((a, b) => a.start.localeCompare(b.start))

/* ---------- Helpers ---------- */
export function toMonths(date: string) {
    const [year, month] = date.split("-").map(Number)
    return year * 12 + (month - 1)
}

export function startYear(date: string) {
    return date.slice(0, 4)
}

const monthFormat = new Intl.DateTimeFormat("nl-NL", { month: "short", year: "numeric" })

function toDate(date: string) {
    const [year, month] = date.split("-").map(Number)
    return new Date(year, month - 1, 1)
}

export function formatPeriod(start: string, end?: string) {
    return `${monthFormat.format(toDate(start))} tot ${end ? monthFormat.format(toDate(end)) : "nu"}`
}
