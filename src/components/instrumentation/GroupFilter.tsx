import { cn } from "../../lib/cn"

// Generiek: werkt met elke set string-id's (skills-groepen, case-categorieën, ...)
type GroupFilterProps<T extends string> = {
    value: T
    options: { id: T; label: string }[]
    onChange: (value: T) => void
    label?: string // aria-label van de groep
}

export function GroupFilter<T extends string>({ value, options, onChange, label = "Filter op set" }: GroupFilterProps<T>) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
            {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    aria-pressed={value === option.id}
                    onClick={() => onChange(option.id)}
                    className={cn(
                        "rounded-xl border px-4 py-2 text-base transition-colors motion-reduce:transition-none cursor-pointer",
                        value === option.id
                            ? "border-white bg-white text-black"
                            : "border-white/20 hover:border-brand-600"
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}
