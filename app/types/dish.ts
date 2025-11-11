export type DishCategory = 
  | 'entrees'      // Entrées
  | 'plats'        // Plats principaux
  | 'desserts'     // Desserts
  | 'boissons'     // Boissons
  | 'accompagnements'; // Accompagnements

export interface Dish {
  id: string;
  restaurantId: number;
  name: string;
  description: string;
  price: number; // En FCFA
  category: DishCategory;
  image?: string; // URL de l'image
  isAvailable: boolean;
  preparationTime?: number; // Temps de préparation en minutes
  ingredients?: string[];
  allergens?: string[];
  createdAt: Date;
  updatedAt: Date;
}

