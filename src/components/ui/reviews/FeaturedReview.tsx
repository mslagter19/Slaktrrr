import { Badge } from "../Badge"
import { Button } from "../Button"
import { Spotlight } from "../Spotlight"
import { Reveal } from "../../gsap/Reveal"
import type { Review } from "./ReviewCard"

type FeaturedReviewProps = {
    reviews: Review[]
    review?: Review // optioneel: deze review uitlichten, anders de hoogste score
    moreTo?: string // optioneel: knop onder de quote, bv. "/reviews"
    moreLabel?: string // tekst van die knop
}

/*
 * Eén review groot uitgelicht, als citaat op het podium: Spotlight erachter,
 * de quote in het heading-font met messing aanhalingstekens, de afzender als "featuring".
 * De score staat als schoppen-symbolen (5 = ♠♠♠♠♠), net als de rang op de kaarten in ReviewHand.
 */
export function FeaturedReview({ reviews, review, moreTo, moreLabel = "Alle reviews" }: FeaturedReviewProps) {
    const featured = review ?? [...reviews].sort((a, b) => b.rating - a.rating)[0]
    if (!featured) return null

    return (
        <section
            aria-label="Uitgelichte review"
            className="relative isolate overflow-clip bg-black px-6 py-28 text-white md:py-36"
        >
            {/* Podiumlicht */}
            <Spotlight className="absolute inset-0 -z-10" />

            <Reveal as="figure" stagger={0.15} className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
                <Badge variant="eyebrow" size="none" radius="none" className="justify-center text-brand-600">
                    <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                    Uit de zaal
                    <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                </Badge>

                <blockquote className="mt-6 font-heading text-3xl leading-[1.15] font-semibold tracking-tight md:text-5xl">
                    <span aria-hidden="true" className="text-brand-600">&ldquo;</span>
                    {featured.quote}
                    <span aria-hidden="true" className="text-brand-600">&rdquo;</span>
                </blockquote>

                <figcaption className="mt-8 text-white/70">
                    <span className="text-sm tracking-[0.22em] text-white/50 uppercase">featuring </span>
                    <span className="font-semibold text-white">{featured.name}</span>
                    <span>
                        , {featured.role}
                        {featured.company && ` · ${featured.company}`}
                    </span>
                </figcaption>

                <p className="mt-3 text-lg tracking-[0.3em] text-brand-600">
                    <span aria-hidden="true">{"♠".repeat(featured.rating)}</span>
                    <span className="sr-only">Score: {featured.rating} van 5</span>
                </p>
            </Reveal>

            {moreTo && (
                <Reveal className="relative mt-10 flex justify-center">
                    <Button
                        to={moreTo}
                        variant="outline"
                        size="lg"
                        radius="lg"
                        className="border-white/30 text-white hover:bg-white/10"
                    >
                        {moreLabel}
                    </Button>
                </Reveal>
            )}
        </section>
    )
}
