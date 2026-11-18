import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "../../lib/cn"
import { useCurrentPage } from "./NavItems"

// Eén plek om de neonkleur te tunen (pak bv. een oranje die bij het logo past)
const neon = {
    color: "var(--color-brand-500, #d4a24a)",
    textShadow: [
        "0 0 2px color-mix(in srgb, var(--color-brand-500, #d4a24a) 70%, transparent)",
        "0 0 8px color-mix(in srgb, var(--color-brand-600, #b8893b) 60%, transparent)",
        "0 0 18px color-mix(in srgb, var(--color-brand-600, #b8893b) 35%, transparent)",
    ].join(", "),
} as const

export function NeonLabel({ className }: { className?: string }) {
    const page = useCurrentPage()
    const label = page?.label ?? ""
    const ref = useRef<HTMLSpanElement>(null)

    // Bij elke paginawissel knippert de buis één keer aan (reageert op de navigatie-actie)
    useEffect(() => {
        const el = ref.current
        if (!el || !label) return

        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline()
                .set(el, { opacity: 0 })
                .to(el, { opacity: 1, duration: 0.06 })
                .to(el, { opacity: 0.2, duration: 0.07 })
                .to(el, { opacity: 1, duration: 0.05 })
                .to(el, { opacity: 0.45, duration: 0.09 })
                .to(el, { opacity: 1, duration: 0.12 })
        })

        return () => mm.revert()
    }, [label])

    return (
        <p aria-live="polite" className={cn("font-heading text-2xl font-semibold tracking-wide sm:text-3xl", className)}>
            <span ref={ref} style={neon}>
                {label}
            </span>
        </p>
    )
}
