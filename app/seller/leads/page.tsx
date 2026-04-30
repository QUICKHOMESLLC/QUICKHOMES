"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { LeadCard } from "@/components/seller/lead-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { sellerLeads, Lead } from "@/lib/mock-data"
import { ChevronRight, MessageSquare, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

type FilterStatus = "all" | "new" | "contacted" | "interested" | "not-interested"

export default function LeadsPage() {
  const [leads, setLeads] = useState(sellerLeads)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, status, isNew: false } : lead
    ))
  }

  const filteredLeads = leads.filter(lead => 
    filterStatus === "all" ? true : lead.status === filterStatus
  )

  const statusCounts = {
    all: leads.length,
    new: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    interested: leads.filter(l => l.status === "interested").length,
    "not-interested": leads.filter(l => l.status === "not-interested").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="size-4" />
          <Link href="/seller" className="hover:text-primary">Seller Dashboard</Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Leads</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/10">
              <MessageSquare className="size-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Buyer Leads</h1>
              <p className="text-muted-foreground">
                {leads.length} total inquiries from interested buyers
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "new", "contacted", "interested", "not-interested"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="capitalize">{status === "not-interested" ? "Not Interested" : status}</span>
              <Badge 
                variant="secondary" 
                className={cn(
                  "px-2 py-0",
                  filterStatus === status && "bg-primary-foreground/20 text-primary-foreground"
                )}
              >
                {statusCounts[status]}
              </Badge>
            </button>
          ))}
        </div>

        {/* Leads List */}
        {filteredLeads.length > 0 ? (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <LeadCard 
                key={lead.id} 
                lead={lead} 
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
                <Filter className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No leads found</h3>
              <p className="mt-2 text-muted-foreground">
                No leads match the selected filter
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setFilterStatus("all")}
              >
                Show all leads
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
