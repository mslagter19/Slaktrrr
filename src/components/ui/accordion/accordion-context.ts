// src/components/ui/accordion/accordion-context.ts
import { createContext, useContext } from "react";

export type AccordionVariant = "default" | "bordered" | "separated";

interface AccordionContextValue {
    openItems: string[];
    toggle: (value: string) => void;
    variant: AccordionVariant;
}

interface AccordionItemContextValue {
    value: string;
    isOpen: boolean;
    triggerId: string;
    contentId: string;
}

// We exporteren nu de contexts zelf, in plaats van losse Provider-constanten
export const AccordionContext = createContext<AccordionContextValue | null>(null);
export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordion() {
    const ctx = useContext(AccordionContext);
    if (!ctx) throw new Error("Accordion-onderdelen moeten binnen <Accordion> staan.");
    return ctx;
}

export function useAccordionItem() {
    const ctx = useContext(AccordionItemContext);
    if (!ctx) throw new Error("AccordionTrigger/Content moeten binnen <AccordionItem> staan.");
    return ctx;
}