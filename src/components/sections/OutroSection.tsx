import { useState } from "react"
import { Button } from "../ui/Button"
import { WhiskeyGlassLine } from "../ui/LineArt"
import { ParallaxScene } from "../gsap/ParallaxScene"
import { ContactModal } from "../contact/ContactModal"
import { Spotlight } from "../ui/Spotlight"
import { Reveal } from "../gsap/Reveal"
import { SplitHeading } from "../gsap/SplitHeading"
import { Eyebrow } from "../ui/Eyebrow"
import { MailIcon, DownloadIcon } from "../ui/icons"

type OutroSectionProps = {
    // Waar de cv-download naartoe wijst (later eventueel een Laravel-route)
    cvHref?: string
    // Laravel-endpoint voor het contactformulier
    contactEndpoint?: string
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
                <Eyebrow align="center">Encore · Last call</Eyebrow>

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
