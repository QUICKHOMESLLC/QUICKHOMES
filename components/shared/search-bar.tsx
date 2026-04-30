"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search, MapPin, ChevronDown } from "lucide-react"
import { indianCities } from "@/lib/mock-data"

interface SearchBarProps {
  className?: string
  variant?: "default" | "hero"
}

const budgetOptions = {
  sale: [
    { label: "Under 50 Lakh", value: "0-5000000" },
    { label: "50L - 1 Cr", value: "5000000-10000000" },
    { label: "1 Cr - 2 Cr", value: "10000000-20000000" },
    { label: "2 Cr - 5 Cr", value: "20000000-50000000" },
    { label: "Above 5 Cr", value: "50000000-999999999" },
  ],
  rent: [
    { label: "Under 15K", value: "0-15000" },
    { label: "15K - 30K", value: "15000-30000" },
    { label: "30K - 50K", value: "30000-50000" },
    { label: "50K - 1L", value: "50000-100000" },
    { label: "Above 1L", value: "100000-9999999" },
  ],
}

const propertyTypes = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "House", value: "house" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
  { label: "PG", value: "pg" },
]

export function SearchBar({ className, variant = "default" }: SearchBarProps) {
  const router = useRouter()
  const [listingType, setListingType] = useState<"sale" | "rent">("sale")
  const [city, setCity] = useState("")
  const [budget, setBudget] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (listingType) params.set("type", listingType)
    if (city) params.set("city", city)
    if (budget) params.set("budget", budget)
    if (propertyType) params.set("propertyType", propertyType)
    router.push(`/buyer?${params.toString()}`)
  }

  const isHero = variant === "hero"

  return (
    <div className={cn(
      "w-full",
      isHero ? "rounded-2xl bg-card p-4 shadow-xl" : "rounded-lg bg-card p-2 shadow-md",
      className
    )}>
      {/* Buy/Rent Toggle */}
      <div className="mb-3 flex gap-1 rounded-lg bg-secondary p-1">
        <button
          onClick={() => setListingType("sale")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
            listingType === "sale"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setListingType("rent")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
            listingType === "rent"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Rent
        </button>
      </div>

      {/* Search Fields */}
      <div className={cn(
        "flex flex-col gap-2",
        isHero ? "md:flex-row md:items-center" : "sm:flex-row sm:items-center"
      )}>
        {/* City Search */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search city or locality..."
            className="pl-10"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setShowCityDropdown(true)}
            onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
          />
          {showCityDropdown && city === "" && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-auto rounded-lg border bg-card p-2 shadow-lg">
              {indianCities.slice(0, 6).map((c) => (
                <button
                  key={c.name}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary"
                  onClick={() => {
                    setCity(c.name)
                    setShowCityDropdown(false)
                  }}
                >
                  <MapPin className="size-4 text-muted-foreground" />
                  <span>{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.state}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Budget Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
            onBlur={() => setTimeout(() => setShowBudgetDropdown(false), 200)}
            className="flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-background px-3 text-sm sm:w-40"
          >
            <span className={budget ? "text-foreground" : "text-muted-foreground"}>
              {budget ? budgetOptions[listingType].find(b => b.value === budget)?.label : "Budget"}
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          {showBudgetDropdown && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border bg-card p-2 shadow-lg">
              {budgetOptions[listingType].map((option) => (
                <button
                  key={option.value}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-secondary"
                  onClick={() => {
                    setBudget(option.value)
                    setShowBudgetDropdown(false)
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            onBlur={() => setTimeout(() => setShowTypeDropdown(false), 200)}
            className="flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-background px-3 text-sm sm:w-40"
          >
            <span className={propertyType ? "text-foreground" : "text-muted-foreground"}>
              {propertyType ? propertyTypes.find(t => t.value === propertyType)?.label : "Type"}
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          {showTypeDropdown && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border bg-card p-2 shadow-lg">
              {propertyTypes.map((option) => (
                <button
                  key={option.value}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-secondary"
                  onClick={() => {
                    setPropertyType(option.value)
                    setShowTypeDropdown(false)
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className={cn(isHero && "h-10 px-6")}>
          <Search className="mr-2 size-4" />
          Search
        </Button>
      </div>
    </div>
  )
}
