import { Order, OrderStatus } from '@/app/types/order';

// Générer des commandes mock pour la démonstration
const generateMockOrders = (): Order[] => {
  const statuses: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
  const customers = [
    { name: 'Jean Mbemba', phone: '+242 06 123 4567' },
    { name: 'Marie Koutou', phone: '+242 05 234 5678' },
    { name: 'Paul Ngoua', phone: '+242 04 345 6789' },
    { name: 'Sophie Loundou', phone: '+242 06 456 7890' },
    { name: 'David Mboungou', phone: '+242 05 567 8901' },
  ];

  const dishes = [
    { name: 'Poulet Moambe', price: 8000 },
    { name: 'Saka-saka', price: 5000 },
    { name: 'Foufou', price: 3000 },
    { name: 'Capitaine braisé', price: 12000 },
    { name: 'Pizza Margherita', price: 6000 },
    { name: 'Burger Cheese', price: 5000 },
    { name: 'Sushi California', price: 10000 },
  ];

  const addresses = [
    { street: 'Avenue de l\'Indépendance', district: 'Centre-ville', department: 'Makélékélé', city: 'Brazzaville' },
    { street: 'Boulevard Lumumba', district: 'Poto-Poto Centre', department: 'Poto-Poto', city: 'Brazzaville' },
    { street: 'Avenue Foch', district: 'Ouenzé', department: 'Ouenzé', city: 'Brazzaville' },
    { street: 'Avenue de la Paix', district: 'Bacongo', department: 'Bacongo', city: 'Brazzaville' },
  ];

  const orders: Order[] = [];
  const now = new Date();

  // Générer des commandes pour les 7 derniers jours
  for (let i = 0; i < 25; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const createdAt = new Date(now);
    createdAt.setDate(createdAt.getDate() - daysAgo);
    createdAt.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    
    // Générer 1-4 items par commande
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items = [];
    let totalAmount = 0;

    for (let j = 0; j < itemCount; j++) {
      const dish = dishes[Math.floor(Math.random() * dishes.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({
        id: `item_${i}_${j}`,
        dishName: dish.name,
        quantity,
        price: dish.price,
        restaurantId: 1,
      });
      totalAmount += dish.price * quantity;
    }

    const paymentMethods: Array<'mtn_money' | 'airtel_money' | 'cash_on_delivery'> = 
      ['mtn_money', 'airtel_money', 'cash_on_delivery'];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    orders.push({
      id: `order_${Date.now()}_${i}`,
      restaurantId: 1,
      customerName: customer.name,
      customerPhone: customer.phone,
      items,
      status,
      totalAmount,
      deliveryAddress: address,
      paymentMethod,
      paymentStatus: status === 'delivered' ? 'paid' : paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid',
      createdAt,
      updatedAt: createdAt,
      estimatedDeliveryTime: '30-45 min',
      notes: Math.random() > 0.7 ? 'Sans piment s\'il vous plaît' : undefined,
    });
  }

  // Trier par date de création (plus récentes en premier)
  return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const mockOrders: Order[] = generateMockOrders();

// Fonction pour obtenir toutes les commandes depuis localStorage ou mockOrders
export function getAllOrders(): Order[] {
  if (typeof window === 'undefined') {
    return mockOrders.map(order => ({
      ...order,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    }));
  }
  
  const storedOrders = localStorage.getItem('cheff_orders');
  if (storedOrders) {
    try {
      const parsed = JSON.parse(storedOrders);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }));
      }
    } catch (error) {
      console.error('Error parsing stored orders:', error);
    }
  }
  
  return [];
}

// Fonctions utilitaires pour filtrer les commandes
export function getOrdersByRestaurant(restaurantId: number): Order[] {
  const allOrders = getAllOrders();
  return allOrders.filter(order => order.restaurantId === restaurantId);
}

export function getOrdersByStatus(restaurantId: number, status: OrderStatus): Order[] {
  return getOrdersByRestaurant(restaurantId).filter(order => order.status === status);
}

export function getOrdersToday(restaurantId: number): Order[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return getOrdersByRestaurant(restaurantId).filter(order => {
    const orderDate = new Date(order.createdAt);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });
}

export function getRevenueToday(restaurantId: number): number {
  return getOrdersToday(restaurantId)
    .filter(order => order.paymentStatus === 'paid')
    .reduce((total, order) => total + order.totalAmount, 0);
}

export function getPendingOrdersCount(restaurantId: number): number {
  return getOrdersByStatus(restaurantId, 'pending').length +
         getOrdersByStatus(restaurantId, 'confirmed').length +
         getOrdersByStatus(restaurantId, 'preparing').length;
}

export function updateOrderStatus(orderId: string, newStatus: OrderStatus): Order | null {
  if (typeof window === 'undefined') return null;
  
  const storedOrders = localStorage.getItem('cheff_orders');
  let allOrders: any[];
  
  if (storedOrders) {
    try {
      allOrders = JSON.parse(storedOrders);
    } catch (error) {
      allOrders = [...mockOrders];
    }
  } else {
    allOrders = [...mockOrders];
  }
  
  const orderIndex = allOrders.findIndex((o: Order) => o.id === orderId);
  if (orderIndex === -1) return null;

  const order = allOrders[orderIndex];
  order.status = newStatus;
  order.updatedAt = new Date();
  allOrders[orderIndex] = order;
  
  // Sauvegarder dans localStorage
  localStorage.setItem('cheff_orders', JSON.stringify(allOrders));

  return order as Order;
}
