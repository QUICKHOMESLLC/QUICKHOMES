"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RoleToggle } from "./role-toggle"
import { NotificationBell } from "./notification-bell"
import { cn } from "@/lib/utils"
import { Menu, X, Heart, LayoutDashboard, Users, Home, Building2, Key } from "lucide-react"
import { useState } from "react"
import Image from 'next/image'
import mainLogo from "@/public/quickhomes_logo.svg"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/buyer", label: "Buy", icon: Building2 },
  { href: "/buyer?type=rent", label: "Rent", icon: Key },
  { href: "/seller", label: "Sell", icon: Users },
]

const userLinks = [
  { href: "/buyer/favorites", label: "Favorites", icon: Heart },
  { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/leads", label: "Leads", icon: Users },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const isHome = pathname === "/"
  const isBuyer = pathname.startsWith("/buyer")
  const isSeller = pathname.startsWith("/seller")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src={mainLogo}
              alt="Quick Homes"
              width={80}
            />
            <div>
              <h1 className="font-bold text-2xl tracking-wide">QuickHomes</h1>
              <p className="text-sm font-light">Find &bull; Buy &bull; Sell &bull; Rent</p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = link.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(link.href.split("?")[0]) && link.href.includes(pathname.split("?")[0])
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Role Toggle - Always visible except on home */}
          {!isHome && (
            <div className="hidden sm:block">
              <RoleToggle />
            </div>
          )}

          {/* Notification Bell */}
          {(isBuyer || isSeller) && (
            <NotificationBell />
          )}

          {/* Favorites quick link */}
          {isBuyer && (
            <Link
              href="/buyer/favorites"
              className="hidden size-9 items-center justify-center rounded-lg transition-colors hover:bg-secondary sm:flex"
              aria-label="Favorites"
            >
              <Heart className="size-5" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="flex size-10 items-center justify-center rounded-lg hover:bg-secondary lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {/* Main Navigation */}
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]))
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="size-5" />
                  {link.label}
                </Link>
              )
            })}
            
            {/* Divider */}
            <div className="my-2 border-t" />
            
            {/* User Links */}
            {userLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="size-5" />
                  {link.label}
                </Link>
              )
            })}

            {/* Role Toggle - Mobile */}
            {!isHome && (
              <div className="mt-2 pt-2">
                <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">Switch Role</p>
                <RoleToggle />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
