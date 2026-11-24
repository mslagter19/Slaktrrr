import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/cn"
import { Badge } from "@/components/ui/Badge"
import { formatPeriod, startYear, type Experience } from "./experience.data"

type TicketStubProps = {
    item: Experience
    index: number // positie in de partituur (0-based)
    total: number
    active?: boolean // false = staat er wel (voor de hoogte), maar onzichtbaar en niet bereikbaar
    className?: string
}

export function TicketStub({ item, index, total, active = true, className }: TicketStubProps) {
    const ref = useRef<HTMLElement>(null)

    // Wordt dit kaartje actief, dan "schuift het binnen"
    useEffect(() => {
        const el = ref.current
        if (!el || !active) return

        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                el,
                { y: 18, rotate: -1.2, opacity: 0 },
                { y: 0, rotate: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
            )
        })

        return () => mm.revert()
    }, [active])

    return (
        <article
            ref={ref}
            id={`ticket-${item.id}`}
            role="tabpanel"
            aria-labelledby={`note-${item.id}`}
            inert={!active}
            // --notch = achtergrondkleur van de sectie, zodat de uitsparingen "doorzichtig" lijken
            className={cn(
                "relative flex flex-col overflow-hidden rounded-xl border border-white/15 bg-white/5 text-white [--notch:var(--color-black)] sm:flex-row",
                !active && "invisible",
                className
            )}
        >
            {/* Hoofdgedeelte */}
            <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <div>
                    <Badge
                        variant="outline"
                        size="xs"
                        radius="full"
                        className="hover:bg-transparent"
                    >
                        {item.type === "work" ? "Residency" : "Masterclass"}
                    </Badge>

                    <h3 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">{item.role}</h3>

                    <p className="mt-1 text-white/70">
                        {item.company}
                        {item.location && <span className="text-white/50">, {item.location}</span>}
                    </p>
                    <p className="mt-1 text-sm text-brand-600">{formatPeriod(item.start, item.end)}</p>
                </div>

                <p className="max-w-prose text-white/80">{item.summary}</p>

                {item.highlights && item.highlights.length > 0 && (
                    <ul className="flex flex-col gap-2 text-sm text-white/80">
                        {item.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-2">
                                <span aria-hidden="true" className="text-brand-600">
                                    ♪
                                </span>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                )}

                <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Gebruikte technieken">
                    {item.stack.map((tech) => (
                        <li key={tech}>
                            <Badge
                                variant="outline"
                                size="xs"
                                radius="full"
                                className="border-white/20 text-white/80 hover:bg-transparent"
                            >
                                {tech}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Controlestrook: puur decoratief, alle info staat al in het hoofdgedeelte */}
            <div
                aria-hidden="true"
                className="relative flex shrink-0 items-center justify-between gap-4 border-t border-dashed border-white/25 p-6 sm:w-44 sm:flex-col sm:items-stretch sm:justify-between sm:border-t-0 sm:border-l"
            >
                {/* Uitsparingen op de perforatielijn */}
                <span className="absolute -top-3 -left-3 size-6 rounded-full border border-white/15 bg-(--notch)" />
                <span className="absolute -top-3 -right-3 size-6 rounded-full border border-white/15 bg-(--notch) sm:top-auto sm:right-auto sm:-bottom-3 sm:-left-3" />

                <div>
                    <p className="font-heading text-4xl font-semibold text-brand-600">{startYear(item.start)}</p>
                    <p className="mt-1 text-sm text-white/60">
                        Nr. {index + 1} van {total}
                    </p>
                </div>

                {/* Streepjescode */}
                <div className="h-10 w-24 opacity-40 sm:w-full bg-[repeating-linear-gradient(90deg,var(--color-white)_0_2px,transparent_2px_5px,var(--color-white)_5px_6px,transparent_6px_10px)]" />
            </div>
        </article>
    )
}
