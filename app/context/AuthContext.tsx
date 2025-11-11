'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Address, UserPreferences } from '@/app/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, code: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  sendVerificationCode: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<boolean>;
  updateAddresses: (addresses: Address[]) => void;
  updatePreferences: (preferences: UserPreferences) => void;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  code: string;
  addresses: Address[];
  preferences: UserPreferences;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const storedUser = localStorage.getItem('cheff_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('cheff_user');
      }
    }
    setIsLoading(false);
  }, []);

  const sendVerificationCode = async (phone: string): Promise<void> => {
    // Simulation d'envoi de code SMS
    // En production, ceci appellerait une API réelle
    return new Promise((resolve) => {
      setTimeout(() => {
        // Stocker le code dans le localStorage pour la démo
        // En production, le code serait envoyé par SMS via un service comme Twilio
        const code = '123456'; // Code de démo
        localStorage.setItem('cheff_verification_code', code);
        localStorage.setItem('cheff_verification_phone', phone);
        console.log(`Code de vérification pour ${phone}: ${code}`);
        resolve();
      }, 1000);
    });
  };

  const verifyCode = async (phone: string, code: string): Promise<boolean> => {
    // Vérification du code
    const storedCode = localStorage.getItem('cheff_verification_code');
    const storedPhone = localStorage.getItem('cheff_verification_phone');
    
    if (storedCode === code && storedPhone === phone) {
      localStorage.removeItem('cheff_verification_code');
      localStorage.removeItem('cheff_verification_phone');
      return true;
    }
    
    // Pour la démo, accepter aussi le code "123456"
    if (code === '123456' && storedPhone === phone) {
      localStorage.removeItem('cheff_verification_code');
      localStorage.removeItem('cheff_verification_phone');
      return true;
    }
    
    return false;
  };

  const login = async (phone: string, code: string): Promise<void> => {
    setIsLoading(true);
    try {
      const isValid = await verifyCode(phone, code);
      if (!isValid) {
        throw new Error('Code de vérification invalide');
      }

      // Récupérer ou créer l'utilisateur
      const storedUser = localStorage.getItem('cheff_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.phone === phone) {
          setUser(userData);
          return;
        }
      }

      throw new Error('Utilisateur non trouvé. Veuillez vous inscrire.');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      const isValid = await verifyCode(userData.phone, userData.code);
      if (!isValid) {
        throw new Error('Code de vérification invalide');
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        addresses: userData.addresses,
        preferences: userData.preferences,
        createdAt: new Date(),
        isVerified: true,
      };

      localStorage.setItem('cheff_user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('cheff_user');
    setUser(null);
  };

  const updateAddresses = (addresses: Address[]) => {
    if (!user) return;
    const updatedUser = { ...user, addresses };
    setUser(updatedUser);
    localStorage.setItem('cheff_user', JSON.stringify(updatedUser));
  };

  const updatePreferences = (preferences: UserPreferences) => {
    if (!user) return;
    const updatedUser = { ...user, preferences };
    setUser(updatedUser);
    localStorage.setItem('cheff_user', JSON.stringify(updatedUser));
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('cheff_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        sendVerificationCode,
        verifyCode,
        updateAddresses,
        updatePreferences,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

