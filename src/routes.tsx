import type { ReactNode } from "react"
import { HomePage } from "@/pages/HomePage"
import { BijMartinusPage } from "@/pages/cases/BijMartinusPage"
import { AboutPage } from "@/pages/AboutPage"
import { CasesPage } from "@/pages/CasesPage"
import { ContactPage } from "@/pages/ContactPage"
import { ExperiencePage } from "@/pages/ExperiencePage"
import { ReviewsPage } from "@/pages/ReviewsPage"
import { ExperimentPage } from "@/pages/ExperimentPage"
import { StyleguidePage } from "@/pages/StyleguidePage"

type PageRoute = {
    path: string
    label: string
    group: "Start" | "Basis" | "Componenten" | "Formulier"
    element: ReactNode
}

export const pageRoutes: PageRoute[] = [
    { path: "/", label: "Introductie", group: "Start", element: <HomePage /> },
    { path: "/over-mij", label: "Over mij", group: "Start", element: <AboutPage /> },
    { path: "/cases", label: "Cases", group: "Start", element: <CasesPage /> },
    { path: "/ervaring", label: "Ervaring", group: "Start", element: <ExperiencePage /> },
    { path: "/reviews", label: "Reviews", group: "Start", element: <ReviewsPage /> },
    { path: "/contact", label: "Contact", group: "Start", element: <ContactPage /> },
    // Verborgen: niet in navItems. /experiment via de flamingo in de hero, /styleguide via de footer
    { path: "/styleguide", label: "Styleguide", group: "Basis", element: <StyleguidePage /> },
    { path: "/experiment", label: "Experiment", group: "Start", element: <ExperimentPage /> },
    // CASES: elke case een eigen route. Een onbekende slug valt zo door naar de 404 in App.tsx
    { path: "/cases/bij-martinus", label: "Bij Martinus", group: "Start", element: <BijMartinusPage /> },
]