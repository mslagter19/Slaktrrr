export type Track = {
    title: string
    artist: string
    src: string // pad naar het mp3-bestand in /public/audio (via audio(), zodat de base path klopt)
    license: string // bijv. "CC BY-NC 4.0": staat op de track-pagina bij Free Music Archive
    licenseHref?: string // link naar de licentietekst (creativecommons.org); CC vraagt hierom
    href: string // link naar de track-pagina (voor naamsvermelding)
}

// Bestanden in public/audio. BASE_URL eindigt al op "/", dus dit werkt ook als de site in een submap staat.
// encodeURI: de bestandsnamen bevatten spaties.
const audio = (file: string) => `${import.meta.env.BASE_URL}audio/${encodeURI(file)}`

// Licentieteksten
const CC_BY_ND = "https://creativecommons.org/licenses/by-nd/4.0/"

// Tracks van https://freemusicarchive.org/genre/Jazz/, allemaal door mensen gemaakt ("AI generated: No").
// Meestal NonCommercial (NC): prima voor dit niet-commerciële portfolio, niet voor een site die iets verkoopt.
// NoDerivatives (ND): het bestand alleen ongewijzigd gebruiken (niet inkorten of bewerken).
// Naamsvermelding is verplicht; de credits-modal in de footer toont artiest, track-pagina en licentie.
export const tracks: Track[] = [
    {
        title: "Dreamy Jazz Music",
        artist: "VibeDepot",
        src: audio("VibeDepot - Dreamy Jazz Music.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/dreamy-jazz-music/",
    },
    {
        title: "Cafe Music",
        artist: "VibeDepot",
        src: audio("VibeDepot - Cafe Music.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/cafe-music-1/",
    },
    {
        title: "Happy Jazz",
        artist: "VibeDepot",
        src: audio("VibeDepot - Happy Jazz.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/happy-jazz-1/",
    },
    {
        title: "Positive Jazz Music",
        artist: "VibeDepot",
        src: audio("VibeDepot - Positive Jazz Music.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/positive-jazz-music/",
    },
    {
        title: "Romantic Music",
        artist: "VibeDepot",
        src: audio("VibeDepot - Romantic Music.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/romantic-music/",
    },
    {
        title: "Slow Jazz Music",
        artist: "VibeDepot",
        src: audio("VibeDepot - Slow Jazz Music.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/slow-jazz-music/",
    },
    {
        title: "Slow Music",
        artist: "VibeDepot",
        src: audio("VibeDepot - Slow Music.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/slow-music/",
    },
    {
        title: "Slow",
        artist: "VibeDepot",
        src: audio("VibeDepot - Slow.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/slow/",
    },
    {
        title: "Walking Jazz Music",
        artist: "VibeDepot",
        src: audio("VibeDepot - Walking Jazz Music.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/walking-jazz-music/",
    },
    {
        title: "Walking Jazz",
        artist: "VibeDepot",
        src: audio("VibeDepot - Walking Jazz.mp3"),
        license: "CC BY-ND 4.0",
        licenseHref: CC_BY_ND,
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/walking-jazz/",
    },
]
