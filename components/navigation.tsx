"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation({ scrollY }) {
  const [isOpen, setIsOpen] = useState(false)
  const isScrolled = scrollY > 20

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              B
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline font-serif">Breezy</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#why-breezy"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Why Breezy
            </Link>
            <Link
              href="#products"
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
              href="#impact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Impact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg">
              Shop Now
            </button>
          </div>

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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in duration-200">
            <Link
              href="#why-breezy"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
            >
              Why Breezy
            </Link>
            <Link
              href="#products"
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
              href="#impact"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
            >
              Impact
            </Link>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Shop Now
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
