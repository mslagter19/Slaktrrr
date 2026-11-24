import { useEffect, useId, useRef, type ComponentProps } from "react"
import { gsap } from "../../lib/gsap"
import { useMotion } from "../gsap/Motion-context"
import { cn } from "../../lib/cn"

/* ---------- Geometrie (viewBox 0 0 400 400) ---------- */
const CENTER = 200
const DISC_RADIUS = 196
const LABEL_RADIUS = 62
const HOLE_RADIUS = 5

// Groeven: 8 ruime, rustige ringen tussen label en rand (de look uit de schets)
const GROOVES = Array.from({ length: 8 }, (_, i) => 185 - i * 13)

type VinylProps = Omit<ComponentProps<"svg">, "children"> & {
    alt: string // verplicht. Gebruik "" als de plaat puur decoratief is
    labelSrc?: string // afbeelding voor het label (cases)
    labelColor?: string // achtergrond van het label als er geen afbeelding is
    labelText?: string // NIEUW: titel op het label (alleen zonder labelSrc), bv. "SLAKTRRR"
    labelSubText?: string // NIEUW: kleine regel eronder, bv. "33 RPM · SIDE A"
    duration?: number // seconden per omwenteling (33 toeren = ±1.8s)
    trigger?: "always" | "hover" | "none" // altijd draaien (hero), alleen bij hover/focus op de omliggende .group (cases), of nooit zelf (spel)
}

export function Vinyl({
    alt,
    labelSrc,
    labelColor = "var(--color-brand-600, #b8893b)",
    labelText,
    labelSubText,
    duration = 1.8,
    trigger = "always",
    className,
    ...rest
}: VinylProps) {
    // useId bevat dubbele punten; die kunnen in url(#...) problemen geven
    const uid = useId().replace(/:/g, "")
    const { enabled } = useMotion()
    const svgRef = useRef<SVGSVGElement>(null)
    const spinRef = useRef<SVGGElement>(null) // alles wat meedraait (plaat + label)

    useEffect(() => {
        const svg = svgRef.current
        const spin = spinRef.current
        // "none": de plaat draait niet zelf; een ouder (bv. het balansspel) draait hem
        if (!svg || !spin || trigger === "none" || !enabled) return

        // Bij "prefers-reduced-motion: reduce" of motion uit blijft de plaat stilstaan
        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tween = gsap.to(spin, {
                rotation: 360,
                duration,
                ease: "none",
                repeat: -1,
                svgOrigin: `${CENTER} ${CENTER}`,
            })

            if (trigger === "always") return

            // Hover-modus: de plaat start en stopt met vertraging, zoals een draaitafel
            tween.timeScale(0)
            const host = svg.closest(".group") ?? svg

            const spinUp = () =>
                gsap.to(tween, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true })
            const spinDown = () =>
                gsap.to(tween, { timeScale: 0, duration: 1.8, ease: "power3.out", overwrite: true })

            host.addEventListener("pointerenter", spinUp)
            host.addEventListener("pointerleave", spinDown)
            host.addEventListener("focusin", spinUp)
            host.addEventListener("focusout", spinDown)

            return () => {
                host.removeEventListener("pointerenter", spinUp)
                host.removeEventListener("pointerleave", spinDown)
                host.removeEventListener("focusin", spinUp)
                host.removeEventListener("focusout", spinDown)
            }
        })

        return () => mm.revert()
    }, [duration, trigger, enabled])

    const decorative = alt === ""

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            role={decorative ? undefined : "img"}
            aria-label={decorative ? undefined : alt}
            aria-hidden={decorative || undefined}
            className={cn("aspect-square w-full drop-shadow-2xl", className)}
            {...rest}
        >
            <defs>
                <radialGradient id={`${uid}-body`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1c1c20" />
                    <stop offset="100%" stopColor="#050506" />
                </radialGradient>

                {/* Glans: zachte diagonale lichtval, licht beweegt niet mee met de plaat */}
                <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
                    <stop offset="25%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="75%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
                </linearGradient>

                <clipPath id={`${uid}-disc`}>
                    <circle cx={CENTER} cy={CENTER} r={DISC_RADIUS} />
                </clipPath>
                <clipPath id={`${uid}-label`}>
                    <circle cx={CENTER} cy={CENTER} r={LABEL_RADIUS} />
                </clipPath>
            </defs>

            {/* Draaiend deel: plaat, groeven en label */}
            <g ref={spinRef}>
                <circle cx={CENTER} cy={CENTER} r={DISC_RADIUS} fill={`url(#${uid}-body)`} stroke="#2a2a2f" />

                <g fill="none" strokeWidth="1">
                    {GROOVES.map((r) => (
                        <circle
                            key={r}
                            cx={CENTER}
                            cy={CENTER}
                            r={r}
                            stroke="#ede6d6"
                            strokeOpacity={0.09}
                        />
                    ))}
                </g>

                {/* Label */}
                <circle cx={CENTER} cy={CENTER} r={LABEL_RADIUS} fill={labelColor} />
                {labelSrc ? (
                    <image
                        href={labelSrc}
                        x={CENTER - LABEL_RADIUS}
                        y={CENTER - LABEL_RADIUS}
                        width={LABEL_RADIUS * 2}
                        height={LABEL_RADIUS * 2}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#${uid}-label)`}
                    />
                ) : (
                    <>
                        {/* Binnenring van het label */}
                        <circle
                            cx={CENTER}
                            cy={CENTER}
                            r={LABEL_RADIUS - 10}
                            fill="none"
                            stroke="var(--color-black, #0B0B0D)"
                            strokeOpacity="0.35"
                        />
                        {labelText && (
                            <text
                                x={CENTER}
                                y={CENTER - 4}
                                textAnchor="middle"
                                fontSize="15"
                                fontWeight="600"
                                fill="var(--color-black, #0B0B0D)"
                                className="font-heading"
                            >
                                {labelText}
                            </text>
                        )}
                        {labelSubText && (
                            <text
                                x={CENTER}
                                y={CENTER + 14}
                                textAnchor="middle"
                                fontSize="8"
                                letterSpacing="2"
                                fill="var(--color-black, #0B0B0D)"
                            >
                                {labelSubText}
                            </text>
                        )}
                    </>
                )}
                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={LABEL_RADIUS}
                    fill="none"
                    stroke="#000000"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                />
            </g>

            {/* Stilstaande glans */}
            <circle cx={CENTER} cy={CENTER} r={DISC_RADIUS} fill={`url(#${uid}-sheen)`} pointerEvents="none" />

            {/* Gat voor de spindel */}
            <circle cx={CENTER} cy={CENTER} r={HOLE_RADIUS} fill="var(--color-black, #0B0B0D)" />
        </svg>
    )
}
