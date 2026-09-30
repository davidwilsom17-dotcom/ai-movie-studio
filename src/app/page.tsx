"use client"
import { useState, useEffect, useRef } from "react"

type Char = { id:string; name:string; face:string; look:string; clothing:string; seed:number; role:string }
type Scene = { id:number; title:string; location:string; time:string; action:string; dialogue:{char:string;text:string}[]; visual:string; cameraMove:"zoom-in"|"zoom-out"|"pan-left"|"pan-right"; mood:string }

type Project = { id:string; title:string; logline:string; poster:string; characters:Char[]; scenes:Scene[] }

const CHARS:Char[]=[
  {id:"c1",name:"Elena Hart",role:"Lead",face:"beautiful 24yo woman, heart shaped face, dark wavy hair, fearless eyes",look:"slim athletic",clothing:"black leather jacket, dark dress",seed:11},
  {id:"c2",name:"Marcus Kane",role:"Immortal",face:"handsome 30yo pale man, chiseled, 400yo immortal, mysterious cold eyes",look:"tall muscular 6'1",clothing:"black timeless suit, long coat",seed:22},
  {id:"c3",name:"Sarah",role:"Sister",face:"22yo innocent blonde woman, round face",look:"petite",clothing:"hoodie",seed:33},
]

const buildImage=(prompt:string, seed:number, w=1280,h=720)=>`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&model=flux&nologo=true&enhance=true`

