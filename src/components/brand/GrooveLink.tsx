import { useRef, type ComponentProps } from "react"
import { cn } from "@/lib/cn"
import { useNeedleWipe } from "@/hooks/useNeedleWipe"
import { useMotion } from "@/hooks/useMotion"

/*
 * Inline link met een "groef-lijn": bij hover of focus tekent een dunne messing lijn
 * zich van links naar rechts onder de tekst, als een naald door de groef, en loopt bij
 * verlaten rechts weer weg (zelfde animatie als de naald-wipe op Button, via useNeedleWipe).
 * - Met href: een <a>. Bij target="_blank" komt rel="noopener noreferrer" er automatisch op.
 * - Zonder href: een <button type="button">, bv. om een modal te openen.
 * - Staat beweging uit, dan valt hij terug op een gewone onderstreping.
 */

type GrooveLinkProps =
    | (ComponentProps<"a"> & { href: string })
    | (ComponentProps<"button"> & { href?: undefined })

const base =
    "group relative inline-flex cursor-pointer overflow-hidden pb-0.5 text-white/60 underline-offset-4 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transition-none [&:not([data-wipe])]:hover:underline"

function Groove() {
    return (
        <span
            aria-hidden="true"
            data-wipe-fill
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px bg-brand-600 group-data-wipe:block"
        />
    )
}

export function GrooveLink(props: GrooveLinkProps) {
    const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
    const { enabled } = useMotion()
    useNeedleWipe(ref, { enabled })

    if (props.href !== undefined) {
        const { className, children, target, rel, ...rest } = props
        const safeRel = target === "_blank" ? "noopener noreferrer" : rel

        return (
            <a {...rest} ref={ref} target={target} rel={safeRel} className={cn(base, className)}>
                {children}
                <Groove />
            </a>
        )
    }

    const { className, children, type = "button", ...rest } = props

    return (
        <button {...rest} ref={ref} type={type} className={cn(base, className)}>
            {children}
            <Groove />
        </button>
    )
}
