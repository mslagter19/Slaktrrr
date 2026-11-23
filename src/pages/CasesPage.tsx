import { usePageMeta } from "../hooks/usePageMeta";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { CaseSection } from "../components/sections/CaseSection";
import { OutroSection } from "../components/sections/OutroSection";

export function CasesPage() {
    usePageMeta({
        title: "Cases",
        description: "Een selectie van websites, webshops en webapps die ik heb gebouwd, van huisstijl tot CMS-secties."
    })

    return (
        <div id="cases">
            <HeroSubSection
                subtitle="Side A · Selected works"
                title="Cases"
                description="Elke case is een plaat uit mijn collectie. Kies er een uit, draai de hoes om en lees wat de opdracht was, welke rol ik speelde en hoe het klonk bij de oplevering."
                actions={null}
            />

            <Underline background="black" width="full" thickness="thin" />

            <CaseSection
                filterable
                title="De collectie"
                description="Filter op soort project, of blader gewoon door de bakken."
            />

            <OutroSection />
        </div>
    )
}
