import { useEffect, useRef } from "react"
import { gsap } from "../../lib/gsap"
import { useMotion } from "../gsap/Motion-context"
import { cn } from "../../lib/cn"
import { useCurrentPage } from "./NavItems"

export function NeonLabel({ className }: { className?: string }) {
    const page = useCurrentPage()
    const label = page?.label ?? ""
    const ref = useRef<HTMLSpanElement>(null)
    const { enabled } = useMotion()

    // Bij elke paginawissel knippert de buis één keer aan (reageert op de navigatie-actie)
    useEffect(() => {
        const el = ref.current
        if (!el || !label || !enabled) return

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
    }, [label, enabled])

    return (
        <p aria-live="polite" className={cn("font-heading text-2xl font-semibold tracking-wide sm:text-3xl", className)}>
            <span ref={ref} className="text-neon">
                {label}
            </span>
        </p>
    )
}
