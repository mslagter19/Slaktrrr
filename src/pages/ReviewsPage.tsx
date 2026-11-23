import { usePageMeta } from "../hooks/usePageMeta";
import { Underline } from "../components/ui/Underline";
import { HeroSubSection } from "../components/sections/HeroSubSection";
import { FeaturedReview } from "../components/ui/reviews/FeaturedReview";
import { ReviewSection } from "../components/sections/ReviewSection";
import { REVIEWS } from "../components/ui/reviews/reviews.data";
import { OutroSection } from "../components/sections/OutroSection";

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
            />

            <Underline background="black" width="full" thickness="thin" />

            <FeaturedReview reviews={REVIEWS} />

            <ReviewSection />

            <OutroSection />
        </div>
    )
}
