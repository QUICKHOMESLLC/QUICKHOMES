"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { StepForm } from "@/components/seller/step-form"
import { LeadCard } from "@/components/seller/lead-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { properties, sellerLeads, formatIndianPrice, Lead } from "@/lib/mock-data"
import { 
  Plus, 
  Home, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  MapPin,
  Edit,
  Trash2,
  ChevronRight,
  Flame,
  Users,
  Phone,
  BarChart3,
  ArrowUpRight,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"

type ViewMode = "dashboard" | "create"

// Mock seller's listings (subset of all properties)
const myListings = properties.slice(0, 3).map((p, i) => ({
  ...p,
  views: [1234, 567, 876][i],
  inquiries: [28, 15, 19][i],
  status: i === 2 ? "pending" as const : "active" as const,
}))

export default function SellerPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard")
  const [leads, setLeads] = useState(sellerLeads)

  const totalViews = myListings.reduce((acc, listing) => acc + listing.views, 0)
  const totalInquiries = myListings.reduce((acc, listing) => acc + listing.inquiries, 0)
  const activeListings = myListings.filter(l => l.status === "active").length
  const newLeads = leads.filter(l => l.isNew).length

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, status, isNew: false } : lead
    ))
  }

  if (viewMode === "create") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="size-4" />
            <button onClick={() => setViewMode("dashboard")} className="hover:text-primary">
              Seller Dashboard
            </button>
            <ChevronRight className="size-4" />
            <span className="text-foreground">Post Property</span>
          </div>

          <StepForm 
            onComplete={() => setViewMode("dashboard")}
            onCancel={() => setViewMode("dashboard")}
          />
        </div>
        <Footer />
      </div>
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
          <span className="text-foreground">Seller Dashboard</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your property listings and connect with buyers
            </p>
          </div>
          <Button onClick={() => setViewMode("create")} size="lg">
            <Plus className="mr-2 size-5" />
            Post Property FREE
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Home className="size-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{myListings.length}</p>
                <p className="text-sm text-muted-foreground">Total Listings</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                <TrendingUp className="size-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeListings}</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <Eye className="size-6" />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  <ArrowUpRight className="mr-1 size-3" />
                  12%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(newLeads > 0 && "border-primary/50 bg-primary/5")}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                <MessageSquare className="size-6" />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalInquiries}</p>
                  <p className="text-sm text-muted-foreground">Inquiries</p>
                </div>
                {newLeads > 0 && (
                  <Badge className="bg-orange-500 text-white">{newLeads} new</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* My Listings */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {myListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative aspect-video sm:aspect-square sm:w-48">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="size-full object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute left-2 top-2 flex gap-1">
                        <Badge 
                          className={cn(
                            listing.status === "active" ? "bg-green-600" : "bg-yellow-600",
                            "text-white"
                          )}
                        >
                          {listing.status === "active" ? "Active" : "Pending"}
                        </Badge>
                        {listing.features.isHot && (
                          <Badge className="bg-orange-500 text-white">
                            <Flame className="mr-1 size-3" />
                            Hot
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{listing.title}</h3>
                          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="size-4" />
                            {listing.location.locality}, {listing.location.city}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-primary">
                          {formatIndianPrice(listing.price, listing.listingType)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="size-4" />
                          <span>{listing.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="size-4" />
                          <span>{listing.inquiries} inquiries</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="size-4" />
                          <span>{Math.floor(listing.inquiries * 0.6)} calls</span>
                        </div>
                        {listing.features.verified && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Shield className="size-4" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto flex gap-2 pt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="mr-2 size-4" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <BarChart3 className="mr-2 size-4" />
                          Stats
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Leads */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Leads</h2>
              <Link href="/seller/leads">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="ml-1 size-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {leads.slice(0, 3).map((lead) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>

            {/* Quick Tips */}
            <Card className="mt-6 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Tips to get more leads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Add high-quality photos to your listing</p>
                <p>Add RERA registration for credibility</p>
                <p>Respond to inquiries within 1 hour</p>
                <p>Keep your pricing competitive</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
