export interface Site {
  title: string;
  location: string;
  duration: string;
  sector: string;
  rating: number;
  price: number;
  imageUrl: string;
  description?: string;
  features?: string[];
  startTime?: string;
  maxGroupSize?: number;
  included?: string[];
  reviews?: number;
}

export interface Filters {
  locations: string[];
  priceRange: {
    min: number;
    max: number;
  };
  durations: string[];
  services: string[];
}
