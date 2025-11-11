import { DeliveryDriver, DeliveryDriverStatus } from '@/app/types/delivery';

// Liste des livreurs disponibles (gérés par le Super Admin)
export const mockDrivers: DeliveryDriver[] = [
  {
    id: 'driver_1',
    name: 'Jean Mboungou',
    phone: '+242 06 111 2222',
    vehicleType: 'motorcycle',
    licensePlate: 'CG-1234-AB',
    status: 'available',
    rating: 4.8,
    totalDeliveries: 245,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'driver_2',
    name: 'Marie Koutou',
    phone: '+242 05 333 4444',
    vehicleType: 'motorcycle',
    licensePlate: 'CG-5678-CD',
    status: 'available',
    rating: 4.9,
    totalDeliveries: 312,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'driver_3',
    name: 'Paul Ngoua',
    phone: '+242 04 555 6666',
    vehicleType: 'bicycle',
    status: 'available',
    rating: 4.7,
    totalDeliveries: 189,
    isVerified: true,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'driver_4',
    name: 'Sophie Loundou',
    phone: '+242 06 777 8888',
    vehicleType: 'motorcycle',
    licensePlate: 'CG-9012-EF',
    status: 'delivering',
    currentOrderId: 'order_123',
    rating: 4.6,
    totalDeliveries: 156,
    isVerified: true,
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

// Fonction pour obtenir les livreurs disponibles
export function getAvailableDrivers(): DeliveryDriver[] {
  const allDrivers = getAllDrivers();
  return allDrivers.filter(driver => driver.status === 'available');
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

