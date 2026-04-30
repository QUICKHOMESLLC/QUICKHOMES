"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Building2 } from "lucide-react"

export type Role = "buyer" | "seller"

interface RoleToggleProps {
  className?: string
}

export function RoleToggle({ className }: RoleToggleProps) {
  const pathname = usePathname()
  
  const currentRole: Role = pathname.startsWith("/seller") ? "seller" : "buyer"

  return (
    <div className={cn("flex items-center gap-1 rounded-full bg-secondary p-1", className)}>
      <Link
        href="/buyer"
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
          currentRole === "buyer"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Home className="size-4" />
        <span className="hidden sm:inline">Buyer</span>
      </Link>
      <Link
        href="/seller"
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
          currentRole === "seller"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Building2 className="size-4" />
        <span className="hidden sm:inline">Seller</span>
      </Link>
    </div>
  )
}
