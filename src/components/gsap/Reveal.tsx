import { useRef, type ComponentProps, type ElementType } from "react"
import { gsap, useGSAP } from "../../lib/gsap"
import { useMotion } from "./Motion-context"

type RevealProps = ComponentProps<"div"> & {
    as?: ElementType
    y?: number // 10 tot 20 voelt rustig; groter wordt snel opvallend
    stagger?: number
    delay?: number
    duration?: number
    animate?: boolean
}

/**
 * Fade + lichte beweging omhoog, met stagger.
 * - Heeft de wrapper kinderen (p, ul, kaarten...), dan verschijnen die één voor één.
 * - Heeft hij alleen tekst, dan animeert de wrapper zelf.
 * Speelt één keer af zodra het blok in beeld komt.
 */
export function Reveal({
    as: Tag = "div",
    y = 16,
    stagger = 0.08,
    delay = 0,
    duration = 0.7,
    animate = true,
    children,
    ...rest
}: RevealProps) {
    const ref = useRef<HTMLElement>(null)
    const { enabled } = useMotion()
    const active = enabled && animate

    useGSAP(
        () => {
            const el = ref.current
            if (!el || !active) return

            const kids = Array.from(el.children)
            const targets = kids.length > 0 ? kids : el

            gsap.from(targets, {
                autoAlpha: 0,
                y,
                duration,
                delay,
                stagger,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            })
        },
        { scope: ref, dependencies: [active, y, stagger, delay, duration] }
    )

    return (
        <Tag ref={ref} {...rest}>
            {children}
        </Tag>
    )
}
