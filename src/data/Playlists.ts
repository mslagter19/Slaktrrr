export type Playlist = {
    id: string
    title: string
    description?: string
    url: string
    coverSrc?: string // optioneel: komt op het vinyl-label
    mood?: string // bv. "Focus"
    tracks?: number
    duration?: string // bv. "3 u 12 min"
    highlights?: { title: string; artist: string }[] // handmatig gekozen nummers
}

export const PLAYLISTS: Playlist[] = [
    {
        id: "alternamellooo",
        title: "Alternamellooo",
        description: "Rustige jazz voor als de bugs 's avonds laat opduiken.",
        url: "https://open.spotify.com/playlist/2Orpzbzupwg2K3gUUxb7k5?si=db2487f4f934427d",
        mood: "Focus",
        tracks: 256,
        duration: "3 u 12 min",
        highlights: [
            { title: "So What", artist: "Miles Davis" },
            { title: "Blue in Green", artist: "Bill Evans" },
            { title: "Naima", artist: "John Coltrane" },
        ],
    },
]
