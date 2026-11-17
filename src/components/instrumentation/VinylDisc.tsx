import type { IconType } from "react-icons"
import { cn } from "../../lib/cn"

type VinylDiscProps = {
    icon: IconType
    className?: string
}

export function VinylDisc({ icon: Icon, className }: VinylDiscProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "flex size-21 shrink-0 items-center justify-center rounded-full border border-white/10",
                "bg-[repeating-radial-gradient(circle,var(--color-black)_0_2px,#17171a_2px_4px)]",
                "group-hover:animate-[spin_6s_linear_infinite] motion-reduce:animate-none",
                className
            )}
        >
            <div className="flex size-11 items-center justify-center rounded-full bg-white text-2xl text-black">
                <Icon />
            </div>
        </div>
    )
}