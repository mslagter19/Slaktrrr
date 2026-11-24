import { useRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "@/hooks/useMotion";
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

// Track: bepaalt de breedte; hierin lopen de lijn en de naald
const underlineTrack = cva("relative block", {
    variants: {
        width: { sm: "w-16", md: "w-32", lg: "w-64", full: "w-full" },
    },
    defaultVariants: { width: "md" },
});

const underlineLine = cva("block w-full", {
    variants: {
        color: {
            brand: "bg-brand-600",
            white: "bg-white",
            black: "bg-black",
            muted: "bg-white/20",
        },
        thickness: { thin: "h-px", base: "h-0.5", thick: "h-1" },
        radius: { none: "rounded-none", full: "rounded-full" },
    },
    defaultVariants: { color: "brand", thickness: "base", radius: "none" },
});

const origins = { left: "left center", center: "center center", right: "right center" } as const;

export interface UnderlineProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof underlineWrapper>,
    VariantProps<typeof underlineAlign>,
    VariantProps<typeof underlineTrack>,
    VariantProps<typeof underlineLine> {
    /** Breedte en padding van de container; standaard max-w-6xl px-6 */
    containerClassName?: string;
    lineClassName?: string;
    /** Binnenkomst: de streep tekent uit met een meelopende naald. Standaard aan. */
    animate?: boolean;
}

/**
 * Scheidingslijn. Komt binnen als een naald die de groef inzet:
 * de streep tekent zich uit en een brass gloed loopt mee op de kop, die aan het eind uitdooft.
 * Bij align="center" groeit de streep vanuit het midden, zonder naald.
 * Speelt één keer af en respecteert de motion-voorkeur.
 */
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
    animate = true,
    ...props
}: UnderlineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { enabled } = useMotion();
    const active = enabled && animate;
    const side = align ?? "left";
    const withNeedle = active && side !== "center";

    useGSAP(
        () => {
            const el = ref.current;
            if (!el || !active) return;

            const line = el.querySelector("[data-line]");
            const needle = el.querySelector("[data-needle]");

            const tl = gsap.timeline({
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });

            tl.from(line, {
                scaleX: 0,
                transformOrigin: origins[side],
                duration: 1.1,
                ease: "power2.inOut",
            });

            if (needle) {
                const [from, to] = side === "right" ? ["100%", "0%"] : ["0%", "100%"];
                tl.fromTo(needle, { left: from }, { left: to, duration: 1.1, ease: "power2.inOut" }, 0)
                    .fromTo(needle, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0)
                    .to(needle, { autoAlpha: 0, duration: 0.4 });
            }
        },
        { scope: ref, dependencies: [active, side] }
    );

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn(underlineWrapper({ background, spacing }), className)}
            {...props}
        >
            <Container className={cn(underlineAlign({ align }), containerClassName)}>
                <span className={underlineTrack({ width })}>
                    <span
                        data-line
                        className={cn(underlineLine({ color, thickness, radius }), lineClassName)}
                    />
                    {withNeedle && (
                        <span
                            data-needle
                            className="invisible absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300 shadow-[0_0_12px_2px_var(--color-brand-500)]"
                        />
                    )}
                </span>
            </Container>
        </div>
    );
}
