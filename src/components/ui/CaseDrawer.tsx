import { useEffect, useRef } from "react"
import { CasePanel, type CasePanelData } from "./CasePanel"

type CaseDrawerProps = {
    item: CasePanelData | null // blijft staan na sluiten, zodat de inhoud meeschuift tijdens de uit-animatie
    open: boolean
    onClose: () => void
}

export function CaseDrawer({ item, open, onClose }: CaseDrawerProps) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={ref}
            className="case-drawer"
            aria-label={item?.title}
            onClose={onClose} // Escape sluit native; hiermee blijft je state in sync
            onClick={(e) => {
                // klik op de dialog zelf (= buiten het paneel) sluit
                if (e.target === e.currentTarget) onClose()
            }}
        >
            {item && <CasePanel item={item} onClose={onClose} />}
        </dialog>
    )
}