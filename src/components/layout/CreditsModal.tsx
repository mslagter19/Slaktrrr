import { useEffect, useId, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { tracks } from "@/features/music/tracks.data"
import { TrackList, TrackListItem } from "@/components/ui/TrackList"
import { GrooveLink } from "@/components/brand/GrooveLink"

/*
 * Muziekcredits als "liner notes": de ivoren achterkant van een platenhoes (zelfde stijl als CaseSleeve).
 * - Native <dialog>: focus-trap, Esc en inert achtergrond krijg je gratis.
 * - Klik buiten de hoes of op het kruisje sluit de modal.
 * - De tracks komen uit features/music/tracks.data.ts. Bij CC BY is naamsvermelding verplicht, dus dit blijft bereikbaar via de footer.
 */

type CreditsModalProps = {
    open: boolean
    onClose: () => void
}

export function CreditsModal({ open, onClose }: CreditsModalProps) {
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

    // De hoes schuift binnen. De dialog zelf beweegt (niet de inhoud), anders krijg je even scrollbalken.
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
            className="m-auto max-h-[92dvh] w-[min(92vw,36rem)] overflow-x-hidden overflow-y-auto bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        >
            <article className="relative flex flex-col overflow-hidden rounded-sm bg-white p-6 text-black shadow-2xl sm:p-8">
                {/* Papierkorrel */}
                <div
                    aria-hidden="true"
                    className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
                />

                <div className="relative flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium tracking-[0.22em] text-brand-700 uppercase">Liner notes · Side A</p>
                        <h2 id={titleId} className="mt-2 font-heading text-2xl leading-tight font-bold sm:text-3xl !text-black">
                            Muziek op deze site
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Sluit de credits"
                        className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/20 text-black/70 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transition-none"
                    >
                        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
                            <path d="M3 3l10 10M13 3L3 13" />
                        </svg>
                    </button>
                </div>

                <span aria-hidden="true" className="relative mt-4 h-px w-full bg-black/80" />

                <TrackList tone="light" className="relative mt-2">
                    {tracks.map((track) => (
                        <TrackListItem key={track.src} label={track.title} className="flex-wrap">
                            <GrooveLink href={track.href} target="_blank" className="text-base text-black/60 hover:text-black focus-visible:text-black">
                                {track.artist} ↗
                            </GrooveLink>{" "}
                            ·{" "}
                            {track.licenseHref ? (
                                <GrooveLink href={track.licenseHref} target="_blank" className="text-base text-black/60 hover:text-black focus-visible:text-black">
                                    {track.license}
                                </GrooveLink>
                            ) : (
                                track.license
                            )}
                        </TrackListItem>
                    ))}
                </TrackList>

                <div className="relative mt-6 flex items-end justify-between gap-4 text-xs text-black/60">
                    <span>Via Free Music Archive</span>
                    <span>SLK-AUDIO</span>
                </div>
            </article>
        </dialog>
    )
}
