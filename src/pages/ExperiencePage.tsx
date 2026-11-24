import { usePageMeta } from "../hooks/usePageMeta";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { LevelsSection, type LevelItem } from "../components/sections/LevelsSection";
import { CaseSection } from "../components/sections/CaseSection";
import { Instrumentation } from "../components/instrumentation/Instrumentation";
import { SetlistSection } from "../components/sections/SetlistSection";
import { OutroSection } from "../components/sections/OutroSection";
import { CaseSleeve } from "../components/ui/CaseSleeve";
import { WhiskeyGlassLine } from "../components/ui/LineArt";
import { ParallaxScene } from "../components/gsap/ParallaxScene";
import { experiences, startYear, yearsActive } from "../components/experience/Experience.data";
// TIJDELIJK: vervang door je portretfoto, net als op de Over mij-pagina
import portrait from "../assets/test-image.jpg";

// Alles rekent mee met Experience.data.ts
const current = experiences[experiences.length - 1]
const years = yearsActive()
const places = experiences.filter((item) => item.type === "work").length
const tools = new Set(experiences.flatMap((item) => item.stack)).size

const levels: LevelItem[] = [
    { to: years, suffix: "+", level: Math.min(1, years / 10), label: "Jaren", caption: <><span className="font-bold text-brand-600">Jaar</span> als developer</> },
    { to: places, level: Math.min(1, places / 6), label: "Podia", caption: <><span className="font-bold text-brand-600">Plekken</span> waar ik speelde</> },
    { to: tools, level: Math.min(1, tools / 15), label: "Tools", caption: <><span className="font-bold text-brand-600">Instrumenten</span> in de koffer</> },
]

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
                aside={
                    <CaseSleeve
                        src={portrait}
                        alt="Portret van Marc Slagter"
                        title="Liner notes"
                        catalogNumber="SLK-B02"
                        className="md:max-w-none"
                        personnel={[
                            { label: "Nu", value: `${current.role}, ${current.company}` },
                            { label: "Sinds", value: startYear(current.start) },
                            { label: "Stack", value: current.stack.slice(0, 3).join(", ") },
                        ]}
                    />
                }
            />

            <Underline background="black" width="full" thickness="thin" />

            {/* Whiskeyglas met parallax achter de partituur */}
            <div className="relative overflow-x-clip">
                <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                    <div data-speed="0.8" data-rotate="3" className="absolute -right-16 top-16 w-72">
                        <WhiskeyGlassLine className="rotate-12 text-white/10" />
                    </div>
                </ParallaxScene>

                <ExperienceSection />
            </div>

            <LevelsSection eyebrow="Levels · Loopbaan" items={levels} />

            <Instrumentation />

            <SetlistSection />

            <CaseSection limit={3} moreTo="/cases" title="Gespeeld in de praktijk" description="Zo klinkt die ervaring in echte projecten." />

            <OutroSection />
        </div>
    )
}
