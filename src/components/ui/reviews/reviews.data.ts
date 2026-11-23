import type { Review } from "./ReviewCard"

// Placeholder-teksten. Later komen deze uit Laravel (GET /api/reviews, alleen approved = true)
export const REVIEWS: Review[] = [
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
