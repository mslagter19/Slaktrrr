import { useId, useRef, type ComponentProps } from "react"
import { Link } from "react-router-dom"
import { gsap, useGSAP } from "../../lib/gsap"
import { useMotion } from "../gsap/Motion-context"
import { cn } from "../../lib/cn"

/* ---------- Flamingo (neon-buis stijl) ---------- */
// stand: staand op één been, viewBox 0 0 200 320
// fly:   in vlucht naar rechts, nek recht vooruit en poten naar achteren, viewBox 0 0 320 160

type FlamingoPose = "stand" | "fly"

type FlamingoProps = Omit<ComponentProps<"svg">, "children"> & {
    alt: string // verplicht. Gebruik "" als de flamingo puur decoratief is
    pose?: FlamingoPose
    color?: string // kleur van de neonbuis
    flicker?: boolean // af en toe een neon-flikkering (staat stil als motion uit staat)
}

const VIEWBOX: Record<FlamingoPose, string> = {
    stand: "0 0 200 320",
    fly: "0 0 320 160",
}

export function Flamingo({
    alt,
    pose = "stand",
    color = "var(--color-flamingo, #FF5FA2)",
    flicker = true,
    className,
    ...rest
}: FlamingoProps) {
    // useId bevat dubbele punten; die kunnen in url(#...) problemen geven
    const glowId = `flamingo-glow-${useId().replace(/:/g, "")}`
    const svgRef = useRef<SVGSVGElement>(null)
    const tubeRef = useRef<SVGGElement>(null)
    const { enabled } = useMotion()

    useGSAP(
        () => {
            const tube = tubeRef.current
            if (!tube || !enabled) return

            const mm = gsap.matchMedia()

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                if (flicker) {
                    // Een korte, onregelmatige flikkering, daarna een lange pauze
                    gsap.timeline({ repeat: -1, repeatDelay: 5 })
                        .to(tube, { opacity: 0.35, duration: 0.06 })
                        .to(tube, { opacity: 1, duration: 0.05 })
                        .to(tube, { opacity: 0.5, duration: 0.04 })
                        .to(tube, { opacity: 1, duration: 0.08 })
                        .to(tube, { opacity: 0.2, duration: 0.05 })
                        .to(tube, { opacity: 1, duration: 0.2 })
                }

                // Vleugelslag: klappen vanuit de schouder (onderkant van de vleugel)
                const wings = tube.querySelectorAll("[data-wing]")
                if (wings.length) {
                    gsap.to(wings, {
                        scaleY: -0.55,
                        transformOrigin: "50% 100%",
                        duration: 0.2,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        stagger: 0.05,
                    })
                }
            })

            return () => mm.revert()
        },
        { scope: svgRef, dependencies: [enabled, flicker, pose] }
    )

    const decorative = alt === ""

    return (
        <svg
            ref={svgRef}
            viewBox={VIEWBOX[pose]}
            role={decorative ? undefined : "img"}
            aria-label={decorative ? undefined : alt}
            aria-hidden={decorative || undefined}
            className={cn("h-auto w-full overflow-visible", className)}
            {...rest}
        >
            <defs>
                {/* Gloed: een onscherpe kopie onder de scherpe lijn */}
                <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
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
                filter={`url(#${glowId})`}
            >
                {pose === "stand" ? <StandingTube /> : <FlyingTube />}
            </g>

            {/* Oog: stip buiten het gloed-filter zodat hij scherp blijft */}
            {pose === "stand" ? (
                <circle cx="125" cy="43" r="2" fill={color} />
            ) : (
                <circle cx="281" cy="61" r="2" fill={color} />
            )}
        </svg>
    )
}

function StandingTube() {
    return (
        <>
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
        </>
    )
}

function FlyingTube() {
    return (
        <>
            {/* Verre vleugel: kleiner, iets naar achteren */}
            <path data-wing d="M138 78 C134 54 150 34 170 24 C166 46 162 62 158 76" />

            {/* Lichaam */}
            <path d="M108 84 C124 66 182 64 206 78 C192 96 134 100 108 84 Z" />

            {/* Nek: lang en recht vooruit */}
            <path d="M204 76 C230 70 250 67 268 65" />

            {/* Kop */}
            <circle cx="278" cy="63" r="9" />

            {/* Snavel: geknikt naar beneden */}
            <path d="M286 59 C298 59 305 66 303 76 C298 71 292 70 285 70" />

            {/* Poten: gestrekt naar achteren, met voetjes */}
            <path d="M116 88 L44 94 L32 100" />
            <path d="M118 82 L48 84 L36 78" />

            {/* Nabije vleugel */}
            <path data-wing d="M150 76 C150 44 172 22 200 12 C192 40 186 60 180 74" />
        </>
    )
}

/* ---------- FlamingoEasterEgg: de klikbare versie ---------- */

type FlamingoEasterEggProps = Omit<ComponentProps<typeof Link>, "to" | "children"> & {
    to?: string
    pose?: FlamingoPose
    flamingoClassName?: string // formaat van de flamingo zelf, bv. "w-12"
}

export function FlamingoEasterEgg({
    to = "/experiment",
    pose = "stand",
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
            <Flamingo alt="" pose={pose} className={cn("w-12", flamingoClassName)} />
        </Link>
    )
}
