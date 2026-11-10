import { useCallback, useMemo, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn"; // pas aan naar het pad van jouw cn()-helper
import { AccordionContext } from "./accordion-context";

const accordionVariants = cva("w-full", {
    variants: {
        variant: {
            default: "divide-y divide-slate-200 border-y border-slate-200",
            bordered: "divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200",
            separated: "flex flex-col gap-3",
        },
    },
    defaultVariants: { variant: "default" },
});

interface AccordionProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue">,
    VariantProps<typeof accordionVariants> {
    /** single = één open tegelijk, multiple = meerdere tegelijk */
    type?: "single" | "multiple";
    /** Welke items bij het laden open staan */
    defaultValue?: string[];
    /** Handig voor de parent om mee te luisteren */
    onValueChange?: (value: string[]) => void;
}

export function Accordion({
    type = "single",
    defaultValue = [],
    onValueChange,
    variant,
    className,
    ...props
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(defaultValue);

    const toggle = useCallback(
        (value: string) => {
            setOpenItems((current) => {
                const isOpen = current.includes(value);
                let next: string[];

                if (isOpen) {
                    next = current.filter((v) => v !== value);
                } else {
                    next = type === "single" ? [value] : [...current, value];
                }

                onValueChange?.(next);
                return next;
            });
        },
        [type, onValueChange],
    );

    // useMemo voorkomt dat alle onderdelen onnodig opnieuw renderen
    // doordat het context-object elke render een nieuwe referentie krijgt.
    const contextValue = useMemo(
        () => ({ openItems, toggle, variant: variant ?? "default" }),
        [openItems, toggle, variant],
    );

    return (
        <AccordionContext.Provider value={contextValue}>
            <div className={cn(accordionVariants({ variant }), className)} {...props} />
        </AccordionContext.Provider>
    );
}