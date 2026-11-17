import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { cn } from "../../lib/cn"
import { tracks } from "../../lib/tracks"
import { Tooltip } from "./Tooltip"

const controlButton =
    "inline-flex shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transition-none"

function Vinyl({ spinning }: { spinning: boolean }) {
    return (
        <svg
            viewBox="0 0 36 36"
            aria-hidden="true"
            className={cn(
                "size-9 shrink-0 animate-spin [animation-duration:3s] motion-reduce:animate-none",
                !spinning && "[animation-play-state:paused]"
            )}
        >
            <circle cx="18" cy="18" r="17" className="fill-black stroke-white/30" />
            <circle cx="18" cy="18" r="12" className="fill-none stroke-white/10" />
            <circle cx="18" cy="18" r="6" className="fill-brand-600" />
            <circle cx="18" cy="18" r="1.2" className="fill-black" />
            {/* glansstreepje: maakt de rotatie zichtbaar */}
            <line x1="18" y1="1" x2="18" y2="8" className="stroke-white/35" />
        </svg>
    )
}

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const track = tracks[index]

    // Start of pauzeer wanneer de knop of de track verandert.
    // Browsers blokkeren autoplay: play() draait dus alleen na een klik van de bezoeker.
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        if (playing) {
            audio.play().catch(() => setPlaying(false))
        } else {
            audio.pause()
        }
    }, [playing, index])

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = 0.6
    }, [])

    // Hint: 5 seconden zichtbaar zodra je op de homepage komt
    const { pathname } = useLocation()
    const [hintVisible, setHintVisible] = useState(false)

    useEffect(() => {
        if (pathname !== "/") {
            setHintVisible(false)
            return
        }
        setHintVisible(true)
        const timer = setTimeout(() => setHintVisible(false), 5000)
        return () => clearTimeout(timer)
    }, [pathname])

    const showHint = hintVisible && !playing

    if (!track) return null

    return (
        <div className="flex items-center gap-3">
            <Vinyl spinning={playing} />

            <div className="hidden min-w-0 max-w-44 leading-tight lg:block">
                <p className="truncate text-sm text-white">{track.title}</p>
                <p className="truncate text-xs text-white/55">{track.artist}</p>
            </div>

            <Tooltip
                id="music-hint"
                open={showHint}
                align="end"
                content="Deze site klinkt het best met muziek. Zet hem aan."
            >
                <button
                    type="button"
                    onClick={() => {
                        setHintVisible(false)
                        setPlaying((p) => !p)
                    }}
                    aria-pressed={playing}
                    aria-label={playing ? "Muziek pauzeren" : "Muziek afspelen"}
                    aria-describedby={showHint ? "music-hint" : undefined}
                    className={cn(controlButton, "size-9")}
                >
                    {playing ? (
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                            <rect x="6" y="5" width="4" height="14" rx="1" />
                            <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                        </svg>
                    )}
                </button>
            </Tooltip>

            {tracks.length > 1 && (
                <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % tracks.length)}
                    aria-label="Volgende track"
                    className={cn(controlButton, "hidden size-8 sm:inline-flex")}
                >
                    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                        <path d="M6 5.5v13a1 1 0 0 0 1.5.86l9-6.5a1 1 0 0 0 0-1.72l-9-6.5A1 1 0 0 0 6 5.5ZM18 5h-2v14h2V5Z" />
                    </svg>
                </button>
            )}

            <audio
                ref={audioRef}
                src={track.src}
                preload="none"
                onEnded={() => setIndex((i) => (i + 1) % tracks.length)}
            />
        </div>
    )
}
