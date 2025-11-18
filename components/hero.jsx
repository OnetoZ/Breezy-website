"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [isRotating, setIsRotating] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 pt-20 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Text Content */}
          <div className={`space-y-6 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
            <div className="space-y-4">
              <p className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase animate-fade-in">
                ✨ Herbal Care
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-serif font-bold text-foreground">
                Feel Herbal.
                <br />
                Feel Healthy.
                <br />
                Feel <span className="text-primary">Hygiene.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg leading-relaxed">
                Periods deserve dignity, comfort & confidence. With Breezy, experience herbal care + ultra comfort —
                naturally.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {["No Odour", "No chemicals added", "Herbal", "Cotton soft"].map((benefit, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary hover:bg-primary/20 transition-colors cursor-default"
                  style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both` }}
                >
                  ✓ {benefit}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-300 scale-on-hover cursor-pointer"
                onClick={() => {
                  const target = document.querySelector("#products")
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Start With Breezy
              </button>
            </div>
          </div>

          {/* Visual Element - Product Image with horizontal rotation animation */}
          <div
            className={`relative h-full flex items-center justify-center ${isVisible ? "slide-in-right" : "opacity-0"}`}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Floating circles background */}
              <div className="absolute inset-0 animate-pulse">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>
              </div>

              {/* Hero Image with horizontal rotation animation */}
              <div className="relative z-10">
                <div
                  className="aspect-square rounded-3xl overflow-hidden border-8 border-primary/20 shadow-2xl"
                  onMouseEnter={() => setIsRotating(false)}
                  onMouseLeave={() => setIsRotating(true)}
                  style={{
                    animation: isRotating ? "smoothRotateX 6s linear infinite" : "none",
                  }}
                >
                  <img
                    src="/images/image.png"
                    alt="Breezy - Herbal Sanitary Napkins"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating decorative butterflies */}
                <div className="absolute -top-8 -right-8 text-4xl float-gentle">🦋</div>
                <div className="absolute -bottom-8 -left-8 text-3xl float-gentle" style={{ animationDelay: "0.5s" }}>
                  🌿
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
