import type { ReactNode } from "react"
import { HomePage } from "./pages/HomePage"
import { BijMartinus } from "./pages/BijMartinus"
import { AboutPage } from "./pages/AboutPage"

type PageRoute = {
    path: string
    label: string
    group: "Start" | "Basis" | "Componenten" | "Formulier"
    element: ReactNode
}

export const pageRoutes: PageRoute[] = [
    { path: "/", label: "Introductie", group: "Start", element: <HomePage /> },
    { path: "/cases/:slug", label: "Bij Martinus", group: "Start", element: <BijMartinus /> },
    { path: "/over-mij", label: "Over mij", group: "Start", element: <AboutPage /> }
]