import { Badge } from "../ui/Badge"
import { Reveal } from "../gsap/Reveal"
import { SplitHeading } from "../gsap/SplitHeading"

// Concept-teksten: pas de stappen en duur aan naar je eigen werkwijze
const steps = [
    {
        title: "Soundcheck",
        duration: "± 1 week",
        text: "We leren elkaar kennen. Wat is het doel, wie is het publiek en wat moet er staan als het doek opgaat?",
    },
    {
        title: "Repetitie",
        duration: "1–2 weken",
        text: "Ontwerp en prototype. We spelen de belangrijkste schermen door tot de maat klopt, nog voordat er productiecode is.",
    },
    {
        title: "Optreden",
        duration: "2–6 weken",
        text: "Bouwen, testen en opleveren. Toegankelijk, snel en in kleine stappen, zodat je elke week hoort hoe het klinkt.",
    },
    {
        title: "Encore",
        duration: "Doorlopend",
        text: "Na de livegang blijf ik bereikbaar voor nazorg, verbeteringen en nieuwe nummers op de setlist.",
    },
]

/*
 * Werkwijze als setlist: vier nummers met een groot messing tracknummer, titel, tekst en duur.
 * De stappen komen één voor één binnen (Reveal), de kop schuift regel voor regel omhoog (SplitHeading).
 */
export function SetlistSection() {
    return (
        <section aria-labelledby="setlist-titel" className="bg-black py-24 text-white">
            <div className="mx-auto max-w-7xl px-6">
                <header className="max-w-2xl">
                    <Badge variant="eyebrow" size="none" radius="none" className="text-brand-600">
                        <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                        Zo werk ik
                    </Badge>
                    <SplitHeading id="setlist-titel" className="mt-4 font-heading text-4xl leading-[1.15] font-bold">
                        Setlist
                    </SplitHeading>
                    <p className="mt-4 text-white/60">
                        Elk project speel ik in dezelfde volgorde. Zo weet je vooraf welk nummer er komt, en wanneer.
                    </p>
                </header>

                <Reveal as="ol" stagger={0.12} className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-4 bg-black p-6 sm:p-8">
                            <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-white/20 pb-4">
                                <span aria-hidden="true" className="font-heading text-5xl font-semibold text-brand-600 tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-xs tracking-[0.2em] text-white/50 uppercase">{step.duration}</span>
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
