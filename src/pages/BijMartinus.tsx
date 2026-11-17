import { usePageMeta } from "../hooks/usePageMeta";
import { ColumnsSection } from "../components/showcase/ColumnsSection";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/showcase/HeroSubSection";
import { CaseSection } from "../components/showcase/CaseSection";
import { OutroSection } from "../components/showcase/OutroSection";
import { WhiskeyGlassLine } from "../components/ui/LineArt";
import { Card, CardBody, CardTitle, CardDescription, CardImage } from "../components/ui/Card";
import { CountUp } from "../components/ui/CountUp";

export function BijMartinus() {
    usePageMeta({
        title: "Welkom bij Slaktrrr",
        description: "De design tokens van Slaktrrr: kleur, typografie en radius."
    })

    return (
        <div id="bij-martinus">
            <HeroSubSection
                title="BijMartinus"
                description="BijMartinus is een webshop en CMS-platform met een eigen identiteit per ruimte: café, kapel, lounge, bovenverdieping en zaal. In dit project heb ik als [rol, bijv. frontend/fullstack developer] de overstap van versie 1 naar versie 2 vormgegeven. Ik leverde de huisstijl, de eigen CMS-secties, de navigatie en footer en de contactpagina."
                subtitle="Een kerk met moves">
            </HeroSubSection>

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

            <CaseSection>

            </CaseSection>

            <OutroSection>

            </OutroSection>
        </div>
    )
}