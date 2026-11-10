import type { ReactNode } from "react"

type ShowcaseSectionProps = {
    title: string
    description?: string
    children: ReactNode
}

export function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
    return (
        <section className="mb-10">
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-6">
                {children}
            </div>
        </section>
    )
}