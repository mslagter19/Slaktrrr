import { useState, type ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "../ui/Button" // pas het pad aan naar jouw Button
import { NavModal } from "../navigation/NavModal"
import { NeonLabel } from "../navigation/NeonLabel"
import { Link } from "react-router-dom"

type NavigationProps = {
    logo: ReactNode // je bestaande <Logo />
    music?: ReactNode // je bestaande muziekknop
}

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 7h16M4 12h11M4 17h16" />
        </svg>
    )
}

export function Navigation({ logo, music }: NavigationProps) {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    // Sluit de poster bij elke routewissel (state aanpassen tijdens het renderen,
    // zodat er geen extra render-cyclus via een effect nodig is)
    const [prevPathname, setPrevPathname] = useState(pathname)
    if (pathname !== prevPathname) {
        setPrevPathname(pathname)
        setOpen(false)
    }

    return (
        <>
            <nav
                aria-label="Hoofdnavigatie"
                className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur"
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
                    <Link
                        to="/"
                        aria-label="Slaktrrr, naar de homepage"
                        className="shrink-0 text-brand-600 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 motion-reduce:transition-none"
                    >
                        {logo}
                    </Link>

                    <div className="flex flex-1 justify-center">
                        <NeonLabel />
                    </div>

                    <div className="flex items-center gap-8">
                        {music}
                        <Button
                            variant="outline"
                            size="md"
                            aria-haspopup="dialog"
                            aria-expanded={open}
                            onClick={() => setOpen(true)}
                            leftIcon={<MenuIcon />}
                            className="border-white/30 text-white hover:bg-white/10 cursor-pointer"
                        >
                            Menu
                        </Button>
                    </div>
                </div>
            </nav>

            <NavModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}
