import { useId, useMemo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/cn";
import { AccordionItemContext, useAccordion } from "./accordion-context";

const itemVariants = cva("", {
    variants: {
        variant: {
            default: "",
            bordered: "",
            // Bij "separated" krijgt elk item zelf een rand en afronding
            separated: "overflow-hidden rounded-lg border border-slate-200",
        },
    },
});

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Unieke waarde binnen deze accordion */
    value: string;
}

export function AccordionItem({ value, className, ...props }: AccordionItemProps) {
    const { openItems, variant } = useAccordion();
    const id = useId();
    const isOpen = openItems.includes(value);

    const itemContext = useMemo(
        () => ({ value, isOpen, triggerId: `${id}-trigger`, contentId: `${id}-content` }),
        [value, isOpen, id],
    );

    return (
        <AccordionItemContext.Provider value={itemContext}>
            {/* data-state laat Tailwind stylen op basis van open/dicht */}
            <div
                data-state={isOpen ? "open" : "closed"}
                className={cn(itemVariants({ variant }), className)}
                {...props}
            />
        </AccordionItemContext.Provider>
    );
}