import type { ComponentProps, ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"

/* ---------- TrackList ---------- */
// Een lijst met feiten in tracklist-stijl: label links, waarde rechts,
// een stippellijn ertussen. Semantisch een <dl> (term + omschrijving).
// Nummering gebeurt met een CSS-counter, dus het nummer is puur visueel
// en schermlezers lezen alleen label en waarde voor.

const trackListVariants = cva("m-0 flex flex-col text-sm", {
    variants: {
        tone: {
            // voor donkere secties (Noir)
            dark: "text-white [--track-line:rgb(255_255_255/0.18)] [--track-muted:var(--color-white-faint)]",
            // voor lichte secties
            light: "text-slate-900 [--track-line:var(--color-slate-200)] [--track-muted:var(--color-slate-500)]",
        },
    },

    defaultVariants: {
        tone: "dark",
    },
})

type TrackListProps = ComponentProps<"dl"> &
    VariantProps<typeof trackListVariants> & {
        numbered?: boolean // standaard aan; zet uit voor een lijst zonder nummers
    }

export function TrackList({ className, tone, numbered = true, ...rest }: TrackListProps) {
    return (
        <dl
            data-numbered={numbered}
            className={cn(
                "group/track [counter-reset:track]",
                trackListVariants({ tone }),
                className
            )}
            {...rest}
        />
    )
}

/* ---------- TrackListItem ---------- */
type TrackListItemProps = Omit<ComponentProps<"div">, "children"> & {
    label: string // bijv. "Woonplaats"
    children: ReactNode // de waarde, bijv. "Jouw stad" of een <a>
}

export function TrackListItem({ label, children, className, ...rest }: TrackListItemProps) {
    return (
        <div
            className={cn(
                "flex items-baseline gap-3 border-b border-dashed border-(--track-line) py-2 last:border-b-0",
                "[counter-increment:track]",
                "before:min-w-[2ch] before:text-(--track-muted) before:tabular-nums",
                // het nummer verschijnt alleen als <TrackList numbered> aan staat
                "group-data-[numbered=true]/track:before:content-[counter(track,decimal-leading-zero)]",
                className
            )}
            {...rest}
        >
            <dt className="flex-1 font-medium text-lg">{label}</dt>
            <dd className="m-0 text-right text-(--track-muted) text-lg">{children}</dd>
        </div>
    )
}

/* ---------- Gebruik ----------
<TrackList tone="dark">
    <TrackListItem label="Woonplaats">Jouw stad</TrackListItem>
    <TrackListItem label="Ervaring">x jaar</TrackListItem>
    <TrackListItem label="Stack">React, Tailwind</TrackListItem>
    <TrackListItem label="Buiten werk">Hobby</TrackListItem>
</TrackList>

// Zonder nummers:
<TrackList numbered={false}> ... </TrackList>
*/
