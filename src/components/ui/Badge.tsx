import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const badgeVariants = cva(
    // Base styles
    "group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",

    {
        variants: {
            variant: {
                primary: "bg-brand-600 text-on-brand hover:bg-brand-700 data-[pressed=true]:bg-brand-800",
                secondary: "bg-surface-raised text-ink-strong hover:bg-surface-hover data-[pressed=true]:bg-line",
                outline: "border border-ink/30 bg-transparent text-ink-strong hover:bg-ink/10 data-[pressed=true]:bg-ink/15",
                link: "text-brand-600 underline-offset-4 hover:underline",
                transparent: "bg-transparent text-ink-strong",
                // NIEUW: platte "eyebrow"-tekst met ruimte voor een streepje ervoor
                eyebrow: "gap-3 bg-transparent text-xs font-medium uppercase tracking-[0.22em] text-brand-600",
            },

            size: {
                // NIEUW: geen vaste hoogte/padding, voor eyebrow-gebruik
                none: "",
                xs: "h-6 px-2 text-xs",
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4 text-sm",
                lg: "h-12 px-6 text-base",
                xl: "h-14 px-8 text-lg",
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
            variant: "primary",
            size: "md",
            radius: "md",
        },
    }
)

export function Badge({
    className,
    variant,
    size,
    radius,
    children,
    ...rest // NIEUW: aria-*, id, data-* etc. komen nu ook op de div
}: ComponentProps<"div"> & VariantProps<typeof badgeVariants>) {
    return (
        <div className={cn(badgeVariants({ variant, size, radius }), className)} {...rest}>
            {children}
        </div>
    )
}
