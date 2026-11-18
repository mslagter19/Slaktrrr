import { Button } from "../ui/Button" // pas het pad aan naar jouw Button
import { useMotion } from "./Motion-context"

export function MotionToggle() {
    const { enabled, toggle } = useMotion()

    return (
        <Button
            variant="outline"
            size="sm"
            aria-pressed={enabled}
            onClick={toggle}
        >
            Animaties: {enabled ? "aan" : "uit"}
        </Button>
    )
}
