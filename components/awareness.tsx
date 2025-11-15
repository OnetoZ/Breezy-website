"use client"

import { useInView } from "@/hooks/use-in-view"

const topics = [
  { title: "What Periods Really Are", icon: "💡" },
  { title: "Avoiding Rashes & Infections", icon: "🛡️" },
  { title: "Responsible Pad Disposal", icon: "🌍" },
  { title: "Nutrition for Healthy Cycles", icon: "🥗" },
  { title: "Yoga for Cramps", icon: "🧘" },
  { title: "Mood, Hormones & Confidence", icon: "💪" },
]

export default function Awareness() {
  const { ref, isInView } = useInView()

  return (
    <section
      id="awareness"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">📚 Education & Awareness</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            Knowledge is Confidence
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive guides and resources for menstrual health, hygiene, and wellness.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <div
              key={i}
              className={`group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-500 cursor-pointer ${
                isInView ? "fade-in-up" : "opacity-0"
              }`}
              style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.1}s both` : "" }}
            >
              <p className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                {topic.icon}
              </p>
              <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                {topic.title}
              </h3>
              <div className="mt-4 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <a
            href="/awareness"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-300"
          >
            View Full Health Guide
          </a>
        </div>
      </div>
    </section>
  )
}
