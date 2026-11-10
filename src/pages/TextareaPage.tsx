// src/pages/TextareaPage.tsx
import { Textarea } from "../components/ui/form/Textarea"
import { FormField } from "../components/ui/form/FormField"
import { PageHeader } from "../components/showcase/PageHeader"
import { ShowcaseSection } from "../components/showcase/ShowcaseSection"
import { usePageMeta } from "../hooks/usePageMeta"

export function TextareaPage() {
    usePageMeta({
        title: "Textarea",
        description: "Een meerregelig tekstveld dat de stijl met Input deelt."
    })

    return (
        <>
            <PageHeader
                title="Textarea"
                description="Een meerregelig tekstveld dat de stijl met Input deelt."
            />

            <ShowcaseSection title="Varianten">
                <div className="grid w-full max-w-sm gap-4">
                    <Textarea placeholder="Default" />
                    <Textarea variant="error" placeholder="Error" />
                    <Textarea variant="success" placeholder="Success" />
                </div>
            </ShowcaseSection>

            <ShowcaseSection title="Met label (FormField)">
                <div className="grid w-full max-w-sm gap-4">
                    <FormField label="Bericht" hint="Maximaal 500 tekens">
                        {(field) => <Textarea rows={6} {...field} />}
                    </FormField>
                </div>
            </ShowcaseSection>
        </>
    )
}