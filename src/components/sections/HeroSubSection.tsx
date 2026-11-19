import type { ReactNode } from "react"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { SplitHeading } from "../gsap/SplitHeading"

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
}: HeroSubSectionProps) {
    return (
        <section
            aria-labelledby="hero-title"
            className={`${backgroundClassName ?? backgrounds[background]} py-16 ${className}`}
        >
            <div className={container ? "mx-auto max-w-7xl px-6" : "px-6"}>
                {/* Zonder aside blijft het een enkele kolom; met aside: tekst links, element rechts */}
                <div
                    className={
                        aside
                            ? "grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:gap-16"
                            : ""
                    }
                >
                    <div className="relative max-w-136">
                        <Badge variant="eyebrow" size="none" radius="none" className="text-brand-600">
                            <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                            {subtitle}
                        </Badge>

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

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Button
                                href="#werk"
                                size="lg"
                                className="rounded-xl text-black"
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
                                className="rounded-xl border-white/30 text-white hover:bg-white/10"
                            >
                                Over mij
                            </Button>
                        </div>
                    </div>

                    {aside && <div className="relative">{aside}</div>}
                </div>
            </div>
        </section>
    )
}
