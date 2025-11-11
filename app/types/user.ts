export interface Address {
  id: string;
  street: string;
  district: string;
  department: string;
  city: string;
  isDefault: boolean;
  label?: string; // Ex: "Domicile", "Travail", etc.
}

export interface UserPreferences {
  favoriteCuisines: string[];
  dietaryRestrictions: string[];
  allergies: string[];
  language: 'fr' | 'en';
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: Date;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  phoneNumber: string;
  verificationCode: string;
}

