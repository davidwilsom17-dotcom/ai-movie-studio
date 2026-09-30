'use client'
export function AIDirector({idea}:{idea:string}){
 return <div className="bg-zinc-900 p-6 rounded-2xl mt-6">
 <h2 className="font-bold text-xl">AI Director Interpretation</h2>
 <p className="text-sm opacity-70 mt-2">Idea: {idea}</p>
 <div className="mt-4 grid gap-3 text-sm">
 <div className="bg-black p-3 rounded">Genre: African Cinematic / Epic</div>
 <div className="bg-black p-3 rounded">Logline: AI will generate logline, tone, style, cinematic direction</div>
 <div className="bg-black p-3 rounded">Duration: Feature Film 90min → Split into Shots → Scenes → Final Assembly</div>
 </div>
 <button className="mt-6 bg-white text-black px-6 py-2 rounded-full text-sm">Approve → Generate Story Bible</button>
 </div>
}
