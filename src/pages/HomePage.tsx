import { PageHeader } from "../components/showcase/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage() {
    usePageMeta({
        title: "Welkom bij Slagvast",
        description: "De design tokens van Slagvast: kleur, typografie en radius."
    })

    return (
        <div>
            <PageHeader
                title="Welkom bij Slagvast"
                description="Slagvast is een design system dat is gebouwd met React, TypeScript en Tailwind CSS. Het bevat herbruikbare componenten en stijlen die je kunt gebruiken om snel en efficiënt webapplicaties te bouwen."
            />
        </div>
    )
}