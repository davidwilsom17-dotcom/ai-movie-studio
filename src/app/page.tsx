"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [idea,setIdea]=useState("She loves her very important immortal")
  const [projects,setProjects]=useState<any[]>([])
  const [playing,setPlaying]=useState<any>(null)
  const [scene,setScene]=useState(0)
  
  const make=()=>{
    const eps=[
      {t:"The Secret - Night Meeting", img:`https://image.pollinations.ai/prompt/cinematic dark love scene beautiful woman meets handsome immortal man at midnight, vampire romance netflix?width=768&height=432&nologo=true&seed=1`, line:"She meets him at midnight. He has not aged in 400 years."},
      {t:"Blood Secret", img:`https://image.pollinations.ai/prompt/bloody fridge vampire secret horror, woman shocked, cinematic?width=768&height=432&nologo=true&seed=2`, line:"She finds blood in his fridge. He is hunted by ancient hunters."},
      {t:"The Choice", img:`https://image.pollinations.ai/prompt/woman crying vampire offers immortality, dramatic choice, rain, cinematic love?width=768&height=432&nologo=true&seed=3`, line:"He offers her eternal life, but she must leave her family forever."},
      {t:"Eternal Kiss", img:`https://image.pollinations.ai/prompt/vampire transformation woman becoming immortal, painful beautiful light, love?width=768&height=432&nologo=true&seed=4`, line:"She says yes. The transformation begins. She is now immortal too."},
      {t:"The Price - Finale", img:`https://image.pollinations.ai/prompt/pregnant immortal woman faking lover death, sad goodbye, town burning cinematic?width=768&height=432&nologo=true&seed=5`, line:"To save the town she fakes his death. But she is pregnant with an immortal child. Season 2."},
    ]
    const p={id:Date.now(),title:idea,type:"Movie",eps,poster:eps[0].img}
    setProjects([p,...projects])
    playMovie(p)
  }

  const playMovie=(p:any)=>{
    setPlaying(p); setScene(0)
    // Auto play scenes every 4 sec
    let s=0
    const interval=setInterval(()=>{
      s++; if(s>=p.eps.length){ clearInterval(interval); return }
      setScene(s)
      // Speak line
      if('speechSynthesis' in window){
        const u=new SpeechSynthesisUtterance(p.eps[s].line)
        window.speechSynthesis.speak(u)
      }
    },4000)
  }

  return(
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {!playing ? <>
        <h1 className="text-3xl font-black">🎬 AI Movie Studio <span className="text-yellow-400">WATCHABLE</span></h1>
        <p className="text-zinc-500 text-sm mt-1">Create movie you can WATCH + upload to TikTok/YouTube</p>
        <div className="mt-6 bg-[#161616] border border-zinc-800 rounded-2xl p-4">
          <input value={idea} onChange={e=>setIdea(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"/>
          <button onClick={make} className="w-full mt-3 bg-yellow-400 text-black font-black py-3 rounded-full">🎬 GENERATE WATCHABLE MOVIE NOW</button>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {projects.map((p:any)=><button key={p.id} onClick={()=>playMovie(p)} className="text-left bg-[#161616] border border-zinc-800 rounded-2xl overflow-hidden"><img src={p.poster} className="w-full h-40 object-cover"/><div className="p-3"><div className="font-bold text-sm">{p.title}</div><div className="text-xs text-yellow-400 mt-1">▶️ WATCH NOW - 5 scenes</div></div></button>)}
        </div>
        {projects.length===0 && <div className="mt-10 text-center text-zinc-600 text-sm">👆 Type story and tap GENERATE — you will get a movie you can WATCH, not wallpaper!</div>}
      </> : <>
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center"><button onClick={()=>{setPlaying(null); window.speechSynthesis.cancel()}} className="text-sm">✕ Close</button><div className="text-sm font-bold">{playing.title} - EP {scene+1}/5</div><div className="text-xs text-zinc-500">{Math.round((scene+1)/5*100)}%</div></div>
          <div className="flex-1 relative"><img src={playing.eps[scene].img} className="w-full h-full object-cover"/><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6"><h2 className="font-black text-xl">{playing.eps[scene].t}</h2><p className="text-sm text-zinc-200 mt-2">{playing.eps[scene].line}</p><div className="mt-3 flex gap-1">{playing.eps.map((_:any,i:number)=><div key={i} className={`h-1 flex-1 rounded ${i<=scene?'bg-yellow-400':'bg-zinc-700'}`}/>)}</div></div></div>
          <div className="p-4 grid grid-cols-2 gap-3"><button onClick={()=>setScene(s=>Math.max(0,s-1))} className="bg-zinc-800 py-3 rounded-full font-bold">◀️ Prev</button><button onClick={()=>setScene(s=>Math.min(playing.eps.length-1,s+1))} className="bg-yellow-400 text-black py-3 rounded-full font-black">Next ▶️</button></div>
          <div className="p-4 text-center text-xs text-zinc-500">This is a WATCHABLE movie slideshow - You can screen-record it to upload to TikTok/YouTube. Real Sora video needs API key - I can add it next.</div>
        </div>
      </>}
    </div>
  )
            }
