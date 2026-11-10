import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const typographyVariants = cva('', {
    variants: {
        variant: {
            display: 'font-heading text-5xl font-bold tracking-tight',
            h1: 'font-heading text-4xl font-bold tracking-tight',
            h2: 'font-heading text-3xl font-semibold tracking-tight',
            h3: 'font-heading text-2xl font-semibold',
            h4: 'font-heading text-xl font-semibold',
            h5: 'font-heading text-lg font-semibold',
            h6: 'font-heading text-base font-semibold',
            lead: 'text-lg text-text-muted',
            body: 'text-base',
            small: 'text-sm',
            caption: 'text-xs text-text-muted',
        },
    },
    defaultVariants: { variant: 'body' },
})

type Variant = NonNullable<VariantProps<typeof typographyVariants>['variant']>

// Welk HTML-element hoort standaard bij welke variant?
const defaultElement: Record<Variant, ElementType> = {
    display: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    lead: 'p',
    body: 'p',
    small: 'p',
    caption: 'span',
}

// Generic <T>: de props passen zich aan op het element dat je kiest met `as`
type TypographyProps<T extends ElementType> = {
    as?: T
    variant?: Variant
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant'>

export function Typography<T extends ElementType = 'p'>({
    as,
    variant = 'body',
    className,
    ...props
}: TypographyProps<T>) {
    const Component: ElementType = as ?? defaultElement[variant]
    return <Component className={cn(typographyVariants({ variant }), className)} {...props} />
}