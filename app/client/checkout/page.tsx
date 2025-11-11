'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { OrderItem } from '@/app/types/order';

export default function CheckoutPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mtn_money' | 'airtel_money' | 'cash_on_delivery'>('cash_on_delivery');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Charger les données du panier depuis localStorage
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cheff_cart');
      if (cartData) {
        try {
          const cart = JSON.parse(cartData);
          if (cart.items && Array.isArray(cart.items)) {
            setItems(cart.items);
            const total = cart.items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0);
            setSubtotal(total);
          }
        } catch (error) {
          console.error('Error parsing cart data:', error);
        }
      }
    }

    // Charger l'adresse par défaut de l'utilisateur s'il est connecté
    if (user && user.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      setAddress(defaultAddress.street);
      setCity(defaultAddress.city);
    }
  }, [user]);

  const handleConfirmOrder = () => {
    // Valider les champs
    if (!address.trim() || !city.trim()) {
      alert('Veuillez remplir tous les champs d\'adresse');
      return;
    }

    if (items.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    // Sauvegarder les données de la commande dans localStorage
    const orderData = {
      items: items,
      totalAmount: subtotal,
      deliveryAddress: {
        street: address,
        city: city,
      },
      paymentMethod: paymentMethod,
    };

    localStorage.setItem('cheff_pending_order', JSON.stringify(orderData));

    // Rediriger vers la page de confirmation (qui nécessite l'authentification)
    router.push('/client/checkout/confirm');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Paiement
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-bite-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Adresse de livraison
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adresse"
              className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
              required
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ville"
              className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
              required
            />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-bite-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Moyen de paiement
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('mtn_money')}
              className={`w-full p-4 border-2 rounded-xl transition font-body font-medium ${
                paymentMethod === 'mtn_money'
                  ? 'border-bite-primary bg-bite-gray-light text-bite-primary font-bold'
                  : 'border-bite-gray-300 text-bite-text-dark hover:border-bite-primary hover:bg-bite-gray-light'
              }`}
            >
              MTN MOBILE MONEY
            </button>
            <button
              onClick={() => setPaymentMethod('airtel_money')}
              className={`w-full p-4 border-2 rounded-xl transition font-body font-medium ${
                paymentMethod === 'airtel_money'
                  ? 'border-bite-primary bg-bite-gray-light text-bite-primary font-bold'
                  : 'border-bite-gray-300 text-bite-text-dark hover:border-bite-primary hover:bg-bite-gray-light'
              }`}
            >
              AIRTEL MONEY
            </button>
            <button
              onClick={() => setPaymentMethod('cash_on_delivery')}
              className={`w-full p-4 border-2 rounded-xl transition font-body font-medium ${
                paymentMethod === 'cash_on_delivery'
                  ? 'border-bite-primary bg-bite-gray-light text-bite-primary font-bold'
                  : 'border-bite-gray-300 text-bite-text-dark hover:border-bite-primary hover:bg-bite-gray-light'
              }`}
            >
              Paiement à la livraison
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-6 bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
        <h2 className="text-xl font-heading text-bite-text-dark mb-4">Résumé de la commande</h2>
        <div className="space-y-3">
          {items.length > 0 ? (
            <>
              {items.map((item, index) => (
                <div key={index} className="flex justify-between text-bite-text-light font-body">
                  <span>{item.dishName} x{item.quantity}</span>
                  <span className="font-medium">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                </div>
              ))}
            </>
          ) : (
            <p className="text-bite-text-light font-body text-sm">Aucun article dans le panier</p>
          )}
          <div className="flex justify-between text-bite-text-light font-body">
            <span>Sous-total</span>
            <span className="font-medium">{subtotal.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="flex justify-between text-bite-text-light font-body">
            <span>Livraison</span>
            <span className="font-medium text-green-600">Gratuit</span>
          </div>
          <div className="pt-3 border-t-2 border-bite-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading text-bite-text-dark">Total</span>
              <span className="text-2xl font-price text-bite-primary">{subtotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleConfirmOrder}
          disabled={items.length === 0 || !address.trim() || !city.trim()}
          className="w-full mt-6 bg-bite-primary text-white py-4 rounded-xl hover:bg-bite-dark transition font-heading font-bold text-lg shadow-bite-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmer la commande
        </button>
        {!isAuthenticated && (
          <p className="mt-4 text-sm text-bite-text-light font-body text-center">
            Vous serez invité à vous connecter pour finaliser la commande
          </p>
        )}
      </div>
    </div>
  );
}

