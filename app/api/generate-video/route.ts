import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RUNWAY_API_KEY missing in Netlify" }, { status: 500 });
  }

  try {
    const body = await req.json();
    let { prompt, imageUrl } = body;
    if (!imageUrl) return NextResponse.json({ error: "No imageUrl" }, { status: 400 });

    const startRes = await fetch("https://api.dev.runwayml.com/v1/image_to_video", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "X-Runway-Version": "2024-11-06",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gen4_turbo",
        prompt_image: imageUrl,
        prompt_text: prompt || "cinematic motion",
        duration: 5,
        ratio: "1280:720",
      }),
    });

    const startData = await startRes.json();
    if (!startRes.ok) {
      return NextResponse.json({ error: "Runway start failed", details: startData }, { status: 500 });
    }

    const taskId = startData.id;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      const taskRes = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
        headers: { "Authorization": `Bearer ${apiKey}`, "X-Runway-Version": "2024-11-06" },
      });
      const taskData = await taskRes.json();
      if (taskData.status === "SUCCEEDED") {
        return NextResponse.json({ videoUrl: taskData.output[0], taskId }, {
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      }
      if (taskData.status === "FAILED") {
        return NextResponse.json({ error: "Generation failed", details: taskData }, { status: 500 });
      }
    }
    return NextResponse.json({ status: "timeout", taskId }, { status: 202 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
