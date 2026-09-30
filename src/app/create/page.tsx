'use client'
import { useState } from 'react'
import { AIDirector } from '@/components/director/AIDirector'
export default function Create(){
 const [idea,setIdea]=useState('')
 const [showDirector,setShowDirector]=useState(false)
 return <div className="min-h-screen bg-black p-6">
 <h1 className="text-3xl font-bold">Create — Type or Speak Your Idea</h1>
 {!showDirector ? <>
 <textarea value={idea} onChange={e=>setIdea(e.target.value)} placeholder="e.g. A Nigerian superhero who controls lightning in Lagos..." className="w-full mt-6 bg-zinc-900 p-4 rounded-2xl h-32"/>
 <button onClick={()=>setShowDirector(true)} className="mt-4 bg-white text-black px-6 py-2 rounded-full">Run AI Director</button>
 </> : <AIDirector idea={idea}/>}
 </div>
}
