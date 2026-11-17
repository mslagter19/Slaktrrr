import { Logo } from "./Logo"
import { ShowcaseSection } from "./ShowcaseSection"

export function LogoShowcase() {
    return (
        <ShowcaseSection title="Logo" description="Twee varianten, kleur via currentColor.">
            <Logo variant="slagter" className="h-10 text-brand-600" />
            <Logo variant="slaktrrr" className="h-10 text-brand-600" />
            <div className="rounded-lg bg-black p-4">
                <Logo variant="slaktrrr" className="h-10 text-white" />
            </div>
        </ShowcaseSection>
    )
}
