import { Button } from "../Button"
import { Reveal } from "../../gsap/Reveal"
import type { Review } from "./ReviewCard"
import { Eyebrow } from "../Eyebrow"

type FeaturedReviewProps = {
    reviews: Review[]
    review?: Review // optioneel: deze review uitlichten, anders de hoogste score
    moreTo?: string // optioneel: knop onder de quote, bv. "/reviews"
    moreLabel?: string // tekst van die knop
}

/*
 * Eén review groot uitgelicht, als een kaart die net op tafel is gelegd.
 * Bewust anders dan de OutroSection (gecentreerd, Spotlight): hier links een gedraaide speelkaart,
 * rechts de quote links uitgelijnd en cursief, met een warme gloed van links in plaats van podiumlicht.
 * De score staat als schoppen-symbolen (5 = ♠♠♠♠♠), net als de rang op de kaarten in ReviewHand.
 */
export function FeaturedReview({ reviews, review, moreTo, moreLabel = "Alle reviews" }: FeaturedReviewProps) {
    const featured = review ?? [...reviews].sort((a, b) => b.rating - a.rating)[0]
    if (!featured) return null

    return (
        <section
            aria-label="Uitgelichte review"
            className="relative isolate overflow-clip border-y border-white/10 bg-black bg-[radial-gradient(50%_70%_at_0%_50%,color-mix(in_oklab,var(--color-brand-600)_14%,transparent),transparent_70%)] px-6 py-20 text-white md:py-24"
        >
            <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16">
                {/* De gedeelde kaart: puur decoratief, de inhoud staat rechts */}
                <Reveal delay={0.1} className="justify-self-center md:justify-self-start">
                    <div
                        aria-hidden="true"
                        className="relative aspect-[5/7] w-32 -rotate-6 rounded-xl bg-white text-black shadow-xl shadow-black/60 md:w-52"
                    >
                        <div className="absolute inset-2 rounded-lg border border-current opacity-20" />
                        <span className="absolute top-3 left-4 text-xl leading-none md:text-2xl">♠</span>
                        <span className="absolute right-4 bottom-3 rotate-180 text-xl leading-none md:text-2xl">♠</span>
                        <span className="absolute inset-0 flex items-center justify-center text-6xl leading-none md:text-8xl">♠</span>
                    </div>
                </Reveal>

                <Reveal as="figure" stagger={0.15} className="relative">
                    {/* Groot aanhalingsteken als watermerk */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-16 -left-4 font-heading text-[8rem] leading-none text-brand-600/20 md:-left-8"
                    >
                        &ldquo;
                    </span>

                    <Eyebrow>Uit de zaal</Eyebrow>

                    <blockquote className="relative mt-5 font-heading text-2xl leading-snug font-medium italic md:text-4xl">
                        {featured.quote}
                    </blockquote>

                    <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                        <span>
                            <span className="font-semibold text-white">{featured.name}</span>
                            <span className="text-white/60">
                                , {featured.role}
                                {featured.company && ` · ${featured.company}`}
                            </span>
                        </span>
                        <span className="tracking-[0.3em] text-brand-600 sm:ml-auto">
                            <span aria-hidden="true">{"♠".repeat(featured.rating)}</span>
                            <span className="sr-only">Score: {featured.rating} van 5</span>
                        </span>
                    </figcaption>

                    {moreTo && (
                        <div className="mt-10">
                            <Button
                                to={moreTo}
                                variant="outline"
                                size="lg"
                                radius="lg"
                               
                            >
                                {moreLabel}
                            </Button>
                        </div>
                    )}
                </Reveal>
            </div>
        </section>
    )
}
