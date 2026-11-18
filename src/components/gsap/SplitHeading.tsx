import { useRef, type ComponentProps } from "react"
import { gsap, SplitText, useGSAP } from "../../lib/gsap"
import { useMotion } from "./Motion-context"


type SplitHeadingProps = Omit<ComponentProps<"h1">, "ref"> & {
    as?: "h1" | "h2" | "h3" | "h4"
    delay?: number // seconden, handig voor de hero
    animate?: boolean // per kop uitzetten, bovenop de globale schakelaar
}

/**
 * Line-mask reveal: elke regel schuift omhoog vanachter een masker.
 * - Splitst op regels en splitst opnieuw bij resize of nadat het font geladen is (autoSplit).
 * - SplitText zet zelf aria-label op de kop, dus screenreaders lezen gewoon de hele zin.
 * - Zijn de animaties uit, dan rendert dit gewoon een normale kop.
 * Tip: geef de kop een line-height van minimaal ~1.15, anders worden descenders (g, j, y) door het masker afgeknipt.
 */
export function SplitHeading({
    as: Heading = "h2",
    delay = 0,
    animate = true,
    children,
    ...rest
}: SplitHeadingProps) {
    const ref = useRef<HTMLHeadingElement>(null)
    const { enabled } = useMotion()
    const active = enabled && animate

    useGSAP(
        () => {
            const el = ref.current
            if (!el || !active) return

            SplitText.create(el, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit(self) {
                    // De geretourneerde tween wordt bij een nieuwe split netjes teruggezet
                    return gsap.from(self.lines, {
                        yPercent: 110,
                        duration: 1,
                        ease: "power4.out",
                        stagger: 0.12,
                        delay,
                        scrollTrigger: { trigger: el, start: "top 85%", once: true },
                    })
                },
            })
        },
        { scope: ref, dependencies: [active, delay] }
    )

    return (
        <Heading ref={ref} {...rest}>
            {children}
        </Heading>
    )
}
