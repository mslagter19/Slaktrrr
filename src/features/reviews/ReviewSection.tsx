import { ReviewHand } from "./ReviewHand"
import { REVIEWS } from "./reviews.data"
import { SaxophoneLine } from "@/components/brand/LineArt"
import { ParallaxScene } from "@/components/motion/ParallaxScene"
import { SplitHeading } from "@/components/motion/SplitHeading"
import { Reveal } from "@/components/motion/Reveal"

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
