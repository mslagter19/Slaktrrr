import { createContext, useContext, useId, useState, type ComponentProps, type KeyboardEvent, } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const tabListVariants = cva('flex items-center gap-1 overflow-x-auto', {
    variants: {
        variant: {
            underline: 'border-b border-neutral-200',
            pills: '',
            boxed: 'w-fit rounded-lg bg-neutral-100 p-1',
        },
    },
    defaultVariants: { variant: 'underline' },
})

const tabVariants = cva(
    [
        'inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2',
        'text-sm font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
        'disabled:pointer-events-none disabled:opacity-50',
    ],
    {
        variants: {
            variant: {
                underline:
                    '-mb-px border-b-2 border-transparent text-neutral-600 hover:text-neutral-900',
                pills: 'rounded-md text-neutral-600 hover:bg-neutral-100',
                boxed: 'rounded-md text-neutral-600 hover:text-neutral-900',
            },
            active: { true: '', false: '' },
        },
        // Stijl die alleen geldt voor een combinatie van variant + actief
        compoundVariants: [
            { variant: 'underline', active: true, class: 'border-brand-600 text-brand-700' },
            { variant: 'pills', active: true, class: 'bg-brand-600 text-white hover:bg-brand-600' },
            { variant: 'boxed', active: true, class: 'bg-white text-neutral-900 shadow-sm' },
        ],
        defaultVariants: { variant: 'underline', active: false },
    },
)

type TabsVariant = NonNullable<VariantProps<typeof tabListVariants>['variant']>

type TabsContextValue = {
    baseId: string
    value: string
    setValue: (value: string) => void
    variant: TabsVariant
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
    const ctx = useContext(TabsContext)
    if (!ctx) {
        throw new Error('Tab-componenten moeten binnen <Tabs> gebruikt worden')
    }
    return ctx
}

type TabsProps = Omit<ComponentProps<'div'>, 'defaultValue' | 'onChange'> & {
    /** Startwaarde (uncontrolled) */
    defaultValue?: string
    /** Actieve waarde (controlled) */
    value?: string
    onValueChange?: (value: string) => void
    variant?: TabsVariant
}

export function Tabs({
    defaultValue = '',
    value,
    onValueChange,
    variant = 'underline',
    className,
    children,
    ...props
}: TabsProps) {
    const baseId = useId()
    const [internalValue, setInternalValue] = useState(defaultValue)

    // Controlled als de ouder `value` meegeeft, anders houden we zelf state bij
    const isControlled = value !== undefined
    const current = isControlled ? value : internalValue

    const setValue = (next: string) => {
        if (!isControlled) setInternalValue(next)
        onValueChange?.(next)
    }

    return (
        <TabsContext.Provider value={{ baseId, value: current, setValue, variant }}>
            <div className={cn('w-full', className)} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    )
}

export function TabList({ className, ...props }: ComponentProps<'div'>) {
    const { variant } = useTabsContext()

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const tabs = Array.from(
            e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
        )
        const index = tabs.indexOf(document.activeElement as HTMLButtonElement)
        if (index === -1) return

        let next: number | undefined
        switch (e.key) {
            case 'ArrowRight':
                next = (index + 1) % tabs.length
                break
            case 'ArrowLeft':
                next = (index - 1 + tabs.length) % tabs.length
                break
            case 'Home':
                next = 0
                break
            case 'End':
                next = tabs.length - 1
                break
        }
        if (next === undefined) return

        e.preventDefault()
        tabs[next].focus()
        tabs[next].click() // activeert de tab direct
    }

    return (
        <div
            role="tablist"
            onKeyDown={handleKeyDown}
            className={cn(tabListVariants({ variant }), className)}
            {...props}
        />
    )
}

type TabProps = Omit<ComponentProps<'button'>, 'value'> & { value: string }

export function Tab({ value, className, onClick, ...props }: TabProps) {
    const { baseId, value: activeValue, setValue, variant } = useTabsContext()
    const active = activeValue === value

    return (
        <button
            type="button"
            role="tab"
            id={`${baseId}-tab-${value}`}
            aria-selected={active}
            aria-controls={`${baseId}-panel-${value}`}
            tabIndex={active ? 0 : -1} // "roving tabindex": alleen de actieve tab is bereikbaar met Tab
            onClick={(e) => {
                onClick?.(e)
                setValue(value)
            }}
            className={cn(tabVariants({ variant, active }), className)}
            {...props}
        />
    )
}

type TabPanelProps = ComponentProps<'div'> & { value: string }

export function TabPanel({ value, className, ...props }: TabPanelProps) {
    const { baseId, value: activeValue } = useTabsContext()
    if (activeValue !== value) return null

    return (
        <div
            role="tabpanel"
            id={`${baseId}-panel-${value}`}
            aria-labelledby={`${baseId}-tab-${value}`}
            tabIndex={0}
            className={cn(
                'py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
                className,
            )}
            {...props}
        />
    )
}