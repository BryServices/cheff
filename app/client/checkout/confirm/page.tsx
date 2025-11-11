'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Order, OrderItem } from '@/app/types/order';

export default function ConfirmPaymentPage() {
  const { isAuthenticated, user, isLoading: authLoading, updateUser } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState<{
    items: OrderItem[];
    totalAmount: number;
    deliveryAddress: {
      street: string;
      city: string;
    };
    paymentMethod: 'mtn_money' | 'airtel_money' | 'cash_on_delivery';
  } | null>(null);

  useEffect(() => {
    // Récupérer les données de la commande depuis localStorage ou les paramètres
    if (typeof window !== 'undefined') {
      const storedOrderData = localStorage.getItem('cheff_pending_order');
      if (storedOrderData) {
        try {
          setOrderData(JSON.parse(storedOrderData));
        } catch (error) {
          console.error('Error parsing order data:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié, il sera redirigé par le layout
    // Mais on peut aussi vérifier ici et créer le profil si nécessaire
    if (!authLoading && isAuthenticated && user && orderData) {
      // Le profil a déjà été créé lors de la connexion si nécessaire
      // On peut maintenant traiter la commande
    }
  }, [authLoading, isAuthenticated, user, orderData]);

  const handleConfirmPayment = async () => {
    if (!user || !orderData) return;

    setIsProcessing(true);
    try {
      // Créer la commande
      const newOrder: Order = {
        id: `order_${Date.now()}`,
        restaurantId: orderData.items[0]?.restaurantId || 1,
        customerName: `${user.firstName} ${user.lastName}`.trim() || user.phone,
        customerPhone: user.phone,
        items: orderData.items,
        status: 'pending',
        totalAmount: orderData.totalAmount,
        deliveryAddress: {
          street: orderData.deliveryAddress.street,
          district: '',
          department: '',
          city: orderData.deliveryAddress.city,
        },
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid',
        createdAt: new Date(),
        updatedAt: new Date(),
        estimatedDeliveryTime: '30-45 min',
      };

      // Sauvegarder la commande
      const storedOrders = localStorage.getItem('cheff_orders');
      let allOrders: Order[] = [];
      
      if (storedOrders) {
        try {
          allOrders = JSON.parse(storedOrders);
        } catch (error) {
          console.error('Error parsing stored orders:', error);
        }
      }
      
      allOrders.push(newOrder);
      localStorage.setItem('cheff_orders', JSON.stringify(allOrders));

      // Mettre à jour les commandes de l'utilisateur dans son profil
      const userOrders = user.orders || [];
      userOrders.push(newOrder.id);
      const updatedUser = {
        ...user,
        orders: userOrders,
      };
      localStorage.setItem('cheff_user', JSON.stringify(updatedUser));
      // Mettre à jour le contexte d'authentification
      updateUser({ orders: userOrders });

      // Nettoyer les données temporaires
      localStorage.removeItem('cheff_pending_order');

      // Rediriger vers la page de confirmation de succès
      router.push(`/client/orders?orderId=${newOrder.id}`);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
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

  if (!isAuthenticated || !user) {
    return null; // Le layout redirigera vers la page de connexion
  }

  if (!orderData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4">
            Aucune commande en attente
          </h1>
          <p className="text-bite-text-light font-body mb-6">
            Il n&apos;y a pas de commande en attente de confirmation.
          </p>
          <button
            onClick={() => router.push('/client/checkout')}
            className="bg-bite-primary text-white px-6 py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold"
          >
            Retour au paiement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Confirmation de paiement
      </h1>

      <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 mb-6">
        <h2 className="text-xl font-heading text-bite-text-dark mb-4">Résumé de la commande</h2>
        <div className="space-y-3 mb-6">
          {orderData.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center pb-3 border-b border-bite-gray-200">
              <div>
                <p className="font-body font-medium text-bite-text-dark">{item.dishName}</p>
                <p className="text-sm text-bite-text-light">Quantité: {item.quantity}</p>
              </div>
              <p className="font-price text-bite-primary">
                {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
              </p>
            </div>
          ))}
          <div className="pt-3 border-t-2 border-bite-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading text-bite-text-dark">Total</span>
              <span className="text-2xl font-price text-bite-primary">
                {orderData.totalAmount.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-heading text-bite-text-dark mb-2">Adresse de livraison</h3>
          <p className="font-body text-bite-text-light">
            {orderData.deliveryAddress.street}, {orderData.deliveryAddress.city}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-heading text-bite-text-dark mb-2">Moyen de paiement</h3>
          <p className="font-body text-bite-text-light">
            {orderData.paymentMethod === 'mtn_money' && 'MTN Mobile Money'}
            {orderData.paymentMethod === 'airtel_money' && 'Airtel Money'}
            {orderData.paymentMethod === 'cash_on_delivery' && 'Paiement à la livraison'}
          </p>
        </div>

        <button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full bg-bite-primary text-white py-4 rounded-xl hover:bg-bite-dark transition font-heading font-bold text-lg shadow-bite-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Traitement en cours...' : 'Confirmer le paiement'}
        </button>
      </div>
    </div>
  );
}

