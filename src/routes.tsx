import type { ReactNode } from "react"
import { HomePage } from "./pages/HomePage"
import { BijMartinus } from "./pages/BijMartinus"

type PageRoute = {
    path: string
    label: string
    group: "Start" | "Basis" | "Componenten" | "Formulier"
    element: ReactNode
}

export const pageRoutes: PageRoute[] = [
    { path: "/", label: "Introductie", group: "Start", element: <HomePage /> },
    { path: "/cases/bij-martinus", label: "Bij Martinus", group: "Start", element: <BijMartinus /> }
]