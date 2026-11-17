import { useState } from "react"

import { Card, CardBody, CardTitle } from "../ui/Card"
import { RecordSleeveArt } from "../ui/RecordSleeveArt"
import { CaseDrawer } from "../ui/CaseDrawer"
import type { CasePanelData } from "../ui/CasePanel"

import bijMartinus from "../../assets/images/cases/bij-martinus.webp"

const tones = {
    brand: { card: "bg-brand-600", title: "!text-black" },
    black: { card: "bg-black", title: "text-white" },
    secondary: { card: "bg-secondary-600", title: "text-white" },
    white: { card: "bg-white", title: "!text-black" }
} as const

type CaseItem = CasePanelData & { tone: keyof typeof tones }

const defaultCases: CaseItem[] = [
    {
        slug: "bij-martinus",
        title: "Bij Martinus",
        cover: bijMartinus,
        tone: "brand",
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website", "Webshop"],
    },
    {
        slug: "korving-houtbewerking",
        title: "Korving houtbewerking",
        cover: bijMartinus,
        tone: "black",
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website", "Webshop"],
    },
    {
        slug: "project-3",
        title: "Project 3",
        cover: bijMartinus,
        tone: "secondary",
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website", "Webshop"],
    },
    {
        slug: "project-4",
        title: "Project 4",
        cover: bijMartinus,
        tone: "white",
        summary: "Korte samenvatting van het project. Wat was de opdracht en wat heb ik gebouwd?",
        categories: ["Website", "Webshop"],
    },
]

export function CaseSection({ cases = defaultCases }: { cases?: CaseItem[] }) {
    const [active, setActive] = useState<CaseItem | null>(null)
    const [open, setOpen] = useState(false)

    const openPanel = (item: CaseItem) => {
        setActive(item)
        setOpen(true)
    }

    return (
        <>
            <section className="bg-black">
                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
                    {cases.map((item) => (
                        <Card key={item.slug} variant="filled" radius="none" className={tones[item.tone].card}>
                            <div className="p-6">
                                <RecordSleeveArt cover={item.cover} title={item.title} />
                            </div>
                            <CardBody>
                                <CardTitle className={tones[item.tone].title}>
                                    <button
                                        type="button"
                                        onClick={() => openPanel(item)}
                                        aria-haspopup="dialog"
                                        className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:content-[''] group-hover:underline"
                                    >
                                        {item.title}
                                    </button>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </section>

            <CaseDrawer item={active} open={open} onClose={() => setOpen(false)} />
        </>
    )
}