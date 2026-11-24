import { useLocation, useSearchParams } from "react-router-dom"
import { usePageMeta } from "@/hooks/usePageMeta"
import { formatSeconds } from "@/lib/format"
import { Spotlight } from "@/components/brand/Spotlight"
import { SplitHeading } from "@/components/motion/SplitHeading"
import { BalanceGame } from "@/features/experiment/BalanceGame"
import { Eyebrow } from "@/components/ui/Eyebrow"

// Verborgen pagina: je komt hier via de flamingo die af en toe over de hero vliegt
export function ExperimentPage() {
    usePageMeta({
        title: "Experiment",
        description: "Een verborgen experiment: houd de neon-flamingo in balans op een draaiende plaat.",
    })

    const location = useLocation()
    const caught = (location.state as { caught?: boolean } | null)?.caught === true

    // Uitdaging uit een gedeelde link: ?score=42.3 (alleen een redelijk getal telt)
    const [params] = useSearchParams()
    const raw = Number(params.get("score"))
    const challenge = params.has("score") && Number.isFinite(raw) && raw > 0 && raw <= 600 ? raw : undefined

    const eyebrow = challenge
        ? `Iemand hield het ${formatSeconds(challenge)} s vol. Kun jij dat verslaan?`
        : caught
          ? "Gevangen! Je was snel genoeg"
          : "Je hebt de flamingo gevonden"

    return (
        <section className="relative isolate overflow-clip bg-black px-6 py-24 text-white md:py-32">
            {/* Podiumlicht */}
            <Spotlight className="absolute inset-0 -z-10" />

            <div className="mx-auto max-w-3xl text-center">
                <Eyebrow align="center">{eyebrow}</Eyebrow>

                <SplitHeading
                    as="h1"
                    className="mt-4 font-heading text-[clamp(2.4rem,8vw,4.5rem)] leading-[1.02] font-semibold tracking-tight"
                >
                    Flamingo op <em className="font-medium text-brand-600">78 toeren</em>
                </SplitHeading>

                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
                    Een flamingo staat graag op één been. Op een draaiende plaat wordt dat lastig, zeker als de
                    toeren omhoog gaan. Hoe lang houd jij hem overeind?
                </p>
            </div>

            <BalanceGame challenge={challenge} className="mt-12" />
        </section>
    )
}
