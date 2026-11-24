import { cn } from "@/lib/cn"

const SEGMENTS = 12
const PEAK_FROM = 10 // de laatste 2 segmenten zijn oranje

type VerticalMeterProps = {
    level: number // 0–100
    active: boolean // start de animatie
    delay?: number // ms, om kaarten na elkaar te laten opkomen
    className?: string
}

export function VerticalMeter({ level, active, delay = 0, className }: VerticalMeterProps) {
    const lit = Math.round((level / 100) * SEGMENTS)

    return (
        <div className={cn("flex min-w-2.5 flex-1 flex-col-reverse gap-0.5", className)} aria-hidden="true">
            {Array.from({ length: SEGMENTS }, (_, i) => {
                const isLit = active && i < lit

                return (
                    <span
                        key={i}
                        style={{ transitionDelay: isLit ? `${delay + i * 40}ms` : "0ms" }} // dynamisch: vertraging per segment
                        className={cn(
                            "flex-1 rounded-[1px] bg-white/10 transition-colors duration-150 motion-reduce:transition-none",
                            isLit && (i >= PEAK_FROM ? "bg-brand-600" : "bg-white")
                        )}
                    />
                )
            })}
        </div>
    )
}