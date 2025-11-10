export interface Restaurant {
  id: number;
  name: string;
  cuisineType: string;
  address: {
    street: string;
    district: string;
    department: string;
    city: string;
  };
  rating: number;
  priceRange: 1 | 2 | 3; // €, €€, €€€
  deliveryTime: string;
  image: string;
  description: string;
  dishes?: string[]; // Noms de plats pour la recherche
  isPromoted?: boolean;
  promotion?: number; // Pourcentage de promotion
}

export interface RestaurantFilters {
  searchQuery: string;
  cuisineType: string;
  department: string;
  district: string;
  minRating: number;
  priceRange: string;
}

export type CuisineType = 
  | 'Tous'
  | 'Burgers'
  | 'Pizza'
  | 'Sushi'
  | 'Italien'
  | 'Asiatique'
  | 'Français'
  | 'Africain'
  | 'Fast Food'
  | 'Végétarien';

export type PriceRange = 'Tous' | '€' | '€€' | '€€€';

