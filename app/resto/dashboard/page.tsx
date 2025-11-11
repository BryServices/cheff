'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRestaurantAuth } from '@/app/context/RestaurantAuthContext';
import { getAllOrders, getOrdersByRestaurant, mockOrders } from '@/app/data/orders';
import { calculateRestaurantStats, formatCurrency } from '@/app/utils/restaurantStats';
import { Order } from '@/app/types/order';
import OrderCard from '@/app/components/OrderCard';

export default function RestoDashboard() {
  const { owner, isAuthenticated } = useRestaurantAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

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

  // Calculer les statistiques
  const stats = useMemo(() => {
    if (!owner) {
      return {
        totalOrdersToday: 0,
        totalRevenueToday: 0,
        pendingOrders: 0,
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      };
    }
    return calculateRestaurantStats(owner.restaurantId, orders);
  }, [owner, orders]);

  // Obtenir les commandes récentes (10 dernières)
  const recentOrders = useMemo(() => {
    if (!owner) return [];
    const restaurantOrders = orders.filter(order => order.restaurantId === owner.restaurantId);
    return restaurantOrders
      .filter(order => order.status !== 'delivered' && order.status !== 'cancelled')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }, [owner, orders]);

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

  if (!isAuthenticated || !owner) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="bg-white rounded-2xl shadow-bite p-12 text-center border border-bite-gray-200">
          <p className="text-bite-text-dark text-lg font-body mb-4">
            Veuillez vous connecter pour accéder au tableau de bord
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark">
          Tableau de bord
        </h1>
        <div className="text-sm text-bite-text-light font-body">
          Bienvenue, {owner.firstName} {owner.lastName}
        </div>
      </div>
      
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 hover:shadow-bite-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-body font-medium text-bite-text-light uppercase tracking-wide">
              Commandes aujourd&apos;hui
            </h3>
            <svg className="w-5 h-5 text-bite-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-4xl font-heading text-bite-primary">{stats.totalOrdersToday}</p>
          <p className="text-xs text-bite-text-light font-body mt-1">
            {stats.totalOrdersToday > 0 ? 'Commandes reçues' : 'Aucune commande'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 hover:shadow-bite-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-body font-medium text-bite-text-light uppercase tracking-wide">
              Chiffre d&apos;affaires
            </h3>
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-4xl font-price text-green-600">{formatCurrency(stats.totalRevenueToday)}</p>
          <p className="text-xs text-bite-text-light font-body mt-1">
            Aujourd&apos;hui
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 hover:shadow-bite-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-body font-medium text-bite-text-light uppercase tracking-wide">
              Commandes en attente
            </h3>
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-4xl font-heading text-orange-500">{stats.pendingOrders}</p>
          <p className="text-xs text-bite-text-light font-body mt-1">
            Nécessitent une attention
          </p>
        </div>
      </div>

      {/* Statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-2xl shadow-bite p-4 border border-bite-gray-200">
          <p className="text-xs font-body font-medium text-bite-text-light uppercase tracking-wide mb-1">
            CA Total
          </p>
          <p className="text-2xl font-price text-bite-text-dark">{formatCurrency(stats.totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-4 border border-bite-gray-200">
          <p className="text-xs font-body font-medium text-bite-text-light uppercase tracking-wide mb-1">
            Total Commandes
          </p>
          <p className="text-2xl font-heading text-bite-text-dark">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-4 border border-bite-gray-200">
          <p className="text-xs font-body font-medium text-bite-text-light uppercase tracking-wide mb-1">
            Panier moyen
          </p>
          <p className="text-2xl font-price text-bite-text-dark">{formatCurrency(stats.averageOrderValue)}</p>
        </div>
      </div>
      
      {/* Commandes récentes */}
      <div className="bg-white rounded-2xl shadow-bite p-4 md:p-6 border border-bite-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark">
            Commandes récentes
          </h2>
          <span className="px-3 py-1 bg-bite-primary text-white text-xs font-heading font-bold rounded-full">
            {recentOrders.length}
          </span>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onStatusUpdate={handleOrderUpdate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
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
            <p className="text-bite-text-light font-body">Aucune commande récente</p>
          </div>
        )}
      </div>
    </div>
  );
}
