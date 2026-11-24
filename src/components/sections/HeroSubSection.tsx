import type { ReactNode } from "react"
import { Button } from "../ui/Button"
import { SplitHeading } from "../gsap/SplitHeading"
import { Eyebrow } from "../ui/Eyebrow"
import { PlayIcon } from "../ui/icons"

type SectionBackground = "white" | "black" | "brand" | "secondary" | "transparent"

type HeroSubSectionProps = {
    title?: string
    subtitle?: string
    description?: string
    className?: string
    container?: boolean
    background?: SectionBackground
    backgroundClassName?: string
    aside?: ReactNode // optioneel: element rechts naast de tekst (bv. <CaseSleeve />)
    actions?: ReactNode | null // knoppen onder de tekst: weglaten = standaardknoppen, null = geen knoppen
}

const backgrounds: Record<SectionBackground, string> = {
    white: "bg-white text-black",
    black: "bg-black text-white",
    brand: "bg-brand-900 text-white",
    secondary: "bg-secondary-900 text-white",
    transparent: "bg-transparent",
}

export function HeroSubSection({
    title,
    subtitle,
    description,
    background = "black",
    container = true,
    backgroundClassName,
    className = "",
    aside,
    actions,
}: HeroSubSectionProps) {
    return (
        <section
            aria-labelledby="hero-title"
            // overflow-x-clip: de aside mag rechts uitsteken zonder horizontale scroll
            className={`${backgroundClassName ?? backgrounds[background]} overflow-x-clip py-16 ${className}`}
        >
            <div className={container ? "mx-auto max-w-7xl px-6" : "px-6"}>
                {/* Zonder aside blijft het een enkele kolom; met aside: tekst links, element rechts */}
                <div
                    className={
                        aside
                            ? "grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] md:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)]"
                            : ""
                    }
                >
                    <div className="relative max-w-136">
                        <Eyebrow>{subtitle}</Eyebrow>

                        <SplitHeading
                            as="h1"
                            id="hero-title"
                            className="mt-4 font-heading text-[clamp(2.6rem,11vw,5.5rem)] leading-[0.98] font-semibold tracking-tight"
                        >
                            {title}
                        </SplitHeading>

                        <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                            {description}
                        </p>

                        {actions === undefined ? (
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Button
                                to="/cases"
                                size="lg"
                                className="rounded-xl"
                                leftIcon={
                                    <PlayIcon />
                                }
                            >
                                Bekijk werk
                            </Button>
                            <Button
                                to="/over-mij"
                                variant="outline"
                                size="lg"
                                className="rounded-xl"
                            >
                                Over mij
                            </Button>
                        </div>
                        ) : (
                            actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>
                        )}
                    </div>

                    {/* Negatieve marge: de aside loopt rechts buiten de container */}
                    {aside && <div className="relative md:-mr-12 lg:-mr-24 xl:-mr-40">{aside}</div>}
                </div>
            </div>
        </section>
    )
}
