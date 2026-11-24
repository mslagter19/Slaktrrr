import { useEffect, useRef, useState, type PointerEvent } from "react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/cn"
import { formatSeconds } from "@/lib/format"
import { useMotion } from "@/hooks/useMotion"
import { Button } from "@/components/ui/Button"
import { Confetti } from "@/components/brand/Confetti"
import { Flamingo } from "@/components/brand/Flamingo"
import { ShareButton } from "@/components/ui/ShareButton"
import { Vinyl } from "@/components/brand/Vinyl"

/*
 * Balans op de draaitafel: de flamingo staat op één been op een draaiende plaat.
 * Hij valt vanzelf om (instabiel evenwicht) en de plaat geeft zwiepen die groeien met het toerental.
 * Duw hem terug met muis/vinger (links of rechts van het midden), de pijltjes of door je telefoon te kantelen.
 * Niveaus: Ballad (33 RPM), na 15 s Swing (45 RPM), na 35 s Bebop (78 RPM).
 * Een nieuw record of een verslagen uitdaging (?score= in de link) geeft roze confetti.
 */

type Phase = "idle" | "playing" | "over"

const BEST_KEY = "slaktrrr:flamingo-best"
const FALL_ANGLE = 50 // graden: verder dan dit en hij valt om

const STAGES = [
    { from: 0, rpm: 33, name: "Ballad", wobble: 16 },
    { from: 15, rpm: 45, name: "Swing", wobble: 30 },
    { from: 35, rpm: 78, name: "Bebop", wobble: 52 },
] as const

type Stage = (typeof STAGES)[number]

type Result = {
    score: number
    stage: Stage
    record: "none" | "first" | "new"
    beatChallenge: boolean
}

const stageAt = (t: number): Stage => [...STAGES].reverse().find((s) => t >= s.from) ?? STAGES[0]
const clamp = (value: number, min = -1, max = 1) => Math.min(max, Math.max(min, value))

function readBest() {
    try {
        return Number(localStorage.getItem(BEST_KEY)) || 0
    } catch {
        return 0
    }
}

function saveBest(value: number) {
    try {
        localStorage.setItem(BEST_KEY, String(value))
    } catch {
        // Geen opslag beschikbaar (privévenster); het record geldt dan alleen voor nu
    }
}

type OrientationPermission = { requestPermission?: () => Promise<"granted" | "denied"> }

type BalanceGameProps = {
    challenge?: number // score uit een gedeelde link, om te verslaan
    className?: string
}

