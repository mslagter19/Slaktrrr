import { tracks } from "../../lib/tracks"

export function Footer() {
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
                        <ul className="mt-2 space-y-1 text-sm text-white/60">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/marc-slagter/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-white">Muziek op deze site</h2>
                        <ul className="mt-2 space-y-1 text-sm text-white/60">
                            {tracks.map((track) => (
                                <li key={track.src}>
                                    <a
                                        href={track.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                                    >
                                        {track.title}
                                    </a>{" "}
                                    door {track.artist} ({track.license}), via Free Music Archive
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="mt-10 text-xs text-white/40">
                    © {new Date().getFullYear()} Slaktrrr. Alle rechten voorbehouden.
                </p>
            </div>
        </footer>
    )
}
