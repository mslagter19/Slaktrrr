import { usePageMeta } from "@/hooks/usePageMeta";
import { Underline } from "@/components/ui/Underline";
import { HeroSubSection } from "@/components/sections/HeroSubSection";
import { CaseSection } from "@/features/cases/CaseSection";
import { CASES } from "@/features/cases/cases.data";
import { LevelsSection, type LevelItem } from "@/components/sections/LevelsSection";
import { OutroSection } from "@/features/contact/OutroSection";
import { FeaturedReview } from "@/features/reviews/FeaturedReview";
import { REVIEWS } from "@/features/reviews/reviews.data";
import { CaseSleeve } from "@/components/brand/CaseSleeve";
import { SaxophoneLine } from "@/components/brand/LineArt";
import { ParallaxScene } from "@/components/motion/ParallaxScene";
import { yearsActive } from "@/features/experience/experience.data";

// De nieuwste case ligt bovenop de stapel (eerste in de lijst)
const latest = CASES[0]
const categories = Array.from(new Set(CASES.flatMap((c) => c.categories)))
const years = yearsActive()

const levels: LevelItem[] = [
    { to: CASES.length, level: Math.min(1, CASES.length / 10), label: "Platen", caption: <><span className="font-bold text-brand-600">Cases</span> in de collectie</> },
    { to: categories.length, level: Math.min(1, categories.length / 4), label: "Genres", caption: <>Soorten projecten: <span className="font-bold text-brand-600">{categories.join(", ")}</span></> },
    { to: years, suffix: "+", level: Math.min(1, years / 8), label: "Jaren", caption: <><span className="font-bold text-brand-600">Jaar</span> op het podium</> },
]

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
                aside={
                    <CaseSleeve
                        src={latest.cover}
                        alt={`Screenshot van ${latest.title}`}
                        title="Nu op de draaitafel"
                        catalogNumber="SLK-A00"
                        className="md:max-w-none"
                        personnel={[
                            { label: "Nieuwste", value: latest.title },
                            { label: "Cases", value: String(CASES.length) },
                            { label: "Soorten", value: categories.join(", ") },
                            { label: "Stack", value: "React, Vue, TypeScript" },
                        ]}
                    />
                }
            />

            <Underline background="black" width="full" thickness="thin" />

            {/* Saxofoon met parallax achter de collectie, net als op de homepage */}
            <div className="relative overflow-x-clip">
                <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                    <div data-speed="0.8" data-rotate="3" className="absolute -right-16 top-24 w-80">
                        <SaxophoneLine className="rotate-12 text-white/10" />
                    </div>
                </ParallaxScene>

                <CaseSection
                    filterable
                    title="De collectie"
                    description="Filter op soort project, of blader gewoon door de bakken."
                />
            </div>

            <LevelsSection eyebrow="Levels · De collectie" items={levels} />

            <FeaturedReview reviews={REVIEWS} moreTo="/reviews" />

            <OutroSection />
        </div>
    )
}
