import type { ComponentProps } from "react"
import { cn } from "../../../lib/cn"

/*
 * Gedeelde iconenset: lijn-iconen op een 16×16-raster, kleur via currentColor.
 * Standaard size-4 en decoratief (aria-hidden). Geef een andere maat mee via className.
 * Iconen met eigen animatie of betekenis voor één component (MenuIcon, RecordIcon) blijven lokaal.
 */
type IconProps = Omit<ComponentProps<"svg">, "children">

function Icon({ className, children, ...rest }: ComponentProps<"svg">) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn("size-4 shrink-0", className)}
            {...rest}
        >
            {children}
        </svg>
    )
}

export function DownloadIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
        </Icon>
    )
}

export function MailIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
            <path d="M2.5 4.5 8 9l5.5-4.5" />
        </Icon>
    )
}

// Gevuld driehoekje, zoals de play-knop van een draaitafel
export function PlayIcon({ className, ...props }: IconProps) {
    return (
        <Icon className={cn("size-3.5", className)} stroke="none" {...props}>
            <path d="M4 2l10 6-10 6z" fill="currentColor" />
        </Icon>
    )
}

export function ChevronIcon({ direction = "right", ...props }: IconProps & { direction?: "left" | "right" }) {
    return (
        <Icon strokeWidth={1.75} {...props}>
            <path d={direction === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
        </Icon>
    )
}

export function ShareIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M8 10V2M5 4.5 8 1.5l3 3M3.5 7.5v6h9v-6" />
        </Icon>
    )
}

// Twee pijlen in een cirkel: "draai om"
export function FlipIcon({ className, ...props }: IconProps) {
    return (
        <Icon className={cn("size-3.5", className)} {...props}>
            <path d="M2.5 8a5.5 5.5 0 0 1 9.4-3.9L13.5 5.5M13.5 2.5v3h-3M13.5 8a5.5 5.5 0 0 1-9.4 3.9L2.5 10.5M2.5 13.5v-3h3" />
        </Icon>
    )
}
