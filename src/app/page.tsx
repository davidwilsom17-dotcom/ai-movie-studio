"use client"
import { useState } from "react"

export default function Page() {
  const [projects, setProjects] = useState<any[]>([])
  const [idea, setIdea] = useState("She loves her very important immortal")
  const [story, setStory] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [type, setType] = useState("Movie")

  const createProject = (t:string) => {
    setType(t)
    setShowCreate(true)
  }

  const generate = () => {
    if(!idea) return
    const newProj = { id: Date.now(), title: `${idea.slice(0,20)} - ${type}`, type, idea }
    setProjects([newProj, ...projects])
    setStory(`🔥 ${type.toUpperCase()}: ${idea.toUpperCase()}\n\nLOG LINE: ${idea} - but he's immortal and she must choose between love and death.\n\nEPISODE 1: She discovers his secret. Blood doesn't age.\nEPISODE 2: She loves her very important immortal - but he is hunted.\nEPISODE 3: Final sacrifice. Does she become immortal too? SEQUEL HOOK!`)
    setShowCreate(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <div className="hidden md:flex w-60 bg-[#111] border-r border-zinc-800 p-5 flex-col">
          <div className="font-black">🎬 AI Movie Studio</div>
          <button onClick={()=>createProject('Movie')} className="mt-6 bg-yellow-400 text-black font-black py-2.5 rounded-full">+ New Project</button>
          <div className="mt-8 text-sm space-y-4 text-zinc-500">
            <div className="text-white">▶ Projects ({projects.length})</div>
            <div>Assets</div><div className="text-yellow-400">Director</div><div>Settings</div>
          </div>
          <div className="mt-auto text-xs"><div className="font-bold">Wisdom David</div><div className="text-zinc-500">100 credits • Sep 30</div></div>
        </div>

        <div className="flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center md:hidden mb-4">
            <div className="font-black">🎬 AI Movie Studio</div>
            <button onClick={()=>createProject('Movie')} className="bg-yellow-400 text-black px-4 py-1.5 rounded-full font-bold text-sm">+ New</button>
          </div>

          <h1 className="text-3xl font-black">Projects</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your AI-generated movies and series</p>

          <div className="flex gap-2 mt-5">
            <button className="bg-yellow-400 text-black px-5 py-1.5 rounded-full text-sm font-bold">All</button>
            <button className="bg-zinc-900 border border-zinc-800 px-5 py-1.5 rounded-full text-sm">Movies</button>
            <button className="bg-zinc-900 border border-zinc-800 px-5 py-1.5 rounded-full text-sm">Series</button>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              {t:"Movie", d:"Feature length films", i:"🎬"},
              {t:"Series", d:"Episodic content", i:"📺"},
              {t:"Short Film", d:"Under 40 minutes", i:"🎞️"},
              {t:"Trailer", d:"Promotional content", i:"🎥"},
              {t:"Music Video", d:"Visual stories", i:"🎵"},
            ].map((c) => (
              <button key={c.t} onClick={()=>createProject(c.t)} className="text-left bg-[#161616] hover:bg-[#1e1e1e] border border-zinc-800 rounded-2xl p-5 transition">
                <div className="text-3xl">{c.i}</div>
                <div className="mt-3 font-bold">{c.t}</div>
                <div className="text-xs text-zinc-500 mt-1">{c.d}</div>
              </button>
            ))}
            <button onClick={()=>createProject('Movie')} className="bg-transparent border-2 border-dashed border-zinc-800 rounded-2xl p-5 flex items-center justify-center">
              <div className="text-4xl text-zinc-700">+</div>
            </button>
          </div>

          {projects.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold mb-3">Your Projects ({projects.length})</h3>
              <div className="space-y-2">
                {projects.map(p=>(
                  <div key={p.id} className="bg-[#161616] border border-zinc-800 rounded-xl p-4 flex justify-between">
                    <div><div className="font-bold text-sm">{p.title}</div><div className="text-xs text-zinc-500">{p.type}</div></div>
                    <div className="text-xs text-yellow-400">READY</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 bg-[#161616] border border-zinc-800 rounded-2xl p-4">
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center">🤖</div>
              <div className="flex-1">
                <input value={idea} onChange={e=>setIdea(e.target.value)} className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg px-3 py-2 text-sm" placeholder="Describe your project..." />
                <div className="text-xs text-zinc-500 mt-2">{story ? "✅ Generated!" : "The Director is reading..."}</div>
                {story && <div className="mt-3 text-sm bg-black border border-zinc-800 rounded-xl p-3 whitespace-pre-wrap">{story}</div>}
              </div>
            </div>
            <button onClick={generate} className="w-full mt-4 bg-yellow-400 text-black font-black py-2.5 rounded-full">GENERATE WITH DIRECTOR</button>
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-black text-lg">Create {type}</h3>
            <p className="text-sm text-zinc-500 mt-1">What story do you want to tell?</p>
            <input value={idea} onChange={e=>setIdea(e.target.value)} className="w-full mt-4 bg-black border border-zinc-700 rounded-lg px-3 py-3 text-sm" placeholder="She loves her very important immortal..." autoFocus />
            <div className="flex gap-2 mt-4">
              <button onClick={()=>setShowCreate(false)} className="flex-1 bg-zinc-800 py-2.5 rounded-full text-sm">Cancel</button>
              <button onClick={generate} className="flex-1 bg-yellow-400 text-black font-black py-2.5 rounded-full text-sm">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
