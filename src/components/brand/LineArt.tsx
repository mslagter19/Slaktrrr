import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/cn"

/*
 * Noir line-art set: saxofoon, speelkaart, whiskeyglas.
 *
 * Gedeelde stijl:
 * - één lijndikte (non-scaling-stroke: blijft even dun, ook als je de SVG groot opschaalt)
 * - ronde uiteinden en hoeken, geen vulling
 * - kleur via currentColor: stuur aan met een Tailwind text-* klasse
 * - decoratief: aria-hidden, dus onzichtbaar voor screenreaders
 */

type LineArtProps = Omit<ComponentProps<"svg">, "children" | "viewBox"> & {
    strokeWidth?: number
}

type BaseProps = LineArtProps & { viewBox: string; children: ReactNode }

function LineArt({ viewBox, strokeWidth = 1.5, className, children, ...rest }: BaseProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className={cn("h-auto w-full [&_*]:[vector-effect:non-scaling-stroke]", className)}
            {...rest}
        >
            {children}
        </svg>
    )
}

/* ---------- Saxofoon ---------- */
export function SaxophoneLine(props: LineArtProps) {
    return (
        <LineArt viewBox="0 0 220 310" {...props}>
            {/* mondstuk + ligatuur */}
            <path d="M68 22 L34 32 Q28 36 32 42 L68 34" />
            <path d="M52 27 L50 38" />

            {/* hals */}
            <path d="M68 22 C94 30 108 46 108 70" />
            <path d="M68 34 C84 42 92 52 92 70" />

            {/* korpus */}
            <path d="M92 70 L84 250" />
            <path d="M108 70 L116 250" />
            <path d="M91 77 H109" />

            {/* U-bocht */}
            <path d="M84 250 C84 300 168 300 168 250" />
            <path d="M116 250 C116 266 144 266 144 250" />

            {/* beker */}
            <path d="M144 250 C146 225 148 200 146 190 C144 182 140 176 136 170" />
            <path d="M168 250 C168 225 166 205 170 192 C174 184 184 176 188 168" />
            <ellipse cx="162" cy="169" rx="26" ry="7" transform="rotate(-4 162 169)" />

            {/* steunbalk tussen korpus en beker */}
            <path d="M115 236 H146" />

            {/* klepgaten */}
            <circle cx="100" cy="100" r="5" />
            <circle cx="100" cy="130" r="5" />
            <circle cx="100" cy="160" r="6" />
            <circle cx="99" cy="190" r="7" />
            <circle cx="98" cy="220" r="7" />

            {/* zijkleppen met stangetjes */}
            <path d="M108 112 H120" />
            <circle cx="124" cy="112" r="4" />
            <path d="M110 142 H122" />
            <circle cx="126" cy="142" r="4" />

            {/* kleppen op de beker */}
            <circle cx="158" cy="205" r="4" />
            <circle cx="157" cy="225" r="5" />
        </LineArt>
    )
}

/* ---------- Speelkaart (schoppen aas) ---------- */
const SPADE =
    "M0 -26 C10 -14 26 -6 26 8 C26 18 18 24 10 24 C6 24 2 22 0 18 C2 26 4 30 8 34 L-8 34 C-4 30 -2 26 0 18 C-2 22 -6 24 -10 24 C-18 24 -26 18 -26 8 C-26 -6 -10 -14 0 -26 Z"

function CardIndex() {
    return (
        <>
            {/* letter A */}
            <path d="M43 80 L48 64 L53 80" />
            <path d="M45 75 H51" />
            {/* kleine schop */}
            <path d={SPADE} transform="translate(48 94) scale(0.3)" />
        </>
    )
}

export function PlayingCardLine(props: LineArtProps) {
    return (
        <LineArt viewBox="0 0 200 280" {...props}>
            {/* kaart en binnenrand */}
            <rect x="30" y="42" width="140" height="196" rx="12" />
            <rect x="40" y="52" width="120" height="176" rx="6" />

            {/* hoekindex, linksboven en gespiegeld rechtsonder */}
            <CardIndex />
            <g transform="rotate(180 100 140)">
                <CardIndex />
            </g>

            {/* grote schop in het midden */}
            <path d={SPADE} transform="translate(100 140) scale(1.6)" />
            <path d={SPADE} transform="translate(100 140) scale(1.1)" />
        </LineArt>
    )
}

/* ---------- Whiskeyglas (tumbler met ijs) ---------- */
export function WhiskeyGlassLine(props: LineArtProps) {
    return (
        <LineArt viewBox="0 0 200 280" {...props}>
            {/* rand */}
            <ellipse cx="100" cy="90" rx="62" ry="10" />

            {/* wanden */}
            <path d="M38 90 L52 210" />
            <path d="M162 90 L148 210" />

            {/* zware bodem */}
            <path d="M52 210 C52 222 148 222 148 210" />
            <path d="M57 196 C57 207 143 207 143 196" />

            {/* vloeistofspiegel */}
            <ellipse cx="100" cy="130" rx="57" ry="8" />

            {/* ijsblokken */}
            <g transform="rotate(-10 98 143)">
                <rect x="82" y="128" width="32" height="30" rx="5" />
                <path d="M88 136 H106" />
            </g>
            <g transform="rotate(14 128 158)">
                <rect x="116" y="148" width="22" height="20" rx="4" />
            </g>

            {/* lichtreflectie op het glas */}
            <path d="M50 104 L55 150" />
            <path d="M52 162 L54 182" />
        </LineArt>
    )
}
