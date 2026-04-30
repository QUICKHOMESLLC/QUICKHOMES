"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { indianCities } from "@/lib/mock-data"
import { 
  ChevronLeft, 
  ChevronRight, 
  Check,
  Home,
  MapPin,
  Building2,
  IndianRupee,
  Image,
  FileCheck,
  Upload,
  User,
  Briefcase,
  Building
} from "lucide-react"

interface StepFormProps {
  onComplete: () => void
  onCancel: () => void
}

const steps = [
  { id: 1, title: "Basic Details", icon: Home },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Property Details", icon: Building2 },
  { id: 4, title: "Pricing", icon: IndianRupee },
  { id: 5, title: "Media Upload", icon: Image },
  { id: 6, title: "Review & Publish", icon: FileCheck },
]

const propertyTypes = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Independent House", value: "house" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
  { label: "PG/Co-living", value: "pg" },
]

const listingTypes = [
  { label: "Sell", value: "sale", description: "I want to sell my property" },
  { label: "Rent", value: "rent", description: "I want to rent out my property" },
]

const sellerTypes = [
  { label: "Owner", value: "owner", icon: User, description: "I own this property" },
  { label: "Broker", value: "broker", icon: Briefcase, description: "I am a real estate agent" },
  { label: "Builder", value: "builder", icon: Building, description: "I represent a builder/developer" },
]

const furnishingOptions = [
  { label: "Unfurnished", value: "unfurnished" },
  { label: "Semi-Furnished", value: "semi-furnished" },
  { label: "Fully Furnished", value: "fully-furnished" },
]

const facingOptions = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]

