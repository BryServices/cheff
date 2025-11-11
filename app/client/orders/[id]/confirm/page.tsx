'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAllOrders } from '@/app/data/orders';
import { Order } from '@/app/types/order';
import { updateOrderStatus } from '@/app/data/orders';
import { updateDriverStatus } from '@/app/data/drivers';

export default function ConfirmDeliveryPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [deliveryCode, setDeliveryCode] = useState('');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (orderId) {
      const allOrders = getAllOrders();
      const foundOrder = allOrders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        if (foundOrder.deliveryCode) {
          setDeliveryCode(foundOrder.deliveryCode);
        }
      }
    }
  }, [orderId]);

  const handleConfirmDelivery = async () => {
    if (!order || !deliveryCode.trim()) {
      setError('Veuillez entrer le code de livraison');
      return;
    }

    if (deliveryCode.trim() !== order.deliveryCode) {
      setError('Code de livraison incorrect');
      return;
    }

    setIsConfirming(true);
    setError('');

    try {
      // Mettre à jour le statut de la commande
      updateOrderStatus(order.id, 'delivered');

      // Remettre le livreur disponible
      if (order.deliveryDriverId) {
        updateDriverStatus(order.deliveryDriverId, 'available');
      }

      setIsConfirmed(true);
      
      // Rediriger après 2 secondes
      setTimeout(() => {
        router.push('/client/orders');
      }, 2000);
    } catch (error) {
      console.error('Error confirming delivery:', error);
      setError('Erreur lors de la confirmation');
    } finally {
      setIsConfirming(false);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bite-primary mx-auto"></div>
          <p className="mt-4 text-bite-text-light font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-bite-lg p-8 border border-bite-gray-200 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-heading text-bite-text-dark mb-2">
            Livraison confirmée !
          </h1>
          <p className="text-bite-text-light font-body mb-6">
            Merci pour votre commande. Redirection en cours...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bite-gray-light flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-bite-lg p-6 md:p-8 border border-bite-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading text-bite-text-dark mb-2">
            Confirmation de livraison
          </h1>
          <p className="text-bite-text-light font-body">
            Commande #{order.id.slice(-6)}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-body">
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm font-body text-bite-text-light mb-4 text-center">
            Entrez le code de livraison fourni par le livreur pour confirmer la réception de votre commande
          </p>
          <input
            type="text"
            value={deliveryCode}
            onChange={(e) => setDeliveryCode(e.target.value.toUpperCase())}
            placeholder="DLV-XXXXXX"
            className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light text-center text-lg font-mono uppercase"
          />
        </div>

        <button
          onClick={handleConfirmDelivery}
          disabled={isConfirming || !deliveryCode.trim()}
          className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConfirming ? 'Confirmation...' : 'Confirmer la livraison'}
        </button>

        <button
          onClick={() => router.push('/client/orders')}
          className="w-full mt-4 text-bite-text-light hover:text-bite-primary transition font-body font-medium text-sm"
        >
          Retour aux commandes
        </button>
      </div>
    </div>
  );
}

