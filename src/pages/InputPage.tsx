import { Input } from "../components/ui/form/Input"
import { FormField } from "../components/ui/form/FormField"
import { PageHeader } from "../components/showcase/PageHeader"
import { ShowcaseSection } from "../components/showcase/ShowcaseSection"
import { usePageMeta } from "../hooks/usePageMeta"

export function InputPage() {
    usePageMeta({
        title: "Input",
        description: "Een inputveld met varianten en maten, opgebouwd met cva."
    })

    return (
        <>
            <PageHeader
                title="Input"
                description="Een inputveld met varianten en maten, opgebouwd met cva."
            />

            <ShowcaseSection title="Varianten">
                <div className="grid w-full max-w-sm gap-4">
                    <Input variant="default" placeholder="Default" />
                    <Input variant="error" placeholder="Error" />
                    <Input variant="success" placeholder="Success" />
                    <Input disabled placeholder="Disabled" />
                </div>
            </ShowcaseSection>

            <ShowcaseSection title="Maten">
                <div className="grid w-full max-w-sm gap-4">
                    <Input size="xs" placeholder="xs" />
                    <Input size="sm" placeholder="sm" />
                    <Input size="md" placeholder="md" />
                    <Input size="lg" placeholder="lg" />
                    <Input size="xl" placeholder="xl" />
                </div>
            </ShowcaseSection>

            <ShowcaseSection title="Met label (FormField)">
                <div className="grid w-full max-w-sm gap-4">
                    <FormField label="E-mailadres" hint="We delen dit nooit" required>
                        {(field) => <Input type="email" placeholder="naam@bedrijf.nl" {...field} />}
                    </FormField>

                    <FormField label="Gebruikersnaam" error="Deze naam is al in gebruik">
                        {(field) => <Input {...field} />}
                    </FormField>
                </div>
            </ShowcaseSection>
        </>
    )
}