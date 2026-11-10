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
                    "flex flex-1 items-center justify-between gap-4 px-4 py-3 text-left font-medium",
                    "transition-colors hover:bg-slate-50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
                    className,
                )}
                {...props}
            >
                {children}
                <ChevronIcon
                    className={cn(
                        "size-5 shrink-0 text-slate-500 transition-transform duration-200",
                        isOpen && "rotate-180",
                    )}
                />
            </button>
        </h3>
    );
}

// Tijdelijk lokaal; verplaats dit later naar je Icon-wrapper uit laag 1
function ChevronIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M5 8l5 5 5-5" />
        </svg>
    );
}