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
                style={{ backgroundColor: `var(${variable})` }} // dynamisch: elk token een eigen variabele
            />
            <span className="mt-1 block text-xs font-medium text-ink-muted">{label}</span>
            <span className="block truncate text-[10px] text-ink-subtle" title={value}>
                {value}
            </span>
        </div>
    )
}