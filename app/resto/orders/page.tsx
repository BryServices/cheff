'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRestaurantAuth } from '@/app/context/RestaurantAuthContext';
import { getAllOrders, mockOrders } from '@/app/data/orders';
import { Order, OrderStatus } from '@/app/types/order';
import OrderCard from '@/app/components/OrderCard';
import { getStatusLabel } from '@/app/utils/restaurantStats';

export default function RestoOrdersPage() {
  const { owner, isAuthenticated, isLoading: authLoading } = useRestaurantAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dateFilter, setDateFilter] = useState<string>('');

  // Charger les commandes
  useEffect(() => {
    if (owner && isAuthenticated) {
      if (typeof window !== 'undefined') {
        const storedOrders = localStorage.getItem('cheff_orders');
        if (storedOrders) {
          try {
            const parsed = JSON.parse(storedOrders);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const ordersWithDates = parsed.map((order: any) => ({
                ...order,
                createdAt: new Date(order.createdAt),
                updatedAt: new Date(order.updatedAt),
              }));
              setOrders(ordersWithDates);
              return;
            }
          } catch (error) {
            console.error('Error parsing stored orders:', error);
          }
        }
        
        // Initialiser avec des données mock si localStorage est vide
        const ordersWithDates = mockOrders.map(order => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }));
        localStorage.setItem('cheff_orders', JSON.stringify(ordersWithDates));
        setOrders(ordersWithDates);
      }
    }
  }, [owner, isAuthenticated, refreshKey]);

  // Organiser les commandes par statut
  const ordersByStatus = useMemo(() => {
    if (!owner) return {
      pending: [],
      confirmed: [],
      preparing: [],
      ready: [],
      out_for_delivery: [],
      delivered: [],
      cancelled: [],
    };
    
    let filtered = orders.filter(order => order.restaurantId === owner.restaurantId);
    
    // Filtrer par date si nécessaire
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filterDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === filterDate.getTime();
      });
    }
    
    // Trier par date (plus récentes en premier)
    const sorted = filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return {
      pending: sorted.filter(o => o.status === 'pending'),
      confirmed: sorted.filter(o => o.status === 'confirmed'),
      preparing: sorted.filter(o => o.status === 'preparing'),
      ready: sorted.filter(o => o.status === 'ready'),
      out_for_delivery: sorted.filter(o => o.status === 'out_for_delivery'),
      delivered: sorted.filter(o => o.status === 'delivered'),
      cancelled: sorted.filter(o => o.status === 'cancelled'),
    };
  }, [orders, owner, dateFilter]);

  const totalOrders = useMemo(() => {
    return Object.values(ordersByStatus).reduce((sum, arr) => sum + arr.length, 0);
  }, [ordersByStatus]);

  const handleOrderUpdate = () => {
    // Recharger les commandes
    const storedOrders = localStorage.getItem('cheff_orders');
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders).map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }));
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error parsing stored orders:', error);
      }
    }
    setRefreshKey(prev => prev + 1);
  };

  const renderOrderSection = (title: string, status: OrderStatus, ordersList: Order[]) => {
    if (ordersList.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark">
            {title}
          </h2>
          <span className="px-3 py-1 bg-bite-primary text-white text-xs font-heading font-bold rounded-full">
            {ordersList.length}
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {ordersList.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onStatusUpdate={handleOrderUpdate}
            />
          ))}
        </div>
      </div>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bite-primary mx-auto"></div>
          <p className="mt-4 text-bite-text-light font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !owner) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-bite p-12 text-center border border-bite-gray-200">
          <p className="text-bite-text-dark text-lg font-body mb-4">
            Veuillez vous connecter pour accéder aux commandes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-2">
          Gestion des Commandes
        </h1>
        <p className="text-bite-text-light font-body">
          {totalOrders} commande{totalOrders > 1 ? 's' : ''} au total
        </p>
      </div>
      
      {/* Filtre par date */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark bg-white"
        />
        {dateFilter && (
          <button
            onClick={() => setDateFilter('')}
            className="px-4 py-3 border-2 border-bite-gray-300 text-bite-text-dark rounded-xl hover:bg-bite-gray-light transition font-body font-medium"
          >
            Réinitialiser
          </button>
        )}
      </div>
      
      {/* Commandes organisées par statut */}
      {totalOrders > 0 ? (
        <div>
          {renderOrderSection('En attente', 'pending', ordersByStatus.pending)}
          {renderOrderSection('En préparation', 'preparing', ordersByStatus.preparing)}
          {renderOrderSection('En livraison', 'out_for_delivery', ordersByStatus.out_for_delivery)}
          {renderOrderSection('Livrée', 'delivered', ordersByStatus.delivered)}
          
          {/* Sections optionnelles pour les autres statuts */}
          {ordersByStatus.confirmed.length > 0 && renderOrderSection('Confirmée', 'confirmed', ordersByStatus.confirmed)}
          {ordersByStatus.ready.length > 0 && renderOrderSection('Prête', 'ready', ordersByStatus.ready)}
          {ordersByStatus.cancelled.length > 0 && renderOrderSection('Annulée', 'cancelled', ordersByStatus.cancelled)}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-bite p-12 text-center border border-bite-gray-200">
          <svg
            className="w-16 h-16 mx-auto text-bite-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-bite-text-light font-body text-lg mb-2">
            Aucune commande trouvée
          </p>
          <p className="text-bite-text-light font-body text-sm">
            {dateFilter
              ? 'Essayez de modifier le filtre de date'
              : 'Les nouvelles commandes apparaîtront ici'}
          </p>
        </div>
      )}
    </div>
  );
}
