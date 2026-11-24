import { useRef, type RefObject } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { useMotion } from "@/hooks/useMotion"
import { cn } from "@/lib/cn"

/*
 * Roze confetti die uit een punt omhoog springt en daarna dwarrelend valt (Physics2D).
 * - Verhoog `fire` (een teller) om een nieuwe burst af te vuren; 0 = nog niets.
 * - `originRef`: het element waaruit de confetti komt. Zonder origin komt hij uit het midden van het scherm.
 * - Puur decoratief (aria-hidden). Staat motion uit, dan gebeurt er niets.
 */

const COLORS = ["bg-flamingo-300", "bg-flamingo-500", "bg-flamingo-700", "bg-white"]
const SHAPES = ["size-2 rounded-full", "h-1.5 w-3 rounded-[1px]", "h-3 w-1.5 rounded-[1px]"]

type ConfettiProps = {
    fire: number
    originRef?: RefObject<HTMLElement | null>
    count?: number
    className?: string
}

export function Confetti({ fire, originRef, count = 90, className }: ConfettiProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { enabled } = useMotion()

    useGSAP(
        () => {
            const root = ref.current
            if (!root || !enabled || fire === 0) return

            const box = originRef?.current?.getBoundingClientRect()
            const ox = box ? box.left + box.width / 2 : window.innerWidth / 2
            const oy = box ? box.top + box.height / 2 : window.innerHeight / 2
            const random = gsap.utils.random

            root.querySelectorAll<HTMLElement>("[data-piece]").forEach((piece) => {
                const duration = random(1.8, 2.6)

                gsap.set(piece, { x: ox, y: oy, autoAlpha: 1, rotation: random(0, 360), rotationX: 0 })
                gsap.to(piece, {
                    physics2D: { velocity: random(450, 950), angle: random(-125, -55), gravity: 1000 },
                    rotation: `+=${random(-720, 720)}`,
                    rotationX: random(360, 1080), // fladderen
                    duration,
                    ease: "none",
                })
                gsap.to(piece, { autoAlpha: 0, duration: 0.5, delay: duration - 0.5 })
            })
        },
        { scope: ref, dependencies: [fire, enabled] }
    )

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn("pointer-events-none fixed inset-0 z-50 overflow-hidden", className)}
        >
            {Array.from({ length: count }, (_, i) => (
                <span
                    key={i}
                    data-piece
                    className={cn("invisible absolute top-0 left-0", COLORS[i % COLORS.length], SHAPES[i % SHAPES.length])}
                />
            ))}
        </div>
    )
}
