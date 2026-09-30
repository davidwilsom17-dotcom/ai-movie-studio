import type { Handler } from "@netlify/functions";

const RUNWAY_API = "https://api.dev.runwayml.com/v1";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } };
  }
  if (event.httpMethod!== "POST") {
    return { statusCode: 405, body: "Use POST" };
  }

  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Add RUNWAY_API_KEY in Netlify env vars" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { prompt, imageUrl, duration = 5 } = body;

    if (!imageUrl) {
      return { statusCode: 400, body: JSON.stringify({ error: "imageUrl required" }) };
    }

    // Start generation
    const startRes = await fetch(`${RUNWAY_API}/image_to_video`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "X-Runway-Version": "2024-11-06",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gen4_turbo",
        prompt_image: imageUrl,
        prompt_text: prompt || "cinematic motion, subtle camera movement",
        duration: Number(duration),
        ratio: "1280:720"
      })
    });

    const startData = await startRes.json();
    if (!startRes.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: "Runway start failed", details: startData }) };
    }

    const taskId = startData.id;

    // Poll
    let videoUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 4000));
      const taskRes = await fetch(`${RUNWAY_API}/tasks/${taskId}`, {
        headers: { "Authorization": `Bearer ${apiKey}`, "X-Runway-Version": "2024-11-06" }
      });
      const taskData = await taskRes.json();
      if (taskData.status === "SUCCEEDED") {
        videoUrl = taskData.output[0];
        break;
      }
      if (taskData.status === "FAILED") {
        return { statusCode: 500, body: JSON.stringify({ error: "Runway failed", details: taskData }) };
      }
    }

    if (!videoUrl) {
      return { statusCode: 202, body: JSON.stringify({ status: "processing", taskId, message: "Video still generating, poll again with taskId" }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ videoUrl, taskId })
    };

  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
