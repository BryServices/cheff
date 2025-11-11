'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RestaurantOwner } from '@/app/types/restaurant-owner';

interface RestaurantAuthContextType {
  owner: RestaurantOwner | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  sendVerificationCode: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<boolean>;
}

const RestaurantAuthContext = createContext<RestaurantAuthContextType | undefined>(undefined);

export function RestaurantAuthProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<RestaurantOwner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const sendVerificationCode = async (phone: string): Promise<void> => {
    // Simulation d'envoi de code SMS
    return new Promise((resolve) => {
      setTimeout(() => {
        const code = '123456'; // Code de démo
        localStorage.setItem('cheff_restaurant_verification_code', code);
        localStorage.setItem('cheff_restaurant_verification_phone', phone);
        console.log(`Code de vérification pour ${phone}: ${code}`);
        resolve();
      }, 1000);
    });
  };

  const verifyCode = async (phone: string, code: string): Promise<boolean> => {
    const storedCode = localStorage.getItem('cheff_restaurant_verification_code');
    const storedPhone = localStorage.getItem('cheff_restaurant_verification_phone');
    
    if (storedCode === code && storedPhone === phone) {
      localStorage.removeItem('cheff_restaurant_verification_code');
      localStorage.removeItem('cheff_restaurant_verification_phone');
      return true;
    }
    
    // Pour la démo, accepter aussi le code "123456"
    if (code === '123456' && storedPhone === phone) {
      localStorage.removeItem('cheff_restaurant_verification_code');
      localStorage.removeItem('cheff_restaurant_verification_phone');
      return true;
    }
    
    return false;
  };

  const login = async (phone: string, code: string): Promise<void> => {
    setIsLoading(true);
    try {
      const isValid = await verifyCode(phone, code);
      if (!isValid) {
        throw new Error('Code de vérification invalide');
      }

      // Récupérer ou créer le restaurateur
      const storedOwner = localStorage.getItem('cheff_restaurant_owner');
      if (storedOwner) {
        const ownerData = JSON.parse(storedOwner);
        if (ownerData.phone === phone) {
          if (ownerData.createdAt) {
            ownerData.createdAt = new Date(ownerData.createdAt);
          }
          setOwner(ownerData);
          return;
        }
      }

      // Créer un nouveau restaurateur pour la démo
      const newOwner: RestaurantOwner = {
        id: `owner_${Date.now()}`,
        firstName: 'Restaurateur',
        lastName: 'CHEFF',
        phone: phone.replace(/\s/g, ''),
        restaurantId: 1,
        isVerified: true,
        createdAt: new Date(),
      };

      localStorage.setItem('cheff_restaurant_owner', JSON.stringify(newOwner));
      setOwner(newOwner);
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
        sendVerificationCode,
        verifyCode,
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


