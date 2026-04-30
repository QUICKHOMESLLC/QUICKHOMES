"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { PropertyCard } from "@/components/shared/property-card"
import { FilterSidebar, Filters, defaultFilters } from "@/components/buyer/filter-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { properties, indianCities, popularLocalities } from "@/lib/mock-data"
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  Heart,
  LayoutGrid,
  List,
  Eye,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "list"
type SortOption = "relevance" | "price-low" | "price-high" | "newest"

function BuyerPageContent() {
  const searchParams = useSearchParams()
  const initialCity = searchParams.get("city") || ""
  const initialType = searchParams.get("type") as "sale" | "rent" | null

  const [searchQuery, setSearchQuery] = useState(initialCity)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("relevance")
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    listingType: initialType || "all"
  })

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = properties.filter(property => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          property.title.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query) ||
          property.location.locality.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Listing type
      if (filters.listingType !== "all" && property.listingType !== filters.listingType) {
        return false
      }

      // Budget
      if (property.price < filters.budget.min || property.price > filters.budget.max) {
        return false
      }

      // BHK
      if (filters.bhk.length > 0 && !filters.bhk.includes(property.details.bedrooms)) {
        return false
      }

      // Property type
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.type)) {
        return false
      }

      // Furnishing
      if (filters.furnishing.length > 0 && !filters.furnishing.includes(property.details.furnishing)) {
        return false
      }

      // Posted by
      if (filters.postedBy.length > 0 && !filters.postedBy.includes(property.seller.type)) {
        return false
      }

      // Verified only
      if (filters.verifiedOnly && !property.features.verified) {
        return false
      }

      // Ready to move (age <= 1 year)
      if (filters.readyToMove && property.details.ageOfProperty > 1) {
        return false
      }

      return true
    })

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        // relevance - show hot and new first
        result.sort((a, b) => {
          const aScore = (a.features.isHot ? 2 : 0) + (a.features.isNew ? 1 : 0)
          const bScore = (b.features.isHot ? 2 : 0) + (b.features.isNew ? 1 : 0)
          return bScore - aScore
        })
    }

    return result
  }, [searchQuery, filters, sortBy])

  const selectedCity = indianCities.find(c => c.name.toLowerCase() === searchQuery.toLowerCase())
  const localities = selectedCity ? popularLocalities[selectedCity.name as keyof typeof popularLocalities] : null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">
            {filters.listingType === "rent" ? "Rent" : filters.listingType === "sale" ? "Buy" : "Properties"}
          </span>
          {searchQuery && (
            <>
              <ChevronRight className="size-4" />
              <span className="text-foreground">{searchQuery}</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {filters.listingType === "rent" ? "Rent" : filters.listingType === "sale" ? "Buy" : "Browse"} Properties
            {searchQuery && ` in ${searchQuery}`}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {filteredProperties.length} properties found
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by city, locality, or property name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="mr-2 size-4" />
              Filters
              {Object.values(filters).some(v => 
                Array.isArray(v) ? v.length > 0 : typeof v === "boolean" ? v : false
              ) && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Popular Localities (if city selected) */}
        {localities && (
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Popular in {selectedCity?.name}</p>
            <div className="flex flex-wrap gap-2">
              {localities.map((locality) => (
                <button
                  key={locality}
                  onClick={() => setSearchQuery(locality)}
                  className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  <MapPin className="size-3" />
                  {locality}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-20 overflow-hidden rounded-xl border">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </aside>

          {/* Filter Sidebar - Mobile */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 top-0 w-full max-w-sm overflow-auto bg-card">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Sort & View Options */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-md border bg-background px-3 py-1.5 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <div className="flex items-center gap-1 rounded-lg border p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-md p-1.5 transition-colors",
                    viewMode === "grid" ? "bg-secondary" : "hover:bg-secondary/50"
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-md p-1.5 transition-colors",
                    viewMode === "list" ? "bg-secondary" : "hover:bg-secondary/50"
                  )}
                  aria-label="List view"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2 text-sm">
              <Eye className="size-4 text-primary" />
              <span>
                <strong>23 buyers</strong> are viewing properties in this area right now
              </span>
            </div>

            {/* Property Grid/List */}
            {filteredProperties.length > 0 ? (
              <div className={cn(
                "grid gap-6",
                viewMode === "grid" 
                  ? "sm:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
                    <Search className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No properties found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setFilters(defaultFilters)
                    }}
                  >
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Favorites Quick Access */}
            {favorites.length > 0 && (
              <div className="fixed bottom-6 right-6 z-40">
                <Link href="/buyer/favorites">
                  <Button className="shadow-lg">
                    <Heart className="mr-2 size-4 fill-current" />
                    {favorites.length} Saved
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Popular Cities (if no search) */}
        {!searchQuery && (
          <section className="mt-12 border-t pt-12">
            <h2 className="mb-6 text-2xl font-bold">Explore by City</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {indianCities.slice(0, 8).map((city) => (
                <button
                  key={city.name}
                  onClick={() => setSearchQuery(city.name)}
                  className="group flex items-center gap-4 rounded-xl border p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <div className="size-12 overflow-hidden rounded-lg">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="size-full object-cover transition-transform group-hover:scale-110"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {city.properties.toLocaleString()}+ properties
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default function BuyerPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    }>
      <BuyerPageContent />
    </Suspense>
  )
}
