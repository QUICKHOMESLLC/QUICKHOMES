import Link from "next/link"
import { indianCities } from "@/lib/mock-data"

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Blog", href: "#" },
  ],
  buyers: [
    { label: "Buy Property", href: "/buyer" },
    { label: "Rent Property", href: "/buyer?type=rent" },
    { label: "Property Listings", href: "/buyer" },
    { label: "EMI Calculator", href: "#" },
  ],
  sellers: [
    { label: "Post Property Free", href: "/seller" },
    { label: "Seller Dashboard", href: "/seller" },
    { label: "Pricing Plans", href: "#" },
    { label: "Seller Guide", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Safety Guidelines", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">Q</span>
              </div>
              <span className="text-xl font-bold text-foreground">QuickHomes</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              India&apos;s trusted real estate marketplace. Find, rent, buy or sell properties with ease.
            </p>
            <div className="mt-6">
              <p className="text-xs font-medium text-muted-foreground">POPULAR CITIES</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {indianCities.slice(0, 6).map((city) => (
                  <Link
                    key={city.name}
                    href={`/buyer?city=${city.name}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Buyers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">For Buyers</h3>
            <ul className="space-y-3">
              {footerLinks.buyers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">For Sellers</h3>
            <ul className="space-y-3">
              {footerLinks.sellers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            2024 QuickHomes. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Made with care in India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
