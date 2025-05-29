import './globals.css';

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';

export const metadata = {
  title: "StudyMate",             // the <title>
  icons: {
    icon: "/logo.svg"
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body>
        <Navbar/>
        {children}
        <Footer/>
        
      </body>
    </html>
  )
}
