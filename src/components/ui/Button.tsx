import { useRef, type ComponentProps, type ReactNode } from "react"
import { Link, type LinkProps } from "react-router-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { useNeedleWipe } from "../../hooks/useNeedleWipe"
import { useMotion } from "../gsap/Motion-context"

const buttonVariants = cva(
    // Base styles
    "group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",

    {
        variants: {
            variant: {
                primary: "bg-brand-600 text-white hover:bg-brand-700 data-[pressed=true]:bg-brand-800",
                secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 data-[pressed=true]:bg-slate-300",
                outline: "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50 data-[pressed=true]:bg-slate-100",
                link: "text-brand-600 underline-offset-4 hover:underline",
                linksecondary: "text-slate-900 underline-offset-4 hover:underline",
            },

            size: {
                xs: "h-6 px-2 text-xs",
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4 text-sm",
                lg: "h-12 px-6 text-base",
                xl: "h-14 px-8 text-lg",
            },

            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-lg",
                lg: "rounded-xl",
                full: "rounded-full",
            },

            fullWidth: {
                true: "w-full",
                false: "w-auto",
            },

            animation: {
                none: "",
                // Naald-wipe: een vlak veegt over de knop als een naald over de groef (GSAP, zie useNeedleWipe).
                // De tekstkleur wisselt alleen als de wipe echt draait (data-wipe staat dan op de knop).
                wipe: "relative isolate overflow-hidden data-wipe:hover:text-black data-wipe:focus-visible:text-black",
                subtle: "hover:brightness-110 active:brightness-95",
                scale: "hover:scale-[1.03] active:scale-[0.97]",
                lift: "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
                iconSlide: "",
                iconRotate: "",
            },

            iconOnly: {
                true: "aspect-square !px-0",
                false: "",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
            radius: "md",
            animation: "wipe",
            iconOnly: false,
        },
    }
)

// Props die alle drie de vormen delen
type ButtonSharedProps = VariantProps<typeof buttonVariants> & {
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}
// Vorm 1: een echte <button>. href mag hier NIET voorkomen.
type ButtonAsButtonProps = ComponentProps<"button"> &
    ButtonSharedProps & {
        href?: undefined
        to?: undefined
    }

// Vorm 2: een <a>. href is hier VERPLICHT.
type ButtonAsLinkProps = ComponentProps<"a"> &
    ButtonSharedProps & {
        href: string
        to?: undefined
    }

// Vorm 3: React Router <Link> voor interne routes. to is verplicht (zit al in LinkProps).
type ButtonAsRouterLinkProps = LinkProps &
    ButtonSharedProps & {
        href?: undefined
    }

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsRouterLinkProps

// Eén plek voor de inhoud, zodat we de volgorde icoon-tekst-icoon niet drie keer schrijven
type ButtonContentProps = Pick<ButtonSharedProps, "leftIcon" | "rightIcon"> & {
    children?: ReactNode
    wipe?: string // kleurclass van het wipe-vlak, of undefined voor geen wipe
}

function ButtonContent({ leftIcon, rightIcon, children, wipe }: ButtonContentProps) {
    return (
        <>
            {/* Wipe-vlak: verborgen tot useNeedleWipe data-wipe op de knop zet */}
            {wipe && (
                <span
                    aria-hidden="true"
                    data-wipe-fill
                    className={cn("pointer-events-none absolute inset-0 -z-10 hidden group-data-wipe:block", wipe)}
                />
            )}
            {leftIcon}
            {children}
            {rightIcon}
        </>
    )
}

// Variant-props die naar cva gaan en dus niet op het DOM-element mogen belanden
const variantKeys = ["variant", "size", "radius", "fullWidth", "iconOnly", "animation"] as const

export function Button(props: ButtonProps) {
    // Eén ref voor alle drie de vormen (button, a, Link)
    const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
    const { enabled: motion } = useMotion()

    const isTextLink = props.variant === "link" || props.variant === "linksecondary"
    const hasWipe = (props.animation ?? "wipe") === "wipe" && !isTextLink
    useNeedleWipe(ref, { enabled: motion && hasWipe })

    // Ivoor over messing (primary), messing over donker (outline, secondary)
    const wipe = hasWipe ? ((props.variant ?? "primary") === "primary" ? "bg-white" : "bg-brand-600") : undefined

    const classes = cn(
        buttonVariants({
            variant: props.variant,
            size: props.size,
            radius: props.radius,
            fullWidth: props.fullWidth,
            iconOnly: props.iconOnly,
            animation: props.animation,
        }),
        props.className
    )

    // 1. Interne route
    if (props.to !== undefined) {
        const { leftIcon, rightIcon, children, ...rest } = omitVariants(props)

        return (
            <Link {...rest} ref={ref} className={classes}>
                <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon} wipe={wipe}>
                    {children}
                </ButtonContent>
            </Link>
        )
    }

    // 2. Extern adres
    if (props.href !== undefined) {
        const { leftIcon, rightIcon, children, target, rel, ...rest } = omitVariants(props)

        const safeRel = target === "_blank" ? "noopener noreferrer" : rel

        return (
            <a {...rest} ref={ref} className={classes} target={target} rel={safeRel}>
                <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon} wipe={wipe}>
                    {children}
                </ButtonContent>
            </a>
        )
    }

    // 3. Gewone knop
    const { leftIcon, rightIcon, children, type = "button", ...rest } = omitVariants(props)

    return (
        <button {...rest} ref={ref} type={type} className={classes}>
            <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon} wipe={wipe}>
                {children}
            </ButtonContent>
        </button>
    )
}

// Haalt className en de cva-props eruit, de rest gaat naar het element
function omitVariants<P extends { className?: string }>(props: P) {
    const rest: Record<string, unknown> = { ...props }
    delete rest.className
    for (const key of variantKeys) delete rest[key]
    return rest as Omit<P, "className" | (typeof variantKeys)[number]>
}
