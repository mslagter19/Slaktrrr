import { Reveal } from "@/components/motion/Reveal"
import { SplitHeading } from "@/components/motion/SplitHeading"
import { Eyebrow } from "@/components/ui/Eyebrow"

export type SetlistStep = {
    title: string
    meta: string // kleine regel rechtsboven, bv. de duur ("± 1 week") of "Standard no. 1"
    text: string
}

// Concept-teksten: pas de stappen en duur aan naar je eigen werkwijze
const defaultSteps: SetlistStep[] = [
    {
        title: "Soundcheck",
        meta: "± 1 week",
        text: "We leren elkaar kennen. Wat is het doel, wie is het publiek en wat moet er staan als het doek opgaat?",
    },
    {
        title: "Repetitie",
        meta: "1–2 weken",
        text: "Ontwerp en prototype. We spelen de belangrijkste schermen door tot de maat klopt, nog voordat er productiecode is.",
    },
    {
        title: "Optreden",
        meta: "2–6 weken",
        text: "Bouwen, testen en opleveren. Toegankelijk, snel en in kleine stappen, zodat je elke week hoort hoe het klinkt.",
    },
    {
        title: "Encore",
        meta: "Doorlopend",
        text: "Na de livegang blijf ik bereikbaar voor nazorg, verbeteringen en nieuwe nummers op de setlist.",
    },
]

/*
 * Werkwijze als setlist: vier nummers met een groot messing tracknummer, titel, tekst en duur.
 * De stappen komen één voor één binnen (Reveal), de kop schuift regel voor regel omhoog (SplitHeading).
 * Zonder props toont hij de werkwijze; met eigen props werkt hij ook voor bv. principes ("Mijn standards").
 * Geef bij meerdere setlists op één pagina elk een eigen id.
 */
type SetlistSectionProps = {
    id?: string
    eyebrow?: string
    title?: string
    description?: string
    steps?: SetlistStep[]
}

export function SetlistSection({
    id = "setlist",
    eyebrow = "Zo werk ik",
    title = "Setlist",
    description = "Elk project speel ik in dezelfde volgorde. Zo weet je vooraf welk nummer er komt, en wanneer.",
    steps = defaultSteps,
}: SetlistSectionProps) {
    const titleId = `${id}-titel`

    return (
        <section aria-labelledby={titleId} className="bg-black py-24 text-white">
            <div className="mx-auto max-w-7xl px-6">
                <header className="max-w-2xl">
                    <Eyebrow>{eyebrow}</Eyebrow>
                    <SplitHeading id={titleId} className="mt-4 font-heading text-4xl leading-[1.15] font-bold">
                        {title}
                    </SplitHeading>
                    <p className="mt-4 text-white/60">{description}</p>
                </header>

                <Reveal as="ol" stagger={0.12} className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-4 bg-black p-6 sm:p-8">
                            <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-white/20 pb-4">
                                <span aria-hidden="true" className="font-heading text-5xl font-semibold text-brand-600 tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-xs tracking-[0.2em] text-white/50 uppercase">{step.meta}</span>
                            </div>
                            <h3 className="font-heading text-2xl font-semibold">{step.title}</h3>
                            <p className="text-white/60">{step.text}</p>
                        </li>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}
