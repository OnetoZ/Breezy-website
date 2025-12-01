"use client"
import { useInView } from "@/hooks/use-in-view"

const features = [
  {
    icon: "✨",
    title: "Rash-Free Comfort",
    description: "Gentle soft top sheet for sensitive skin, enhanced comfort.",
  },
  {
    icon: "🌿",
    title: "Herbal Protection",
    description: "Enriched with Neem, Aloe, Tulsi & Turmeric for natural protection.",
  },
  {
    icon: "🌸",
    title: "Odour-Free Freshness",
    description: "Locks in moisture and controls odour, keeping you feeling fresh and confident.",
  },
  {
    icon: "☁️",
    title: "Soft & Breathable",
    description: "Feels like fabric, not plastic. Breathable design for all-day comfort.",
  },
  {
    icon: "🛡️",
    title: "No Chemicals",
    description: "No harsh fragrance. Pure herbal goodness.",
  },
]

export default function WhyBreezy() {
  const { ref, isInView } = useInView()

  return (
    <section id="why-breezy" ref={ref} className="py-10 md:py-16 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            Why Choose Breezy?
          </h2>
          <p className="text-lg text-muted-foreground">
            Crafted with care, designed with you in mind. Every feature brings natural comfort and confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((feature, i) => (
            <div
              key={i}
              className={`group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-500 ${
                isInView ? "fade-in-up" : "opacity-0"
              }`}
              style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.15}s both` : "" }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Accent line */}
              <div className="w-12 h-1 bg-primary mt-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
