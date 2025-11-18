"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function CartPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navigation scrollY={0} />

      <section className="pt-28 pb-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Your cart</h1>
            <Link
              href="/shop"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Continue shopping
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
            {/* Cart items */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-4 flex gap-4 items-center">
                <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/breezy-pad-box.jpg"
                    alt="Breezy herbal pads box"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-foreground">Breezy Herbal Pads - Comfort Flow Pack</p>
                  <p className="text-xs text-muted-foreground">Selected on shop page (size & quantity for demo only).</p>
                  <p className="text-sm font-medium text-foreground">₹199</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Subtotal</p>
                <p className="text-sm font-semibold text-foreground">₹199</p>
              </div>
              <p className="text-[0.7rem] text-muted-foreground">Taxes and delivery charges are for demo purposes.</p>

              <Link
                href="/shop"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Proceed to checkout (demo)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
