'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Address, UserPreferences } from '@/app/types/user';
import { departments, districts } from '@/app/data/restaurants';

export default function ProfilePage() {
  const { user, logout, updateUser, updateAddresses, updatePreferences } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    street: '',
    district: '',
    department: '',
    city: 'Brazzaville',
    isDefault: false,
    label: '',
  });

  const [editingPreferences, setEditingPreferences] = useState<UserPreferences>(
    user?.preferences || {
      favoriteCuisines: [],
      dietaryRestrictions: [],
      allergies: [],
      language: 'fr',
      notifications: {
        sms: true,
        email: false,
        push: true,
      },
    }
  );

  const cuisineTypes = ['Congolais', 'Burgers', 'Pizza', 'Sushi', 'Italien', 'Asiatique', 'Africain', 'Fast Food', 'Végétarien'];
  const dietaryOptions = ['Végétarien', 'Végan', 'Sans gluten', 'Halal', 'Casher'];
  const allergyOptions = ['Arachides', 'Lait', 'Œufs', 'Poisson', 'Crustacés', 'Soja', 'Fruits à coque'];

  const handleSaveProfile = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    });

    setIsEditing(false);
    setSuccess('Profil mis à jour avec succès');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.district || !newAddress.department) {
      setError('Veuillez remplir tous les champs d\'adresse');
      return;
    }

    const addresses = user?.addresses || [];
    const addressToAdd: Address = {
      ...newAddress,
      id: `addr_${Date.now()}`,
      isDefault: addresses.length === 0, // Première adresse = par défaut
    };

    updateAddresses([...addresses, addressToAdd]);
    setNewAddress({
      street: '',
      district: '',
      department: '',
      city: 'Brazzaville',
      isDefault: false,
      label: '',
    });
    setIsEditingAddress(false);
    setSuccess('Adresse ajoutée avec succès');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteAddress = (addressId: string) => {
    const addresses = user?.addresses.filter(addr => addr.id !== addressId) || [];
    updateAddresses(addresses);
    setSuccess('Adresse supprimée');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    const addresses = user?.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId,
    })) || [];
    updateAddresses(addresses);
    setSuccess('Adresse par défaut mise à jour');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSavePreferences = () => {
    updatePreferences(editingPreferences);
    setIsEditingPreferences(false);
    setSuccess('Préférences mises à jour');
    setTimeout(() => setSuccess(''), 3000);
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Mon Profil
      </h1>

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

      <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 space-y-6 md:space-y-8">
        {/* Avatar et informations de base */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 pb-6 border-b border-bite-gray-200">
          <div className="w-20 h-20 bg-bite-primary rounded-full flex items-center justify-center shadow-bite">
            <span className="text-white text-2xl font-heading">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-heading text-bite-text-dark">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-bite-text-light font-body">{user.phone}</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2.5 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition font-heading font-bold"
          >
            Déconnexion
          </button>
        </div>

        {/* Informations personnelles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-bite-text-dark">Informations personnelles</h2>
            {!isEditing && (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                  });
                }}
                className="text-bite-primary hover:text-bite-dark transition font-body font-medium text-sm"
              >
                Modifier
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                  }}
                  className="px-6 py-2 border-2 border-bite-gray-300 text-bite-text-dark rounded-xl hover:bg-bite-gray-light transition font-body font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-bite-text-dark font-body">
                <span className="font-medium">Prénom:</span> {user.firstName}
              </p>
              <p className="text-bite-text-dark font-body">
                <span className="font-medium">Nom:</span> {user.lastName}
              </p>
              <p className="text-bite-text-dark font-body">
                <span className="font-medium">Téléphone:</span> {user.phone}
              </p>
            </div>
          )}
        </div>

        {/* Adresses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-bite-text-dark">Mes adresses</h2>
            {!isEditingAddress && (
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-bite-primary hover:text-bite-dark transition font-body font-medium text-sm"
              >
                Ajouter une adresse
              </button>
            )}
          </div>

          {isEditingAddress && (
            <div className="mb-4 p-4 bg-bite-gray-light rounded-xl space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Libellé (optionnel)
                </label>
                <input
                  type="text"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  placeholder="Domicile, Travail, etc."
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Rue
                </label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  placeholder="Avenue de l&apos;Indépendance"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Quartier
                </label>
                <select
                  value={newAddress.district}
                  onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                >
                  <option value="">Sélectionner un quartier</option>
                  {districts.filter(d => d !== 'Tous').map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Arrondissement
                </label>
                <select
                  value={newAddress.department}
                  onChange={(e) => setNewAddress({ ...newAddress, department: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                >
                  <option value="">Sélectionner un arrondissement</option>
                  {departments.filter(d => d !== 'Tous').map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddAddress}
                  className="px-6 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => {
                    setIsEditingAddress(false);
                    setNewAddress({
                      street: '',
                      district: '',
                      department: '',
                      city: 'Brazzaville',
                      isDefault: false,
                      label: '',
                    });
                  }}
                  className="px-6 py-2 border-2 border-bite-gray-300 text-bite-text-dark rounded-xl hover:bg-bite-gray-light transition font-body font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {user.addresses && user.addresses.length > 0 ? (
            <div className="space-y-3">
              {user.addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 border-2 border-bite-gray-200 rounded-xl flex items-start justify-between"
                >
                  <div className="flex-1">
                    {address.isDefault && (
                      <span className="inline-block px-2 py-1 bg-bite-primary text-white text-xs font-bold rounded mb-2">
                        Par défaut
                      </span>
                    )}
                    {address.label && (
                      <p className="font-body font-medium text-bite-text-dark mb-1">
                        {address.label}
                      </p>
                    )}
                    <p className="text-bite-text-dark font-body">
                      {address.street}, {address.district}, {address.department}, {address.city}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="px-3 py-1 text-xs text-bite-primary hover:text-bite-dark transition font-body font-medium"
                      >
                        Définir par défaut
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="px-3 py-1 text-xs text-red-500 hover:text-red-700 transition font-body font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-bite-text-light font-body">Aucune adresse enregistrée</p>
          )}
        </div>

        {/* Préférences */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-bite-text-dark">Préférences</h2>
            {!isEditingPreferences && (
              <button
                onClick={() => {
                  setIsEditingPreferences(true);
                  setEditingPreferences(user.preferences);
                }}
                className="text-bite-primary hover:text-bite-dark transition font-body font-medium text-sm"
              >
                Modifier
              </button>
            )}
          </div>

          {isEditingPreferences ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Cuisines préférées
                </label>
                <div className="flex flex-wrap gap-2">
                  {cuisineTypes.map((cuisine) => (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => setEditingPreferences({
                        ...editingPreferences,
                        favoriteCuisines: toggleArrayItem(editingPreferences.favoriteCuisines, cuisine),
                      })}
                      className={`px-3 py-1 rounded-full text-sm font-body transition ${
                        editingPreferences.favoriteCuisines.includes(cuisine)
                          ? 'bg-bite-primary text-white'
                          : 'bg-bite-gray-light text-bite-text-dark border border-bite-gray-300'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Restrictions alimentaires
                </label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setEditingPreferences({
                        ...editingPreferences,
                        dietaryRestrictions: toggleArrayItem(editingPreferences.dietaryRestrictions, option),
                      })}
                      className={`px-3 py-1 rounded-full text-sm font-body transition ${
                        editingPreferences.dietaryRestrictions.includes(option)
                          ? 'bg-bite-primary text-white'
                          : 'bg-bite-gray-light text-bite-text-dark border border-bite-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Allergies
                </label>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map((allergy) => (
                    <button
                      key={allergy}
                      type="button"
                      onClick={() => setEditingPreferences({
                        ...editingPreferences,
                        allergies: toggleArrayItem(editingPreferences.allergies, allergy),
                      })}
                      className={`px-3 py-1 rounded-full text-sm font-body transition ${
                        editingPreferences.allergies.includes(allergy)
                          ? 'bg-bite-primary text-white'
                          : 'bg-bite-gray-light text-bite-text-dark border border-bite-gray-300'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Notifications
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingPreferences.notifications.sms}
                      onChange={(e) => setEditingPreferences({
                        ...editingPreferences,
                        notifications: { ...editingPreferences.notifications, sms: e.target.checked },
                      })}
                      className="w-4 h-4 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
                    />
                    <span className="text-sm font-body text-bite-text-dark">SMS</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingPreferences.notifications.push}
                      onChange={(e) => setEditingPreferences({
                        ...editingPreferences,
                        notifications: { ...editingPreferences.notifications, push: e.target.checked },
                      })}
                      className="w-4 h-4 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
                    />
                    <span className="text-sm font-body text-bite-text-dark">Notifications push</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => {
                    setIsEditingPreferences(false);
                    setEditingPreferences(user.preferences);
                  }}
                  className="px-6 py-2 border-2 border-bite-gray-300 text-bite-text-dark rounded-xl hover:bg-bite-gray-light transition font-body font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
                  Cuisines préférées:
                </p>
                <p className="text-bite-text-light font-body text-sm">
                  {user.preferences.favoriteCuisines.length > 0
                    ? user.preferences.favoriteCuisines.join(', ')
                    : 'Aucune'}
                </p>
              </div>
              <div>
                <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
                  Restrictions alimentaires:
                </p>
                <p className="text-bite-text-light font-body text-sm">
                  {user.preferences.dietaryRestrictions.length > 0
                    ? user.preferences.dietaryRestrictions.join(', ')
                    : 'Aucune'}
                </p>
              </div>
              <div>
                <p className="text-sm font-body font-medium text-bite-text-dark mb-1">
                  Allergies:
                </p>
                <p className="text-bite-text-light font-body text-sm">
                  {user.preferences.allergies.length > 0
                    ? user.preferences.allergies.join(', ')
                    : 'Aucune'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
