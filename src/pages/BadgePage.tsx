import { Badge } from "../components/ui/Badge"
import { PageHeader } from "../components/showcase/PageHeader"
import { ShowcaseSection } from "../components/showcase/ShowcaseSection"
import { usePageMeta } from "../hooks/usePageMeta"

export function BadgePage() {
    usePageMeta({
        title: "Badge",
        description: "Een badge met varianten en maten, opgebouwd met cva."
    })

    return (
        <>
            <PageHeader
                title="Badge"
                description="Een badge met varianten en maten, opgebouwd met cva."
            />

            <ShowcaseSection title="Varianten">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="link">Link</Badge>
            </ShowcaseSection>
        </>
    )
}