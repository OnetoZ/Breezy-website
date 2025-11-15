"use client"

import { useInView } from "@/hooks/use-in-view"

export default function CTA() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className={isInView ? "fade-in-up" : "opacity-0"}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6">
            Your Comfort Matters
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of women who have chosen natural comfort and confidence with Breezy.
          </p>
        </div>
      </div>
    </section>
  )
}
