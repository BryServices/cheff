'use client';

import { useState, useEffect } from 'react';
import { getAllDrivers, createDriver, updateDriver, deleteDriver } from '@/app/data/drivers';
import { DeliveryDriver } from '@/app/types/delivery';

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<DeliveryDriver[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingDriver, setEditingDriver] = useState<DeliveryDriver | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    driverCode: '',
    password: '',
    name: '',
    phone: '',
    vehicleType: 'motorcycle' as 'motorcycle' | 'bicycle' | 'car',
    licensePlate: '',
    isVerified: true,
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    const allDrivers = getAllDrivers();
    setDrivers(allDrivers);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingDriver(null);
    setFormData({
      driverCode: '',
      password: '',
      name: '',
      phone: '',
      vehicleType: 'motorcycle',
      licensePlate: '',
      isVerified: true,
    });
    setError('');
    setSuccess('');
  };

  const handleEditClick = (driver: DeliveryDriver) => {
    setEditingDriver(driver);
    setIsAdding(false);
    setFormData({
      driverCode: driver.driverCode,
      password: '', // Ne pas afficher le mot de passe
      name: driver.name,
      phone: driver.phone,
      vehicleType: driver.vehicleType,
      licensePlate: driver.licensePlate || '',
      isVerified: driver.isVerified,
    });
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingDriver(null);
    setFormData({
      driverCode: '',
      password: '',
      name: '',
      phone: '',
      vehicleType: 'motorcycle',
      licensePlate: '',
      isVerified: true,
    });
    setError('');
    setSuccess('');
  };

  const generateDriverCode = () => {
    const allDrivers = getAllDrivers();
    const maxCode = allDrivers.reduce((max, d) => {
      const num = parseInt(d.driverCode.replace('DRV', ''));
      return num > max ? num : max;
    }, 0);
    return `DRV${String(maxCode + 1).padStart(3, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.driverCode.trim()) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérifier que le code n'existe pas déjà (sauf si on modifie)
    const existingDriver = drivers.find(d => 
      d.driverCode === formData.driverCode.toUpperCase() && 
      (!editingDriver || d.id !== editingDriver.id)
    );
    if (existingDriver) {
      setError('Ce code livreur existe déjà');
      return;
    }

    try {
      if (editingDriver) {
        // Mettre à jour le livreur
        const updated = updateDriver(editingDriver.id, {
          driverCode: formData.driverCode.toUpperCase(),
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          vehicleType: formData.vehicleType,
          licensePlate: formData.licensePlate.trim() || undefined,
          isVerified: formData.isVerified,
          password: formData.password ? formData.password : editingDriver.password,
        });

        if (updated) {
          loadDrivers();
          setSuccess('Livreur mis à jour avec succès');
          handleCancel();
        }
      } else {
        // Créer un nouveau livreur
        if (!formData.password) {
          setError('Le mot de passe est obligatoire pour un nouveau livreur');
          return;
        }

        const newDriver = createDriver({
          driverCode: formData.driverCode.toUpperCase() || generateDriverCode(),
          password: formData.password,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          vehicleType: formData.vehicleType,
          licensePlate: formData.licensePlate.trim() || undefined,
          isVerified: formData.isVerified,
        });

        loadDrivers();
        setSuccess('Livreur créé avec succès');
        handleCancel();
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving driver:', error);
      setError('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = (driverId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?')) {
      return;
    }

    if (deleteDriver(driverId)) {
      loadDrivers();
      setSuccess('Livreur supprimé avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la suppression');
    }
  };

  const getStatusLabel = (status: string, isActive: boolean) => {
    if (!isActive) return 'Inactif';
    if (status === 'available') return 'Disponible';
    if (status === 'picking_up') return 'En route';
    if (status === 'delivering') return 'En livraison';
    return 'Hors ligne';
  };

  const getStatusColor = (status: string, isActive: boolean) => {
    if (!isActive) return 'bg-gray-100 text-gray-700';
    if (status === 'available') return 'bg-green-100 text-green-700';
    if (status === 'picking_up' || status === 'delivering') return 'bg-blue-100 text-blue-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark">
          Gestion des Livreurs
        </h1>
        {!isAdding && !editingDriver && (
          <button
            onClick={handleAddClick}
            className="bg-bite-primary text-white px-6 py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg"
          >
            + Ajouter un livreur
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
      {(isAdding || editingDriver) && (
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 mb-6">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">
            {editingDriver ? 'Modifier le livreur' : 'Nouveau livreur'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Code Livreur *
                </label>
                <input
                  type="text"
                  value={formData.driverCode}
                  onChange={(e) => setFormData({ ...formData, driverCode: e.target.value.toUpperCase() })}
                  placeholder="DRV001"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark uppercase"
                  required
                />
                {!editingDriver && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, driverCode: generateDriverCode() })}
                    className="mt-2 text-xs text-bite-primary hover:text-bite-dark transition font-body"
                  >
                    Générer automatiquement
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Mot de passe {!editingDriver && '*'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingDriver ? 'Laisser vide pour ne pas changer' : '••••••••'}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required={!editingDriver}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Nom complet *
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
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Type de véhicule *
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                >
                  <option value="motorcycle">Moto</option>
                  <option value="bicycle">Vélo</option>
                  <option value="car">Voiture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Plaque d'immatriculation
                </label>
                <input
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                  placeholder="CG-1234-AB"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark uppercase"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                className="w-5 h-5 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
              />
              <label className="text-sm font-body text-bite-text-dark">
                Livreur vérifié
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
              >
                {editingDriver ? 'Enregistrer les modifications' : 'Créer le livreur'}
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

      {/* Liste des livreurs */}
      <div className="bg-white rounded-2xl shadow-bite border border-bite-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-bite-gray-200">
            <thead className="bg-bite-gray-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Véhicule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Livraisons
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-bite-gray-200">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-bite-gray-light">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-bite-primary">{driver.driverCode}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-body text-bite-text-dark">{driver.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-body text-bite-text-light">{driver.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-body text-bite-text-light">
                      {driver.vehicleType === 'motorcycle' ? '🏍️ Moto' : 
                       driver.vehicleType === 'bicycle' ? '🚲 Vélo' : 
                       '🚗 Voiture'}
                      {driver.licensePlate && ` (${driver.licensePlate})`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(driver.status, driver.isActive)}`}>
                      {getStatusLabel(driver.status, driver.isActive)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-body text-bite-text-dark">
                      ⭐ {driver.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-body text-bite-text-light">
                      {driver.totalDeliveries}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(driver)}
                      className="text-bite-primary hover:text-bite-dark mr-4 font-body"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(driver.id)}
                      className="text-red-600 hover:text-red-800 font-body"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

