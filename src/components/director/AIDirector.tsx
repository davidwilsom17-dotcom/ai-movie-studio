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
        ]
      })
      setGen(false)
    },1500)
  }

  return (
    <div className="p-6 bg-zinc-900 rounded-xl">
      <h2 className="text-2xl font-bold">AI Director</h2>
      <p className="opacity-60 mt-2 text-sm">Describe your movie idea and I will build full production plan.</p>
      <div className="flex gap-2 mt-4">
        {["thriller","movie","viral"].map(t=>(
          <button key={t} onClick={()=>setType(t)} className={`px-3 py-1 rounded-full text-xs capitalize ${t===type?"bg-white text-black":"bg-zinc-800"}`}>{t}</button>
        ))}
      </div>
      <textarea value={idea} onChange={e=>setIdea(e.target.value)} className="w-full mt-4 bg-black border border-zinc-700 p-3 rounded-lg" rows={5} placeholder="Ex: A sci-fi thriller in Port Harcourt 2090, a detective hunts AI..." />
      <button onClick={generate} disabled={gen} className="mt-3 bg-white text-black px-6 py-2 rounded-full font-bold disabled:opacity-50">{gen?"Generating...":"Generate Plan"}</button>
      {r && (
        <div className="mt-6 space-y-3">
          <h3 className="text-xl font-bold">{r.title}</h3>
          <p className="text-xs opacity-60">{r.format}</p>
          {r.eps.map((e:any)=>(
            <div key={e.t} className="bg-black border border-zinc-700 p-3 rounded-lg">
              <p className="font-bold text-sm">{e.t}</p>
              <p className="text-sm opacity-80 mt-1">{e.p}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
