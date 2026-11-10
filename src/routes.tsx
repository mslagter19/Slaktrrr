import type { ReactNode } from "react"
import { HomePage } from "./pages/HomePage"
import { TokensPage } from "./pages/TokensPage"
import { ButtonPage } from "./pages/ButtonPage"
import { BadgePage } from "./pages/BadgePage"
import { InputPage } from "./pages/InputPage"
import { TextareaPage } from "./pages/TextareaPage"
import { AccordionPage } from "./pages/AccordionPage"
import { CardPage } from "./pages/CardPage"
import { TabsPage } from "./pages/TabsPage"

type PageRoute = {
    path: string
    label: string
    group: "Start" | "Basis" | "Componenten" | "Formulier"
    element: ReactNode
}

export const pageRoutes: PageRoute[] = [
    { path: "/", label: "Introductie", group: "Start", element: <HomePage /> },
    { path: "/tokens", label: "Design tokens", group: "Basis", element: <TokensPage /> },
    { path: "/components/button", label: "Button", group: "Componenten", element: <ButtonPage /> },
    { path: "/components/badge", label: "Badge", group: "Componenten", element: <BadgePage /> },
    { path: "/form/input", label: "Input", group: "Formulier", element: <InputPage /> },
    { path: "/form/textarea", label: "Textarea", group: "Formulier", element: <TextareaPage /> },
    { path: "/components/accordion", label: "Accordion", group: "Componenten", element: <AccordionPage /> },
    { path: "/components/card", label: "Card", group: "Componenten", element: <CardPage /> },
    { path: "/components/tabs", label: "Tabs", group: "Componenten", element: <TabsPage /> },
]