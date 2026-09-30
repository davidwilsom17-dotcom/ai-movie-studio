"use client"
import { useState } from "react"

export default function TrailerGenerator() {
  const [idea, setIdea] = useState("")
  const [type, setType] = useState("thriller")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)

  const generate = () => {
    if(!idea) return alert("Type your idea!")
    setGenerating(true)
    setTimeout(() => {
      if(type === "thriller") {
        setResult({
          title: `${idea.toUpperCase()}: THE SHADOW`,
          format: "THRILLER SERIES - 3 EPISODES",
          episodes: [
            { ep: "EP 1: THE DISAPPEARANCE", plot: `Detective finds clue about ${idea}. Last person who knew it vanished. Final shot: blood on the wall writing "${idea}"` },
            { ep: "EP 2: THE TRUTH", plot: `Hero discovers ${idea} is not what it seems. It's a cover-up. Someone is watching him from shadows. CLIFFHANGER: phone rings - it's the victim thought dead.` },
            { ep: "EP 3: THE FINAL HOUR", plot: `Final confrontation. Truth about ${idea} revealed. Twist: hero WAS involved. Ends with sequel hook - new ${idea} case begins.` }
          ]
        })
      } else if(type === "movie") {
        setResult({
          title: `${idea.toUpperCase()}: THE MOVIE`,
          format: "FULL MOVIE - 90 MIN",
          episodes: [
            { ep: "ACT 1 (0-30min)", plot: `Introduce world of ${idea}. Hero's normal life destroyed by ${idea} incident.` },
            { ep: "ACT 2 (30-70min)", plot: `Hero dives deep into ${idea} underworld. Betrayal, chase, love story, major twist about ${idea}.` },
            { ep: "ACT 3 (70-90min)", plot: `Epic final battle centered on ${idea}. Hero wins but loses something. Post-credit scene sets up CINEGEN Universe.` }
          ]
        })
      } else {
        setResult({
          title: `${idea.toUpperCase()} VIRAL`,
          format: "VIRAL VIDEO - 30 SEC",
          episodes: [
            { ep: "HOOK (0-3s)", plot: `POV: You just discovered the dark truth about ${idea}...` },
            { ep: "BUILD (3-20s)", plot: `Fast cuts, creepy music, text overlays about ${idea}. Tension builds.` },
            { ep: "PAYOFF (20-30s)", plot: `Jump scare / reveal about ${idea}. Text: "Follow for Part 2"` }
          ]
        })
      }
      setGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-4 bg-black text-white rounded-xl border-2 border-yellow-500">
      <h2 className="text-2xl font-black text-yellow-400">🔥 CINEGEN EPIC FACTORY</h2>
      
      <div className="flex gap-2 my-4">
        <button onClick={()=>setType("movie")} className={`px-4 py-2 rounded font-bold ${type==="movie"?"bg-white text-black":"bg-zinc-800"}`}>🎬 MOVIE</button>
        <button onClick={()=>setType("thriller")} className={`px-4 py-2 rounded font-bold ${type==="thriller"?"bg-red-600 text-white":"bg-zinc-800"}`}>😱 THRILLER EPISODES</button>
        <button onClick={()=>setType("video")} className={`px-4 py-2 rounded font-bold ${type==="video"?"bg-cyan-500 text-black":"bg-zinc-800"}`}>📱 VIDEO</button>
      </div>

      <div className="flex gap-2">
        <input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Type idea: haunted house, mafia, love..." className="flex-1 p-3 bg-zinc-900 border border-zinc-700 rounded text-white"/>
        <button onClick={generate} className="bg-yellow-500 text-black px-6 py-3 rounded font-black">GENERATE</button>
      </div>

      {generating && <div className="text-center py-8 animate-pulse text-yellow-400 text-xl">🎬 Creating {type} about {idea}...</div>}

      {result && (
        <div className="mt-6 bg-zinc-900 p-4 rounded border border-zinc-800">
          <h3 className="text-xl font-black text-yellow-400">{result.title}</h3>
          <p className="text-xs text-red-400 font-bold mb-4">{result.format}</p>
          {result.episodes.map((e:any,i:number)=>(
            <div key={i} className="mb-3 p-3 bg-black rounded border-l-4 border-red-600">
              <p className="font-bold text-white">{e.ep}</p>
              <p className="text-sm text-gray-400 mt-1">{e.plot}</p>
            </div>
          ))}
          <button onClick={()=>alert('NEXT: I will connect real AI video (Runway/Pika) to render these episodes as REAL video files!')} className="w-full mt-4 bg-red-600 py-3 rounded font-bold">🎥 RENDER REAL VIDEO - NEXT UPGRADE</button>
        </div>
      )}
    </div>
  )
      }
