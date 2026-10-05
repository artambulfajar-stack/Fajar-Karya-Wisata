export interface TourPackage {
  id: string;
  title: string;
  category: 'keluarga' | 'study-tour' | 'group' | 'custom';
  categoryLabel: string;
  duration: string;
  destination: string;
  highlights: string[];
  startingPrice: string;
  priceNote: string;
  image: string;
  description: string;
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  included: string[];
  excluded: string[];
  recommendedPax: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  features: string[];
  targetAudience: string;
}

export interface DestinationRegion {
  id: string;
  name: string;
  cities: string[];
  badge: string;
  description: string;
  featuredSpots: string[];
  bestSeason: string;
  image: string;
}

export interface PromoItem {
  id: string;
  title: string;
  code: string;
  discount: string;
  validUntil: string;
  description: string;
  terms: string[];
  badge: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'armada' | 'alam' | 'study-tour' | 'gathering';
  categoryLabel: string;
  location: string;
  image: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  tripType: string;
  destination: string;
  rating: number;
  date: string;
}

export interface CustomTripState {
  destination: string;
  tripType: string;
  duration: string;
  participants: number;
  transportPreference: string;
  accommodationType: string;
  fullName: string;
  whatsappNumber: string;
  departureDate: string;
  specialNotes: string;
}
