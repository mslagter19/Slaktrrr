import type { ReactNode } from "react"
import themeCss from "@/styles/theme.css?raw"
import { usePageMeta } from "@/hooks/usePageMeta"
import { parseColorScales } from "@/lib/parseColorScales"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/Card"
import { ColorSwatch } from "@/components/ui/ColorSwatch"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs"
import { Tooltip } from "@/components/ui/Tooltip"
import { TrackList, TrackListItem } from "@/components/ui/TrackList"
import { Typography } from "@/components/ui/Typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormField } from "@/components/ui/form/FormField"
import { Input } from "@/components/ui/form/Input"
import { Textarea } from "@/components/ui/form/Textarea"
import { ChevronIcon, DownloadIcon, FlipIcon, MailIcon, PlayIcon, ShareIcon } from "@/components/ui/icons"
import { CountUp } from "@/components/motion/CountUp"
import { MotionToggle } from "@/components/motion/MotionToggle"
import { Reveal } from "@/components/motion/Reveal"
import { PlayingCardLine, SaxophoneLine, WhiskeyGlassLine } from "@/components/brand/LineArt"
import { Vinyl } from "@/components/brand/Vinyl"
import { VuMeter } from "@/components/brand/VuMeter"
import { HeroSubSection } from "@/components/sections/HeroSubSection"

/*
 * Verborgen pagina (niet in de navigatie): het design system van Slaktrrr, live.
 * - Naslag voor mezelf bij het bouwen, en bewijs voor opdrachtgevers van een vaste werkwijze.
 * - Kleuren komen rechtstreeks uit theme.css, dus deze pagina loopt nooit achter op de tokens.
 * - Volgorde volgt de lagen: tokens → ui → motion → brand (zie docs/werkwijze.md).
 */

const scales = parseColorScales(themeCss)

// Benoemde tokens (geen getallen-schaal), dus met de hand: de semantische laag die ui/ gebruikt
const SEMANTIC = [
    "surface", "surface-raised", "surface-hover", "line", "line-strong",
    "ink", "ink-strong", "ink-muted", "ink-subtle", "on-brand",
]
const NEUTRALS = [
    "black", "black-deep", "black-soft", "black-vinyl", "black-raised", "black-groove", "black-ash",
    "white", "white-bright", "white-muted", "white-dim", "white-faint",
]

const TYPE_VARIANTS = ["display", "h1", "h2", "h3", "h4", "lead", "body", "small", "caption"] as const
const BUTTON_VARIANTS = ["primary", "secondary", "outline", "link"] as const
const BADGE_VARIANTS = ["primary", "secondary", "outline"] as const
const ICONS = { DownloadIcon, MailIcon, PlayIcon, ChevronIcon, ShareIcon, FlipIcon }

function Block({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro: string; children: ReactNode }) {
    return (
        <section aria-labelledby={`${id}-titel`} className="border-t border-line py-16">
            <div className="mx-auto max-w-7xl px-6">
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 id={`${id}-titel`} className="mt-3 font-heading text-3xl font-bold">
                    {title}
                </h2>
                <p className="mt-2 max-w-2xl text-ink-muted">{intro}</p>
                <div className="mt-10">{children}</div>
            </div>
        </section>
    )
}

function Swatches({ title, tokens }: { title: string; tokens: { name: string; variable: string; value?: string }[] }) {
    return (
        <div className="mb-8">
            <h3 className="mb-3 text-sm tracking-widest text-ink-subtle uppercase">{title}</h3>
            <div className="flex flex-wrap gap-3">
                {tokens.map((t) => (
                    <ColorSwatch key={t.variable} variable={t.variable} label={t.name} value={t.value ?? t.variable} />
                ))}
            </div>
        </div>
    )
}

