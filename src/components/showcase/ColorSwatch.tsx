type ColorSwatchProps = {
    variable: string // CSS-variabele, bijv. "--color-brand-500"
    label: string    // bijv. "500"
    value: string    // de waarde uit theme.css
}

export function ColorSwatch({ variable, label, value }: ColorSwatchProps) {
    return (
        <div className="w-20 text-center">
            <div
                className="h-16 rounded-lg border border-black/5"
                style={{ backgroundColor: `var(${variable})` }}
            />
            <span className="mt-1 block text-xs font-medium text-slate-700">{label}</span>
            <span className="block truncate text-[10px] text-slate-500" title={value}>
                {value}
            </span>
        </div>
    )
}