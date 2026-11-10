import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"

type AppShellProps = {
    children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 md:grid md:grid-cols-[16rem_1fr]">
            <Sidebar />
            <main className="p-6 md:p-10">
                <div className="mx-auto max-w-4xl">{children}</div>
            </main>
        </div>
    )
}