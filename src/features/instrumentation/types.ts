import type { IconType } from "react-icons"

export type SkillGroupId = "lead" | "rhythm" | "backing"

export type SkillFilter = "all" | SkillGroupId

export type Skill = {
    name: string
    level: number // 0–100
    group: SkillGroupId
    icon: IconType
    note: string
}