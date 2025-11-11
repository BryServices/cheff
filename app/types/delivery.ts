export type DeliveryDriverStatus = 
  | 'available'      // Disponible
  | 'picking_up'    // En route pour récupération
  | 'delivering'    // En livraison
  | 'offline';      // Hors ligne

export interface DeliveryDriver {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  licensePlate?: string;
  status: DeliveryDriverStatus;
  currentOrderId?: string;
  rating: number;
  totalDeliveries: number;
  isVerified: boolean;
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

