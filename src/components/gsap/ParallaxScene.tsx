import { useRef, type ComponentProps, type ElementType } from "react"
import { gsap, useGSAP } from "../../lib/gsap"
import { useMotion } from "./Motion-context"

type ParallaxSceneProps = ComponentProps<"div"> & {
    as?: ElementType
}

/**
 * Wrapper voor LineArt (saxofoon, speelkaart, whiskeyglas...).
 * Elk kind met data-speed krijgt scrub-parallax:
 *   data-speed="0.8"   1 = beweegt mee met de pagina, <1 = trager, >1 = sneller
 *   data-rotate="3"    optioneel, draait van -3° naar +3° tijdens het scrollen (2 tot 4 is subtiel)
 *
 * Het element staat precies op zijn natuurlijke plek wanneer het midden in beeld is.
 * Op smalle schermen is het effect de helft zo sterk.
 * Tip: geef de omliggende sectie overflow-x-clip (niet overflow-hidden): dan steekt het
 * element boven/onder de sectie uit, maar ontstaat er geen horizontale scroll.
 * Met z-10 op de scene valt het niet weg achter de achtergrond van de volgende sectie.
 */
export function ParallaxScene({ as: Tag = "div", children, ...rest }: ParallaxSceneProps) {
    const ref = useRef<HTMLElement>(null)
    const { enabled } = useMotion()

    useGSAP(
        () => {
            const scene = ref.current
            if (!scene || !enabled) return

            const mm = gsap.matchMedia()

            mm.add({ wide: "(min-width: 768px)" }, (context) => {
                const strength = context.conditions?.wide ? 1 : 0.5

                scene.querySelectorAll<HTMLElement>("[data-speed]").forEach((item) => {
                    const speed = parseFloat(item.dataset.speed ?? "1")
                    const rotate = parseFloat(item.dataset.rotate ?? "0")

                    // Totale verschuiving over de scrollafstand van dit element
                    const travel = () =>
                        (1 - speed) * (window.innerHeight + item.offsetHeight) * strength

                    gsap.fromTo(
                        item,
                        { y: () => -travel() / 2, rotation: -rotate },
                        {
                            y: () => travel() / 2,
                            rotation: rotate,
                            ease: "none",
                            scrollTrigger: {
                                trigger: item,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            },
                        }
                    )
                })
            })

            return () => mm.revert()
        },
        { scope: ref, dependencies: [enabled] }
    )

    return (
        <Tag ref={ref} {...rest}>
            {children}
        </Tag>
    )
}
