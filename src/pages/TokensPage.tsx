import { PageHeader } from "../components/showcase/PageHeader"
import { ShowcaseSection } from "../components/showcase/ShowcaseSection"
import { Typography } from "../components/ui/Typography"
import themeCss from "../styles/theme.css?raw"
import { parseColorScales } from "../lib/parseColorScales"
import { ColorSwatch } from "../components/showcase/ColorSwatch"
import { usePageMeta } from "../hooks/usePageMeta"

const colorScales = parseColorScales(themeCss)

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export function TokensPage() {
    usePageMeta({
        title: "Tokens",
        description: "De design tokens van Slagvast: kleur, typografie en radius."
    })

    return (
        <>
            <PageHeader
                title="Design tokens"
                description="De bouwstenen van Slagvast: kleur, typografie en radius."
            />

            {colorScales.map((scale) => (
                <ShowcaseSection key={scale.name} title={capitalize(scale.name)} description="Gedefinieerd in styles/theme.css, opgebouwd met cva.">
                    {scale.tokens.map((token) => (
                        <ColorSwatch
                            key={token.label}
                            variable={token.variable}
                            label={token.shade}
                            value={token.value}
                        />
                    ))}
                </ShowcaseSection>
            ))}

            <ShowcaseSection title="Typografie">
                <div className="w-full space-y-2">
                    <Typography variant="h1">Kop 1</Typography>
                    <Typography variant="h2">Kop 2</Typography>
                    <Typography variant="h3">Kop 3</Typography>
                    <Typography variant="h4">Kop 4</Typography>
                    <Typography variant="h5">Kop 5</Typography>
                    <Typography variant="h6">Kop 6</Typography>
                    <br></br>
                    <Typography variant="lead">Lead tekst</Typography>
                    <Typography variant="body">Lopende tekst</Typography>
                    <Typography variant="small">Kleine tekst</Typography>
                    <br></br>
                    <Typography variant="h1" className="text-brand-600">Kop 1 met className</Typography>
                    <Typography variant="h2" as="h3" className="text-brand-600">Een h3 met styling van h2 en extra className</Typography>
                </div>
            </ShowcaseSection>

            <ShowcaseSection title="Radius">
                <div className="h-16 w-16 rounded-sm bg-brand-200" />
                <div className="h-16 w-16 rounded-lg bg-brand-200" />
                <div className="h-16 w-16 rounded-xl bg-brand-200" />
                <div className="h-16 w-16 rounded-full bg-brand-200" />
            </ShowcaseSection>
        </>
    )
}