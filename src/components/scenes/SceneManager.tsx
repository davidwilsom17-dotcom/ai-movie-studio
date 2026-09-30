'use client'
export default function SceneManager(){
 return <div className="p-6 bg-zinc-900 rounded-xl"><h2 className="text-2xl font-bold">Scene Manager - 40 Scenes</h2><div className="mt-4 space-y-2">{[1,2,3].map(i=><div key={i} className="bg-black p-3 rounded border border-zinc-800">Scene {i}</div>)}</div></div>
}
