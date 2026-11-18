import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"

export type CasePanelData = {
    slug: string
    title: string
    cover: string
    summary: string
    categories: string[] // bv. ["Website", "Webshop"]
}

type CasePanelProps = {
    item: CasePanelData
    onClose: () => void
}

export function CasePanel({ item, onClose }: CasePanelProps) {
    const { slug, title, cover, summary, categories } = item

    return (
        <div className="flex min-h-full flex-col gap-6 p-6">
            <div className="flex items-start justify-between gap-4">
                <h2 className="font-heading text-2xl font-semibold text-white">{title}</h2>
                <Button variant="outline" size="sm" aria-label="Sluit case" onClick={onClose} className="text-white cursor-pointer hover:bg-black">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </Button>
            </div>

            <img
                src={cover}
                alt={`Afbeelding van project ${title}`}
                className="aspect-square w-full rounded-sm object-cover ring-1 ring-white/10"
            />

            <p className="text-sm leading-relaxed text-white/70">{summary}</p>

            <ul className="flex flex-wrap gap-2" aria-label="Categorieën">
                {categories.map((category) => (
                    <li key={category}>
                        <Badge variant="outline" size="xs" radius="full" className="border-white/30 text-white">
                            {category}
                        </Badge>
                    </li>
                ))}
            </ul>

            {/* mt-auto: de knop zakt naar de onderkant van het paneel */}
            <Button to={`/cases/${slug}`} size="lg" onClick={onClose} className="mt-auto w-full">
                Bekijk de case
            </Button>
        </div>
    )
}