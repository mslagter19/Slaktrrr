import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { useMotion } from "@/hooks/useMotion"
import { cn } from "@/lib/cn"
import { ReviewCard, type Review, type Suit } from "./ReviewCard"

type ReviewHandProps = {
    reviews: Review[]
    className?: string
}

// Als een review geen suit heeft, wisselen we af zodat de hand er gevarieerd uitziet
const SUIT_CYCLE: Suit[] = ["spades", "hearts", "clubs", "diamonds"]

export function ReviewHand({ reviews, className }: ReviewHandProps) {
    const rootRef = useRef<HTMLDivElement>(null)
    const { enabled } = useMotion()
    const applyRef = useRef<((active: number | null, deal?: boolean) => void) | null>(null)
    const dealtRef = useRef(false)

    const [active, setActive] = useState<number | null>(null)
    const [revealed, setRevealed] = useState(false)

    /* ---------- 1. Waaier-layout (alleen vanaf lg; op mobiel is het een scroll-rij) ---------- */
    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const mm = gsap.matchMedia()

        mm.add("(min-width: 1024px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-review-card]", root)
            const n = cards.length
            if (n === 0) return

            const mid = (n - 1) / 2
            const spread = Math.min(8, 36 / n) // graden tussen kaarten
            const overlap = Math.min(120, 640 / n) // px tussen kaarten
            const reduce = !enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches

            const target = (i: number, a: number | null) => {
                const d = i - mid
                let x = d * overlap
                let y = d * d * 7 // lichte boog: buitenste kaarten hangen lager
                let rotation = d * spread
                let scale = 1

                if (a !== null) {
                    if (i === a) {
                        y = -56
                        rotation = 0
                        scale = 1.06
                    } else {
                        x += i < a ? -44 : 44 // buren schuiven opzij
                    }
                }

                return { x, y, rotation, scale, zIndex: i === a ? 50 : i + 1 }
            }

            // Startpositie: gestapeld en onzichtbaar, tot de sectie in beeld komt
            gsap.set(cards, { x: 0, y: 40, rotation: 0, scale: 1, opacity: 0, transformOrigin: "50% 130%" })

            applyRef.current = (a, deal = false) => {
                cards.forEach((card, i) => {
                    gsap.to(card, {
                        ...target(i, a),
                        opacity: 1,
                        duration: reduce ? 0 : deal ? 0.8 : 0.5,
                        delay: deal && !reduce ? i * 0.08 : 0,
                        ease: "power3.out",
                        overwrite: "auto",
                    })
                })
            }

            // Als het scherm pas na het uitdelen groter wordt: meteen op positie
            if (dealtRef.current) applyRef.current(null)

            return () => {
                applyRef.current = null
            }
        })

        // revert() ruimt alle inline GSAP-stijlen op, zodat mobiel schoon blijft
        return () => mm.revert()
    }, [reviews.length, enabled])

    /* ---------- 2. Eenmalig uitdelen zodra de hand in beeld komt ---------- */
    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.35 }
        )
        observer.observe(root)
        return () => observer.disconnect()
    }, [])

    /* ---------- 3. Reageren op de actieve kaart ---------- */
    useEffect(() => {
        if (!revealed) return
        const deal = !dealtRef.current
        dealtRef.current = true
        applyRef.current?.(active, deal)
    }, [active, revealed])

    if (reviews.length === 0) return null

    return (
        <div
            ref={rootRef}
            role="group"
            aria-label="Reviews"
            onPointerLeave={() => setActive(null)}
            className={cn(
                // Mobiel: horizontaal scrollen met snap
                "-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pt-4 pb-8 [scrollbar-width:none]",
                // Desktop: kaarten absoluut gepositioneerd, GSAP doet de rest
                "lg:relative lg:mx-auto lg:block lg:h-[32rem] lg:max-w-4xl lg:snap-none lg:overflow-visible lg:px-0 lg:pt-0 lg:pb-0",
                className
            )}
        >
            {reviews.map((review, i) => (
                <ReviewCard
                    key={review.id}
                    review={{ ...review, suit: review.suit ?? SUIT_CYCLE[i % SUIT_CYCLE.length] }}
                    data-review-card=""
                    tabIndex={0}
                    onPointerEnter={(e) => {
                        if (e.pointerType === "mouse") setActive(i)
                    }}
                    onClick={() => setActive((prev) => (prev === i ? null : i))} // aanraken op touch/tablet
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="shrink-0 snap-center lg:absolute lg:bottom-0 lg:left-1/2 lg:-ml-36"
                />
            ))}
        </div>
    )
}
