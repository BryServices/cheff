'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllAdminRestaurants, createAdminRestaurant, updateAdminRestaurant, deleteAdminRestaurant } from '@/app/data/adminRestaurants';
import { AdminRestaurant, RestaurantStatus } from '@/app/data/adminRestaurants';
import { CuisineType } from '@/app/types/restaurant';
import Image from 'next/image';

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<AdminRestaurant | null>(null);
  const [statusFilter, setStatusFilter] = useState<RestaurantStatus | 'all'>('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    cuisineType: 'Congolais' as CuisineType,
    description: '',
    street: '',
    district: '',
    department: '',
    city: 'Brazzaville',
    priceRange: 2 as 1 | 2 | 3,
    deliveryTime: '30-45 min',
    image: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    restaurantCode: '',
    status: 'pending' as RestaurantStatus,
    isPromoted: false,
    promotion: 0,
  });

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = () => {
    const allRestaurants = getAllAdminRestaurants();
    setRestaurants(allRestaurants);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingRestaurant(null);
    setFormData({
      name: '',
      cuisineType: 'Congolais',
      description: '',
      street: '',
      district: '',
      department: '',
      city: 'Brazzaville',
      priceRange: 2,
      deliveryTime: '30-45 min',
      image: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      restaurantCode: '',
      status: 'pending',
      isPromoted: false,
      promotion: 0,
    });
    setError('');
    setSuccess('');
  };

  const handleEditClick = (restaurant: AdminRestaurant) => {
    setEditingRestaurant(restaurant);
    setIsAdding(false);
    setFormData({
      name: restaurant.name,
      cuisineType: restaurant.cuisineType as CuisineType,
      description: restaurant.description,
      street: restaurant.address.street,
      district: restaurant.address.district,
      department: restaurant.address.department,
      city: restaurant.address.city,
      priceRange: restaurant.priceRange,
      deliveryTime: restaurant.deliveryTime,
      image: restaurant.image,
      ownerName: restaurant.ownerName || '',
      ownerPhone: restaurant.ownerPhone || '',
      ownerEmail: restaurant.ownerEmail || '',
      restaurantCode: restaurant.restaurantCode || '',
      status: restaurant.status,
      isPromoted: restaurant.isPromoted || false,
      promotion: restaurant.promotion || 0,
    });
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingRestaurant(null);
    setFormData({
      name: '',
      cuisineType: 'Congolais',
      description: '',
      street: '',
      district: '',
      department: '',
      city: 'Brazzaville',
      priceRange: 2,
      deliveryTime: '30-45 min',
      image: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      restaurantCode: '',
      status: 'pending',
      isPromoted: false,
      promotion: 0,
    });
    setError('');
    setSuccess('');
  };

  const generateRestaurantCode = () => {
    const allRestaurants = getAllAdminRestaurants();
    const maxCode = allRestaurants.reduce((max, r) => {
      if (r.restaurantCode) {
        const num = parseInt(r.restaurantCode.replace('REST', ''));
        return num > max ? num : max;
      }
      return max;
    }, 0);
    return `REST${String(maxCode + 1).padStart(3, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim() || !formData.street.trim() || !formData.ownerName.trim()) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérifier que le code n'existe pas déjà (sauf si on modifie)
    if (formData.restaurantCode) {
      const existingRestaurant = restaurants.find(r => 
        r.restaurantCode === formData.restaurantCode.toUpperCase() && 
        (!editingRestaurant || r.id !== editingRestaurant.id)
      );
      if (existingRestaurant) {
        setError('Ce code restaurant existe déjà');
        return;
      }
    }

    try {
      if (editingRestaurant) {
        // Mettre à jour le restaurant
        const updated = updateAdminRestaurant(editingRestaurant.id, {
          name: formData.name.trim(),
          cuisineType: formData.cuisineType,
          description: formData.description.trim(),
          address: {
            street: formData.street.trim(),
            district: formData.district.trim(),
            department: formData.department.trim(),
            city: formData.city.trim(),
          },
          priceRange: formData.priceRange,
          deliveryTime: formData.deliveryTime,
          image: formData.image.trim() || '/images/restaurant-default.jpg',
          ownerName: formData.ownerName.trim(),
          ownerPhone: formData.ownerPhone.trim(),
          ownerEmail: formData.ownerEmail.trim(),
          restaurantCode: formData.restaurantCode.toUpperCase() || editingRestaurant.restaurantCode,
          status: formData.status,
          isPromoted: formData.isPromoted,
          promotion: formData.promotion || undefined,
        });

        if (updated) {
          loadRestaurants();
          setSuccess('Restaurant mis à jour avec succès');
          handleCancel();
        }
      } else {
        // Créer un nouveau restaurant
        const newRestaurant = createAdminRestaurant({
          name: formData.name.trim(),
          cuisineType: formData.cuisineType,
          description: formData.description.trim(),
          address: {
            street: formData.street.trim(),
            district: formData.district.trim(),
            department: formData.department.trim(),
            city: formData.city.trim(),
          },
          priceRange: formData.priceRange,
          deliveryTime: formData.deliveryTime,
          image: formData.image.trim() || '/images/restaurant-default.jpg',
          ownerName: formData.ownerName.trim(),
          ownerPhone: formData.ownerPhone.trim(),
          ownerEmail: formData.ownerEmail.trim(),
          restaurantCode: formData.restaurantCode.toUpperCase() || generateRestaurantCode(),
          status: formData.status,
          isPromoted: formData.isPromoted,
          promotion: formData.promotion || undefined,
          rating: 0,
        });

        loadRestaurants();
        setSuccess('Restaurant créé avec succès');
        handleCancel();
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving restaurant:', error);
      setError('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = (restaurantId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
      return;
    }

    if (deleteAdminRestaurant(restaurantId)) {
      loadRestaurants();
      setSuccess('Restaurant supprimé avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la suppression');
    }
  };

  const handleStatusChange = (restaurantId: number, newStatus: RestaurantStatus) => {
    const updated = updateAdminRestaurant(restaurantId, { status: newStatus });
    if (updated) {
      loadRestaurants();
      setSuccess(`Statut mis à jour : ${getStatusLabel(newStatus)}`);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const getStatusLabel = (status: RestaurantStatus) => {
    if (status === 'approved') return 'Validé';
    if (status === 'pending') return 'En attente';
    return 'Suspendu';
  };

  const getStatusColor = (status: RestaurantStatus) => {
    if (status === 'approved') return 'bg-green-100 text-green-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  // Filtrer les restaurants par statut
  const filteredRestaurants = useMemo(() => {
    if (statusFilter === 'all') return restaurants;
    return restaurants.filter(r => r.status === statusFilter);
  }, [restaurants, statusFilter]);

  const cuisineTypes: CuisineType[] = ['Congolais', 'Burgers', 'Pizza', 'Sushi', 'Italien', 'Asiatique', 'Africain', 'Fast Food', 'Végétarien'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark">
          Gestion des Restaurants
        </h1>
        {!isAdding && !editingRestaurant && (
          <button
            onClick={handleAddClick}
            className="bg-bite-primary text-white px-6 py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg"
          >
            + Ajouter un restaurant
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-body">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl text-sm font-body">
          {success}
        </div>
      )}

      {/* Formulaire d'ajout/modification */}
      {(isAdding || editingRestaurant) && (
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 mb-6">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">
            {editingRestaurant ? 'Modifier le restaurant' : 'Nouveau restaurant'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Nom du restaurant *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Type de cuisine *
                </label>
                <select
                  value={formData.cuisineType}
                  onChange={(e) => setFormData({ ...formData, cuisineType: e.target.value as CuisineType })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                >
                  {cuisineTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Rue *
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Quartier
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Département
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Gamme de prix
                </label>
                <select
                  value={formData.priceRange}
                  onChange={(e) => setFormData({ ...formData, priceRange: parseInt(e.target.value) as 1 | 2 | 3 })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                >
                  <option value={1}>F - Économique</option>
                  <option value={2}>FF - Moyen</option>
                  <option value={3}>FFF - Élevé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Temps de livraison
                </label>
                <input
                  type="text"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                  placeholder="30-45 min"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as RestaurantStatus })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                >
                  <option value="pending">En attente</option>
                  <option value="approved">Validé</option>
                  <option value="suspended">Suspendu</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Nom du propriétaire *
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Téléphone du propriétaire
                </label>
                <input
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Email du propriétaire
                </label>
                <input
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Code Restaurant
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.restaurantCode}
                    onChange={(e) => setFormData({ ...formData, restaurantCode: e.target.value.toUpperCase() })}
                    placeholder="REST001"
                    className="flex-1 px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark uppercase"
                  />
                  {!editingRestaurant && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, restaurantCode: generateRestaurantCode() })}
                      className="px-4 py-3 bg-bite-gray-light text-bite-text-dark rounded-xl hover:bg-bite-gray-200 transition font-body font-medium text-sm"
                    >
                      Générer
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  URL de l&apos;image
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/restaurant.jpg"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPromoted}
                    onChange={(e) => setFormData({ ...formData, isPromoted: e.target.checked })}
                    className="w-5 h-5 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
                  />
                  <span className="text-sm font-body text-bite-text-dark">Restaurant en promotion</span>
                </label>
                {formData.isPromoted && (
                  <input
                    type="number"
                    value={formData.promotion}
                    onChange={(e) => setFormData({ ...formData, promotion: parseInt(e.target.value) || 0 })}
                    placeholder="%"
                    min="0"
                    max="100"
                    className="w-20 px-3 py-2 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
              >
                {editingRestaurant ? 'Enregistrer les modifications' : 'Créer le restaurant'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border-2 border-bite-gray-300 text-bite-text-dark rounded-xl hover:bg-bite-gray-light transition font-body font-medium"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtres */}
      <div className="mb-6 flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RestaurantStatus | 'all')}
          className="px-4 py-2 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
        >
          <option value="all">Tous les statuts</option>
          <option value="approved">Validé</option>
          <option value="pending">En attente</option>
          <option value="suspended">Suspendu</option>
        </select>
      </div>

      {/* Liste des restaurants */}
      <div className="bg-white rounded-2xl shadow-bite border border-bite-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-bite-gray-200">
            <thead className="bg-bite-gray-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Propriétaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-bite-gray-200">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="hover:bg-bite-gray-light">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-body font-medium text-bite-text-dark">{restaurant.name}</div>
                      <div className="text-xs text-bite-text-light font-body">{restaurant.address.street}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-body text-bite-text-dark">{restaurant.ownerName}</div>
                      {restaurant.ownerPhone && (
                        <div className="text-xs text-bite-text-light font-body">{restaurant.ownerPhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-body text-bite-text-light">{restaurant.cuisineType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={restaurant.status}
                        onChange={(e) => handleStatusChange(restaurant.id, e.target.value as RestaurantStatus)}
                        className={`px-2 py-1 text-xs font-bold rounded-full border-0 ${getStatusColor(restaurant.status)} cursor-pointer`}
                      >
                        <option value="pending">En attente</option>
                        <option value="approved">Validé</option>
                        <option value="suspended">Suspendu</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-bite-primary text-sm">{restaurant.restaurantCode}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(restaurant)}
                        className="text-bite-primary hover:text-bite-dark mr-4 font-body"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(restaurant.id)}
                        className="text-red-600 hover:text-red-800 font-body"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-bite-text-light font-body">Aucun restaurant trouvé</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
