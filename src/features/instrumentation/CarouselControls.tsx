import { ChevronIcon } from "@/components/ui/icons"

type CarouselControlsProps = {
    current: number
    total: number
    progress: number // 0–1
    onPrev: () => void
    onNext: () => void
}

const pad = (n: number) => String(n).padStart(2, "0")

const buttonClass =
    "flex size-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-brand-600 motion-reduce:transition-none"

export function CarouselControls({ current, total, progress, onPrev, onNext }: CarouselControlsProps) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest tabular-nums text-ink-subtle">
                {pad(current)} / {pad(total)}
            </span>

            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div
                    className="h-full bg-brand-600 transition-[width] duration-150 motion-reduce:transition-none"
                    style={{ width: `${Math.max(8, progress * 100)}%` }} // dynamisch: voortgang
                />
            </div>

            <div className="flex gap-1.5">
                <button type="button" aria-label="Vorige" onClick={onPrev} className={buttonClass}>
                    <ChevronIcon direction="left" />
                </button>
                <button type="button" aria-label="Volgende" onClick={onNext} className={buttonClass}>
                    <ChevronIcon direction="right" />
                </button>
            </div>
        </div>
    )
}