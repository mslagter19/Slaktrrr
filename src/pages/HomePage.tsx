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
import { Button } from "../components/ui/Button";
import { ParallaxScene } from "../components/gsap/ParallaxScene";
import { OutroSection } from "../components/sections/OutroSection";
import { Reveal } from "../components/gsap/Reveal";
import testImage from "../assets/test-image.jpg";
import { NowSpinning } from "../components/ui/NowSpinning";

export function HomePage() {
    usePageMeta({
        title: "Welkom bij Slaktrrr",
        description: "De design tokens van Slaktrrr: kleur, typografie en radius."
    })

    return (
        <div id="homepage">
            <HeroSection />

            <CaseSection
                limit={3}
                moreTo="/cases"
                title="Zoek een goeie plaat uit"
                description="Bekijk hieronder de collectie, kies er een uit en zet het op!"
            />

            <ColumnsSection columns={2} gap="gap-10" background="black" className="relative overflow-x-clip flex">
                {/* Saxofoon met parallax: iets trager dan de inhoud, lichte rotatie */}
                <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                    <div data-speed="0.8" data-rotate="3" className="absolute -right-16 top-0 w-80">
                        <SaxophoneLine className="rotate-12 text-white/10" />
                    </div>
                </ParallaxScene>
                <Reveal>
                    <Card variant="transparent" radius="none">
                        <CardImage film src={testImage} className="noir-img" alt="Test image"></CardImage>
                    </Card>
                </Reveal>
                <Card variant="transparent" radius="none">
                    {/* Badge, titel, tekst en knop verschijnen een voor een */}
                    <Reveal as={CardBody} delay={0.15}>
                        <Badge size="xs" radius="none" variant="transparent" className="text-brand-600 w-auto justify-start p-0 text-lg uppercase font-heading">
                            Over mij
                        </Badge>
                        <CardTitle as="h2" className="text-4xl font-normal">
                            <span className="font-bold font-white">Code met</span> <span className="text-brand-600 italic">een ritme</span>
                        </CardTitle>
                        <CardDescription className="text-base text-white/60">
                            Slaktrrr is een front-end developer met een sterke achtergrond in UX design. Hij heeft ervaring met het bouwen van webapplicaties en websites, en is altijd op zoek naar manieren om de gebruikerservaring te verbeteren.
                        </CardDescription>
                        <Button
                            to="/over-mij"
                            size="lg"
                            className="mt-2 w-fit rounded-xl">
                            Over mij
                        </Button>
                    </Reveal>
                </Card>
            </ColumnsSection>

            <Underline background="black" width="full" thickness="thin" className="pt-0 pb-0"></Underline>

            <ColumnsSection columns={2} gap="gap-10" background="black" className="relative overflow-x-clip">
                {/* Speelkaart met parallax: draait de andere kant op dan de saxofoon */}
                <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                    <div data-speed="0.7" data-rotate="-3" className="absolute -left-0 -top-8 w-60">
                        <PlayingCardLine className="-rotate-12 text-white/10" />
                    </div>
                </ParallaxScene>

                <Reveal>
                    <h3 className="mb-4 text-lg uppercase !text-brand-600">
                        Feiten
                    </h3>
                    <TrackList>
                        <TrackListItem label="Woonplaats">Arnhem</TrackListItem>
                        <TrackListItem label="Ervaring">5+ jaar</TrackListItem>
                        <TrackListItem label="Stack">React, Tailwind</TrackListItem>
                    </TrackList>
                </Reveal>
                <div className="">
                    <NowSpinning id="alternamellooo" />
                </div>
            </ColumnsSection>

            <Instrumentation />

            <OutroSection></OutroSection>

        </div>
    )
}