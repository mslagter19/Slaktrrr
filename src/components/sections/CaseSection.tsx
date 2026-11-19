import { useMemo, useState } from "react"
import { Card, CardBody, CardTitle } from "../ui/Card"
import { RecordSleeveArt } from "../ui/RecordSleeveArt"
import { CaseDrawer } from "../ui/CaseDrawer"
import type { CasePanelData } from "../ui/CasePanel"

import bijMartinus from "../../assets/images/cases/bij-martinus.webp"

type CaseSectionProps = {
    title?: string
    description?: string
    cases?: CaseItem[]
    excludeSlug?: string   // de case waar je nu op zit
    category?: string      // optioneel: alleen deze categorie tonen
    limit?: number         // optioneel: max aantal tegels
}

type CaseItem = CasePanelData

const defaultCases: CaseItem[] = [
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
        categories: ["Website", "Webshop"],
    },
    {
        slug: "project-3",
        title: "Project 3",
        cover: bijMartinus,
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website", "Webshop"],
    },
    {
        slug: "project-4",
        title: "Project 4",
        cover: bijMartinus,
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website", "Webshop"],
    },
]

function overlap(a: CaseItem, b?: CaseItem) {
    if (!b) return 0
    return a.categories.filter((cat) => b.categories.includes(cat)).length
}

export function CaseSection({
    title,
    description,
    cases = defaultCases,
    excludeSlug,
    category,
    limit,
}: CaseSectionProps) {
    const [active, setActive] = useState<CaseItem | null>(null)
    const [open, setOpen] = useState(false)

    const visibleCases = useMemo(() => {
        const current = cases.find((c) => c.slug === excludeSlug)

        return cases
            .filter((c) => c.slug !== excludeSlug)
            .filter((c) => !category || c.categories.includes(category))
            .sort((a, b) => overlap(b, current) - overlap(a, current))
            .slice(0, limit)
    }, [cases, excludeSlug, category, limit])

    if (visibleCases.length === 0) return null

    const openPanel = (item: CaseItem) => {
        setActive(item)
        setOpen(true)
    }

    return (
        <>
            <section className="bg-black bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.10),transparent)]">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 gap-2 flex flex-col">
                    {title && (
                        <h2 className="font-heading !font-bold text-slate-900 text-4xl font-normal text-center">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-center text-white/60">
                            {description}
                        </p>
                    )}
                    {/* Zoveel kolommen als er passen (min. 20rem per plaat), gap-8 ertussen */}
                    <ul className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 mt-16">
                        {visibleCases.map((item) => (
                            <li key={item.slug}>
                                <Card
                                    variant="transparent"
                                    radius="none"
                                    className="h-full overflow-visible"
                                >
                                    {/* De plaat staat op de plank */}
                                    <div className="relative">
                                        <div className="transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:-translate-y-2 motion-reduce:transition-none">
                                            <RecordSleeveArt cover={item.cover} title={item.title} />
                                        </div>
                                        {/* Contactschaduw */}
                                        <div
                                            aria-hidden
                                            className="absolute inset-x-6 -bottom-1 h-3 rounded-[50%] bg-black/70 blur-md"
                                        />
                                    </div>

                                    {/* Dunne plank */}
                                    <div aria-hidden className="h-px bg-brand-600" />

                                    {/* Zwart bordje met de tekst */}
                                    <CardBody className="mt-4 flex-none items-center rounded-lg border border-white/10 bg-black p-4 text-center shadow-[0_18px_24px_-8px_rgba(0,0,0,0.9)] transition-colors group-hover:border-brand-600 motion-reduce:transition-none">
                                        <CardTitle className="text-white">
                                            <button
                                                type="button"
                                                onClick={() => openPanel(item)}
                                                aria-haspopup="dialog"
                                                className="cursor-pointer text-center outline-none after:absolute after:inset-0 after:content-[''] group-hover:underline"
                                            >
                                                {item.title}
                                            </button>
                                        </CardTitle>
                                        <p className="text-xs tracking-widest text-white/60 uppercase">
                                            {item.categories.join(" · ")}
                                        </p>
                                    </CardBody>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <CaseDrawer item={active} open={open} onClose={() => setOpen(false)} />
        </>
    )
}