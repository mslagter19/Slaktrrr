import type { RefObject } from "react"

type TransitionOverlayProps = {
    panelRef: RefObject<HTMLDivElement | null>
    discRef: RefObject<SVGSVGElement | null>
}

/**
 * Het zwarte "doek" dat bij elke paginawissel van onder naar boven veegt.
 * - Stopt boven de navigatie (bottom: var(--nav-height)), zodat de nav zichtbaar blijft.
 * - Beginstand (verborgen, buiten beeld) wordt door GSAP gezet in PageTransition.
 * - Vervang de <svg> gerust door je eigen <VinylRecord />-component.
 */
export function TransitionOverlay({ panelRef, discRef }: TransitionOverlayProps) {
    return (
        <div
            ref={panelRef}
            aria-hidden="true"
            className="invisible pointer-events-none fixed inset-x-0 top-0 bottom-(--nav-height,0px) z-40 flex items-center justify-center bg-black"
        >
            <svg
                ref={discRef}
                viewBox="0 0 200 200"
                className="size-40 sm:size-56"
                role="presentation"
            >
                <circle cx="100" cy="100" r="98" fill="#15151a" stroke="#2a2a31" strokeWidth="1" />
                {[84, 74, 64, 54, 44].map((r) => (
                    <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#2a2a31" strokeWidth="1" />
                ))}
                <circle cx="100" cy="100" r="30" className="fill-brand-600" />
                <circle cx="100" cy="100" r="3" fill="#0B0B0D" />
                {/* Highlight, zodat je de rotatie ziet */}
                <path d="M100 4 A96 96 0 0 1 196 100" fill="none" stroke="#EDE6D6" strokeOpacity="0.18" strokeWidth="2" />
            </svg>
        </div>
    )
}
