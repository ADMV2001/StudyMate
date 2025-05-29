// app/api/mcq/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const {
    numMCQs,
    numAnswers,
    standard,
    answerWithNumber,
    simpleExplanations,
    pdfBase64,
  } = await req.json()

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { mcqs: "❌ Server error: missing GEMINI_API_KEY." },
      { status: 500 }
    )
  }

  // 1) Build the text prompt
  const promptLines = [
    `Generate ${numMCQs} multiple-choice questions, each with ${numAnswers} options.`,
    `Difficulty level: ${standard}.`,
    answerWithNumber
      ? "Include the correct answer label after each question."
      : "Do not include answer labels.",
    simpleExplanations
      ? "After each question, provide a brief explanation of the correct answer."
      : "No explanations required.",
  ]
  const prompt = promptLines.join("\n")

  // 2) Assemble the single content entry with parts
  const parts: any[] = [
    { text: prompt }
  ]
  if (pdfBase64) {
    parts.push({
      inlineData: {
        mimeType: "application/pdf",
        data: pdfBase64
      }
    })
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: parts
      }
    ]
  }

  try {
    // 3) Call the vision-capable Gemini model
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
    const data = await res.json()
    console.log("Gemini raw response:", JSON.stringify(data, null, 2))

    // 4) Unpack text from whichever shape came back
    const cand = data?.candidates?.[0]?.content
    const mcqs =
      cand?.text ??
      cand?.parts?.[0]?.text

    if (!mcqs) {
      return NextResponse.json(
        { mcqs: "⚠️ No MCQs generated. Check your PDF or prompt." }
      )
    }

    return NextResponse.json({ mcqs: mcqs.trim() })
  } catch (e) {
    console.error("Gemini error:", e)
    return NextResponse.json(
      { mcqs: "❌ Error contacting Gemini API." },
      { status: 500 }
    )
  }
}
