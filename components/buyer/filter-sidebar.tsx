"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { X, ChevronDown, ChevronUp, Shield } from "lucide-react"

interface FilterSidebarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClose?: () => void
  className?: string
}

export interface Filters {
  listingType: "sale" | "rent" | "all"
  budget: { min: number; max: number }
  bhk: number[]
  propertyTypes: string[]
  furnishing: string[]
  postedBy: string[]
  verifiedOnly: boolean
  readyToMove: boolean
}

const bhkOptions = [1, 2, 3, 4, 5]
const propertyTypeOptions = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "House", value: "house" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
  { label: "PG", value: "pg" },
]
const furnishingOptions = [
  { label: "Fully Furnished", value: "fully-furnished" },
  { label: "Semi Furnished", value: "semi-furnished" },
  { label: "Unfurnished", value: "unfurnished" },
]
const postedByOptions = [
  { label: "Owner", value: "owner" },
  { label: "Broker", value: "broker" },
  { label: "Builder", value: "builder" },
]

export const defaultFilters: Filters = {
  listingType: "all",
  budget: { min: 0, max: 999999999 },
  bhk: [],
  propertyTypes: [],
  furnishing: [],
  postedBy: [],
  verifiedOnly: false,
  readyToMove: false,
}

export function FilterSidebar({ filters, onFiltersChange, onClose, className }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["budget", "bhk", "type", "furnishing", "postedBy"])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  const toggleArrayFilter = (key: keyof Filters, value: string | number) => {
    const current = filters[key] as (string | number)[]
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFiltersChange({ ...filters, [key]: updated })
  }

  const clearFilters = () => {
    onFiltersChange(defaultFilters)
  }

  const activeFilterCount = 
    (filters.bhk.length > 0 ? 1 : 0) +
    (filters.propertyTypes.length > 0 ? 1 : 0) +
    (filters.furnishing.length > 0 ? 1 : 0) +
    (filters.postedBy.length > 0 ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.readyToMove ? 1 : 0) +
    (filters.budget.min > 0 || filters.budget.max < 999999999 ? 1 : 0)

  return (
    <div className={cn("flex flex-col bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon-sm" onClick={onClose} className="lg:hidden">
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* Buy/Rent Toggle */}
        <div className="mb-6">
          <div className="flex gap-1 rounded-lg bg-secondary p-1">
            {["all", "sale", "rent"].map((type) => (
              <button
                key={type}
                onClick={() => onFiltersChange({ ...filters, listingType: type as Filters["listingType"] })}
                className={cn(
                  "flex-1 rounded-md py-2 text-sm font-medium capitalize transition-all",
                  filters.listingType === type
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {type === "all" ? "All" : type === "sale" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <FilterSection
          title="Budget"
          isExpanded={expandedSections.includes("budget")}
          onToggle={() => toggleSection("budget")}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Min (Lakhs)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.budget.min > 0 ? filters.budget.min / 100000 : ""}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    budget: { ...filters.budget, min: (parseFloat(e.target.value) || 0) * 100000 }
                  })}
                />
              </div>
              <span className="mt-5 text-muted-foreground">-</span>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Max (Lakhs)</label>
                <Input
                  type="number"
                  placeholder="Any"
                  value={filters.budget.max < 999999999 ? filters.budget.max / 100000 : ""}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    budget: { ...filters.budget, max: e.target.value ? parseFloat(e.target.value) * 100000 : 999999999 }
                  })}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.listingType !== "rent" ? (
                <>
                  <QuickBudget label="< 50L" onClick={() => onFiltersChange({ ...filters, budget: { min: 0, max: 5000000 } })} />
                  <QuickBudget label="50L-1Cr" onClick={() => onFiltersChange({ ...filters, budget: { min: 5000000, max: 10000000 } })} />
                  <QuickBudget label="1-2 Cr" onClick={() => onFiltersChange({ ...filters, budget: { min: 10000000, max: 20000000 } })} />
                  <QuickBudget label="2Cr+" onClick={() => onFiltersChange({ ...filters, budget: { min: 20000000, max: 999999999 } })} />
                </>
              ) : (
                <>
                  <QuickBudget label="< 15K" onClick={() => onFiltersChange({ ...filters, budget: { min: 0, max: 15000 } })} />
                  <QuickBudget label="15-30K" onClick={() => onFiltersChange({ ...filters, budget: { min: 15000, max: 30000 } })} />
                  <QuickBudget label="30-50K" onClick={() => onFiltersChange({ ...filters, budget: { min: 30000, max: 50000 } })} />
                  <QuickBudget label="50K+" onClick={() => onFiltersChange({ ...filters, budget: { min: 50000, max: 999999999 } })} />
                </>
              )}
            </div>
          </div>
        </FilterSection>

        {/* BHK */}
        <FilterSection
          title="BHK"
          isExpanded={expandedSections.includes("bhk")}
          onToggle={() => toggleSection("bhk")}
        >
          <div className="flex flex-wrap gap-2">
            {bhkOptions.map((bhk) => (
              <button
                key={bhk}
                onClick={() => toggleArrayFilter("bhk", bhk)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  filters.bhk.includes(bhk)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {bhk} BHK
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection
          title="Property Type"
          isExpanded={expandedSections.includes("type")}
          onToggle={() => toggleSection("type")}
        >
          <div className="flex flex-wrap gap-2">
            {propertyTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleArrayFilter("propertyTypes", option.value)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  filters.propertyTypes.includes(option.value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Furnishing */}
        <FilterSection
          title="Furnishing"
          isExpanded={expandedSections.includes("furnishing")}
          onToggle={() => toggleSection("furnishing")}
        >
          <div className="flex flex-wrap gap-2">
            {furnishingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleArrayFilter("furnishing", option.value)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  filters.furnishing.includes(option.value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Posted By */}
        <FilterSection
          title="Posted By"
          isExpanded={expandedSections.includes("postedBy")}
          onToggle={() => toggleSection("postedBy")}
        >
          <div className="flex flex-wrap gap-2">
            {postedByOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleArrayFilter("postedBy", option.value)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  filters.postedBy.includes(option.value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Quick Filters */}
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium">Quick Filters</h4>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-secondary/50">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onFiltersChange({ ...filters, verifiedOnly: e.target.checked })}
              className="size-4 rounded border-input"
            />
            <Shield className="size-4 text-green-600" />
            <span className="text-sm">Verified Properties Only</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-secondary/50">
            <input
              type="checkbox"
              checked={filters.readyToMove}
              onChange={(e) => onFiltersChange({ ...filters, readyToMove: e.target.checked })}
              className="size-4 rounded border-input"
            />
            <span className="text-sm">Ready to Move</span>
          </label>
        </div>
      </div>
    </div>
  )
}

function FilterSection({ 
  title, 
  isExpanded, 
  onToggle, 
  children 
}: { 
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode 
}) {
  return (
    <div className="border-b py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-sm font-medium"
      >
        {title}
        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  )
}

function QuickBudget({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
    >
      {label}
    </button>
  )
}
