'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllAdminUsers, updateAdminUser, deleteAdminUser, UserRole, UserStatus } from '@/app/data/adminUsers';

export default function AdminUsersPage() {
  const [users, setUsers] = useState(getAllAdminUsers());
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = getAllAdminUsers();
    setUsers(allUsers);
  };

  // Filtrer les utilisateurs
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Filtre par rôle
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(u => 
        u.firstName.toLowerCase().includes(query) ||
        u.lastName.toLowerCase().includes(query) ||
        u.phone.includes(query) ||
        (u.email && u.email.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [users, roleFilter, searchQuery]);

  const handleStatusChange = (userId: string, role: UserRole, newStatus: UserStatus) => {
    const updated = updateAdminUser(userId, role, { status: newStatus });
    if (updated) {
      loadUsers();
      setSuccess(`Statut mis à jour : ${getStatusLabel(newStatus)}`);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la mise à jour');
    }
  };

  const handleVerificationToggle = (userId: string, role: UserRole, currentVerified: boolean) => {
    const updated = updateAdminUser(userId, role, { isVerified: !currentVerified });
    if (updated) {
      loadUsers();
      setSuccess(`Vérification ${!currentVerified ? 'activée' : 'désactivée'}`);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = (userId: string, role: UserRole, userName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userName} ?`)) {
      return;
    }

    if (deleteAdminUser(userId, role)) {
      loadUsers();
      setSuccess('Utilisateur supprimé avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la suppression');
    }
  };

  const getRoleLabel = (role: UserRole) => {
    const labels: { [key in UserRole]: string } = {
      client: 'Client',
      restaurateur: 'Restaurateur',
      livreur: 'Livreur',
      admin: 'Admin',
    };
    return labels[role];
  };

  const getRoleColor = (role: UserRole) => {
    const colors: { [key in UserRole]: string } = {
      client: 'bg-blue-100 text-blue-700',
      restaurateur: 'bg-green-100 text-green-700',
      livreur: 'bg-purple-100 text-purple-700',
      admin: 'bg-red-100 text-red-700',
    };
    return colors[role];
  };

  const getStatusLabel = (status: UserStatus) => {
    const labels: { [key in UserStatus]: string } = {
      active: 'Actif',
      inactive: 'Inactif',
      suspended: 'Suspendu',
    };
    return labels[status];
  };

  const getStatusColor = (status: UserStatus) => {
    const colors: { [key in UserStatus]: string } = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      suspended: 'bg-red-100 text-red-700',
    };
    return colors[status];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Gestion des Utilisateurs
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

      {/* Filtres */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
          className="px-4 py-2 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
        >
          <option value="all">Tous les rôles</option>
          <option value="client">Client</option>
          <option value="restaurateur">Restaurateur</option>
          <option value="livreur">Livreur</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher par nom, téléphone, email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
        />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-bite p-4 border border-bite-gray-200">
          <div className="text-sm font-body text-bite-text-light mb-1">Total</div>
          <div className="text-2xl font-heading text-bite-text-dark">{users.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-bite p-4 border border-bite-gray-200">
          <div className="text-sm font-body text-bite-text-light mb-1">Clients</div>
          <div className="text-2xl font-heading text-blue-600">
            {users.filter(u => u.role === 'client').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-bite p-4 border border-bite-gray-200">
          <div className="text-sm font-body text-bite-text-light mb-1">Restaurateurs</div>
          <div className="text-2xl font-heading text-green-600">
            {users.filter(u => u.role === 'restaurateur').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-bite p-4 border border-bite-gray-200">
          <div className="text-sm font-body text-bite-text-light mb-1">Livreurs</div>
          <div className="text-2xl font-heading text-purple-600">
            {users.filter(u => u.role === 'livreur').length}
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-2xl shadow-bite border border-bite-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-bite-gray-200">
            <thead className="bg-bite-gray-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Email/Téléphone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Vérifié
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-bite-text-dark uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-bite-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-bite-gray-light">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-body font-medium text-bite-text-dark">
                        {user.firstName} {user.lastName}
                      </div>
                      {user.role === 'livreur' && user.driverCode && (
                        <div className="text-xs text-bite-text-light font-mono">
                          {user.driverCode}
                        </div>
                      )}
                      {user.role === 'restaurateur' && user.restaurantId && (
                        <div className="text-xs text-bite-text-light">
                          Restaurant #{user.restaurantId}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-body text-bite-text-dark">{user.phone}</div>
                      {user.email && (
                        <div className="text-xs text-bite-text-light font-body">{user.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                      {user.totalOrders !== undefined && (
                        <div className="text-xs text-bite-text-light mt-1">
                          {user.totalOrders} commande{user.totalOrders > 1 ? 's' : ''}
                        </div>
                      )}
                      {user.totalDeliveries !== undefined && (
                        <div className="text-xs text-bite-text-light mt-1">
                          {user.totalDeliveries} livraison{user.totalDeliveries > 1 ? 's' : ''}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, user.role, e.target.value as UserStatus)}
                        className={`px-2 py-1 text-xs font-bold rounded-full border-0 ${getStatusColor(user.status)} cursor-pointer`}
                      >
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                        <option value="suspended">Suspendu</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleVerificationToggle(user.id, user.role, user.isVerified)}
                        className={`px-2 py-1 text-xs font-bold rounded-full ${
                          user.isVerified 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition`}
                      >
                        {user.isVerified ? '✓ Vérifié' : '✗ Non vérifié'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(user.id, user.role, `${user.firstName} ${user.lastName}`)}
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
                    <p className="text-bite-text-light font-body">Aucun utilisateur trouvé</p>
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
