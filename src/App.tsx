import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { pageRoutes } from "./routes"
import { NotFoundPage } from '@/pages/StatusPages'
import { useAwayTitle } from "@/hooks/useAwayTitle"

function App() {
  useAwayTitle("Slaktrrr | Terug naar de plaat? 🎷")

  return (
    <AppShell>
      {/* Pagina's laden lazy (zie routes.tsx). De fallback houdt een scherm hoogte vrij,
          zodat de footer bij een directe lading niet eerst bovenaan staat en dan wegspringt (CLS) */}
      <Suspense fallback={<div className="min-h-dvh" />}>
        <Routes>
          {pageRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}

export default App