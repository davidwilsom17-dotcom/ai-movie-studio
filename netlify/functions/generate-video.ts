import type { Handler } from "@netlify/functions";

const RUNWAY_API = "https://api.dev.runwayml.com/v1/text_to_video";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Origin": "*" }, body: "" };
  }
  if (event.httpMethod!== "POST") {
    return { statusCode: 405, body: "Use POST" };
  }

  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Add RUNWAY_API_KEY in Netlify environment variables" }),
    };
  }

  const { script, genre, style } = JSON.parse(event.body || "{}");
  const shots = script.split("\n").filter((s:string)=>s.trim()).slice(0,4);

  const videos = [];
  for (const shot of shots) {
    const prompt = `${shot}. Genre: ${genre}. Style: ${style}. Photorealistic cinematic real human, natural movement, no cartoon, no slideshow.`;

    const createRes = await fetch(RUNWAY_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Runway-Version": "2024-11-06",
      },
      body: JSON.stringify({ model: "gen4_turbo", promptText: prompt, ratio: "1280:720", duration: 5 }),
    });
    const task = await createRes.json();
    if (!task.id) continue;

    // Wait for video
    for (let i=0; i<40; i++) {
      await new Promise(r=>setTimeout(r,3000));
      const check = await fetch(`https://api.dev.runwayml.com/v1/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${apiKey}`, "X-Runway-Version": "2024-11-06" },
      });
      const data = await check.json();
      if (data.status === "SUCCEEDED") {
        videos.push(data.output[0]);
        break;
      }
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ videos }),
  };
};
