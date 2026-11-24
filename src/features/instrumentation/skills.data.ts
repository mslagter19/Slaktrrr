import {
    SiCss,
    SiFigma,
    SiGit,
    SiGreensock,
    SiHtml5,
    SiLaravel,
    SiMysql,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiVite,
    SiVitest,
} from "react-icons/si"
import type { Skill, SkillFilter, SkillGroupId } from "./types"

export const groupLabels: Record<SkillGroupId, string> = {
    lead: "Lead",
    rhythm: "Ritme",
    backing: "Begeleiding",
}

export const filterOptions: { id: SkillFilter; label: string }[] = [
    { id: "all", label: "Alles" },
    { id: "lead", label: groupLabels.lead },
    { id: "rhythm", label: groupLabels.rhythm },
    { id: "backing", label: groupLabels.backing },
]

export const defaultSkills: Skill[] = [
    { name: "HTML", level: 95, group: "lead", icon: SiHtml5, note: "Semantisch en toegankelijk" },
    { name: "CSS", level: 92, group: "lead", icon: SiCss, note: "Tokens en design systems" },
    { name: "Tailwind", level: 90, group: "lead", icon: SiTailwindcss, note: "Utility-first, v4 thema" },
    { name: "TypeScript", level: 85, group: "lead", icon: SiTypescript, note: "Strikte types" },
    { name: "React", level: 90, group: "lead", icon: SiReact, note: "Herbruikbare componenten" },
    { name: "GSAP", level: 75, group: "rhythm", icon: SiGreensock, note: "Animaties met karakter" },
    { name: "Vite", level: 80, group: "rhythm", icon: SiVite, note: "Snelle feedbackloop" },
    { name: "Git", level: 82, group: "rhythm", icon: SiGit, note: "Kleine, nette commits" },
    { name: "Figma", level: 70, group: "rhythm", icon: SiFigma, note: "Van ontwerp naar code" },
    { name: "Laravel", level: 62, group: "backing", icon: SiLaravel, note: "API's en Eloquent" },
    { name: "MySQL", level: 58, group: "backing", icon: SiMysql, note: "Schema's en queries" },
    { name: "Testing", level: 65, group: "backing", icon: SiVitest, note: "Vitest en Pest" },
]