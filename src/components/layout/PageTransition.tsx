import { useEffect, useLayoutEffect, useRef } from "react"
import { useBlocker, useLocation } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "@/lib/gsap"
import { TransitionOverlay } from "./TransitionOverlay"

const COVER_DURATION = 0.7
const REVEAL_DURATION = 0.7
const EASE = "power3.inOut"

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Plaats dit component één keer in je AppShell (naast <Navigation />).
 * Het rendert alleen het doek; de <main id="main"> blijft in AppShell staan.
 *
 * Werking:
 * 1. useBlocker onderschept élke navigatie naar een andere pad (Link, CardTitle, back-knop).
 * 2. Het doek veegt omhoog en bedekt de oude pagina.
 * 3. Zodra het bedekt is: scroll naar boven + blocker.proceed() -> React Router rendert de nieuwe pagina.
 * 4. Het doek veegt verder omhoog en onthult de nieuwe pagina.
 */
export function PageTransition() {
    const panelRef = useRef<HTMLDivElement>(null)
    const discRef = useRef<SVGSVGElement>(null)
    const spinRef = useRef<gsap.core.Tween | null>(null)
    const isCovering = useRef(false)
    const { pathname } = useLocation()

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname
    )

    // Beginstand: doek verborgen onder het beeld, vinyl klaar om te draaien
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(panelRef.current, { yPercent: 100, autoAlpha: 0 })
            spinRef.current = gsap.to(discRef.current, {
                rotation: 360,
                duration: 2.4,
                ease: "none",
                repeat: -1,
                paused: true,
                transformOrigin: "50% 50%",
            })
        })
        return () => ctx.revert()
    }, [])

    // Uit-animatie: doek dicht, dan pas navigeren
    useEffect(() => {
        if (blocker.state !== "blocked" || isCovering.current) return

        if (prefersReducedMotion()) {
            window.scrollTo(0, 0)
            blocker.proceed()
            return
        }

        isCovering.current = true
        spinRef.current?.play()

        gsap.timeline()
            .set(panelRef.current, { yPercent: 100, autoAlpha: 1 })
            .to(panelRef.current, { yPercent: 0, duration: COVER_DURATION, ease: EASE })
            .add(() => {
                window.scrollTo(0, 0)
                blocker.proceed()
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocker.state])

    // In-animatie: nieuwe pagina staat er, doek veegt weg
    useEffect(() => {
        // Nieuwe pagina staat er: startposities van ScrollTriggers opnieuw berekenen,
        // ook nog een keer zodra de fonts geladen zijn (die veranderen de hoogte van koppen)
        ScrollTrigger.refresh()
        document.fonts?.ready.then(() => ScrollTrigger.refresh())

        if (!isCovering.current) return

        gsap.timeline({
            delay: 0.15,
            onComplete: () => {
                isCovering.current = false
                spinRef.current?.pause()
                gsap.set(panelRef.current, { yPercent: 100, autoAlpha: 0 })
            },
        })
            .to(panelRef.current, { yPercent: -100, duration: REVEAL_DURATION, ease: EASE })
            // Toegankelijkheid: focus naar <main> voor schermlezers en toetsenbordgebruikers
            .add(() => document.getElementById("main")?.focus({ preventScroll: true }), 0)
    }, [pathname])

    return <TransitionOverlay panelRef={panelRef} discRef={discRef} />
}
