import { useEffect, useRef, useState, type ComponentProps } from "react"
import { gsap } from "../../lib/gsap"
import { useMotion } from "../gsap/Motion-context"
import { cn } from "../../lib/cn"
import { FlipIcon } from "./icons"

type PersonnelItem = {
    label: string // bv. "Client", "Rol", "Jaar"
    value: string // bv. "Bakkerij Van Dam", "Front-end", "2025"
}

type CaseSleeveProps = Omit<ComponentProps<"div">, "children"> & {
    src: string // screenshot van de case (voorkant)
    alt: string // verplicht: beschrijving van de screenshot
    title: string // titel van de case, komt op de achterkant
    personnel: PersonnelItem[] // liner notes, hou het bij 4 à 5 regels
    catalogNumber?: string // bv. "SLK-003", klein onderaan de achterkant
    duration?: number // seconden voor de flip
}

const FACE = "absolute inset-0 overflow-hidden rounded-sm [backface-visibility:hidden]"

export function CaseSleeve({
    src,
    alt,
    title,
    personnel,
    catalogNumber,
    duration = 0.8,
    className,
    ...rest
}: CaseSleeveProps) {
    const innerRef = useRef<HTMLDivElement>(null)
    const [flipped, setFlipped] = useState(false)
    const { enabled } = useMotion()

    useEffect(() => {
        const inner = innerRef.current
        if (!inner) return

        const reduce = !enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches

        const tween = gsap.to(inner, {
            rotationY: flipped ? 180 : 0,
            duration: reduce ? 0 : duration,
            ease: "power3.inOut",
            overwrite: true,
        })

        return () => {
            tween.kill()
        }
    }, [flipped, duration, enabled])

    return (
        <div
            className={cn("mx-auto w-full max-w-sm [perspective:1400px] md:ml-auto", className)}
            {...rest}
        >
            {/* De hoes staat een tikje scheef, zoals hij op een tafel ligt */}
            <div className="aspect-square w-full rotate-2 drop-shadow-2xl">
                <button
                    type="button"
                    onClick={() => setFlipped((f) => !f)}
                    aria-pressed={flipped}
                    aria-label={
                        flipped
                            ? "Draai de hoes om naar de voorkant"
                            : "Draai de hoes om naar de achterkant met projectgegevens"
                    }
                    className="group relative block size-full cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                    <div
                        ref={innerRef}
                        className="relative size-full [transform-style:preserve-3d]"
                    >
                        {/* ---------- Voorkant ---------- */}
                        <div className={cn(FACE, "bg-black")} aria-hidden={flipped}>
                            <img
                                src={src}
                                alt={alt}
                                className="size-full object-cover grayscale contrast-110 transition-[filter] duration-(--duration-standard) ease-(--ease-standard) group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none"
                            />

                            {/* Korrel + diagonale glans (zelfde lichtval als de Vinyl) */}
                            <div
                                aria-hidden="true"
                                className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/15 via-transparent via-30% to-black/40"
                            />

                            {/* Rand van de hoes */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-white/15"
                            />

                            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                                <FlipIcon />
                                Draai om
                            </span>
                        </div>

                        {/* ---------- Achterkant: liner notes ---------- */}
                        <div
                            className={cn(
                                FACE,
                                "flex flex-col bg-white p-6 text-left text-black [transform:rotateY(180deg)]"
                            )}
                            aria-hidden={!flipped}
                        >
                            <div
                                aria-hidden="true"
                                className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
                            />

                            <p className="relative text-sm font-medium text-brand-700">Personnel</p>
                            <p className="relative mt-1 font-heading text-2xl leading-tight font-semibold">
                                {title}
                            </p>
                            <span aria-hidden="true" className="relative mt-4 h-px w-full bg-black/80" />

                            <dl className="relative mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                                {personnel.map((item) => (
                                    <div key={item.label} className="contents">
                                        <dt className="text-black/60">{item.label}</dt>
                                        <dd className="font-medium">{item.value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <div className="relative mt-auto flex items-end justify-between pt-4 text-xs text-black/60">
                                <span>{catalogNumber}</span>
                                <span className="inline-flex items-center gap-1.5">
                                    <FlipIcon />
                                    Terug
                                </span>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

