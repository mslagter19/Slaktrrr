import { useEffect, useMemo, useRef, type KeyboardEvent } from "react"
import { gsap } from "gsap"
import { cn } from "../../lib/cn"
import { formatPeriod, startYear, toMonths, type Experience } from "./Experience.data"

/* ---------- Geometrie (px) ---------- */
const HEIGHT = 230
const LINE_GAP = 14 // afstand tussen twee notenbalklijnen
const STEP = LINE_GAP / 2 // één toonhoogte-stap = van lijn naar spatie
const STAFF_BOTTOM = 146
const STAFF_TOP = STAFF_BOTTOM - LINE_GAP * 4
const STAFF_MIDDLE = STAFF_BOTTOM - LINE_GAP * 2

const PADDING_LEFT = 96
const PADDING_RIGHT = 140
const PX_PER_MONTH = 7 // hoe "breed" een maand is
const MIN_GAP = 128 // minimale ruimte tussen twee noten, zodat ze nooit overlappen
const MIN_SLUR = 72 // minimale lengte van de boog

const SLUR_BELOW_Y = 166 // werk: boog onder de balk
const SLUR_ABOVE_Y = 72 // opleiding: boog boven de balk
const YEAR_Y = 210
const STEM_LENGTH = 30

/* ---------- Layout ---------- */
type PlacedNote = {
    item: Experience
    x: number
    y: number
    endX: number
    stemUp: boolean
    current: boolean
}

function layout(items: Experience[]) {
    const first = toMonths(items[0].start)
    const now = new Date()
    const nowMonths = now.getFullYear() * 12 + now.getMonth()

    let previousX = -Infinity

    const placed: PlacedNote[] = items.map((item) => {
        const dateX = PADDING_LEFT + (toMonths(item.start) - first) * PX_PER_MONTH
        const x = Math.max(dateX, previousX + MIN_GAP)
        previousX = x

        const endMonths = item.end ? toMonths(item.end) : nowMonths
        const dateEndX = PADDING_LEFT + (endMonths - first) * PX_PER_MONTH
        const endX = Math.max(dateEndX, x + MIN_SLUR)

        const y = STAFF_BOTTOM - item.pitch * STEP

        return { item, x, y, endX, stemUp: y > STAFF_MIDDLE, current: !item.end }
    })

    const last = placed[placed.length - 1]
    const width = Math.max(last.x, last.endX) + PADDING_RIGHT

    return { placed, width }
}

/* ---------- Component ---------- */
type ScoreProps = {
    items: Experience[]
    activeId: string
    onSelect: (id: string) => void
    className?: string
}

