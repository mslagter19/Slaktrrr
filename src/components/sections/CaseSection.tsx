import { useMemo, useState } from "react"
import { Card, CardBody, CardTitle } from "../ui/Card"
import { RecordSleeveArt } from "../ui/RecordSleeveArt"
import { CaseDrawer } from "../ui/CaseDrawer"
import type { CasePanelData } from "../ui/CasePanel"
import { Reveal } from "../gsap/Reveal"
import { SplitHeading } from "../gsap/SplitHeading"
import { GroupFilter } from "../instrumentation/GroupFilter"
import { Button } from "../ui/Button"
import { CASES } from "./cases.data"

type CaseSectionProps = {
    title?: string
    description?: string
    cases?: CaseItem[]
    excludeSlug?: string   // de case waar je nu op zit
    category?: string      // optioneel: alleen deze categorie tonen
    limit?: number         // optioneel: max aantal tegels
    filterable?: boolean   // optioneel: filterknoppen per categorie boven de plank (negeert limit)
    moreTo?: string        // optioneel: knop onder de plank, bv. "/cases"
    moreLabel?: string     // tekst van die knop
}

type CaseItem = CasePanelData

function overlap(a: CaseItem, b?: CaseItem) {
    if (!b) return 0
    return a.categories.filter((cat) => b.categories.includes(cat)).length
}

export function CaseSection({
    title,
    description,
    cases = CASES,
    excludeSlug,
    category,
    limit,
    filterable = false,
    moreTo,
    moreLabel = "Bekijk alle cases",
}: CaseSectionProps) {
    const [active, setActive] = useState<CaseItem | null>(null)
    const [open, setOpen] = useState(false)
    const [picked, setPicked] = useState("all") // gekozen filter ("all" = alles)

    // Filterknoppen: "Alle" + elke categorie die in de cases voorkomt
    const filterOptions = useMemo(
        () => [
            { id: "all", label: "Alle" },
            ...Array.from(new Set(cases.flatMap((c) => c.categories))).map((cat) => ({ id: cat, label: cat })),
        ],
        [cases]
    )

    // Het filter wint van de category-prop
    const activeCategory = filterable && picked !== "all" ? picked : category

    const visibleCases = useMemo(() => {
        const current = cases.find((c) => c.slug === excludeSlug)

        return cases
            .filter((c) => c.slug !== excludeSlug)
            .filter((c) => !activeCategory || c.categories.includes(activeCategory))
            .sort((a, b) => overlap(b, current) - overlap(a, current))
            .slice(0, filterable ? undefined : limit)
    }, [cases, excludeSlug, activeCategory, limit, filterable])

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
                        <SplitHeading className="font-heading !font-bold text-slate-900 text-4xl font-normal text-center leading-[1.15]">
                            {title}
                        </SplitHeading>
                    )}
                    {description && (
                        <Reveal as="p" className="text-center text-white/60">
                            {description}
                        </Reveal>
                    )}
                    {filterable && (
                        <div className="mt-10 flex justify-center">
                            <GroupFilter value={picked} options={filterOptions} onChange={setPicked} label="Filter op categorie" />
                        </div>
                    )}
                    {/* Zoveel kolommen als er passen (min. 20rem per plaat), gap-8 ertussen */}
                    {/* Reveal als ul: de platen komen een voor een binnen; key = opnieuw binnenkomen na filteren */}
                    <Reveal key={activeCategory ?? "all"} as="ul" stagger={0.12} className={filterable ? "grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 mt-10" : "grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 mt-16"}>
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
                                        {/* Contactschaduw: valt net boven de plank, niet eroverheen.
                                            Bij hover komt de plaat los en wordt de schaduw zachter */}
                                        <div
                                            aria-hidden
                                            className="absolute inset-x-[20%] bottom-0 h-2 rounded-[50%] bg-black/60 blur-sm transition-opacity duration-(--duration-standard) ease-(--ease-standard) group-hover:opacity-40 motion-reduce:transition-none"
                                        />
                                    </div>

                                    {/* Dunne plank: relative z-10, zodat de schaduw van de hoes hem niet dooft */}
                                    <div aria-hidden className="relative z-10 h-px bg-brand-600" />

                                    {/* Zwart bordje met de tekst */}
                                    <CardBody className="mt-4 flex-none items-center rounded-lg border border-white/10 bg-black p-4 text-center shadow-[0_18px_24px_-8px_rgba(0,0,0,0.9)] transition-colors group-hover:border-brand-600 motion-reduce:transition-none">
                                        <CardTitle className="text-white">
                                            <button
                                                type="button"
                                                onClick={() => openPanel(item)}
                                                aria-haspopup="dialog"
                                                className="cursor-pointer text-center outline-none after:absolute after:inset-0 after:content-['']"
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
                    </Reveal>
                    {moreTo && (
                        <Reveal className="mt-12 flex justify-center">
                            <Button to={moreTo} size="lg" radius="lg" className="text-black">
                                {moreLabel}
                            </Button>
                        </Reveal>
                    )}
                </div>
            </section>

            <CaseDrawer item={active} open={open} onClose={() => setOpen(false)} />
        </>
    )
}