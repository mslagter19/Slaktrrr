import { useEffect } from "react"

export function useAwayTitle(awayTitle = "Terug naar de plaat? 🎷") {
    useEffect(() => {
        let original = document.title

        const onChange = () => {
            if (document.hidden) {
                original = document.title // titel van de huidige pagina onthouden
                document.title = awayTitle
            } else {
                document.title = original // en terugzetten bij terugkomst
            }
        }

        document.addEventListener("visibilitychange", onChange)

        return () => {
            document.removeEventListener("visibilitychange", onChange)
            if (document.hidden) document.title = original
        }
    }, [awayTitle])
}