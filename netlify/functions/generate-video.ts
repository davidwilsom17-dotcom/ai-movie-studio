import type { Handler } from "@netlify/functions"

export const handler: Handler = async (event) => {
  try {
    const { script, style, genre } = JSON.parse(event.body || "{}")

    // Split script into shots like your prison video
    const shots = script.split("\n").filter((l:string)=> l.trim().length > 4).slice(0, 12)

    const RUNWAY_KEY = process.env.RUNWAY_API_KEY

    // If you add RUNWAY_API_KEY in Netlify Env, uncomment below for REAL Veo-level MP4
    /*
    const realVideos = []
    for (const shot of shots) {
      const res = await fetch("https://api.runwayml.com/v1/image_to_video", {
        method:"POST",
        headers:{ "Authorization":`Bearer ${RUNWAY_KEY}`, "Content-Type":"application/json", "X-Runway-Version":"2024-11-06" },
        body:JSON.stringify({
          promptText: shot + ", " + style + ", real environment movement, cinematic, 8k",
          model:"gen3a_turbo",
          duration:5,
          ratio:"1280:720"
        })
      })
      const data = await res.json()
      realVideos.push(data.url)
    }
    return { statusCode:200, body:JSON.stringify({ videos: realVideos }) }
    */

    // DEMO NOW - Real moving images that feel like video (works without key)
    const demoVideos = shots.map((shot:string, i:number) => {
      const prompt = `${shot}, ${style}, ${genre}, real human, real environment, camera movement through space, cinematic 8k, photorealistic, motion`
      return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&seed=${i*17}&model=flux-realism&nologo=true&enhance=true`
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ videos: demoVideos, shots })
    }

  } catch (e:any) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) }
  }
}
