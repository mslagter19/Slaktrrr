import type { Key } from "react"

export type ColorToken = {
    label: Key | null | undefined
    variable: string // bijv. "--color-brand-500"
    shade: string    // bijv. "500"
    value: string    // bijv. "#3b82f6"
}

export type ColorScale = {
    name: string // bijv. "brand"
    tokens: ColorToken[]
}

// Pakt "--color-<naam>-<getal>: <waarde>;" en onthoudt naam, getal en waarde
const COLOR_TOKEN_REGEX = /--color-([a-z]+)-(\d+)\s*:\s*([^;]+);/g

export function parseColorScales(css: string): ColorScale[] {
    // Eerst commentaar weghalen, anders worden uitgecommentarieerde kleuren ook getoond
    const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, '')

    // Een Map onthoudt de volgorde van invoegen, dus de volgorde uit het bestand blijft behouden
    const scales = new Map<string, ColorToken[]>()

    for (const match of cleanCss.matchAll(COLOR_TOKEN_REGEX)) {
        const [, name, shade, value] = match
        if (!name || !shade || !value) continue

        const tokens = scales.get(name) ?? []
        tokens.push({ variable: `--color-${name}-${shade}`, shade, label: null, value: value.trim() })
        scales.set(name, tokens)
    }

    return Array.from(scales, ([name, tokens]) => ({ name, tokens }))
}