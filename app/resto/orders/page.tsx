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
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
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

  // Filtrer les commandes
  const filteredOrders = useMemo(() => {
    if (!owner) return [];
    
    let filtered = orders.filter(order => order.restaurantId === owner.restaurantId);
    
    // Filtrer par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Filtrer par date
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
    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [orders, owner, statusFilter, dateFilter]);

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
          {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} trouvée{filteredOrders.length > 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Filtres */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
          className="px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark bg-white"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmée</option>
          <option value="preparing">En préparation</option>
          <option value="ready">Prête</option>
          <option value="out_for_delivery">En cours de livraison</option>
          <option value="delivered">Livrée</option>
          <option value="cancelled">Annulée</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark bg-white"
        />
        {(statusFilter !== 'all' || dateFilter) && (
          <button
            onClick={() => {
              setStatusFilter('all');
              setDateFilter('');
            }}
            className="px-4 py-3 border-2 border-bite-gray-300 text-bite-text-dark rounded-xl hover:bg-bite-gray-light transition font-body font-medium"
          >
            Réinitialiser
          </button>
        )}
      </div>
      
      {/* Liste des commandes - Optimisé pour laptop : 2 colonnes */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filteredOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onStatusUpdate={handleOrderUpdate}
            />
          ))}
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
            {statusFilter !== 'all' || dateFilter
              ? 'Essayez de modifier les filtres'
              : 'Les nouvelles commandes apparaîtront ici'}
          </p>
        </div>
      )}
    </div>
  );
}
