import { NavLink } from "react-router-dom"
import { cn } from "../../lib/cn"
import { pageRoutes } from "../../routes"

const groups = [...new Set(pageRoutes.map((route) => route.group))]

export function Sidebar() {
    return (
        <aside className="border-b border-slate-200 bg-white p-6 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-r md:border-b-0">
            <p className="text-xl font-bold text-brand-700">Slagvast</p>

            <nav className="mt-8 space-y-6" aria-label="Hoofdnavigatie">
                {groups.map((group) => (
                    <div key={group}>
                        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                            {group}
                        </p>
                        <ul className="space-y-1">
                            {pageRoutes
                                .filter((route) => route.group === group)
                                .map((route) => (
                                    <li key={route.path}>
                                        <NavLink
                                            to={route.path}
                                            end
                                            className={({ isActive }) =>
                                                cn(
                                                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                    isActive
                                                        ? "bg-brand-50 text-brand-700"
                                                        : "text-slate-600 hover:bg-slate-100",
                                                )
                                            }
                                        >
                                            {route.label}
                                        </NavLink>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    )
}