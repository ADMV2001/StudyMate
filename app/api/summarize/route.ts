import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Summarize the following:\n\n${text}` }],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data, null, 2));

    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      return NextResponse.json({
        summary: "⚠️ No summary generated. Please check input or API settings.",
      });
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Gemini summarization error:", error);
    return NextResponse.json({ summary: "❌ Error contacting Gemini API." }, { status: 500 });
  }
}
