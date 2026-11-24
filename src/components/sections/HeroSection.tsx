import { useRef } from "react"
import { SplitHeading } from "../gsap/SplitHeading"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { Vinyl } from "../ui/Vinyl"
import { HeroFlamingo } from "../experiment/HeroFlamingo"

/*
 * De hero rekent met de bottom-navigatie via de CSS-variabele --nav-h.
 * Zet die één keer in je layout/thema, bv.:  :root { --nav-h: 72px }
 * Onderpadding = nav-hoogte + extra ruimte, zodat de knoppen nooit onder de nav verdwijnen.
 */

// Notenbalk: 5 lijnen, gelijkmatig verdeeld over de hoogte van de SVG
const STAFF_LINES = [20, 60, 100, 140, 180]

function DownloadIcon() {
    return (
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
        </svg>
    )
}

export function HeroSection() {
    // De flamingo landt op het midden van deze plaat
    const vinylRef = useRef<HTMLDivElement>(null)

    return (
        <section
            aria-labelledby="hero-title"
            className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden bg-black pt-8 pb-[calc(var(--nav-h,72px)+2rem)] text-white"
        >
            {/* Laag 1 (onderste): warme gloed achter de plaat */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-30 bg-[radial-gradient(60%_50%_at_80%_40%,color-mix(in_oklab,var(--color-brand-600)_16%,transparent),transparent_70%)]"
            />

            {/* Laag 2: notenbalk (alleen vanaf md), loopt achter de plaat door en vervaagt richting de tekst */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[22vh] -z-20 hidden md:block md:top-1/2 md:-translate-y-1/2"
            >
                <svg
                    viewBox="0 0 1000 200"
                    preserveAspectRatio="none"
                    className="h-[48vh] w-full text-white md:h-[48vh] [mask-image:linear-gradient(to_right,transparent_15%,#000_55%)]"
                >
                    {STAFF_LINES.map((y) => (
                        <line
                            key={y}
                            x1="0"
                            x2="1000"
                            y1={y}
                            y2={y}
                            stroke="currentColor"
                            strokeOpacity="0.14"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </svg>
            </div>

            {/* Easter egg: af en toe vliegt er een flamingo over een lijn en landt hij op de plaat */}
            <HeroFlamingo targetRef={vinylRef} />

            {/* Laag 3: plaat. Op mobiel half uit beeld en gedimd, op desktop rechts als anker */}
            <div
                ref={vinylRef}
                aria-hidden="true"
                className="pointer-events-none absolute -top-[6vh] -right-[38vw] -z-10 w-[120vw] max-w-184 opacity-55 md:top-1/2 md:-right-[8vw] md:w-[40vw] md:max-w-none md:-translate-y-1/2 md:opacity-100"
            >
                <Vinyl
                    alt=""
                    trigger="always"
                    duration={9}
                    labelText="SLAKTRRR"
                    labelSubText="33 RPM · SIDE A"
                />
            </div>

            {/* Zelfde container als de andere secties: tekst lijnt nu uit */}
            <div className="relative mx-auto w-full max-w-7xl px-6">
                <div className="max-w-136">
                    <Badge variant="eyebrow" size="none" radius="none" className="text-brand-600">
                        <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                        Side A · Front-end developer
                    </Badge>

                    <SplitHeading
                        as="h1"
                        id="hero-title"
                        className="mt-4 font-heading text-[clamp(2.6rem,11vw,5.5rem)] leading-[0.98] font-semibold tracking-tight"
                    >
                        Interfaces met <em className="font-medium text-brand-600">ritme</em> en karakter.
                    </SplitHeading>

                    <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                        Ik bouw snelle, toegankelijke websites in React en Tailwind. Strak als noir, losjes als
                        jazz. Elk project een nieuw nummer.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Button
                            to="/cases"
                            size="lg"
                            className="rounded-full text-black rounded-xl"
                            leftIcon={
                                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M4 2l10 6-10 6z" fill="currentColor" />
                                </svg>
                            }
                        >
                            Bekijk mijn werk
                        </Button>
                        <Button
                            href="/cv/download"
                            download
                            variant="outline"
                            size="lg"
                            radius="lg"
                            className="border-white/30 text-white hover:bg-white/10"
                            leftIcon={<DownloadIcon />}
                        >
                            Download cv
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}