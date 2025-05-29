'use client'

import React, { useState } from 'react'
import { Karla } from "next/font/google";
import { FiCopy } from "react-icons/fi";
import { FiFileText, FiHelpCircle, FiBook } from "react-icons/fi"

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SummarizePage() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSummarize = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
      })

      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      console.error("Failed to summarize:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInputText("")
    setSummary("")
  }

  return (
    <div className={`min-h-screen bg-gray-800 pt-[80px] sm:pt-[90px] pb-4 sm:pb-6 ${karla.className}`}>
      <div className="max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <FiFileText className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">AI Summarizer</h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-full sm:max-w-2xl mx-auto">
            Transform lengthy study materials into concise, easy-to-understand summaries using advanced AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Input Section */}
          <div className="shadow-lg bg-gray-700 backdrop-blur-sm rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-2 text-white">Study Material</h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-2">Enter your study material to summarize</p>
            <textarea
              placeholder="Paste your text, articles, notes, or any study material here..."
              className="w-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px] p-3 border border-gray-500 rounded-lg resize-none text-sm sm:text-base text-white bg-gray-600 focus:outline-none focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
              <button
                className="bg-gray-300 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300 text-sm sm:text-base"
                onClick={handleClear}
                disabled={!inputText && !summary}
              >
                Clear Content
              </button>
              <button
                className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-[120px] rounded-lg hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                onClick={handleSummarize}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </div>
                ) : (
                  "Summarize"
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="shadow-lg bg-gray-700 backdrop-blur-sm rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-2 text-white">Summarized Content</h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-2">AI-generated summary</p>
            <div className="min-h-[250px] sm:min-h-[350px] md:min-h-[400px] max-h-[50vh] p-4 border border-gray-500 rounded-md bg-gray-600 text-gray-400 text-sm sm:text-base whitespace-pre-wrap overflow-y-auto">
              {summary || "Your summarized content will appear here."}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 justify-end">
              <button
                className="bg-gray-300 text-black px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-[120px] rounded-lg flex items-center justify-center gap-1 hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(summary)
                      alert("Copied to clipboard!")
                    } catch (err) {
                      console.error("Copy failed", err)
                      alert("Failed to copy. Please try again.")
                    }
                  }}
                disabled={!summary}
              >
                <FiCopy className="w-4 h-4" />
                Copy
              </button>
              <button
                className="bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-[120px] rounded-lg hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                onClick={() => {
                  const file = new Blob([summary], { type: "text/plain" });
                  const a = document.createElement("a");
                  a.href = URL.createObjectURL(file);
                  a.download = "summary.txt";
                  a.click();
                }}
                disabled={!summary}
              >
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="text-center p-3 sm:p-4 bg-white/40 backdrop-blur-sm rounded-lg shadow">
            <div className="text-xl sm:text-2xl font-bold text-indigo-800">{inputText.length}</div>
            <div className="text-xs sm:text-sm text-gray-900">Characters Input</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white/40 backdrop-blur-sm rounded-lg shadow">
            <div className="text-xl sm:text-2xl font-bold text-green-800">{summary.length}</div>
            <div className="text-xs sm:text-sm text-gray-900">Characters Output</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white/40 backdrop-blur-sm rounded-lg shadow">
            <div className="text-xl sm:text-2xl font-bold text-purple-800">
              {inputText.length > 0
                ? `${Math.round((1 - summary.length / inputText.length) * 100)}%`
                : "0%"}
            </div>
            <div className="text-xs sm:text-sm text-gray-900">Compression Ratio</div>
          </div>
        </div>
      </div>
    </div>
  )
}