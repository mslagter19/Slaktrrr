import { useEffect, useRef, useState, type ComponentProps } from "react"
import { gsap } from "gsap"
import { cn } from "../../lib/cn"

type CountUpProps = Omit<ComponentProps<"span">, "children"> & {
    to: number
    from?: number
    duration?: number // seconden
    delay?: number // seconden
    decimals?: number
    prefix?: string
    suffix?: string
    locale?: string // bepaalt duizendtal- en decimaalteken
    start?: "view" | "mount" // pas tellen als het element in beeld komt, of direct
}

export function CountUp({
    to,
    from = 0,
    duration = 2,
    delay = 0,
    decimals = 0,
    prefix = "",
    suffix = "",
    locale = "nl-NL",
    start = "view",
    className,
    ...rest
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null)

    const format = (value: number) =>
        prefix +
        new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value) +
        suffix

    // De zichtbare tekst begint op `from`; schermlezers krijgen altijd de eindwaarde
    const [initial] = useState(() => format(from))
    const finalText = format(to)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                motion: "(prefers-reduced-motion: no-preference)",
                reduce: "(prefers-reduced-motion: reduce)",
            },
            (ctx) => {
                // Geen animatie: toon meteen de eindwaarde
                if (ctx.conditions?.reduce) {
                    el.textContent = finalText
                    return
                }

                const counter = { value: from }
                const tween = gsap.to(counter, {
                    value: to,
                    duration,
                    delay,
                    ease: "power2.out",
                    paused: true,
                    onUpdate: () => {
                        el.textContent = format(counter.value)
                    },
                    onComplete: () => {
                        el.textContent = finalText
                    },
                })

                if (start === "mount") {
                    tween.play()
                    return () => tween.kill()
                }

                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            tween.play()
                            observer.disconnect() // één keer tellen
                        }
                    },
                    { threshold: 0.4 }
                )
                observer.observe(el)

                return () => {
                    observer.disconnect()
                    tween.kill()
                }
            }
        )

        return () => mm.revert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [to, from, duration, delay, decimals, prefix, suffix, locale, start])

    return (
        <span className={cn("tabular-nums", className)} {...rest}>
            <span ref={ref} aria-hidden="true">
                {initial}
            </span>
            <span className="sr-only">{finalText}</span>
        </span>
    )
}
