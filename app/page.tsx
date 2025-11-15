"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import WhyBreezy from "@/components/why-breezy"
import ProductShowcase from "@/components/product-showcase"
import ImpactStory from "@/components/impact-story"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="overflow-hidden">
      <Navigation scrollY={scrollY} />
      <Hero />
      <WhyBreezy />
      <ProductShowcase />
      <ImpactStory />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
