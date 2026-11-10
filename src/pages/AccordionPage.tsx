import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { PageHeader } from "../components/showcase/PageHeader"
import { ShowcaseSection } from "../components/showcase/ShowcaseSection"
import { usePageMeta } from "../hooks/usePageMeta"

const faq = [
    { value: "wat", q: "Wat is Slagvast?", a: "Een eigen design system in React, Tailwind en TypeScript." },
    { value: "waarom", q: "Waarom compound components?", a: "Flexibiliteit zonder een berg props." },
    { value: "a11y", q: "Is het toegankelijk?", a: "Ja: aria-expanded, aria-controls en toetsenbordbediening." },
];

export function AccordionPage() {
    usePageMeta({
        title: "Accordion",
        description: "Een accordion met verschillende varianten en instellingen."
    })

    return (
        <>
            <PageHeader
                title="Accordion"
                description="Een accordion met verschillende varianten en instellingen."
            />

            <ShowcaseSection title="Single (default)">
                <Accordion defaultValue={["wat"]}>
                    {faq.map(({ value, q, a }) => (
                        <AccordionItem key={value} value={value}>
                            <AccordionTrigger>{q}</AccordionTrigger>
                            <AccordionContent>{a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ShowcaseSection>
            <ShowcaseSection title="Multiple + bordered">
                <Accordion type="multiple" variant="bordered">
                    {faq.map(({ value, q, a }) => (
                        <AccordionItem key={value} value={value}>
                            <AccordionTrigger>{q}</AccordionTrigger>
                            <AccordionContent>{a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ShowcaseSection>
            <ShowcaseSection title="Seperated">
                <Accordion variant="separated">
                    {faq.map(({ value, q, a }) => (
                        <AccordionItem key={value} value={value}>
                            <AccordionTrigger>{q}</AccordionTrigger>
                            <AccordionContent>{a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ShowcaseSection>
        </>
    );
}