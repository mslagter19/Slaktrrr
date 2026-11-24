import { useRef } from "react"
import { gsap, useGSAP } from "../../lib/gsap"
import { useMotion } from "../gsap/Motion-context"
import { cn } from "../../lib/cn"

/*
 * Podiumlicht van boven: twee kegels en een warme lichtplek op de "vloer".
 * - Puur decoratief (aria-hidden, geen pointer events).
 * - Plaats in een sectie met `relative isolate overflow-clip` en een zwarte achtergrond,
 *   bv. <Spotlight className="absolute inset-0 -z-10" />
 * - De lamp hangt net boven beeld en het licht loopt bovenaan op uit het donker (mask),
 *   zodat er geen harde lichtrand ontstaat tegen de sectie erboven.
 * - Animatie: de lamp "slaat aan" met een flikkering zodra de sectie in beeld komt,
 *   daarna zwaait de brede kegel heel langzaam heen en weer.
 * - Staat beweging uit (useMotion of prefers-reduced-motion), dan staat het licht gewoon aan.
 */
export function Spotlight({ className }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const { enabled } = useMotion()

    useGSAP(
        () => {
            const el = ref.current
            if (!el || !enabled) return

            const mm = gsap.matchMedia()
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const wide = el.querySelector("[data-beam='wide']")

                // Aanslaan: flikkeren, dan rustig tot vol licht
                gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", once: true } })
                    .fromTo(el, { opacity: 0 }, { opacity: 0.55, duration: 0.06 })
                    .to(el, { opacity: 0.1, duration: 0.09 })
                    .to(el, { opacity: 0.85, duration: 0.05 })
                    .to(el, { opacity: 0.3, duration: 0.12 })
                    .to(el, { opacity: 1, duration: 0.7, ease: "power2.out" })

                // Langzame zwaai
                if (wide) {
                    gsap.to(wide, {
                        rotation: 1.6,
                        duration: 7,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                    })
                }
            })

            return () => mm.revert()
        },
        { scope: ref, dependencies: [enabled] }
    )

    return (
        <div ref={ref} aria-hidden="true" className={cn("pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_35%)]", className)}>
            {/* Brede kegel (zwaait mee) */}
            <div
                data-beam="wide"
                className="absolute -left-[20%] -top-[15%] h-[115%] w-[140%] origin-top bg-linear-to-b from-white/12 via-white/4 to-transparent [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]"
            />

            {/* Smalle, felle kern */}
            <div className="absolute -left-[20%] -top-[15%] h-[115%] w-[140%] bg-linear-to-b from-white/16 via-white/5 to-transparent [clip-path:polygon(46%_0,54%_0,78%_100%,22%_100%)]" />

            {/* Warme lichtplek onderaan */}
            <div className="absolute bottom-0 left-1/2 h-48 w-[80%] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_50%_100%,color-mix(in_oklab,var(--color-brand-600)_22%,transparent),transparent)]" />
        </div>
    )
}
