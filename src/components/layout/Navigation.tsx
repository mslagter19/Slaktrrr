import { NavLink } from "react-router-dom"
import { cn } from "../../lib/cn"
import { MusicPlayer } from "../ui/MusicPlayer"
import { Logo } from "../logo/Logo"

const links = [
    { to: "/", label: "Home", end: true },
    { to: "/werk", label: "Werk" },
    { to: "/over-mij", label: "Over mij" },
    { to: "/contact", label: "Contact" },
]

export function Navigation() {
    return (
        <header className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                {/* Logo: vervang door je eigen <Logo /> component */}
                <NavLink
                    to="/"
                    aria-label="Slaktrrr, naar home"
                    className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                    <Logo className="text-brand-600" />
                </NavLink>

                <nav aria-label="Hoofdnavigatie">
                    <ul className="flex items-center gap-4 sm:gap-6">
                        {links.map(({ to, label, end }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    className={({ isActive }) =>
                                        cn(
                                            "relative inline-block py-2 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600",
                                            isActive ? "text-white" : "text-white/60 hover:text-white",
                                            // het "naaldje" boven de actieve link
                                            isActive &&
                                            "after:absolute after:-top-[15px] after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:bg-brand-600 after:content-['']"
                                        )
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <MusicPlayer />
            </div>
        </header>
    )
}