export function StyleguidePage() {
    usePageMeta({
        title: "Styleguide",
        description: "Het design system van Slaktrrr: tokens, componenten en motion, live op één pagina.",
    })

    return (
        <div id="styleguide">
            <HeroSubSection
                subtitle="Liner notes · Design system"
                title="Styleguide"
                description="Alle bouwstenen van deze site op één plek: van tokens tot thema. De volgorde volgt de lagen van het project; wat bovenaan staat, neem ik mee naar elk volgend project."
                actions={<MotionToggle />}
            />

            <Block id="kleuren" eyebrow="Laag 0 · Tokens" title="Kleuren" intro="Schalen en de semantische laag uit src/styles/theme.css. De ui-componenten gebruiken alleen de semantische laag, zodat een ander thema alleen dat blok hoeft te vervangen.">
                <Swatches
                    title="Semantisch (gebruikt door ui/)"
                    tokens={SEMANTIC.map((name) => ({ name, variable: `--color-${name}` }))}
                />
                {scales.map((scale) => (
                    <Swatches
                        key={scale.name}
                        title={scale.name}
                        tokens={scale.tokens.map((t) => ({ name: t.shade, variable: t.variable, value: t.value }))}
                    />
                ))}
                <Swatches title="Noir en ivoor" tokens={NEUTRALS.map((name) => ({ name, variable: `--color-${name}` }))} />
            </Block>

            <Block id="typografie" eyebrow="Laag 0 · Tokens" title="Typografie" intro="Koppen in DM Serif Display, tekst in Inter. Typography koppelt elke variant aan het juiste HTML-element.">
                <div className="space-y-4">
                    {TYPE_VARIANTS.map((variant) => (
                        <div key={variant} className="grid items-baseline gap-2 md:grid-cols-[8rem_1fr]">
                            <code className="font-mono text-xs text-ink-subtle">{variant}</code>
                            <Typography variant={variant} as="p">
                                Interfaces met ritme en karakter
                            </Typography>
                        </div>
                    ))}
                </div>
            </Block>

            <Block id="primitives" eyebrow="Laag 1 · components/ui" title="Primitives" intro="Thema-loze bouwstenen. Varianten via class-variance-authority; een className kan altijd mee, maar een override die steeds terugkomt hoort in de variant zelf.">
                <div className="space-y-10">
                    <div className="flex flex-wrap items-center gap-3">
                        {BUTTON_VARIANTS.map((variant) => (
                            <Button key={variant} variant={variant} radius="lg">
                                {variant}
                            </Button>
                        ))}
                        <Button radius="lg" leftIcon={<PlayIcon />}>Met icoon</Button>
                        <Button radius="lg" disabled>Uitgeschakeld</Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {BADGE_VARIANTS.map((variant) => (
                            <Badge key={variant} variant={variant} size="sm" radius="full">
                                {variant}
                            </Badge>
                        ))}
                        <Eyebrow>Eyebrow start</Eyebrow>
                        <Eyebrow align="center">Eyebrow center</Eyebrow>
                    </div>

                    <div className="flex flex-wrap gap-6 text-brand-600">
                        {Object.entries(ICONS).map(([name, Icon]) => (
                            <figure key={name} className="flex flex-col items-center gap-2">
                                <Icon className="size-6" />
                                <figcaption className="font-mono text-xs text-ink-subtle">{name}</figcaption>
                            </figure>
                        ))}
                    </div>

                    <div className="grid gap-10 md:grid-cols-2">
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <FormField label="Naam" required hint="Hoe mag ik je noemen?">
                                {(field) => <Input {...field} />}
                            </FormField>
                            <FormField label="E-mail" required error="Dit lijkt geen e-mailadres.">
                                {(field) => <Input type="email" defaultValue="marc@" {...field} />}
                            </FormField>
                            <FormField label="Bericht">
                                {(field) => <Textarea rows={3} {...field} />}
                            </FormField>
                        </form>

                        <div className="space-y-8">
                            <Card variant="outline" radius="lg">
                                <CardBody>
                                    <CardTitle>Card · outline</CardTitle>
                                    <CardDescription>Titel en tekst volgen de semantische kleuren.</CardDescription>
                                </CardBody>
                            </Card>

                            <TrackList>
                                <TrackListItem label="Woonplaats">Arnhem</TrackListItem>
                                <TrackListItem label="Stack">React · TypeScript · Tailwind</TrackListItem>
                            </TrackList>

                            <Tooltip id="sg-tooltip" open content="Tooltip, altijd open voor de styleguide">
                                <span className="text-sm text-ink-muted">Element met tooltip</span>
                            </Tooltip>
                        </div>
                    </div>

                    <Tabs defaultValue="a" variant="pills">
                        <TabList>
                            <Tab value="a">Side A</Tab>
                            <Tab value="b">Side B</Tab>
                        </TabList>
                        <TabPanel value="a" className="pt-4 text-ink-muted">Inhoud van kant A.</TabPanel>
                        <TabPanel value="b" className="pt-4 text-ink-muted">Inhoud van kant B.</TabPanel>
                    </Tabs>

                    <Accordion type="single" className="max-w-2xl">
                        <AccordionItem value="een">
                            <AccordionTrigger>Accordion: klik om te openen</AccordionTrigger>
                            <AccordionContent>Het plaatje draait een halve slag en het label kleurt vol.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Block>

            <Block id="motion" eyebrow="Laag 2 · components/motion" title="Motion" intro="Elke animatie leest useMotion(). Zet de schakelaar bovenaan uit: alles staat dan stil of verschijnt direct.">
                <Reveal stagger={0.15} className="grid gap-6 md:grid-cols-3">
                    {[12, 1500, 98].map((to) => (
                        <div key={to} className="rounded-lg border border-line p-6 text-center">
                            <CountUp to={to} className="font-heading text-5xl text-brand-600" />
                            <p className="mt-2 text-sm text-ink-muted">Reveal + CountUp</p>
                        </div>
                    ))}
                </Reveal>
            </Block>

            <Block id="brand" eyebrow="Laag 3 · components/brand" title="Het jazz-thema" intro="Alles wat Slaktrrr Slaktrrr maakt. Deze laag vervang je in een volgend project door een eigen thema.">
                <div className="grid items-center gap-10 md:grid-cols-3">
                    <div className="mx-auto w-48" aria-hidden="true">
                        <Vinyl alt="" trigger="always" duration={9} labelText="SLAKTRRR" labelSubText="STYLEGUIDE" />
                    </div>
                    <VuMeter level={0.75} label="Levels" className="mx-auto max-w-xs" />
                    <div className="flex justify-center gap-6 text-ink-subtle">
                        <SaxophoneLine className="h-32 w-auto" />
                        <PlayingCardLine className="h-32 w-auto" />
                        <WhiskeyGlassLine className="h-32 w-auto" />
                    </div>
                </div>
            </Block>
        </div>
    )
}
