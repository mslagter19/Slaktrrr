import { ReviewHand } from "../ui/reviews/ReviewHand"
import { REVIEWS } from "../ui/reviews/reviews.data"

export function ReviewSection() {
    return (
        <section className="relative overflow-hidden bg-black px-6 py-24 text-white">
            {/* Plek voor een LineArt-achtergrond: bv. de saxofoon, groot en laag in contrast,
                achter de hand. Laat 'm door de kaarten heen schemeren. */}
            {/* <Saxophone aria-hidden className="absolute -right-24 top-0 h-full opacity-10" /> */}

            <div className="relative mx-auto max-w-5xl">
                <header className="mb-12 max-w-xl">
                    <h2 className="font-heading text-4xl font-semibold">Een goede hand</h2>
                    <p className="mt-3 text-white/70">
                        Wat opdrachtgevers en collega's zeggen over samenwerken. Hoe hoger de kaart, hoe hoger de
                        score.
                    </p>
                </header>

                <ReviewHand reviews={REVIEWS} />
            </div>
        </section>
    )
}
