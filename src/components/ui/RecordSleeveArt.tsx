import { Vinyl } from "./Vinyl"
import { cn } from "../../lib/cn"
import type { ReactNode } from "react"

type RecordSleeveArtProps = {
    cover: string // wordt hoes ÉN vinyl-label
    title: string // voor de alt-tekst van de hoes
    badge?: ReactNode // optioneel, bv. <Badge variant="secondary" size="xs">2025</Badge>
    className?: string
}

// Moet binnen een element met class "group" staan (je <Card> is dat al)
export function RecordSleeveArt({ cover, title, badge, className }: RecordSleeveArtProps) {
    return (
        <div className={cn("relative w-2/3 m-auto", className)}>
            {/* De plaat: achter de hoes, schuift bij hover/focus half naar buiten */}
            <div
                className="
                    absolute top-[2%] left-[2%] z-0 w-[96%]
                    translate-x-[6%] transition-transform
                    duration-(--duration-standard) ease-(--ease-standard)
                    group-hover:translate-x-1/2 group-focus-within:translate-x-1/2
                    motion-reduce:transition-none
                "
            >
                <Vinyl alt="" labelSrc={cover} trigger="hover" />
            </div>

            {/* De hoes */}
            <div className="relative z-10 aspect-square overflow-hidden rounded-sm shadow-xl ring-1 ring-black/40">
                <img
                    src={cover}
                    alt={`Cover van project ${title}`}
                    loading="lazy"
                    className="size-full object-cover"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/10 via-transparent to-black/30"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[3%] rounded-full border border-white/5"
                />
                {badge && <div className="absolute top-3 left-3">{badge}</div>}
            </div>
        </div>
    )
}