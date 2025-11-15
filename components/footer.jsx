"use client"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-lg">B</div>
            <h3 className="text-xl font-serif font-bold">Breezy</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              Herbal comfort, natural confidence. Empowering women through menstrual health and dignity.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Shop Pads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Distributor
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="/awareness" className="hover:text-background transition-colors">
                  Health Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Myths vs Facts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Campus Program
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & WhatsApp QR */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-background/80 mb-6">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-sm text-background/70">
            © 2025 Breezy. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
