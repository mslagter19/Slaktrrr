import { useEffect, useRef, useState, type RefObject } from "react"
import { Link } from "react-router-dom"
import { gsap, useGSAP } from "../../lib/gsap"
import { useMotion } from "../gsap/Motion-context"
import { Flamingo, FlamingoEasterEgg } from "../ui/Flamingo"

/*
 * Easter egg in de hero: af en toe vliegt de neon-flamingo binnen over een van de notenbalklijnen,
 * landt even op het midden van de draaiende plaat en vliegt dan door.
 * Wie hem op tijd aanklikt, gaat naar /experiment (state.caught = true), waar hij ook op een plaat staat.
 * - De overlay heeft dezelfde maat en plek als de notenbalk in HeroSection; houd die gelijk.
 * - targetRef: de wrapper van de plaat. Het landingspunt wordt bij elke passage opnieuw gemeten,
 *   zodat het op elk scherm (mobiel: plaat half uit beeld) klopt.
 * - Eerste passage na 10 tot 25 s, daarna elke 30 tot 60 s, alleen als de hero in beeld is
 *   en het tabblad zichtbaar is. Een passage duurt ±5 s.
 * - Motion uit: geen vlucht, hij staat een paar seconden stil op de plaat en verdwijnt dan.
 */

// Zet tijdelijk op true om de flamingo snel achter elkaar te laten verschijnen
const SNEL_TESTEN = false

// Lijnen van de notenbalk als fractie van de hoogte: y = 20/60/100/140/180 van 200 (zie STAFF_LINES in HeroSection)
const LINES = [0.1, 0.3, 0.5, 0.7, 0.9]

const STAND_SECONDS = 5

type Pass = { id: number; line: number }

type HeroFlamingoProps = {
    targetRef?: RefObject<HTMLElement | null>
}

const between = (min: number, max: number) => min + Math.random() * (max - min)
const pick = (length: number) => Math.floor(Math.random() * length)

