"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const topics = [
  {
    title: "What Periods Really Are",
    icon: "💡",
    description:
      "Your period is your body gently shedding the lining of the uterus each month.",
    more:
      "Regular cycles are usually a sign that your hormones, uterus and ovaries are working together in a healthy way.",
  },
  {
    title: "Avoiding Rashes & Infections",
    icon: "🛡️",
    description:
      "Keep the area clean and dry, and change napkins on time.",
    more:
      "Change napkins every few hours, wash with plain water (no harsh soaps), and avoid heavily perfumed products on intimate skin.",
  },
  {
    title: "Responsible napkin Disposal",
    icon: "🌍",
    description:
      "Wrap used napkins and put them in a bin — never in the toilet.",
    more:
      "Wrap napkins in paper or the wrapper before throwing them in a covered bin. Flushing napkins blocks pipes and hurts local water systems.",
  },
  {
    title: "Nutrition for Healthy Cycles",
    icon: "🥗",
    description:
      "Simple food choices can make periods feel lighter and less tiring.",
    more:
      "Iron-rich foods (greens, millets, dates, nuts) plus enough water help reduce fatigue, dizziness and very heavy flow.",
  },
  {
    title: "Yoga for Cramps",
    icon: "🧘",
    description:
      "Gentle movement can relax muscles and ease cramps.",
    more:
      "Slow stretches, deep breathing and short walks improve blood flow and reduce pain. Very intense exercise is not needed.",
  },
  {
    title: "Mood, Hormones & Confidence",
    icon: "💪",
    description:
      "Feeling low, irritated or extra emotional around your period is common.",
    more:
      "Sleep, simple movement, and sharing how you feel with someone you trust can ease mood swings and build confidence.",
  },
]

export default function Awareness() {
  const { ref, isInView } = useInView()
  const [showDetails, setShowDetails] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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
          {topics.map((topic, i) => {
            const isActive = activeIndex === i

            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
                className={`group text-left p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isInView ? "fade-in-up" : "opacity-0"
                } ${isActive ? "scale-[1.02] shadow-xl" : ""}`}
                style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.1}s both` : "" }}
                aria-expanded={isActive}
              >
                <p className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  {topic.icon}
                </p>
                <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="mt-3 text-sm md:text-[0.95rem] text-muted-foreground">
                  {topic.description}
                </p>
                <div className="mt-3 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 origin-left"></div>

                <div
                  className={`mt-3 text-sm md:text-[0.95rem] text-muted-foreground transition-all duration-300 ease-out overflow-hidden ${
                    isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p>{topic.more}</p>
                </div>

                <p className="mt-3 text-xs font-medium text-primary flex items-center gap-1">
                  <span>{isActive ? "Show less" : "Read more"}</span>
                  <span className={`transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"}`}>
                    ▼
                  </span>
                </p>
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-300"
          >
            {showDetails ? "Hide details" : "View more details"}
          </button>

          {showDetails && (
            <div className="mt-6 max-w-2xl mx-auto text-left text-sm md:text-base text-muted-foreground bg-card border border-border rounded-2xl p-5 md:p-6">
              <p className="font-semibold text-foreground mb-2">Understanding your period</p>
              <p className="mb-3">
                A period is your body gently letting go of the lining of the uterus every month. Regular cycles are a
                sign that your hormones and reproductive system are working together in a healthy way.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Change napkins every 4-6 hours to stay fresh and reduce rashes or infections.</li>
                <li>Drink water and eat iron-rich foods (like greens, dates, nuts) to fight tiredness.</li>
                <li>Light stretching or yoga can ease cramps and improve mood.</li>
                <li>If pain is very strong or cycles are very irregular, talk to a doctor early.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
