import { PageHeader } from "../components/showcase/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage() {
    usePageMeta({
        title: "Welkom bij Slaktrrr",
        description: "De design tokens van Slaktrrr: kleur, typografie en radius."
    })

    return (
        <div>
            <PageHeader
                title="Welkom bij Slaktrrr"
                description="Slaktrrr is een front-end developer met een sterke achtergrond in UX design."
            />
        </div>
    )
}