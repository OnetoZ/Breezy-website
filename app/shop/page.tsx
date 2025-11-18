"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const sizes = [
  { label: "L", desc: "Thick cotton" },
  { label: "XL", desc: "Thick cotton" },
  { label: "XXL", desc: "Thick cotton" },
  { label: "Thin", desc: "Free size" },
]

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState<string>("L")
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({})
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleConfirmOrder = async () => {
    const newErrors: { name?: string; phone?: string; address?: string } = {}
    if (!fullName.trim()) newErrors.name = "Please enter your full name."
    if (!phone.trim()) newErrors.phone = "Please enter your phone number."
    if (!address.trim()) newErrors.address = "Please enter your full delivery address."

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // Send order to backend (demo)
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: "Breezy Herbal Pads - Comfort Flow Pack",
          size: selectedSize,
          price: 199,
          currency: "INR",
          paymentMethod,
          customer: {
            name: fullName.trim(),
            phone: phone.trim(),
            address: address.trim(),
          },
        }),
      })
    } catch (error) {
      console.error("Failed to save order", error)
    }

    // Demo success: reset form and show banner
    setOrderSuccess(true)
    setShowCheckout(false)
    setFullName("")
    setPhone("")
    setAddress("")

    setTimeout(() => {
      setOrderSuccess(false)
    }, 4000)
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navigation scrollY={0} />

      <section className="pt-28 pb-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {orderSuccess && (
            <div className="mb-4 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs md:text-sm text-emerald-900 flex items-center justify-between gap-2">
              <span>
                Your Breezy order details have been captured (demo). Our team will contact you on your phone number for
                the next steps.
              </span>
            </div>
          )}

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            {/* Product image */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-3xl border border-border bg-muted/60 flex items-center justify-center shadow-lg overflow-hidden">
                {/* Save the uploaded image as /public/images/breezy-pad-box.jpg or update the src below */}
                <img
                  src="/images/breezy-pad-box.jpg"
                  alt="Breezy herbal pads box"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product details & actions */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">Breezy Herbal Pads</p>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Comfort Flow Pack</h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Ultra-soft herbal sanitary pads with Neem, Aloe, Tulsi and Turmeric for gentle, everyday comfort.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-semibold text-foreground">
                  ₹199
                  <span className="ml-2 text-xs font-normal text-muted-foreground">incl. all taxes</span>
                </p>
                <p className="text-xs text-muted-foreground">Pack of 10 pads • Rash-free • Leak protection up to 8 hours</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">Choose size</p>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSelectedSize(s.label)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border  ${
                        selectedSize === s.label
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      <div className="text-sm font-semibold">{s.label}</div>
                      <div className="text-[0.65rem] text-muted-foreground">{s.desc}</div>
                    </button>
                  ))}
                </div>
                <p className="text-[0.7rem] text-muted-foreground mt-1">Selected size: {selectedSize}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCheckout(true)}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm md:text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                >
                  Shop now
                </button>
                <Link
                  href="/cart"
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm md:text-base font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Add to cart
                </Link>
              </div>

              {/* Payment & checkout */}
              <div className="pt-3 border-t border-border/60 mt-4 space-y-4">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">Secure payments with</p>
                  <div className="flex flex-wrap gap-2 text-[0.7rem] md:text-[0.75rem] font-medium text-muted-foreground">
                    <div className="px-3 py-1 rounded-full border border-border bg-background/80">Visa</div>
                    <div className="px-3 py-1 rounded-full border border-border bg-background/80">Mastercard</div>
                    <div className="px-3 py-1 rounded-full border border-border bg-background/80">RuPay</div>
                    <div className="px-3 py-1 rounded-full border border-border bg-background/80">UPI</div>
                    <div className="px-3 py-1 rounded-full border border-border bg-background/80">Netbanking</div>
                  </div>
                </div>

                {showCheckout && (
                  <div className="mt-2 rounded-2xl border border-border bg-background/70 p-4 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Checkout details</p>
                        <p className="text-[0.7rem] text-muted-foreground">
                          Size selected: {selectedSize}. Choose how you would like to pay and share delivery details.
                        </p>
                      </div>
                    </div>

                    {/* Payment method */}
                    <div className="space-y-2">
                      <p className="text-[0.7rem] font-medium text-muted-foreground uppercase tracking-[0.18em]">
                        Payment method
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("cod")}
                          className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-colors ${
                            paymentMethod === "cod"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          Cash on delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("online")}
                          className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-colors ${
                            paymentMethod === "online"
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          Pay online (card / UPI)
                        </button>
                      </div>
                    </div>

                    {/* User details */}
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="block text-[0.7rem] font-medium text-muted-foreground mb-1">Full name</label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                          placeholder="Name as on door / bell"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        {errors.name && (
                          <p className="mt-1 text-[0.65rem] text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[0.7rem] font-medium text-muted-foreground mb-1">Phone number</label>
                        <input
                          type="tel"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                          placeholder="10-digit mobile"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-[0.65rem] text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.7rem] font-medium text-muted-foreground mb-1">Delivery address</label>
                      <textarea
                        rows={3}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                        placeholder="House / flat no, street, area, city, pincode"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && (
                        <p className="mt-1 text-[0.65rem] text-red-500">{errors.address}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmOrder}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs md:text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                      >
                        Confirm order (demo)
                      </button>
                    </div>

                    <p className="text-[0.65rem] text-muted-foreground">
                      This is a demo checkout for design purposes. Connect this section to your real payment and order
                      system.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