export function BalanceGame({ challenge, className }: BalanceGameProps) {
    const { enabled } = useMotion()
    const [phase, setPhase] = useState<Phase>("idle")
    const [hud, setHud] = useState<{ time: number; stage: Stage }>({ time: 0, stage: STAGES[0] })
    const [result, setResult] = useState<Result | null>(null)
    const [best, setBest] = useState(readBest)
    const [confetti, setConfetti] = useState(0)

    const recordRef = useRef<HTMLDivElement>(null)
    const flamingoRef = useRef<HTMLDivElement>(null)
    const scoreRef = useRef<HTMLParagraphElement>(null)
    const bestRef = useRef(best) // actuele waarde voor in de game-loop

    // Invoer, -1 (links) tot 1 (rechts)
    const pointerInput = useRef(0)
    const keyInput = useRef(0)
    const tiltInput = useRef(0)

    // De game-loop: alleen actief tijdens het spelen
    useEffect(() => {
        if (phase !== "playing") return
        const record = recordRef.current
        const flamingo = flamingoRef.current
        if (!record || !flamingo) return

        let t = 0
        let theta = (Math.random() < 0.5 ? -1 : 1) * 1.5 // hoek in graden, start net uit het lood
        let omega = 0 // hoeksnelheid in graden/s
        let spin = Number(gsap.getProperty(record, "rotation")) || 0
        let lastHud = 0
        let kick = 0
        let nextKick = 1.5

        gsap.set(flamingo, { rotation: theta, y: 0, transformOrigin: "50% 95%" })

        const finish = (stage: Stage) => {
            const score = Math.round(t * 10) / 10
            const previous = bestRef.current
            const record: Result["record"] = score <= previous ? "none" : previous === 0 ? "first" : "new"
            const beatChallenge = challenge !== undefined && score > challenge

            if (record !== "none") {
                bestRef.current = score
                saveBest(score)
                setBest(score)
            }
            if (record !== "none" || beatChallenge) setConfetti((n) => n + 1)

            setHud({ time: score, stage })
            setResult({ score, stage, record, beatChallenge })
            setPhase("over")
        }

        const tick = (_time: number, deltaMs: number) => {
            const dt = Math.min(deltaMs / 1000, 0.05)
            t += dt
            const stage = stageAt(t)

            // Willekeurige zwiep, af en toe, sterker bij hogere toeren
            nextKick -= dt
            if (nextKick <= 0) {
                kick = (Math.random() - 0.5) * stage.wobble * 4
                nextKick = 1 + Math.random() * 2
            }
            kick *= 1 - 3 * dt

            const wobble = stage.wobble * (Math.sin(t * 1.7) + 0.6 * Math.sin(t * 3.1 + 1)) + kick
            const input = clamp(pointerInput.current + keyInput.current + tiltInput.current)

            // Omvallen (groeit met de hoek) + zwiep van de plaat + jouw duw, met lichte demping
            const alpha = 2.4 * theta + wobble + input * 170
            omega = (omega + alpha * dt) * (1 - 0.8 * dt)
            theta += omega * dt

            spin += (stage.rpm / 60) * 360 * dt
            gsap.set(record, { rotation: spin })
            gsap.set(flamingo, { rotation: theta })

            if (t - lastHud > 0.1) {
                lastHud = t
                setHud({ time: t, stage })
            }

            if (Math.abs(theta) > FALL_ANGLE) {
                gsap.ticker.remove(tick)
                finish(stage)

                // Omvallen en de plaat laten uitlopen
                gsap.to(flamingo, { rotation: Math.sign(theta) * 100, y: 30, duration: 0.6, ease: "power2.in" })
                gsap.to(record, { rotation: spin + 240, duration: 2, ease: "power3.out" })
            }
        }

        const onKey = (event: KeyboardEvent) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
            event.preventDefault()
            if (event.type === "keyup") keyInput.current = 0
            else keyInput.current = event.key === "ArrowLeft" ? -1 : 1
        }
        const onTilt = (event: DeviceOrientationEvent) => {
            tiltInput.current = clamp((event.gamma ?? 0) / 30)
        }

        gsap.ticker.add(tick)
        window.addEventListener("keydown", onKey)
        window.addEventListener("keyup", onKey)
        window.addEventListener("deviceorientation", onTilt)

        return () => {
            gsap.ticker.remove(tick)
            window.removeEventListener("keydown", onKey)
            window.removeEventListener("keyup", onKey)
            window.removeEventListener("deviceorientation", onTilt)
        }
    }, [phase, challenge])

    const start = async () => {
        // iOS vraagt toestemming voor kantelen; dat mag alleen vanuit een klik
        const orientation = window.DeviceOrientationEvent as unknown as OrientationPermission | undefined
        if (orientation?.requestPermission) {
            try {
                await orientation.requestPermission()
            } catch {
                // Geen toestemming: spelen met vinger of pijltjes kan nog steeds
            }
        }
        pointerInput.current = 0
        keyInput.current = 0
        tiltInput.current = 0
        setHud({ time: 0, stage: STAGES[0] })
        setResult(null)
        setPhase("playing")
    }

    // Duw = afstand van de wijzer tot het midden van de plaat
    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect()
        pointerInput.current = clamp(((event.clientX - box.left) / box.width - 0.5) * 2)
    }
    const onPointerLeave = () => (pointerInput.current = 0)

    const headline = result
        ? result.record === "new"
            ? "Nieuw record!"
            : result.record === "first"
              ? "Eerste record!"
              : "Omgevallen."
        : ""

    const shareUrl = result ? `${window.location.origin}${import.meta.env.BASE_URL}experiment?score=${result.score}` : ""
    const shareText = result
        ? `Ik hield de flamingo ${formatSeconds(result.score)} s in balans en haalde ${result.stage.name} (${result.stage.rpm} RPM) 🦩 Kun jij dat verslaan?`
        : ""

    return (
        <div className={cn("mx-auto flex max-w-md flex-col items-center", className)}>
            {/* HUD */}
            <dl className="grid w-full grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 text-center">
                <div className="bg-black p-3">
                    <dt className="text-xs tracking-widest text-ink-subtle uppercase">Tijd</dt>
                    <dd className="font-heading text-2xl font-semibold tabular-nums">{formatSeconds(hud.time)}s</dd>
                </div>
                <div className="bg-black p-3">
                    <dt className="text-xs tracking-widest text-ink-subtle uppercase">Niveau</dt>
                    <dd className="font-heading text-2xl font-semibold text-brand-600 tabular-nums">{hud.stage.rpm} RPM</dd>
                    <dd className="text-xs tracking-widest text-white/60 uppercase">{hud.stage.name}</dd>
                </div>
                <div className="bg-black p-3">
                    <dt className="text-xs tracking-widest text-ink-subtle uppercase">Record</dt>
                    <dd className="font-heading text-2xl font-semibold tabular-nums">{formatSeconds(best)}s</dd>
                </div>
                {challenge !== undefined && (
                    <div className="col-span-3 bg-black px-3 py-2">
                        <dt className="inline text-xs tracking-widest text-ink-subtle uppercase">Te verslaan: </dt>
                        <dd className="inline font-heading font-semibold text-flamingo-500 tabular-nums">
                            {formatSeconds(challenge)}s
                        </dd>
                    </div>
                )}
            </dl>

            {/* Speelveld: de plaat met de flamingo op het label */}
            <div
                className="relative mt-8 aspect-square w-full touch-none select-none"
                onPointerMove={onPointerMove}
                onPointerDown={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerLeave}
                aria-hidden="true"
            >
                <div ref={recordRef} className="absolute inset-0">
                    <Vinyl alt="" trigger="none" labelText="FLAMINGO" labelSubText={`${hud.stage.rpm} RPM`} />
                </div>
                <div ref={flamingoRef} className="absolute bottom-1/2 left-1/2 w-[22%] -translate-x-1/2">
                    <Flamingo alt="" />
                </div>
            </div>

            {/* Status en knoppen */}
            <div className="mt-8 flex min-h-32 flex-col items-center gap-4 text-center" aria-live="polite">
                {phase === "idle" && (
                    <>
                        <p className="max-w-sm text-white/70">
                            Houd de flamingo op één been. Valt hij naar rechts? Duw dan naar links: beweeg je muis of
                            vinger naar die kant van de plaat, of gebruik de pijltjes.
                        </p>
                        {!enabled && (
                            <p className="max-w-sm text-sm text-ink-subtle">
                                Je hebt animaties uitgezet. Dit experiment beweegt; start alleen als je dat wilt.
                            </p>
                        )}
                        <Button size="lg" radius="lg" onClick={start}>
                            Zet de plaat op
                        </Button>
                    </>
                )}

                {phase === "playing" && (
                    <p className="text-sm text-ink-subtle">Houd vol… het toerental gaat omhoog.</p>
                )}

                {phase === "over" && result && (
                    <>
                        <p ref={scoreRef} className="font-heading text-2xl font-semibold">
                            {headline} <span className="text-brand-600">{formatSeconds(result.score)}s</span>
                            <span className="block text-sm font-normal tracking-widest text-white/60 uppercase">
                                Gehaald: {result.stage.name} · {result.stage.rpm} RPM
                            </span>
                        </p>
                        {challenge !== undefined && (
                            <p className={result.beatChallenge ? "font-semibold text-flamingo-500" : "text-white/60"}>
                                {result.beatChallenge
                                    ? "Uitdaging verslagen!"
                                    : `Nog ${formatSeconds(Math.max(0.1, challenge - result.score))} s tekort voor de uitdaging.`}
                            </p>
                        )}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Button size="lg" radius="lg" onClick={start}>
                                Nog een keer
                            </Button>
                            <ShareButton
                                title="Flamingo op 78 toeren"
                                text={shareText}
                                url={shareUrl}
                                label="Deel je score"
                                variant="outline"
                                size="lg"
                                radius="lg"
                            />
                        </div>
                        <Button to="/" variant="link" className="text-white/60 hover:text-white">
                            Terug naar home
                        </Button>
                    </>
                )}
            </div>

            <Confetti fire={confetti} originRef={scoreRef} />
        </div>
    )
}
