"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

const marketplaces = [
  { name: "Amazon", url: "https://www.amazon.in", logo: "/marketplaces/amazon.jpg" },
  { name: "Flipkart", url: "https://www.flipkart.com", logo: "/marketplaces/flipkart.png" },
  { name: "Nykaa", url: "https://www.nykaa.com", logo: "/marketplaces/nykaa.webp" },
  { name: "BigBasket", url: "https://www.bigbasket.com", logo: "/marketplaces/bigbasket.png" },
]

export default function CTA() {
  const { ref, isInView } = useInView()

  const [retailerName, setRetailerName] = useState("")
  const [storeName, setStoreName] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const handleRetailerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitStatus("idle")
    setSubmitMessage("")

    if (!retailerName.trim() || !phone.trim()) {
      setSubmitStatus("error")
      setSubmitMessage("Please fill in your name and WhatsApp number, and try again.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/retailers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          retailerName: retailerName.trim(),
          storeName: storeName.trim(),
          city: city.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit retailer enquiry")
      }

      setSubmitStatus("success")
      setSubmitMessage("Thank you! We have received your retailer enquiry.")
      setRetailerName("")
      setStoreName("")
      setCity("")
      setPhone("")
      setMessage("")
    } catch (error) {
      console.error("Retailer enquiry failed", error)
      setSubmitStatus("error")
      setSubmitMessage("Something went wrong. Please retry or WhatsApp us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
<section ref={ref} className="py-12 md:py-16 relative overflow-hidden">
{/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`rounded-3xl bg-background/80 backdrop-blur-xl border border-border/60 shadow-xl p-8 md:p-12 ${
            isInView ? "fade-in-up" : "opacity-0"
          }`}
        >
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-center">
            {/* Text + offers */}
            <div>
              <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-primary/80 uppercase mb-3">
                For retailers and partners
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                Sell Breezy in your store.
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl leading-relaxed">
                Breezy is a herbal, skin-friendly and biodegradable sanitary pad brand. Add Breezy to your shelves and
                offer your customers a safe and comfortable choice.
              </p>

              <div className="grid gap-4 md:grid-cols-2 mb-6 md:mb-8 text-left">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Simple retailer offers</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Get easy starter offers and margin plans suitable for medical shops, supermarkets and small stores.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Quick support on WhatsApp</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Ask questions, place orders and request display stands directly on WhatsApp.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Products customers understand</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Clear packaging and simple communication that make it easy for shoppers to choose Breezy.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Different sizes and packs</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Choose from multiple flow options and pack sizes based on what sells best in your area.
                  </p>
                </div>
              </div>

              <p className="text-xs md:text-sm text-muted-foreground">
                To know more or to start stocking Breezy, scan the QR code on the right and send us a message on
                WhatsApp.
              </p>
            </div>

            {/* QR code block */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-xs rounded-2xl bg-background/90 border border-border/70 shadow-lg p-5 flex flex-col items-center text-center gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Scan to connect</p>
                  <p className="text-xs text-muted-foreground">Breezy Business WhatsApp</p>
                </div>

                {/* WhatsApp Business QR image */}
                <div className="w-40 h-40 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src="QR code.png"
                    alt="Breezy Business WhatsApp QR"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 w-full text-left">
                  <p className="text-xs text-muted-foreground">
                    Share your details below and we will get back to you.
                  </p>
                  <form onSubmit={handleRetailerSubmit} className="space-y-2 text-left w-full">
                    <input
                      type="text"
                      value={retailerName}
                      onChange={(e) => setRetailerName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs md:text-sm"
                    />
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Store / business name"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs md:text-sm"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City / area"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs md:text-sm"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="WhatsApp number *"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs md:text-sm"
                    />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you need (optional)"
                      rows={2}
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs md:text-sm resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send retailer enquiry"}
                    </button>
                    {submitStatus === "success" && submitMessage && (
                      <p className="text-[0.7rem] text-emerald-600 mt-1">{submitMessage}</p>
                    )}
                    {submitStatus === "error" && submitMessage && (
                      <p className="text-[0.7rem] text-red-600 mt-1">{submitMessage}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Running retailer logos strip */}
          <div className="mt-10 border-t border-border/60 pt-6">
            <p className="text-xs md:text-sm font-medium text-muted-foreground mb-3 text-center uppercase tracking-[0.2em]">
              Available on
            </p>
            <div className="relative overflow-hidden logo-marquee-wrapper">
  <div className="logo-marquee flex gap-10 whitespace-nowrap">
    {[1, 2].map((loop) => (
      <div key={loop} className="flex gap-10 items-center">
        {marketplaces.map((marketplace) => (
          <a
            key={`${marketplace.name}-${loop}`}
            href={marketplace.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 h-10 md:h-12 px-4 rounded-full bg-background/80 border border-border hover:border-primary/80 transition-colors shrink-0"
          >
            <Image
              src={marketplace.logo}
              alt={`${marketplace.name} logo`}
              width={96}
              height={32}
              className="h-6 md:h-8 w-auto object-contain"
            />
            <span className="text-xs md:text-sm font-semibold text-foreground">
              {marketplace.name}
            </span>
          </a>
        ))}
      </div>
    ))}
  </div>
</div>


<style jsx global>{`
@keyframes logo-marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.logo-marquee {
  width: max-content;
  display: flex;
  animation: logo-marquee 28s linear infinite;
  will-change: transform;
}

.logo-marquee-wrapper:hover .logo-marquee {
  animation-play-state: paused;
}

`}</style>
</div>
</div>
</div>
</section>
  )
}