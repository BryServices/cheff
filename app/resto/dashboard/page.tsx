'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRestaurantAuth } from '@/app/context/RestaurantAuthContext';
import { getAllOrders, getOrdersByRestaurant, mockOrders } from '@/app/data/orders';
import { calculateRestaurantStats, formatCurrency } from '@/app/utils/restaurantStats';
import { Order } from '@/app/types/order';
import OrderCard from '@/app/components/OrderCard';

export default function RestoDashboard() {
  const { owner, isAuthenticated, isLoading, login, logout } = useRestaurantAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // États pour l'authentification
  const [restaurantCode, setRestaurantCode] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    try {
      if (!restaurantCode.trim() || !password.trim()) {
        throw new Error('Veuillez remplir tous les champs');
      }

      await login(restaurantCode.trim(), password);
      // Réinitialiser le formulaire après connexion réussie
      setRestaurantCode('');
      setPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'Erreur lors de la connexion');
    } finally {
      setIsAuthLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bite-primary mx-auto"></div>
          <p className="mt-4 text-bite-text-light font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, afficher le formulaire de connexion
  if (!isAuthenticated || !owner) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-bite-lg p-6 md:p-8 border border-bite-gray-200">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-heading text-bite-text-dark mb-2">CHEFF Restaurateur</h1>
              <h2 className="text-2xl font-heading text-bite-text-dark mb-2">Connexion</h2>
              <p className="text-bite-text-light font-body">
                Connectez-vous pour accéder à votre tableau de bord
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-body">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Code Restaurant
                </label>
                <input
                  type="text"
                  value={restaurantCode}
                  onChange={(e) => setRestaurantCode(e.target.value.toUpperCase())}
                  placeholder="REST001"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light uppercase"
                  required
                />
                <p className="mt-1 text-xs text-bite-text-light font-body">
                  Code unique attribué par le Super Admin
                </p>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-bite-gray-light rounded-xl">
              <p className="text-xs text-bite-text-light font-body mb-2">
                <strong>Codes de démonstration :</strong>
              </p>
              <ul className="text-xs text-bite-text-light font-body space-y-1">
                <li>REST001 - password123</li>
                <li>REST002 - password123</li>
                <li>REST003 - password123</li>
                <li>REST004 - password123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est connecté, afficher le dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark">
          Tableau de bord
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-bite-text-light font-body">
            Bienvenue, {owner.firstName} {owner.lastName}
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition font-heading font-bold text-sm"
          >
            Déconnexion
          </button>
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
