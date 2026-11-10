import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// clsx maakt van voorwaarden een string: cn("p-2", isActive && "bg-brand-50").
// twMerge lost conflicten op: cn("p-2", "p-4") geeft p-4. Zonder dit wint de klasse die lager in het CSS-bestand staat, niet de laatste in je code. Dat geeft verwarrende bugs.
// type ClassValue is een type-only import. Het Vite-template gebruikt verbatimModuleSyntax, daarom schrijf je type expliciet.