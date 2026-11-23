import { useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import { gsap } from "../../lib/gsap"
import { cn } from "../../lib/cn"
import { navItems } from "././NavItems"

// Voeg dit toe aan je @theme: --color-bluenote: #1F5BA6;
const BLUE = "var(--color-bluenote, #1F5BA6)"

type NavModalProps = {
    open: boolean
    onClose: () => void
}

export function NavModal({ open, onClose }: NavModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const posterRef = useRef<HTMLDivElement>(null)

    // Native <dialog>: focus-trap, Escape en inert achtergrond krijg je gratis
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    // Eén georkestreerd moment: poster schuift omhoog, titels volgen.
    // De dialog zelf beweegt (niet de inhoud), anders steekt de inhoud even uit en krijg je scrollbalken.
    useEffect(() => {
        const dialog = dialogRef.current
        const poster = posterRef.current
        if (!open || !dialog || !poster) return

        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline({ defaults: { ease: "power3.out" } })
                .from(dialog, { y: 48, rotate: 1.5, opacity: 0, duration: 0.45 })
                .from(
                    poster.querySelectorAll("[data-poster-item]"),
                    { x: -28, opacity: 0, duration: 0.35, stagger: 0.05 },
                    "-=0.2"
                )
        })

        return () => mm.revert()
    }, [open])

    return (
        <dialog
            ref={dialogRef}
            aria-label="Alle pagina's"
            onClose={onClose} // Escape sluit ook
            onClick={(e) => {
                // Klik op de backdrop (target is de dialog zelf) sluit
                if (e.target === e.currentTarget) onClose()
            }}
            className="m-auto max-h-dvh w-full max-w-3xl overflow-x-hidden overflow-y-auto bg-transparent sm:p-8 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        >
            <div
                ref={posterRef}
                className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[11rem_1fr] overflow-hidden bg-white text-black shadow-2xl"
            >
                {/* Blauw vlak met verticale titel */}
                <div
                    aria-hidden="true"
                    className="relative flex items-end justify-center overflow-hidden"
                    style={{ backgroundColor: BLUE }}
                >
                    {/* Halftone-raster, als gedrukt */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,11,13,0.3)_1.2px,transparent_1.6px)] bg-size-[9px_9px]" />
                    <div className="absolute inset-x-0 top-0 h-4 bg-brand-600" />
                    <span className="relative rotate-180 py-8 font-heading text-6xl leading-none font-bold tracking-tight text-white uppercase [writing-mode:vertical-rl] sm:text-8xl">
                        Slaktrrr
                    </span>
                </div>

                {/* Pagina's */}
                <div className="flex flex-col p-5 sm:p-10">
                    <div className="flex items-start justify-between gap-4">
                        <p className="font-heading text-sm font-semibold">Front-end developer</p>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Sluit menu"
                            className="grid size-10 shrink-0 place-items-center bg-black text-white transition-colors hover:bg-(--color-brand-600) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transition-none cursor-pointer"
                        >
                            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <path d="M5 5l14 14M19 5L5 19" />
                            </svg>
                        </button>
                    </div>

                    <nav aria-label="Alle pagina's" className="mt-8 flex-1">
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <li key={item.to} data-poster-item>
                                    <NavLink
                                        to={item.to}
                                        end={item.end}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            cn(
                                                "flex flex-wrap w-fit items-baseline gap-3 py-1 font-heading text-5xl leading-[0.9] font-bold tracking-tight uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none sm:text-6xl",
                                                isActive
                                                    ? "-rotate-1 bg-brand-600 px-2 text-black"
                                                    : "text-black hover:text-(--poster-blue)"
                                            )
                                        }
                                        style={{ "--poster-blue": BLUE } as React.CSSProperties}
                                    >
                                        {item.label}
                                        <span className="hidden text-sm font-normal tracking-normal text-slate-600 normal-case sm:inline">
                                            {item.hint}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-8 border-t-4 border-black" />
                </div>
            </div>
        </dialog>
    )
}
