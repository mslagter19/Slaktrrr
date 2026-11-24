// src/components/ui/form/fieldStyles.ts
import { cva, type VariantProps } from "class-variance-authority"

export const fieldVariants = cva(
    // Base styles: alleen wat voor elk tekstveld geldt
    "block w-full border bg-surface text-ink-strong transition-colors placeholder:text-ink-subtle focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-surface-raised disabled:opacity-50 motion-reduce:transition-none",

    {
        variants: {
            variant: {
                default: "border-line hover:border-line-strong focus-visible:outline-brand-600",
                error: "border-danger-500 focus-visible:outline-danger-500",
                success: "border-success-500 focus-visible:outline-success-500",
            },

            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-lg",
                lg: "rounded-xl",
                full: "rounded-full",
            },
        },

        defaultVariants: {
            variant: "default",
            radius: "md",
        },
    }
)

export type FieldVariantProps = VariantProps<typeof fieldVariants>