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
const CC_BY_NC = "https://creativecommons.org/licenses/by-nc/4.0/"
const CC_BY_NC_SA = "https://creativecommons.org/licenses/by-nc-sa/4.0/"

// Tracks van https://freemusicarchive.org/genre/Jazz/, allemaal door mensen gemaakt ("AI generated: No").
// Licentie NonCommercial (NC): prima voor dit niet-commerciële portfolio, niet voor een site die iets verkoopt.
// Naamsvermelding is verplicht; de credits-modal in de footer toont artiest, track-pagina en licentie.
export const tracks: Track[] = [
    {
        title: "After Midnight Walk",
        artist: "Lobo Loco",
        src: audio("Lobo Loco - After Midnight Walk (ID 2412).mp3"),
        license: "CC BY-NC-SA 4.0",
        licenseHref: CC_BY_NC_SA,
        href: "https://freemusicarchive.org/music/Lobo_Loco/jazzy-moments/after-midnight-walk-id-2412/",
    },
    {
        title: "Floor Shine",
        artist: "Blue Dot Sessions",
        src: audio("Blue Dot Sessions - Floor Shine.mp3"),
        license: "CC BY-NC 4.0",
        licenseHref: CC_BY_NC,
        href: "https://freemusicarchive.org/music/Blue_Dot_Sessions/Speakeasy_1959/Floor_Shine/",
    },
    {
        title: "Cigar Singles",
        artist: "Blue Dot Sessions",
        src: audio("Blue Dot Sessions - Cigar Singles.mp3"),
        license: "CC BY-NC 4.0",
        licenseHref: CC_BY_NC,
        href: "https://freemusicarchive.org/music/Blue_Dot_Sessions/smoke-shop/cigar-singles-1/",
    },
    {
        title: "Rafter",
        artist: "Blue Dot Sessions",
        src: audio("Blue Dot Sessions - Rafter.mp3"),
        license: "CC BY-NC 4.0",
        licenseHref: CC_BY_NC,
        href: "https://freemusicarchive.org/music/Blue_Dot_Sessions/Speakeasy_1959/Rafter/",
    },
    {
        title: "Footsteps on Alden",
        artist: "Blue Dot Sessions",
        src: audio("Blue Dot Sessions - Footsteps on Alden.mp3"),
        license: "CC BY-NC 4.0",
        licenseHref: CC_BY_NC,
        href: "https://freemusicarchive.org/music/Blue_Dot_Sessions/smoke-shop/footsteps-on-alden-1/",
    },
    {
        title: "Sine and Wither",
        artist: "Blue Dot Sessions",
        src: audio("Blue Dot Sessions - Sine and Wither.mp3"),
        license: "CC BY-NC 4.0",
        licenseHref: CC_BY_NC,
        href: "https://freemusicarchive.org/music/Blue_Dot_Sessions/Vacant_Distillery/Shine_and_Wither/",
    },
    {
        title: "Harper's Desk",
        artist: "Blue Dot Sessions",
        src: audio("Blue Dot Sessions - Harper's Desk.mp3"),
        license: "CC BY-NC 4.0",
        licenseHref: CC_BY_NC,
        href: "https://freemusicarchive.org/music/Blue_Dot_Sessions/smoke-shop/harpers-desk-1/",
    },
]
