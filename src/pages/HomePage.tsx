import { usePageMeta } from "../hooks/usePageMeta";
import { ColumnsSection } from "../components/sections/ColumnsSection";
import { CaseSection } from "../components/sections/CaseSection";
import { Card, CardImage, CardBody, CardTitle, CardDescription } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Underline } from "../components/ui/Underline";
import { TrackList, TrackListItem } from "../components/ui/TrackList";
import { Instrumentation } from "../components/instrumentation/Instrumentation";
import { HeroSection } from "../components/sections/HeroSection";
import { PlayingCardLine, SaxophoneLine } from "../components/ui/LineArt";

export function HomePage() {
    usePageMeta({
        title: "Welkom bij Slaktrrr",
        description: "De design tokens van Slaktrrr: kleur, typografie en radius."
    })

    return (
        <div id="homepage">
            <HeroSection />

            <ColumnsSection columns={2} gap="gap-10" background="black" className="relative overflow-hidden">
                <SaxophoneLine
                    className="pointer-events-none absolute -right-16 top-0 w-80 rotate-12 text-white/10"
                />
                <Card variant="transparent" radius="none">
                    <CardImage film src="/src/assets/test-image.jpg" alt="Test image"></CardImage>
                </Card>
                <Card variant="transparent" radius="none">
                    <CardBody>
                        <Badge size="xs" radius="none" variant="transparent" className="text-brand-600 w-auto justify-start p-0 text-lg uppercase font-heading">
                            Over mij
                        </Badge>
                        <CardTitle as="h2" className="text-4xl font-normal">
                            <span className="font-bold font-white">Code met</span> <span className="text-brand-600 italic">een ritme</span>
                        </CardTitle>
                        <CardDescription className="text-base text-white">
                            Slaktrrr is een front-end developer met een sterke achtergrond in UX design. Hij heeft ervaring met het bouwen van webapplicaties en websites, en is altijd op zoek naar manieren om de gebruikerservaring te verbeteren.
                        </CardDescription>
                    </CardBody>
                </Card>
            </ColumnsSection>

            <Underline background="black" width="full" thickness="thin" className="pt-0 pb-0"></Underline>

            <ColumnsSection columns={2} gap="gap-10" background="black" className="relative overflow-hidden">
                <PlayingCardLine
                    className="pointer-events-none absolute -left-0 -top-8 w-60 -rotate-12 text-white/10">
                </PlayingCardLine>

                <div className="">
                    <h3 className="mb-4 text-lg uppercase !text-brand-600">
                        Feiten
                    </h3>
                    <TrackList>
                        <TrackListItem label="Woonplaats">Arnhem</TrackListItem>
                        <TrackListItem label="Ervaring">5+ jaar</TrackListItem>
                        <TrackListItem label="Stack">React, Tailwind</TrackListItem>
                    </TrackList>
                </div>
            </ColumnsSection>

            <Instrumentation />

            <ColumnsSection columns={1} gap="gap-10" background="black" className="pb-0">
                <div className="flex flex-col items-center justify-center p-6">
                    <Badge size="xs" radius="none" variant="transparent" className="text-brand-600 w-auto justify-start px-0 mb-4 text-lg uppercase">
                        Zoek een goeie plaat uit!
                    </Badge>
                    <h2 className="text-white text-4xl font-bold mb-4">
                        Cases
                    </h2>
                    <p className="text-white text-lg">
                        Hier vind je mijn recente projecten en werkervaring.
                    </p>
                </div>
            </ColumnsSection>

            <CaseSection></CaseSection>

        </div>
    )
}