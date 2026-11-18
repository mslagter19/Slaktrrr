import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ErrorPage } from './pages/SatusPages.tsx'
import { MotionProvider } from './components/gsap/MotionProvider.tsx'

// useBlocker vereist een data router. Eén splat-route die je bestaande <App /> rendert,
// zodat de <Routes> in App.tsx ongewijzigd blijven werken.
const router = createBrowserRouter([{ path: '*', element: <App />, errorElement: <ErrorPage /> }], {
  basename: import.meta.env.BASE_URL,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionProvider>
      <RouterProvider router={router} />
    </MotionProvider>
  </StrictMode>,
)
