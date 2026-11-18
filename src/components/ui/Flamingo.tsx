import { useEffect, useRef, type ComponentProps } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { cn } from "../../lib/cn"

/* ---------- Flamingo (neon-buis stijl, viewBox 0 0 200 320) ---------- */

type FlamingoProps = Omit<ComponentProps<"svg">, "children"> & {
    alt: string // verplicht. Gebruik "" als de flamingo puur decoratief is
    color?: string // kleur van de neonbuis
    flicker?: boolean // af en toe een neon-flikkering (staat stil bij reduced motion)
}

export function Flamingo({
    alt,
    color = "var(--color-flamingo, #FF5FA2)",
    flicker = true,
    className,
    ...rest
}: FlamingoProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const tubeRef = useRef<SVGGElement>(null)

    useEffect(() => {
        const tube = tubeRef.current
        if (!tube || !flicker) return

        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // Een korte, onregelmatige flikkering, daarna een lange pauze
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 })
            tl.to(tube, { opacity: 0.35, duration: 0.06 })
                .to(tube, { opacity: 1, duration: 0.05 })
                .to(tube, { opacity: 0.5, duration: 0.04 })
                .to(tube, { opacity: 1, duration: 0.08 })
                .to(tube, { opacity: 0.2, duration: 0.05 })
                .to(tube, { opacity: 1, duration: 0.2 })
        })

        return () => mm.revert()
    }, [flicker])

    const decorative = alt === ""

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 200 320"
            role={decorative ? undefined : "img"}
            aria-label={decorative ? undefined : alt}
            aria-hidden={decorative || undefined}
            className={cn("h-auto w-full", className)}
            {...rest}
        >
            <defs>
                {/* Gloed: een onscherpe kopie onder de scherpe lijn */}
                <filter id="flamingo-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g
                ref={tubeRef}
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#flamingo-glow)"
            >
                {/* Nek: één vloeiende S-lijn, zoals een neonbuis */}
                <path d="M88 190 C50 150 130 130 100 95 C85 78 105 62 118 52" />

                {/* Kop */}
                <circle cx="122" cy="46" r="11" />

                {/* Snavel */}
                <path d="M129 40 C143 40 151 48 148 61 C142 55 134 54 127 55" />

                {/* Lichaam met staartveren */}
                <path d="M60 195 C70 165 115 160 135 180 C150 195 170 215 186 205 C176 236 130 250 100 245 C70 240 52 220 60 195 Z" />

                {/* Vleugel */}
                <path d="M82 202 C100 217 125 217 146 200" />

                {/* Standbeen met voet */}
                <path d="M104 245 L106 272 L102 300 L121 304" />

                {/* Opgetrokken been */}
                <path d="M114 243 L132 268 L108 273" />
            </g>

            {/* Oog: stip buiten het gloed-filter zodat hij scherp blijft */}
            <circle cx="125" cy="43" r="2" fill={color} />
        </svg>
    )
}

/* ---------- FlamingoEasterEgg: de klikbare versie ---------- */

type FlamingoEasterEggProps = Omit<ComponentProps<typeof Link>, "to" | "children"> & {
    to?: string
    flamingoClassName?: string // formaat van de flamingo zelf, bv. "w-12"
}

export function FlamingoEasterEgg({
    to = "/experiment",
    className,
    flamingoClassName,
    ...rest
}: FlamingoEasterEggProps) {
    return (
        <Link
            to={to}
            aria-label="Ontdek het geheime experiment"
            className={cn(
                "group inline-block rounded-md transition-transform duration-(--duration-standard) ease-(--ease-standard) hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                className
            )}
            {...rest}
        >
            <Flamingo alt="" className={cn("w-12", flamingoClassName)} />
        </Link>
    )
}
