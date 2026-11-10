// src/components/ui/form/Input.tsx
import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/cn"
import { fieldVariants, type FieldVariantProps } from "./fieldStyles"

// Hoogte en padding: alleen voor <input>
const inputSizeVariants = cva("", {
    variants: {
        size: {
            xs: "h-6 px-2 text-xs",
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            xl: "h-14 px-8 text-lg",
        },
    },
    defaultVariants: { size: "md" },
})

type InputProps = Omit<ComponentProps<"input">, "size"> &
    FieldVariantProps &
    VariantProps<typeof inputSizeVariants>

export function Input({
    className,
    variant,
    size,
    radius,
    type = "text",
    ...props
}: InputProps) {
    return (
        <input
            type={type}
            aria-invalid={variant === "error" || undefined}
            className={cn(
                fieldVariants({ variant, radius }),
                inputSizeVariants({ size }),
                className
            )}
            {...props}
        />
    )
}