"use client"
import { useState } from "react"

export default function AIDirector() {
  const [idea,setIdea]=useState("")
  const [type,setType]=useState("thriller")
  const [gen,setGen]=useState(false)
  const [r,setR]=useState<any>(null)

  const generate=()=>{
    if(!idea) return alert("Type your movie idea!")
    setGen(true)
    setTimeout(()=>{
      if(type==="thriller") setR({
        title: `${idea.toUpperCase()}: THE SHADOW`,
        format: "THRILLER SERIES - 3 EPISODES",
        eps: [
          {t:"EP 1: THE DISAPPEARANCE", p:`Detective finds clue about ${idea}. Last person who knew it vanished. Final shot: blood on wall writing "${idea}"`},
          {t:"EP 2: THE TRUTH", p:`Hero discovers ${idea} is a cover-up. Someone watching from shadows. Cliffhanger: phone rings - victim thought dead!`},
          {t:"EP 3: THE FINAL HOUR", p:`Final confrontation. Truth about ${idea} revealed. Twist: hero WAS involved. Ends with sequel hook for Season 2.`}
        ]
      })
      else if(type==="movie") setR({
        title: `${idea.toUpperCase()}: THE MOVIE`,
        format: "FULL MOVIE - 90 MIN SCRIPT",
        eps: [
          {t:"ACT 1 (0-30min) - Setup", p:`Introduce world of ${idea}. Hero's normal life destroyed by ${idea} incident.`},
          {t:"ACT 2 (30-70min) - Confrontation", p:`Hero dives into ${idea} underworld. Betrayal, car chase, love story, major twist about ${idea}.`},
          {t:"ACT 3 (70-90min) - Resolution", p:`Epic final battle centered on ${idea}. Hero wins but loses something. Post-credit scene sets up CINEGEN Universe.`}
        ]
      })
      else setR({
        title: `${idea.toUpperCase()} VIRAL`,
        format: "VIRAL VIDEO - 30 SEC",
        eps: [
          {t:"HOOK (0-3s)", p:`POV: You just discovered dark truth about ${idea}...`},
          {t:"BUILD (3-20s)", p:`Fast cuts, creepy music, text overlays about ${idea}. Tension builds.`},
          {t:"PAYOFF (20-30s)", p:`Jump scare / reveal about ${idea}. Text: "Follow for Part 2"`}
