"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

type NavigationProps = {
  scrollY: number
}

export default function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isScrolled = scrollY > 20

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/70 backdrop-blur-md shadow-sm"
          : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex items-center justify-between  h-20 w-full">
          {/* LogoStart. I. And the start with. Start with. Automatic. Sriman prohibition. Baraat vande negroukerissa. Logo Chelinda Agita logo Chelka. In the bundle with a button and one and a leather. They could start with this buttons and. Rajkumar Hirani content is the remarkable game ISS hafte Ki kahani. Let me start. Tomorrow. 20 to 30% animated. India's boy ruled. Chandigarh. Vodafone. Comes to explain. From a company. I just returned. See the job. Is called from me or something? Yeah. See this was. OK. From on my birthday. Four. */}
          <div className="flex items-center min-w0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/breezy-logo.png"
                alt="Breezy"
                width={500}
                height={200}
                className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Centered desktop navigation */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <Link
              href="/#why-breezy"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Why Breezy
            </Link>
            <Link
              href="/#products"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              href="/awareness"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Awareness
            </Link>
            <Link
              href="/#impact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Impact
            </Link>
          </div>

          {/* Right side: menu button (mobile) */}
          <div className="flex items-center justify-end gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-6 bg-foreground transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${isOpen ? "opacity-0" : ""}`}></span>
                <span
                  className={`block h-0.5 w-6 bg-foreground transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in duration-200">
            <Link
              href="/#why-breezy"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
            >
              Why Breezy
            </Link>
            <Link
              href="/#products"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
            >
              Products
            </Link>
            <Link
              href="/awareness"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
            >
              Awareness
            </Link>
            <Link
              href="/#impact"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
            >
              Impact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
