import { groupLabels } from "./skills"
import type { Skill } from "./types"
import { VerticalMeter } from "./VerticalMeter"
import { VinylDisc } from "./VinylDisc"

type ChannelCardProps = {
    skill: Skill
    index: number // voor het kanaalnummer en de animatievertraging
    active: boolean
}

export function ChannelCard({ skill, index, active }: ChannelCardProps) {
    return (
        <article
            role="meter"
            aria-label={skill.name}
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
            className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-600 motion-reduce:transition-none"
        >
            <div className="flex justify-between text-base tracking-[0.12em] uppercase">
                <span className="text-white/60">Ch {String(index + 1).padStart(2, "0")}</span>
                <span className="text-brand-600">{groupLabels[skill.group]}</span>
            </div>

            <div className="my-4 flex items-stretch gap-3">
                <VinylDisc icon={skill.icon} />
                <VerticalMeter level={skill.level} active={active} delay={index * 50} />
            </div>

            <h3 className="font-heading text-base font-bold">{skill.name}</h3>
            <p className="mt-0.5 text-base tabular-nums text-white/60">{skill.level} / 100</p>
            <p className="mt-2 text-base leading-relaxed text-white/60">{skill.note}</p>
        </article>
    )
}