export function StepForm({ onComplete, onCancel }: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    listingType: "",
    sellerType: "",
    propertyType: "",
    
    // Step 2: Location
    city: "",
    locality: "",
    address: "",
    pincode: "",
    
    // Step 3: Property Details
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    area: "",
    floor: "",
    totalFloors: "",
    facing: "",
    furnishing: "",
    ageOfProperty: "",
    amenities: [] as string[],
    
    // Step 4: Pricing
    expectedPrice: "",
    priceNegotiable: false,
    maintenanceCharges: "",
    rera: "",
    
    // Step 5: Media
    images: [] as string[],
    
    // Step 6: Additional
    description: "",
    phone: "",
  })

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    onComplete()
  }

  const progress = (currentStep / 6) * 100

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isComplete = currentStep > step.id
            const isCurrent = currentStep === step.id
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border-2 transition-colors",
                      isComplete 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : isCurrent 
                          ? "border-primary text-primary" 
                          : "border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {isComplete ? <Check className="size-5" /> : <Icon className="size-5" />}
                  </div>
                  <span className={cn(
                    "mt-2 hidden text-xs font-medium sm:block",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "mx-2 h-0.5 w-8 sm:w-16",
                    currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30"
                  )} />
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Tell us about your property and yourself"}
            {currentStep === 2 && "Where is your property located?"}
            {currentStep === 3 && "Provide details about your property"}
            {currentStep === 4 && "Set your expected price"}
            {currentStep === 5 && "Upload photos of your property"}
            {currentStep === 6 && "Review your listing before publishing"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <>
              <div className="space-y-4">
                <label className="text-sm font-medium">I want to</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {listingTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => updateFormData("listingType", type.value)}
                      className={cn(
                        "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
                        formData.listingType === type.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="font-semibold">{type.label}</span>
                      <span className="text-sm text-muted-foreground">{type.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">I am a</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {sellerTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => updateFormData("sellerType", type.value)}
                        className={cn(
                          "flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all",
                          formData.sellerType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className="mb-2 size-6" />
                        <span className="font-semibold">{type.label}</span>
                        <span className="text-xs text-muted-foreground">{type.description}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Property Type</label>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => updateFormData("propertyType", type.value)}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                        formData.propertyType === type.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select City</option>
                    {indianCities.map((city) => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Locality *</label>
                  <Input
                    placeholder="e.g., Andheri West"
                    value={formData.locality}
                    onChange={(e) => updateFormData("locality", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Complete Address *</label>
                <Textarea
                  placeholder="Enter your complete address including building name, street..."
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pincode *</label>
                <Input
                  placeholder="e.g., 400053"
                  value={formData.pincode}
                  onChange={(e) => updateFormData("pincode", e.target.value)}
                  maxLength={6}
                />
              </div>
            </>
          )}

          {/* Step 3: Property Details */}
          {currentStep === 3 && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bedrooms *</label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => updateFormData("bedrooms", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} BHK</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bathrooms *</label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => updateFormData("bathrooms", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Balconies</label>
                  <select
                    value={formData.balconies}
                    onChange={(e) => updateFormData("balconies", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Super Built-up Area (sq.ft) *</label>
                  <Input
                    type="number"
                    placeholder="e.g., 1200"
                    value={formData.area}
                    onChange={(e) => updateFormData("area", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Age (years)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.ageOfProperty}
                    onChange={(e) => updateFormData("ageOfProperty", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Floor Number</label>
                  <Input
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.floor}
                    onChange={(e) => updateFormData("floor", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Floors</label>
                  <Input
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.totalFloors}
                    onChange={(e) => updateFormData("totalFloors", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Facing</label>
                <div className="flex flex-wrap gap-2">
                  {facingOptions.map((facing) => (
                    <button
                      key={facing}
                      type="button"
                      onClick={() => updateFormData("facing", facing)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                        formData.facing === facing
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      {facing}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Furnishing</label>
                <div className="flex flex-wrap gap-2">
                  {furnishingOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateFormData("furnishing", option.value)}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                        formData.furnishing === option.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {["Swimming Pool", "Gym", "Parking", "24/7 Security", "Power Backup", "Lift", "Garden", "Clubhouse", "Intercom", "Fire Safety"].map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                        formData.amenities.includes(amenity)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 4 && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Expected Price (INR) *
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder={formData.listingType === "rent" ? "e.g., 45000" : "e.g., 8500000"}
                    className="pl-10"
                    value={formData.expectedPrice}
                    onChange={(e) => updateFormData("expectedPrice", e.target.value)}
                  />
                </div>
                {formData.expectedPrice && (
                  <p className="text-sm text-muted-foreground">
                    {formData.listingType === "rent" 
                      ? `Rs. ${parseInt(formData.expectedPrice).toLocaleString('en-IN')}/month`
                      : parseInt(formData.expectedPrice) >= 10000000
                        ? `Rs. ${(parseInt(formData.expectedPrice) / 10000000).toFixed(2)} Cr`
                        : `Rs. ${(parseInt(formData.expectedPrice) / 100000).toFixed(2)} L`
                    }
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-secondary/50">
                <input
                  type="checkbox"
                  checked={formData.priceNegotiable}
                  onChange={(e) => updateFormData("priceNegotiable", e.target.checked)}
                  className="size-4 rounded border-input"
                />
                <div>
                  <span className="font-medium">Price is negotiable</span>
                  <p className="text-sm text-muted-foreground">Allow buyers to negotiate on the price</p>
                </div>
              </label>

              {formData.listingType === "rent" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maintenance Charges (per month)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      className="pl-10"
                      value={formData.maintenanceCharges}
                      onChange={(e) => updateFormData("maintenanceCharges", e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  RERA Registration Number
                  <Badge variant="outline" className="ml-2 text-green-600">Recommended</Badge>
                </label>
                <Input
                  placeholder="e.g., P51800012345"
                  value={formData.rera}
                  onChange={(e) => updateFormData("rera", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Properties with RERA registration get more visibility and trust
                </p>
              </div>
            </>
          )}

          {/* Step 5: Media Upload */}
          {currentStep === 5 && (
            <>
              <div className="space-y-4">
                <label className="text-sm font-medium">Property Images *</label>
                <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:border-muted-foreground/50">
                  <Upload className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <h3 className="font-semibold">Drop your images here</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    or click to browse from your device
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Upload at least 5 images for better visibility (Max 20 images, 5MB each)
                  </p>
                  <Button type="button" variant="outline" className="mt-4">
                    Select Images
                  </Button>
                </div>
              </div>

              <div className="rounded-lg bg-primary/5 p-4">
                <h4 className="font-medium">Tips for great photos</h4>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Use natural lighting for best results</li>
                  <li>Include photos of all rooms, kitchen, and bathrooms</li>
                  <li>Add exterior/building photos</li>
                  <li>Show amenities and views</li>
                </ul>
              </div>
            </>
          )}

          {/* Step 6: Review & Publish */}
          {currentStep === 6 && (
            <>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-3 font-semibold">Property Overview</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listing Type</span>
                      <span className="capitalize">{formData.listingType || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Type</span>
                      <span className="capitalize">{formData.propertyType || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Configuration</span>
                      <span>{formData.bedrooms} BHK, {formData.bathrooms} Bath</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Area</span>
                      <span>{formData.area} sq.ft</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-3 font-semibold">Location</h4>
                  <p className="text-sm">
                    {formData.address || "-"}, {formData.locality}, {formData.city} - {formData.pincode}
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-3 font-semibold">Pricing</h4>
                  <p className="text-2xl font-bold text-primary">
                    {formData.expectedPrice
                      ? formData.listingType === "rent"
                        ? `Rs. ${parseInt(formData.expectedPrice).toLocaleString('en-IN')}/month`
                        : parseInt(formData.expectedPrice) >= 10000000
                          ? `Rs. ${(parseInt(formData.expectedPrice) / 10000000).toFixed(2)} Cr`
                          : `Rs. ${(parseInt(formData.expectedPrice) / 100000).toFixed(2)} L`
                      : "-"
                    }
                  </p>
                  {formData.priceNegotiable && (
                    <Badge variant="secondary" className="mt-2">Negotiable</Badge>
                  )}
                  {formData.rera && (
                    <Badge variant="outline" className="ml-2 mt-2 text-green-600">RERA: {formData.rera}</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Description</label>
                  <Textarea
                    placeholder="Describe your property in detail..."
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number *</label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onCancel : prevStep}
            >
              <ChevronLeft className="mr-2 size-4" />
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>

            <div className="flex gap-2">
              <Button type="button" variant="ghost">
                Save Draft
              </Button>
              {currentStep < 6 ? (
                <Button type="button" onClick={nextStep}>
                  Continue
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit}>
                  <Check className="mr-2 size-4" />
                  Publish Listing
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
