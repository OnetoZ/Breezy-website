import React from "react"
import { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
})

export const metadata = {
  title: "Breezy - Herbal Comfort, Natural Confidence",
  description:
    "Experience the comfort of herbal sanitary napkins with natural protection and dignity. Breezy brings together nature and wellness for every woman.",
  generator: "v0.app",
  icons: {
    icon: "/breezy nav icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
