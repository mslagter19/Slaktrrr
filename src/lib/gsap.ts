// Eén plek om GSAP-plugins te registreren. Importeer gsap altijd vanuit dit bestand
// voor de motion-componenten, dan staat alles gegarandeerd geregistreerd.
// Installeren: npm i gsap @gsap/react   (SplitText en Physics2D zitten sinds gsap 3.13 gratis in het pakket)
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { Physics2DPlugin } from "gsap/Physics2DPlugin"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin, useGSAP)

export { gsap, ScrollTrigger, SplitText, Physics2DPlugin, useGSAP }
