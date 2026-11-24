import { usePageMeta } from "../hooks/usePageMeta";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { FeaturedReview } from "../components/ui/reviews/FeaturedReview";
import { ReviewSection } from "../components/sections/ReviewSection";
import { LevelsSection, type LevelItem } from "../components/sections/LevelsSection";
import { CaseSection } from "../components/sections/CaseSection";
import { REVIEWS } from "../components/ui/reviews/reviews.data";
import { OutroSection } from "../components/sections/OutroSection";
import { Vinyl } from "../components/ui/Vinyl";

// De cijfers rekenen mee met REVIEWS, dus ze kloppen ook als de reviews straks uit Laravel komen
const average = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / Math.max(1, REVIEWS.length)
const topShare = Math.round((REVIEWS.filter((r) => r.rating === 5).length / Math.max(1, REVIEWS.length)) * 100)

const levels: LevelItem[] = [
    { to: average, decimals: 1, level: average / 5, label: "Score", caption: <>Gemiddelde <span className="font-bold text-brand-600">score</span> van 5</> },
    { to: REVIEWS.length, level: Math.min(1, REVIEWS.length / 10), label: "Applaus", caption: <><span className="font-bold text-brand-600">Reacties</span> uit de zaal</> },
    { to: topShare, suffix: "%", level: topShare / 100, label: "Encore", caption: <>Gaf de <span className="font-bold text-brand-600">hoogste</span> score</> },
]

export function ReviewsPage() {
    usePageMeta({
        title: "Reviews",
        description: "Wat opdrachtgevers en collega's zeggen over samenwerken met Slaktrrr."
    })

    return (
        <div id="reviews">
            <HeroSubSection
                subtitle="Encore · Uit de zaal"
                title="Reviews"
                description="Een optreden is pas geslaagd als de zaal het zegt. Dit zijn de reacties van opdrachtgevers en collega's waarmee ik heb gespeeld."
                actions={null}
                aside={
                    <div aria-hidden="true" className="pointer-events-none mx-auto w-full max-w-md">
                        <Vinyl alt="" trigger="always" duration={9} labelText="ENCORE" labelSubText="REVIEWS · SIDE B" />
                    </div>
                }
            />

            <Underline background="black" width="full" thickness="thin" />

            <FeaturedReview reviews={REVIEWS} />

            <LevelsSection eyebrow="Levels · Applaus" items={levels} />

            <ReviewSection />

            <CaseSection limit={3} moreTo="/cases" title="Waar ze over spraken" description="De platen achter de reacties." />

            <OutroSection />
        </div>
    )
}