export function Score({ items, activeId, onSelect, className }: ScoreProps) {
    const scrollerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const mounted = useRef(false)

    const { placed, width } = useMemo(() => layout(items), [items])

    // De actieve noot schuift naar het midden van het scherm
    useEffect(() => {
        const scroller = scrollerRef.current
        const target = placed.find((note) => note.item.id === activeId)
        if (!scroller || !target) return

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        scroller.scrollTo({
            left: target.x - scroller.clientWidth / 2,
            behavior: mounted.current && !reduceMotion ? "smooth" : "auto",
        })
        mounted.current = true
    }, [activeId, placed])

    // Kleine "aanslag": de ring rond de noot veert op bij selectie
    useEffect(() => {
        const ring = listRef.current?.querySelector(`#note-${CSS.escape(activeId)} [data-note-ring]`)
        if (!ring) return

        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(ring, { scale: 0.5 }, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.45)" })
        })

        return () => mm.revert()
    }, [activeId])

    // Pijltjestoetsen bladeren door de noten (zoals bij tabs)
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return
        event.preventDefault()

        const current = items.findIndex((item) => item.id === activeId)
        let next = current
        if (event.key === "ArrowRight") next = Math.min(current + 1, items.length - 1)
        if (event.key === "ArrowLeft") next = Math.max(current - 1, 0)
        if (event.key === "Home") next = 0
        if (event.key === "End") next = items.length - 1

        const id = items[next].id
        onSelect(id)
        listRef.current?.querySelector<HTMLButtonElement>(`#note-${CSS.escape(id)}`)?.focus()
    }

    return (
        <div className={cn("relative", className)}>
            <div
                ref={scrollerRef}
                className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [&::-webkit-scrollbar]:hidden"
            >
                <div
                    ref={listRef}
                    role="tablist"
                    aria-label="Loopbaan als partituur"
                    onKeyDown={handleKeyDown}
                    className="relative"
                    style={{ width, height: HEIGHT }}
                >
                    {/* Alles wat niet klikbaar is: balk, stelen, bogen, jaartallen */}
                    <svg
                        width={width}
                        height={HEIGHT}
                        viewBox={`0 0 ${width} ${HEIGHT}`}
                        className="absolute inset-0 text-white"
                        aria-hidden="true"
                        focusable="false"
                    >
                        {/* Vijf lijnen */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <line
                                key={i}
                                x1={24}
                                x2={width - 44}
                                y1={STAFF_BOTTOM - i * LINE_GAP}
                                y2={STAFF_BOTTOM - i * LINE_GAP}
                                stroke="currentColor"
                                strokeOpacity={0.28}
                            />
                        ))}

                        {/* Beginstreep */}
                        <line x1={24} x2={24} y1={STAFF_TOP} y2={STAFF_BOTTOM} stroke="currentColor" strokeWidth={3} strokeOpacity={0.7} />

                        {/* Maatstreep tussen elke twee rollen */}
                        {placed.slice(0, -1).map((note, i) => {
                            const barX = (note.x + placed[i + 1].x) / 2
                            return (
                                <line
                                    key={note.item.id}
                                    x1={barX}
                                    x2={barX}
                                    y1={STAFF_TOP}
                                    y2={STAFF_BOTTOM}
                                    stroke="currentColor"
                                    strokeOpacity={0.4}
                                />
                            )
                        })}

                        {/* Eindstreep: dun + dik */}
                        <line x1={width - 56} x2={width - 56} y1={STAFF_TOP} y2={STAFF_BOTTOM} stroke="currentColor" strokeOpacity={0.7} />
                        <line x1={width - 47} x2={width - 47} y1={STAFF_TOP} y2={STAFF_BOTTOM} stroke="currentColor" strokeWidth={4} strokeOpacity={0.7} />

                        {placed.map(({ item, x, y, endX, stemUp, current }) => {
                            const isActive = item.id === activeId
                            const isEducation = item.type === "education"
                            const slurY = isEducation ? SLUR_ABOVE_Y : SLUR_BELOW_Y
                            const slurBend = isEducation ? -26 : 26

                            return (
                                <g key={item.id}>
                                    {/* Stem */}
                                    <line
                                        x1={stemUp ? x + 6.5 : x - 6.5}
                                        x2={stemUp ? x + 6.5 : x - 6.5}
                                        y1={y}
                                        y2={stemUp ? y - STEM_LENGTH : y + STEM_LENGTH}
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        strokeOpacity={0.8}
                                    />

                                    {/* Boog (legato): hoe lang de periode duurde. Gestippeld = loopt nog */}
                                    <path
                                        d={`M ${x} ${slurY} Q ${(x + endX) / 2} ${slurY + slurBend} ${endX} ${slurY}`}
                                        fill="none"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeDasharray={current ? "2 6" : undefined}
                                        className={cn(
                                            "transition-colors motion-reduce:transition-none",
                                            isActive ? "stroke-brand-600" : "stroke-white/45"
                                        )}
                                    />

                                    {/* Fermate: de huidige rol blijft klinken */}
                                    {current && (
                                        <g transform={`translate(${x} 62)`} className={isActive ? "text-brand-600" : "text-white/70"}>
                                            <path d="M -11 0 Q 0 -15 11 0" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                                            <circle cx={0} cy={-4} r={1.8} fill="currentColor" />
                                        </g>
                                    )}

                                    {/* Beginjaar */}
                                    <text
                                        x={x}
                                        y={YEAR_Y}
                                        textAnchor="middle"
                                        fontSize={12}
                                        letterSpacing={1.5}
                                        className={cn(
                                            "transition-colors motion-reduce:transition-none",
                                            isActive ? "fill-brand-600" : "fill-white/60"
                                        )}
                                    >
                                        {startYear(item.start)}
                                    </text>
                                </g>
                            )
                        })}
                    </svg>

                    {/* Klikbare noten (echte knoppen, dus toetsenbord en screenreader werken) */}
                    {placed.map(({ item, x, y }) => {
                        const isActive = item.id === activeId
                        const isEducation = item.type === "education"

                        return (
                            <button
                                key={item.id}
                                id={`note-${item.id}`}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`ticket-${item.id}`}
                                tabIndex={isActive ? 0 : -1}
                                onClick={() => onSelect(item.id)}
                                style={{ left: x, top: y }}
                                className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                            >
                                <span
                                    data-note-ring
                                    className="absolute inset-1 rounded-full border border-brand-600 opacity-0 transition-opacity group-aria-selected:opacity-100 motion-reduce:transition-none"
                                />
                                <span
                                    className={cn(
                                        "relative block h-3 w-[17px] -rotate-[20deg] rounded-full transition-colors group-hover:scale-110 motion-reduce:transition-none",
                                        isEducation
                                            ? "border-2 border-white group-aria-selected:border-brand-600"
                                            : "bg-white group-aria-selected:bg-brand-600"
                                    )}
                                />
                                <span className="sr-only">
                                    {item.role} bij {item.company}, {formatPeriod(item.start, item.end)}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
