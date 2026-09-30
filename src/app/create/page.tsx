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
import TrailerGenerator from '@/components/trailer/TrailerGenerator'
import SubtitleEditor from '@/components/subtitles/SubtitleEditor'

export default function CreatePage() {
  const [step, setStep] = useState(0)
  const steps = ['AI Director','Story Bible','Characters','Locations','Screenplay','Scenes','Shots','Voice','Music','Editor','Poster','Trailer','Subtitles']
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex gap-2 overflow-x-auto pb-4">
        {steps.map((s,i)=>(
          <button key={s} onClick={()=>setStep(i)} className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${i===step?'bg-white text-black':'bg-zinc-800'}`}>{i+1}. {s}</button>
        ))}
      </div>
      <div className="mt-6">
        {step===0 && <AIDirector />}
        {step===1 && <StoryBible />}
        {step===2 && <CharacterStudio />}
        {step===3 && <LocationStudio />}
        {step===4 && <ScreenplayEditor />}
        {step===5 && <SceneManager />}
        {step===6 && <ShotPlanner />}
        {step===7 && <VoiceStudio />}
        {step===8 && <MusicStudio />}
        {step===9 && <TimelineEditor />}
        {step===10 && <PosterGenerator />}
        {step===11 && <TrailerGenerator />}
        {step===12 && <SubtitleEditor />}
      </div>
    </div>
  )
}
