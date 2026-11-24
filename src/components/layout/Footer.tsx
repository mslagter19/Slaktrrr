import { useState } from "react"
import { tracks } from "@/features/music/tracks.data"
import { GrooveLink } from "@/components/brand/GrooveLink"
import { CreditsModal } from "./CreditsModal"

export function Footer() {
    const [creditsOpen, setCreditsOpen] = useState(false)

    return (
        <footer className="border-t border-white/10 bg-black">
            {/* pb-28: ruimte zodat de vaste navigatie de footer niet bedekt */}
            <div className="mx-auto max-w-6xl px-4 pt-12 pb-28 sm:px-6">
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    <div className="max-w-sm">
                        <p className="font-heading text-lg font-semibold text-brand-600">Slaktrrr</p>
                        <p className="mt-2 text-sm text-white/60">
                            Front-end developer. Ik bouw interfaces met ritme, ruimte en oog voor detail.
                        </p>
                        <p className="font-heading text-sm font-semibold text-white mt-4">Te vinden op</p>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li>
                                <GrooveLink href="https://www.linkedin.com/in/marc-slagter/" target="_blank">
                                    LinkedIn
                                </GrooveLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-white">Muziek op deze site</h2>
                        <p className="mt-2 text-sm text-white/60">
                            {tracks.length} jazztracks, met dank aan de makers.
                        </p>
                        {/* De volledige naamsvermelding (CC BY) staat in de liner notes */}
                        <GrooveLink
                            onClick={() => setCreditsOpen(true)}
                            aria-haspopup="dialog"
                            className="mt-1 text-sm"
                        >
                            Bekijk de credits ♪
                        </GrooveLink>
                    </div>
                </div>

                <p className="mt-10 text-xs text-white/40">
                    © {new Date().getFullYear()} Slaktrrr. Alle rechten voorbehouden.
                </p>
            </div>

            <CreditsModal open={creditsOpen} onClose={() => setCreditsOpen(false)} />
        </footer>
    )
}
