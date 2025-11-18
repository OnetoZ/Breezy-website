"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

export default function ImpactStory() {
  const { ref, isInView } = useInView()
  const [isFormOpen, setIsFormOpen] = useState(false)

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
          className={`bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-primary/20 shadow-xl ${
            isInView ? "fade-in-up" : "opacity-0"
          }`}
        >
          <div className="grid gap-6 md:gap-8 md:grid-cols-1 place-items-center">
            {/* Program copy */}
            <div className="max-w-2xl text-center">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                🚀 Breezy Menstrual Confidence Drive™
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                Bring Breezy to your campus for an open, stigma‑free conversation about periods, body comfort and
                confident menstrual care.
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Send us your campus details through the form, and our team will review your invite and reach out on
                WhatsApp or a quick call.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm md:text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Invite us to your campus
                </button>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Or message us directly on WhatsApp after submitting the form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus visit form popup */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8 space-y-5 relative">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground text-xl leading-none"
            >
              ×
            </button>

            <div className="space-y-1 pr-6">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                Campus visit request form
              </h3>
              <p className="text-sm md:text-sm text-muted-foreground">
                Share your campus details so we can plan a Breezy Menstrual Confidence Drive™ at your institution.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Campus / Institution name</label>
                  <input
                    type="text"
                    placeholder="e.g. ABC College of Arts and Science"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">City & State</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Contact person name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Role / designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Student Coordinator, Staff"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Email ID</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Preferred visit month</label>
                  <input
                    type="text"
                    placeholder="e.g. July 2025"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Short note about your campus and students
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your campus, number of students, and why you want Breezy to visit."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Upload any proof / invite letter (image)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary hover:file:bg-primary/20"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  This helps us verify that the campus visit invitation is genuine.
                </p>
              </div>

              {/* Contact & WhatsApp QR inside form */}
              <div className="mt-3 grid gap-3 md:grid-cols-[auto,1fr] items-center rounded-2xl bg-background/70 border border-border/60 p-3 md:p-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-muted flex items-center justify-center mx-auto">
                  <img
                    src="https://dummyimage.com/256x256/000000/ffffff.png&text=WhatsApp+QR"
                    alt="Dummy Breezy WhatsApp QR for campus contact"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs md:text-sm text-left">
                  <p className="font-semibold text-foreground mb-1">Need quick confirmation?</p>
                  <p className="text-muted-foreground">
                    After you submit this form, you can also send us a message on WhatsApp with your campus name so we
                    can respond faster.
                  </p>
                  <p className="mt-1 font-medium text-foreground">
                    Phone / WhatsApp: <span className="font-semibold">9750760900</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Submit campus visit request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
