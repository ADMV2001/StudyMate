"use client"

import React, { useState, ChangeEvent } from "react"
import { FiCopy, FiDownload, FiTrash2, FiSettings, FiCheckSquare, FiSquare } from "react-icons/fi"
import { Karla } from "next/font/google"
import { jsPDF } from "jspdf"
import { FiHelpCircle} from "react-icons/fi"

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function MCQGeneratorPage() {
  // form state
  const [numMCQs, setNumMCQs] = useState("")
  const [numAnswers, setNumAnswers] = useState("")
  const [standard, setStandard] = useState("")
  const [answerWithNumber, setAnswerWithNumber] = useState(false)
  const [simpleExplanations, setSimpleExplanations] = useState(false)

  // PDF + result state
  const [pdfBase64, setPdfBase64] = useState("")
  const [generatedMCQs, setGeneratedMCQs] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // clear everything
  const handleClear = () => {
    setNumMCQs("")
    setNumAnswers("")
    setStandard("")
    setAnswerWithNumber(false)
    setSimpleExplanations(false)
    setPdfBase64("")
    setGeneratedMCQs("")
  }

  // read PDF as base64 (inlineData)
  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      // strip off "data:application/pdf;base64," prefix
      const base64 = dataUrl.split(",", 2)[1]
      setPdfBase64(base64)
    }
    reader.readAsDataURL(file)
  }

  // call your API route
  const handleGenerateMCQs = async () => {
    if (!numMCQs || !numAnswers || !standard) {
      alert("Please fill in all required fields")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numMCQs,
          numAnswers,
          standard,
          answerWithNumber,
          simpleExplanations,
          pdfBase64, // send inline PDF data
        }),
      })
      if (!res.ok) throw new Error("Generation failed")
      const { mcqs } = await res.json()
      setGeneratedMCQs(mcqs.trim())
    } catch (err) {
      console.error(err)
      alert("Error generating MCQs. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedMCQs) return
    try {
      await navigator.clipboard.writeText(generatedMCQs)
      alert("Copied to clipboard!")
    } catch {
      alert("Failed to copy to clipboard")
    }
  }

  const handleDownloadPDF = (): void => {
    if (!generatedMCQs) return

    // 1) Create the PDF document
    const doc = new jsPDF({ unit: "pt", format: "letter" })

    // 2) Set up margins and text wrapping
    const margin = 40
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2
    const lines: string[] = doc.splitTextToSize(generatedMCQs, pageWidth)

    // 3) Render each line, adding pages as needed
    let y = margin
    const lineHeight = 14
    lines.forEach((line: string) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage()
        y = margin
      }
      doc.text(line, margin, y)
      y += lineHeight
    })

    // 4) Export the PDF as a Blob and trigger download
    const pdfBlob = doc.output("blob")
    const url = URL.createObjectURL(pdfBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mcqs.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadTxt = (filename: string) => {
    if (!generatedMCQs) return
    const blob = new Blob([generatedMCQs], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const CustomCheckbox = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean
    onChange: (c: boolean) => void
    label: string
  }) => (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex items-center justify-center w-5 h-5 border-1 border-gray-400 rounded transition-colors hover:border-gray-600"
      >
        {checked ? (
          <FiCheckSquare className="w-4 h-4 text-blue-600" />
        ) : (
          <FiSquare className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <span className="text-xs sm:text-sm font-medium text-gray-200">{label}</span>
    </div>
  )

  return (
    <div className={`min-h-screen p-4 sm:p-6 md:p-8 pt-[80px] sm:pt-[90px] md:pt-[90px] bg-gray-800 ${karla.className}`}>
      <div className="max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiHelpCircle className="w-8 h-8 text-green-400 mt-[-8px] mr-[-6px]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">MCQ Generator</h1>
          </div> 
          
          <p className="text-sm sm:text-base md:text-lg text-gray-400">Generate MCQs from a PDF or custom settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column: Configuration */}
          <div className="bg-gray-700 rounded-lg shadow-md border border-gray-500 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <FiSettings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Configuration</h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {/* PDF Upload */}
              <div>
                <label className="block text-sm sm:text-md font-bold text-gray-200 mb-2">
                  Upload PDF
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="block w-full text-xs sm:text-sm text-gray-300
                             file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4
                             file:rounded file:border-0
                             file:text-xs sm:file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                />
                {pdfBase64 && (
                  <p className="mt-2 text-xs text-green-600">
                    PDF loaded ({Math.round((pdfBase64.length * 3) / 4 / 1024)} KB)
                  </p>
                )}
              </div>

              {/* Number of MCQs */}
              <div>
                <label className="block text-sm sm:text-md font-bold text-gray-200 mb-2">
                  Number of MCQs
                </label>
                <input
                  type="number"
                  value={numMCQs}
                  onChange={(e) => setNumMCQs(e.target.value)}
                  placeholder="e.g. 10/20/30,..."
                  className="w-full px-3 py-2 bg-gray-300 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Options per MCQ */}
              <div>
                <label className="block text-sm sm:text-md font-bold text-gray-200 mb-2">
                  Options per MCQ
                </label>
                <input
                  type="number"
                  value={numAnswers}
                  onChange={(e) => setNumAnswers(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full px-3 py-2 bg-gray-300 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm sm:text-md font-bold text-gray-200 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-300 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm sm:text-base"
                >
                  <option value="">Select level…</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                  <option value="exam-level">Exam Level</option>
                  <option value="very-hard">Very Hard</option>
                  <option value="creative">Creative</option>
                  <option value="practical">Practical</option>
                </select>
              </div>

              {/* Include answer labels */}
              <div className="text-gray-200">
                <p className="text-sm sm:text-[17px] font-bold text-gray-200 mb-2">
                  Include answer labels?
                </p>
                <div className="flex gap-4 sm:gap-6">
                  <CustomCheckbox
                    checked={answerWithNumber}
                    onChange={setAnswerWithNumber}
                    label="Yes"
                  />
                  <CustomCheckbox
                    checked={!answerWithNumber}
                    onChange={(c) => setAnswerWithNumber(!c)}
                    label="No"
                  />
                </div>
              </div>

              {/* Include explanations */}
              <div>
                <p className="text-sm sm:text-[17px] font-bold text-gray-200 mb-2">
                  Include explanations?
                </p>
                <div className="flex gap-4 sm:gap-6">
                  <CustomCheckbox
                    checked={simpleExplanations}
                    onChange={setSimpleExplanations}
                    label="Yes"
                  />
                  <CustomCheckbox
                    checked={!simpleExplanations}
                    onChange={(c) => setSimpleExplanations(!c)}
                    label="No"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Clear Configuration
                </button>
                <button
                  onClick={handleGenerateMCQs}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSettings className="w-4 h-4" />
                      Generate MCQs
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Generated MCQs */}
          <div className="bg-gray-700 rounded-lg shadow-md border border-gray-500 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <FiCheckSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Generated MCQs</h2>
            </div>
            <div className="bg-gray-600 min-h-[400px] sm:min-h-[400px] md:min-h-[500px] max-h-[60vh] overflow-y-auto p-4 border border-gray-500 rounded-md">
              {generatedMCQs ? (
                <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-200 font-mono">
                  {generatedMCQs}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs sm:text-sm">
                  <p>Upload a PDF or configure settings and click “Generate MCQs”</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-10">
              <button
                onClick={handleCopy}
                disabled={!generatedMCQs}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FiCopy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={() => handleDownloadTxt("mcqs.txt")} // Fixed filename to .txt
                disabled={!generatedMCQs}
                className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FiDownload className="w-4 h-4" />
                Download TXT
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={!generatedMCQs}
                className="flex-1 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FiDownload className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}