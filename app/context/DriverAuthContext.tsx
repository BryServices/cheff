'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DeliveryDriver } from '@/app/types/delivery';
import { getAllDrivers, updateDriverStatus } from '@/app/data/drivers';

interface DriverCredentials {
  driverCode: string;
  password: string;
  driverId: string;
  name: string;
}

interface DriverAuthContextType {
  driver: DeliveryDriver | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (driverCode: string, password: string) => Promise<void>;
  logout: () => void;
  activateDriver: () => void;
}

const DriverAuthContext = createContext<DriverAuthContextType | undefined>(undefined);

// Données des livreurs enregistrés par le Super Admin
// En production, cela viendrait d'une base de données
const registeredDrivers: DriverCredentials[] = [
  {
    driverCode: 'DRV001',
    password: 'password123',
    driverId: 'driver_1',
    name: 'Jean Mboungou',
  },
  {
    driverCode: 'DRV002',
    password: 'password123',
    driverId: 'driver_2',
    name: 'Marie Koutou',
  },
  {
    driverCode: 'DRV003',
    password: 'password123',
    driverId: 'driver_3',
    name: 'Paul Ngoua',
  },
  {
    driverCode: 'DRV004',
    password: 'password123',
    driverId: 'driver_4',
    name: 'Sophie Loundou',
  },
];

export function DriverAuthProvider({ children }: { children: ReactNode }) {
  const [driver, setDriver] = useState<DeliveryDriver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialiser les livreurs dans localStorage si nécessaire
    if (typeof window !== 'undefined') {
      const storedDrivers = localStorage.getItem('cheff_registered_drivers');
      if (!storedDrivers) {
        localStorage.setItem('cheff_registered_drivers', JSON.stringify(registeredDrivers));
      }
    }

    // Vérifier si le livreur est connecté au chargement
    const storedDriver = localStorage.getItem('cheff_driver_session');
    if (storedDriver) {
      try {
        const driverData = JSON.parse(storedDriver);
        if (driverData.createdAt) {
          driverData.createdAt = new Date(driverData.createdAt);
        }
        setDriver(driverData);
      } catch (error) {
        console.error('Error parsing stored driver:', error);
        localStorage.removeItem('cheff_driver_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (driverCode: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Récupérer les livreurs enregistrés
      const storedDrivers = localStorage.getItem('cheff_registered_drivers');
      const drivers: DriverCredentials[] = storedDrivers 
        ? JSON.parse(storedDrivers)
        : registeredDrivers;

      // Vérifier les identifiants
      const driverCred = drivers.find(
        (d) => d.driverCode === driverCode.toUpperCase() && d.password === password
      );

      if (!driverCred) {
        throw new Error('Code livreur ou mot de passe incorrect');
      }

      // Récupérer les informations complètes du livreur
      const allDrivers = getAllDrivers();
      const driverData = allDrivers.find(d => d.id === driverCred.driverId);

      if (!driverData) {
        throw new Error('Livreur non trouvé');
      }

      // Le livreur n'est pas encore actif tant qu'il ne s'est pas connecté
      // On ne change pas le statut ici, il sera activé explicitement

      localStorage.setItem('cheff_driver_session', JSON.stringify(driverData));
      setDriver(driverData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const activateDriver = () => {
    if (!driver) return;

    // Activer le livreur (le rendre disponible)
    const updatedDriver = { ...driver, isActive: true, status: 'available' as const };
    updateDriverStatus(driver.id, 'available');
    
    // Mettre à jour dans localStorage
    const allDrivers = getAllDrivers();
    const driverIndex = allDrivers.findIndex(d => d.id === driver.id);
    if (driverIndex !== -1) {
      allDrivers[driverIndex] = { ...allDrivers[driverIndex], isActive: true };
      localStorage.setItem('cheff_drivers', JSON.stringify(allDrivers));
    }

    localStorage.setItem('cheff_driver_session', JSON.stringify(updatedDriver));
    setDriver(updatedDriver);
  };

  const logout = () => {
    if (driver) {
      // Remettre le livreur hors ligne
      updateDriverStatus(driver.id, 'offline');
    }
    localStorage.removeItem('cheff_driver_session');
    setDriver(null);
  };

  return (
    <DriverAuthContext.Provider
      value={{
        driver,
        isAuthenticated: !!driver,
        isLoading,
        login,
        logout,
        activateDriver,
      }}
    >
      {children}
    </DriverAuthContext.Provider>
  );
}

export function useDriverAuth() {
  const context = useContext(DriverAuthContext);
  if (context === undefined) {
    throw new Error('useDriverAuth must be used within a DriverAuthProvider');
  }
  return context;
}

