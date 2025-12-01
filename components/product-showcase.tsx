"use client"

import { useInView } from "@/hooks/use-in-view"

export default function ProductShowcase() {
  const { ref, isInView } = useInView()

  return (
    <section
      id="products"
      ref={ref}
      className="py-10 md:py-16 bg-gradient-to-br from-secondary/30 to-background relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Info */}
          <div className={`space-y-8 ${isInView ? "slide-in-left" : "opacity-0 translate-x-10"}`}>
            <div>
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">🌿 Our Product</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Designed for Every Girl & Woman
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Breezy Herbal napkins combine natural ingredients with advanced comfort. No compromise on
                quality, only natural goodness.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                  "Natural odour control",
                  "Gentle on sensitive skin",
                  "Soft cottony feel",
                  "Anti-bacterial herbal protection",
                  "Leak-lock absorption",
                  "Breathable & rash-free comfort",

              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors ${
                    isInView ? "fade-in" : "opacity-0"
                  }`}
                  style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.1}s both` : "" }}
                >
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Sizes */}
            <div className="space-y-3 pt-4 border-t border-border">
              <p className="font-semibold text-foreground">Available Sizes:</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "L", desc: "" },
                  { name: "XL", desc: "" },
                  { name: "XXL", desc: "" },
                  // { name: "Thin", desc: "Free Size" },
                ].map((size, i) => (
                  <button
                    key={size.name}
                    className={`px-6 py-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30 rounded-full font-medium transition-all duration-300 text-sm ${
                      isInView ? "fade-in-up" : "opacity-0"
                    }`}
                    style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${0.4 + i * 0.1}s both` : "" }}
                  >
                    <div className="font-semibold">{size.name}</div>
                    <div className="text-xs opacity-80">{size.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Visual - 4 Layers */}
          <div className={`relative ${isInView ? "slide-in-right" : "opacity-0 translate-x-10"}`}>
            {/* Layer diagram background */}
            <div className="relative space-y-6">
              <p className="text-center font-semibold text-muted-foreground mb-8">Product Layers:</p>

              {[
                { label: "Layer 1: Ultra-Soft Fabric", icon: "☁️", color: "from-secondary/50 to-secondary/30" },
                {
                  label: "Layer 2: Cotton + Neem + Aloe + Tulsi + Turmeric",
                  icon: "🌿",
                  color: "from-primary/40 to-primary/20",
                },
                { label: "Layer 3: Breathable Shield & 💧Leak-proof Base", icon: "💨", color: "from-accent/30 to-accent/10" },
                // { label: "Layer 4: Leak-proof Base", icon: "💧", color: "from-primary/30 to-primary/10" },
              ].map((layer, i) => (
                <div
                  key={i}
                  className={`p-6 bg-gradient-to-r ${layer.color} rounded-2xl border-2 border-primary/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer ${
                    isInView ? "fade-in-up" : "opacity-0"
                  }`}
                  style={{ animation: isInView ? `fadeInUp 0.6s ease-out ${i * 0.2}s both` : "" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{layer.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground">{layer.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
