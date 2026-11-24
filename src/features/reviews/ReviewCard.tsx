import type { ComponentProps } from "react"
import { cn } from "@/lib/cn"

export type Suit = "spades" | "hearts" | "diamonds" | "clubs"

export type Review = {
    id: string | number
    name: string
    role: string // bv. "Art director"
    company?: string
    quote: string // hou het kort: ±200 tekens past op de kaart
    rating: 1 | 2 | 3 | 4 | 5 // 5 = Aas, 4 = Heer, 3 = Vrouw, 2 = Boer, 1 = Tien
    suit?: Suit
}

// De score wordt de rang van de kaart
const RANKS: Record<Review["rating"], string> = {
    5: "A",
    4: "K",
    3: "Q",
    2: "J",
    1: "10",
}

const RANK_LABELS: Record<Review["rating"], string> = {
    5: "Aas",
    4: "Heer",
    3: "Vrouw",
    2: "Boer",
    1: "Tien",
}

const SUITS: Record<Suit, { symbol: string; red: boolean }> = {
    spades: { symbol: "♠", red: false },
    clubs: { symbol: "♣", red: false },
    hearts: { symbol: "♥", red: true },
    diamonds: { symbol: "♦", red: true },
}

type ReviewCardProps = ComponentProps<"article"> & {
    review: Review
}

// Hoekindex: rang boven suit. Rechtsonder wordt dezelfde index 180° gedraaid.
function CornerIndex({ rank, symbol, className }: { rank: string; symbol: string; className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={cn("absolute flex flex-col items-center leading-none", className)}
        >
            <span className="font-heading text-2xl font-semibold">{rank}</span>
            <span className="mt-1 text-xl">{symbol}</span>
        </div>
    )
}

export function ReviewCard({ review, className, ...rest }: ReviewCardProps) {
    const { name, role, company, quote, rating, suit = "spades" } = review
    const { symbol, red } = SUITS[suit]
    const rank = RANKS[rating]

    return (
        <article
            aria-label={`Review van ${name}: ${RANK_LABELS[rating]}, ${rating} van 5`}
            className={cn(
                // Kaart: crème papier met inkt-zwarte tekst, werkt op een zwarte sectie
                "relative aspect-[5/7] w-64 select-none overflow-hidden rounded-xl bg-white text-black shadow-xl shadow-black/60 lg:w-72",
                "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600",
                red && "text-brand-700",
                className
            )}
            {...rest}
        >
            {/* Dunne binnenrand, zoals bij een echte speelkaart */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-lg border border-current opacity-20" />

            {/* Groot suit-symbool als watermerk achter het citaat */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11rem] leading-none opacity-[0.07]"
            >
                {symbol}
            </span>

            <CornerIndex rank={rank} symbol={symbol} className="top-4 left-4" />
            <CornerIndex rank={rank} symbol={symbol} className="right-4 bottom-4 rotate-180" />

            {/* Inhoud: tussen de hoekindexen */}
            <div className="relative flex h-full flex-col justify-center px-14 py-12 text-center">
                <blockquote className="text-[0.95rem] leading-snug text-black">
                    <p className="line-clamp-7">&ldquo;{quote}&rdquo;</p>
                </blockquote>

                <div className="mt-4">
                    <p className="font-heading text-base font-semibold text-black">{name}</p>
                    <p className="text-xs text-black/70">
                        {role}
                        {company && `, ${company}`}
                    </p>
                </div>
            </div>
        </article>
    )
}
