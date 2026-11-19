import type { ReactNode } from "react"

type SectionBackground = "white" | "black" | "brand" | "secondary" | "transparent"
type SectionColumns = 1 | 2 | 3 | 4

type ColumnsSectionProps = {
    title?: string
    id?: string
    description?: string
    background?: SectionBackground
    backgroundClassName?: string
    columns?: SectionColumns
    columnsClassName?: string
    gap?: "gap-0" | "gap-1" | "gap-2" | "gap-3" | "gap-4" | "gap-5" | "gap-6" | "gap-7" | "gap-8" | "gap-9" | "gap-10"
    container?: boolean
    className?: string
    children: ReactNode
}

const backgrounds: Record<SectionBackground, string> = {
    white: "bg-white text-black",
    black: "bg-black text-white",
    brand: "bg-brand-900 text-white",
    secondary: "bg-secondary-900 text-white",
    transparent: "bg-transparent",
}

// Volledige klassenamen, zodat Tailwind ze kan detecteren (geen dynamische strings!)
const columnClasses: Record<SectionColumns, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
}

export function SwiperSection({ title, id, description, background = "black", backgroundClassName, columns = 1, columnsClassName, gap, container = true, className = "", children }: ColumnsSectionProps) {
    return (
        <section id={id} className={`${backgroundClassName ?? backgrounds[background]} py-16 ${className}`}>
            <div className={container ? "mx-auto max-w-7xl px-6" : "px-6"}>
                {(title || description) && (
                    <header className="mb-10">
                        {title && <h2 className="font-bold font-heading text-slate-900 text-4xl">{title}</h2>}
                        {description && <p className="mt-1 text-base text-white/60">{description}</p>}
                    </header>
                )}
                <div className={`grid ${columnClasses[columns]} ${gap ?? "gap-6"} ${columnsClassName ?? ""}`}>
                    {children}
                </div>
            </div>
        </section>
    )
}