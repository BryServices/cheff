import { User } from '@/app/types/user';
import { RestaurantOwner } from '@/app/types/restaurant-owner';
import { DeliveryDriver } from '@/app/types/delivery';
import { getAllDrivers } from './drivers';

export type UserRole = 'client' | 'restaurateur' | 'livreur' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface AdminUser {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  status: UserStatus;
  isVerified: boolean;
  createdAt: Date;
  // Données spécifiques selon le rôle
  restaurantId?: number;
  restaurantName?: string;
  driverCode?: string;
  totalOrders?: number;
  totalDeliveries?: number;
}

// Fonction pour obtenir tous les utilisateurs (tous rôles confondus)
export function getAllAdminUsers(): AdminUser[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const users: AdminUser[] = [];

  // Récupérer les clients
  const storedUser = localStorage.getItem('cheff_user');
  if (storedUser) {
    try {
      const userData: User = JSON.parse(storedUser);
      if (userData.createdAt) {
        userData.createdAt = new Date(userData.createdAt);
      }
      users.push({
        id: userData.id,
        role: 'client',
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        email: userData.email,
        status: userData.isVerified ? 'active' : 'inactive',
        isVerified: userData.isVerified,
        createdAt: userData.createdAt,
        totalOrders: userData.orders?.length || 0,
      });
    } catch (error) {
      console.error('Error parsing user:', error);
    }
  }

  // Récupérer tous les clients depuis localStorage (si plusieurs)
  const allUsers = localStorage.getItem('cheff_all_users');
  if (allUsers) {
    try {
      const usersData: User[] = JSON.parse(allUsers);
      usersData.forEach(userData => {
        if (userData.createdAt) {
          userData.createdAt = new Date(userData.createdAt);
        }
        users.push({
          id: userData.id,
          role: 'client',
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          email: userData.email,
          status: userData.isVerified ? 'active' : 'inactive',
          isVerified: userData.isVerified,
          createdAt: userData.createdAt,
          totalOrders: userData.orders?.length || 0,
        });
      });
    } catch (error) {
      console.error('Error parsing all users:', error);
    }
  }

  // Récupérer les restaurateurs
  const storedOwner = localStorage.getItem('cheff_restaurant_owner');
  if (storedOwner) {
    try {
      const ownerData: RestaurantOwner = JSON.parse(storedOwner);
      if (ownerData.createdAt) {
        ownerData.createdAt = new Date(ownerData.createdAt);
      }
      users.push({
        id: ownerData.id,
        role: 'restaurateur',
        firstName: ownerData.firstName,
        lastName: ownerData.lastName,
        phone: ownerData.phone,
        email: ownerData.email,
        status: ownerData.isVerified ? 'active' : 'inactive',
        isVerified: ownerData.isVerified,
        createdAt: ownerData.createdAt,
        restaurantId: ownerData.restaurantId,
      });
    } catch (error) {
      console.error('Error parsing restaurant owner:', error);
    }
  }

  // Récupérer les livreurs
  const drivers = getAllDrivers();
  drivers.forEach(driver => {
    users.push({
      id: driver.id,
      role: 'livreur',
      firstName: driver.name.split(' ')[0] || driver.name,
      lastName: driver.name.split(' ').slice(1).join(' ') || '',
      phone: driver.phone,
      status: driver.isActive && driver.status !== 'offline' ? 'active' : 'inactive',
      isVerified: driver.isVerified,
      createdAt: driver.createdAt,
      driverCode: driver.driverCode,
      totalDeliveries: driver.totalDeliveries,
    });
  });

  // Récupérer les admins (pour l'instant, pas de système d'admin séparé)
  // En production, cela viendrait d'une base de données

  return users;
}

