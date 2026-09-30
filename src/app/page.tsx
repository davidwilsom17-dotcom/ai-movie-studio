"use client"
import { useState } from "react"

export default function Page() {
  const [idea] = useState("She loves her very important immortal")

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* SIDEBAR */}
      <div className="w-56 bg-[#111] border-r border-[#222] p-4 flex flex-col">
        <h1 className="font-black text-lg">🎬 AI Movie Studio</h1>
        <button className="mt-4 bg-yellow-500 text-black font-bold py-2 rounded-full text-sm">+ New Project</button>
        <div className="mt-6 space-y-3 text-sm text-zinc-400">
          <div className="text-white font-bold">▶ Projects</div>
          <div>Assets</div>
          <div className="text-yellow-500">Director</div>
          <div>Settings</div>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-4 border-t border-zinc-800">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">W</div>
          <div className="text-xs"><div>Wisdom David</div><div className="text-zinc-500">100 credits</div></div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-zinc-500 text-sm mt-1">Manage your AI-generated movies and series</p>

        <div className="mt-6 flex gap-2">
          <button className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-bold">All</button>
          <button className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-sm">Movies</button>
          <button className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-sm">Series</button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6"><div className="text-3xl">🎬</div><div className="mt-3 font-bold">Movie</div><div className="text-xs text-zinc-500">Feature length</div></div>
          <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6"><div className="text-3xl">📺</div><div className="mt-3 font-bold">Series</div><div className="text-xs text-zinc-500">Episodic</div></div>
          <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6"><div className="text-3xl">🎞️</div><div className="mt-3 font-bold">Short Film</div><div className="text-xs text-zinc-500">Under 40 min</div></div>
          <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6"><div className="text-3xl">🎥</div><div className="mt-3 font-bold">Trailer</div><div className="text-xs text-zinc-500">Promotional</div></div>
          <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6"><div className="text-3xl">🎵</div><div className="mt-3 font-bold">Music Video</div><div className="text-xs text-zinc-500">Visual stories</div></div>
          <div className="bg-[#111] border border-dashed border-zinc-700 rounded-xl p-6 flex items-center justify-center"><div className="text-4xl text-zinc-600">+</div></div>
        </div>

        <div className="mt-12 bg-[#151515] border border-zinc-800 rounded-xl p-4 flex gap-3">
          <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">🤖</div>
          <div>
            <div className="text-sm text-zinc-400">{idea}</div>
            <div className="text-xs text-zinc-600 mt-1">The Director is reading...</div>
          </div>
        </div>
      </div>
    </div>
  )
}
