"use client"

import { useInView } from "@/hooks/use-in-view"

const testimonials = [
  {
    name: "Priya M.",
    role: "College Student",
    text: "Finally found something that doesn't irritate my sensitive skin. Breezy has been a game-changer for my confidence during my cycle.",
    avatar: "👧",
  },
  {
    name: "Anjali K.",
    role: "Working Professional",
    text: "The 12-hour protection is reliable and the herbal ingredients give me peace of mind. I've recommended Breezy to all my friends.",
    avatar: "👩‍💼",
  },
  {
    name: "Dr. Sneha P.",
    role: "Gynecologist",
    text: "I recommend Breezy to my patients. The herbal formulation is gentle on sensitive skin and the biodegradable packaging aligns with health ethics.",
    avatar: "👨‍⚕️",
  },
]

export default function Testimonials() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Stories from Our Community</h2>
          <p className="text-lg text-muted-foreground">Real voices, real experiences, real impact.</p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-500 space-y-4 ${
                isInView ? "fade-in-up" : "opacity-0"
              }`}
              style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.15}s both` : "" }}
            >
              {/* Rating */}
              <div className="text-2xl">⭐ ⭐ ⭐ ⭐ ⭐</div>

              {/* Quote */}
              <p className="text-foreground italic leading-relaxed">"{testimonial.text}"</p>

              {/* Author */}
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-serif font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
