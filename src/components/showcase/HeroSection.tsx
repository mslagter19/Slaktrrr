import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { CountUp } from "../ui/CountUp"
import { Vinyl } from "../ui/Vinyl"

/*
 * De hero rekent met de bottom-navigatie via de CSS-variabele --nav-h.
 * Zet die één keer in je layout/thema, bv.:  :root { --nav-h: 72px }
 * Onderpadding = nav-hoogte + extra ruimte, zodat de knoppen nooit onder de nav verdwijnen.
 */
export function HeroSection() {
    const armRef = useRef<SVGSVGElement>(null)

    // Eén georkestreerd moment: de naald zakt op de plaat (alleen mobiel, alleen met beweging toegestaan)
    useEffect(() => {
        const arm = armRef.current
        if (!arm) return

        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                arm,
                { rotation: -18 },
                { rotation: 0, duration: 1.4, ease: "power2.out", transformOrigin: "88% 8%" }
            )
        })
        return () => mm.revert()
    }, [])

    return (
        <section
            aria-labelledby="hero-title"
            className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden bg-black px-5 pt-8 pb-[calc(var(--nav-h,72px)+2rem)] text-white md:px-[max(3rem,8vw)]"
        >
            {/* Warme gloed achter de plaat */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_40%,color-mix(in_oklab,var(--color-brand-600)_16%,transparent),transparent_70%)]"
            />

            {/* Plaat: op mobiel half uit beeld en gedimd, op desktop rechts als anker */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-[6vh] -right-[38vw] -z-10 w-[120vw] max-w-184 opacity-55 md:top-1/2 md:-right-[8vw] md:w-[52vw] md:-translate-y-1/2 md:opacity-100"
            >
                <Vinyl
                    alt=""
                    trigger="always"
                    duration={9}
                    labelText="SLAKTRRR"
                    labelSubText="33 RPM · SIDE A"
                />
            </div>

            {/* Tonearm (alleen mobiel) */}
            <svg
                ref={armRef}
                aria-hidden="true"
                viewBox="0 0 160 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                className="absolute top-[2vh] right-[6vw] -z-10 w-[34vw] max-w-60 text-white md:hidden"
            >
                <circle cx="140" cy="20" r="14" fill="var(--color-black)" />
                <path d="M140 20 L60 140 L48 170" />
                <rect
                    x="34"
                    y="166"
                    width="26"
                    height="14"
                    rx="3"
                    fill="var(--color-brand-600)"
                    stroke="none"
                    transform="rotate(-30 47 173)"
                />
            </svg>

            <div className="relative max-w-136">
                <Badge variant="eyebrow" size="none" radius="none" className="text-brand-600">
                    <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                    Side A · Front-end developer
                </Badge>

                <h1
                    id="hero-title"
                    className="mt-4 font-heading text-[clamp(2.6rem,11vw,5.5rem)] leading-[0.98] font-semibold tracking-tight"
                >
                    Interfaces met <em className="font-medium text-brand-600">ritme</em> en karakter.
                </h1>

                <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                    Ik bouw snelle, toegankelijke websites in React en Tailwind. Strak als noir, losjes als jazz.
                    Elk project een nieuw nummer.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                        href="#werk"
                        size="lg"
                        className="rounded-full text-black"
                        leftIcon={
                            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M4 2l10 6-10 6z" fill="currentColor" />
                            </svg>
                        }
                    >
                        Bekijk werk
                    </Button>
                    <Button
                        to="/over-mij"
                        variant="outline"
                        size="lg"
                        className="rounded-full border-white/30 text-white hover:bg-white/10"
                    >
                        Over mij
                    </Button>
                </div>

                {/* USP's: twee tellers en één tekstwaarde */}
                <dl className="mt-8 flex gap-8 text-xs tracking-wider text-white/60 uppercase">
                    <div>
                        <dt>jaar ervaring</dt>
                        <dd className="font-heading text-lg tracking-normal text-white normal-case">
                            <CountUp to={6} suffix="+" duration={1.6} start="mount" />
                        </dd>
                    </div>
                    <div>
                        <dt>projecten</dt>
                        <dd className="font-heading text-lg tracking-normal text-white normal-case">
                            <CountUp to={40} duration={2.2} delay={0.2} start="mount" />
                        </dd>
                    </div>
                    <div>
                        <dt>stack</dt>
                        <dd className="font-heading text-lg tracking-normal text-white normal-case">
                            React · Laravel
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    )
}
