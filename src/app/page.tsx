'use client'
import { useState } from 'react'

export default function Studio(){
 const [points] = useState(1000000000000)
 const [tab,setTab] = useState('director')
 const tabs = [
  {id:'director', label:'🎬 Director'},
  {id:'story', label:'📖 Story'},
  {id:'characters', label:'👤 Characters'},
  {id:'locations', label:'📍 Locations'},
  {id:'screenplay', label:'📝 Screenplay'},
  {id:'scenes', label:'🎞️ Scenes'},
  {id:'shots', label:'📸 Shots'},
  {id:'voice', label:'🎙️ Voice'},
  {id:'music', label:'🎵 Music'},
  {id:'editor', label:'✂️ Editor'},
  {id:'poster', label:'🎨 Poster'},
  {id:'export', label:'🚀 Export'},
 ]
 return (
  <div className="min-h-screen bg-black text-white">
   <header className="border-b border-zinc-800 p-4 flex justify-between items-center">
    <h1 className="font-black text-sm">CINEGEN • AI MOVIE STUDIO</h1>
    <div className="flex items-center gap-2">
     <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-black text-xs">💎 {points.toLocaleString()} POINTS</div>
     <div className="text-[10px] bg-white text-black px-2 py-1 rounded-full font-bold">DAVID WILSON • OWNER</div>
    </div>
   </header>
   <div className="flex">
    <nav className="w-44 border-r border-zinc-800 p-2 space-y-1">
     {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={`w-full text-left px-3 py-2.5 rounded-lg text-xs ${tab===t.id?'bg-white text-black font-bold':'hover:bg-zinc-900 text-zinc-400'}`}>{t.label}</button>)}
    </nav>
    <main className="flex-1 p-6 bg-zinc-950 min-h-screen">
     <h2 className="text-2xl font-bold mb-4">{tabs.find(x=>x.id===tab)?.label} Studio</h2>
     <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center">
      <p className="text-5xl mb-4">💎</p>
      <p className="text-xl font-black">{points.toLocaleString()} POINTS</p>
      <p className="text-zinc-400 mt-2 text-sm">Welcome David! Your balance: 1 Trillion Points (1000 Billion)</p>
      <p className="mt-6 text-xs text-zinc-500">Current Tab: {tab.toUpperCase()} • Ready to generate 90-min movie</p>
      <button onClick={()=>alert(`Using ${tab} - Points: ${points.toLocaleString()}`)} className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold text-sm">Generate with {tab}</button>
     </div>
    </main>
   </div>
  </div>
 )
}