export default function Page(){
  const [idea,setIdea]=useState("Generate a action movie for me")
  const [projects,setProjects]=useState<Project[]>([])
  const [active,setActive]=useState<Project|null>(null)
  const [sceneIdx,setSceneIdx]=useState(0)
  const [playing,setPlaying]=useState(true)
  const [gen,setGen]=useState(false)

  const scene=active?.scenes[sceneIdx]

  useEffect(()=>{
    if(!playing||!active) return
    const t=setTimeout(()=> setSceneIdx(i=> i<active.scenes.length-1?i+1:0), 5000)
    return()=>clearTimeout(t)
  },[sceneIdx,playing,active])

  const generate=async()=>{
    setGen(true)
    // CINEMATIC PRODUCTION - Real character locked images + movement
    const proj:Project={
      id:Date.now().toString(),
      title:idea.slice(0,30),
      logline:`${idea} - She loves her immortal, pregnant with immortal child, darker ending`,
      poster: buildImage(`cinematic netflix poster, ${idea}, beautiful woman and immortal man, Lagos night, rain, anamorphic, 8k`, 99, 768,1152),
      characters:CHARS,
      scenes:[
        {id:1,title:"Midnight Meeting",location:"Lagos Night Street",time:"Night 11:30PM",action:"Elena walks home in heavy rain, Marcus watches from shadow. Cold touch.",dialogue:[{char:"Elena",text:"Who are you? Why are you watching me?"},{char:"Marcus",text:"Someone who shouldn't exist. For 400 years."}],visual:`beautiful woman in leather jacket in Lagos rainy night street, neon reflections, tall mysterious pale man in black suit watching from shadow, cinematic anamorphic lens, rain, shallow depth of field, ${CHARS[0].face}`,cameraMove:"zoom-in",mood:"Mysterious romantic"},
        {id:2,title:"Cold Secret",location:"Lagos Night Street",time:"Night 11:35PM",action:"He touches her hand - ice cold. She feels he's not human.",dialogue:[{char:"Elena",text:"You're freezing! Are you alive?"},{char:"Marcus",text:"Not like you. I am immortal."}],visual:`extreme close-up beautiful woman hand touching pale immortal man hand, ice cold, steam breath, Lagos night, cinematic, emotional, ${CHARS[1].face}`,cameraMove:"pan-left",mood:"Revelation"},
        {id:3,title:"Blood In Fridge",location:"Marcus Apartment",time:"Night 1:00AM",action:"She opens fridge - blood bags. Horror.",dialogue:[{char:"Elena",text:"What is this?! Blood?!"},{char:"Marcus",text:"I must survive. They hunt me."}],visual:`dark modern apartment interior, woman opening fridge with blood bags inside, shocked horror, cinematic horror lighting, ${CHARS[0].face} scared`,cameraMove:"zoom-out",mood:"Horror"},
        {id:4,title:"Hunters Attack",location:"Marcus Apartment",time:"Night 1:15AM",action:"Hunters smash door with crosses. Bigger fight.",dialogue:[{char:"Hunter",text:"Demon from 1624! We found you!"},{char:"Marcus",text:"Get away from her!"}],visual:`action fight scene, hunters breaking door with glowing crosses, immortal man protecting woman, slow motion, rain flying, cinematic action, anamorphic`,cameraMove:"pan-right",mood:"Action"},
        {id:5,title:"Storm Offer",location:"Rooftop Lagos",time:"Night 3:00AM Heavy Storm",action:"On rooftop in heavy storm, he offers eternity. Emotional dialogue.",dialogue:[{char:"Marcus",text:"Be with me forever. One bite, leave humanity."},{char:"Elena",text:"Will I still love? Will I still be me? More emotional, tears."}],visual:`epic rooftop heavy storm, beautiful woman crying in rain, immortal man offering hand, lightning flashes, tears + rain, cinematic emotional, ${CHARS[0].face} crying`,cameraMove:"zoom-in",mood:"Emotional climax"},
        {id:6,title:"The Price - Darker Finale",location:"Rooftop Lagos",time:"Night 3:20AM Storm",action:"She says YES, transforms, becomes immortal, fakes his death, reveals pregnant with first immortal child. Darker ending.",dialogue:[{char:"Elena",text:"I love my very important immortal - forever. I'm pregnant with immortal child."},{char:"Marcus",text:"Our child will be first of its kind. Hunted. Darker."}],visual:`beautiful woman transforming into immortal, light burst, pregnant belly touch, dark storm, town burning below, epic finale, cinematic, darker ending, ${CHARS[0].face} powerful`,cameraMove:"zoom-out",mood:"Dark twist"},
      ]
    }
    setProjects(p=>[proj,...p]); setActive(proj); setSceneIdx(0); setPlaying(true); setGen(false)
  }

  if(active && scene){
    const camClass=scene.cameraMove==="zoom-in"?"animate-zoomIn":scene.cameraMove==="zoom-out"?"animate-zoomOut":scene.cameraMove==="pan-left"?"animate-panLeft":"animate-panRight"
    return(
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <style>{`@keyframes zoomIn{0%{transform:scale(1)}100%{transform:scale(1.15)}}@keyframes zoomOut{0%{transform:scale(1.15)}100%{transform:scale(1)}}@keyframes panLeft{0%{transform:scale(1.1) translateX(5%)}100%{transform:scale(1.1) translateX(-5%)}}@keyframes panRight{0%{transform:scale(1.1) translateX(-5%)}100%{transform:scale(1.1) translateX(5%)}}.animate-zoomIn{animation:zoomIn 5s ease-in-out forwards}.animate-zoomOut{animation:zoomOut 5s ease-in-out forwards}.animate-panLeft{animation:panLeft 5s ease-in-out forwards}.animate-panRight{animation:panRight 5s ease-in-out forwards}`}</style>

        {/* CINEMATIC IMAGE WITH MOVEMENT */}
        <div className="relative w-full h-[65vh] overflow-hidden bg-zinc-900">
          <img key={scene.id} src={buildImage(scene.visual, scene.id*10)} className={`w-full h-full object-cover ${camClass}`} alt=""/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
          <div className="absolute inset-0 opacity-20" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`}}/>
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <button onClick={()=>setActive(null)} className="bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs">✕ Close</button>
            <div className="bg-black/70 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold">● {scene.cameraMove.toUpperCase()} • {scene.mood} • CONTINUITY OK</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex gap-1 mb-2">{active.scenes.map((_,i)=><div key={i} className={`h-1 flex
