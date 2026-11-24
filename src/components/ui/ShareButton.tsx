import { useEffect, useId, useState, type ComponentProps } from "react"
import { Button } from "./Button"
import { Tooltip } from "./Tooltip"
import { ShareIcon } from "./icons"

/*
 * Deelknop. Op apparaten met een deelmenu (vooral telefoons) opent het native menu;
 * anders gaan tekst + link naar het klembord en verschijnt een korte "Gekopieerd!"-tooltip.
 * Alle variant-props van Button werken ook hier (variant, size, radius, className...).
 */

type ButtonLook = Omit<
    Extract<ComponentProps<typeof Button>, { href?: undefined; to?: undefined }>,
    "onClick" | "children" | "type"
>

type ShareButtonProps = ButtonLook & {
    title: string
    text: string
    url: string
    label?: string
}

type Feedback = "idle" | "copied" | "failed"

const MESSAGES: Record<Exclude<Feedback, "idle">, string> = {
    copied: "Gekopieerd! Plak het waar je wilt.",
    failed: "Kopiëren lukte niet.",
}

export function ShareButton({ title, text, url, label = "Deel", ...buttonProps }: ShareButtonProps) {
    const id = useId()
    const [feedback, setFeedback] = useState<Feedback>("idle")

    // Tooltip na een paar seconden weer weg
    useEffect(() => {
        if (feedback === "idle") return
        const timer = window.setTimeout(() => setFeedback("idle"), 2500)
        return () => window.clearTimeout(timer)
    }, [feedback])

    const share = async () => {
        const data = { title, text, url }

        if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
            try {
                await navigator.share(data)
                return
            } catch (error) {
                // Zelf geannuleerd: niets doen. Andere fout: val terug op kopiëren.
                if (error instanceof DOMException && error.name === "AbortError") return
            }
        }

        try {
            await navigator.clipboard.writeText(`${text} ${url}`)
            setFeedback("copied")
        } catch {
            setFeedback("failed")
        }
    }

    const message = feedback === "idle" ? "" : MESSAGES[feedback]

    return (
        <>
            <Tooltip id={id} open={feedback !== "idle"} content={message || MESSAGES.copied}>
                <Button
                    {...buttonProps}
                    onClick={share}
                    leftIcon={<ShareIcon />}
                    aria-describedby={feedback !== "idle" ? id : undefined}
                >
                    {label}
                </Button>
            </Tooltip>

            {/* Voor schermlezers: meld het resultaat */}
            <span className="sr-only" aria-live="polite">
                {message}
            </span>
        </>
    )
}
