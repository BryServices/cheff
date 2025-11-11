import { DeliveryDriver, DeliveryDriverStatus } from '@/app/types/delivery';

// Liste des livreurs disponibles (gérés par le Super Admin)
export const mockDrivers: DeliveryDriver[] = [
  {
    id: 'driver_1',
    driverCode: 'DRV001',
    password: 'password123',
    name: 'Jean Mboungou',
    phone: '+242 06 111 2222',
    vehicleType: 'motorcycle',
    licensePlate: 'CG-1234-AB',
    status: 'offline',
    rating: 4.8,
    totalDeliveries: 245,
    isVerified: true,
    isActive: false, // Pas encore activé (pas connecté)
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'driver_2',
    driverCode: 'DRV002',
    password: 'password123',
    name: 'Marie Koutou',
    phone: '+242 05 333 4444',
    vehicleType: 'motorcycle',
    licensePlate: 'CG-5678-CD',
    status: 'offline',
    rating: 4.9,
    totalDeliveries: 312,
    isVerified: true,
    isActive: false,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'driver_3',
    driverCode: 'DRV003',
    password: 'password123',
    name: 'Paul Ngoua',
    phone: '+242 04 555 6666',
    vehicleType: 'bicycle',
    status: 'offline',
    rating: 4.7,
    totalDeliveries: 189,
    isVerified: true,
    isActive: false,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'driver_4',
    driverCode: 'DRV004',
    password: 'password123',
    name: 'Sophie Loundou',
    phone: '+242 06 777 8888',
    vehicleType: 'motorcycle',
    licensePlate: 'CG-9012-EF',
    status: 'offline',
    rating: 4.6,
    totalDeliveries: 156,
    isVerified: true,
    isActive: false,
    createdAt: new Date('2024-02-15'),
  },
];

// Fonction pour obtenir tous les livreurs
export function getAllDrivers(): DeliveryDriver[] {
  if (typeof window === 'undefined') {
    return mockDrivers;
  }
  
  const storedDrivers = localStorage.getItem('cheff_drivers');
  if (storedDrivers) {
    try {
      const parsed = JSON.parse(storedDrivers);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((driver: any) => ({
          ...driver,
          createdAt: new Date(driver.createdAt),
          isActive: driver.isActive !== undefined ? driver.isActive : false,
          driverCode: driver.driverCode || `DRV${driver.id.slice(-1)}`,
          password: driver.password || 'password123',
        }));
      }
    } catch (error) {
      console.error('Error parsing stored drivers:', error);
    }
  }
  
  // Initialiser avec les données mock
  localStorage.setItem('cheff_drivers', JSON.stringify(mockDrivers));
  return mockDrivers;
}

// Fonction pour obtenir les livreurs disponibles (actifs et disponibles)
export function getAvailableDrivers(): DeliveryDriver[] {
  const allDrivers = getAllDrivers();
  return allDrivers.filter(driver => 
    driver.isActive === true && 
    driver.status === 'available'
  );
}

// Fonction pour créer un nouveau livreur (par le Super Admin)
export function createDriver(driverData: Omit<DeliveryDriver, 'id' | 'createdAt' | 'isActive' | 'status' | 'rating' | 'totalDeliveries'>): DeliveryDriver {
  const allDrivers = getAllDrivers();
  const newDriver: DeliveryDriver = {
    ...driverData,
    id: `driver_${Date.now()}`,
    status: 'offline',
    isActive: false,
    rating: 0,
    totalDeliveries: 0,
    createdAt: new Date(),
  };

  allDrivers.push(newDriver);
  localStorage.setItem('cheff_drivers', JSON.stringify(allDrivers));

  // Ajouter aussi dans les credentials
  const storedCredentials = localStorage.getItem('cheff_registered_drivers');
  const credentials = storedCredentials ? JSON.parse(storedCredentials) : [];
  credentials.push({
    driverCode: newDriver.driverCode,
    password: newDriver.password,
    driverId: newDriver.id,
    name: newDriver.name,
  });
  localStorage.setItem('cheff_registered_drivers', JSON.stringify(credentials));

  return newDriver;
}

// Fonction pour mettre à jour un livreur
export function updateDriver(driverId: string, updates: Partial<DeliveryDriver>): DeliveryDriver | null {
  if (typeof window === 'undefined') return null;
  
  const storedDrivers = localStorage.getItem('cheff_drivers');
  let allDrivers: DeliveryDriver[] = storedDrivers ? JSON.parse(storedDrivers) : mockDrivers;
  
  const driverIndex = allDrivers.findIndex(d => d.id === driverId);
  if (driverIndex === -1) return null;

  const updatedDriver = { ...allDrivers[driverIndex], ...updates };
  allDrivers[driverIndex] = updatedDriver;
  localStorage.setItem('cheff_drivers', JSON.stringify(allDrivers));

  return updatedDriver;
}

// Fonction pour supprimer un livreur
export function deleteDriver(driverId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const storedDrivers = localStorage.getItem('cheff_drivers');
  if (!storedDrivers) return false;

  const allDrivers: DeliveryDriver[] = JSON.parse(storedDrivers);
  const filteredDrivers = allDrivers.filter(d => d.id !== driverId);
  localStorage.setItem('cheff_drivers', JSON.stringify(filteredDrivers));

  // Supprimer aussi des credentials
  const storedCredentials = localStorage.getItem('cheff_registered_drivers');
  if (storedCredentials) {
    const credentials = JSON.parse(storedCredentials);
    const filteredCredentials = credentials.filter((c: any) => c.driverId !== driverId);
    localStorage.setItem('cheff_registered_drivers', JSON.stringify(filteredCredentials));
  }

  return true;
}

// Fonction pour mettre à jour le statut d'un livreur
export function updateDriverStatus(driverId: string, status: DeliveryDriverStatus, orderId?: string): DeliveryDriver | null {
  if (typeof window === 'undefined') return null;
  
  const storedDrivers = localStorage.getItem('cheff_drivers');
  let allDrivers: DeliveryDriver[] = storedDrivers ? JSON.parse(storedDrivers) : mockDrivers;
  
  const driverIndex = allDrivers.findIndex(d => d.id === driverId);
  if (driverIndex === -1) return null;

  const driver = allDrivers[driverIndex];
  driver.status = status;
  if (orderId) {
    driver.currentOrderId = orderId;
  } else {
    driver.currentOrderId = undefined;
  }
  
  allDrivers[driverIndex] = driver;
  localStorage.setItem('cheff_drivers', JSON.stringify(allDrivers));

  return driver;
}

// Fonction pour obtenir un livreur par ID
export function getDriverById(driverId: string): DeliveryDriver | undefined {
  const allDrivers = getAllDrivers();
  return allDrivers.find(d => d.id === driverId);
}

