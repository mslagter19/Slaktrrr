import { Button } from "../components/ui/Button"

type StatusPageProps = {
    code: string
    title: string
    text: string
    action: React.ReactNode
}

function StatusPage({ code, title, text, action }: StatusPageProps) {
    return (
        <section className="flex min-h-[80dvh] flex-col items-center justify-center gap-4 bg-black px-6 pb-28 text-center text-white">
            <p className="font-heading text-8xl font-bold text-brand-600">{code}</p>
            <h1 className="font-heading text-2xl">{title}</h1>
            <p className="max-w-md text-white/70">{text}</p>
            <div className="mt-2">{action}</div>
        </section>
    )
}

export function NotFoundPage() {
    return (
        <StatusPage
            code="404"
            title="Dit nummer staat niet op de plaat"
            text="De naald sprong over deze track. Deze pagina bestaat niet (meer)."
            action={<Button to="/">Terug naar de intro</Button>}
        />
    )
}

export function ErrorPage() {
    return (
        <StatusPage
            code="500"
            title="Even krassen op de plaat"
            text="Er ging iets mis. Probeer het opnieuw."
            action={
                <Button onClick={() => window.location.assign(import.meta.env.BASE_URL)}>
                    Opnieuw proberen
                </Button>
            }
        />
    )
}