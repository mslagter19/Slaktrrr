// src/components/ui/form/FormField.tsx
import { useId, type ReactNode } from "react"
import { Label } from "./Label"

// Dit krijgt het veld (Input/Textarea) van FormField doorgegeven
type FieldControlProps = {
    id: string
    variant: "default" | "error"
    required?: boolean
    "aria-describedby"?: string
}

type FormFieldProps = {
    label: string
    hint?: string
    error?: string
    required?: boolean
    children: (field: FieldControlProps) => ReactNode
}

export function FormField({ label, hint, error, required, children }: FormFieldProps) {
    const id = useId()
    const hintId = `${id}-hint`
    const errorId = `${id}-error`

    // Koppel hint/fout aan het veld, zodat screenreaders die meelezen
    const describedBy =
        [error && errorId, hint && !error && hintId].filter(Boolean).join(" ") || undefined

    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id} required={required}>
                {label}
            </Label>

            {children({
                id,
                variant: error ? "error" : "default",
                required,
                "aria-describedby": describedBy,
            })}

            {error ? (
                <p id={errorId} className="text-xs text-red-600">{error}</p>
            ) : hint ? (
                <p id={hintId} className="text-xs text-slate-500">{hint}</p>
            ) : null}
        </div>
    )
}