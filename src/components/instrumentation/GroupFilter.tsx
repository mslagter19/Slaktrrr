import { cn } from "../../lib/cn"
import type { SkillFilter } from "./types"

type GroupFilterProps = {
    value: SkillFilter
    options: { id: SkillFilter; label: string }[]
    onChange: (value: SkillFilter) => void
}

export function GroupFilter({ value, options, onChange }: GroupFilterProps) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter op set">
            {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    aria-pressed={value === option.id}
                    onClick={() => onChange(option.id)}
                    className={cn(
                        "rounded-full border px-3 py-1.5 text-xs transition-colors motion-reduce:transition-none",
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