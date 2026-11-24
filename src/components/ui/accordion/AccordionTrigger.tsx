// src/components/ui/accordion/AccordionTrigger.tsx
import { cn } from "../../../lib/cn";
import { useAccordion, useAccordionItem } from "./accordion-context";

export function AccordionTrigger({
    className,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { toggle } = useAccordion();
    const { value, isOpen, triggerId, contentId } = useAccordionItem();

    return (
        // h3 voor de documentstructuur; de button zit erin voor de interactie
        <h3 className="flex">
            <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggle(value)}
                className={cn(
                    "flex flex-1 cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left font-medium",
                    "transition-colors hover:bg-surface-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
                    className,
                )}
                {...props}
            >
                {children}
                <RecordIcon
                    open={isOpen}
                    className={cn(
                        "size-6 shrink-0 text-brand-600 transition-transform duration-500 ease-out motion-reduce:transition-none",
                        isOpen && "rotate-180",
                    )}
                />
            </button>
        </h3>
    );
}

// Mini-plaat: draait een halve slag bij openen (de glans laat de draai zien), het label kleurt dan vol
function RecordIcon({ open, className }: { open: boolean; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" className={className} aria-hidden="true">
            {/* Rand en een groef */}
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6.5" strokeOpacity="0.4" />
            {/* Glans op de groeven */}
            <path d="M5.5 8.5a7.5 7.5 0 0 1 3-3" />
            {/* Label: leeg als dicht, gevuld als open */}
            <circle
                cx="12"
                cy="12"
                r="3"
                fill="currentColor"
                className="transition-[fill-opacity] duration-300 motion-reduce:transition-none"
                fillOpacity={open ? 1 : 0}
            />
        </svg>
    );
}