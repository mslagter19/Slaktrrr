import { useId, useRef, useState, type ReactNode } from "react"
import { useLocation, Link } from "react-router-dom"
import { gsap, useGSAP } from "@/lib/gsap"
import { useMotion } from "@/hooks/useMotion"
import { Button } from "@/components/ui/Button"
import { NavModal } from "./NavModal"

type NavigationProps = {
    logo: ReactNode // je bestaande <Logo />
    music?: ReactNode // je bestaande muziekknop
}

// Coördinaten van de lijntjes: als hamburger en als kruisje
const LINES = {
    top: { burger: { x1: 4, y1: 7, x2: 20, y2: 7 }, cross: { x1: 6, y1: 6, x2: 18, y2: 18 } },
    bottom: { burger: { x1: 4, y1: 17, x2: 20, y2: 17 }, cross: { x1: 6, y1: 18, x2: 18, y2: 6 } },
}

/*
 * Hamburgericoon met twee GSAP-momenten:
 * - Hover/focus op de knop: de lijntjes pulseren om de beurt, als een equalizer.
 * - Open: boven- en onderlijn draaien naar een kruisje, de middelste vervaagt. Sluiten draait het terug.
 * Staat beweging uit (useMotion of prefers-reduced-motion), dan wisselt het icoon zonder animatie.
 */
function MenuIcon({ open }: { open: boolean }) {
    const ref = useRef<SVGSVGElement>(null)
    const eqRef = useRef<gsap.core.Timeline | null>(null)
    const { enabled } = useMotion()

    // Equalizer bij hover en keyboard-focus
    useGSAP(
        () => {
            const svg = ref.current
            const button = svg?.closest("button")
            if (!svg || !button || !enabled) return

            const mm = gsap.matchMedia()
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const lines = svg.querySelectorAll("line")
                const eq = gsap
                    .timeline({ paused: true, repeat: -1 })
                    .to(lines, {
                        scaleX: 0.55,
                        transformOrigin: "left center",
                        duration: 0.28,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: 1,
                        stagger: 0.12,
                    })
                eqRef.current = eq

                const start = () => eq.play()
                const stop = () => {
                    eq.pause()
                    gsap.to(lines, { scaleX: 1, duration: 0.2, ease: "power2.out" })
                }
                const onFocus = () => {
                    if (button.matches(":focus-visible")) start()
                }

                button.addEventListener("pointerenter", start)
                button.addEventListener("pointerleave", stop)
                button.addEventListener("focus", onFocus)
                button.addEventListener("blur", stop)

                return () => {
                    button.removeEventListener("pointerenter", start)
                    button.removeEventListener("pointerleave", stop)
                    button.removeEventListener("focus", onFocus)
                    button.removeEventListener("blur", stop)
                    eqRef.current = null
                }
            })

            return () => mm.revert()
        },
        { dependencies: [enabled] }
    )

    // Hamburger <-> kruisje
    useGSAP(
        () => {
            const svg = ref.current
            if (!svg) return

            const [top, middle, bottom] = Array.from(svg.querySelectorAll("line"))
            const animate = enabled && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            const duration = animate ? 0.35 : 0
            const shape = open ? "cross" : "burger"

            // Equalizer stoppen zodra het menu opengaat, anders vechten de twee animaties
            if (open && eqRef.current) {
                eqRef.current.pause(0)
                gsap.set(svg.querySelectorAll("line"), { scaleX: 1 })
            }

            gsap.to(top, { attr: LINES.top[shape], duration, ease: "power3.inOut" })
            gsap.to(bottom, { attr: LINES.bottom[shape], duration, ease: "power3.inOut" })
            gsap.to(middle, { opacity: open ? 0 : 1, duration: duration * 0.6, ease: "power2.out" })
        },
        { dependencies: [open, enabled] }
    )

    return (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            className="size-4 overflow-visible"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <line {...LINES.top.burger} />
            <line x1={4} y1={12} x2={15} y2={12} />
            <line {...LINES.bottom.burger} />
        </svg>
    )
}

export function Navigation({ logo, music }: NavigationProps) {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()
    const tooltipId = useId()

    // Sluit de poster bij elke routewissel (state aanpassen tijdens het renderen,
    // zodat er geen extra render-cyclus via een effect nodig is)
    const [prevPathname, setPrevPathname] = useState(pathname)
    if (pathname !== prevPathname) {
        setPrevPathname(pathname)
        setOpen(false)
    }

    return (
        <>
            <nav
                aria-label="Hoofdnavigatie"
                className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur"
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
                    <Link
                        to="/"
                        aria-label="Slaktrrr, naar de homepage"
                        className="shrink-0 text-brand-600 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 motion-reduce:transition-none"
                    >
                        {logo}
                    </Link>

                    <div className="flex items-center gap-8">
                        {music}

                        {/* 'relative' zodat de tooltip aan de knop vastzit */}
                        <div className="relative">


                            <Button
                                variant="outline"
                                size="md"
                                aria-haspopup="dialog"
                                aria-expanded={open}
                                aria-describedby={tooltipId}
                                onClick={() => setOpen(true)}
                                leftIcon={<MenuIcon open={open} />}
                            >
                                Menu
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <NavModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}