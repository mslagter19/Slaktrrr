

type SectionBackground = "white" | "black" | "brand" | "secondary" | "transparent"

type OutroSectionProps = {
    id?: string
    title?: string
    subtitle?: string
    description?: string
    className?: string
    container?: boolean
    background?: SectionBackground
    backgroundClassName?: string
}

const backgrounds: Record<SectionBackground, string> = {
    white: "bg-white text-black",
    black: "bg-black text-white",
    brand: "bg-brand-900 text-white",
    secondary: "bg-secondary-900 text-white",
    transparent: "bg-transparent",
}

export function OutroSection({ id, background = "black", backgroundClassName, className = "" }: OutroSectionProps) {
    return (
        <section id={id} className={`${backgroundClassName ?? backgrounds[background]} py-16 ${className}`}>

        </section>
    )
}