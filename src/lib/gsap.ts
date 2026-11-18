// Eén plek om GSAP-plugins te registreren. Importeer gsap altijd vanuit dit bestand
// voor de motion-componenten, dan staat alles gegarandeerd geregistreerd.
// Installeren: npm i gsap @gsap/react   (SplitText zit sinds gsap 3.13 gratis in het pakket)
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }