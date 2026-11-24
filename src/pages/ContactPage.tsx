import { usePageMeta } from "../hooks/usePageMeta";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { ColumnsSection } from "../components/sections/ColumnsSection";
import { ContactTicket } from "../components/contact/ContactTicket";
import { TrackList, TrackListItem } from "../components/ui/TrackList";
import { GrooveLink } from "../components/ui/GrooveLink";
import { Badge } from "../components/ui/Badge";
import { Reveal } from "../components/gsap/Reveal";
import { SplitHeading } from "../components/gsap/SplitHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { NowSpinning } from "../components/ui/NowSpinning";
import { PlayingCardLine } from "../components/ui/LineArt";
import { ParallaxScene } from "../components/gsap/ParallaxScene";
import { SetlistSection, type SetlistStep } from "../components/sections/SetlistSection";
import { FeaturedReview } from "../components/ui/reviews/FeaturedReview";
import { REVIEWS } from "../components/ui/reviews/reviews.data";

// CONCEPT: wat er gebeurt nadat iemand het formulier verstuurt
const nextSteps: SetlistStep[] = [
    {
        title: "Bericht binnen",
        meta: "Binnen 2 werkdagen",
        text: "Ik lees je bericht en stuur een persoonlijke reactie, geen automatisch antwoord.",
    },
    {
        title: "Soundcheck",
        meta: "± 30 minuten",
        text: "Een kort gesprek over je doel, je publiek en de planning. Online of bij een kop koffie.",
    },
    {
        title: "Voorstel",
        meta: "± 1 week",
        text: "Je krijgt een helder voorstel met aanpak, planning en prijs. Geen kleine lettertjes.",
    },
    {
        title: "Eerste maat",
        meta: "Aftellen",
        text: "We spreken een startdatum af en ik zet de eerste noten neer. Vanaf dan zie je elke week voortgang.",
    },
]

// Concept-teksten: pas aan naar je eigen situatie
const faq = [
    {
        id: "freelance",
        question: "Werk je freelance?",
        answer: "Ja. Ik neem projecten aan als freelance front-end developer, van een losse component tot een complete site. Voor langere trajecten kan ik ook een paar dagen per week aansluiten bij je team.",
    },
    {
        id: "stack",
        question: "Welke stack gebruik je?",
        answer: "Mijn vaste set is React, TypeScript en Tailwind, met GSAP voor animatie. Ik werk ook in Vue en sluit aan op bestaande backends, zoals Laravel.",
    },
    {
        id: "samenwerking",
        question: "Hoe ziet een samenwerking eruit?",
        answer: "We beginnen met een soundcheck: een kort gesprek over doel, publiek en planning. Daarna werk ik in kleine stappen, zodat je elke week ziet en hoort hoe het project klinkt.",
    },
    {
        id: "afstand",
        question: "Werk je ook op afstand?",
        answer: "Zeker. Ik woon in Arnhem en werk het liefst hybride: op afstand waar het kan, op locatie als dat het project helpt.",
    },
]

export function ContactPage() {
    usePageMeta({
        title: "Contact",
        description: "Stel je vraag of vertel over je project. Ik antwoord binnen twee werkdagen."
    })

    return (
        <div id="contact-pagina">
            <HeroSubSection
                subtitle="Last call · Contact"
                title="Contact"
                description="Een project, een vraag of gewoon zin in een goed gesprek? Pak een kaartje voor de gastenlijst, dan neem ik snel contact met je op."
                actions={null}
                // Alleen vanaf md: op mobiel zou de playlist het formulier ver naar beneden duwen
                aside={<NowSpinning id="alternamellooo" className="hidden md:block" />}
            />

            <Underline background="black" width="full" thickness="thin" />

            {/* Formulier links, backstage info rechts */}
            <ColumnsSection columns={1} gap="gap-10" columnsClassName="items-start md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <ContactTicket titleAs="h2" />

                <Reveal className="flex flex-col gap-4">
                    <Badge variant="eyebrow" size="none" radius="none" className="text-brand-600">
                        <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                        Backstage info
                    </Badge>
                    <TrackList numbered={false}>
                        {/* CONCEPT: vul de maand in waarop je weer ruimte hebt */}
                        <TrackListItem label="Status">
                            <span className="inline-flex items-center gap-2">
                                <span aria-hidden="true" className="size-2 rounded-full bg-brand-600 motion-safe:animate-pulse" />
                                Beschikbaar vanaf [maand]
                            </span>
                        </TrackListItem>
                        <TrackListItem label="E-mail">[e-mailadres]</TrackListItem>
                        <TrackListItem label="LinkedIn">
                            <GrooveLink href="https://www.linkedin.com/in/marc-slagter/" target="_blank" className="text-lg">
                                Profiel ↗
                            </GrooveLink>
                        </TrackListItem>
                        <TrackListItem label="Woonplaats">Arnhem</TrackListItem>
                        <TrackListItem label="Reactietijd">Binnen 2 werkdagen</TrackListItem>
                    </TrackList>
                </Reveal>
            </ColumnsSection>

            <FeaturedReview reviews={REVIEWS} moreTo="/reviews" />

            <SetlistSection
                id="na-het-versturen"
                eyebrow="Na het versturen"
                title="Wat er daarna gebeurt"
                description="Geen zwart gat na de verzendknop. Zo ziet het vervolg eruit, stap voor stap."
                steps={nextSteps}
            />

            {/* Veelgestelde vragen, met de speelkaart als parallax op de achtergrond */}
            <ColumnsSection columns={1} className="relative overflow-x-clip">
                <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                    <div data-speed="0.7" data-rotate="-3" className="absolute -left-8 top-8 w-60">
                        <PlayingCardLine className="-rotate-12 text-white/10" />
                    </div>
                </ParallaxScene>

                <div className="relative mx-auto w-full max-w-3xl">
                    <Badge variant="eyebrow" size="none" radius="none" className="text-brand-600">
                        <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                        Voor het optreden
                    </Badge>
                    <SplitHeading className="mt-4 mb-8 font-heading text-4xl leading-[1.15] font-bold">
                        Veelgestelde vragen
                    </SplitHeading>

                    <Accordion type="single" className="divide-white/15 border-white/15">
                        {faq.map((item) => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger className="px-0 py-5 font-heading text-xl hover:bg-transparent hover:text-brand-600">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-0 pb-5 text-white/60">{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ColumnsSection>
        </div>
    )
}
