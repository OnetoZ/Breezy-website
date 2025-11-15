"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"

const awarenessSections = [
  {
    title: "What Periods Really Are",
    icon: "💡",
    content: "Understanding the menstrual cycle and what happens in your body during different phases of your cycle.",
  },
  {
    title: "Avoiding Rashes & Infections",
    icon: "🛡️",
    content:
      "Learn how to prevent rashes and infections with proper hygiene, material choices, and pad changing practices.",
  },
  {
    title: "Responsible Pad Disposal",
    icon: "🌍",
    content: "Understand the environmental impact and proper disposal methods for sanitary products.",
  },
  {
    title: "Nutrition for Healthy Cycles",
    icon: "🥗",
    content: "Discover the best foods and nutrients to support your menstrual health and manage symptoms naturally.",
  },
  {
    title: "Yoga for Cramps",
    icon: "🧘",
    content: "Gentle yoga poses and breathing techniques designed to relieve menstrual cramps and discomfort.",
  },
  {
    title: "Mood, Hormones & Confidence",
    icon: "💪",
    content: "Explore the connection between hormones and mood, and build confidence throughout your cycle.",
  },
]

export default function AwarenessPage() {
  const [selectedTopic, setSelectedTopic] = useState(0)

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
          <div className="bg-card rounded-2xl border border-border p-12">
            <div className="text-6xl mb-4">{awarenessSections[selectedTopic].icon}</div>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              {awarenessSections[selectedTopic].title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {awarenessSections[selectedTopic].content}
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
                Read More
              </button>
              <button className="px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-full font-semibold hover:bg-primary/20 transition-colors">
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
