// src/components/ui/form/Textarea.tsx
import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/cn"
import { fieldVariants, type FieldVariantProps } from "./fieldStyles"

// Geen vaste hoogte: een textarea groeit via `rows`
const textareaSizeVariants = cva("", {
    variants: {
        size: {
            xs: "px-2 py-1 text-xs",
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-sm",
            lg: "px-6 py-3 text-base",
            xl: "px-8 py-4 text-lg",
        },
    },
    defaultVariants: { size: "md" },
})

type TextareaProps = ComponentProps<"textarea"> &
    FieldVariantProps &
    VariantProps<typeof textareaSizeVariants>

export function Textarea({
    className,
    variant,
    size,
    radius,
    rows = 4,
    ...props
}: TextareaProps) {
    return (
        <textarea
            rows={rows}
            aria-invalid={variant === "error" || undefined}
            className={cn(
                fieldVariants({ variant, radius }),
                textareaSizeVariants({ size }),
                "resize-y",
                className
            )}
            {...props}
        />
    )
}