import { NextResponse } from "next/server"

type ReqBody = {
  inputText: string
  selectedFormat: "pointwise" | "paragraph" | "structured"
}

const FORMAT_INSTRUCTIONS: Record<ReqBody["selectedFormat"], string> = {
  pointwise: "in bullet points, highlighting key concepts and definitions",
  paragraph: "as a coherent, detailed paragraph explanation",
  structured: "as well-structured study notes with headings, sub-points, and key takeaways"
}

export async function POST(req: Request) {
  const { inputText, selectedFormat } = (await req.json()) as ReqBody
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { explanation: "❌ Server error: missing GEMINI_API_KEY." },
      { status: 500 }
    )
  }

  // Build the prompt
  const instruction = FORMAT_INSTRUCTIONS[selectedFormat]
  const prompt = `
Explain the following study material ${instruction}:

${inputText}
  `.trim()

  // Call the Gemini REST endpoint
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    )
    const data = await resp.json()
    console.log("Gemini response:", JSON.stringify(data, null, 2))

    const candidate = data?.candidates?.[0]?.content
    const explanation: string | undefined =
      candidate?.text ?? candidate?.parts?.[0]?.text

    if (!explanation) {
      return NextResponse.json(
        { explanation: "⚠️ No explanation generated. Try again." }
      )
    }
    return NextResponse.json({ explanation })
  } catch (error) {
    console.error("Gemini error:", error)
    return NextResponse.json(
      { explanation: "❌ Error contacting Gemini API." },
      { status: 500 }
    )
  }
}
