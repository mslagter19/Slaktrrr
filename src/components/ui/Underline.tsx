import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { Container } from "./Container";

// Wrapper: alleen achtergrond en verticale ruimte (volle breedte)
const underlineWrapper = cva("w-full", {
    variants: {
        background: {
            transparent: "bg-transparent",
            black: "bg-black",
            white: "bg-white",
            brand: "bg-brand-600",
        },
        spacing: {
            none: "py-0",
            sm: "py-4",
            md: "py-8",
            lg: "py-12",
        },
    },
    defaultVariants: { background: "transparent", spacing: "md" },
});

// Uitlijning van de streep binnen de container
const underlineAlign = cva("flex", {
    variants: {
        align: {
            left: "justify-start",
            center: "justify-center",
            right: "justify-end",
        },
    },
    defaultVariants: { align: "left" },
});

const underlineLine = cva("block", {
    variants: {
        color: {
            brand: "bg-brand-600",
            white: "bg-white",
            black: "bg-black",
            muted: "bg-white/20",
        },
        thickness: { thin: "h-px", base: "h-0.5", thick: "h-1" },
        width: { sm: "w-16", md: "w-32", lg: "w-64", full: "w-full" },
        radius: { none: "rounded-none", full: "rounded-full" },
    },
    defaultVariants: { color: "brand", thickness: "base", width: "md", radius: "none" },
});

export interface UnderlineProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof underlineWrapper>,
    VariantProps<typeof underlineAlign>,
    VariantProps<typeof underlineLine> {
    /** Breedte en padding van de container; standaard max-w-6xl px-6 */
    containerClassName?: string;
    lineClassName?: string;
}

export function Underline({
    background,
    spacing,
    align,
    color,
    thickness,
    width,
    radius,
    className,
    containerClassName,
    lineClassName,
    ...props
}: UnderlineProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(underlineWrapper({ background, spacing }), className)}
            {...props}
        >
            <Container className={cn(underlineAlign({ align }), containerClassName)}>
                <span
                    className={cn(underlineLine({ color, thickness, width, radius }), lineClassName)}
                />
            </Container>
        </div>
    );
}