"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { Karla } from "next/font/google";


const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`w-full fixed top-0 h-[65px] backdrop-blur-lg flex items-center justify-between px-4 sm:px-6 ${karla.className} z-10 backdrop-blur-md `}
    >
      {/* Logo (Left Corner) */}
      <Link href="/">
      <div className="flex-shrink-0 text-[25px] font-extrabold flex text-white ">
        <Image
          src="/logo.png"
          alt="StudyMate Logo"
          width={45}
          height={40}
          className="mr-2 mt-[-3px]"
        />
        StudyMate
      </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-[20px] absolute right-6">
        <Link href="/" className="text-white font-semibold text-[16px]  px-2 py-1 border-b-2 border-transparent hover:border-white transition-colors ease-in-out duration-200">
          Home
        </Link>

        <Link href="/summarize" className="text-white font-semibold text-[16px]  px-2 py-1 border-b-2 border-transparent hover:border-white transition-colors ease-in-out duration-200">
          Summarize
        </Link>

        <Link href="/mcq" className="text-white font-semibold text-[16px]  px-2 py-1 border-b-2 border-transparent hover:border-white transition-colors ease-in-out duration-200">
          MCQ
        </Link>

        <Link href="/explanation" className="text-white font-semibold text-[16px]  px-2 py-1 border-b-2 border-transparent hover:border-white transition-colors ease-in-out duration-200">
          Explanation
        </Link>
      </div>

      {/* Hamburger (Right Side) */}
      <div className="flex items-center gap-2 sm:gap-3">
          <TiThMenu onClick={toggleMenu} className="md:hidden"/>
      </div>

      {/* Mobile Menu (Top-Right Corner) */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:hidden flex-col absolute top-16 right-4 w-56 bg-gray-800 rounded-2xl p-4 gap-2 z-20 backdrop-blur-lg border border-gray-700 shadow-xl transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]"
        }`}
      >
        <Link
          href="/"
          className="text-gray-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/summarize"
          className="text-gray-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Summarize
        </Link>
        <Link
          href="/mcq"
          className="text-gray-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          MCQ
        </Link>
        <Link
          href="/explanation"
          className="text-gray-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Explanation
        </Link>
      </div>
    </nav>
  );
}