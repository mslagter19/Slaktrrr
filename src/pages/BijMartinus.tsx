import { usePageMeta } from "../hooks/usePageMeta";
import { ColumnsSection } from "../components/sections/ColumnsSection";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { CaseSection } from "../components/sections/CaseSection";
import { OutroSection } from "../components/sections/OutroSection";
import { WhiskeyGlassLine } from "../components/ui/LineArt";
import { Card, CardBody, CardTitle } from "../components/ui/Card";
import { CountUp } from "../components/ui/CountUp";
import { useParams } from "react-router-dom";
import { CaseSleeve } from "../components/ui/CaseSleeve";

export function BijMartinus() {
    const { slug } = useParams<{ slug: string }>()

    usePageMeta({
        title: "Welkom bij Slaktrrr",
        description: "De design tokens van Slaktrrr: kleur, typografie en radius."
    })

    return (
        <div id="bij-martinus">
            <HeroSubSection
                title="BijMartinus"
                description="BijMartinus is een webshop en CMS-platform met een eigen identiteit per ruimte: café, kapel, lounge, bovenverdieping en zaal. In dit project heb ik als [rol, bijv. frontend/fullstack developer] de overstap van versie 1 naar versie 2 vormgegeven. Ik leverde de huisstijl, de eigen CMS-secties, de navigatie en footer en de contactpagina."
                subtitle="Een kerk met moves"
                aside={
                    <CaseSleeve
                        src="../src/assets/images/cases/bij-martinus.webp"
                        alt="Screenshot van de homepage van Bakkerij Van Dam"
                        title="Bakkerij Van Dam"
                        catalogNumber="SLK-003"
                        personnel={[
                            { label: "Client", value: "Bakkerij Van Dam" },
                            { label: "Rol", value: "Front-end developer" },
                            { label: "Jaar", value: "2025" },
                            { label: "Stack", value: "React, Tailwind, GSAP" },
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
                    <img src="../src/assets/images/cases/bij-martinus.webp"></img>
                </div>
            </ColumnsSection>

            <ColumnsSection columns={1} className="text-center">
                <div className="">
                    <h2 className="font-heading text-2xl font-bold mb-4">Het resultaat</h2>
                    <p>Het publieke gezicht van BijMartinus v2 staat: een samenhangende huisstijl, een flexibele set CMS-secties, nieuwe navigatie en footer en een eigen contactpagina. Het beheer is uitgebreid met een e-mailqueue-scherm en een extra eventveld.</p>
                </div>
            </ColumnsSection>

            <ColumnsSection columns={2} className="relative overflow-hidden" gap="gap-10">
                <Card variant="transparent" radius="none">
                    <CardBody className="text-center">
                        <CountUp to={12} suffix="+" duration={1.6} start="mount" className="text-4xl font-bold" />
                        <CardTitle className="font-normal">
                            Eigen <span className="font-bold text-brand-600">CMS-secties</span> met bijbehorende editors
                        </CardTitle>
                    </CardBody>
                </Card>
                <Card variant="transparent" radius="none">
                    <CardBody className="text-center">
                        <CountUp to={1500} duration={1.6} start="mount" className="text-4xl font-bold" />
                        <CardTitle className="font-normal">
                            <span className="font-bold text-brand-600">regels</span> huisstijl voor vijf ruimtes
                        </CardTitle>
                    </CardBody>
                </Card>
            </ColumnsSection>

            <ColumnsSection title="Tech stack" columns={3} className="text-center">
                <Card variant="transparent" radius="none">
                    <CardBody className="text-center">
                        <CardTitle className="font-normal">
                            Vue 3
                        </CardTitle>
                    </CardBody>
                </Card>
                <Card variant="transparent" radius="none">
                    <CardBody className="text-center">
                        <CardTitle className="font-normal">
                            TypeScript
                        </CardTitle>
                    </CardBody>
                </Card>
                <Card variant="transparent" radius="none">
                    <CardBody className="text-center">
                        <CardTitle className="font-normal">
                            LESS
                        </CardTitle>
                    </CardBody>
                </Card>
            </ColumnsSection>

            <CaseSection title="Meer cases" excludeSlug={slug} limit={4}>

            </CaseSection>

            <OutroSection>

            </OutroSection>
        </div>
    )
}