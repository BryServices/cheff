'use client';

import { Order } from '@/app/types/order';
import { getStatusLabel, getStatusColor, formatCurrency } from '@/app/utils/restaurantStats';
import { updateOrderStatus } from '@/app/data/orders';
import { useState } from 'react';

interface OrderCardProps {
  order: Order;
  onStatusUpdate?: () => void;
}

export default function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      updateOrderStatus(order.id, newStatus as any);
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (currentStatus: string): string | null => {
    const statusFlow: { [key: string]: string } = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'out_for_delivery',
      out_for_delivery: 'delivered',
    };
    return statusFlow[currentStatus] || null;
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <div className="bg-white rounded-2xl shadow-bite p-4 md:p-6 border border-bite-gray-200 hover:shadow-bite-lg transition">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-heading text-bite-text-dark mb-1">
                Commande #{order.id.slice(-6)}
              </h3>
              <p className="text-sm text-bite-text-light font-body">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-heading font-bold ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </div>

          <div className="mb-3">
            <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
              Client: {order.customerName}
            </p>
            <p className="text-sm text-bite-text-light font-body">
              {order.customerPhone}
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm font-body font-medium text-bite-text-dark mb-2">
              Articles ({order.items.length}):
            </p>
            <ul className="space-y-1">
              {order.items.map((item) => (
                <li key={item.id} className="text-sm text-bite-text-light font-body flex justify-between">
                  <span>
                    {item.quantity}x {item.dishName}
                  </span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
              Adresse de livraison:
            </p>
            <p className="text-sm text-bite-text-light font-body">
              {order.deliveryAddress.street}, {order.deliveryAddress.district}, {order.deliveryAddress.department}
            </p>
          </div>

          {order.notes && (
            <div className="mb-3 p-2 bg-bite-gray-light rounded-lg">
              <p className="text-xs font-body font-medium text-bite-text-dark mb-1">Notes:</p>
              <p className="text-xs text-bite-text-light font-body">{order.notes}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-bite-gray-200">
            <div>
              <p className="text-sm text-bite-text-light font-body">Total</p>
              <p className="text-xl font-price text-bite-primary">{formatCurrency(order.totalAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-bite-text-light font-body">Paiement</p>
              <p className="text-xs font-body font-medium text-bite-text-dark capitalize">
                {order.paymentMethod === 'mtn_money' ? 'MTN Money' : 
                 order.paymentMethod === 'airtel_money' ? 'Airtel Money' : 
                 'À la livraison'}
              </p>
            </div>
          </div>
        </div>

        {nextStatus && order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleStatusChange(nextStatus)}
              disabled={isUpdating}
              className="px-4 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold text-sm shadow-bite disabled:opacity-50"
            >
              {isUpdating ? 'Mise à jour...' : `Passer à ${getStatusLabel(nextStatus)}`}
            </button>
            {order.status === 'pending' && (
              <button
                onClick={() => handleStatusChange('cancelled')}
                disabled={isUpdating}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-body font-medium text-sm disabled:opacity-50"
              >
                Annuler
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


