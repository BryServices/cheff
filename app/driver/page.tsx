'use client';

import { useState, useEffect } from 'react';
import { useDriverAuth } from '@/app/context/DriverAuthContext';
import { getAllOrders } from '@/app/data/orders';
import { updateDriverStatus } from '@/app/data/drivers';
import { Order } from '@/app/types/order';
import { formatCurrency, getStatusLabel, getStatusColor } from '@/app/utils/restaurantStats';

export default function DriverPage() {
  const { driver, isAuthenticated, isLoading: authLoading, activateDriver, login, logout } = useDriverAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [assignedOrder, setAssignedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [driverCode, setDriverCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated && driver) {
      // Charger les commandes
      const allOrders = getAllOrders();
      setOrders(allOrders);

      // Trouver la commande assignée au livreur
      if (driver.currentOrderId) {
        const order = allOrders.find(o => o.id === driver.currentOrderId);
        if (order) {
          setAssignedOrder(order);
        }
      }

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, driver]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      await login(driverCode, password);
    } catch (error: any) {
      setLoginError(error.message || 'Erreur de connexion');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleActivate = () => {
    activateDriver();
  };

  const handleAcceptMission = (orderId: string) => {
    if (!driver) return;

    // Mettre à jour le statut du livreur
    updateDriverStatus(driver.id, 'picking_up', orderId);

    // Trouver la commande et mettre à jour son statut
    const storedOrders = localStorage.getItem('cheff_orders');
    if (storedOrders) {
      const allOrders = JSON.parse(storedOrders);
      const orderIndex = allOrders.findIndex((o: Order) => o.id === orderId);
      if (orderIndex !== -1) {
        // Le statut reste "ready" jusqu'à ce que le restaurant finalise
        allOrders[orderIndex].updatedAt = new Date();
        localStorage.setItem('cheff_orders', JSON.stringify(allOrders));
      }
    }

    // Trouver la commande
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setAssignedOrder(order);
    }
  };

  const handleStartDelivery = () => {
    if (!driver || !assignedOrder) return;

    // Mettre à jour le statut du livreur
    updateDriverStatus(driver.id, 'delivering', assignedOrder.id);

    // Mettre à jour le statut de la commande à "out_for_delivery"
    const storedOrders = localStorage.getItem('cheff_orders');
    if (storedOrders) {
      const allOrders = JSON.parse(storedOrders);
      const orderIndex = allOrders.findIndex((o: Order) => o.id === assignedOrder.id);
      if (orderIndex !== -1) {
        allOrders[orderIndex].status = 'out_for_delivery';
        allOrders[orderIndex].updatedAt = new Date();
        localStorage.setItem('cheff_orders', JSON.stringify(allOrders));
        
        // Mettre à jour l'ordre local
        const updatedOrder = { ...assignedOrder, status: 'out_for_delivery' as const };
        setAssignedOrder(updatedOrder);
      }
    }
  };

  const handleConfirmDelivery = () => {
    if (!driver || !assignedOrder) return;

    // Mettre à jour le statut de la commande à "delivered"
    const storedOrders = localStorage.getItem('cheff_orders');
    if (storedOrders) {
      const allOrders = JSON.parse(storedOrders);
      const orderIndex = allOrders.findIndex((o: Order) => o.id === assignedOrder.id);
      if (orderIndex !== -1) {
        allOrders[orderIndex].status = 'delivered';
        allOrders[orderIndex].updatedAt = new Date();
        localStorage.setItem('cheff_orders', JSON.stringify(allOrders));
      }
    }

    // Remettre le livreur disponible
    updateDriverStatus(driver.id, 'available');
    setAssignedOrder(null);
    
    // Afficher un message de succès
    alert('Livraison confirmée avec succès !');
  };

  // Trouver les nouvelles missions (commandes avec livreur assigné mais livreur pas encore en mission)
  const newMissions = orders.filter(order => 
    order.deliveryDriverId === driver?.id &&
    driver?.status === 'available' &&
    (order.status === 'ready' || order.status === 'out_for_delivery')
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bite-primary mx-auto"></div>
          <p className="mt-4 text-bite-text-light font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  // Page de connexion
  if (!isAuthenticated || !driver) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-bite-lg p-8 border border-bite-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-heading text-bite-text-dark mb-2">
              CHEFF Livreur
            </h1>
            <p className="text-bite-text-light font-body">
              Connectez-vous pour accéder à votre interface
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-body">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Code Livreur
              </label>
              <input
                type="text"
                value={driverCode}
                onChange={(e) => setDriverCode(e.target.value.toUpperCase())}
                placeholder="DRV001"
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark uppercase"
                required
              />
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
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50"
            >
              {isLoggingIn ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Page d'activation si le livreur n'est pas encore actif
  if (!driver.isActive) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-bite-lg p-8 border border-bite-gray-200 text-center">
          <div className="text-6xl mb-4">🛵</div>
          <h1 className="text-2xl font-heading text-bite-text-dark mb-2">
            Bienvenue, {driver.name} !
          </h1>
          <p className="text-bite-text-light font-body mb-6">
            Activez votre compte pour commencer à recevoir des missions de livraison.
            Une fois activé, vous apparaîtrez dans la liste des livreurs disponibles pour les restaurants.
          </p>
          <button
            onClick={handleActivate}
            className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg mb-4"
          >
            Activer mon compte
          </button>
          <button
            onClick={logout}
            className="w-full text-bite-text-light hover:text-bite-primary transition font-body font-medium text-sm"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  // Interface principale du livreur
  return (
    <div className="min-h-screen bg-bite-gray-light">
      {/* Header */}
      <nav className="bg-bite-dark shadow-bite-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-heading text-white tracking-tight">
                CHEFF Livreur
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white">
                <p className="text-sm font-body">{driver.name}</p>
                <p className="text-xs text-bite-accent">
                  {driver.status === 'available' && '✓ Disponible'}
                  {driver.status === 'picking_up' && '🛵 En route pour récupération'}
                  {driver.status === 'delivering' && '📦 En livraison'}
                  {driver.status === 'offline' && '⚫ Hors ligne'}
                </p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-body font-medium text-sm"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Notifications de nouvelles missions */}
        {newMissions.length > 0 && driver.status === 'available' && (
          <div className="mb-6 bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
            <h2 className="text-xl font-heading text-yellow-900 mb-4">
              🎯 Nouvelle mission disponible !
            </h2>
            {newMissions.map((mission) => {
              // Trouver le nom du restaurant
              const restaurantName = 'Restaurant'; // En production, récupérer depuis les données
              return (
                <div key={mission.id} className="bg-white rounded-xl p-4 mb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-body font-medium text-bite-text-dark mb-1">
                        Commande #{mission.id.slice(-6)} - {restaurantName}
                      </p>
                      <p className="text-sm text-bite-text-light font-body">
                        {formatCurrency(mission.totalAmount)} - {mission.deliveryAddress.street}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAcceptMission(mission.id)}
                      className="px-4 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold text-sm"
                    >
                      Accepter
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mission en cours */}
        {assignedOrder && (
          <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 mb-6">
            <h2 className="text-xl font-heading text-bite-text-dark mb-4">
              Mission en cours
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
                  Commande #{assignedOrder.id.slice(-6)}
                </p>
                <p className="text-sm text-bite-text-light font-body">
                  {new Date(assignedOrder.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
                  Client
                </p>
                <p className="text-sm text-bite-text-light font-body">
                  {assignedOrder.customerName} - {assignedOrder.customerPhone}
                </p>
              </div>

              <div>
                <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
                  Adresse de livraison
                </p>
                <p className="text-sm text-bite-text-light font-body">
                  {assignedOrder.deliveryAddress.street}, {assignedOrder.deliveryAddress.district}
                </p>
              </div>

              {assignedOrder.deliveryCode && (
                <div className="p-4 bg-bite-gray-light rounded-xl">
                  <p className="text-sm font-body font-medium text-bite-text-dark mb-2">
                    Code de livraison
                  </p>
                  <p className="text-2xl font-heading text-bite-primary font-mono">
                    {assignedOrder.deliveryCode}
                  </p>
                  <p className="text-xs text-bite-text-light font-body mt-2">
                    Ce code sera scanné pour confirmer la livraison
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-bite-gray-200">
                <div>
                  <p className="text-sm text-bite-text-light font-body">Total</p>
                  <p className="text-xl font-price text-bite-primary">
                    {formatCurrency(assignedOrder.totalAmount)}
                  </p>
                </div>
              </div>

              {/* Actions selon le statut */}
              {driver.status === 'picking_up' && assignedOrder.status === 'ready' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-sm font-body text-yellow-900 mb-2">
                    ⏳ En attente de finalisation par le restaurant
                  </p>
                  <p className="text-xs text-yellow-700 font-body">
                    Le restaurant va finaliser la commande et vous transmettre les informations complètes
                  </p>
                </div>
              )}

              {driver.status === 'picking_up' && assignedOrder.status === 'out_for_delivery' && (
                <button
                  onClick={handleStartDelivery}
                  className="w-full mt-4 px-4 py-3 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
                >
                  Commande récupérée - Démarrer la livraison
                </button>
              )}

              {driver.status === 'delivering' && (
                <div className="mt-4 space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm font-body text-green-900 mb-2">
                      ✓ En cours de livraison
                    </p>
                    <p className="text-xs text-green-700 font-body mb-3">
                      Le client doit confirmer la livraison en scannant le code QR ou en entrant le code de livraison
                    </p>
                    {assignedOrder.deliveryCode && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-green-300">
                        <p className="text-xs font-body font-medium text-green-900 mb-1">
                          Code de livraison :
                        </p>
                        <p className="text-lg font-mono font-bold text-green-700">
                          {assignedOrder.deliveryCode}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleConfirmDelivery}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-heading font-bold"
                  >
                    Confirmer la livraison (Livreur)
                  </button>
                  <p className="text-xs text-bite-text-light font-body text-center">
                    Le client peut aussi confirmer via : /client/orders/{assignedOrder.id}/confirm
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* État disponible */}
        {!assignedOrder && driver.status === 'available' && (
          <div className="bg-white rounded-2xl shadow-bite p-12 text-center border border-bite-gray-200">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-bite-text-dark text-lg font-body mb-2">
              Vous êtes disponible
            </p>
            <p className="text-bite-text-light font-body">
              Les nouvelles missions apparaîtront ici
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
