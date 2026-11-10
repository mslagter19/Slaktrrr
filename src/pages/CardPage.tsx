import { PageHeader } from "../components/showcase/PageHeader"
import { ShowcaseSection } from "../components/showcase/ShowcaseSection"
import { usePageMeta } from "../hooks/usePageMeta"
import { Card, CardImage, CardBody, CardTitle, CardDescription } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

export function CardPage() {
    usePageMeta({
        title: "Card",
        description: "Een card met verschillende varianten en instellingen."
    })

    return (
        <>
            <PageHeader
                title="Card"
                description="Een card met verschillende varianten en instellingen."
            />

            <ShowcaseSection title="Single (default)">
                <Card>
                    <CardImage
                        src="https://picsum.photos/640/360"
                        alt="Voorbeeldafbeelding"
                        badge={<Badge size="xs" radius="full">Nieuw</Badge>}
                    />
                    <CardBody>
                        <CardTitle to="/components/button">Button</CardTitle>
                        <CardDescription>Knoppen in alle varianten en maten.</CardDescription>
                    </CardBody>
                </Card>
            </ShowcaseSection>
            <ShowcaseSection title="Multiple + bordered">
                <Card variant="elevated">
                    <CardImage src="https://picsum.photos/640/360" alt="..." badge={<Badge size="xs" radius="full" variant="secondary">Tip</Badge>} />
                    <CardBody>
                        <CardTitle href="https://tailwindcss.com" target="_blank">Tailwind</CardTitle>
                        <CardDescription>Opent in een nieuw tabblad.</CardDescription>
                    </CardBody>
                </Card>
            </ShowcaseSection>
            <ShowcaseSection title="Seperated">
                <Card direction="horizontal">
                    <CardImage src="https://picsum.photos/640/360" alt="..." wrapperClassName="sm:aspect-auto sm:w-48" />
                    <CardBody>...</CardBody>
                </Card>
            </ShowcaseSection>
            <ShowcaseSection title="Seperated">
                <Card variant="filled">
                    <CardBody>
                        <CardTitle>Alleen tekst</CardTitle>
                        <CardDescription>Geen href of to, dus niet klikbaar.</CardDescription>
                    </CardBody>
                </Card>
            </ShowcaseSection>
        </>
    );
}