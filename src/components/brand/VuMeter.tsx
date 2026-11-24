import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { useMotion } from "@/hooks/useMotion"
import { cn } from "@/lib/cn"

type VuMeterProps = {
    level: number // 0–1: waar de naald eindigt (vanaf ~0.8 zit je in de rode zone)
    label?: string // tekst op de meterplaat
    className?: string
}

/* ---------- Geometrie (viewBox 0 0 200 120) ---------- */
const CX = 100
const CY = 108 // as van de naald
const RADIUS = 78
const SWEEP = 48 // graden links en rechts van verticaal
const RED_FROM = 0.75 // vanaf hier begint de rode zone (0–1)

// Hoek (in graden, 0 = recht omhoog) bij een niveau van 0–1
const angleAt = (t: number) => -SWEEP + t * SWEEP * 2

// Punt op de boog bij een hoek
function point(angle: number, r = RADIUS) {
    const rad = (angle * Math.PI) / 180
    return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) }
}

function arc(from: number, to: number, r = RADIUS) {
    const a = point(angleAt(from), r)
    const b = point(angleAt(to), r)
    return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`
}

// Schaalverdeling zoals op een echte VU-meter
const TICKS = [
    { t: 0, text: "-20" },
    { t: 0.2, text: "-10" },
    { t: 0.4, text: "-5" },
    { t: 0.55, text: "-3" },
    { t: 0.68, text: "0" },
    { t: 0.84, text: "+1" },
    { t: 1, text: "+3" },
]
const MINOR = Array.from({ length: 21 }, (_, i) => i / 20)

/**
 * Analoge VU-meter: de naald slaat uit zodra de meter in beeld komt en blijft daarna licht trillen,
 * alsof er muziek speelt. Puur decoratief (aria-hidden): zet het echte cijfer ernaast.
 * Staat beweging uit (useMotion of prefers-reduced-motion), dan staat de naald direct op zijn plek.
 */
export function VuMeter({ level, label = "VU", className }: VuMeterProps) {
    const ref = useRef<SVGSVGElement>(null)
    const { enabled } = useMotion()
    const target = angleAt(Math.min(1, Math.max(0, level)))

    useGSAP(
        () => {
            const svg = ref.current
            const needle = svg?.querySelector("[data-needle]")
            if (!svg || !needle) return

            const origin = `${CX} ${CY}`
            const mm = gsap.matchMedia()

            mm.add(
                { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
                (ctx) => {
                    if (!enabled || ctx.conditions?.reduce) {
                        gsap.set(needle, { rotation: target, svgOrigin: origin })
                        return
                    }

                    gsap.set(needle, { rotation: -SWEEP, svgOrigin: origin })
                    gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 80%", once: true } })
                        // Uitslaan, met een kleine overshoot
                        .to(needle, { rotation: target, duration: 1.6, ease: "elastic.out(1, 0.5)" })
                        // Daarna licht trillen op de maat
                        .to(needle, {
                            rotation: target - 1.5,
                            duration: 0.45,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: -1,
                        })
                }
            )

            return () => mm.revert()
        },
        { dependencies: [enabled, target] }
    )

    return (
        <svg ref={ref} viewBox="0 0 200 120" aria-hidden="true" className={cn("w-full", className)}>
            {/* Meterplaat */}
            <rect x="2" y="2" width="196" height="116" rx="10" className="fill-white stroke-brand-600" strokeWidth="3" />

            {/* Boog: normaal in zwart, de rode zone in bordeaux */}
            <path d={arc(0, RED_FROM)} fill="none" className="stroke-black" strokeWidth="1.5" />
            <path d={arc(RED_FROM, 1)} fill="none" className="stroke-secondary-600" strokeWidth="5" />

            {/* Kleine streepjes */}
            {MINOR.map((t) => {
                const a = point(angleAt(t), RADIUS)
                const b = point(angleAt(t), RADIUS - 5)
                return (
                    <line
                        key={t}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        className={t >= RED_FROM ? "stroke-secondary-600" : "stroke-black"}
                        strokeWidth="1"
                    />
                )
            })}

            {/* Grote streepjes + cijfers */}
            {TICKS.map(({ t, text }) => {
                const a = point(angleAt(t), RADIUS)
                const b = point(angleAt(t), RADIUS - 10)
                const p = point(angleAt(t), RADIUS + 10)
                const red = t >= RED_FROM
                return (
                    <g key={text}>
                        <line
                            x1={a.x}
                            y1={a.y}
                            x2={b.x}
                            y2={b.y}
                            className={red ? "stroke-secondary-600" : "stroke-black"}
                            strokeWidth="2"
                        />
                        <text
                            x={p.x}
                            y={p.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className={cn("font-heading text-[9px]", red ? "fill-secondary-600" : "fill-black")}
                        >
                            {text}
                        </text>
                    </g>
                )
            })}

            {/* Label op de plaat */}
            <text x={CX} y={CY - 30} textAnchor="middle" className="fill-black font-heading text-[14px] tracking-[0.2em]">
                {label}
            </text>

            {/* Naald + messing asdop */}
            <line data-needle x1={CX} y1={CY} x2={CX} y2={CY - RADIUS + 4} className="stroke-black" strokeWidth="2" strokeLinecap="round" />
            <circle cx={CX} cy={CY} r="7" className="fill-brand-600 stroke-black" strokeWidth="1.5" />
        </svg>
    )
}
