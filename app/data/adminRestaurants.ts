import { Restaurant } from '@/app/types/restaurant';
import { restaurants as mockRestaurants } from './restaurants';

export type RestaurantStatus = 'pending' | 'approved' | 'suspended';

export interface AdminRestaurant extends Restaurant {
  status: RestaurantStatus;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  restaurantCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Initialiser les restaurants avec des statuts
const initializeRestaurants = (): AdminRestaurant[] => {
  return mockRestaurants.map((restaurant, index) => ({
    ...restaurant,
    status: 'approved' as RestaurantStatus,
    ownerName: `Propriétaire ${restaurant.name}`,
    ownerPhone: `+242 0${index + 1} ${100 + index} ${200 + index}${index}`,
    ownerEmail: `owner${restaurant.id}@cheff.cg`,
    restaurantCode: `REST${String(restaurant.id).padStart(3, '0')}`,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  }));
};

// Fonction pour obtenir tous les restaurants
export function getAllAdminRestaurants(): AdminRestaurant[] {
  if (typeof window === 'undefined') {
    return initializeRestaurants();
  }

  const storedRestaurants = localStorage.getItem('cheff_admin_restaurants');
  if (storedRestaurants) {
    try {
      const parsed = JSON.parse(storedRestaurants);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((restaurant: any) => ({
          ...restaurant,
          createdAt: new Date(restaurant.createdAt),
          updatedAt: new Date(restaurant.updatedAt),
        }));
      }
    } catch (error) {
      console.error('Error parsing stored restaurants:', error);
    }
  }

  // Initialiser avec les données mock
  const initialRestaurants = initializeRestaurants();
  localStorage.setItem('cheff_admin_restaurants', JSON.stringify(initialRestaurants));
  return initialRestaurants;
}

// Fonction pour créer un nouveau restaurant
export function createAdminRestaurant(restaurantData: Omit<AdminRestaurant, 'id' | 'createdAt' | 'updatedAt'>): AdminRestaurant {
  const allRestaurants = getAllAdminRestaurants();
  const maxId = allRestaurants.reduce((max, r) => (r.id > max ? r.id : max), 0);
  
  const newRestaurant: AdminRestaurant = {
    ...restaurantData,
    id: maxId + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  allRestaurants.push(newRestaurant);
  localStorage.setItem('cheff_admin_restaurants', JSON.stringify(allRestaurants));

  // Ajouter aussi dans les credentials pour l'authentification
  const storedCredentials = localStorage.getItem('cheff_registered_restaurants');
  const credentials = storedCredentials ? JSON.parse(storedCredentials) : [];
  credentials.push({
    restaurantCode: newRestaurant.restaurantCode || `REST${String(newRestaurant.id).padStart(3, '0')}`,
    password: 'password123', // Mot de passe par défaut
    restaurantId: newRestaurant.id,
    ownerName: newRestaurant.ownerName || newRestaurant.name,
  });
  localStorage.setItem('cheff_registered_restaurants', JSON.stringify(credentials));

  return newRestaurant;
}

// Fonction pour mettre à jour un restaurant
export function updateAdminRestaurant(restaurantId: number, updates: Partial<AdminRestaurant>): AdminRestaurant | null {
  if (typeof window === 'undefined') return null;

  const storedRestaurants = localStorage.getItem('cheff_admin_restaurants');
  if (!storedRestaurants) return null;

  const allRestaurants: AdminRestaurant[] = JSON.parse(storedRestaurants);
  const restaurantIndex = allRestaurants.findIndex(r => r.id === restaurantId);
  if (restaurantIndex === -1) return null;

  const updatedRestaurant: AdminRestaurant = {
    ...allRestaurants[restaurantIndex],
    ...updates,
    updatedAt: new Date(),
  };

  allRestaurants[restaurantIndex] = updatedRestaurant;
  localStorage.setItem('cheff_admin_restaurants', JSON.stringify(allRestaurants));

  return updatedRestaurant;
}

// Fonction pour supprimer un restaurant
export function deleteAdminRestaurant(restaurantId: number): boolean {
  if (typeof window === 'undefined') return false;

  const storedRestaurants = localStorage.getItem('cheff_admin_restaurants');
  if (!storedRestaurants) return false;

  const allRestaurants: AdminRestaurant[] = JSON.parse(storedRestaurants);
  const filteredRestaurants = allRestaurants.filter(r => r.id !== restaurantId);
  localStorage.setItem('cheff_admin_restaurants', JSON.stringify(filteredRestaurants));

  // Supprimer aussi des credentials
  const storedCredentials = localStorage.getItem('cheff_registered_restaurants');
  if (storedCredentials) {
    const credentials = JSON.parse(storedCredentials);
    const filteredCredentials = credentials.filter((c: any) => c.restaurantId !== restaurantId);
    localStorage.setItem('cheff_registered_restaurants', JSON.stringify(filteredCredentials));
  }

  return true;
}

// Fonction pour obtenir un restaurant par ID
export function getAdminRestaurantById(restaurantId: number): AdminRestaurant | undefined {
  const allRestaurants = getAllAdminRestaurants();
  return allRestaurants.find(r => r.id === restaurantId);
}

