import { usePageMeta } from "../hooks/usePageMeta";
import { ColumnsSection } from "../components/sections/ColumnsSection";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { SetlistSection, type SetlistStep } from "../components/sections/SetlistSection";
import { OutroSection } from "../components/sections/OutroSection";
import { Underline } from "../components/ui/Underline";
import { Button } from "../components/ui/Button";
import { CaseSleeve } from "../components/ui/CaseSleeve";
import { NowSpinning } from "../components/ui/NowSpinning";
import { TrackList, TrackListItem } from "../components/ui/TrackList";
import { WhiskeyGlassLine } from "../components/ui/LineArt";
import { ParallaxScene } from "../components/gsap/ParallaxScene";
import { SplitHeading } from "../components/gsap/SplitHeading";
import { Reveal } from "../components/gsap/Reveal";
// TIJDELIJK: vervang door je portretfoto, bv. src/assets/images/portret.webp
import portrait from "../assets/test-image.jpg";
import { Eyebrow } from "../components/ui/Eyebrow";

// CONCEPT: pas de principes aan naar wat jij belangrijk vindt
const standards: SetlistStep[] = [
    {
        title: "Toegankelijk voor iedereen",
        meta: "Standard no. 1",
        text: "Toetsenbord, schermlezer of een trage verbinding: iedereen moet mee kunnen spelen. Dat bouw ik vanaf de eerste maat in, niet achteraf.",
    },
    {
        title: "Snel als bebop",
        meta: "Standard no. 2",
        text: "Een site die laadt voordat je met je vingers knipt. Lichte pagina's, slimme afbeeldingen en geen code die er niet hoeft te zijn.",
    },
    {
        title: "Detail in de maat",
        meta: "Standard no. 3",
        text: "Een animatie die net goed valt, een knop die precies reageert. Kleine dingen maken het verschil tussen een site en een ervaring.",
    },
    {
        title: "Samenspel",
        meta: "Standard no. 4",
        text: "Met mijn UX-achtergrond spreek ik de taal van ontwerpers én developers. Ik denk mee, stel vragen en speel graag samen.",
    },
];

export function AboutPage() {
    usePageMeta({
        title: "Over mij",
        description: "Wie ik ben: een front-end developer met een UX-achtergrond, een zwak voor jazz en oog voor detail.",
    });

    return (
        <div id="about">
            {/* CONCEPT: pas de intro aan naar je eigen verhaal */}
            <HeroSubSection
                subtitle="Side B · Over mij"
                title="Over mij"
                description="Ik ben Marc, front-end developer uit Arnhem met een achtergrond in UX design. Ik bouw websites die net zo prettig voelen als ze eruitzien: toegankelijk, snel en met oog voor de kleine details. Draai de hoes om voor de liner notes."
                actions={
                    <>
                        <Button to="/contact" size="lg" radius="lg">
                            Stel een vraag
                        </Button>
                        <Button
                            href="/cv/download"
                            download
                            variant="outline"
                            size="lg"
                            radius="lg"
                           
                        >
                            Download cv
                        </Button>
                    </>
                }
                aside={
                    <CaseSleeve
                        src={portrait}
                        alt="Portret van Marc Slagter"
                        title="Marc Slagter"
                        catalogNumber="SLK-B01"
                        className="md:max-w-none"
                        personnel={[
                            { label: "Rol", value: "Front-end developer" },
                            { label: "Woonplaats", value: "Arnhem" },
                            { label: "Ervaring", value: "5+ jaar" },
                            { label: "Achtergrond", value: "UX design" },
                            { label: "Stack", value: "React, TypeScript, Tailwind" },
                        ]}
                    />
                }
            />

            <Underline background="black" width="full" thickness="thin" />

            {/* Het verhaal + feiten, met het whiskeyglas als parallax op de achtergrond */}
            <ColumnsSection columns={2} gap="gap-10" className="relative overflow-x-clip">
                <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                    <div data-speed="0.8" data-rotate="3" className="absolute -left-16 top-0 w-80">
                        <WhiskeyGlassLine className="rotate-12 text-white/10" />
                    </div>
                </ParallaxScene>

                {/* CONCEPT: vertel hier je eigen verhaal */}
                <div>
                    <SplitHeading as="h2" className="mb-4 font-heading text-4xl font-bold">
                        Van wireframe naar werkende code
                    </SplitHeading>
                    <Reveal className="space-y-4 text-white/60">
                        <p>
                            Ik begon als UX designer: interviews, wireframes en prototypes. Steeds vaker merkte ik dat
                            ik het ontwerp zelf wilde laten werken, dus dook ik de code in. Daar ben ik niet meer
                            uitgekomen.
                        </p>
                        <p>
                            Die combinatie is mijn sterkste instrument. Ik denk vanuit de bezoeker, en ik bouw het
                            zelf. Geen vertaalverlies tussen ontwerp en techniek, en een developer die ook de vraag
                            achter de vraag stelt.
                        </p>
                        <p>
                            Vandaag werk ik vooral met React, TypeScript en Tailwind, aan websites, webshops en
                            CMS-platforms waar redacteuren zelf mee aan de slag kunnen.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.15}>
                    <h3 className="mb-4 text-lg uppercase !text-brand-600">Feiten</h3>
                    <TrackList>
                        <TrackListItem label="Woonplaats">Arnhem</TrackListItem>
                        <TrackListItem label="Ervaring">5+ jaar</TrackListItem>
                        <TrackListItem label="Achtergrond">UX design</TrackListItem>
                        <TrackListItem label="Stack">React · TypeScript · Tailwind</TrackListItem>
                        <TrackListItem label="Op de draaitafel">Jazz</TrackListItem>
                    </TrackList>
                </Reveal>
            </ColumnsSection>

            <SetlistSection
                id="standards"
                eyebrow="Waar ik voor sta"
                title="Mijn standards"
                description="Zoals elke jazzmuzikant zijn standards heeft, heb ik er vier die in elk project terugkomen."
                steps={standards}
            />

            <Underline background="black" width="full" thickness="thin" />

            {/* B-kant: wie je bent naast het werk */}
            <ColumnsSection columns={2} gap="gap-10" columnsClassName="items-center">
                {/* CONCEPT: vul aan met je eigen hobby's */}
                <div>
                    <Eyebrow>B-kant</Eyebrow>
                    <SplitHeading as="h2" className="mt-4 mb-4 font-heading text-4xl font-bold">
                        Buiten de code
                    </SplitHeading>
                    <Reveal className="space-y-4 text-white/60">
                        <p>
                            Als de laptop dichtgaat, gaat de muziek aan. Jazz is mijn vaste soundtrack: van Miles
                            Davis op zondagochtend tot een rokerige playlist als de bugs 's avonds laat opduiken.
                        </p>
                        <p>
                            Die liefde voor ritme en improvisatie zie je terug op deze site. Benieuwd wat er nu
                            draait? Hiernaast staat mijn playlist.
                        </p>
                    </Reveal>
                </div>
                <NowSpinning id="alternamellooo" />
            </ColumnsSection>

            <OutroSection />
        </div>
    );
}
