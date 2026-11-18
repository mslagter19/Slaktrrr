import { createContext, useContext } from "react"

export type MotionContextValue = {
    enabled: boolean
    setEnabled: (value: boolean) => void
    toggle: () => void
}

export const MotionContext = createContext<MotionContextValue | null>(null)

export function useMotion() {
    const ctx = useContext(MotionContext)
    if (!ctx) throw new Error("useMotion moet binnen <MotionProvider> gebruikt worden")
    return ctx
}
