import Link from "next/link"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { SearchBar } from "@/components/shared/search-bar"
import { PropertyCard } from "@/components/shared/property-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { indianCities, properties } from "@/lib/mock-data"
import { 
  Home, 
  Building2, 
  Key,
  Users, 
  Shield, 
  TrendingUp, 
  MapPin, 
  CheckCircle2,
  Star,
  ArrowRight,
  Briefcase,
  Eye
} from "lucide-react"

export default function HomePage() {
  const featuredProperties = properties.filter(p => p.features.isHot).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-linear-to-tr from-slate-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <Badge variant="default" className="mb-6">
              <Star className="mr-1 size-3" />
              India&apos;s Trusted Real Estate Platform
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
              Find, Rent, Buy or Sell Properties
              <span className="block text-primary">Easily with QuickHomes</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              India&apos;s smarter real estate marketplace. Browse thousands of verified properties across Mumbai, Delhi, Bangalore, and more.
            </p>
          </div>

          {/* Smart Search Bar */}
          <div className="mx-auto mt-10 max-w-3xl">
            <SearchBar variant="hero" />
          </div>

          {/* Quick Stats */}
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-background">50K+</p>
              <p className="text-sm text-muted-foreground">Active Listings</p>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div>
              <p className="text-2xl font-bold text-background">2L+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div>
              <p className="text-2xl font-bold text-background">100+</p>
              <p className="text-sm text-muted-foreground">Cities Covered</p>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div>
              <p className="text-2xl font-bold text-background">15K+</p>
              <p className="text-sm text-muted-foreground">Verified Sellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="border-t bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">What are you looking for?</h2>
            <p className="mt-2 text-muted-foreground">Choose your path to get started</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Buyer Card */}
            <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
              <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 transition-transform group-hover:scale-150" />
              <CardHeader className="relative">
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Home className="size-7" />
                </div>
                <CardTitle className="text-xl">Buy Property</CardTitle>
                <CardDescription>
                  Browse 50,000+ properties for sale across India
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    Verified listings only
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    RERA approved properties
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    Connect directly with owners
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/buyer">
                    Browse Properties
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Rent Card */}
            <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
              <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10 transition-transform group-hover:scale-150" />
              <CardHeader className="relative">
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                  <Key className="size-7" />
                </div>
                <CardTitle className="text-xl">Rent Property</CardTitle>
                <CardDescription>
                  Find your perfect rental home or PG
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-blue-600" />
                    No brokerage options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-blue-600" />
                    Furnished & unfurnished
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-blue-600" />
                    PG & co-living spaces
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/buyer?type=rent">
                    Find Rentals
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Seller Card */}
            <Card className="group relative overflow-hidden border-2 transition-all hover:border-accent hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-accent/20 transition-transform group-hover:scale-150" />
              <CardHeader className="relative">
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                  <Building2 className="size-7" />
                </div>
                <CardTitle className="text-xl">Sell / Rent Out</CardTitle>
                <CardDescription>
                  List your property and reach millions of buyers
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-accent-foreground" />
                    Post property FREE
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-accent-foreground" />
                    Get verified leads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-accent-foreground" />
                    Manage inquiries easily
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-2 hover:bg-accent hover:text-accent-foreground">
                  <Link href="/seller">
                    Post Property FREE
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Broker CTA */}
          <div className="mx-auto mt-8 max-w-md rounded-xl border-2 border-dashed border-muted-foreground/20 p-6 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-secondary">
              <Briefcase className="size-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">Are you a Broker or Builder?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get premium features and priority listing support
            </p>
            <Button variant="link" className="mt-2">
              Explore Pro Plans <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Popular Cities</h2>
              <p className="mt-2 text-muted-foreground">Explore properties in top Indian cities</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/buyer">
                View All Cities <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {indianCities.slice(0, 8).map((city) => (
              <Link
                key={city.name}
                href={`/buyer?city=${city.name}`}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{city.name}</h3>
                  <p className="text-sm text-white/80">{city.properties.toLocaleString()}+ properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="border-t bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Properties</h2>
              <p className="mt-2 text-muted-foreground">Handpicked properties just for you</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/buyer">
                View All <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Social Proof Banner */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-primary/20 text-sm font-medium text-primary"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="font-semibold text-foreground">
                <Eye className="mr-1 inline size-4" />
                23 buyers viewing properties in your area
              </p>
              <p className="text-sm text-muted-foreground">Join thousands finding their dream home today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why QuickHomes */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Why Choose QuickHomes?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We make buying, selling, and renting properties simple and stress-free
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">100+ Cities</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Properties across all major Indian cities and towns
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="size-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Verified Listings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                All properties verified for authenticity and RERA compliance
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="size-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Direct Contact</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Connect directly with property owners via WhatsApp or call
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="size-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Market Insights</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get real-time data on property prices and market trends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Sellers */}
      <section className="border-t bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Trusted by Top Builders</h2>
            <p className="mt-2 text-muted-foreground">India&apos;s leading developers list on QuickHomes</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {["Lodha", "Godrej", "Prestige", "DLF", "Oberoi", "Tata Housing"].map((builder) => (
              <div
                key={builder}
                className="flex h-16 w-32 items-center justify-center rounded-lg border bg-card px-4 text-lg font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {builder}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-primary">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
                  Ready to find your dream home?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/80">
                  Join over 2 lakh happy customers who found their perfect property with QuickHomes.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/buyer">
                      Start Searching
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/seller">
                      List Your Property
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden h-80 lg:block">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60"
                  alt="Modern home interior"
                  className="absolute inset-0 size-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
