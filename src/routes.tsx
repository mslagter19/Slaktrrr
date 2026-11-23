import type { ReactNode } from "react"
import { HomePage } from "./pages/HomePage"
import { BijMartinus } from "./pages/BijMartinus"
import { AboutPage } from "./pages/AboutPage"
import { CasesPage } from "./pages/CasesPage"
import { ContactPage } from "./pages/ContactPage"
import { ExperiencePage } from "./pages/ExperiencePage"
import { ReviewsPage } from "./pages/ReviewsPage"

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
    //CASES
    { path: "/cases/:slug", label: "Bij Martinus", group: "Start", element: <BijMartinus /> },
]