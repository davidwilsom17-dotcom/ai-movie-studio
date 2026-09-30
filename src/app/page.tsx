'use client'
import { useState } from 'react'
import AIDirector from '@/components/director/AIDirector'
import StoryBible from '@/components/story/StoryBible'
import CharacterStudio from '@/components/characters/CharacterStudio'
import LocationStudio from '@/components/locations/LocationStudio'
import ScreenplayEditor from '@/components/screenplay/ScreenplayEditor'
import SceneManager from '@/components/scenes/SceneManager'
import ShotPlanner from '@/components/shots/ShotPlanner'
import VoiceStudio from '@/components/voice/VoiceStudio'
import MusicStudio from '@/components/audio/MusicStudio'
import TimelineEditor from '@/components/editor/TimelineEditor'
import PosterGenerator from '@/components/poster/PosterGenerator'
import ExportStudio from '@/components/export/ExportStudio'

export default function Studio(){
 const [tab,setTab] = useState('director')
 const [points] = useState(1000000000000)
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
    <h1 className="font-black">CINEGEN • AI MOVIE STUDIO</h1>
    <div className="flex items-center gap-3">
     <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 py-2 rounded-full font-black text-sm animate-pulse">💎 {points.toLocaleString()} POINTS</div>
     <div className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold">DAVID WILSON • OWNER</div>
    </div>
   </header>
   <div className="flex">
    <nav className="w-64 border-r border-zinc-800 p-2 space-y-1 min-h-screen">
     {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={`w-full text-left px-4 py-3 rounded-lg text-sm ${tab===t.id?'bg-white text-black font-bold':'hover:bg-zinc-900 text-zinc-400'}`}>{t.label}</button>)}
    </nav>
    <main className="flex-1 p-6 bg-zinc-950">
     {tab==='director' && <AIDirector/>}
     {tab==='story' && <StoryBible/>}
     {tab==='characters' && <CharacterStudio/>}
     {tab==='locations' && <LocationStudio/>}
     {tab==='screenplay' && <ScreenplayEditor/>}
     {tab==='scenes' && <SceneManager/>}
     {tab==='shots' && <ShotPlanner/>}
     {tab==='voice' && <VoiceStudio/>}
     {tab==='music' && <MusicStudio/>}
     {tab==='editor' && <TimelineEditor/>}
     {tab==='poster' && <PosterGenerator/>}
     {tab==='export' && <ExportStudio/>}
    </main>
   </div>
  </div>
 )
}
