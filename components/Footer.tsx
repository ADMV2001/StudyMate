import { FiLinkedin, FiGithub, FiMail, FiHeart } from "react-icons/fi"
import { FaHandHoldingHeart } from "react-icons/fa";
import { Karla } from "next/font/google";


const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <footer className={` ${karla.className} bg-gradient-to-t from-black via-gray-900 to-gray-800 border-t border-gray-700`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-48 py-12">
        <div className="flex flex-col items-center space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-4">StudyMate</h3>
            <p className="text-gray-300 mb-6 w-[400px] leading-relaxed">
              Transform your learning experience with AI-powered study tools. Summarize content, generate MCQs, and get
              detailed explanations to accelerate your learning journey.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.linkedin.com/in/minula-vihanga-9031b4293/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
              >
                <FiLinkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </a>
              <a
                href="https://github.com/ADMV2001"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl border border-gray-600 hover:border-gray-400 hover:bg-gray-700 transition-all duration-300"
              >
                <FiGithub className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="mailto:minulavihanga70@gmail.com"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-xl border border-gray-600 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
              >
                <FiMail className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:justify-self-center md:items-start md:ml-40 ">
            <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-4">
              <li>
                <a href="/summarize" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Summarize
                </a>
              </li>
              <li>
                <a href="/mcq" className="text-gray-400 hover:text-white transition-colors duration-300">
                  MCQs
                </a>
              </li>
              <li>
                <a href="/explanation" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Explanation
                </a>
              </li>
            </ul>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-end md:justify-start justify-center order-last md:order-none">
            <div className="rounded-2xl p-6 border border-gray-600">
              <img
                src="/logo.png?height=140&width=140"
                alt="Studywise Logo"
                className="w-24 h-24 md:w-28 md:h-28 object-contain filter brightness-110"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>Made with</span>
              <FaHandHoldingHeart className="w-4 h-4 text-red-600 mx-2" />
              <span>by Minula Vihanga</span>
            </div>
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} StudyMate. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