export function HeroFlamingo({ targetRef }: HeroFlamingoProps) {
    const { enabled } = useMotion()
    const overlayRef = useRef<HTMLDivElement>(null)
    const flyerRef = useRef<HTMLDivElement>(null)
    const standerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const inView = useRef(false)
    const firstPass = useRef(true)
    const [pass, setPass] = useState<Pass | null>(null)

    // Is de notenbalk (grotendeels) in beeld?
    useEffect(() => {
        const overlay = overlayRef.current
        if (!overlay) return
        const observer = new IntersectionObserver(([entry]) => (inView.current = entry.isIntersecting), {
            threshold: 0.5,
        })
        observer.observe(overlay)
        return () => observer.disconnect()
    }, [])

    // Planning: zolang er geen passage loopt, staat er een timer voor de volgende
    useEffect(() => {
        if (pass) return

        const seconds = SNEL_TESTEN ? 2 : firstPass.current ? between(10, 25) : between(30, 60)
        let timer: number

        const tryStart = () => {
            if (inView.current && document.visibilityState === "visible") {
                firstPass.current = false
                setPass({ id: Date.now(), line: pick(LINES.length) })
            } else {
                timer = window.setTimeout(tryStart, 5000)
            }
        }

        timer = window.setTimeout(tryStart, seconds * 1000)
        return () => window.clearTimeout(timer)
    }, [pass])

    // Motion uit: na een paar seconden stilstaan weer weg
    useEffect(() => {
        if (!pass || enabled) return
        const timer = window.setTimeout(() => setPass(null), STAND_SECONDS * 1000)
        return () => window.clearTimeout(timer)
    }, [pass, enabled])

    useGSAP(
        () => {
            const overlay = overlayRef.current
            if (!pass || !overlay) return

            // Midden van de plaat, gemeten ten opzichte van de overlay (zonder plaat: rechts op de lijn)
            const area = overlay.getBoundingClientRect()
            const disc = targetRef?.current?.getBoundingClientRect()
            const lineY = LINES[pass.line] * area.height
            const landX = disc ? disc.left + disc.width / 2 - area.left : area.width * 0.6
            const landY = disc ? disc.top + disc.height / 2 - area.top : lineY

            // Motion uit: direct op het midden van de plaat zetten (geen animatie)
            if (!enabled) {
                if (standerRef.current) gsap.set(standerRef.current, { x: landX, y: landY })
                return
            }

            const flyer = flyerRef.current
            if (!flyer) return

            const fly = flyer.querySelector("[data-pose='fly']")
            const stand = flyer.querySelector("[data-pose='stand']")
            const width = flyer.offsetWidth
            const x = landX - width / 2 // de flyer staat met zijn onderkant-midden op het landingspunt

            timelineRef.current = gsap
                .timeline({ onComplete: () => setPass(null) })
                .set(fly, { autoAlpha: 1 })
                .set(stand, { autoAlpha: 0, transformOrigin: "50% 100%" })

                // Aanvliegen (0 tot 2 s): binnen over een lijn, afremmen en omlaag naar het midden van de plaat
                .fromTo(flyer, { x: -width }, { x, duration: 2, ease: "power2.out" }, 0)
                .fromTo(flyer, { y: lineY - 30 }, { y: lineY - 40, duration: 0.8, ease: "sine.inOut" }, 0)
                .to(flyer, { y: landY, duration: 1.2, ease: "power2.out" }, 0.8)

                // Landen (2 s): wissel naar de staande pose, met een kleine squash
                .to(fly, { autoAlpha: 0, duration: 0.12 }, 2)
                .to(stand, { autoAlpha: 1, duration: 0.12 }, 2)
                .fromTo(stand, { scaleY: 0.9 }, { scaleY: 1, duration: 0.35, ease: "back.out(3)" }, 2)

                // Even staan: één knikje, alsof hij meeluistert
                .to(stand, { rotation: 6, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.45)

                // Opstijgen (3 s): terug naar de vliegpose en versnellend rechts uit beeld
                .to(stand, { autoAlpha: 0, duration: 0.12 }, 3)
                .to(fly, { autoAlpha: 1, duration: 0.12 }, 3)
                .to(flyer, { x: area.width + width * 0.2, duration: 2, ease: "power2.in" }, 3)
                .to(flyer, { y: landY - 60, duration: 1.2, ease: "power2.out" }, 3)
        },
        { scope: overlayRef, dependencies: [pass, enabled] }
    )

    const pause = () => timelineRef.current?.pause()
    const resume = () => timelineRef.current?.resume()

    return (
        <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-x-0 top-[22vh] z-10 h-[48vh] md:top-1/2 md:-translate-y-1/2"
        >
            {pass && enabled && (
                // aspect-[2/1] = viewBox van de vliegpose; de onderkant van dit vlak is het "landingspunt" (GSAP zet x/y)
                <div
                    key={pass.id}
                    ref={flyerRef}
                    className="absolute top-0 left-0 aspect-[2/1] w-32 -translate-y-full md:w-44"
                >
                    <Link
                        to="/experiment"
                        state={{ caught: true }}
                        aria-label="Ontdek het geheime experiment"
                        onClick={pause}
                        onFocus={pause}
                        onBlur={resume}
                        className="pointer-events-auto relative block size-full rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                    >
                        {/* Vliegpose: poten liggen op 100/160, dus 37,5% omlaag om ze op het landingspunt te zetten */}
                        <span data-pose="fly" className="block translate-y-[37.5%]">
                            <Flamingo alt="" pose="fly" />
                        </span>
                        {/* Staande pose: voet ligt op 304/320, dus 5% omlaag */}
                        <span
                            data-pose="stand"
                            className="invisible absolute bottom-0 left-1/2 block w-[40%] -translate-x-1/2 translate-y-[5%]"
                        >
                            <Flamingo alt="" />
                        </span>
                    </Link>
                </div>
            )}

            {pass && !enabled && (
                // Voet (304/320) op het midden van de plaat; GSAP zet x/y
                <div
                    key={pass.id}
                    ref={standerRef}
                    className="absolute top-0 left-0 w-14 -translate-x-1/2 -translate-y-[95%] md:w-20"
                >
                    <FlamingoEasterEgg state={{ caught: true }} className="pointer-events-auto block" flamingoClassName="w-full" />
                </div>
            )}
        </div>
    )
}
