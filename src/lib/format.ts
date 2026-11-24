// Seconden met één decimaal en een Nederlandse komma: 42.3 -> "42,3"
export const formatSeconds = (value: number) =>
    value.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
