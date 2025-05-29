'use client';

import React from 'react';
import { Karla } from "next/font/google";
import Features from '@/components/Features';

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Navbar() {
  return (
    <div className={`${karla.className} w-full min-h-screen bg-gray-800 text-black`}>
      
      {/* 🔹 Hero section with background image */}
      <div
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/back-image2.jpg')" }}
      >
        {/* Overlay text or styling */}
        <div className="h-full w-full bg-black bg-opacity-70 flex items-center justify-center text-white relative">
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
            <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-[50px] font-extrabold">
              Welcome to StudyMate
            </h1>
            <p className="text-white text-md sm:text-base md:text-lg lg:text-[20px] pt-3 sm:pt-4 md:pt-5 px-2 sm:px-3 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[600px]">
              StudyMate is your personal AI-powered study assistant. Paste your 
              textbook content or notes, and let our smart system help you learn better, whether you want a quick summary, simplified 
              explanations, or a set of multiple-choice questions to test your knowledge.
            </p>
          </div>
        </div>
      </div>

      <Features/>
    </div>
  );
}

export default Navbar;