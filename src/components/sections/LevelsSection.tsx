import type { ReactNode } from "react"
import { CountUp } from "@/components/motion/CountUp"
import { VuMeter } from "@/components/brand/VuMeter"
import { cn } from "@/lib/cn"
import { Eyebrow } from "@/components/ui/Eyebrow"

export type LevelItem = {
    to: number // eindwaarde van de teller
    suffix?: string // bv. "+" of "%"
    decimals?: number // bv. 1 voor een gemiddelde score
    level: number // 0–1: uitslag van de naald (vanaf ~0.8 rode zone)
    label: string // tekst op de meterplaat
    caption: ReactNode // uitleg onder het cijfer
}

type LevelsSectionProps = {
    eyebrow?: string
    items: LevelItem[]
    className?: string
}

/*
 * De cijfers van een pagina, elk met een VU-meter die uitslaat zodra hij in beeld komt.
 * Twee items = twee kolommen, drie of meer = drie kolommen.
 */
export function LevelsSection({ eyebrow = "Levels", items, className }: LevelsSectionProps) {
    return (
        <section className={cn("relative overflow-hidden bg-black py-16 text-white", className)}>
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6">
                <Eyebrow align="center">{eyebrow}</Eyebrow>

                <div className={cn("grid w-full gap-10 md:gap-12", items.length >= 3 ? "max-w-6xl md:grid-cols-3" : "max-w-4xl md:grid-cols-2")}>
                    {items.map((item) => (
                        <figure key={item.label} className="flex flex-col items-center text-center">
                            {/* Op mobiel kleiner: drie meters onder elkaar worden anders erg lang */}
                            <VuMeter level={item.level} label={item.label} className="max-w-56 drop-shadow-2xl md:max-w-xs" />
                            <CountUp
                                to={item.to}
                                suffix={item.suffix}
                                decimals={item.decimals}
                                duration={1.6}
                                className="mt-4 font-heading text-4xl font-semibold text-brand-600 tabular-nums md:mt-6 md:text-5xl"
                            />
                            <figcaption className="mt-2 max-w-xs text-lg text-white/70">{item.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}
