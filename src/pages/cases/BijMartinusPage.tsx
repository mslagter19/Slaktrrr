import { usePageMeta } from "@/hooks/usePageMeta";
import { ColumnsSection } from "@/components/sections/ColumnsSection";
import { Underline } from "@/components/ui/Underline";
import { HeroSubSection } from "@/components/sections/HeroSubSection";
import { CaseSection } from "@/features/cases/CaseSection";
import { OutroSection } from "@/features/contact/OutroSection";
import { LevelsSection, type LevelItem } from "@/components/sections/LevelsSection";
import { WhiskeyGlassLine } from "@/components/brand/LineArt";
import { CardImage } from "@/components/ui/Card";
import { TrackList, TrackListItem } from "@/components/ui/TrackList";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { CaseSleeve } from "@/components/brand/CaseSleeve";
import bijMartinusImg from "@/assets/images/cases/bij-martinus.webp";
import { Eyebrow } from "@/components/ui/Eyebrow";

const SLUG = "bij-martinus"

// De cijfers van het project, elk met een VU-meter (level 0–1 = uitslag van de naald)
const levels: LevelItem[] = [
    { to: 12, suffix: "+", level: 0.72, label: "Secties", caption: <>Eigen <span className="font-bold text-brand-600">CMS-secties</span> met bijbehorende editors</> },
    { to: 1500, suffix: "", level: 0.95, label: "Regels", caption: <><span className="font-bold text-brand-600">Regels</span> huisstijl voor vijf ruimtes</> },
]

// De tech stack als credits op een jazzplaat: tech + "instrument"
const personnel = [
    { name: "Vue 3", role: "lead" },
    { name: "TypeScript", role: "rhythm" },
    { name: "LESS", role: "brass" },
]

export function BijMartinusPage() {
    usePageMeta({
        title: "BijMartinus",
        description: "Case BijMartinus: huisstijl, CMS-secties, navigatie en contactpagina voor versie 2 van het platform."
    })

    return (
        <div id="bij-martinus">
            <HeroSubSection
                title="BijMartinus"
                description="BijMartinus is een webshop en CMS-platform met een eigen identiteit per ruimte: café, kapel, lounge, bovenverdieping en zaal. In dit project heb ik als [rol, bijv. frontend/fullstack developer] de overstap van versie 1 naar versie 2 vormgegeven. Ik leverde de huisstijl, de eigen CMS-secties, de navigatie en footer en de contactpagina."
                subtitle="Een kerk met moves"
                aside={
                    <CaseSleeve
                        src={bijMartinusImg}
                        alt="Screenshot van de homepage van BijMartinus"
                        title="BijMartinus"
                        catalogNumber="SLK-003"
                        className="md:max-w-none"
                        personnel={[
                            { label: "Client", value: "BijMartinus" },
                            { label: "Rol", value: "Front-end developer" },
                            { label: "Jaar", value: "2025" },
                            { label: "Stack", value: "Vue 3, TypeScript, LESS" },
                        ]}
                    />
                }
            />

            <Underline background="black" width="full" thickness="thin"></Underline>

            <ColumnsSection columns={2} gap="gap-10" className="relative overflow-hidden">
                <WhiskeyGlassLine
                    className="pointer-events-none absolute -left-16 top-0 w-80 rotate-12 text-white/10"
                />
                <div className="">
                    <h2 className="font-heading text-2xl font-bold mb-4">De uitdaging</h2>
                    <p>BijMartinus bestaat uit meerdere ruimtes die elk een eigen sfeer hebben, maar toch als één merk moeten voelen. Het platform moest redactioneel flexibel blijven: beheerders moeten zelf pagina’s kunnen opbouwen zonder een developer. Tegelijk moest het werken op mobiel, goed vindbaar zijn en bovenop een bestaand CMS-framework draaien. De vraag was dus hoe je een eigenzinnige huisstijl vastlegt in herbruikbare bouwstenen, zodat de stijl bewaakt blijft terwijl de inhoud vrij te beheren is.</p>
                </div>
                <div className="">
                    <CardImage film src={bijMartinusImg} alt="Screenshot van het project BijMartinus" className="noir-img" wrapperClassName="group aspect-[4/3]" />
                </div>
            </ColumnsSection>

            <ColumnsSection columns={1} className="text-center">
                <div className="">
                    <h2 className="font-heading text-2xl font-bold mb-4">Het resultaat</h2>
                    <p>Het publieke gezicht van BijMartinus v2 staat: een samenhangende huisstijl, een flexibele set CMS-secties, nieuwe navigatie en footer en een eigen contactpagina. Het beheer is uitgebreid met een e-mailqueue-scherm en een extra eventveld.</p>
                </div>
            </ColumnsSection>

            {/* Levels: elk cijfer met een VU-meter die uitslaat zodra hij in beeld komt */}
            <LevelsSection eyebrow="Levels · BijMartinus v2" items={levels} />

            {/* Tech stack als "personnel": de credits van de plaat */}
            <ColumnsSection columns={1}>
                <div className="mx-auto flex w-full max-w-xl flex-col items-center">
                    <Eyebrow align="center">Tech stack</Eyebrow>
                    <SplitHeading className="mt-4 font-heading text-4xl font-bold leading-[1.15]">Personnel</SplitHeading>

                    <Reveal as={TrackList} className="mt-8 w-full">
                        {personnel.map((item) => (
                            <TrackListItem key={item.name} label={item.name}>
                                <span className="italic text-brand-600">{item.role}</span>
                            </TrackListItem>
                        ))}
                    </Reveal>
                </div>
            </ColumnsSection>

            <CaseSection title="Meer cases" excludeSlug={SLUG} limit={4}>

            </CaseSection>

            <OutroSection>

            </OutroSection>
        </div>
    )
}
