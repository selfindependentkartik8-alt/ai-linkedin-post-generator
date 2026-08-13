import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { topic, details, style } = body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json(
        { error: "Post topic is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert LinkedIn content strategist and professional copywriter.

Create a high-quality LinkedIn post based ONLY on the information provided by the user.

POST TOPIC:
${topic}

EXTRA DETAILS:
${details || "No additional details provided."}

CONTENT STYLE:
${style || "Professional"}

Generate exactly:

1. One LinkedIn post
2. Five relevant hashtags
3. Three short alternative opening hooks

IMPORTANT RULES:

- Do not invent facts, achievements, statistics, experiences, or personal information.
- Do not make unrealistic claims.
- Keep the post natural and human.
- Follow the requested style.
- Make the LinkedIn post easy to read.
- Use short paragraphs where appropriate.
- Avoid unnecessary explanations.
- Do not use markdown headings inside the generated post.
- Return ONLY the requested content.

Use exactly this structure:

POST

[LinkedIn post here]

HASHTAGS

1. #...
2. #...
3. #...
4. #...
5. #...

ALTERNATIVE HOOKS

1. ...
2. ...
3. ...
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    console.log("LINKEDIN AI RESPONSE:", text);

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    return NextResponse.json({
      success: true,
      result: text.trim(),
    });
  } catch (error) {
    console.error("LINKEDIN GENERATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate LinkedIn post.",
      },
      { status: 500 }
    );
  }
}