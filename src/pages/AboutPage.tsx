import { usePageMeta } from "../hooks/usePageMeta";
import { ColumnsSection } from "../components/sections/ColumnsSection";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { OutroSection } from "../components/sections/OutroSection";
import { WhiskeyGlassLine } from "../components/ui/LineArt";
import { NowSpinning } from "../components/ui/NowSpinning";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { ReviewSection } from "../components/sections/ReviewSection";
import { SplitHeading } from "../components/gsap/SplitHeading";
import bijMartinusImg from "../assets/images/cases/bij-martinus.webp";

export function AboutPage() {
    usePageMeta({
        title: "Welkom bij Slaktrrr",
        description: "De design tokens van Slaktrrr: kleur, typografie en radius."
    })

    return (
        <div id="about">
            <HeroSubSection
                subtitle="Een Front-end Developer met UX ervaring"
                title="Over mij"
                description="BijMartinus is een webshop en CMS-platform met een eigen identiteit per ruimte: café, kapel, lounge, bovenverdieping en zaal. In dit project heb ik als [rol, bijv. frontend/fullstack developer] de overstap van versie 1 naar versie 2 vormgegeven. Ik leverde de huisstijl, de eigen CMS-secties, de navigatie en footer en de contactpagina."
            />

            <Underline background="black" width="full" thickness="thin" />

            <ColumnsSection columns={2} gap="gap-10" className="relative overflow-hidden">
                <WhiskeyGlassLine
                    className="pointer-events-none absolute -left-16 top-0 w-80 rotate-12 text-white/10"
                />
                <div className="">

                    <SplitHeading as="h2" className="font-heading text-4xl font-bold mb-4">De uitdaging</SplitHeading>
                    <p className="text-white/60">BijMartinus bestaat uit meerdere ruimtes die elk een eigen sfeer hebben, maar toch als één merk moeten voelen. Het platform moest redactioneel flexibel blijven: beheerders moeten zelf pagina’s kunnen opbouwen zonder een developer. Tegelijk moest het werken op mobiel, goed vindbaar zijn en bovenop een bestaand CMS-framework draaien. De vraag was dus hoe je een eigenzinnige huisstijl vastlegt in herbruikbare bouwstenen, zodat de stijl bewaakt blijft terwijl de inhoud vrij te beheren is.</p>
                </div>
                <div className="">
                    <img className="noir-img" src={bijMartinusImg}></img>
                </div>
            </ColumnsSection>

            <ExperienceSection />

            <ReviewSection />

            <ColumnsSection columns={1}>
                <div className="">
                    <NowSpinning id="alternamellooo" />
                </div>
            </ColumnsSection>

            <OutroSection>

            </OutroSection>
        </div>
    )
}