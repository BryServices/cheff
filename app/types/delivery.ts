export type DeliveryDriverStatus = 
  | 'available'      // Disponible
  | 'picking_up'    // En route pour récupération
  | 'delivering'    // En livraison
  | 'offline';      // Hors ligne

export interface DeliveryDriver {
  id: string;
  driverCode: string; // Code unique du livreur (ex: DRV001)
  password: string; // Mot de passe pour la connexion
  name: string;
  phone: string;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  licensePlate?: string;
  status: DeliveryDriverStatus;
  currentOrderId?: string;
  rating: number;
  totalDeliveries: number;
  isVerified: boolean;
  isActive: boolean; // Si le livreur a activé son compte (connecté)
  createdAt: Date;
}

export interface DeliveryAssignment {
  id: string;
  orderId: string;
  driverId: string;
  restaurantId: number;
  restaurantName: string;
  assignedAt: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  deliveryCode: string; // Code QR pour la confirmation
  status: 'assigned' | 'picking_up' | 'delivering' | 'delivered' | 'cancelled';
}

