'use client';

import { Order } from '@/app/types/order';
import { getStatusLabel, getStatusColor, formatCurrency } from '@/app/utils/restaurantStats';
import { updateOrderStatus } from '@/app/data/orders';
import { getAvailableDrivers, updateDriverStatus, getDriverById } from '@/app/data/drivers';
import { DeliveryDriver } from '@/app/types/delivery';
import { useState, useEffect } from 'react';

interface OrderCardProps {
  order: Order;
  onStatusUpdate?: () => void;
}

export default function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDriverSelect, setShowDriverSelect] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState<DeliveryDriver[]>([]);
  const [assignedDriver, setAssignedDriver] = useState<DeliveryDriver | null>(null);

  useEffect(() => {
    // Charger les livreurs disponibles
    const drivers = getAvailableDrivers();
    setAvailableDrivers(drivers);

    // Charger le livreur assigné si présent
    if (order.deliveryDriverId) {
      const driver = getDriverById(order.deliveryDriverId);
      if (driver) {
        setAssignedDriver(driver);
      }
    }
  }, [order.deliveryDriverId]);

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

  const handleAssignDriver = async (driverId: string) => {
    setIsUpdating(true);
    try {
      // Générer un code de livraison unique (généré lors de l'assignation)
      const deliveryCode = `DLV-${order.id.slice(-6).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      
      // Mettre à jour la commande avec le livreur et le code (mais pas encore le statut)
      const storedOrders = localStorage.getItem('cheff_orders');
      if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        const orderIndex = orders.findIndex((o: Order) => o.id === order.id);
        if (orderIndex !== -1) {
          orders[orderIndex].deliveryDriverId = driverId;
          orders[orderIndex].deliveryCode = deliveryCode;
          // Le statut reste "ready" jusqu'à ce que le livreur accepte
          orders[orderIndex].updatedAt = new Date();
          localStorage.setItem('cheff_orders', JSON.stringify(orders));
        }
      }

      // Le livreur recevra une notification mais son statut reste "available" jusqu'à acceptation

      // Mettre à jour l'affichage
      const driver = getDriverById(driverId);
      if (driver) {
        setAssignedDriver(driver);
      }
      setShowDriverSelect(false);

      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error('Error assigning driver:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (currentStatus: string): string | null => {
    const statusFlow: { [key: string]: string } = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
    };
    return statusFlow[currentStatus] || null;
  };

  const nextStatus = getNextStatus(order.status);

  // Le statut "delivered" ne peut pas être changé par le restaurant (c'est le livreur qui le fait)
  const canChangeStatus = order.status !== 'delivered' && order.status !== 'cancelled' && order.status !== 'out_for_delivery';

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

          {assignedDriver && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-body font-medium text-blue-900 mb-1">Livreur assigné:</p>
              <p className="text-xs text-blue-700 font-body">
                {assignedDriver.name} - {assignedDriver.phone}
              </p>
              {order.deliveryCode && (
                <p className="text-xs text-blue-700 font-body mt-1">
                  Code: <strong>{order.deliveryCode}</strong>
                </p>
              )}
              {assignedDriver.status === 'picking_up' && order.status === 'ready' && (
                <p className="text-xs text-orange-700 font-body mt-1 font-medium">
                  ⚠️ Livreur en route - Finalisez la commande pour transmettre les informations
                </p>
              )}
            </div>
          )}

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

        <div className="flex flex-col gap-2">
          {/* Finaliser la commande et transmettre au livreur */}
          {assignedDriver && assignedDriver.status === 'picking_up' && order.status === 'ready' && (
            <button
              onClick={async () => {
                setIsUpdating(true);
                try {
                  // Finaliser la commande et passer à "out_for_delivery"
                  const storedOrders = localStorage.getItem('cheff_orders');
                  if (storedOrders) {
                    const orders = JSON.parse(storedOrders);
                    const orderIndex = orders.findIndex((o: Order) => o.id === order.id);
                    if (orderIndex !== -1) {
                      orders[orderIndex].status = 'out_for_delivery';
                      orders[orderIndex].updatedAt = new Date();
                      localStorage.setItem('cheff_orders', JSON.stringify(orders));
                    }
                  }
                  if (onStatusUpdate) {
                    onStatusUpdate();
                  }
                } catch (error) {
                  console.error('Error finalizing order:', error);
                } finally {
                  setIsUpdating(false);
                }
              }}
              disabled={isUpdating}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-heading font-bold text-sm shadow-bite disabled:opacity-50"
            >
              {isUpdating ? 'Finalisation...' : 'Finaliser et transmettre au livreur'}
            </button>
          )}

          {/* Sélection de livreur pour les commandes prêtes */}
          {order.status === 'ready' && !assignedDriver && (
            <>
              {!showDriverSelect ? (
                <button
                  onClick={() => setShowDriverSelect(true)}
                  disabled={isUpdating || availableDrivers.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-heading font-bold text-sm shadow-bite disabled:opacity-50"
                >
                  {availableDrivers.length === 0 ? 'Aucun livreur disponible' : 'Sélectionner un livreur'}
                </button>
              ) : (
                <div className="bg-bite-gray-light p-3 rounded-xl space-y-2 min-w-[200px]">
                  <p className="text-xs font-body font-medium text-bite-text-dark mb-2">
                    Choisir un livreur:
                  </p>
                  {availableDrivers.map((driver) => (
                    <button
                      key={driver.id}
                      onClick={() => handleAssignDriver(driver.id)}
                      disabled={isUpdating}
                      className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-bite-primary hover:text-white transition text-xs font-body"
                    >
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-bite-text-light text-xs">
                        {driver.vehicleType === 'motorcycle' ? '🏍️' : driver.vehicleType === 'bicycle' ? '🚲' : '🚗'} 
                        {' '}⭐ {driver.rating} ({driver.totalDeliveries} livraisons)
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => setShowDriverSelect(false)}
                    className="w-full px-3 py-2 text-xs text-bite-text-light hover:text-bite-primary transition font-body"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </>
          )}

          {/* Boutons de changement de statut */}
          {canChangeStatus && nextStatus && (
            <button
              onClick={() => handleStatusChange(nextStatus)}
              disabled={isUpdating}
              className="px-4 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold text-sm shadow-bite disabled:opacity-50"
            >
              {isUpdating ? 'Mise à jour...' : `Passer à ${getStatusLabel(nextStatus)}`}
            </button>
          )}

          {order.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('cancelled')}
              disabled={isUpdating}
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-body font-medium text-sm disabled:opacity-50"
            >
              Annuler
            </button>
          )}

          {order.status === 'out_for_delivery' && (
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-xs font-body text-center">
              En cours de livraison
              <br />
              <span className="font-medium">Le livreur confirmera la livraison</span>
            </div>
          )}

          {order.status === 'delivered' && (
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-xl text-xs font-body text-center">
              ✓ Livrée
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
