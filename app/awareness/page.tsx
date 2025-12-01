"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"

const awarenessSections = [
  {
    title: "What Periods Really Are",
    icon: "💡",
    content: "Your period is your body gently shedding the lining of the uterus each month.",
    details:
      "Each cycle, hormones prepare the uterus for a possible pregnancy. When there is no pregnancy, the lining breaks down and flows out as your period. Regular cycles usually mean your hormones, uterus and ovaries are working together in a healthy way.",
  },
  {
    title: "Avoiding Rashes & Infections",
    icon: "🛡️",
    content: "Keeping the area clean, dry and changing napkins on time reduces most rashes.",
    details:
      "Change napkins every 46 hours, or sooner if they feel damp. Wash with plain water instead of harsh soaps, and avoid heavily perfumed products on intimate skin. Loose, breathable underwear also helps the skin stay healthy.",
  },
  {
    title: "Responsible napkin Disposal",
    icon: "🌍",
    content: "Wrap used napkins and put them in a bin — never in the toilet.",
    details:
      "After use, fold the napkin, wrap it in paper or the wrapper, and place it in a covered bin. Flushing napkins blocks pipes and harms local water systems. If your area has waste segregation, follow the local guidelines for sanitary waste.",
  },
  {
    title: "Nutrition for Healthy Cycles",
    icon: "🥗",
    content: "Simple food choices can make periods feel lighter and less tiring.",
    details:
      "Iron-rich foods like greens, millets, dates, nuts and lentils help replace blood loss and fight tiredness. Drinking enough water reduces bloating and headaches. Regular meals, not skipping breakfast, keeps your energy and mood more stable.",
  },
  {
    title: "Yoga for Cramps",
    icon: "🧘",
    content: "Gentle movement can relax muscles and ease cramps.",
    details:
      "Slow stretching, deep belly breathing and short walks increase blood flow and relax tight muscles. Avoid very intense workouts if you feel weak. Listening to your body and moving at your own pace is more important than pushing hard.",
  },
  {
    title: "Mood, Hormones & Confidence",
    icon: "💪",
    content: "Feeling low, irritated or extra emotional around your period is common.",
    details:
      "Hormone shifts can affect sleep, appetite and mood. Gentle exercise, enough rest, and sharing how you feel with someone you trust can ease mood swings. Remember: your feelings are valid, and asking for support is a sign of strength, not weakness.",
  },
]

export default function AwarenessPage() {
  const [selectedTopic, setSelectedTopic] = useState(0)
  const [showMore, setShowMore] = useState(false)

  const handleShare = () => {
    const topic = awarenessSections[selectedTopic]
    const url = typeof window !== "undefined" ? window.location.href : ""

    if (navigator.share) {
      navigator
        .share({
          title: topic.title,
          text: topic.content,
          url,
        })
        .catch(() => {
          // user cancelled share; no action needed
        })
    } else if (navigator.clipboard && url) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copied. You can now share it with someone who may find this helpful.")
        })
        .catch(() => {
          alert("Could not copy the link, but you can still share this page from your browser.")
        })
    } else {
      alert("You can share this page using your browser's share or copy link options.")
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation scrollY={0} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            📚 Education & Awareness
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-4">
            Knowledge is Confidence
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guides and resources for menstrual health, hygiene, and wellness.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-grow py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {awarenessSections.map((section, i) => (
              <div
                key={i}
                onClick={() => setSelectedTopic(i)}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedTopic === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <p className="text-4xl mb-3">{section.icon}</p>
                <h3 className="text-lg font-serif font-bold text-foreground">{section.title}</h3>
              </div>
            ))}
          </div>

          {/* Selected Topic Detail */}
          <div className="bg-card rounded-2xl border border-border p-12 transition-all duration-300">
            <div className="text-6xl mb-4">{awarenessSections[selectedTopic].icon}</div>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              {awarenessSections[selectedTopic].title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {awarenessSections[selectedTopic].content}
            </p>
            <div
              className={`text-base text-muted-foreground leading-relaxed transition-all duration-300 ease-out overflow-hidden ${
                showMore ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p>{awarenessSections[selectedTopic].details}</p>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? "Show less" : "Read more"}
              </button>
              <button
                className="px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-full font-semibold hover:bg-primary/20 transition-colors"
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
