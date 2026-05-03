"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lead } from "@/lib/mock-data"
import { Phone, MessageCircle, Mail, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeadCardProps {
  lead: Lead
  onStatusChange?: (id: string, status: Lead["status"]) => void
}

export function LeadCard({ lead, onStatusChange }: LeadCardProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "contacted":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "interested":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "not-interested":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return ""
    }
  }

  return (
    <Card className={cn("transition-all", lead.isNew && "border-primary/50 bg-primary/5")}>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {lead.buyerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{lead.buyerName}</h3>
                    {lead.isNew && (
                      <Badge className="bg-blue-500 text-white">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.buyerEmail}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn("capitalize", getStatusColor(lead.status))}>
                {lead.status.replace("-", " ")}
              </Badge>
            </div>

            {/* Property */}
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs text-muted-foreground">Inquiry for:</p>
              <p className="text-sm font-medium">{lead.propertyTitle}</p>
            </div>

            {/* Message */}
            <div className="text-sm text-muted-foreground">
              <p className="line-clamp-2">&quot;{lead.message}&quot;</p>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {formatTime(lead.createdAt)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 sm:w-32">
              <Phone className="mr-2 size-4" />
              Call
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700 sm:w-32">
              <MessageCircle className="mr-2 size-4" />
              WhatsApp
            </Button>
            <Button size="sm" variant="outline" className="flex-1 sm:w-32">
              <Mail className="mr-2 size-4" />
              Email
            </Button>
          </div>
        </div>

        {/* Status Actions */}
        {lead.status === "new" && onStatusChange && (
          <div className="mt-4 flex gap-2 border-t pt-4">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onStatusChange(lead.id, "contacted")}
              className="flex-1"
            >
              Mark as Contacted
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onStatusChange(lead.id, "interested")}
              className="flex-1 text-green-600 hover:bg-green-50 hover:text-green-700"
            >
              Mark Interested
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
