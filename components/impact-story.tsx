"use client"

import { useInView } from "@/hooks/use-in-view"

export default function ImpactStory() {
  const { ref, isInView } = useInView()

  return (
    <section id="impact" ref={ref} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-secondary/20 via-transparent to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            Empowering 1 Million Girls
          </h2>
          <p className="text-lg text-muted-foreground">
            Beyond products – we're building a movement for menstrual dignity and health awareness.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { number: "50K+", label: "Girls Reached", icon: "👧" },
            { number: "100+", label: "Schools Partnered", icon: "🎓" },
            { number: "500K+", label: "Pads Distributed", icon: "💝" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-8 bg-card rounded-2xl border border-border hover:border-primary/50 text-center transform hover:scale-105 transition-all duration-500 ${
                isInView ? "fade-in-up" : "opacity-0"
              }`}
              style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.15}s both` : "" }}
            >
              <p className="text-5xl mb-4">{stat.icon}</p>
              <p className="text-4xl font-serif font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Program Section */}
        <div
          className={`bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 ${
            isInView ? "fade-in-up" : "opacity-0"
          }`}
        >
          <div className="max-w-2xl">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4">
              🚀 Breezy Menstrual Confidence Drive™
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our campus program brings comprehensive menstrual health education, hygiene products, and confidence
              building to schools and colleges across the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-300">
                Invite Us to Your Campus
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all duration-300">
                Partnership Program
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
