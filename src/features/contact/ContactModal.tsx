import { useEffect, useId, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { ContactTicket } from "./ContactTicket"

/*
 * Contactformulier in een modal (het kaartje zelf staat in ContactTicket).
 * - Gebruikt een native <dialog>: focus-trap, Esc en achtergrond-inert krijg je gratis.
 * - Klik buiten het kaartje of op het kruisje sluit de modal.
 * - Het kaartje wordt alleen gerenderd als de modal open is, zo begint het formulier elke keer schoon.
 */

type ContactModalProps = {
    open: boolean
    onClose: () => void
    endpoint?: string
}

export function ContactModal({ open, onClose, endpoint = "/api/contact" }: ContactModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()

    // <dialog> open/dicht houden met de open-prop
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    // Achtergrond niet laten scrollen terwijl de modal open staat
    useEffect(() => {
        if (!open) return
        const previous = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = previous
        }
    }, [open])

    // Het kaartje schuift binnen, zoals bij TicketStub.
    // De dialog zelf beweegt (niet de inhoud), anders steekt de inhoud even uit en krijg je scrollbalken.
    useEffect(() => {
        const el = dialogRef.current
        if (!open || !el) return

        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                el,
                { y: 24, rotate: -1.5, opacity: 0 },
                { y: 0, rotate: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
            )
        })
        return () => mm.revert()
    }, [open])

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClose={onClose}
            // Klik op de backdrop (= het dialog-element zelf) sluit de modal
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
            className="m-auto max-h-[92dvh] w-[min(92vw,52rem)] overflow-x-hidden overflow-y-auto bg-transparent p-0 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        >
            {open && (
                <ContactTicket
                    endpoint={endpoint}
                    onClose={onClose}
                    titleId={titleId}
                    // --notch = kleur van de backdrop
                    notchClassName="[--notch:#050506]"
                />
            )}
        </dialog>
    )
}
