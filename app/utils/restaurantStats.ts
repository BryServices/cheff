import { Order } from '@/app/types/order';
import { RestaurantStats } from '@/app/types/order';

export function calculateRestaurantStats(restaurantId: number, orders: Order[]): RestaurantStats {
  const restaurantOrders = orders.filter(order => order.restaurantId === restaurantId);
  
  // Commandes d'aujourd'hui
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ordersToday = restaurantOrders.filter(order => {
    const orderDate = new Date(order.createdAt);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });

  // Chiffre d'affaires aujourd'hui (uniquement les commandes payées)
  const revenueToday = ordersToday
    .filter(order => order.paymentStatus === 'paid')
    .reduce((total, order) => total + order.totalAmount, 0);

  // Commandes en attente
  const pendingOrders = restaurantOrders.filter(order => 
    order.status === 'pending' || 
    order.status === 'confirmed' || 
    order.status === 'preparing'
  ).length;

  // Statistiques globales
  const totalRevenue = restaurantOrders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((total, order) => total + order.totalAmount, 0);

  const totalOrders = restaurantOrders.length;

  const averageOrderValue = totalOrders > 0 
    ? Math.round(totalRevenue / totalOrders) 
    : 0;

  return {
    totalOrdersToday: ordersToday.length,
    totalRevenueToday: revenueToday,
    pendingOrders,
    totalRevenue,
    totalOrders,
    averageOrderValue,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA';
}

export function getStatusLabel(status: string): string {
  const statusLabels: { [key: string]: string } = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    preparing: 'En préparation',
    ready: 'Prête',
    out_for_delivery: 'En livraison',
    delivered: 'Livrée',
    cancelled: 'Annulée',
  };
  return statusLabels[status] || status;
}

export function getStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-orange-100 text-orange-800',
    ready: 'bg-green-100 text-green-800',
    out_for_delivery: 'bg-purple-100 text-purple-800',
    delivered: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}


