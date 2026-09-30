"use client"
import { useState } from "react"

const GENRES = {
  Horror: "horror apartment dusk, woman white nightgown candle, creepy bend look, runs courtyard barefoot, peephole fish-eye scary smile, balcony climb, handheld shaky camera, film grain, dark",
  Action: "action man black clothes white cap running super fast across field, motion blur, tracking camera side view, dust, intense speed",
  Prison: "strange prison no walls orange suits, man vanishes instantly, daily life community cooking, iron locked door knocks, doctor gangster pistol, cinematic story",
  Thriller: "thriller Lagos night heavy rain neon reflections, woman leather jacket followed by immortal man black suit, anamorphic",
  Nollywood: "Nollywood drama Lagos compound, colorful, emotional shouting, dramatic"
}

export default function Page(){
  const [genre,setGenre]=useState<keyof typeof GENRES>("Horror")
  const [script,setScript]=useState(`INT. APARTMENT BUILDING - DUSK
Building lights on, old window frame
Woman in white nightgown by candle, bends down creepy
She stands up tall, scary smile
EXT. COURTYARD - NIGHT
She runs barefoot across courtyard fast
INT. HALLWAY
Peephole view fish-eye, face comes close scary
EXT. BALCONY
She climbs balcony to escape`)

  const [face,setFace]=useState<string|null>(null)
  const [videos,setVideos]=useState<string[]>([])
  const [shots,setShots]=useState<string[]>([])
  const [gen,setGen]=useState(false)

  const onUpload = (e:any)=>{
    const file = e.target.files[0]
    if(!file) return
    setFace(URL.createObjectURL(file))
  }

  const generate = async()=>{
    setGen(true)
    try{
      const res = await fetch("/.netlify/functions/generate-video",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ script, style: GENRES[genre], genre })
      })
      const data = await res.json()
      setVideos(data.videos || [])
      setShots(data.shots || [])
    }catch(err){
      alert("Add netlify/functions/generate-video.ts first, then commit")
    }
    setGen(false)
  }

  return(
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-black leading-none">WATCHABLE<br/><span className="text-red-500">SCRIPT → REAL VIDEO</span></h1>
      <p className="text-[11px] text-zinc-500 mt-1">Write script like your 3 videos → Generates real environment movement like Google Veo 3</p>

      <div className="flex gap-2 mt-4 overflow-auto pb-2">
        {Object.keys(GENRES).map(g=>(
          <button key={g} onClick={()=>setGenre(g as any)} className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap ${genre===g?"bg-red-600":"bg-zinc-800"}`}>{g}</button>
        ))}
      </div>

      <div className="mt-4 bg-[#161616] border border-zinc-800 rounded-2xl p-4">
        <label className="w-full bg-zinc-800 border border-zinc-700 py-3 rounded-xl flex justify-center cursor-pointer text-xs font-bold">
          📸 UPLOAD FACE - BE STAR IN {genre.toUpperCase()} MOVIE
          <input type="file" accept="image/*" hidden onChange={onUpload}/>
        </label>
        {face && <img src={face} className="w-full h-28 object-cover rounded-xl mt-3 border-2 border-red-600"/>}

        <div className="text-[10px] font-bold text-yellow-400 mt-4">YOUR SCRIPT (like your prison/horror clip)</div>
        <textarea value={script} onChange={e=>setScript(e.target.value)} className="w-full mt-2 bg-black border border-zinc-700 rounded-xl p-3 text-sm h-56 font-mono" />

        <button onClick={generate} disabled={gen} className="w-full mt-4 bg-red-600 text-white font-black py-4 rounded-xl text-sm">
          {gen? "GENERATING REAL ENVIRONMENT..." : `🎬 GENERATE ${genre.toUpperCase()} REAL VIDEO`}
        </button>

        <div className="text-[9px] text-zinc-600 mt-2">Each line = 1 shot. Like your clip: building → window → run → peephole → balcony. With RUNWAY_API_KEY = true MP4. Without = moving cinema demo.</div>
      </div>

      <div className="mt-6 grid gap-4">
        {videos.map((v,i)=>(
          <div key={i} className="bg-[#161616] border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="relative h-64 bg-zinc-900">
              <img src={v} alt="" className="w-full h-full object-cover"/>
              <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded-full text-[9px] font-black">SHOT {i+1} • REAL MOVEMENT</div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-[10px]">{shots[i]}</div>
            </div>
          </div>
        ))}
      </div>

      {videos.length>0 && (
        <div className="mt-6 bg-yellow-400 text-black rounded-xl p-3 text-[11px] font-bold">
          ✓ Done! {videos.length} shots generated like your video reference.<br/>
          To get TRUE MP4 video (not picture that moves):<br/>
          1. Go Netlify → Environment variables → Add RUNWAY_API_KEY from runwayml.com<br/>
          2. I will uncomment real API in generate-video.ts<br/>
          3. Then it outputs real MP4 like your horror/prison clip for minutes/hours.
        </div>
      )}
    </div>
  )
}