// Fonction pour mettre à jour un utilisateur
export function updateAdminUser(userId: string, role: UserRole, updates: Partial<AdminUser>): AdminUser | null {
  if (typeof window === 'undefined') return null;

  // Mise à jour selon le rôle
  if (role === 'client') {
    const storedUser = localStorage.getItem('cheff_user');
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      if (userData.id === userId) {
        const updatedUser: User = {
          ...userData,
          firstName: updates.firstName || userData.firstName,
          lastName: updates.lastName || userData.lastName,
          phone: updates.phone || userData.phone,
          email: updates.email || userData.email,
          isVerified: updates.isVerified !== undefined ? updates.isVerified : userData.isVerified,
        };
        localStorage.setItem('cheff_user', JSON.stringify(updatedUser));
        return {
          id: updatedUser.id,
          role: 'client',
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          phone: updatedUser.phone,
          email: updatedUser.email,
          status: updatedUser.isVerified ? 'active' : 'inactive',
          isVerified: updatedUser.isVerified,
          createdAt: updatedUser.createdAt,
          totalOrders: updatedUser.orders?.length || 0,
        };
      }
    }
  } else if (role === 'restaurateur') {
    const storedOwner = localStorage.getItem('cheff_restaurant_owner');
    if (storedOwner) {
      const ownerData: RestaurantOwner = JSON.parse(storedOwner);
      if (ownerData.id === userId) {
        const updatedOwner: RestaurantOwner = {
          ...ownerData,
          firstName: updates.firstName || ownerData.firstName,
          lastName: updates.lastName || ownerData.lastName,
          phone: updates.phone || ownerData.phone,
          email: updates.email || ownerData.email,
          isVerified: updates.isVerified !== undefined ? updates.isVerified : ownerData.isVerified,
        };
        localStorage.setItem('cheff_restaurant_owner', JSON.stringify(updatedOwner));
        return {
          id: updatedOwner.id,
          role: 'restaurateur',
          firstName: updatedOwner.firstName,
          lastName: updatedOwner.lastName,
          phone: updatedOwner.phone,
          email: updatedOwner.email,
          status: updatedOwner.isVerified ? 'active' : 'inactive',
          isVerified: updatedOwner.isVerified,
          createdAt: updatedOwner.createdAt,
          restaurantId: updatedOwner.restaurantId,
        };
      }
    }
  } else if (role === 'livreur') {
    // La mise à jour des livreurs se fait via updateDriver dans drivers.ts
    // Ici on peut juste mettre à jour le statut
    const drivers = getAllDrivers();
    const driver = drivers.find(d => d.id === userId);
    if (driver) {
      // Mise à jour via le système de drivers
      return {
        id: driver.id,
        role: 'livreur',
        firstName: driver.name.split(' ')[0] || driver.name,
        lastName: driver.name.split(' ').slice(1).join(' ') || '',
        phone: driver.phone,
        status: updates.status || (driver.isActive && driver.status !== 'offline' ? 'active' : 'inactive'),
        isVerified: driver.isVerified,
        createdAt: driver.createdAt,
        driverCode: driver.driverCode,
        totalDeliveries: driver.totalDeliveries,
      };
    }
  }

  return null;
}

// Fonction pour supprimer un utilisateur
export function deleteAdminUser(userId: string, role: UserRole): boolean {
  if (typeof window === 'undefined') return false;

  if (role === 'client') {
    const storedUser = localStorage.getItem('cheff_user');
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      if (userData.id === userId) {
        localStorage.removeItem('cheff_user');
        return true;
      }
    }
  } else if (role === 'restaurateur') {
    const storedOwner = localStorage.getItem('cheff_restaurant_owner');
    if (storedOwner) {
      const ownerData: RestaurantOwner = JSON.parse(storedOwner);
      if (ownerData.id === userId) {
        localStorage.removeItem('cheff_restaurant_owner');
        return true;
      }
    }
  } else if (role === 'livreur') {
    // La suppression des livreurs se fait via deleteDriver dans drivers.ts
    // Ici on retourne juste true pour indiquer que c'est possible
    return true;
  }

  return false;
}

