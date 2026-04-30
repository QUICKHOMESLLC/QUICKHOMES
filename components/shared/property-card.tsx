"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Property, formatIndianPrice, formatArea } from "@/lib/mock-data"
import { Heart, MapPin, Bed, Bath, Square, Eye, Phone, Shield, Flame, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
  showSellerInfo?: boolean
  className?: string
}

export function PropertyCard({ 
  property, 
  isFavorite = false, 
  onToggleFavorite,
  showSellerInfo = true,
  className 
}: PropertyCardProps) {
  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-lg", className)}>
      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge variant={property.listingType === "sale" ? "default" : "secondary"}>
            {property.listingType === "sale" ? "For Sale" : "For Rent"}
          </Badge>
          {property.features.isHot && (
            <Badge className="bg-orange-500 text-white">
              <Flame className="mr-1 size-3" />
              Hot
            </Badge>
          )}
          {property.features.isNew && (
            <Badge className="bg-blue-500 text-white">
              <Sparkles className="mr-1 size-3" />
              New
            </Badge>
          )}
          {property.features.verified && (
            <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-700">
              <Shield className="mr-1 size-3" />
              Verified
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggleFavorite(property.id)
            }}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn("size-5", isFavorite ? "fill-red-500 text-red-500" : "text-foreground")}
            />
          </button>
        )}

        {/* Price & Views */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-white">
              {formatIndianPrice(property.price, property.listingType)}
            </span>
            {property.pricePerSqft && (
              <p className="text-sm text-white/80">
                ₹{property.pricePerSqft.toLocaleString('en-IN')}/sq.ft
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            <Eye className="size-3" />
            {property.features.viewsToday} today
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg">{property.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">{property.location.locality}, {property.location.city}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Property Details */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="size-4" />
            <span>{property.details.bedrooms} BHK</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="size-4" />
            <span>{property.details.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="size-4" />
            <span>{formatArea(property.details.area)}</span>
          </div>
        </div>

        {/* Furnishing & Floor */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs capitalize">
            {property.details.furnishing.replace('-', ' ')}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Floor {property.details.floor}/{property.details.totalFloors}
          </Badge>
          {property.features.rera && (
            <Badge variant="outline" className="text-xs text-green-600">
              RERA
            </Badge>
          )}
        </div>

        {/* Seller Info */}
        {showSellerInfo && (
          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                {property.seller.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{property.seller.name}</p>
                <p className="text-xs capitalize text-muted-foreground">{property.seller.type}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="gap-1">
              <Phone className="size-3" />
              Contact
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
