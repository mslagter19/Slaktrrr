import { Route, Routes } from "react-router-dom"
import { AppShell } from "./components/layout/AppShell"
import { pageRoutes } from "./routes"

function App() {
  return (
    <AppShell>
      <Routes>
        {pageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </AppShell>
  )
}

export default App