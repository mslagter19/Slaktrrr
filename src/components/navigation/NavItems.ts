import { matchPath, useLocation } from "react-router-dom"

export type NavItem = {
    label: string
    to: string
    hint: string // korte toelichting, alleen zichtbaar vanaf sm in de poster
    end?: boolean // true = exacte match (nodig voor Home)
}

// Pas de routes aan naar jouw router-config
export const navItems: NavItem[] = [
    { label: "Home", to: "/", hint: "Begin hier", end: true },
    { label: "Cases", to: "/cases", hint: "Geselecteerd werk" },
    { label: "Over mij", to: "/over-mij", hint: "Wie ik ben" },
    { label: "Ervaring", to: "/ervaring", hint: "Mijn loopbaan" },
    { label: "Reviews", to: "/reviews", hint: "Wat anderen zeggen" },
    { label: "Contact", to: "/contact", hint: "Neem contact op" },
]

// Geeft het actieve item terug. /cases/mijn-case matcht dus ook op "Cases".
// Verborgen pagina's (cv, flamingo-experiment) geven undefined terug.
export function useCurrentPage() {
    const { pathname } = useLocation()
    return navItems.find((item) => matchPath({ path: item.to, end: item.end ?? false }, pathname))
}
