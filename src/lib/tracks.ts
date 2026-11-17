export type Track = {
    title: string
    artist: string
    src: string // pad naar het mp3-bestand in /public/audio
    license: string // bijv. "CC BY 4.0": staat op de track-pagina bij Free Music Archive
    href: string // link naar de track-pagina (voor naamsvermelding)
}

// Vul dit met tracks die je op https://freemusicarchive.org/genre/Jazz/ hebt uitgekozen.
// Controleer per track de licentie: bij CC BY is naamsvermelding verplicht (de footer toont die),
// bij "NonCommercial" mag je de track niet op een commerciële site gebruiken.
export const tracks: Track[] = [
    {
        title: "Too cool for School",
        artist: "NoKings XXX",
        src: "/audio/NoKingsXXX-TooCoolforSchool.mp3",
        license: "CC BY 4.0",
        href: "https://freemusicarchive.org/music/nokings-xxx/too-cool-for-school/too-cool-for-school/",
    },
    {
        title: "Slow Music",
        artist: "VibeDepot",
        src: "/audio/VibeDepot-SlowMusic.mp3",
        license: "CC BY 4.0",
        href: "https://freemusicarchive.org/music/vibedepot/cafe-music/slow-music/",
    },
]
