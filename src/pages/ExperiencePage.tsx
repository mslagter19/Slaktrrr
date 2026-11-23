import { usePageMeta } from "../hooks/usePageMeta";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { Instrumentation } from "../components/instrumentation/Instrumentation";
import { SetlistSection } from "../components/sections/SetlistSection";
import { OutroSection } from "../components/sections/OutroSection";

export function ExperiencePage() {
    usePageMeta({
        title: "Ervaring",
        description: "Mijn loopbaan als front-end developer, mijn skills en hoe ik een project aanpak."
    })

    return (
        <div id="ervaring-pagina">
            <HeroSubSection
                subtitle="Liner notes · Loopbaan"
                title="Ervaring"
                description="Van UX-ontwerp naar front-end: hier lees je waar ik heb gespeeld, met welke instrumenten ik werk en in welke volgorde ik een project speel."
                actions={null}
            />

            <Underline background="black" width="full" thickness="thin" />

            <ExperienceSection />

            <Instrumentation />

            <SetlistSection />

            <OutroSection />
        </div>
    )
}
