import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { MotionContext } from "./Motion-context"

const STORAGE_KEY = "slaktrrr:motion"

// Voorkeur: eerst de keuze van de bezoeker, anders het systeem (prefers-reduced-motion)
function getInitialValue(): boolean {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === "on") return true
        if (stored === "off") return false
    } catch {
        // localStorage kan geblokkeerd zijn; dan vallen we terug op de systeemvoorkeur
    }
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function MotionProvider({ children }: { children: ReactNode }) {
    const [enabled, setEnabledState] = useState(getInitialValue)

    const setEnabled = useCallback((value: boolean) => {
        setEnabledState(value)
        try {
            localStorage.setItem(STORAGE_KEY, value ? "on" : "off")
        } catch {
            /* negeren */
        }
    }, [])

    const toggle = useCallback(() => setEnabled(!enabled), [enabled, setEnabled])

    // data-motion op <html>: handig voor eventuele CSS-uitzonderingen
    useEffect(() => {
        document.documentElement.dataset.motion = enabled ? "on" : "off"
    }, [enabled])

    const value = useMemo(() => ({ enabled, setEnabled, toggle }), [enabled, setEnabled, toggle])

    return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}
