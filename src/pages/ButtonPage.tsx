import { Button } from "../components/ui/Button"
import { PageHeader } from "../components/showcase/PageHeader"
import { ShowcaseSection } from "../components/showcase/ShowcaseSection"
import { ArrowLeft, ArrowRight, Plus, Search } from "lucide-react"
import { usePageMeta } from "../hooks/usePageMeta"

export function ButtonPage() {
    usePageMeta({
        title: "Button",
        description: "Een knop met varianten en maten, opgebouwd met cva."
    })

    return (
        <>
            <PageHeader
                title="Button"
                description="Een knop met varianten en maten, opgebouwd met cva."
            />

            <ShowcaseSection title="Varianten">
                <Button variant="primary" target="_blank" href="https://www.google.com">
                    Primary
                </Button>
                <Button variant="secondary" to="/components/badge">
                    Secondary
                </Button>
                <Button variant="outline">Outline</Button>
                <Button variant="link">Link</Button>
                <Button variant="linksecondary">Link secondary</Button>
            </ShowcaseSection>

            <ShowcaseSection title="Maten">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
            </ShowcaseSection>

            <ShowcaseSection title="Disabled">
                <Button disabled>Niet beschikbaar</Button>
            </ShowcaseSection>

            <ShowcaseSection title="Iconen">
                <Button leftIcon={<Plus size="16" />}>Toevoegen</Button>
                <Button rightIcon={<Search size="16" />}>Start icoon</Button>
                <Button leftIcon={<span>🔍</span>} rightIcon={<span>➡️</span>}>
                    Beide iconen
                </Button>
                <Button leftIcon={<ArrowLeft size="16" />} iconOnly aria-label="Zoeken" />
                <Button rightIcon={<ArrowRight size="16" />} iconOnly aria-label="Volgende" />
                <Button to="/" variant="link" rightIcon={<ArrowRight size="16" />}>Lees meer</Button>
            </ShowcaseSection>

            <ShowcaseSection
                title="Stijl overschrijven"
                description="Dankzij cn() wint je eigen className van de standaardstijl."
            >
                <Button className="rounded-full">Afgerond</Button>
            </ShowcaseSection>
        </>
    )
}