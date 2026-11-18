import { ReviewHand } from "../ui/reviews/ReviewHand"
import type { Review } from "../ui/reviews/ReviewCard"

// Placeholder-teksten. Later komen deze uit Laravel (GET /api/reviews, alleen approved = true)
const REVIEWS: Review[] = [
    {
        id: 1,
        name: "Naam Achternaam",
        role: "Art director",
        company: "Studio X",
        quote: "Dacht mee over het ontwerp en leverde code die precies deed wat de mockup beloofde.",
        rating: 5,
    },
    {
        id: 2,
        name: "Naam Achternaam",
        role: "Product owner",
        company: "Bedrijf Y",
        quote: "Snel geschakeld, duidelijke updates en nooit verrassingen vlak voor de oplevering.",
        rating: 4,
    },
    {
        id: 3,
        name: "Naam Achternaam",
        role: "Backend developer",
        company: "Bedrijf Z",
        quote: "Componenten die we zonder uitleg konden hergebruiken. Dat zie je niet vaak.",
        rating: 5,
    },
    {
        id: 4,
        name: "Naam Achternaam",
        role: "Projectmanager",
        quote: "Prettig in de omgang en scherp op toegankelijkheid, ook als de deadline krap was.",
        rating: 4,
    },
    {
        id: 5,
        name: "Naam Achternaam",
        role: "Founder",
        company: "Startup Q",
        quote: "Van schets naar werkende site in een paar weken, en hij bleef ook daarna bereikbaar.",
        rating: 3,
    },
]

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
