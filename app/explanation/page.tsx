"use client"

import { useState } from "react"
import { FiCopy, FiDownload, FiTrash2, FiBook, FiList, FiFileText, FiLayers } from "react-icons/fi"
import { BiParagraph } from "react-icons/bi"
import { Karla } from "next/font/google";

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function StudyExplainer() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("pointwise")
  const [isExplaining, setIsExplaining] = useState(false)

  const formatOptions = [
    {
      id: "pointwise",
      label: "Pointwise",
      icon: <FiList className="w-4 h-4" />,
      description: "Bullet points and key highlights",
    },
    {
      id: "paragraph",
      label: "Paragraph",
      icon: <BiParagraph className="w-4 h-4" />,
      description: "Detailed paragraph format",
    },
    {
      id: "structured",
      label: "Study Note",
      icon: <FiLayers className="w-4 h-4" />,
      description: "Well-structured study notes",
    },
  ]

  const handleExplain = async (): Promise<void> => {
  if (!inputText.trim()) return

  setIsExplaining(true)

  try {
    const res = await fetch("/api/explanation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputText, selectedFormat }),
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const { explanation } = await res.json()
    setOutputText(explanation.trim())
  } catch (err) {
    console.error("Explain API error:", err)
    alert("Failed to generate explanation. Please try again.")
  } finally {
    setIsExplaining(false)
  }
}


  const handleClear = () => {
    setInputText("")
    setOutputText("")
  }

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      alert("Copied to clipboard!")
    }
  }

  const handleDownload = () => {
    if (outputText) {
      const blob = new Blob([outputText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `study-explanation-${selectedFormat}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const inputLength = inputText.length
  const outputLength = outputText.length
  const expansionRatio = inputLength > 0 ? Math.round((outputLength / inputLength) * 100) : 0

  return (
    <div className={`min-h-screen bg-gray-800 text-white p-6 pt-[90px] ${karla.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FiBook className="w-5 h-5" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold">AI Study Explainer</h1>
          </div>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
            Transform complex study materials into clear, easy-to-understand explanations using advanced AI technology.
          </p>
        </div>

        {/* Format Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Choose Explanation Format</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {formatOptions.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all ${
                  selectedFormat === format.id
                    ? "border-blue-500 bg-blue-500/20 text-blue-300"
                    : "border-gray-600 bg-gray-700 hover:border-gray-500"
                }`}
              >
                {format.icon}
                <div className="text-left">
                  <div className="font-medium">{format.label}</div>
                  <div className="text-sm text-gray-400">{format.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Input Panel */}
          <div className="bg-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiFileText className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold">Study Material</h2>
            </div>
            <p className="text-gray-400 mb-4">Enter your study material to explain</p>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text, articles, notes, or any study material here..."
              className="w-full h-80 bg-gray-600 border border-gray-500 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-500 rounded-lg transition-colors text-black"
              >
                <FiTrash2 className="w-4 h-4" />
                Clear Content
              </button>
              <button
                onClick={handleExplain}
                disabled={!inputText.trim() || isExplaining}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-black disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
              >
                {isExplaining ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Explaining...
                  </>
                ) : (
                  <>
                    <FiBook className="w-4 h-4 " />
                    Explain
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiLayers className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold">Explained Content</h2>
            </div>
            <p className="text-gray-400 mb-4">AI-generated explanation</p>

            <div className="w-full h-80 bg-gray-600 border border-gray-500 rounded-lg p-4 overflow-y-auto">
              {outputText ? (
                <pre className="text-white whitespace-pre-wrap font-sans">{outputText}</pre>
              ) : (
                <p className="text-gray-400">Your explained content will appear here.</p>
              )}
            </div>

            <div className="flex gap-3 mt-4 justify-end">
                <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                    <FiCopy className="w-4 h-4" />
                    Copy
                </button>
                <button
                    onClick={handleDownload}
                    disabled={!outputText}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                    <FiDownload className="w-4 h-4" />
                    Download
                </button>
            </div>

          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/40 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-indigo-800 mb-2">{inputLength}</div>
            <div className="text-gray-700">Characters Input</div>
          </div>
          <div className="bg-white/40 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-800 mb-2">{outputLength}</div>
            <div className="text-gray-700">Characters Output</div>
          </div>
          <div className="bg-white/40 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-800 mb-2">{expansionRatio}%</div>
            <div className="text-gray-700">Expansion Ratio</div>
          </div>
        </div>
      </div>
    </div>
  )
}
