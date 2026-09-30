import type { Handler } from "@netlify/functions";

type GenerateRequest = {
script?: string;
prompt?: string;
style?: string;
genre?: string;
duration?: number;
ratio?: "1280:720" | "720:1280";
model?: string;
};

type RunwayTask = {
id?: string;
status?: string;
output?: string[];
failure?: string;
failureCode?: string;
};

const RUNWAY_API =
"https://api.dev.runwayml.com/v1/image_to_video";

const RUNWAY_VERSION = "2024-11-06";

function json(statusCode: number, body: unknown) {
return {
statusCode,
headers: {
"Content-Type": "application/json",
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Headers": "Content-Type",
"Access-Control-Allow-Methods": "POST, OPTIONS",
},
body: JSON.stringify(body),
};
}

function buildPrompt({
shot,
style,
genre,
}: {
shot: string;
style: string;
genre: string;
}) {
return [
shot,
"Genre: ${genre}",
"Visual style: ${style}",
"Photorealistic cinematic live-action film.",
"Natural human movement.",
"Natural facial expressions.",
"Physically believable body movement.",
"Realistic lighting and shadows.",
"Realistic environment physics.",
"Cinematic camera movement.",
"Detailed environment.",
"Consistent character appearance.",
"Professional film cinematography.",
"No illustration.",
"No cartoon.",
"No slideshow.",
"No static image.",
].join("\n");
}

function splitIntoShots(script: string): string[] {
return script
.split(/\n+/)
.map((line) => line.trim())
.filter((line) => line.length > 4)
.slice(0, 20);
}

async function createRunwayTask(
promptText: string,
model: string,
ratio: string,
duration: number,
apiKey: string
): Promise<RunwayTask> {
const response = await fetch(RUNWAY_API, {
method: "POST",
headers: {
Authorization: "Bearer ${apiKey}",
"Content-Type": "application/json",
"X-Runway-Version": RUNWAY_VERSION,
},
body: JSON.stringify({
model,
promptText,
ratio,
duration,
}),
});

const data = await response.json();

if (!response.ok) {
throw new Error(
data?.message ||
data?.error ||
"Runway request failed with status ${response.status}"
);
}

return data;
}

async function getRunwayTask(
taskId: string,
apiKey: string
): Promise<RunwayTask> {
const response = await fetch(
"https://api.dev.runwayml.com/v1/tasks/${taskId}",
{
method: "GET",
headers: {
Authorization: "Bearer ${apiKey}",
"X-Runway-Version": RUNWAY_VERSION,
},
}
);

const data = await response.json();

if (!response.ok) {
throw new Error(
data?.message ||
data?.error ||
"Unable to check video task ${taskId}"
);
}

return data;
}

async function waitForVideo(
taskId: string,
apiKey: string
): Promise<RunwayTask> {
const maxAttempts = 60;
const delay = 3000;

for (let attempt = 0; attempt < maxAttempts; attempt++) {
const task = await getRunwayTask(taskId, apiKey);

if (task.status === "SUCCEEDED") {
  return task;
}

if (
  task.status === "FAILED" ||
  task.status === "CANCELLED"
) {
  throw new Error(
    task.failure ||
      task.failureCode ||
      `Video generation failed with status ${task.status}`
  );
}

await new Promise((resolve) => setTimeout(resolve, delay));

}

throw new Error(
"Video generation timed out while waiting for the provider."
);
}

export const handler: Handler = async (event) => {
if (event.httpMethod === "OPTIONS") {
return json(204, {});
}

if (event.httpMethod !== "POST") {
return json(405, {
error: "Method not allowed. Use POST.",
});
}

try {
const body: GenerateRequest = JSON.parse(
event.body || "{}"
);

const script =
  body.script?.trim() ||
  body.prompt?.trim();

if (!script) {
  return json(400, {
    error: "A movie script or scene prompt is required.",
  });
}

const apiKey = process.env.RUNWAY_API_KEY;

if (!apiKey) {
  return json(500, {
    error:
      "RUNWAY_API_KEY is not configured. Add it to your Netlify environment variables.",
  });
}

const style =
  body.style?.trim() ||
  "premium cinematic realism";

const genre =
  body.genre?.trim() ||
  "cinematic drama";

const model =
  body.model ||
  "gen4.5";

const duration =
  body.duration && [5, 8, 10].includes(body.duration)
    ? body.duration
    : 5;

const ratio =
  body.ratio ||
  "1280:720";

const shots = splitIntoShots(script);

if (shots.length === 0) {
  return json(400, {
    error: "No usable shots were found in the script.",
  });
}

const results = [];

for (let index = 0; index < shots.length; index++) {
  const shot = shots[index];

  const promptText = buildPrompt({
    shot,
    style,
    genre,
  });

  try {
    const task = await createRunwayTask(
      promptText,
      model,
      ratio,
      duration,
      apiKey
    );

    if (!task.id) {
      throw new Error(
        "Runway did not return a generation task ID."
      );
    }

    const completed = await waitForVideo(
      task.id,
      apiKey
    );

    const videoUrl = completed.output?.[0];

    if (!videoUrl) {
      throw new Error(
        "Runway completed the generation but returned no video URL."
      );
    }

    results.push({
      shotNumber: index + 1,
      prompt: promptText,
      taskId: task.id,
      status: "completed",
      videoUrl,
      duration,
    });
  } catch (error) {
    results.push({
      shotNumber: index + 1,
      prompt: promptText,
      status: "failed",
      error:
        error instanceof Error
          ? error.message
          : "Unknown video generation error",
    });
  }
}

const completedVideos = results.filter(
  (result) =>
    result.status === "completed" &&
    "videoUrl" in result
);

return json(200, {
  success: true,
  projectType: "movie",
  model,
  ratio,
  durationPerShot: duration,
  totalShots: shots.length,
  completedShots: completedVideos.length,
  failedShots:
    results.length - completedVideos.length,
  shots: results,
  videos: completedVideos.map(
    (video) => video.videoUrl
  ),
});

} catch (error) {
console.error("generate-video error:", error);

return json(500, {
  success: false,
  error:
    error instanceof Error
      ? error.message
      : "Unexpected server error",
});

}
};
