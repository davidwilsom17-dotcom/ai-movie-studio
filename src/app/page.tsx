'use client'
import { useState } from 'react'
export default function Studio(){
 const [points] = useState(1000000000000)
 const [tab,setTab]=useState('director')
 const tabs=[['director','🎬 Director'],['story','📖 Story'],['characters','👤 Characters'],['locations','📍 Locations'],['screenplay','📝 Screenplay'],['scenes','🎞️ Scenes'],['shots','📸 Shots'],['voice','🎙️ Voice'],['music','🎵 Music'],['editor','✂️ Editor'],['poster','🎨 Poster'],['export','🚀 Export']]
 return(
 <div className="min-h-screen bg-black text-white">
 <header className="border-b border-zinc-800 p-4 flex justify-between">
 <b>CINEGEN • AI STUDIO</b>
 <div className="flex gap-2"><div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full font-black text-xs">💎 {points.toLocaleString()} POINTS</div><div className="bg-white text-black px-2 py-1 rounded-full text-[10px] font-bold">DAVID WILSON • OWNER</div></div>
 </header>
 <div className="flex">
 <nav className="w-40 border-r border-zinc-800 p-2">
 {tabs.map(([id,label])=><button key={id} onClick={()=>setTab(id)} className={`w-full text-left px-3 py-2 rounded text-xs mb-1 ${tab===id?'bg-white text-black font-bold':'text-zinc-400'}`}>{label}</button>)}
 </nav>
 <main className="flex-1 p-6 bg-zinc-950 min-h-screen">
 <h2 className="text-xl font-bold mb-4">{tab.toUpperCase()} STUDIO</h2>
 <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center">
 <p className="text-5xl">💎</p><p className="font-black mt-2 text-lg">{points.toLocaleString()} POINTS</p>
 <p className="text-zinc-500 text-xs mt-2">Balance: 1 Trillion • 1000 Billion</p>
 <button onClick={()=>alert('Generating '+tab)} className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold text-xs">Generate {tab}</button>
 </div>
 </main>
 </div>
 </div>
 )
}
