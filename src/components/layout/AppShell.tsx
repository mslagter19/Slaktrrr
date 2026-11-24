import type { ReactNode } from "react"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { PageTransition } from "./PageTransition"
import { MusicPlayer } from "@/features/music/MusicPlayer"
import { Logo } from "@/components/brand/Logo"

type AppShellProps = {
    children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex min-h-dvh flex-col bg-black text-white">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-black"
            >
                Ga naar inhoud
            </a>

            <main id="main" tabIndex={-1} className="w-full flex-1 outline-none">
                {children}
            </main>

            <Footer />
            <PageTransition />
            <Navigation logo={<Logo />} music={<MusicPlayer />} />
        </div>
    )
}
