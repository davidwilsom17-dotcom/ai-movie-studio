export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method!== "POST") return res.status(405).json({ error: "Use POST" });

  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) {
    console.log("NO API KEY");
    return res.status(500).json({ error: "RUNWAY_API_KEY missing in Netlify env vars" });
  }

  try {
    const body = typeof req.body === "string"? JSON.parse(req.body) : req.body;
    console.log("Body received:", Object.keys(body));
    let { prompt, imageUrl } = body;

    // If frontend sends base64, Runway gen4_turbo accepts data URI!
    if (!imageUrl) return res.status(400).json({ error: "No imageUrl received" });

    console.log("Calling Runway...");
    const startRes = await fetch("https://api.dev.runwayml.com/v1/image_to_video", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "X-Runway-Version": "2024-11-06",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gen4_turbo",
        prompt_image: imageUrl,
        prompt_text: prompt || "cinematic motion, slow camera movement",
        duration: 5,
        ratio: "1280:720"
      })
    });

    const startData = await startRes.json();
    console.log("Runway start response:", startData);

    if (!startRes.ok) {
      return res.status(500).json({ error: "Runway error", details: startData, status: startRes.status });
    }

    const taskId = startData.id;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const taskRes = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
        headers: { "Authorization": `Bearer ${apiKey}`, "X-Runway-Version": "2024-11-06" }
      });
      const taskData = await taskRes.json();
      console.log(`Poll ${i}:`, taskData.status);
      if (taskData.status === "SUCCEEDED") {
        return res.status(200).json({ videoUrl: taskData.output[0], taskId });
      }
      if (taskData.status === "FAILED") {
        return res.status(500).json({ error: "Generation failed", details: taskData });
      }
    }
    return res.status(202).json({ status: "timeout", taskId });
  } catch (e: any) {
    console.error("Function crash:", e);
    return res.status(500).json({ error: "Server crash", details: e.message, stack: e.stack });
  }
}
