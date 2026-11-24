import { lazy, type ComponentType, type ReactNode } from "react"
import { HomePage } from "@/pages/HomePage"

// Elke pagina behalve de homepage laadt pas als je ernaartoe gaat (eigen JS-chunk).
// De homepage blijft in de hoofdbundle: die bepaalt de eerste indruk (LCP).
// App.tsx vangt het laden op met <Suspense>; de PageTransition dekt dat moment af.
function page(load: () => Promise<Record<string, ComponentType>>, name: string) {
    const Page = lazy(async () => ({ default: (await load())[name] }))
    return <Page />
}

type PageRoute = {
    path: string
    label: string
    group: "Start" | "Basis" | "Componenten" | "Formulier"
    element: ReactNode
}

export const pageRoutes: PageRoute[] = [
    { path: "/", label: "Introductie", group: "Start", element: <HomePage /> },
    { path: "/over-mij", label: "Over mij", group: "Start", element: page(() => import("@/pages/AboutPage"), "AboutPage") },
    { path: "/cases", label: "Cases", group: "Start", element: page(() => import("@/pages/CasesPage"), "CasesPage") },
    { path: "/ervaring", label: "Ervaring", group: "Start", element: page(() => import("@/pages/ExperiencePage"), "ExperiencePage") },
    { path: "/reviews", label: "Reviews", group: "Start", element: page(() => import("@/pages/ReviewsPage"), "ReviewsPage") },
    { path: "/contact", label: "Contact", group: "Start", element: page(() => import("@/pages/ContactPage"), "ContactPage") },
    // Verborgen: niet in navItems. /experiment via de flamingo in de hero, /styleguide via de footer
    { path: "/styleguide", label: "Styleguide", group: "Basis", element: page(() => import("@/pages/StyleguidePage"), "StyleguidePage") },
    { path: "/experiment", label: "Experiment", group: "Start", element: page(() => import("@/pages/ExperimentPage"), "ExperimentPage") },
    // CASES: elke case een eigen route. Een onbekende slug valt zo door naar de 404 in App.tsx
    { path: "/cases/bij-martinus", label: "Bij Martinus", group: "Start", element: page(() => import("@/pages/cases/BijMartinusPage"), "BijMartinusPage") },
]
