import { Card, CardBody, CardDescription, CardTitle } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { Vinyl } from "../ui/Vinyl"
import { cn } from "../../lib/cn"
import { PLAYLISTS, type Playlist } from "../../data/Playlists"


/* ---------- Equalizer: puur decoratief, staat stil bij reduced motion ---------- */
function Equalizer({ className }: { className?: string }) {
    const bars = [
        { h: "h-3", d: "0ms" },
        { h: "h-5", d: "150ms" },
        { h: "h-4", d: "300ms" },
        { h: "h-6", d: "100ms" },
        { h: "h-3", d: "250ms" },
    ]
    return (
        <div aria-hidden="true" className={cn("flex items-end gap-1", className)}>
            {bars.map((b, i) => (
                <span
                    key={i}
                    style={{ animationDelay: b.d }}
                    className={cn("w-1 rounded-full bg-brand-600 animate-pulse motion-reduce:animate-none", b.h)}
                />
            ))}
        </div>
    )
}

/* ---------- Props: kies per pagina welke playlist (max. 1) ---------- */
// Of via `id` (opzoeken in PLAYLISTS), of rechtstreeks via `playlist`
// (handig zodra de data later uit Laravel komt). Nooit allebei.
type NowSpinningProps = { className?: string } & (
    | { id: string; playlist?: undefined }
    | { playlist: Playlist; id?: undefined }
)

export function NowSpinning({ id, playlist: playlistProp, className }: NowSpinningProps) {
    const playlist = playlistProp ?? PLAYLISTS.find((p) => p.id === id)

    if (!playlist) {
        if (import.meta.env.DEV) console.warn(`NowSpinning: geen playlist gevonden met id "${id}"`)
        return null
    }

    const { title, description, url, coverSrc, mood, tracks, duration, highlights } = playlist

    return (
        <Card direction="horizontal" radius="lg" className={cn("border-white/10 bg-black text-white", className)}>
            <div className="relative w-full shrink-0 overflow-hidden p-6 sm:w-[22rem] sm:p-8">
                <Vinyl
                    alt={`Draaiende plaat: ${title}`}
                    trigger="always"
                    duration={1.8}
                    labelSrc={coverSrc}
                    labelText={coverSrc ? undefined : "NOW SPINNING"}
                    labelSubText={coverSrc ? undefined : "33 RPM · SIDE A"}
                />
            </div>

            <CardBody className="justify-center gap-4 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                    <Badge variant="primary" size="xs" radius="full">
                        Now spinning
                    </Badge>
                    <Equalizer />
                </div>

                <CardTitle as="h2" href={url} target="_blank" className="font-heading text-3xl text-white sm:text-4xl hover:text-white">
                    {title}
                </CardTitle>

                {description && (
                    <CardDescription className="max-w-prose text-base text-white/60">{description}</CardDescription>
                )}

                <p className="text-xs tracking-widest text-brand-600 uppercase">
                    {[mood, tracks !== undefined && `${tracks} tracks`, duration].filter(Boolean).join(" · ")}
                </p>

                {highlights && highlights.length > 0 && (
                    <ol className="divide-y divide-white/10 border-y border-white/10 text-sm">
                        {highlights.map((h, i) => (
                            <li key={h.title} className="flex items-baseline gap-3 py-2">
                                <span className="w-5 text-xs text-white/60 tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="font-medium">{h.title}</span>
                                <span className="text-white/60">{h.artist}</span>
                            </li>
                        ))}
                    </ol>
                )}

                {/* relative z-10 zodat de knop boven de stretched link blijft */}
                <div className="relative z-10">
                    <Button href={url} target="_blank">
                        Open in Spotify
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
