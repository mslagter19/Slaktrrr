import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

type TooltipProps = {
    id?: string // koppel met aria-describedby op het element dat de tooltip toelicht
    content: ReactNode
    open: boolean // gecontroleerd: de ouder bepaalt wanneer hij zichtbaar is
    align?: "center" | "end" // "end" voorkomt dat de tooltip buiten beeld valt aan de rechterrand
    className?: string
    children: ReactNode // het element waar de tooltip boven komt te staan
}

export function Tooltip({ id, content, open, align = "center", className, children }: TooltipProps) {
    return (
        <span className="relative inline-flex">
            {children}

            <span
                id={id}
                role="tooltip"
                aria-hidden={!open}
                className={cn(
                    "pointer-events-none absolute bottom-full z-10 mb-3 w-max max-w-56 rounded-lg bg-white px-3 py-2 text-xs leading-snug text-black transition-opacity duration-(--duration-standard) motion-reduce:transition-none",
                    align === "center" ? "left-1/2 -translate-x-1/2" : "right-0",
                    open ? "opacity-100" : "opacity-0",
                    className
                )}
            >
                {content}

                {/* pijltje naar het element eronder */}
                <span
                    aria-hidden="true"
                    className={cn(
                        "absolute top-full size-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-white",
                        align === "center" ? "left-1/2 -translate-x-1/2" : "right-3"
                    )}
                />
            </span>
        </span>
    )
}
