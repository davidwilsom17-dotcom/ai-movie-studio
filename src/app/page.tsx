import Link from 'next/link'
export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-black tracking-tighter">AI MOVIE STUDIO</h1>
      <p className="opacity-60 mt-4 max-w-xl">Feature Films 90min from idea → AI Director → Shot-by-shot Generation → Final Assembly → Export</p>
      <Link href="/create" className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold">Create Movie →</Link>
    </div>
  )
}
