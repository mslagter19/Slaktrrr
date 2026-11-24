import { Route, Routes } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { pageRoutes } from "./routes"
import { NotFoundPage } from '@/pages/StatusPages'
import { useAwayTitle } from "@/hooks/useAwayTitle"

function App() {
  useAwayTitle("Slaktrrr | Terug naar de plaat? 🎷")

  return (
    <AppShell>
      <Routes>
        {pageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default App