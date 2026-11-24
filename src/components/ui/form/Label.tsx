// src/components/ui/form/Label.tsx
import type { ComponentProps } from "react"
import { cn } from "../../../lib/cn"

type LabelProps = ComponentProps<"label"> & {
    required?: boolean
}

export function Label({ className, required, children, ...props }: LabelProps) {
    return (
        <label
            className={cn("block text-sm font-medium text-ink-muted", className)}
            {...props}
        >
            {children}
            {required && (
                <span className="ml-0.5 text-danger-500" aria-hidden="true">
                    *
                </span>
            )}
        </label>
    )
}