import { FiFileText, FiHelpCircle, FiBook } from "react-icons/fi"
import Link from "next/link";

export default function Features() {
  return (
    <div className="px-6 md:px-12 lg:px-48 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white text-center">What you can do with StudyMate</h1>
        <p className="text-gray-300 text-center mb-12 text-lg">
          Transform your learning experience with AI-powered study tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Summarize Card */}
          <Link href="/summarize">
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-xl mb-6 group-hover:bg-blue-500/30 transition-colors duration-300">
              <FiFileText className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Summarize</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Transform lengthy documents, articles, and study materials into concise, easy-to-understand summaries that
              capture all the key points.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                Extract key concepts
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                Maintain context
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                Save study time
              </li>
            </ul>
          </div>
          </Link>

          {/* MCQs Card */}
          <Link href="/mcq">
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white border border-gray-700 hover:border-green-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-xl mb-6 group-hover:bg-green-500/30 transition-colors duration-300">
              <FiHelpCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">MCQs</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Generate intelligent multiple-choice questions from your study materials to test your understanding and
              reinforce learning.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                Auto-generated questions
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                Upload PDF Material
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                Customized output
              </li>
            </ul>
          </div>
          </Link>

          {/* Explanation Card */}
          <Link href="/explanation">
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-xl mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
              <FiBook className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Explanation</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Get detailed explanations for complex topics, breaking down difficult concepts into simple, understandable
              language.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                Step-by-step breakdown
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                Customized outputs
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                Clear understanding
              </li>
            </ul>
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
