import type { ComponentProps } from "react"
import { Badge } from "./Badge"
import { cn } from "../../lib/cn"

type EyebrowProps = ComponentProps<"div"> & {
    // "start": lijntje links (boven een links uitgelijnde kop)
    // "center": lijntjes aan beide kanten (boven een gecentreerde kop)
    align?: "start" | "center"
}

/*
 * Klein label boven een kop, bv. "Side A · Selected works".
 * Altijd in de merkkleur, met een kort lijntje ervoor (en bij center ook erna).
 */
export function Eyebrow({ align = "start", className, children, ...rest }: EyebrowProps) {
    const line = <span aria-hidden="true" className="h-px w-8 bg-current" />

    return (
        <Badge
            variant="eyebrow"
            size="none"
            radius="none"
            className={cn(align === "center" ? "justify-center" : "justify-start", className)}
            {...rest}
        >
            {line}
            {children}
            {align === "center" && line}
        </Badge>
    )
}
