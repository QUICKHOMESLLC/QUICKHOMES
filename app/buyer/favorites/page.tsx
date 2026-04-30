"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { PropertyCard } from "@/components/shared/property-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { properties } from "@/lib/mock-data"
import { Heart, ChevronRight, Search } from "lucide-react"

export default function FavoritesPage() {
  // In a real app, this would come from a database/API
  const [favoriteIds, setFavoriteIds] = useState<string[]>(["prop-1", "prop-3"])
  
  const favoriteProperties = properties.filter(p => favoriteIds.includes(p.id))

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="size-4" />
          <Link href="/buyer" className="hover:text-primary">Properties</Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Favorites</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-500/10">
              <Heart className="size-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
              <p className="text-muted-foreground">
                {favoriteProperties.length} saved properties
              </p>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {favoriteProperties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
                <Heart className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No favorites yet</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Start browsing properties and save the ones you like by clicking the heart icon
              </p>
              <Button asChild className="mt-6">
                <Link href="/buyer">
                  <Search className="mr-2 size-4" />
                  Browse Properties
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
