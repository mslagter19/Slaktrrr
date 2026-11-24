import { useId, useState, type FormEvent } from "react"
import { cn } from "@/lib/cn"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

/*
 * Contactformulier als concertkaartje (stijl van TicketStub, met perforatie en controlestrook).
 * Gebruikt in ContactModal én direct op de contactpagina.
 * - Verstuurt JSON naar `endpoint` (Laravel): { name, email, company, message, website }
 *   - 201/200 = verzonden
 *   - 422 met { errors: { veld: ["melding"] } } = validatiefouten bij de velden
 *   - alles anders = algemene foutmelding
 *   - `website` is een honeypot: moet leeg blijven.
 * - Met `onClose` krijgt het kaartje een kruisje en na verzenden een "Sluiten"-knop (voor de modal).
 * - `notchClassName` zet --notch op de achtergrondkleur eromheen, zodat de uitsparingen "doorzichtig" lijken.
 */

type ContactTicketProps = {
    endpoint?: string
    onClose?: () => void
    titleId?: string // id voor de kop, bv. voor aria-labelledby van de dialog
    titleAs?: "h2" | "h3"
    notchClassName?: string
    className?: string
}

type Status = "idle" | "sending" | "sent" | "error"
type FieldName = "name" | "email" | "company" | "message"
type FieldErrors = Partial<Record<FieldName, string>>

const inputClass =
    "mt-1 w-full border-0 border-b border-white/25 bg-transparent py-2 text-white placeholder:text-white/30 focus-visible:border-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"

type FieldProps = {
    label: string
    name: FieldName
    error?: string
    optional?: boolean
    multiline?: boolean
    type?: string
    autoComplete?: string
    placeholder?: string
}

function Field({ label, name, error, optional, multiline, type = "text", autoComplete, placeholder }: FieldProps) {
    const id = useId()
    const errorId = `${id}-error`

    const shared = {
        id,
        name,
        autoComplete,
        placeholder,
        required: !optional,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        className: inputClass,
    } as const

    return (
        <div>
            <label htmlFor={id} className="text-xs tracking-wider text-white/60 uppercase">
                {label}
                {optional && <span className="tracking-normal normal-case text-white/40"> (optioneel)</span>}
            </label>

            {multiline ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}

            {error && (
                <p id={errorId} className="mt-1 text-sm text-danger-500">
                    {error}
                </p>
            )}
        </div>
    )
}

export function ContactTicket({
    endpoint = "/api/contact",
    onClose,
    titleId,
    titleAs: Title = "h3",
    notchClassName = "[--notch:var(--color-black)]",
    className,
}: ContactTicketProps) {
    const fallbackId = useId()
    const headingId = titleId ?? fallbackId

    const [status, setStatus] = useState<Status>("idle")
    const [errors, setErrors] = useState<FieldErrors>({})
    const [sentName, setSentName] = useState("")

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // currentTarget is na een await niet meer beschikbaar, dus nu vastleggen
        const form = event.currentTarget
        const data = Object.fromEntries(new FormData(form)) as Record<string, string>

        setStatus("sending")
        setErrors({})

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(data),
            })

            if (response.status === 422) {
                const body = (await response.json()) as { errors?: Record<string, string[]> }
                const next: FieldErrors = {}
                for (const [field, messages] of Object.entries(body.errors ?? {})) {
                    next[field as FieldName] = messages[0]
                }
                setErrors(next)
                setStatus("idle")
                return
            }

            if (!response.ok) throw new Error(`HTTP ${response.status}`)

            setSentName(data.name?.split(" ")[0] ?? "")
            form.reset()
            setStatus("sent")
        } catch {
            setStatus("error")
        }
    }

    return (
        <article
            aria-labelledby={headingId}
            className={cn(
                "relative flex flex-col overflow-hidden rounded-xl border border-white/15 bg-[#141417] text-white sm:flex-row",
                notchClassName,
                className
            )}
        >
            {/* Hoofdgedeelte */}
            <div className="relative flex flex-1 flex-col gap-6 p-6 sm:p-8">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Sluiten"
                        className="absolute top-4 right-4 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transition-none"
                    >
                        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
                            <path d="M3 3l10 10M13 3L3 13" />
                        </svg>
                    </button>
                )}

                <div className={onClose ? "pr-10" : undefined}>
                    <Badge
                        variant="outline"
                        size="xs"
                        radius="full"
                        className="hover:bg-transparent"
                    >
                        Gastenlijst
                    </Badge>
                    <Title id={headingId} className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">
                        Stel je vraag
                    </Title>
                    <p className="mt-1 text-white/70">
                        Vertel kort waar je mee zit. Je krijgt zo snel mogelijk antwoord.
                    </p>
                </div>

                {status === "sent" ? (
                    <div role="status" aria-live="polite" className="flex flex-1 flex-col items-start justify-center gap-5 py-6">
                        <p className="-rotate-6 border-2 border-brand-600 px-4 py-2 font-heading text-2xl font-semibold tracking-widest text-brand-600 uppercase">
                            Verzonden
                        </p>
                        <p className="max-w-prose text-white/80">
                            {sentName ? `Bedankt ${sentName}, ` : "Bedankt, "}
                            je bericht is aangekomen. Ik antwoord zo snel mogelijk.
                        </p>
                        {onClose ? (
                            <Button variant="outline" size="sm" onClick={onClose}>
                                Sluiten
                            </Button>
                        ) : (
                            <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
                                Nog een bericht
                            </Button>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Naam" name="name" autoComplete="name" error={errors.name} />
                            <Field label="E-mail" name="email" type="email" autoComplete="email" error={errors.email} />
                        </div>

                        <Field label="Bedrijf" name="company" autoComplete="organization" optional error={errors.company} />
                        <Field label="Je vraag" name="message" multiline error={errors.message} />

                        {/* Honeypot: bezoekers zien dit niet, spam-bots vullen het wel in */}
                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        />

                        {status === "error" && (
                            <p role="alert" className="text-sm text-danger-500">
                                Versturen is niet gelukt. Probeer het later nog eens.
                            </p>
                        )}

                        <div className="flex items-center gap-4">
                            <Button type="submit" size="lg" disabled={status === "sending"} className="rounded-full">
                                {status === "sending" ? "Versturen…" : "Verstuur"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>

            {/* Controlestrook: puur decoratief */}
            <div
                aria-hidden="true"
                className="relative flex shrink-0 items-center justify-between gap-4 border-t border-dashed border-white/25 p-6 sm:w-44 sm:flex-col sm:items-stretch sm:justify-between sm:border-t-0 sm:border-l"
            >
                {/* Uitsparingen op de perforatielijn */}
                <span className="absolute -top-3 -left-3 size-6 rounded-full border border-white/15 bg-(--notch)" />
                <span className="absolute -top-3 -right-3 size-6 rounded-full border border-white/15 bg-(--notch) sm:top-auto sm:right-auto sm:-bottom-3 sm:-left-3" />

                <div>
                    <p className="font-heading text-2xl font-semibold tracking-wide text-brand-600 uppercase">Admit one</p>
                    <p className="mt-1 text-sm text-white/60">Nr. 001</p>
                </div>

                {/* Streepjescode */}
                <div className="h-10 w-24 opacity-40 sm:w-full bg-[repeating-linear-gradient(90deg,var(--color-white)_0_2px,transparent_2px_5px,var(--color-white)_5px_6px,transparent_6px_10px)]" />
            </div>
        </article>
    )
}
