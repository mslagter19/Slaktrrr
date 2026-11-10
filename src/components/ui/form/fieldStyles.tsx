// src/components/ui/form/fieldStyles.ts
import { cva, type VariantProps } from "class-variance-authority"

export const fieldVariants = cva(
    // Base styles: alleen wat voor elk tekstveld geldt
    "block w-full border bg-white text-slate-900 transition-colors placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 motion-reduce:transition-none",

    {
        variants: {
            variant: {
                default: "border-slate-300 hover:border-slate-400 focus-visible:outline-brand-600",
                error: "border-red-500 focus-visible:outline-red-500",
                success: "border-green-500 focus-visible:outline-green-500",
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