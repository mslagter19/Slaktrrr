import { useId, useState, type ReactNode } from "react"
import { useLocation, Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { NavModal } from "../navigation/NavModal"

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
    const tooltipId = useId()

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

                    <div className="flex items-center gap-8">
                        {music}

                        {/* 'relative' zodat de tooltip aan de knop vastzit */}
                        <div className="relative">


                            <Button
                                variant="outline"
                                size="md"
                                aria-haspopup="dialog"
                                aria-expanded={open}
                                aria-describedby={tooltipId}
                                onClick={() => setOpen(true)}
                                leftIcon={<MenuIcon />}
                                className="cursor-pointer border-white/30 text-white hover:bg-white/10"
                            >
                                Menu
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <NavModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}