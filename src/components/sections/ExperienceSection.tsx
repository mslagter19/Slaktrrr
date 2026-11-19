import { useState } from "react"
import { Button } from "../ui/Button"
import { Score } from "../experience/Score"
import { TicketStub } from "../experience/TicketStub"
import { experiences } from "../experience/Experience.data"
import { SplitHeading } from "../gsap/SplitHeading"

// Kleine pijlen als icoon, zodat de knoptekst zelf schoon blijft
function Chevron({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={direction === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
        </svg>
    )
}

type ExperienceSectionProps = {
    // Standaard start de partituur bij de huidige (laatste) rol
    defaultActiveId?: string
}

export function ExperienceSection({ defaultActiveId }: ExperienceSectionProps) {
    const [activeId, setActiveId] = useState(defaultActiveId ?? experiences[experiences.length - 1].id)

    const index = experiences.findIndex((item) => item.id === activeId)
    const active = experiences[index]
    const previous = experiences[index - 1]
    const next = experiences[index + 1]

    return (
        <section id="ervaring" aria-labelledby="ervaring-titel" className="bg-black py-24 text-white">
            <div className="mx-auto max-w-7xl px-6">
                <header className="max-w-2xl">
                    <SplitHeading
                        as="h2"
                        id="ervaring-titel"
                        className="font-heading text-4xl font-bold mb-4"
                    >
                        Mijn loopbaan als partituur
                    </SplitHeading>
                    <p className="mt-4 text-white/60">
                        Elke noot is een plek waar ik heb gespeeld. De boog laat zien hoe lang, en hoe hoger de noot,
                        hoe groter mijn rol. Tik op een noot voor het kaartje met de details.
                    </p>
                </header>

                <Score items={experiences} activeId={activeId} onSelect={setActiveId} className="mt-12" />

                <div className="mt-6">
                    <TicketStub item={active} index={index} total={experiences.length} />

                    <div className="mt-6 flex items-center justify-between gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!previous}
                            onClick={() => previous && setActiveId(previous.id)}
                            leftIcon={<Chevron direction="left" />}
                            className="border-white/30 text-white hover:bg-white/10"
                        >
                            Eerder
                        </Button>

                        <p aria-live="polite" className="text-sm text-white/60">
                            Noot {index + 1} van {experiences.length}
                        </p>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!next}
                            onClick={() => next && setActiveId(next.id)}
                            rightIcon={<Chevron direction="right" />}
                            className="border-white/30 text-white hover:bg-white/10"
                        >
                            Later
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
