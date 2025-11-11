'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RestaurantOwner } from '@/app/types/restaurant-owner';

interface RestaurantCredentials {
  restaurantCode: string;
  password: string;
  restaurantId: number;
  ownerName: string;
}

interface RestaurantAuthContextType {
  owner: RestaurantOwner | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (restaurantCode: string, password: string) => Promise<void>;
  logout: () => void;
}

const RestaurantAuthContext = createContext<RestaurantAuthContextType | undefined>(undefined);

// Données des restaurants enregistrés par le Super Admin
// En production, cela viendrait d'une base de données
const registeredRestaurants: RestaurantCredentials[] = [
  {
    restaurantCode: 'REST001',
    password: 'password123',
    restaurantId: 1,
    ownerName: 'Le Congolais',
  },
  {
    restaurantCode: 'REST002',
    password: 'password123',
    restaurantId: 2,
    ownerName: 'Pizza Brazza',
  },
  {
    restaurantCode: 'REST003',
    password: 'password123',
    restaurantId: 3,
    ownerName: 'Burger King Brazza',
  },
  {
    restaurantCode: 'REST004',
    password: 'password123',
    restaurantId: 4,
    ownerName: 'Sushi Brazza',
  },
];

export function RestaurantAuthProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<RestaurantOwner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialiser les restaurants dans localStorage si nécessaire
    if (typeof window !== 'undefined') {
      const storedRestaurants = localStorage.getItem('cheff_registered_restaurants');
      if (!storedRestaurants) {
        localStorage.setItem('cheff_registered_restaurants', JSON.stringify(registeredRestaurants));
      }
    }

    // Vérifier si le restaurateur est connecté au chargement
    const storedOwner = localStorage.getItem('cheff_restaurant_owner');
    if (storedOwner) {
      try {
        const ownerData = JSON.parse(storedOwner);
        // Convertir les dates
        if (ownerData.createdAt) {
          ownerData.createdAt = new Date(ownerData.createdAt);
        }
        setOwner(ownerData);
      } catch (error) {
        console.error('Error parsing stored owner:', error);
        localStorage.removeItem('cheff_restaurant_owner');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (restaurantCode: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Récupérer les restaurants enregistrés
      const storedRestaurants = localStorage.getItem('cheff_registered_restaurants');
      const restaurants: RestaurantCredentials[] = storedRestaurants 
        ? JSON.parse(storedRestaurants)
        : registeredRestaurants;

      // Vérifier les identifiants
      const restaurant = restaurants.find(
        (r) => r.restaurantCode === restaurantCode.toUpperCase() && r.password === password
      );

      if (!restaurant) {
        throw new Error('Code restaurant ou mot de passe incorrect');
      }

      // Créer ou récupérer le restaurateur
      const existingOwner = localStorage.getItem('cheff_restaurant_owner');
      let ownerData: RestaurantOwner;

      if (existingOwner) {
        const parsed = JSON.parse(existingOwner);
        if (parsed.restaurantId === restaurant.restaurantId) {
          ownerData = parsed;
          if (ownerData.createdAt) {
            ownerData.createdAt = new Date(ownerData.createdAt);
          }
        } else {
          // Créer un nouveau owner pour ce restaurant
          ownerData = {
            id: `owner_${Date.now()}`,
            firstName: restaurant.ownerName.split(' ')[0] || 'Restaurateur',
            lastName: restaurant.ownerName.split(' ').slice(1).join(' ') || 'CHEFF',
            phone: '',
            restaurantId: restaurant.restaurantId,
            isVerified: true,
            createdAt: new Date(),
          };
        }
      } else {
        // Créer un nouveau owner
        ownerData = {
          id: `owner_${Date.now()}`,
          firstName: restaurant.ownerName.split(' ')[0] || 'Restaurateur',
          lastName: restaurant.ownerName.split(' ').slice(1).join(' ') || 'CHEFF',
          phone: '',
          restaurantId: restaurant.restaurantId,
          isVerified: true,
          createdAt: new Date(),
        };
      }

      localStorage.setItem('cheff_restaurant_owner', JSON.stringify(ownerData));
      setOwner(ownerData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('cheff_restaurant_owner');
    setOwner(null);
  };

  return (
    <RestaurantAuthContext.Provider
      value={{
        owner,
        isAuthenticated: !!owner,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </RestaurantAuthContext.Provider>
  );
}

export function useRestaurantAuth() {
  const context = useContext(RestaurantAuthContext);
  if (context === undefined) {
    throw new Error('useRestaurantAuth must be used within a RestaurantAuthProvider');
  }
  return context;
}
