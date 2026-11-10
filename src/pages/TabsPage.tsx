import { useState } from 'react'
import { Tabs, TabList, Tab, TabPanel } from '../components/ui/Tabs'
import { PageHeader } from '../components/showcase/PageHeader'
import { ShowcaseSection } from '../components/showcase/ShowcaseSection'

const variants = ['underline', 'pills', 'boxed'] as const

export function TabsPage() {
    const [active, setActive] = useState('een')

    return (
        <>
            <PageHeader title="Tabs" description="Schakel tussen weergaven zonder de pagina te verlaten." />

            {variants.map((variant) => (
                <ShowcaseSection key={variant} title={variant}>
                    <Tabs defaultValue="profiel" variant={variant}>
                        <TabList>
                            <Tab value="profiel">Profiel</Tab>
                            <Tab value="instellingen">Instellingen</Tab>
                            <Tab value="facturen">Facturen</Tab>
                            <Tab value="archief" disabled>Archief</Tab>
                        </TabList>
                        <TabPanel value="profiel">Inhoud van profiel.</TabPanel>
                        <TabPanel value="instellingen">Inhoud van instellingen.</TabPanel>
                        <TabPanel value="facturen">Inhoud van facturen.</TabPanel>
                    </Tabs>
                </ShowcaseSection>
            ))}

            <ShowcaseSection title="Controlled">
                <p className="mb-2 text-sm text-neutral-600">Actieve tab: {active}</p>
                <Tabs value={active} onValueChange={setActive} variant="pills">
                    <TabList>
                        <Tab value="een">Een</Tab>
                        <Tab value="twee">Twee</Tab>
                    </TabList>
                    <TabPanel value="een">Eerste paneel</TabPanel>
                    <TabPanel value="twee">Tweede paneel</TabPanel>
                </Tabs>
                <button className="mt-2 text-sm underline" onClick={() => setActive('twee')}>
                    Spring naar "Twee" vanuit de ouder
                </button>
            </ShowcaseSection>
        </>
    )
}