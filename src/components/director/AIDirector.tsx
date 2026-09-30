"use client"
import { useState } from "react"

export default function AIDirector() {
  const [idea, setIdea] = useState("")
  const [out, setOut] = useState("")

  const gen = () => {
    if(!idea) return alert("Type idea first!")
    setOut("THRILLER SERIES: " + idea.toUpperCase() + " - EP1 The Disappearance - A clue about " + idea + " - EP2 The Truth - Cover up revealed - EP3 Final Hour - Twist ending!")
  }

  return (
    <div className="p-4 bg-black text-white border-2 border-yellow-500 rounded-xl">
      <h2 className="text-xl font-black text-yellow-400">🔥 CINEGEN EPIC FACTORY</h2>
      <p className="text-xs text-gray-500">Type any word - get Movie + Thriller</p>
      <input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="haunted hotel, war, mafia..." className="w-full mt-3 p-3 bg-zinc-900 border border-zinc-700 rounded text-white" />
      <button onClick={gen} className="mt-3 w-full bg-yellow-500 text-black py-3 rounded font-black">GENERATE THRILLER</button>
      {out && <div className="mt-4 p-3 bg-zinc-900 rounded border border-zinc-800 text-sm">{out}</div>}
    </div>
  )
}
