// Indian cities for the platform
export const indianCities = [
  { name: "Mumbai", state: "Maharashtra", properties: 12500, image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=60" },
  { name: "Delhi", state: "Delhi NCR", properties: 9800, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=60" },
  { name: "Bangalore", state: "Karnataka", properties: 8600, image: "https://images.unsplash.com/photo-1572372815316-fa5474e31ddc?w=800&auto=format&fit=crop&q=60" },
  { name: "Hyderabad", state: "Telangana", properties: 6200, image: "https://images.unsplash.com/photo-1551161242-b5af797b7233?w=800&auto=format&fit=crop&q=60" },
  { name: "Pune", state: "Maharashtra", properties: 5400, image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&auto=format&fit=crop&q=60" },
  { name: "Jaipur", state: "Rajasthan", properties: 3200, image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop&q=60" },
  { name: "Chennai", state: "Tamil Nadu", properties: 4800, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=60" },
  { name: "Kolkata", state: "West Bengal", properties: 4100, image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&auto=format&fit=crop&q=60" },
]

export const popularLocalities = {
  Mumbai: ["Andheri", "Bandra", "Powai", "Worli", "Lower Parel", "Juhu"],
  Delhi: ["South Delhi", "Dwarka", "Rohini", "Noida", "Gurgaon", "Greater Noida"],
  Bangalore: ["Whitefield", "Koramangala", "HSR Layout", "Electronic City", "Marathahalli", "Indiranagar"],
  Hyderabad: ["Gachibowli", "HITEC City", "Banjara Hills", "Kondapur", "Jubilee Hills", "Madhapur"],
  Pune: ["Hinjewadi", "Kharadi", "Wakad", "Baner", "Viman Nagar", "Koregaon Park"],
}

export type PropertyType = "apartment" | "villa" | "plot" | "house" | "commercial" | "pg"
export type ListingType = "sale" | "rent"
export type FurnishingType = "unfurnished" | "semi-furnished" | "fully-furnished"

export interface Property {
  id: string
  title: string
  type: PropertyType
  listingType: ListingType
  price: number
  pricePerSqft?: number
  location: {
    city: string
    locality: string
    address: string
    pincode: string
  }
  details: {
    bedrooms: number
    bathrooms: number
    balconies: number
    area: number
    floor: number
    totalFloors: number
    facing: string
    furnishing: FurnishingType
    ageOfProperty: number
  }
  amenities: string[]
  images: string[]
  seller: {
    id: string
    name: string
    type: "owner" | "broker" | "builder"
    verified: boolean
    phone: string
    responseRate: number
  }
  features: {
    rera: string | null
    verified: boolean
    isHot: boolean
    isNew: boolean
    viewsToday: number
  }
  nearby: {
    schools: string[]
    hospitals: string[]
    metro: string | null
    market: string | null
  }
  createdAt: string
  views: number
  inquiries: number
}

export const properties: Property[] = [
  {
    id: "prop-1",
    title: "Luxurious 3BHK Apartment in Andheri West",
    type: "apartment",
    listingType: "sale",
    price: 18500000,
    pricePerSqft: 15400,
    location: {
      city: "Mumbai",
      locality: "Andheri West",
      address: "Green Valley Society, DN Nagar",
      pincode: "400053"
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      balconies: 2,
      area: 1200,
      floor: 12,
      totalFloors: 25,
      facing: "East",
      furnishing: "semi-furnished",
      ageOfProperty: 2
    },
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Parking", "Clubhouse", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60"
    ],
    seller: {
      id: "seller-1",
      name: "Rajesh Kumar",
      type: "owner",
      verified: true,
      phone: "+91 98765 43210",
      responseRate: 95
    },
    features: {
      rera: "P51800012345",
      verified: true,
      isHot: true,
      isNew: false,
      viewsToday: 45
    },
    nearby: {
      schools: ["Ryan International School", "Podar International"],
      hospitals: ["Kokilaben Hospital", "Nanavati Hospital"],
      metro: "DN Nagar Metro (500m)",
      market: "Lokhandwala Market (1km)"
    },
    createdAt: "2024-01-15",
    views: 1234,
    inquiries: 28
  },
  {
    id: "prop-2",
    title: "Modern 2BHK Flat for Rent in Koramangala",
    type: "apartment",
    listingType: "rent",
    price: 45000,
    location: {
      city: "Bangalore",
      locality: "Koramangala",
      address: "Prestige Lakeside Habitat, 5th Block",
      pincode: "560095"
    },
    details: {
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      area: 1100,
      floor: 8,
      totalFloors: 15,
      facing: "North-East",
      furnishing: "fully-furnished",
      ageOfProperty: 3
    },
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Club House"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60"
    ],
    seller: {
      id: "seller-2",
      name: "Priya Sharma",
      type: "owner",
      verified: true,
      phone: "+91 87654 32109",
      responseRate: 88
    },
    features: {
      rera: null,
      verified: true,
      isHot: false,
      isNew: true,
      viewsToday: 23
    },
    nearby: {
      schools: ["Delhi Public School", "Bishop Cotton"],
      hospitals: ["Apollo Hospital", "Manipal Hospital"],
      metro: null,
      market: "Forum Mall (2km)"
    },
    createdAt: "2024-02-01",
    views: 567,
    inquiries: 15
  },
  {
    id: "prop-3",
    title: "Spacious 4BHK Villa in Gachibowli",
    type: "villa",
    listingType: "sale",
    price: 32000000,
    pricePerSqft: 8000,
    location: {
      city: "Hyderabad",
      locality: "Gachibowli",
      address: "Aparna Cyberzone, Financial District",
      pincode: "500032"
    },
    details: {
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      area: 4000,
      floor: 0,
      totalFloors: 2,
      facing: "South",
      furnishing: "semi-furnished",
      ageOfProperty: 1
    },
    amenities: ["Private Garden", "Swimming Pool", "Servant Room", "Modular Kitchen", "Home Theatre"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60"
    ],
    seller: {
      id: "seller-3",
      name: "Venkat Reddy",
      type: "builder",
      verified: true,
      phone: "+91 76543 21098",
      responseRate: 92
    },
    features: {
      rera: "P02100054321",
      verified: true,
      isHot: true,
      isNew: true,
      viewsToday: 67
    },
    nearby: {
      schools: ["Oakridge International", "DPS Gachibowli"],
      hospitals: ["KIMS Hospital", "Continental Hospital"],
      metro: "Hitec City Metro (3km)",
      market: "Inorbit Mall (2km)"
    },
    createdAt: "2024-01-25",
    views: 2341,
    inquiries: 45
  },
  {
    id: "prop-4",
    title: "Premium 1BHK in Hinjewadi IT Park",
    type: "apartment",
    listingType: "rent",
    price: 22000,
    location: {
      city: "Pune",
      locality: "Hinjewadi",
      address: "Blue Ridge Township, Phase 1",
      pincode: "411057"
    },
    details: {
      bedrooms: 1,
      bathrooms: 1,
      balconies: 1,
      area: 650,
      floor: 5,
      totalFloors: 20,
      facing: "West",
      furnishing: "fully-furnished",
      ageOfProperty: 4
    },
    amenities: ["Gym", "Swimming Pool", "Jogging Track", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60"
    ],
    seller: {
      id: "seller-4",
      name: "Amit Deshmukh",
      type: "broker",
      verified: true,
      phone: "+91 65432 10987",
      responseRate: 78
    },
    features: {
      rera: null,
      verified: false,
      isHot: false,
      isNew: false,
      viewsToday: 12
    },
    nearby: {
      schools: ["Symbiosis School", "VIBGYOR"],
      hospitals: ["Ruby Hall Clinic", "Sahyadri Hospital"],
      metro: null,
      market: "Xion Mall (1.5km)"
    },
    createdAt: "2024-01-10",
    views: 345,
    inquiries: 8
  },
  {
    id: "prop-5",
    title: "Builder Floor 3BHK in South Delhi",
    type: "house",
    listingType: "sale",
    price: 42000000,
    pricePerSqft: 21000,
    location: {
      city: "Delhi",
      locality: "Greater Kailash",
      address: "GK-1, M Block",
      pincode: "110048"
    },
    details: {
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      area: 2000,
      floor: 2,
      totalFloors: 4,
      facing: "North",
      furnishing: "unfurnished",
      ageOfProperty: 5
    },
    amenities: ["Parking", "Power Backup", "Lift", "Terrace Access"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60"
    ],
    seller: {
      id: "seller-5",
      name: "Sanjay Malhotra",
      type: "owner",
      verified: true,
      phone: "+91 54321 09876",
      responseRate: 85
    },
    features: {
      rera: null,
      verified: true,
      isHot: false,
      isNew: false,
      viewsToday: 34
    },
    nearby: {
      schools: ["DPS RK Puram", "Modern School"],
      hospitals: ["Max Hospital", "Fortis Hospital"],
      metro: "Greater Kailash Metro (800m)",
      market: "GK M Block Market (200m)"
    },
    createdAt: "2024-01-20",
    views: 876,
    inquiries: 19
  },
  {
    id: "prop-6",
    title: "Sea-View 2BHK in Worli",
    type: "apartment",
    listingType: "sale",
    price: 55000000,
    pricePerSqft: 45833,
    location: {
      city: "Mumbai",
      locality: "Worli",
      address: "Lodha The Park, Annie Besant Road",
      pincode: "400018"
    },
    details: {
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      area: 1200,
      floor: 35,
      totalFloors: 60,
      facing: "West",
      furnishing: "fully-furnished",
      ageOfProperty: 2
    },
    amenities: ["Swimming Pool", "Gym", "Spa", "Concierge", "Valet Parking", "Sky Lounge"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60"
    ],
    seller: {
      id: "seller-6",
      name: "Lodha Properties",
      type: "builder",
      verified: true,
      phone: "+91 43210 98765",
      responseRate: 99
    },
    features: {
      rera: "P51800067890",
      verified: true,
      isHot: true,
      isNew: false,
      viewsToday: 89
    },
    nearby: {
      schools: ["Dhirubhai Ambani School", "Jamnabai Narsee"],
      hospitals: ["Lilavati Hospital", "Breach Candy Hospital"],
      metro: "Lower Parel Metro (1km)",
      market: "Palladium Mall (2km)"
    },
    createdAt: "2024-02-05",
    views: 3456,
    inquiries: 67
  }
]

export interface Lead {
  id: string
  propertyId: string
  propertyTitle: string
  buyerName: string
  buyerPhone: string
  buyerEmail: string
  message: string
  status: "new" | "contacted" | "interested" | "not-interested"
  createdAt: string
  isNew: boolean
}

export const sellerLeads: Lead[] = [
  {
    id: "lead-1",
    propertyId: "prop-1",
    propertyTitle: "Luxurious 3BHK Apartment in Andheri West",
    buyerName: "Vikram Singh",
    buyerPhone: "+91 99887 76655",
    buyerEmail: "vikram.singh@email.com",
    message: "Interested in site visit this weekend. Please share available slots.",
    status: "new",
    createdAt: "2024-02-10T10:30:00",
    isNew: true
  },
  {
    id: "lead-2",
    propertyId: "prop-1",
    propertyTitle: "Luxurious 3BHK Apartment in Andheri West",
    buyerName: "Neha Gupta",
    buyerPhone: "+91 88776 65544",
    buyerEmail: "neha.g@email.com",
    message: "Is the price negotiable? Looking for immediate possession.",
    status: "contacted",
    createdAt: "2024-02-09T15:45:00",
    isNew: false
  },
  {
    id: "lead-3",
    propertyId: "prop-6",
    propertyTitle: "Sea-View 2BHK in Worli",
    buyerName: "Arjun Kapoor",
    buyerPhone: "+91 77665 54433",
    buyerEmail: "arjun.k@email.com",
    message: "Can you share more photos and video walkthrough?",
    status: "interested",
    createdAt: "2024-02-08T09:00:00",
    isNew: false
  }
]

export interface Notification {
  id: string
  type: "lead" | "view" | "price-alert" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string
}

export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "lead",
    title: "New Inquiry",
    message: "Vikram Singh is interested in your 3BHK in Andheri",
    read: false,
    createdAt: "2024-02-10T10:30:00"
  },
  {
    id: "notif-2",
    type: "view",
    title: "Property Views",
    message: "Your Worli property got 45 views today",
    read: false,
    createdAt: "2024-02-10T08:00:00"
  },
  {
    id: "notif-3",
    type: "price-alert",
    title: "Price Drop Alert",
    message: "A property in your saved search has reduced price",
    read: true,
    createdAt: "2024-02-09T14:00:00"
  }
]

// Format price in Indian currency format
export function formatIndianPrice(price: number, type?: ListingType): string {
  if (type === "rent") {
    return `₹${price.toLocaleString('en-IN')}/mo`
  }
  
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('en-IN')} sq.ft`
}
