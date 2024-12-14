export interface Site {
  title: string;
  location: string;
  duration: string;
  sector: string;
  rating: number;
  price: number;
  imageUrl: string;
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
