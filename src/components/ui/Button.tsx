import type { ComponentProps, ReactNode } from "react"
import { Link, type LinkProps } from "react-router-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"

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
            animation: "subtle",
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
}

function ButtonContent({ leftIcon, rightIcon, children }: ButtonContentProps) {
    return (
        <>
            {leftIcon}
            {children}
            {rightIcon}
        </>
    )
}

export function Button(props: ButtonProps) {
    // 1. Interne route
    if (props.to !== undefined) {
        const { className, variant, size, leftIcon, rightIcon, children, ...rest } = props

        return (
            <Link className={cn(buttonVariants({ variant, size }), className)} {...rest}>
                <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
                    {children}
                </ButtonContent>
            </Link>
        )
    }

    // 2. Extern adres
    if (props.href !== undefined) {
        const { className, variant, size, leftIcon, rightIcon, children, target, rel, ...rest } = props

        const safeRel = target === "_blank" ? "noopener noreferrer" : rel

        return (
            <a
                className={cn(buttonVariants({ variant, size }), className)}
                target={target}
                rel={safeRel}
                {...rest}
            >
                <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
                    {children}
                </ButtonContent>
            </a>
        )
    }

    // 3. Gewone knop
    const { className, variant, size, leftIcon, rightIcon, children, type = "button", ...rest } = props

    return (
        <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
            <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
                {children}
            </ButtonContent>
        </button>
    )
}
