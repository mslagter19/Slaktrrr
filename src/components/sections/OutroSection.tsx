import { useState } from "react"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { WhiskeyGlassLine } from "../ui/LineArt"
import { ParallaxScene } from "../gsap/ParallaxScene"
import { ContactModal } from "../contact/ContactModal"
import { Spotlight } from "../ui/Spotlight"
import { Reveal } from "../gsap/Reveal"
import { SplitHeading } from "../gsap/SplitHeading"

type OutroSectionProps = {
    // Waar de cv-download naartoe wijst (later eventueel een Laravel-route)
    cvHref?: string
    // Laravel-endpoint voor het contactformulier
    contactEndpoint?: string
}

function MailIcon() {
    return (
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
            <path d="M2.5 4.5 8 9l5.5-4.5" />
        </svg>
    )
}

function DownloadIcon() {
    return (
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
        </svg>
    )
}

export function OutroSection({ cvHref = "/cv/download", contactEndpoint = "/api/contact" }: OutroSectionProps) {
    const [open, setOpen] = useState(false)

    return (
        <section
            id="contact"
            aria-labelledby="outro-titel"
            className="relative isolate overflow-clip bg-black py-28 text-white md:py-40"
        >
            {/* Podiumlicht */}
            <Spotlight className="absolute inset-0 -z-20" />

            {/* Whiskeyglas met parallax: iets trager dan de tekst, lichte rotatie */}
            <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div
                    data-speed="0.8"
                    data-rotate="3"
                    className="absolute -right-10 bottom-6 w-44 text-white/25 md:right-[8vw] md:bottom-16 md:w-72"
                >
                    <WhiskeyGlassLine />
                </div>
            </ParallaxScene>

            <div className="relative mx-auto max-w-7xl px-6 text-center">
                <Badge variant="eyebrow" size="none" radius="none" className="justify-center text-brand-600">
                    <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                    Encore · Last call
                    <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                </Badge>

                <SplitHeading
                    id="outro-titel"
                    className="mx-auto mt-4 max-w-3xl font-heading text-[clamp(2.4rem,8vw,4.5rem)] leading-[1.02] font-semibold tracking-tight"
                >
                    Zin in een <em className="font-medium text-brand-600">encore</em>?
                </SplitHeading>

                {/* Tekst en knoppen komen na de kop binnen */}
                <Reveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
                        Heb je een vraag, een project of gewoon zin in een goed gesprek? Stuur me een bericht. Of neem
                        eerst mijn cv mee voor de weg.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button
                            size="lg"
                            radius="lg"
                            className="cursor-pointer text-black"
                            aria-haspopup="dialog"
                            onClick={() => setOpen(true)}
                            leftIcon={<MailIcon />}
                        >
                            Stel een vraag
                        </Button>

                        <Button
                            href={cvHref}
                            download
                            variant="outline"
                            size="lg"
                            className="border-white/30 text-white hover:bg-white/10"
                            leftIcon={<DownloadIcon />}
                        >
                            Download cv
                        </Button>
                    </div>
                </Reveal>
            </div>

            <ContactModal open={open} onClose={() => setOpen(false)} endpoint={contactEndpoint} />
        </section>
    )
}
