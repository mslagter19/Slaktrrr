import type { ComponentProps, ReactNode } from "react"
import { Link, type LinkProps } from "react-router-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"

const cardVariants = cva(
    "group relative flex overflow-hidden transition-shadow motion-reduce:transition-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600",
    {
        variants: {
            variant: {
                outline: "border border-slate-200 bg-white",
                elevated: "bg-white shadow-md hover:shadow-lg",
                filled: "bg-slate-100",
            },

            direction: {
                vertical: "flex-col",
                horizontal: "flex-col sm:flex-row",
            },

            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-lg",
                lg: "rounded-xl",
            },
        },

        defaultVariants: {
            variant: "outline",
            direction: "vertical",
            radius: "md",
        },
    }
)

export function Card({
    className,
    variant,
    direction,
    radius,
    ...rest
}: ComponentProps<"article"> & VariantProps<typeof cardVariants>) {
    return (
        <article
            className={cn(cardVariants({ variant, direction, radius }), className)}
            {...rest}
        />
    )
}

type CardImageProps = Omit<ComponentProps<"img">, "alt"> & {
    alt: string // verplicht: TypeScript dwingt een alt-tekst af
    badge?: ReactNode // slot voor je eigen <Badge>
    wrapperClassName?: string // voor formaat/aspect-ratio van het vak om de afbeelding
}

export function CardImage({
    badge,
    alt,
    className,
    wrapperClassName,
    loading = "lazy",
    ...rest
}: CardImageProps) {
    return (
        <div className={cn("relative aspect-video shrink-0 overflow-hidden", wrapperClassName)}>
            <img
                alt={alt}
                loading={loading}
                className={cn(
                    "size-full object-cover transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:scale-105 motion-reduce:transition-none",
                    className
                )}
                {...rest}
            />
            {badge && <div className="absolute top-3 left-3">{badge}</div>}
        </div>
    )
}

/* ---------- CardBody & CardDescription ---------- */
export function CardBody({ className, ...rest }: ComponentProps<"div">) {
    return <div className={cn("flex flex-1 flex-col gap-2 p-4", className)} {...rest} />
}

export function CardDescription({ className, ...rest }: ComponentProps<"p">) {
    return <p className={cn("text-sm text-slate-600", className)} {...rest} />
}

/* ---------- CardTitle (met stretched link) ---------- */
// Zelfde principe als bij Button: een discriminated union.
// TypeScript laat nooit href én to tegelijk toe.
type CardTitleLinkProps =
    | { href?: undefined; to?: undefined; target?: undefined; rel?: undefined } // geen link
    | { href: string; target?: string; rel?: string; to?: undefined } // extern adres
    | { to: LinkProps["to"]; href?: undefined; target?: undefined; rel?: undefined } // interne route

type CardTitleProps = CardTitleLinkProps & {
    as?: "h2" | "h3" | "h4" // kies het niveau dat past in de paginastructuur
    className?: string
    children: ReactNode
}

// Het pseudo-element bedekt de hele card (want <Card> is 'relative')
const stretchedLink =
    "outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-brand-600"

export function CardTitle(props: CardTitleProps) {
    const { as: Heading = "h3", className, children } = props

    let content: ReactNode = children

    // 1. Interne route
    if (props.to !== undefined) {
        content = (
            <Link to={props.to} className={stretchedLink}>
                {children}
            </Link>
        )
    }
    // 2. Extern adres
    else if (props.href !== undefined) {
        const safeRel = props.target === "_blank" ? "noopener noreferrer" : props.rel

        content = (
            <a href={props.href} target={props.target} rel={safeRel} className={stretchedLink}>
                {children}
            </a>
        )
    }
    // 3. Geen link: alleen tekst

    return (
        <Heading className={cn("font-heading text-lg font-semibold text-slate-900", className)}>
            {content}
        </Heading>
    )
}