export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method!== "POST") return res.status(405).json({ error: "Use POST" });

  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Add RUNWAY_API_KEY in Netlify env vars" });

  try {
    let body: any = {};
    try { body = typeof req.body === "string"? JSON.parse(req.body) : req.body; } catch { body = {}; }
    const { prompt, imageUrl, duration = 5 } = body;
    if (!imageUrl) return res.status(400).json({ error: "imageUrl required" });

    const startRes = await fetch("https://api.dev.runwayml.com/v1/image_to_video", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "X-Runway-Version": "2024-11-06", "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gen4_turbo",
        prompt_image: imageUrl,
        prompt_text: prompt || "cinematic motion",
        duration: Number(duration),
        ratio: "1280:720"
      })
    });

    const startData = await startRes.json();
    if (!startRes.ok) return res.status(500).json({ error: "Runway start failed", details: startData });

    const taskId = startData.id;
    let videoUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 4000));
      const taskRes = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
        headers: { "Authorization": `Bearer ${apiKey}`, "X-Runway-Version": "2024-11-06" }
      });
      const taskData = await taskRes.json();
      if (taskData.status === "SUCCEEDED") { videoUrl = taskData.output[0]; break; }
      if (taskData.status === "FAILED") return res.status(500).json({ error: "Runway failed", details: taskData });
    }

    if (!videoUrl) return res.status(202).json({ status: "processing", taskId });
    return res.status(200).json({ videoUrl, taskId });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
