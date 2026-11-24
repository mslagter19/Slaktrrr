import type { RefObject } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

type NeedleWipeOptions = {
    enabled?: boolean
}

/**
 * Naald-wipe: bij hover of focus veegt het vlak [data-wipe-fill] van links naar rechts over het element,
 * als een naald die over de groef loopt. Bij verlaten veegt het rechts weer weg.
 * Indrukken geeft een korte scale-indruk.
 * - Alleen met een muis (hover + fijne pointer) en zonder prefers-reduced-motion.
 * - Zet tijdens het draaien `data-wipe` op het element, zodat CSS de tekstkleur kan laten meewisselen.
 */
export function useNeedleWipe<T extends HTMLElement>(ref: RefObject<T | null>, { enabled = true }: NeedleWipeOptions = {}) {
    useGSAP(
        () => {
            const el = ref.current
            const fill = el?.querySelector<HTMLElement>("[data-wipe-fill]")
            if (!el || !fill || !enabled) return

            const mm = gsap.matchMedia()

            mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
                gsap.set(fill, { xPercent: -101 })
                el.dataset.wipe = ""

                // Naald zakt in de groef: van links naar binnen
                const enter = () =>
                    gsap.fromTo(fill, { xPercent: -101 }, { xPercent: 0, duration: 0.45, ease: "power3.out", overwrite: true })

                // En loopt verder naar rechts weg
                const leave = () => {
                    // Niet uitvegen zolang de knop nog keyboard-focus of de cursor heeft
                    if (el.matches(":hover") || el.matches(":focus-visible")) return
                    gsap.to(fill, { xPercent: 101, duration: 0.4, ease: "power3.in", overwrite: true })
                }

                const press = () => gsap.to(el, { scale: 0.97, duration: 0.1, ease: "power2.out", overwrite: "auto" })
                const release = () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" })

                const onFocus = () => {
                    if (el.matches(":focus-visible")) enter()
                }
                const onPointerLeave = () => {
                    release()
                    leave()
                }

                el.addEventListener("pointerenter", enter)
                el.addEventListener("pointerleave", onPointerLeave)
                el.addEventListener("focus", onFocus)
                el.addEventListener("blur", leave)
                el.addEventListener("pointerdown", press)
                el.addEventListener("pointerup", release)

                return () => {
                    el.removeEventListener("pointerenter", enter)
                    el.removeEventListener("pointerleave", onPointerLeave)
                    el.removeEventListener("focus", onFocus)
                    el.removeEventListener("blur", leave)
                    el.removeEventListener("pointerdown", press)
                    el.removeEventListener("pointerup", release)
                    delete el.dataset.wipe
                }
            })

            return () => mm.revert()
        },
        { dependencies: [enabled] }
    )
}
