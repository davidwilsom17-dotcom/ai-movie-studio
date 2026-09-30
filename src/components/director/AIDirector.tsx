'use client'
export default function AIDirector(){
 return (
  <div className="p-6 bg-zinc-900 rounded-xl">
   <h2 className="text-2xl font-bold">AI Director</h2>
   <p className="opacity-60 mt-2 text-sm">Describe your movie idea and I will build full production plan.</p>
   <textarea className="w-full mt-4 bg-black border border-zinc-700 p-3 rounded-lg" rows={5} placeholder="Ex: A sci-fi thriller in Port Harcourt 2090, a detective hunts AI..." />
   <button className="mt-3 bg-white text-black px-6 py-2 rounded-full font-bold">Generate Plan</button>
  </div>
 )
}
