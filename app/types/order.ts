export type OrderStatus = 
  | 'pending'      // En attente
  | 'confirmed'    // Confirmée
  | 'preparing'    // En préparation
  | 'ready'        // Prête
  | 'out_for_delivery' // En livraison
  | 'delivered'    // Livrée
  | 'cancelled';   // Annulée

export interface OrderItem {
  id: string;
  dishName: string;
  quantity: number;
  price: number; // Prix unitaire en FCFA
  restaurantId: number;
}

export interface Order {
  id: string;
  restaurantId: number;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number; // En FCFA
  deliveryAddress: {
    street: string;
    district: string;
    department: string;
    city: string;
  };
  paymentMethod: 'mtn_money' | 'airtel_money' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: string; // Temps estimé de livraison
  notes?: string; // Notes du client
  deliveryDriverId?: string; // ID du livreur assigné
  deliveryCode?: string; // Code QR pour la confirmation de livraison
}

export interface RestaurantStats {
  totalOrdersToday: number;
  totalRevenueToday: number;
  pendingOrders: number;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
}

export interface Restaurant {
  id: number;
  name: string;
  ownerName: string;
  ownerPhone: string;
  email?: string;
  address: {
    street: string;
    district: string;
    department: string;
    city: string;
  };
  isActive: boolean;
  createdAt: Date;
}


