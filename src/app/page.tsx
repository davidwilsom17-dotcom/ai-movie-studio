"use client"
import { useState } from "react"

export default function Studio() {
  const [script, setScript] = useState(`Exterior prison yard at night - rain. A woman trapped inside looks out of window.
She runs through dark courtyard to checkpoint.
Guard blocks her at peephole, interrogates her.
She climbs balcony to escape to other side.`)
  const [style, setStyle] = useState("photorealistic real human, real skin, natural movement")
  const [genre, setGenre] = useState("horror cinematic")
  const [videos, setVideos] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)
    setVideos([])
    try {
      const res = await fetch("/.netlify/functions/generate-video", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ script, style, genre })
      })
      const data = await res.json()
      setVideos(data.videos || [])
    } catch(e){ alert("Error generating, try again") }
    setLoading(false)
  }

  return (
    <div style={{background:"#0a0a0a", color:"white", minHeight:"100vh", padding:20}}>
      <h1 style={{fontSize:28, fontWeight:900}}>🎬 WATCHABLE SCRIPT → REAL VIDEO</h1>
      <p style={{color:"#aaa"}}>Type ANY story — horror, action, prison escape. No more Elena.</p>

      <div style={{display:"flex", gap:8, margin:"15px 0"}}>
        {["horror","action","prison escape","romance"].map(g=>(
          <button key={g} onClick={()=>setGenre(g)} style={{padding:"8px 12px", borderRadius:20, background: genre===g?"#ffcc00":"#222", color: genre===g?"black":"white"}}>{g}</button>
        ))}
      </div>

      <textarea value={script} onChange={e=>setScript(e.target.value)} style={{width:"100%", height:160, background:"#111", color:"white", padding:12, borderRadius:10, border:"1px solid #333"}} placeholder="Describe what you want... woman running, guard, building..." />

      <button onClick={generate} disabled={loading} style={{width:"100%", marginTop:12, padding:16, background:"#ffcc00", color:"black", fontWeight:900, fontSize:18, borderRadius:12}}>
        {loading? "GENERATING REAL VIDEO..." : "▶ GENERATE MY VIDEO"}
      </button>

      <div style={{marginTop:20, display:"grid", gap:12}}>
        {videos.map((url,i)=>(
          <div key={i} style={{background:"#111", borderRadius:12, overflow:"hidden", border:"1px solid #222"}}>
            <img src={url} style={{width:"100%", height:220, objectFit:"cover"}} alt={`scene ${i}`} />
            <div style={{padding:8, fontSize:12, color:"#aaa"}}>Scene {i+1} • {script.split("\n")[i]?.slice(0,60) || "real human action"}</div>
          </div>
        ))}
      </div>

      {videos.length>0 && <p style={{marginTop:20, color:"#0f0"}}>✅ Done! Screen-record this page to export video for TikTok/YouTube. These images are REAL from your prompt, not Elena.</p>}
    </div>
  )
}
