import { ReviewHand } from "../ui/reviews/ReviewHand"
import { REVIEWS } from "../ui/reviews/reviews.data"
import { SaxophoneLine } from "../ui/LineArt"
import { ParallaxScene } from "../gsap/ParallaxScene"
import { SplitHeading } from "../gsap/SplitHeading"
import { Reveal } from "../gsap/Reveal"

export function ReviewSection() {
    return (
        <section aria-labelledby="hand-titel" className="relative overflow-x-clip bg-black px-6 py-24 text-white">
            {/* Saxofoon groot en laag in contrast achter de hand, iets trager dan de inhoud */}
            <ParallaxScene aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div data-speed="0.8" data-rotate="3" className="absolute -right-24 top-0 w-96">
                    <SaxophoneLine className="rotate-12 text-white/10" />
                </div>
            </ParallaxScene>

            <div className="relative mx-auto max-w-5xl">
                <header className="mb-12 max-w-xl">
                    <SplitHeading as="h2" id="hand-titel" className="font-heading text-4xl font-semibold">
                        Een goede hand
                    </SplitHeading>
                    <Reveal as="p" className="mt-3 text-white/70">
                        Wat opdrachtgevers en collega's zeggen over samenwerken. Hoe hoger de kaart, hoe hoger de
                        score.
                    </Reveal>
                </header>

                <ReviewHand reviews={REVIEWS} />
            </div>
        </section>
    )
}
